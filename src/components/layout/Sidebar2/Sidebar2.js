import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "./Sidebar2.css";

const Sidebar2 = () => {
  const [expandedKey, setExpandedKey] = useState(
    localStorage.getItem("defaultOpenKey") || null
  );

  const selectedKey = localStorage.getItem("defaultSelectedKey");

  const handleToggle = (eventKey) => {
    if (eventKey === "sub1" || eventKey === "sub2") {
      setExpandedKey(expandedKey === eventKey ? null : eventKey);
      localStorage.setItem(
        "defaultOpenKey",
        expandedKey === eventKey ? null : eventKey
      );
    }
  };

  const handleItemClick = (selectedKey) => {
    localStorage.setItem("defaultSelectedKey", selectedKey);
  };

  return (
    <Navbar expand={false} className="sidebar-navbar">
      <Nav className="w-100">
        {/* User Management Section */}
        <Nav.Item className="sidebar-menu-group">
          <Nav.Link
            onClick={() => handleToggle("sub1")}
            className="sidebar-menu-header"
          >
            <span>
              <i className={"sidebar-icon icon-user"}>
                {" "}
                <span>User Management</span>
              </i>
            </span>
            <i
              className={`sidebarExpendIcon  ${
                expandedKey === "sub1" ? "icon-arrow-down" : "icon-arrow-right "
              }`}
            ></i>
          </Nav.Link>
          {expandedKey === "sub1" && (
            <div className="sidebar-submenu">
              <Link
                to="/BOP/AddBankUser"
                className={
                  selectedKey === "1"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("1")}
              >
                Add a Bank User
              </Link>
              <Link
                to="/BOP/CorporateUser"
                className={
                  selectedKey === "2"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("2")}
              >
                Add a Corporate User
              </Link>
              <Link
                to="/BOP/CorporateList"
                className={
                  selectedKey === "3"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("3")}
              >
                Corporate Users List
              </Link>
              <Link
                to="/BOP/BankerList"
                className={
                  selectedKey === "4"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("4")}
              >
                Banker List
              </Link>
              <Link
                to="/BOP/LoginHistory"
                className={
                  selectedKey === "5"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("5")}
              >
                Login History
              </Link>
              <Link
                to="/BOP/tradeCount"
                className={
                  selectedKey === "6"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("6")}
              >
                Trade Count
              </Link>
            </div>
          )}
        </Nav.Item>

        {/* Setup Section */}
        <Nav.Item className="sidebar-menu-group">
          <Nav.Link
            onClick={() => handleToggle("sub2")}
            className="sidebar-menu-header"
          >
            <span>
              <i className={"sidebar-icon icon-settings"}>
                {" "}
                <span>Setup</span>
              </i>
            </span>
            <span
              className={`sidebarExpendIcon  ${
                expandedKey === "sub2" ? "icon-arrow-down" : "icon-arrow-right "
              }`}
            ></span>
          </Nav.Link>
          {expandedKey === "sub2" && (
            <div className="sidebar-submenu">
              <Link
                to="/BOP/TradeAccessManagement"
                className={
                  selectedKey === "7"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("7")}
              >
                Trade Access Management
              </Link>
              <Link
                to="/BOP/categorymanagement"
                className={
                  selectedKey === "8"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("8")}
              >
                Category Management FX
              </Link>
              <Link
                to="/BOP/SpreadManagement"
                className={
                  selectedKey === "9"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("9")}
              >
                Spread Management
              </Link>
              <Link
                to="/BOP/volMeter"
                className={
                  selectedKey === "10"
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("10")}
              >
                Vol Meter
              </Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Sidebar2;
