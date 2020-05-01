import React, { Component } from "react";
import DisplayCooperResult from "./components/DisplayCooperResult";
import InputFields from "./components/InputFields";
import LoginForm from "./components/LoginForm";
import { authenticate } from "./modules/auth";
import DisplayPerformanceData from "./components/DisplayPerformanceData";
import { Container, Button, Icon, Header } from "semantic-ui-react";
import { fadeIn } from "react-animation";
import styled, { keyframes } from "styled-components";

class App extends Component {
  state = {
    distance: "",
    gender: "male",
    age: "",
    renderLoginForm: false,
    authenticated: false,
    message: "",
    entrySaved: false,
    renderIndex: false,
    updateIndex: false,
  };

  onChangeHandler = (e) => {
    this.setState({ [e.target.name]: e.target.value, entrySaved: false });
  };

  onChangeHandler1 = (e, { name, value }) => this.setState({ [name]: value });

  onLogin = async (e) => {
    e.preventDefault();
    const response = await authenticate(
      e.target.email.value,
      e.target.password.value
    );
    if (response.authenticated) {
      this.setState({ authenticated: true });
    } else {
      this.setState({ message: response.message, renderLoginForm: false });
    }
  };

  render() {
    const FadeIn = styled.div`
      animation: 6s ${keyframes`${fadeIn}`};
    `;
    const { renderLoginForm, authenticated, message } = this.state;
    let renderLogin;
    let performanceDataIndex;
    switch (true) {
      case renderLoginForm && !authenticated:
        renderLogin = <LoginForm submitFormHandler={this.onLogin} />;
        break;
      case !renderLoginForm && !authenticated:
        renderLogin = (
          <>
            <Button
              color="blue"
              id="login"
              onClick={() => this.setState({ renderLoginForm: true })}
            >
              Login
            </Button>
            <p id="message">{message}</p>
          </>
        );
        break;
      case authenticated:
        if (this.state.renderIndex) {
          performanceDataIndex = (
            <>
              <Button
                color="teal"
                onClick={() => this.setState({ renderIndex: false })}
              >
                Hide past entries
              </Button>
              <DisplayPerformanceData
                updateIndex={this.state.updateIndex}
                indexUpdated={() => this.setState({ updateIndex: false })}
              />
            </>
          );
        } else {
          performanceDataIndex = (
            <Button
              color="teal"
              id="show-index"
              onClick={() => this.setState({ renderIndex: true })}
            >
              Show past entries
            </Button>
          );
        }
        renderLogin = (
          <FadeIn>
            <Header as="h2" textAlign="center" id="message">
              Hi, {JSON.parse(sessionStorage.getItem("credentials")).uid}
            </Header>
          </FadeIn>
        );
        break;
      default:
        performanceDataIndex = <>Can't show any performance data</>;
        renderLogin = <>Something is really wrong</>;
    }
    return (
      <>
        <Container style={{ marginTop: 50, width: 800 }}>
          <h1>
            <Icon name="child" size="large" />
            Your Personal Cooper Database
          </h1>
          <InputFields
            onChangeHandler={this.onChangeHandler}
            onChangeHandler1={this.onChangeHandler1}
          />
          {renderLogin}
          <DisplayCooperResult
            distance={this.state.distance}
            gender={this.state.gender}
            age={this.state.age}
            authenticated={this.state.authenticated}
            entrySaved={this.state.entrySaved}
            entryHandler={() =>
              this.setState({ entrySaved: true, updateIndex: true })
            }
          />
          {performanceDataIndex}
        </Container>
      </>
    );
  }
}

export default App;
