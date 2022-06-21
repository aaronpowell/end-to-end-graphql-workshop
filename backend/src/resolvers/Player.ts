import { UserInputError } from "apollo-server-core";
import { PlayerResolvers } from "../schema";

export const Player: PlayerResolvers = {
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
  }