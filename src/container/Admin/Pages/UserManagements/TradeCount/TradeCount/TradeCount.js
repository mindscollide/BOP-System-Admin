import React, { useCallback, useEffect, useState } from "react";
import styles from "./TradeCount.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../../../components/elements";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
// import ExportShowComponent from "../BankerList/ExportShowComponent";
import { tradeCountSchema } from "../../../../../../utils/schemas";
import { transactionSide } from "../../../../../../helpers/Dropdown";
import {
  formatDate,
  formatDateAndTimeFromString,
  IndexCell,
} from "../../../../../../helpers/reusableMethods";
import { useDispatch } from "react-redux";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import {
  ConfirmationModalSystemAdmin,
  // TradeCountCommentModalSystemAdmin,
} from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { Popover } from "antd";
import { useSelector } from "react-redux";
// import CommentModal from "../../../../Setups/TradeCount/CommentModal/CommentModal";

import pdfIcon from "../../../../../../assets/images/pdf.png";
import excelIcon from "../../../../../../assets/images/excel.png";
import { useNavigate } from "react-router-dom";
import { GetAllNatureAPI } from "../../../../../../store/actions/Auth-Actions";
import ExportShowComponent from "../../../ReusableComponents/ExportShowComponent/ExportShowComponent";
// import CommentModal from "../CommentModal/CommentModal";
import { GetAllTradesAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";
import moment from "moment";

const TradeCount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingTrade = useSelector(
    (state) => state.BOPSystemAdminReducer.Loading
  );
  const LoadingAuth = useSelector((state) => state.auth.Loading);
  const getAllNatureOfBuisness = useSelector(
    (state) => state.auth.getAllNatureOfBuisness
  );
  console.log("getAllNatureOfBuisness", getAllNatureOfBuisness);

  const GetAllTrades = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllTrades
  );
  console.log(GetAllTrades, "GetAllTrades");

  //Trade Count States
  const [tradeCount, setTradeCount] = useState({ ...tradeCountSchema });

  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState(0);
  //Sate For Side
  const [side, setSide] = useState({ value: 0, label: "" });
  const [natureOptions, setNatureOptions] = useState([]);
  const [natureID, setNatureID] = useState({
    value: 0,
    label: "",
  }); //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  const [dropdownvalue, setDropdownvalue] = useState(50);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //UserDetails Corporate Use Modal Calling
  // const TradeCountCommentModalGobalState = useSelector(
  //   (state) => state.BOPSystemAdminModal.tradeCountCommentModal
  // );

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };
  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDate(tradeCount.dateFrom.value),
      ToDate: formatDate(tradeCount.dateTo.value),
      LCNumber: tradeCount.LC.value,
      Side: tradeCount.side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
      sRow: 0,
      Length: newSize,
    };
    dispatch(GetAllTradesAPI(navigate, Data));
  };
  // Fetch categories on component mount
  useEffect(() => {
    dispatch(GetAllNatureAPI(navigate));
    let data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: "",
      ToDate: "",
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: dropdownvalue,
    };

    dispatch(GetAllTradesAPI(navigate, data));
  }, []);
  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        TxnID: "",
        CorporateName: "",
        AccountNumber: "",
        FromDate: "",
        ToDate: "",
        LCNumber: "",
        Side: false,
        NatureOfTransactionID: 0,
        Amount: 0.0,
        sRow: sRow,
        Length: dropdownvalue,
      };
      dispatch(GetAllTradesAPI(navigate, Data));
    }
  });

  // column for LoginHistory
  const tradeColumns = [
    {
      title: <label className="bottom-table-header">TXN ID</label>,
      dataIndex: "txnID",
      key: "txnID",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Client</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Side</label>,
      dataIndex: "side",
      key: "side",
      width: "50px",
      align: "center",
      ellipsis: true,
      render: (val, record) => {
        console.log({ record }, "val record");
        let side = record?.isBuySide === true ? "Buy" : "Sell";
        return side;
      },
    },
    {
      title: <label className="bottom-table-header">Nature</label>,
      dataIndex: "natureOfTransactionID",
      key: "natureOfTransactionID",
      width: "200px",
      align: "center",
      ellipsis: true,
      render: (val, record) => {
        let nature =
          getAllNatureOfBuisness?.natureofBusinesses?.length > 0 &&
          getAllNatureOfBuisness?.natureofBusinesses.find(
            (nature) => nature.pK_NatureOfBusiness === val
          );
        return (
          <IndexCell
            value={nature !== undefined ? nature.name : ""}
            record={record}
          />
        );
      },
    },
    {
      title: <label className="bottom-table-header">CCY1</label>,
      dataIndex: "ccY1",
      key: "ccY1",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "quantity",
      key: "quantity",
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
      dataIndex: "ccY2",
      key: "ccY2",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Amount</label>,
      dataIndex: "amount",
      key: "amount",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Date</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(formatDateAndTimeFromString(transactionDateTime)).format(
              "DD-MM-YYYY"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">Time</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(formatDateAndTimeFromString(transactionDateTime)).format(
              "h:mm a"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">LC#</label>,
      dataIndex: "lcNumber",
      key: "lcNumber",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Account#</label>,
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: "200px",
      align: "center",
      ellipsis: true,
    },
    // {
    //   title: <label className="bottom-table-header">Comment</label>,
    //   dataIndex: "comment",
    //   key: "comment",
    //   width: "100px",
    //   align: "center",
    //   ellipsis: true,
    //   render: (text) => {
    //     return (
    //       <>
    //         <Row>
    //           <Col
    //             lg={12}
    //             md={12}
    //             sm={12}
    //             className="d-flex gap-2 justify-content-center align-items-center"
    //           >
    //             <Button
    //               className={styles["comment-icon"]}
    //               icon={<i className="icon-view-comment color-blue"></i>}
    //               // onClick={handleEditBanker}
    //               // onClick={() => handleClickCommentModal(text)}
    //               onClick={() => handleClickCommentModal(text)}
    //             />
    //             {/* <span>{text}</span> */}
    //           </Col>
    //         </Row>
    //       </>
    //     );
    //   },
    // },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "statusID",
      key: "statusID",
      width: "100px",
      align: "center",
      className: "color-green",
      ellipsis: true,
      render: (statusID) => {
        return "Accepted";
      },
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
        updateField("AccountNumber", /[^a-zA-Z0-9]/g, value);
        break;
      case "LC":
        updateField("LC", /[^a-zA-Z0-9]/g, value);
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

  // const handleClickCommentModal = (text) => {
  //   dispatch(TradeCountCommentModalSystemAdmin(true));
  //   console.log("the comment is", text);
  // };

  const handleSearchEventButton = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    let searchData = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDate(tradeCount.dateFrom.value),
      ToDate: formatDate(tradeCount.dateTo.value),
      LCNumber: tradeCount.LC.value,
      Side: tradeCount.side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
      sRow: 0,
      Length: dropdownvalue,
    };

    console.log("searchData is", searchData);
    dispatch(GetAllTradesAPI(navigate, searchData));
  };

  //Table columns for customer List
  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  // show error message When user hit activate btn
  const handleResetEventButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };

  const handleResetYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
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
      setNatureID("");
    }
    let data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: "",
      ToDate: "",
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: 10,
    };

    dispatch(GetAllTradesAPI(navigate, data));
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  // const handleDropdownChange = (field, value, setter, userField) => {
  //   setter(value); // Set the state
  //   userField.value = value.value; // Update the corporateUser object
  // };

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

  //handle select categoryID
  const handleSelectNature = async (selectedNature) => {
    console.log(selectedNature.value, "selectedCategoryselectedCategory");
    setNatureID(selectedNature);

    setTradeCount((prevState) => ({
      ...prevState,
      natureOfClient: {
        ...prevState.natureOfClient,
        value: selectedNature.value,
      },
    }));
  };

  //handle select categoryID
  const handleSelectSide = async (selectedSide) => {
    console.log(selectedSide.value, "selectedCategoryselectedCategory");
    setSide(selectedSide);

    setTradeCount((prevState) => ({
      ...prevState,
      side: {
        ...prevState.side,
        value: selectedSide.value,
      },
    }));
  };

  useEffect(() => {
    if (getAllNatureOfBuisness !== null) {
      try {
        let newNatureOfBusiness = getAllNatureOfBuisness.natureofBusinesses.map(
          (natureOfBusiness) => {
            return {
              ...natureOfBusiness,
              value: natureOfBusiness.pK_NatureOfBusiness,
              label: natureOfBusiness.name,
            };
          }
        );
        setNatureOptions(newNatureOfBusiness);
      } catch (error) {}
    }
  }, [getAllNatureOfBuisness]);

  //handelled scrolling here (4)
  useEffect(() => {
    if (GetAllTrades !== null) {
      try {
        const { transactions, totalRecords } = GetAllTrades;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalRecords);
          setTableData([...tableData, ...transactions]);
          setSRow(tableData.length + transactions.length);
        } else {
          setHasReachedBottom(false);
          setTableData(transactions);
          setRecordLength(totalRecords);
          setSRow(transactions.length);
        }
      } catch (error) {}
    } else if (GetAllTrades === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetAllTrades]);

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
                  value={side.value !== 0 ? side : null}
                  isSearchable
                  onChange={handleSelectSide}
                ></Select>
              </Col>

              <Col lg={2} md={2} sm={12}>
                <Select
                  placeholder="Select Nature"
                  // classNamePrefix={"TradeCountSelect"}
                  classNamePrefix="selectCateogyCorporateList"
                  options={natureOptions}
                  value={natureID.value !== 0 ? natureID : null}
                  isSearchable
                  onChange={handleSelectNature}
                />
              </Col>

              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Amount"
                  name="Amount"
                  onChange={tradeCountValidateHandler}
                  value={
                    tradeCount.Amount.value === 0 ? "" : tradeCount.Amount.value
                  }
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

                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                  onClick={handleResetEventButton}
                />
                <Popover
                  content={
                    <div className={styles["export-options"]}>
                      <Button
                        icon={<img src={excelIcon} alt="Excel Icon" />}
                        onClick={() => handleExport("excel")}
                        className={styles["export-button"]}
                      />
                      <Button
                        icon={<img src={pdfIcon} alt="PDF Icon" />}
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
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <ExportShowComponent
                  value={dropdownvalue}
                  onChange={handlePageSizeChange}
                />
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={tradeColumns}
                  pagination={false}
                  rows={tableData}
                  scroll={{ x: "scroll" }}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {/* {TradeCountCommentModalGobalState && <CommentModal />} */}
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleResetYes}
          handleNoButton={handleNoButton}
        />
      )}
    </section>
  );
};

export default TradeCount;
