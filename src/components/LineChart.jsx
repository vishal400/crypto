import React from "react";
import { Line } from "react-chartjs-2";
import { Col, Row, Typography } from "antd";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { useSelector } from "react-redux";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const { Title, Text } = Typography;

const LineChart = (props) => {
    const currencySign = useSelector((state) => state.currency.sign)
  const coinHistory = props.coinHistory;
  const currentPrice = props.currentPrice;
  const coinName = props.coinName;
  const coinPrice = [];
  const coinTimestamp = [];

  console.log(coinHistory);
  console.log("this one");
  //inflate coinprice and timestamp array
  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {
    coinPrice.push(coinHistory?.data?.history[i].price);
    coinTimestamp.push(
      new Date(
        coinHistory?.data?.history[i].timestamp * 1000
      ).toLocaleDateString()
    );
  }

  for (let i = 0; i < coinHistory?.data?.history?.length; i += 1) {}

  console.log(coinTimestamp[1]);
  const data = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071ad",
        borderColor: "orange",
      },
    ],
  };

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <React.Fragment>
      <Row className="chart-header">
        <Title level={2} className="chart-title">
          Price Chart
        </Title>
        <Col className="price-container">
          <Title level={5} className="price-change">
            Change:{" "}
            {coinHistory?.data?.change < 0 ? (
              <Text style={{color: 'red'}}>{coinHistory?.data?.change}%</Text>
            ) : (
              <Text style={{color: 'green'}}>{coinHistory?.data?.change}%</Text>
            )}
          </Title>
          <Title level={5} className="current-price">
            Current {coinName} Price: {currencySign} {currentPrice}
          </Title>
        </Col>
      </Row>
      <Line data={data} options={options} />
    </React.Fragment>
  );
};

export default LineChart;
