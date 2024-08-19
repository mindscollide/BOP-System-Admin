import React from "react";
import "./SideBarItem.css";
import right from "../../../assets/images/righy.svg";
import { useState } from "react";
const SideBarItem = ({ item }) => {
  const [open, setOpen] = useState(false);

  const handleToggle = () => {
    setOpen(!open);
  };
  if (item.childrens) {
    return (
      <div className={open ? "Sidebar-item open" : "Sidebar-item"}>
        <div className="Sidebar-title">
          <span>
            {item.icon && <i className={item.icon}></i>}
            {item.title}
          </span>
          <i
            className="bi bi-chevron-right toggle-btn"
            onClick={handleToggle}
          ></i>
        </div>
        <div className="sidebar-content">
          Services
          {/* {item.childrens.map((child, index) => (
            <SideBarItem key={index} item={child} />
          ))} */}
        </div>
      </div>
    );
  }
};

export default SideBarItem;
