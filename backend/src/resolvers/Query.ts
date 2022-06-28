import { UserInputError } from "apollo-server-core";
import { QueryResolvers } from "../schema";
import { arrayRandomiser } from "../utils";

export const Query: QueryResolvers = {
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
  }