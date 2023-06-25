import { FC } from "react";
import { Button } from "react-bootstrap";
import Stack from "react-bootstrap/Stack";
import Alert from "react-bootstrap/Alert";
import Card from "react-bootstrap/Card";
import QuestionItem from "./QuestionItem";
import { selectedDataItemType, QuizReviewProps } from "../utils/types";
import ReactStoreIndicator from "react-score-indicator";

const QuizReview: FC<QuizReviewProps> = ({
  getVarient,
  quizScored,
  quizItems,
  setisLoaded,
  isLoaded,
  selectionData,
}) => {
  return (
    <>
      <Alert
        key={getVarient((quizScored / quizItems.data.length) * 100)}
        variant={getVarient((quizScored / quizItems.data.length) * 100)}
      >
        <Alert.Heading>Thanks for completing the Quiz.</Alert.Heading>
        <div className="score-indicator">
          <ReactStoreIndicator
            value={quizScored}
            maxValue={quizItems.data.length}
          />
        </div>
        <hr />
        <p>Review your quiz results.</p>
        <Stack gap={2} className="col-md-5" direction="horizontal">
          <Button onClick={() => setisLoaded((prevVal: any) => !prevVal)}>
            Review Your Answers
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            Retry Quiz
          </Button>
        </Stack>
      </Alert>
      {isLoaded && selectionData.length && (
        <Card className="quiz-review">
          {selectionData.map((item: selectedDataItemType, index: number) => {
            return (
              <div key={index}>
                <QuestionItem
                  data={item.question}
                  currentItemIdx={index}
                  selectedOption={item.selectedOption}
                  isPreview={true}
                />
              </div>
            );
          })}
        </Card>
      )}
    </>
  );
};

export default QuizReview;
