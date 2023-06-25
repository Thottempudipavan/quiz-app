import { FunctionComponent, useState, useEffect, ChangeEvent } from "react";
import { Button, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import QuestionItem from "./QuestionItem";
import { AnswerItemProps } from "../utils/types";
import { timerValue } from "../utils/constants";
import CircularProgress from "../common/CircularProgress";
import styled from "styled-components";

const CircularProgressWithStyles = styled(CircularProgress)`
  background: lightgray;
  border-radius: 50%;
`;

const DangerText = styled.span`
  color: red;
`;

const WarningText = styled.span`
  color: orange;
`;

const AnswerItem: FunctionComponent<AnswerItemProps> = ({
  data,
  onSubmit,
  currentItemIdx,
  isLastIndex,
  answer,
}) => {
  const [timeRemaining, setTimeRemaining] = useState(timerValue);
  const [selectedOption, setSelectedOption] = useState({
    value: "",
    valueIndex: -1,
  });
  const [stage, setStage] = useState<
    "primary" | "secondary" | "error" | "info" | "success" | "warning"
  >("primary");

  const handleOptionChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    setSelectedOption({ value: event.target.value, valueIndex: index });
  };

  const handleSubmit = () => {
    onSubmit({
      isCorrect: selectedOption.valueIndex === answer,
      selectedOption,
      index: currentItemIdx,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeRemaining(timeRemaining - 1);
    }, 1000);

    if (timeRemaining === 20 && stage === "primary") {
      setStage("warning");
    } else if (timeRemaining === 10 && stage === "warning") {
      setStage("error");
    } else if (timeRemaining === 0) {
      setStage("info");
      handleSubmit();
    }

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRemaining]);

  useEffect(() => {
    setTimeRemaining(timerValue);
    setStage("primary");
    setSelectedOption({
      value: "",
      valueIndex: -1,
    });
  }, [currentItemIdx]);

  return (
    <Form>
      <Card>
        <QuestionItem
          currentItemIdx={currentItemIdx}
          data={data}
          selectedOption={selectedOption}
          handleOptionChange={handleOptionChange}
        />
        <Card.Body>
          <Stack direction="horizontal" gap={4}>
            <Button onClick={handleSubmit}>
              {isLastIndex ? "Submit Quiz" : "Goto Next Question"}
            </Button>
            <CircularProgressWithStyles
              color={stage}
              value={(timeRemaining / timerValue) * 100}
              textnode={timeRemaining}
            />
            <div>
              {stage === "warning" && (
                <WarningText>Running out of time!</WarningText>
              )}
              {stage === "error" && <DangerText>Hint: {data.hint}</DangerText>}
              {stage === "info" && <DangerText>Time's up!!!</DangerText>}
            </div>
          </Stack>
        </Card.Body>
      </Card>
    </Form>
  );
};

export default AnswerItem;
