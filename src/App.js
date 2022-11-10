import React, { useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space, Select } from "antd";
import axios from "axios";

import "antd/dist/antd.css";
import "./App.css";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
} from "./components";
import { useGetReferenceCurrencyQuery } from "./services/cryptoApi";
import { currencyActions } from "./app/store";
import { useDispatch, useSelector } from "react-redux";
import Title from "antd/lib/typography/Title";

const { Option } = Select;

const App = () => {
  const [currencies, setCurrencies] = useState(null);
  console.log(process.env.REACT_APP_RAPID_API_KEY);
  //   const [currency, setCurrency] = useState("yhjMzLPhuIDl");
  //   const  currency = useSelector((state))
  const dispatch = useDispatch();

  const fetchReferenceCurrencies = async () => {
    try {
      const res = await axios.get(
        `https://coinranking1.p.rapidapi.com/reference-currencies`,
        {
          headers: {
            "x-rapidapi-host": "coinranking1.p.rapidapi.com",
            "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
          },
          params: { limit: 100 },
        }
      );
      const data = res?.data?.data?.currencies;
      data.sort((a, b) => {
        if (a.name < b.name) {
          return -1;
        }
        if (a.name > b.name) {
          return 1;
        }
        return 0;
      });
      setCurrencies(data);
    } catch (err) {
      console.log(err);
    }
  };

  const currencyChangeHandler = (key, value) => {
    console.log(value);
    const data = { key, sign: value.children[4], name: value.children[2] };
    dispatch(currencyActions.updateCurrency(data));
    // setCurrency(key)
  };

  useEffect(() => {
    fetchReferenceCurrencies();
  }, []);

  //   useEffect(() => {
  //     console.log("currency changed")
  //     console.log(currency)
  //   }, [currency])

  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
          <div className="select-currency-container">
            <Title level={3}>Choose reference currency</Title>
            <Select
              defaultValue="US Dollar"
              className="select-currency"
              placeholder="Select Reference Currency"
              onChange={(key, value) => currencyChangeHandler(key, value)}
            >
              {currencies &&
                currencies.map((currency) => {
                  return (
                    <Option key={currency.uuid}>
                      <img
                        src={currency.iconUrl}
                        style={{ width: "20px" }}
                      />{" "}
                      {currency.name} {currency?.sign}
                    </Option>
                  );
                })}
            </Select>
          </div>

          <div className="routes">
            <Routes>
              <Route path="/" element=<Homepage /> />
              <Route exact path="/exchanges" element=<Exchanges /> />
              <Route
                exact
                path="/cryptocurrencies"
                element=<Cryptocurrencies />
              />
              <Route exact path="/crypto/:coinId" element=<CryptoDetails /> />
            </Routes>
          </div>
        </Layout>

        <div className="footer">
          <Typography.Title
            level={5}
            style={{ color: "white", textAlign: "center" }}
          >
            Cryptopia <br />
            All rights reserved
          </Typography.Title>
          <Space>
            <Link to="/">Home</Link>
            <Link to="/cryptocurrencies">Cryptocurrencies</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
