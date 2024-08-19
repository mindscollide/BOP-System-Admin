import React, { useState } from "react";
import styles from "./TradeAccessManagement.module.css";
import {
  CustomPaper,
  CustomRadio,
  CustomSwitch,
  Table,
  TextField,
} from "../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
const TradeAccessManagement = () => {
  const { Option } = Select;
  //States
  const [value, setValue] = useState("Corporate");

  const [dropdownvalue, setDropdownvalue] = useState(25);

  const handleChangeDropDown = (value) => {
    console.log(`selected ${value}`);
    setDropdownvalue(value);
  };

  //Radio Buttons Management
  const handleChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  //Options for radio
  const radioOptions = [
    { label: "Corporate", value: "Corporate" },
    { label: "Branch", value: "Branch" },
  ];

  //Table columns for TradeAccess Management List
  const columns = [
    {
      title: <label className="bottom-table-header">Counter Party Name</label>,
      dataIndex: "CounterPartyName",
      key: "CounterPartyName",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: () => {
        return (
          <>
            <span>Atlas Honda</span>
          </>
        );
      },
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "Edit",
      key: "Edit",
      width: "100px",
      ellipsis: true,
      align: "center",
    },

    {
      title: <label className="bottom-table-header">Active</label>,
      dataIndex: "Active",
      key: "Active",
      width: "100px",
      ellipsis: true,
      align: "center",
    },

    {
      title: <label className="bottom-table-header">Trade</label>,
      dataIndex: "Trade",
      key: "Trade",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
  ];

  //Dummy Data Source
  const dataSource = [
    {
      key: "1",
      CounterPartyName: "Atlas Honda",
      Edit: (
        <>
          <Row>
            <Col lg={12} md={12} sm={12} className="color-blue">
              <i class="icon-edit "></i>
            </Col>
          </Row>
        </>
      ),
      Active: (
        <>
          <CustomSwitch size="large" defaultChecked />
        </>
      ),
      Trade: (
        <>
          <CustomSwitch size="large" defaultChecked />
        </>
      ),
    },
  ];

  return (
    <section className={styles["TradeAccessmangementStyles"]}>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-3 align-items-center"
              >
                <CustomRadio
                  options={radioOptions}
                  onChange={handleChange}
                  value={value}
                  name="customRadio"
                  size="default"
                  className="custom-radio-group"
                />
                <TextField
                  placeholder="Branch Name"
                  labelClass={"d-none"}
                  className={"BranchNameTradeAccessManagement"}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-1 align-items-center"
              >
                <span>Show</span>

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

                <span>entries</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={true}
                  rows={dataSource}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
    </section>
  );
};

export default TradeAccessManagement;
