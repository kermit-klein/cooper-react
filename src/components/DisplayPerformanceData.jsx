import React, { Component } from "react";
import { getData } from "../modules/performanceData";
import { Line, Pie, Radar } from "react-chartjs-2";
import { Container, Segment, Grid } from "semantic-ui-react";

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

    let occurance = (arr) => {
      var a = [],
        b = [],
        prev;

      arr.sort();
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] !== prev) {
          a.push(arr[i]);
          b.push(1);
        } else {
          b[b.length - 1]++;
        }
        prev = arr[i];
      }

      return [a, b];
    };

    let pieRadarOccurance = occurance(dataMessage);

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

    let pieChartData = {
      labels: pieRadarOccurance[0],
      datasets: [
        {
          data: pieRadarOccurance[1],
          backgroundColor: [
            "#FF6384",
            "#36A2EB",
            "#FFCE56",
            "#449c44",
            "#db822a",
            "#bb2adb",
          ],
        },
      ],
    };
    let radarChartData = {
      labels: pieRadarOccurance[0],
      datasets: [
        {
          data: pieRadarOccurance[1],
          backgroundColor: "rgba(255,99,132,0.2)",
          borderColor: "rgba(255,99,132,1)",
          pointBackgroundColor: "rgba(255,99,132,1)",
          pointBorderColor: "#fff",
          pointHoverBackgroundColor: "#fff",
          pointHoverBorderColor: "rgba(255,99,132,1)",
          label: "Cooper Performance",
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
        <Grid divided="vertically">
          <Grid.Row columns={2}>
            <Grid.Column>
              {" "}
              <Pie
                data={pieChartData}
                width={50}
                height={200}
                options={{ maintainAspectRatio: false }}
              />
            </Grid.Column>
            <Grid.Column>
              <Radar
                data={radarChartData}
                width={50}
                height={200}
                options={{ maintainAspectRatio: false }}
              />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </Segment>
    );
  }
}
export default DisplayPerformanceData;
