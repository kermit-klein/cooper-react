import React from "react";
import { Button, Form, Segment } from "semantic-ui-react";

const LoginForm = (props) => {
  return (
    <form onSubmit={props.submitFormHandler} id="login-form">
      <label>Email</label>
      <input name="email" type="email" id="email"></input>

      <label>Password</label>
      <input name="password" type="password" id="password"></input>
      <button id="submit">Submit</button>
    </form>
  );
};

export default LoginForm;
