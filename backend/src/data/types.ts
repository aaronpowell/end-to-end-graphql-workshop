import type { GameState } from "../schema";

export enum ModelType {
  Question = "Question",
  Player = "Player",
  PlayerAnswer = "PlayerAnswer",
  Game = "Game",
}

type Model = {
  id: string;
  modelType: ModelType;
};

export type QuestionModel = {
  question: string;
  category: string;
  incorrect_answers: string[];
  correct_answer: string;
  type: string;
  difficulty: "easy" | "medium" | "hard";
} & Model;

export type PlayerModel = {
  name: string;
  identityProvider: string;
  userDetails: string;
  userRoles: string[];
} & Model;

export type PlayerAnswerModel = {
  player: PlayerModel;
  question: QuestionModel;
  answer: string;
} & Model;

export type GameModel = {
  state: GameState;
  players: PlayerModel[];
  questions: QuestionModel[];
  answers: PlayerAnswerModel[];
} & Model;

export interface IGameDataSource {
  getGames(): Promise<GameModel[]>;
  getGame(id: string): Promise<GameModel | undefined>;
  createGame(questions: QuestionModel[]): Promise<GameModel>;
  updateGame(game: GameModel): Promise<GameModel>;
  getUserGames(userId: string): Promise<GameModel[]>;
}

export interface IPlayerDataSource {
  getPlayer(id: string): Promise<PlayerModel | undefined>;
  createPlayer(id: string, name: string, identityProvider: string, userDetails: string, userRoles: string[]): Promise<PlayerModel>;
}

export interface IQuestionDataSource {
  getQuestion(id: string): Promise<QuestionModel | undefined>;
  getQuestions(): Promise<QuestionModel[]>;
}
