import { UserInfo } from "@aaronpowell/static-web-apps-api-auth";
import {
  IGameDataSource,
  IQuestionDataSource,
  IPlayerDataSource,
} from "./data/types";

export type ApolloContext = {
  dataSources: {
    players: IPlayerDataSource;
    games: IGameDataSource;
    questions: IQuestionDataSource;
  };
  isAuthenticated: boolean;
  user: UserInfo;
};
