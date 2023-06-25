import { FC } from "react";
import { Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { QuizPreviewTileProps } from "../utils/types";
import { timerValue } from "../utils/constants";
import CountDropdown from "./CountDropdown";

const QuizPreviewTile: FC<QuizPreviewTileProps> = ({
  selectionCount,
  loading,
  quizItems,
  handleClick,
  getDropdownCount,
}) => {
  return (
    <Card className="quiz-preview">
      <Card.Header>Quiz Section</Card.Header>
      <Card.Body>
        {!selectionCount ? (
          <CountDropdown getDropdownCount={getDropdownCount} />
        ) : (
          <>
            <Card.Title>
              You have choosen {selectionCount} questions!
            </Card.Title>
            <Card.Text>
              Please check the question selection count and start the test by
              clicking the start button. Good Luck!!!
            </Card.Text>
            <Card.Text>
              Every Question you have {timerValue} seconds to complete.
            </Card.Text>
            {!(loading || quizItems?.data?.length || !selectionCount) && (
              <Button onClick={handleClick}>Start the Quiz</Button>
            )}
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default QuizPreviewTile;
