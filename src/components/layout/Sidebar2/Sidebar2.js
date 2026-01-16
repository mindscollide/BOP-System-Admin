import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Nav, Navbar } from "react-bootstrap";
import "./Sidebar2.css";

const Sidebar2 = () => {
  const [expandedKey, setExpandedKey] = useState(
    sessionStorage.getItem("defaultOpenKey") || null
  );
  const location = useLocation();

  const selectedKey = sessionStorage.getItem("defaultSelectedKey");

  const handleToggle = (eventKey) => {
    if (eventKey === "sub1" || eventKey === "sub2") {
      setExpandedKey(expandedKey === eventKey ? null : eventKey);
      sessionStorage.setItem(
        "defaultOpenKey",
        expandedKey === eventKey ? null : eventKey
      );
    }
  };

  const handleItemClick = (selectedKey) => {
    sessionStorage.setItem("defaultSelectedKey", selectedKey);
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
                  location.pathname.includes("AddBankUser")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("AddBankUser")}
              >
                Add a Bank User
              </Link>
              <Link
                to="/BOP/CorporateUser"
                className={
                  location.pathname.includes("CorporateUser")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("CorporateUser")}
              >
                Add a Corporate User
              </Link>
              <Link
                to="/BOP/CorporateList"
                className={
                  location.pathname.includes("CorporateList")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("CorporateList")}
              >
                Corporate Users List
              </Link>
              <Link
                to="/BOP/BankerList"
                className={
                  location.pathname.includes("BankerList")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("BankerList")}
              >
                Banker List
              </Link>
              <Link
                to="/BOP/LoginHistory"
                className={
                  location.pathname.includes("LoginHistory")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("LoginHistory")}
              >
                Login History
              </Link>
              <Link
                to="/BOP/tradeCount"
                className={
                  location.pathname.includes("tradeCount")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("tradeCount")}
              >
                Daily Trade
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
                  location.pathname.includes("TradeAccessManagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("TradeAccessManagement")}
              >
                Trade Access Management
              </Link>
              <Link
                to="/BOP/categorymanagement"
                className={
                  location.pathname.includes("categorymanagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("categorymanagement")}
              >
                Category Management FX
              </Link>
              <Link
                to="/BOP/SpreadManagement"
                className={
                  location.pathname.includes("SpreadManagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("SpreadManagement")}
              >
                Spread Management
              </Link>
              <Link
                to="/BOP/volMeter"
                className={
                  location.pathname.includes("volMeter")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("volMeter")}
              >
                Vol Meter
              </Link>
              <Link
                to="/BOP/CurrencyManagement"
                className={
                  location.pathname.includes("CurrencyManagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("CurrencyManagement")}
              >
                Currency Management
              </Link>
              <Link
                to="/BOP/HolidaysManagement"
                className={
                  location.pathname.includes("HolidaysManagement")
                    ? "sidebar-menu-item_Active"
                    : "sidebar-menu-item"
                }
                onClick={() => handleItemClick("HolidaysManagement")}
              >
                Holidays
              </Link>
            </div>
          )}
        </Nav.Item>
      </Nav>
    </Navbar>
  );
};

export default Sidebar2;
