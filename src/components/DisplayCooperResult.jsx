import React from "react";
import coopercalculator from "../modules/cooperCalculator";
import { saveData } from "../modules/performanceData";
import { Button, Header, Segment } from "semantic-ui-react";

const DisplayCooperResult = ({
  distance,
  gender,
  age,
  authenticated,
  entrySaved,
  entryHandler,
}) => {
  const result = coopercalculator(distance, gender, age);

  const propsPassed = distance && age ? true : false;

  return (
    <>
      {propsPassed && (
        <>
          <Segment>
            <Header as="h3" id="cooper-message">
              {age} y/o {gender} running {distance} meters.
            </Header>
            <Header as="h4" id="cooper-result">
              Result: {result}
            </Header>
            {authenticated && !entrySaved ? (
              <Button
                color="teal"
                id="save-result"
                onClick={() => saveData(result, entryHandler)}
              >
                Save entry
              </Button>
            ) : (
              <p id="response-message">Your entry was saved</p>
            )}
          </Segment>
        </>
      )}
    </>
  );
};

export default DisplayCooperResult;
