import type { Resolvers, PlayerJoined } from "./schema";
import { arrayRandomiser } from "./utils";
import { ModelType, PlayerAnswerModel } from "./data/types";
import { GameState } from "./schema";
import { AuthenticationError, UserInputError } from "apollo-server-express";
import { PubSub, withFilter } from "graphql-subscriptions";
import { ApolloContext } from "./apolloContext";
import "./type-extensions";

const pubsub = new PubSub();
const EVENT_PLAYER_JOINED = "PLAYER_JOINED";
const EVENT_GAME_CHANGED = "GAME_STATE_CHANGE";

export const resolvers: Resolvers = {
  Query: {
    async game(_, { id }, { dataSources }) {
      const game = await dataSources.games.getGame(id);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      return game;
    },
    games(_, __, { dataSources }) {
      return dataSources.games.getGames();
    },
    async playerResults(_, { gameId }, { dataSources, user }) {
      const game = await dataSources.games.getGame(gameId);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      const playerAnswers = game.answers.filter(
        (a) => a.player.id === user.userId
      );

      return playerAnswers.map((answer) => {
        const question = answer.question;
        return {
          name: answer.player.name,
          answers: arrayRandomiser(
            question.incorrect_answers.concat(question.correct_answer)
          ),
          question: question.question,
          correctAnswer: question.correct_answer,
          submittedAnswer: answer.answer,
          correct: answer.answer === question.correct_answer,
        };
      });
    },
  },
  Question: {
    answers(question) {
      const answers = arrayRandomiser(
        question.incorrect_answers.concat([question.correct_answer])
      );

      return answers;
    },
    correctAnswer(question) {
      return question.correct_answer;
    },
    id(question) {
      return question.id;
    },
    question(question) {
      return question.question;
    },
  },
  Player: {
    async game(user, { gameId }, { dataSources }) {
      const game = await dataSources.games.getGame(gameId);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      if (!game.players.some((player) => player.id === user.id)) {
        throw new UserInputError("Player not part of the game");
      }

      return game;
    },
    async games(user, _, { dataSources }) {
      const games = await dataSources.games.getUserGames(user.id);

      return games;
    },
  },
  Mutation: {
    async createGame(_, __, { dataSources }) {
      const questions = await dataSources.questions.getQuestions();
      const game = await dataSources.games.createGame(questions);

      return game;
    },
    async addPlayerToGame(
      _,
      { input: { gameId, playerName } },
      { dataSources, user }
    ) {
      if (!user.userId || !user.identityProvider || !user.userDetails) {
        throw new AuthenticationError("Not authenticated");
      }

      const game = await dataSources.games.getGame(gameId);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      const player = await dataSources.players.createPlayer(
        user.userId,
        playerName,
        user.identityProvider,
        user.userDetails,
        user.userRoles
      );
      game.players.push(player);
      const updatedGame = await dataSources.games.updateGame(game);

      pubsub.publish(EVENT_GAME_CHANGED, { gameChanged: updatedGame });
      pubsub.publish(EVENT_PLAYER_JOINED, { playerJoined: { player, gameId } });

      return player;
    },
    async startGame(_, { id }, { dataSources }) {
      const game = await dataSources.games.getGame(id);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      game.state = GameState.Started;
      const updatedGame = await dataSources.games.updateGame(game);

      pubsub.publish(EVENT_GAME_CHANGED, { gameChanged: updatedGame });

      return updatedGame;
    },
    async submitAnswer(
      _,
      { input: { answer, gameId, questionId } },
      { dataSources, user }
    ) {
      if (!user.userId) {
        throw new AuthenticationError("Authentication required");
      }
      const [game, player, question] = await Promise.all([
        dataSources.games.getGame(gameId),
        dataSources.players.getPlayer(user.userId),
        dataSources.questions.getQuestion(questionId),
      ]);

      if (!game) {
        throw new UserInputError(
          "Provided Game ID does not match a known game."
        );
      }

      if (!player) {
        throw new UserInputError(
          "Provided Player ID does not match a player in this game"
        );
      }

      if (!question) {
        throw new UserInputError(
          "Provided Question ID does not match a question in this game"
        );
      }

      const answerModel: PlayerAnswerModel = {
        id: `${gameId}-${questionId}-${user.userId}`,
        modelType: ModelType.PlayerAnswer,
        answer,
        question,
        player,
      };

      game.answers.push(answerModel);

      await dataSources.games.updateGame(game);
      return player;
    },
  },
  Subscription: {
    playerJoined: {
      subscribe: withFilter(
        () => pubsub.asyncIterator<PlayerJoined>(EVENT_PLAYER_JOINED),
        (
          payload: { playerJoined: PlayerJoined },
          variables: { gameId: string },
          context: ApolloContext
        ) =>
          variables.gameId === payload.playerJoined.gameId &&
          payload.playerJoined.player.id !== context.user.userId
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ) as any,
    },
    gameChanged: {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      subscribe: () => pubsub.asyncIterator(EVENT_GAME_CHANGED) as any,
    },
  },
};

export default resolvers;
