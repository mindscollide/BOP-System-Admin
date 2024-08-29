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
    localStorage.setItem("defaultSelectedKey", "6");
    navigate("/SystemAdmin/AddBankUser");
  };

  const navigateToCorporateUser = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "7");
    navigate("/SystemAdmin/CorporateUser");
  };

  const navigateToCorporateList = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "8");
    navigate("/SystemAdmin/CorporateList");
  };

  const navigateToBankerList = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "9");
    navigate("/SystemAdmin/BankerList");
  };

  const navigateToLoginHistory = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "10");
    navigate("/SystemAdmin/LoginHistory");
  };

  const navigateToTradeCount = () => {
    navigate("/SystemAdmin/tradeCount");
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "11");
  };

  const navigateToVolMeter = () => {
    localStorage.setItem("defaultOpenKey", "sub1");
    localStorage.setItem("defaultSelectedKey", "13");
    navigate("/SystemAdmin/volMeter");
  };

  const navigateToCategoryManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "14");
    navigate("/SystemAdmin/categorymanagement");
  };

  const navigateToTradeAccessManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "15");
    navigate("/SystemAdmin/TradeAccessManagement");
  };

  const navigateToSpreadManagement = () => {
    localStorage.setItem("defaultOpenKey", "sub2");
    localStorage.setItem("defaultSelectedKey", "16");
    navigate("/SystemAdmin/SpreadManagement");
  };

  return (
    <Menu
      theme="dark"
      openKeys={openKeys}
      onOpenChange={onOpenChange}
      defaultSelectedKeys={[localStorage.getItem("defaultSelectedKey")]}
      mode="inline"
      className="Menu-sidebar-class"
    >
      <SubMenu
        key="sub1"
        icon={<i className="icon-user menu-icons"></i>}
        title="User Management"
        className="submenu-sidebar-icons"
      >
        <Menu.Item
          className="menu-items-sidebar"
          key="6"
          onClick={navigateToAddaBankUser}
        >
          Add a Bank User
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="7"
          onClick={navigateToCorporateUser}
        >
          Add a Corporate User
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="8"
          onClick={navigateToCorporateList}
        >
          Corporate List
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="9"
          onClick={navigateToBankerList}
        >
          Banker List
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="10"
          onClick={navigateToLoginHistory}
        >
          Login History
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="11"
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
          key="14"
          onClick={navigateToTradeAccessManagement}
        >
          Trade Access Management
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="15"
          onClick={navigateToCategoryManagement}
        >
          Category Management FX
        </Menu.Item>

        <Menu.Item
          className="menu-items-sidebar"
          key="16"
          onClick={navigateToSpreadManagement}
        >
          Spread Management
        </Menu.Item>
        <Menu.Item
          className="menu-items-sidebar"
          key="17"
          onClick={navigateToVolMeter}
        >
          Vol Meter
        </Menu.Item>
      </SubMenu>
    </Menu>
  );
};

export default Sidebar2;
