import { PubSub, withFilter } from "graphql-subscriptions";
import { ApolloContext } from "../apolloContext";
import { PlayerJoined, SubscriptionResolvers } from "../schema";
import "./type-extensions";

export const pubsub = new PubSub();
export const EVENT_PLAYER_JOINED = "PLAYER_JOINED";
export const EVENT_GAME_CHANGED = "GAME_STATE_CHANGE";

export const Subscription: SubscriptionResolvers = {
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
};
