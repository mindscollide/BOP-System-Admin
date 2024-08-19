import React from "react";
import styles from "./Tradecount.module.css";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";

const TradeCount = () => {
  // column for LoginHistory
  const tradeColumns = [
    {
      title: <label className="bottom-table-header">TXN ID</label>,
      dataIndex: "transactionID",
      key: "transactionID",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Client</label>,
      dataIndex: "name",
      key: "name",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Side</label>,
      dataIndex: "company",
      key: "company",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Nature</label>,
      dataIndex: "category",
      key: "category",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">CCY1</label>,
      dataIndex: "email",
      key: "email",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "securityType",
      key: "securityType",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Rate</label>,
      dataIndex: "position",
      key: "position",
      width: "100px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">CCY2</label>,
      dataIndex: "amount",
      key: "amount",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "rateDone",
      key: "rateDone",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Date</label>,
      dataIndex: "tradeDate",
      key: "tradeDate",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Time</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">LC #</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Comment</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
  ];

  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["tradeCount-label"]}>Trade Count</span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row className="mt-3">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="TXN ID"
                  name="transactionID"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Client Name"
                  name="firstName"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Side"
                  name="lastName"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <Select
                  placeholder="Select Nature"
                  classNamePrefix={"TradeCountSelect"}
                  name="Category"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Amount"
                  name="Amount"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="LC #"
                  name="LC"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Security Type"
                  name="securityType"
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col
                lg={4}
                md={4}
                sm={12}
                className="d-flex align-items-center  pe-4"
              >
                <DatePicker
                  placeholder="Start date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-left"]}
                />
                <label className={styles["Tradecount-date-to"]}>to</label>

                <DatePicker
                  placeholder="End Date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-right"]}
                />
              </Col>
              <Col
                lg={6}
                md={6}
                sm={12}
                className="d-flex justify-content-center gap-1"
              >
                <Button
                  text="Search"
                  icon={<i className="icon-search"></i>}
                  className={styles["Search-tradeCount-btn"]}
                />
                <Button
                  text="Downlaod Excel"
                  icon={<i className="icon-download-excel"></i>}
                  className={styles["tradeCount-Download-Excel-btn"]}
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                />
              </Col>
            </Row>

            <Row className="mt-2">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={tradeColumns}
                  pagination={false}
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

export default TradeCount;
