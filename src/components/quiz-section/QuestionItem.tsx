import { FC, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import { QuestionItemProps } from "../utils/types";
import styled from "styled-components";

const DangerText = styled.span`
  color: red;
`;

const SuccessText = styled.span`
  color: green;
`;

const QuestionItem: FC<QuestionItemProps> = (props) => {
  const {
    currentItemIdx,
    data,
    selectedOption,
    handleOptionChange,
    isPreview,
  } = props;

  const labelText = (index: number, item: string) => {
    const { value, valueIndex } = selectedOption;
    const { answer_index } = data;

    if (isPreview) {
      if (index === answer_index) {
        if (valueIndex === answer_index) {
          return (
            <SuccessText>{item} - Yahh! You choose right answer</SuccessText>
          );
        }
        return (
          <SuccessText>
            {item} - It is Right answer
            <SuccessText>&#10004;</SuccessText>
          </SuccessText>
        );
      } else if (value === item && valueIndex !== answer_index) {
        return (
          <DangerText>{item} - Ohhh!!! You Choose Wrong answer</DangerText>
        );
      }
      return item;
    }
    return item;
  };

  return (
    <>
      <Card.Header>
        <div className="question-title">
          {currentItemIdx + 1}). {data.question}
        </div>
      </Card.Header>
      <Card.Body>
        {data.choices?.map((item: string, index: number) => {
          return (
            <div key={item} className="mb-3">
              {isPreview ? (
                <Form.Check
                  inline
                  label={labelText(index, item)}
                  name="group1"
                  type="radio"
                  readOnly
                  id={`inline-radio-${data.question_id}`}
                />
              ) : (
                <Form.Check
                  inline
                  label={item}
                  name="group1"
                  type="radio"
                  value={item}
                  checked={selectedOption.value === item}
                  onChange={(event: ChangeEvent<HTMLInputElement>) =>
                    handleOptionChange && handleOptionChange(event, index)
                  }
                  id={`inline-radio-${item}`}
                />
              )}
            </div>
          );
        })}
        <p className="isSelect">
          {selectedOption.valueIndex < 0 && isPreview && (
            <DangerText> oops!!! You didnot choose the answer</DangerText>
          )}
        </p>
      </Card.Body>
      <hr />
    </>
  );
};

export default QuestionItem;
