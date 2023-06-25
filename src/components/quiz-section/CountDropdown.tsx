import { FC } from "react";
import Form from "react-bootstrap/Form";
import { SelectionProps } from "../utils/types";

const CountDropdown: FC<SelectionProps> = ({ getDropdownCount }) => {
  return (
    <Form.Select
      aria-label="Choose the no of questions"
      onChange={getDropdownCount}
      className="count-dropdown"
    >
      <option value={0}>Choose the no of questions</option>
      {[...Array(11)].map((_v: any, i: number) => {
        return (
          <option key={i} value={i + 5}>
            {i + 5}
          </option>
        );
      })}
    </Form.Select>
  );
};

export default CountDropdown;
