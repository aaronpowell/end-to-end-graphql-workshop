import { AuthenticationError, UserInputError } from "apollo-server-core";
import { ModelType, PlayerAnswerModel } from "../data/types";
import { GameState, MutationResolvers } from "../schema";
import {
  pubsub,
  EVENT_GAME_CHANGED,
  EVENT_PLAYER_JOINED,
} from "./Subscription";

export const Mutation: MutationResolvers = {
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
      throw new UserInputError("Provided Game ID does not match a known game.");
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
      throw new UserInputError("Provided Game ID does not match a known game.");
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
      throw new UserInputError("Provided Game ID does not match a known game.");
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
};
