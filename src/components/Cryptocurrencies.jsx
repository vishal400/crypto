import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import millify from "millify";

import { useGetCryptosQuery } from "../services/cryptoApi";
import { Card, Col, Row } from "antd";

const Cryptocurrencies = (props) => {
  const count = props.simplified ? 10 : 100;
  const { data, isFetching } = useGetCryptosQuery(count);
  const [coins, setCoins] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    const filteredData = data?.data?.coins.filter((coin) => {
      return coin.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    setCoins(filteredData);
  }, [data, searchTerm]);

  const searchHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  if (isFetching) return "Loading...";

  return (
    <>
      {!props.simplified && (
        <div className="search-crypto">
          <input placeholder="Search currency" onChange={searchHandler} />
        </div>
      )}

      <Row gutter={[64, 32]} className="crypto-card-container">
        {coins?.map((currency) => {
          return (
            <Col
              className="crypto-card"
              xs={24}
              sm={12}
              lg={8}
              key={currency.uuid}
            >
              <Link key={currency.uuid} to={`/crypto/${currency.uuid}`}>
                <Card
                  title={`${currency.rank}. ${currency.name}`}
                  extra={
                    <img className="crypto-image" src={currency.iconUrl} />
                  }
                  hoverable
                >
                  <p>Price: {millify(currency.price)} $</p>
                  <p>Market Cap: {millify(currency.marketCap)}</p>
                  <p>Change: {millify(currency.change)}</p>
                </Card>
              </Link>
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
