import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Layout, Typography, Space } from "antd";

import "antd/dist/antd.css";
import "./App.css";
import {
  Navbar,
  Homepage,
  Cryptocurrencies,
  CryptoDetails,
  Exchanges,
} from "./components";

const App = () => {
  return (
    <div className="app">
      <div className="navbar">
        <Navbar />
      </div>
      <div className="main">
        <Layout>
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
            <Link to="/exchanges">Exchanges</Link>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default App;
