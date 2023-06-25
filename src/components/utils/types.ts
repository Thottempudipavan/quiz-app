import { ChangeEvent } from "react";

export type questionType = {
  answer_index: number;
  choices: string[];
  hint: string;
  question: string;
  question_id: number;
};

export type selectedDataItemType = {
  question: questionType;
  givenAnswer: number;
  selectedOption: selectedOptionType;
};

export type submitDataType = {
  isCorrect: boolean;
  selectedOption: selectedOptionType;
  index: number;
};

export type selectedOptionType = {
  value: string;
  valueIndex: number;
};
export type quizItemsType = {
  data: questionType[];
  loading: boolean;
};

export type AnswerItemProps = {
  data: questionType;
  onSubmit: (val: submitDataType) => void;
  currentItemIdx: number;
  isLastIndex: boolean;
  answer: number;
};

export type QuestionItemProps = {
  data: questionType;
  handleOptionChange?: (e: ChangeEvent<HTMLInputElement>, val: number) => void;
  currentItemIdx: number;
  selectedOption: selectedOptionType;
  isPreview?: boolean;
};

export type SelectionProps = {
  getDropdownCount: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type QuizPreviewTileProps = {
  selectionCount: number;
  loading: boolean;
  quizItems: quizItemsType;
  handleClick: () => void;
  testCompleted: boolean;
  getDropdownCount: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type QuizReviewProps = {
  getVarient: (score: number) => string;
  quizScored: number;
  quizItems: quizItemsType;
  setisLoaded: any;
  isLoaded: boolean;
  selectionData: selectedDataItemType[];
};
