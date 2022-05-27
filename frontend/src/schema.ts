import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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

export type AddPlayerScreenMutationVariables = Exact<{
  id: Scalars['ID'];
  name: Scalars['String'];
}>;


export type AddPlayerScreenMutation = { __typename?: 'Mutation', addPlayerToGame: { __typename?: 'Player', id: string } };

export type SubmitAnswerMutationVariables = Exact<{
  input: SubmitAnswer;
}>;


export type SubmitAnswerMutation = { __typename?: 'Mutation', submitAnswer?: { __typename?: 'Player', id: string } | null };

export type CreateGameMutationVariables = Exact<{ [key: string]: never; }>;


export type CreateGameMutation = { __typename?: 'Mutation', createGame?: { __typename?: 'Game', id: string } | null };

export type PlayerResultsQueryVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type PlayerResultsQuery = { __typename?: 'Query', playerResults: Array<{ __typename?: 'PlayerResult', correct?: boolean | null, question: string, answers: Array<string>, correctAnswer: string, submittedAnswer: string }> };

export type GameStatusSubscriptionVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type GameStatusSubscription = { __typename?: 'Subscription', gameChanged: { __typename?: 'Game', state?: GameState | null } };

export type GetGameQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type GetGameQuery = { __typename?: 'Query', game?: { __typename?: 'Game', questions: Array<{ __typename?: 'Question', id: string, question: string, answers: Array<string> }> } | null };

export type PlayerJoinedSubscriptionVariables = Exact<{
  gameId: Scalars['ID'];
}>;


export type PlayerJoinedSubscription = { __typename?: 'Subscription', playerJoined?: { __typename?: 'PlayerJoined', player: { __typename?: 'Player', name: string, id: string } } | null };

export type StartGameMutationVariables = Exact<{
  id: Scalars['ID'];
}>;


export type StartGameMutation = { __typename?: 'Mutation', startGame?: { __typename?: 'Game', state?: GameState | null } | null };


export const AddPlayerScreenDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"addPlayerScreen"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"name"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"addPlayerToGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"ObjectValue","fields":[{"kind":"ObjectField","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}},{"kind":"ObjectField","name":{"kind":"Name","value":"playerName"},"value":{"kind":"Variable","name":{"kind":"Name","value":"name"}}}]}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<AddPlayerScreenMutation, AddPlayerScreenMutationVariables>;
export const SubmitAnswerDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"submitAnswer"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"input"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"SubmitAnswer"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"submitAnswer"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"input"},"value":{"kind":"Variable","name":{"kind":"Name","value":"input"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<SubmitAnswerMutation, SubmitAnswerMutationVariables>;
export const CreateGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createGame"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]} as unknown as DocumentNode<CreateGameMutation, CreateGameMutationVariables>;
export const PlayerResultsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"playerResults"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerResults"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"correct"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}},{"kind":"Field","name":{"kind":"Name","value":"correctAnswer"}},{"kind":"Field","name":{"kind":"Name","value":"submittedAnswer"}}]}}]}}]} as unknown as DocumentNode<PlayerResultsQuery, PlayerResultsQueryVariables>;
export const GameStatusDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"gameStatus"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"gameChanged"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<GameStatusSubscription, GameStatusSubscriptionVariables>;
export const GetGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"game"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"questions"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"question"}},{"kind":"Field","name":{"kind":"Name","value":"answers"}}]}}]}}]}}]} as unknown as DocumentNode<GetGameQuery, GetGameQueryVariables>;
export const PlayerJoinedDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"subscription","name":{"kind":"Name","value":"playerJoined"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"playerJoined"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"gameId"},"value":{"kind":"Variable","name":{"kind":"Name","value":"gameId"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"player"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"id"}}]}}]}}]}}]} as unknown as DocumentNode<PlayerJoinedSubscription, PlayerJoinedSubscriptionVariables>;
export const StartGameDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"startGame"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"startGame"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"id"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"state"}}]}}]}}]} as unknown as DocumentNode<StartGameMutation, StartGameMutationVariables>;