import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Line } from "react-chartjs-2";
import { Container, Segment } from "semantic-ui-react";

class DisplayPerformanceData extends Component {
  state = {
    performanceData: null,
  };

  componentDidMount() {
    this.getPerformanceData();
  }
  componentDidUpdate(prevProps) {
    if (this.props.updateIndex !== prevProps.updateIndex) {
      this.getPerformanceData();
    }
  }
  async getPerformanceData() {
    let result = await getData();
    this.setState({ performanceData: result.data.entries }, () => {
      this.props.indexUpdated();
    });
  }
  render() {
    let receivedData = this.state.performanceData;
    let [dataMessage, dataDistance] = [[], []];

    if (receivedData != null) {
      receivedData.forEach((e) => {
        dataMessage.push(e.data.message);
        dataDistance.push(e.data.distance);
      });
    }
    let chartData = {
      labels: dataMessage,
      datasets: [
        {
          data: dataDistance,
          label: "Cooper Record",
          fill: true,
          lineTension: 0.3,
          backgroundColor: "rgba(75,192,192,0.4)",
          borderColor: "rgba(75,192,192,1)",
          borderCapStyle: "butt",
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: "miter",
          pointBorderColor: "rgba(75,192,192,1)",
          pointBackgroundColor: "#fff",
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(75,192,192,1)",
          pointHoverBorderColor: "rgba(220,220,220,1)",
          pointHoverBorderWidth: 2,
          pointRadius: 1,
          pointHitRadius: 10,
        },
      ],
    };
    return (
      <Segment>
        <Container>
          <div id="index">
            <Line
              data={chartData}
              width={50}
              height={200}
              options={{ maintainAspectRatio: false }}
            />
          </div>
        </Container>
      </Segment>
    );
  }
}
export default DisplayPerformanceData;
