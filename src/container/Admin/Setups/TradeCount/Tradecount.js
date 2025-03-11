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
import { useDispatch } from "react-redux";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import {
  AddBankUserConfirmationModalSystemAdmin,
  ConfirmationModalSystemAdmin,
  TradeCountCommentModalSystemAdmin,
} from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import CommentModal from "./CommentModal/CommentModal";

const TradeCount = () => {
  const dispatch = useDispatch();
  //Trade Count States
  const [tradeCount, setTradeCount] = useState({ ...tradeCountSchema });

  //Sate For Side
  const [side, setSide] = useState("");

  //Sate for Nature
  const [nature, setNature] = useState("");

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //UserDetails Corporate Use Modal Calling
  const TradeCountCommentModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.tradeCountCommentModal
  );

  //handle Edit Corporate
  const handleEditBanker = () => {
    // dispatch(editBankUserModalSystemAdmin(true));
    // dispatch(DeleteCorporateModalSystemAdmin(false));
    // dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
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
      dataIndex: "nature",
      key: "nature",
      width: "200px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">CCY1</label>,
      dataIndex: "CCY1",
      key: "CCY1",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "CCY1Amount",
      key: "CCY1Amount",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Rate</label>,
      dataIndex: "rate",
      key: "rate",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">CCY2</label>,
      dataIndex: "CCY2",
      key: "CCY2",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "CCY2Amount",
      key: "CCY2Amount",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Date</label>,
      dataIndex: "tradeDate",
      key: "tradeDate",
      width: "120px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Time</label>,
      dataIndex: "time",
      key: "time",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">LC #</label>,
      dataIndex: "LC",
      key: "LC",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Account #</label>,
      dataIndex: "account",
      key: "account",
      width: "200px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Comment</label>,
      dataIndex: "comment",
      key: "comment",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => {
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
                  className={styles["comment-icon"]}
                  icon={<i className="icon-view-comment color-blue"></i>}
                  // onClick={handleEditBanker}
                  onClick={() => handleClickCommentModal(text)}
                />
                {/* <span>{text}</span> */}
              </Col>
            </Row>
          </>
        );
      },
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

  const data = [
    {
      key: "1",
      transactionID: "245ABD",
      name: "John Doe",
      side: "Buy",
      nature: "Important Payment",
      CCY1: "USD",
      CCY1Amount: "100",
      rate: "290",
      CCY2: "KWD",
      CCY2Amount: "100",
      tradeDate: "13/05/2023",
      time: "12:07 pm",
      LC: "12345",
      account: "02909090908",
      // comment: (
      //   <Row>
      //     <Col lg={12} md={12} sm={12}>
      //       <i className="icon-view-comment color-blue"></i>
      //     </Col>
      //   </Row>
      // ),
      comment: "Comment of data 1",
      status: "Active",
    },
  ];

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

  const handleClickCommentModal = (text) => {
    dispatch(TradeCountCommentModalSystemAdmin(true));
    console.log("the comment is", text);
  };

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

  // show error message When user hit activate btn
  const handleResetEventButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleResetYes = () => {
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
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleExport = (format) => {
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  };

  const exportToExcel = () => {
    // const worksheet = XLSX.utils.json_to_sheet(data);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Corporate List");
    // XLSX.writeFile(workbook, "CorporateList.xlsx");
    console.log("Doc saved as Excel");
  };

  const exportToPDF = () => {
    // const doc = new jsPDF();
    // doc.autoTable({
    //   head: [columns.map((col) => col.title)],
    //   body: data.map((row) => columns.map((col) => row[col.dataIndex])),
    // });
    // doc.save("CorporateList.pdf");
    console.log("doc saved as pdf");
  };
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
            <Row className="mt-2 g-2">
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

            <Row className="mt-3 g-2">
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
                className="d-flex align-items-center pe-4"
              >
                <DatePicker
                  name="dateFrom"
                  value={tradeCount.dateFrom.value}
                  placeholder="Start date"
                  showOtherDays="true"
                  inputClass={styles["Tradecount-Datepicker-left"]}
                  onChange={(date) => handleDateChange("dateFrom", date)}
                  maxDate={tradeCount.dateTo.value}
                  minDate={null}
                />
                <label className={styles["Tradecount-date-to"]}>to</label>

                <DatePicker
                  name="dateTo"
                  value={tradeCount.dateTo.value}
                  placeholder="End Date"
                  showOtherDays="true"
                  inputClass={styles["Tradecount-Datepicker-right"]}
                  onChange={(date) => handleDateChange("dateTo", date)}
                  minDate={tradeCount.dateFrom.value}
                  maxDate={null}
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
                {/* <Button
                  text="Export"
                  icon={<i className="icon-download-excel"></i>}
                  className={styles["tradeCount-Download-Excel-btn"]}
                /> */}
                <Popover
                  content={
                    <div className={styles["export-options"]}>
                      <Button
                        icon={<i className="icon-download-excel"></i>}
                        // text="Excel"
                        onClick={() => handleExport("excel")}
                        className={styles["export-button"]}
                      />
                      <Button
                        // text="PDF"
                        icon={<i className="icon-download-pdf"></i>}
                        onClick={() => handleExport("pdf")}
                        className={styles["export-button"]}
                      />
                    </div>
                  }
                  // title="Title"
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                  placement="bottomRight"
                  arrow={false}
                >
                  <Button
                    icon={<i className="icon-download"></i>}
                    className={styles["Export_Button"]}
                    text="Export"
                    iconClass={styles["resetIconClass"]}
                    onClick={toggleExportOptions}
                  />
                </Popover>
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                  onClick={handleResetEventButton}
                />
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <ExportShowComponent />
              </Col>
            </Row>

            <Row className="mt-1">
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
      {TradeCountCommentModalGobalState && <CommentModal />}
      {<ActivateConfirmationModal onConfirm={handleResetYes} />}
    </section>
  );
};

export default TradeCount;
