import { GraphQLResolveInfo } from 'graphql';
import { QuestionModel, GameModel, PlayerModel } from './data/types';
import { ApolloContext } from './apolloContext';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddPlayerToGame = {
  gameId: Scalars['ID'];
  playerName: Scalars['String'];
};

export type Game = Node & {
  __typename?: 'Game';
  id: Scalars['ID'];
  players: Array<Player>;
  questions: Array<Question>;
  state?: Maybe<GameState>;
};

export enum GameState {
  Completed = 'Completed',
  Started = 'Started',
  WaitingForPlayers = 'WaitingForPlayers'
}

export type Mutation = {
  __typename?: 'Mutation';
  addPlayerToGame: Player;
  createGame?: Maybe<Game>;
  startGame?: Maybe<Game>;
  submitAnswer?: Maybe<Player>;
};


export type MutationAddPlayerToGameArgs = {
  input: AddPlayerToGame;
};


export type MutationStartGameArgs = {
  id: Scalars['ID'];
};


export type MutationSubmitAnswerArgs = {
  input: SubmitAnswer;
};

export type Node = {
  id: Scalars['ID'];
};

export type Player = Node & {
  __typename?: 'Player';
  game: Game;
  games: Array<Game>;
  id: Scalars['ID'];
  name: Scalars['String'];
};


export type PlayerGameArgs = {
  gameId: Scalars['ID'];
};

export type PlayerJoined = {
  __typename?: 'PlayerJoined';
  gameId: Scalars['ID'];
  player: Player;
};

export type PlayerResult = {
  __typename?: 'PlayerResult';
  answers: Array<Scalars['String']>;
  correct?: Maybe<Scalars['Boolean']>;
  correctAnswer: Scalars['String'];
  name: Scalars['String'];
  question: Scalars['String'];
  submittedAnswer: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  game?: Maybe<Game>;
  games: Array<Game>;
  playerResults: Array<PlayerResult>;
};


export type QueryGameArgs = {
  id: Scalars['ID'];
};


export type QueryPlayerResultsArgs = {
  gameId: Scalars['ID'];
};

export type Question = Node & {
  __typename?: 'Question';
  answers: Array<Scalars['String']>;
  correctAnswer: Scalars['String'];
  id: Scalars['ID'];
  question: Scalars['String'];
};

export type SubmitAnswer = {
  answer: Scalars['String'];
  gameId: Scalars['ID'];
  questionId: Scalars['ID'];
};

export type Subscription = {
  __typename?: 'Subscription';
  gameChanged: Game;
  playerJoined?: Maybe<PlayerJoined>;
};


export type SubscriptionGameChangedArgs = {
  gameId: Scalars['ID'];
};


export type SubscriptionPlayerJoinedArgs = {
  gameId: Scalars['ID'];
};



export type ResolverTypeWrapper<T> = Promise<T> | T;


export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  AddPlayerToGame: AddPlayerToGame;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Game: ResolverTypeWrapper<GameModel>;
  GameState: GameState;
  ID: ResolverTypeWrapper<Scalars['ID']>;
  Mutation: ResolverTypeWrapper<{}>;
  Node: ResolversTypes['Game'] | ResolversTypes['Player'] | ResolversTypes['Question'];
  Player: ResolverTypeWrapper<PlayerModel>;
  PlayerJoined: ResolverTypeWrapper<Omit<PlayerJoined, 'player'> & { player: ResolversTypes['Player'] }>;
  PlayerResult: ResolverTypeWrapper<PlayerResult>;
  Query: ResolverTypeWrapper<{}>;
  Question: ResolverTypeWrapper<QuestionModel>;
  String: ResolverTypeWrapper<Scalars['String']>;
  SubmitAnswer: SubmitAnswer;
  Subscription: ResolverTypeWrapper<{}>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  AddPlayerToGame: AddPlayerToGame;
  Boolean: Scalars['Boolean'];
  Game: GameModel;
  ID: Scalars['ID'];
  Mutation: {};
  Node: ResolversParentTypes['Game'] | ResolversParentTypes['Player'] | ResolversParentTypes['Question'];
  Player: PlayerModel;
  PlayerJoined: Omit<PlayerJoined, 'player'> & { player: ResolversParentTypes['Player'] };
  PlayerResult: PlayerResult;
  Query: {};
  Question: QuestionModel;
  String: Scalars['String'];
  SubmitAnswer: SubmitAnswer;
  Subscription: {};
};

export type GameResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Game'] = ResolversParentTypes['Game']> = {
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  players?: Resolver<Array<ResolversTypes['Player']>, ParentType, ContextType>;
  questions?: Resolver<Array<ResolversTypes['Question']>, ParentType, ContextType>;
  state?: Resolver<Maybe<ResolversTypes['GameState']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = {
  addPlayerToGame?: Resolver<ResolversTypes['Player'], ParentType, ContextType, RequireFields<MutationAddPlayerToGameArgs, 'input'>>;
  createGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType>;
  startGame?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<MutationStartGameArgs, 'id'>>;
  submitAnswer?: Resolver<Maybe<ResolversTypes['Player']>, ParentType, ContextType, RequireFields<MutationSubmitAnswerArgs, 'input'>>;
};

export type NodeResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Node'] = ResolversParentTypes['Node']> = {
  __resolveType: TypeResolveFn<'Game' | 'Player' | 'Question', ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
};

export type PlayerResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Player'] = ResolversParentTypes['Player']> = {
  game?: Resolver<ResolversTypes['Game'], ParentType, ContextType, RequireFields<PlayerGameArgs, 'gameId'>>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerJoinedResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PlayerJoined'] = ResolversParentTypes['PlayerJoined']> = {
  gameId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  player?: Resolver<ResolversTypes['Player'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlayerResultResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['PlayerResult'] = ResolversParentTypes['PlayerResult']> = {
  answers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  correct?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  submittedAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  game?: Resolver<Maybe<ResolversTypes['Game']>, ParentType, ContextType, RequireFields<QueryGameArgs, 'id'>>;
  games?: Resolver<Array<ResolversTypes['Game']>, ParentType, ContextType>;
  playerResults?: Resolver<Array<ResolversTypes['PlayerResult']>, ParentType, ContextType, RequireFields<QueryPlayerResultsArgs, 'gameId'>>;
};

export type QuestionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Question'] = ResolversParentTypes['Question']> = {
  answers?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  correctAnswer?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  question?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<ContextType = ApolloContext, ParentType extends ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription']> = {
  gameChanged?: SubscriptionResolver<ResolversTypes['Game'], "gameChanged", ParentType, ContextType, RequireFields<SubscriptionGameChangedArgs, 'gameId'>>;
  playerJoined?: SubscriptionResolver<Maybe<ResolversTypes['PlayerJoined']>, "playerJoined", ParentType, ContextType, RequireFields<SubscriptionPlayerJoinedArgs, 'gameId'>>;
};

export type Resolvers<ContextType = ApolloContext> = {
  Game?: GameResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  Node?: NodeResolvers<ContextType>;
  Player?: PlayerResolvers<ContextType>;
  PlayerJoined?: PlayerJoinedResolvers<ContextType>;
  PlayerResult?: PlayerResultResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Question?: QuestionResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
};

