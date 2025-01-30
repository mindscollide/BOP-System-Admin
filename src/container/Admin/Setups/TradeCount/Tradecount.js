import React, { useState } from "react";
import styles from "./Tradecount.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
import ExportShowComponent from "../BankerList/ExportShowComponent";
import { tradeCountSchema } from "../../../../utils/schemas";
import {
  natureOfClientOptions,
  transactionSide,
} from "../../../../helpers/Dropdown";
import { formatDate } from "../../../../helpers/reusableMethods";

const TradeCount = () => {
  //Trade Count States
  const [tradeCount, setTradeCount] = useState({ ...tradeCountSchema });

  //Sate For Side
  const [side, setSide] = useState("");

  //Sate for Nature
  const [nature, setNature] = useState("");

  // Trade Count validate handler
  const tradeCountValidateHandler = (e) => {
    const { name, value } = e.target;

    const updateField = (fieldName, regex, value) => {
      let valueCheck = value.replace(regex, "");
      if (valueCheck !== "") {
        setTradeCount((prevTradeCount) => ({
          ...prevTradeCount,
          [fieldName]: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        }));
      } else {
        setTradeCount((prevTradeCount) => ({
          ...prevTradeCount,
          [fieldName]: {
            value: "",
            errorMessage: "",
            errorStatus: false,
          },
        }));
      }
    };
    //validation rules
    switch (name) {
      case "transactionID":
        updateField("TxnID", /[^a-zA-Z0-9/-]/g, value);
        break;
      case "ClientName":
        updateField("clientName", /[^a-zA-Z ]/g, value);
        break;
      case "Amount":
        updateField("Amount", /[^\d]/g, value);
        break;
      case "AccountNumber":
        updateField("AccountNumber", /[^\d]/g, value);
        break;
      case "LC":
        updateField("LC", /[^\d]/g, value);
        break;
      default:
        break;
    }
  };
  //Handle Date Change method
  const handleDateChange = (fieldName, value) => {
    setTradeCount((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));

    // Example validation: Start Date should be before End Date
    if (
      fieldName === "dateFrom" &&
      tradeCount.dateTo.value &&
      new Date(value) > new Date(tradeCount.dateTo.value)
    ) {
      setTradeCount((prev) => ({
        ...prev,
        dateFrom: {
          ...prev.dateFrom,
          errorMessage: "Start date cannot be after end date.",
          errorStatus: true,
        },
      }));
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
      dataIndex: "side",
      key: "side",
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

  const handleSearchEventButton = () => {
    let searchData = {
      TxnID: tradeCount.TxnID.value,
      clientName: tradeCount.clientName.value,
      side: tradeCount.side.value,
      Amount: tradeCount.Amount.value,
      LC: tradeCount.LC.value,
      AccountNumber: tradeCount.AccountNumber.value,
      Nature: tradeCount.Nature.value,
      From: formatDate(tradeCount.dateFrom.value),
      To: formatDate(tradeCount.dateTo.value),
    };

    console.log("searchData is", searchData);
  };

  const handleResetEventButton = () => {
    setTradeCount({
      ...tradeCountSchema,
      side: {
        value: "",
      },
      Nature: {
        value: "",
      },
      dateFrom: {
        value: "",
      },
      dateTo: {
        value: "",
      },
    });
    setSide("");
    setNature("");
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
  };

  const data = [
    {
      key: "1",
      // email: (
      //   <>
      //     <span className="cursor-pointer" onClick={handleOnClickEmail}>
      //       john.doe@example.com
      //     </span>
      //   </>
      // ),
      Name: "John Doe",
      Corporatename: "Acme Corp",
      Status: "Active",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i className="icon-edit color-blue"></i>
            <i className="icon-trash color-red"></i>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      // email: (

      // ),
      Name: "Tom Cruise",
      Corporatename: "Yunus Corp",
      Status: "Inactive",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i class="icon-edit color-blue"></i>
            <i class="icon-trash color-red"></i>
          </Col>
        </Row>
      ),
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
                  maxLength={20}
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
                <Select
                  name="side"
                  placeholder="Select Side"
                  options={transactionSide}
                  value={side}
                  isSearchable
                  onChange={(e) =>
                    handleDropdownChange("side", e, setSide, tradeCount.side)
                  }
                ></Select>
              </Col>
              <Col lg={2} md={2} sm={12}>
                <Select
                  placeholder="Select Nature"
                  classNamePrefix={"TradeCountSelect"}
                  name="nature"
                  options={natureOfClientOptions}
                  value={nature}
                  isSearchable
                  onChange={(e) =>
                    handleDropdownChange(
                      "nature",
                      e,
                      setNature,
                      tradeCount.Nature
                    )
                  }
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
                  placeholder="Account Number"
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
                  name="dateFrom"
                  value={tradeCount.dateFrom.value}
                  placeholder="Start date"
                  showOtherDays="true"
                  inputClass={styles["Tradecount-Datepicker-left"]}
                  onChange={(date) => handleDateChange("dateFrom", date)}
                />
                <label className={styles["Tradecount-date-to"]}>to</label>

                <DatePicker
                  name="dateTo"
                  value={tradeCount.dateTo.value}
                  placeholder="End Date"
                  showOtherDays="true"
                  inputClass={styles["Tradecount-Datepicker-right"]}
                  onChange={(date) => handleDateChange("dateTo", date)}
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
                  onClick={handleSearchEventButton}
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
                  onClick={handleResetEventButton}
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
                  rows={data}
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
