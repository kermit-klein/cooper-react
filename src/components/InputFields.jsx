import React from "react";
import { Form } from "semantic-ui-react";

const InputFields = ({ onChangeHandler, onChangeHandler1 }) => {
  return (
    <>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            onChange={onChangeHandler}
            fluid
            label="Distance"
            placeholder="Distance in m"
            name="distance"
          />
          <Form.Input
            onChange={onChangeHandler}
            fluid
            label="Age"
            placeholder="Age in years"
            name="age"
          />
          <Form.Select
            onChange={onChangeHandler1}
            fluid
            label="Gender"
            name="gender"
            options={[
              { key: "male", text: "Male", value: "male" },
              { key: "female", text: "Female", value: "female" },
            ]}
            placeholder="Gender"
          />
        </Form.Group>
      </Form>
    </>
  );
};

export default InputFields;
