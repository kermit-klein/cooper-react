import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const LoginForm = (props) => {
  return (
    <Segment inverted>
      <Form inverted onSubmit={props.submitFormHandler} id="login-form">
        <Form.Group widths="equal">
          <Form.Input label="Email" name="email" type="email" id="email" />
          <Form.Input
            label="Password"
            name="password"
            type="password"
            id="password"
          />
        </Form.Group>
        <Button type="submit" id="submit">
          Login
        </Button>
      </Form>
    </Segment>
  );
};

export default LoginForm;
