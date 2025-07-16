import React, { useState } from "react";
import styles from "./CurrencyManagement.module.css";
import {
  Button,
  Checkbox,
  CustomPaper,
  CustomRadio,
  TextField,
  Table,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";

const CurrencyManagement = () => {
  const { Option } = Select;
  const navigate = useNavigate();

  const dataSource = [
    {
      key: "1",
      shortCode: "USD",
      description: "US Dollar",
      forwardApplicable: true,
      discountingApplicable: false,
    },
    {
      key: "2",
      shortCode: "EUR",
      description: "Euro",
    },
    {
      key: "3",
      shortCode: "GBP",
      description: "British Pound",
    },
  ];

  const columns = [
    {
      title: <label className="px-2">Short Code</label>,
      dataIndex: "shortCode",
      key: "shortCode",
      width: "100px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="px-2">Description</label>,
      dataIndex: "description",
      key: "description",
      width: "100px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="px-3">Forward Applicable</label>,
      dataIndex: "forwardApplicable",
      key: "forwardApplicable",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-check color-green"></i>}
                />
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: <label className="px-3">Discounting Applicable</label>,
      dataIndex: "discountingApplicable",
      key: "discountingApplicable",
      width: "100px",
      ellipsis: true,
      align: "center",

      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-check color-green"></i>}
                />
              </Col>
            </Row>
          </>
        );
      },
    },
    {
      title: <label className="px-3">Edit</label>,
      key: "edit",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-edit color-blue"></i>}
                />
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  return (
    <section className={styles["CurrencymangementStyles"]}>
      <Row className="mt-4">
        <Col lg={6} md={6} sm={12}>
          <span className={styles["Currency-Management-Heading"]}>
            Currency Management
          </span>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["Currencymangement-List-paper"]}>
            <Row>
              <Col lg={3} md={3} sm={12}>
                <TextField
                  placeholder="Add Short Code"
                  labelClass={"d-none"}
                  name={"corporateName"}
                />
              </Col>

              <Col lg={6} md={6} sm={12}>
                <div className="d-flex justify-content-start align-items-center w-100 mt-2">
                  <Checkbox
                    label2="Is Forward Applicable"
                    classNameDiv={styles["CheckboxActive"]}
                  />
                  <Checkbox
                    label2="Is Discounting Applicable"
                    classNameDiv={styles["CheckboxActive"]}
                  />
                </div>
              </Col>

              <Col
                lg={3}
                md={3}
                sm={12}
                className="d-flex justify-content-end gap-1"
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className={styles["Currency-Management-Search-btn"]}
                  text="Search"
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Currency-Management-Reset-btn"]}
                  text="Reset"
                  iconClass={styles["resetIconClass"]}
                />
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={false}
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

export default CurrencyManagement;
