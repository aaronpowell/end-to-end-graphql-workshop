import { QuestionResolvers } from "../schema";
import { arrayRandomiser } from "../utils";

export const Question: QuestionResolvers = {
    answers(question) {
      const answers = arrayRandomiser(
        question.incorrect_answers.concat([question.correct_answer])
      );

      return answers;
    },
    correctAnswer(question) {
      return question.correct_answer;
    },
    id(question) {
      return question.id;
    },
    question(question) {
      return question.question;
    },
  }