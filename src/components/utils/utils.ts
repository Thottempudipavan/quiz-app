import { questionType } from "./types";

export const getRandomQuestions = (questions: questionType[]) => {
  // Shuffle the questions order for every new quiz reload using random sorting
  for (let i = questions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [questions[i], questions[j]] = [questions[j], questions[i]];
  }

  return questions;
};
