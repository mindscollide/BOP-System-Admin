import "./Sidebar2.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "antd";

const Sidebar2 = () => {
  const { SubMenu } = Menu;
  const navigate = useNavigate();
  const [openKeys, setOpenKeys] = useState([
    localStorage.getItem("defaultOpenKey"),
  ]);

  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (latestOpenKey) {
      setOpenKeys([latestOpenKey]);
    } else {
      setOpenKeys([]);
    }
  };

  const navigateToAddaBankUser = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "1");
    navigate("/BOP/AddBankUser");
  };

  const navigateToCorporateUser = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "2");
    navigate("/BOP/CorporateUser");
  };

  const navigateToCorporateList = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "3");
    navigate("/BOP/CorporateList");
  };

  const navigateToBankerList = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "4");
    navigate("/BOP/BankerList");
  };

  const navigateToLoginHistory = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "5");
    navigate("/BOP/LoginHistory");
  };

  const navigateToTradeCount = () => {
    navigate("/BOP/tradeCount");
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "6");
  };
  const navigateToTradeAccessManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "7");
    navigate("/BOP/TradeAccessManagement");
  };
  const navigateToCategoryManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/BOP/categorymanagement");
  };

  const navigateToSpreadManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "9");
    navigate("/BOP/SpreadManagement");
  };

  const navigateToVolMeter = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "10");
    navigate("/BOP/volMeter");
  };

  return (
    <Menu
      theme="dark"
      mode="inline"
      selectedKeys={[localStorage.getItem("defaultSelectedKey")]}
      className="Menu-sidebar-class"
    >
      <SubMenu
        key="sub1"
        icon={<i className="icon-user menu-icons"></i>}
        title="User Management"
        className="submenu-sidebar-icons"
        theme="light"
        style={{ background: "#4d4946" }}
      >
        <Menu.Item
          className="menu-items-sidebar"
          key="1"
          onClick={navigateToAddaBankUser}
        >
          Add a Bank User
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="2"
          onClick={navigateToCorporateUser}
        >
          Add a Corporate User
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="3"
          onClick={navigateToCorporateList}
        >
          Corporate Users List
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="4"
          onClick={navigateToBankerList}
        >
          Banker List
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="5"
          onClick={navigateToLoginHistory}
        >
          Login History
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="6"
          onClick={navigateToTradeCount}
        >
          Trade Count
        </Menu.Item>
      </SubMenu>

      <SubMenu
        key="sub2"
        icon={<i className="icon-settings menu-icons"></i>}
        title="Setup"
        className="submenu-sidebar-icons"
      >
        <Menu.Item
          className="menu-items-sidebar"
          key="7"
          onClick={navigateToTradeAccessManagement}
        >
          Trade Access Management
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="8"
          onClick={navigateToCategoryManagement}
        >
          Category Management FX
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="9"
          onClick={navigateToSpreadManagement}
        >
          Spread Management
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="10"
          onClick={navigateToVolMeter}
        >
          Vol Meter
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sidebar2;
