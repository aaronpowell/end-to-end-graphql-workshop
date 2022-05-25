import { CosmosClient } from "@azure/cosmos";
import { DataSources } from "apollo-server-core/src/graphqlOptions";
import { ApolloContext } from "../apolloContext";
import { GameDataSource as CosmosGameDataSource } from "./cosmos/GameDataSource";
import { QuestionDataSource as CosmosQuestionDataSource } from "./cosmos/QuestionDataSource";
import { PlayerDataSource as CosmosUserDataSource } from "./cosmos/PlayerDataSource";
import { GameDataSource as InMemoryGameDataSource } from "./inMemory/GameDataSource";
import { QuestionDataSource as InMemoryQuestionDataSource } from "./inMemory/QuestionDataSource";
import { PlayerDataSource as InMemoryUserDataSource } from "./inMemory/PlayerDataSource";
import { GameModel, PlayerModel } from "./types";

export const cosmosDataSources: () => DataSources<ApolloContext> = () => {
  const client = new CosmosClient(process.env.CosmosDB || "");
  const container = client
    .database(process.env.DATABASE_NAME || "trivia")
    .container(process.env.CONTAINER_NAME || "game");

  return {
    players: new CosmosUserDataSource(container),
    questions: new CosmosQuestionDataSource(container),
    games: new CosmosGameDataSource(container),
  };
};

const games: GameModel[] = [];
const players: PlayerModel[] = [];
export const inMemoryDataSources: () => DataSources<ApolloContext> = () => ({
  players: new InMemoryUserDataSource(players),
  questions: new InMemoryQuestionDataSource(),
  games: new InMemoryGameDataSource(games),
});
