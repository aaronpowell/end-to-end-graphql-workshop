import type { Resolvers } from "./schema";
import { Query } from "./resolvers/Query";
import { Question } from "./resolvers/Question";
import { Player } from "./resolvers/Player";
import { Mutation } from "./resolvers/Mutation";
import { Subscription } from "./resolvers/Subscription";

export const resolvers: Resolvers = {
  Query,
  Question,
  Player,
  Mutation,
  Subscription,
};

export default resolvers;
