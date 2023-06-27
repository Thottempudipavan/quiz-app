import { useState, ChangeEvent } from "react";
import Container from "react-bootstrap/Container";
import AnswerSelection from "./AnswerItem";
import {
  quizItemsType,
  selectedDataItemType,
  submitDataType,
  questionType,
} from "../utils/types";
import questions from "../utils/questions.json";
import QuizPreviewTile from "./QuizPreviewTile";
import QuizReview from "./QuizReview";
import { getRandomQuestions } from "../utils/utils";

const QuizAppSection = () => {
  const [quizItems, setquizItems] = useState<quizItemsType>({
    data: [],
    loading: false,
  });
  const [selectionData, setselectionData] = useState<selectedDataItemType[]>(
    []
  );
  const [selectionCount, setselectionCount] = useState<number>(0);
  const [currentItemIdx, setcurrentItemIdx] = useState<number>(0);
  const [quizScored, setquizScored] = useState<number>(0);
  const [testCompleted, settestCompleted] = useState<boolean>(false);
  const [isLoaded, setisLoaded] = useState<boolean>(false);

  const { loading } = quizItems;
  const presentQuestion: questionType = quizItems.data[currentItemIdx];

  const handleClick = async () => {
    try {
      const { data } = await fetch(
        `https://https://pkumar-07071990-hlmrnfk6ta-uc.a.run.app/getquestions?count=${selectionCount}`
      ).then((res) => res.json());
      // const { data } = await fetch(
      //   `http://localhost:8080/getquestions?count=${selectionCount}`
      // ).then((res) => res.json());
      setquizItems({ data: data, loading: false });
    } catch (_err) {
      const selectedArray: any[] = questions.filter(
        (_val, i: number) => selectionCount > i
      );
      setquizItems({ data: getRandomQuestions(selectedArray), loading: false });
    }
  };

  const handleQuestionSubmit = ({
    isCorrect,
    selectedOption,
    index,
  }: submitDataType) => {
    setselectionData([
      ...selectionData,
      {
        question: quizItems.data[index],
        givenAnswer: selectedOption.valueIndex,
        selectedOption,
      },
    ]);

    if (isCorrect) {
      setquizScored(quizScored + 1);
    }
    if (currentItemIdx === quizItems.data.length - 1) {
      settestCompleted(true);
    } else {
      setcurrentItemIdx((prevVal) => prevVal + 1);
    }
  };

  const getDropdownCount = (e: ChangeEvent<HTMLSelectElement>) => {
    setselectionCount(parseInt(e.target.value));
  };

  const getVarient = (quizScored: number) => {
    if (quizScored >= 80) {
      return "success";
    } else if (quizScored >= 35 && quizScored < 50) {
      return "warning";
    } else if (quizScored < 35) {
      return "danger";
    } else {
      return "primary";
    }
  };

  return (
    <Container className="main-container">
      <QuizPreviewTile
        selectionCount={selectionCount}
        loading={loading}
        quizItems={quizItems}
        handleClick={handleClick}
        testCompleted={testCompleted}
        getDropdownCount={getDropdownCount}
      />

      {testCompleted ? (
        <QuizReview
          getVarient={getVarient}
          quizScored={quizScored}
          quizItems={quizItems}
          setisLoaded={setisLoaded}
          isLoaded={isLoaded}
          selectionData={selectionData}
        />
      ) : (
        <div className="questions-container">
          {presentQuestion && (
            <AnswerSelection
              data={presentQuestion}
              onSubmit={handleQuestionSubmit}
              currentItemIdx={currentItemIdx}
              isLastIndex={currentItemIdx === quizItems.data.length - 1}
              answer={presentQuestion.answer_index}
            />
          )}
        </div>
      )}
      <br />
    </Container>
  );
};

export default QuizAppSection;
