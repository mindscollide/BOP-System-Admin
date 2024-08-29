import { Select } from "antd";
import React, { useState } from "react";
import styles from "./BankerList.module.css";
import { Col, Row } from "react-bootstrap";
const ExportShowComponent = () => {
  const { Option } = Select;
  const [dropdownvalue, setDropdownvalue] = useState(25);

  const handleChangeDropDown = (value) => {
    console.log(`selected ${value}`);
    setDropdownvalue(value);
  };

  return (
    <>
      <Row className="mt-3">
        <Col
          lg={12}
          md={12}
          sm={12}
          className="d-flex gap-1 align-items-center"
        >
          <span className={styles["spanshowClass"]}>Show</span>

          <Select
            defaultValue={dropdownvalue}
            style={{ width: 60, margin: "0 10px" }}
            onChange={handleChangeDropDown}
          >
            <Option value={10}>10</Option>
            <Option value={25}>25</Option>
            <Option value={50}>50</Option>
            <Option value={100}>100</Option>
          </Select>

          <span className={styles["spanshowClass"]}>entries</span>
        </Col>
      </Row>
    </>
  );
};

export default ExportShowComponent;
