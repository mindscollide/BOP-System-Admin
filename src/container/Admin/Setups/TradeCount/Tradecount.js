import React, { useState } from "react";
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
import ExportShowComponent from "../BankerList/ExportShowComponent";

const TradeCount = () => {
  //Trade Count States
  const [tradeCount, setTradeCount] = useState({
    TxnID: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    clientName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    side: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Amount: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    LC: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    AccountNumber: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //Trade Count validate handler
  const tradeCountValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //TXNID
    if (name === "transactionID") {
      // Regex to allow only numbers, alphabets, dash (-), and slash (/)
      const txnIdRegex = /^[a-zA-Z0-9-/]+$/;

      // Test the input value against the regex
      if (txnIdRegex.test(value)) {
        // If valid, allow it to be set
        setTradeCount({
          ...tradeCount,
          TxnID: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else {
        // Prevent setting the invalid value in the state
        setTradeCount({
          ...tradeCount,
          TxnID: {
            value: "", // Clear the input or keep the last valid input
            errorMessage:
              "Only letters, numbers, dash (-), and slash (/) are allowed.",
            errorStatus: true,
          },
        });
      }
    }

    //Client Name
    if (name === "ClientName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setTradeCount({
          ...tradeCount,
          clientName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ClientName" && value === "") {
      setTradeCount({
        ...tradeCount,
        clientName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    // Amount
    if (name === "Amount") {
      // Regex to allow only numbers
      const amountRegex = /^\d*$/;

      // Test the input value against the regex
      if (amountRegex.test(value)) {
        // If valid, allow it to be set
        setTradeCount({
          ...tradeCount,
          Amount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else {
        // Prevent setting the invalid value in the state
        setTradeCount({
          ...tradeCount,
          Amount: {
            value: "",
            errorMessage: "Only numbers are allowed.",
            errorStatus: true,
          },
        });
      }
    } else if (name === "Amount" && value === "") {
      setTradeCount({
        ...tradeCount,
        Amount: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    // LC number
    if (name === "LC") {
      // Regex to allow only numbers
      const amountRegex = /^\d*$/;

      // Test the input value against the regex
      if (amountRegex.test(value)) {
        // If valid, allow it to be set
        setTradeCount({
          ...tradeCount,
          LC: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else {
        // Prevent setting the invalid value in the state
        setTradeCount({
          ...tradeCount,
          LC: {
            value: "",
            errorMessage: "Only numbers are allowed.",
            errorStatus: true,
          },
        });
      }
    } else if (name === "Amount" && value === "") {
      setTradeCount({
        ...tradeCount,
        LC: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    //Account Number

    if (name === "AccountNumber") {
      // Regex to allow only numbers
      const amountRegex = /^\d*$/;

      // Test the input value against the regex
      if (amountRegex.test(value)) {
        // If valid, allow it to be set
        setTradeCount({
          ...tradeCount,
          AccountNumber: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      } else {
        // Prevent setting the invalid value in the state
        setTradeCount({
          ...tradeCount,
          AccountNumber: {
            value: "",
            errorMessage: "Only numbers are allowed.",
            errorStatus: true,
          },
        });
      }
    } else if (name === "AccountNumber" && value === "") {
      setTradeCount({
        ...tradeCount,
        AccountNumber: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };
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
                  value={tradeCount.TxnID.value}
                  onChange={tradeCountValidateHandler}
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Client Name"
                  name="ClientName"
                  labelClass="d-none"
                  value={tradeCount.clientName.value}
                  onChange={tradeCountValidateHandler}
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
                  onChange={tradeCountValidateHandler}
                  value={tradeCount.Amount.value}
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="LC #"
                  name="LC"
                  value={tradeCount.LC.value}
                  onChange={tradeCountValidateHandler}
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="AccountNumber"
                  name="AccountNumber"
                  value={tradeCount.AccountNumber.value}
                  onChange={tradeCountValidateHandler}
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
                <ExportShowComponent />
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
