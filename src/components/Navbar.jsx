import React, { useEffect, useState } from "react";
import { Button, Menu, Typography, Avatar } from "antd";
import { Link } from "react-router-dom";
import {
    MenuOutlined,
  HomeOutlined,
  MoneyCollectOutlined,
  FundOutlined,
} from "@ant-design/icons";

import icon from "../images/crypto.jpg";

const Navbar = () => {
  const [activeMenu, setActiveMenu] = useState(true);
  const [screenSize, setScreenSize] = useState(null);

  useEffect(() => {
    const handleSize = () => setScreenSize(window.innerWidth);

    window.addEventListener("resize", handleSize);

    handleSize();

    return () => {
      window.removeEventListener("resize", handleSize);
    };
  }, []);

  useEffect(() => {
    if (screenSize < 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="nav-container">
      <div className="logo-container">
        <Avatar src={icon} size="large" />
        <Typography.Title level={2} className="logo">
          <Link to="/">Cryptopia</Link>
        </Typography.Title>
      </div>
      <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)}>
        <MenuOutlined />
      </Button>
      {activeMenu && (
        <Menu theme="dark">
          <Menu.Item icon={<HomeOutlined />}>
            <Link to="/">Home</Link>
          </Menu.Item>
          <Menu.Item icon={<FundOutlined />}>
            <Link to="/cryptocurrencies">Crypto Currencies</Link>
          </Menu.Item>
        </Menu>
      )}
    </div>
  );
};

export default Navbar;
