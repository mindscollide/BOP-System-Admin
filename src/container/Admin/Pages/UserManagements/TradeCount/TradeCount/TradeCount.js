import React, { useCallback, useEffect, useState } from "react";
import styles from "./TradeCount.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../../../components/elements";
import Select from "react-select";
import DatePicker from "react-multi-date-picker";
// import ExportShowComponent from "../BankerList/ExportShowComponent";
import { tradeCountSchema } from "../../../../../../utils/schemas";
import { transactionSide } from "../../../../../../helpers/Dropdown";
import {
  convertDateTimeIntoLocal,
  formatPkAmount,
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
import { GetAllNatureOfTransactionsAPI } from "../../../../../../store/actions/Auth-Actions";
import ExportShowComponent from "../../../ReusableComponents/ExportShowComponent/ExportShowComponent";
// import CommentModal from "../CommentModal/CommentModal";
import { GetAllTradesAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";
import moment from "moment";
import { formatDateToUTC } from "../../../../../../commen/functions/utils";
import {
  downloadDailyTransactionSystemAdminReportApi,
  downloadPDFDailyTransactionSystemAdminApi,
} from "../../../../../../store/actions/Download-Report";
import { NumericFormat } from "react-number-format";

const TradeCount = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const BlotterTransactionAccepted = useSelector(
    (state) => state.RealtimeActionReducer.BlotterTransactionAccepted
  );

  const BlotterTransactionCancelled = useSelector(
    (state) => state.RealtimeActionReducer.BlotterTransactionCancelled
  );

  const GetAllNatureOfTransactions = useSelector(
    (state) => state.auth.GetAllNatureOfTransactions
  );
  const GetAllTrades = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllTrades
  );
  const GetAllTradesLoader = useSelector(
    (state) => state.BOPSystemAdminReducer.Loading
  );
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
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
    Amount: {
      value: 0,
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
    dateFrom: {
      value: new Date(),
      errorMessage: "",
      errorStatus: false,
    },
    dateTo: {
      value: new Date(),
      errorMessage: "",
      errorStatus: false,
    },
    natureOfClient: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },
  });

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
  // const [hasReachedBottom, setHasReachedBottom] = useState(false);
  const [dropdownvalue, setDropdownvalue] = useState(50);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //UserDetails Corporate Use Modal Calling
  // const TradeCountCommentModalGobalState = useSelector(
  //   (state) => state.BOPSystemAdminModal.tradeCountCommentModal
  // );

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Date range options
  const [dateRangeOptions] = useState([
    { value: 1, label: "Today" },
    { value: 2, label: "1 Month" },
    { value: 3, label: "3 Months" },
    { value: 4, label: "6 Months" },
    { value: 5, label: "1 Year" },
    { value: 6, label: "Custom Date" },
  ]);
  const [selectedDateRange, setSelectedDateRange] = useState({
    value: 1,
    label: "Today",
  });
  const [showCustomDatePicker, setShowCustomDatePicker] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };
  // Fetch categories on component mount
  useEffect(() => {
    dispatch(GetAllNatureOfTransactionsAPI(navigate));
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: dropdownvalue,
    };

    dispatch(GetAllTradesAPI(navigate, data));
  }, []);

  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      // setHasReachedBottom(true);
      const FromDate = new Date(tradeCount.dateFrom.value);
      FromDate.setHours(0, 0, 0);
      const ToDate = new Date(tradeCount.dateTo.value);
      ToDate.setHours(23, 59, 59);
      let Data = {
        TxnID: tradeCount.TxnID.value,
        CorporateName: tradeCount.clientName.value,
        AccountNumber: tradeCount.AccountNumber.value,
        FromDate: formatDateToUTC(FromDate),
        ToDate: formatDateToUTC(ToDate),
        LCNumber: tradeCount.LC.value,
        Side: side.value,
        NatureOfTransactionID: tradeCount.natureOfClient.value,
        Amount: Number(tradeCount.Amount.value),
        sRow: sRow,
        Length: dropdownvalue,
      };
      dispatch(GetAllTradesAPI(navigate, Data));
    }
  });
  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);
    try {
      const FromDate = new Date(tradeCount.dateFrom.value);
      FromDate.setHours(0, 0, 0);
      const ToDate = new Date(tradeCount.dateTo.value);
      ToDate.setHours(23, 59, 59);
      let Data = {
        TxnID: tradeCount.TxnID.value,
        CorporateName: tradeCount.clientName.value,
        AccountNumber: tradeCount.AccountNumber.value,
        FromDate: formatDateToUTC(FromDate),
        ToDate: formatDateToUTC(ToDate),
        LCNumber: tradeCount.LC.value,
        Side: side.value,
        NatureOfTransactionID: tradeCount.natureOfClient.value,
        Amount: Number(tradeCount.Amount.value),
        sRow: 0,
        Length: newSize,
      };
      dispatch(GetAllTradesAPI(navigate, Data));
    } catch (error) {
      console.log("Error:, ", error);
    }
  };

  //Custome hook for Scrolling (1)
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
      title: <label className="bottom-table-header">Branch Code</label>,
      dataIndex: "branchCode",
      key: "branchCode",
      width: "80px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Client</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "150px",
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
    },
    {
      title: <label className="bottom-table-header">Nature</label>,
      dataIndex: "nature",
      key: "nature",
      width: "180px",
      align: "center",
      ellipsis: true,
      render: (val, record) => {
        return <IndexCell value={val} />;
      },
    },
    {
      title: <label className="bottom-table-header">CCY1</label>,
      dataIndex: "ccY1",
      key: "ccY1",
      width: "50px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">TXN Amount</label>,
      dataIndex: "quantity",
      key: "quantity",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (quantity) => formatPkAmount(quantity, { decimals: 2 }),
    },
    {
      title: <label className="bottom-table-header">Rate</label>,
      dataIndex: "rate",
      key: "rate",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (rate) => formatPkAmount(rate, { decimals: 2 }),
    },
    {
      title: <label className="bottom-table-header">Squaring Rate</label>,
      dataIndex: "squaringRate",
      key: "squaringRate",
      width: "120px",
      align: "center",
      ellipsis: true,
      render: (rate) => formatPkAmount(rate, { decimals: 2 }),
    },
    {
      title: <label className="bottom-table-header">CCY2</label>,
      dataIndex: "ccY2",
      key: "ccY2",
      width: "50px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Total Amount</label>,
      dataIndex: "amount",
      key: "amount",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (amount) => formatPkAmount(amount, { decimals: 2 }),
    },
    {
      title: <label className="bottom-table-header">Date</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(convertDateTimeIntoLocal(transactionDateTime)).format(
              "DD-MM-YYYY"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">Time</label>,
      dataIndex: "transactionDateTime",
      key: "transactionDateTime",
      width: "80px",
      align: "center",
      ellipsis: true,
      render: (transactionDateTime) => {
        // Format the date and time
        return transactionDateTime !== "-"
          ? moment(convertDateTimeIntoLocal(transactionDateTime)).format(
              "h:mm a"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">LC #</label>,
      dataIndex: "lcNumber",
      key: "lcNumber",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Account #</label>,
      dataIndex: "accountNumber",
      key: "accountNumber",
      width: "120px",
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
      dataIndex: "status",
      key: "status",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (text) => (
        <span
          style={{
            color:
              text === "Accepted"
                ? "green"
                : text === "Cancelled"
                ? "#f26522"
                : text === "Expired" || text === "Rejected"
                ? "#f21616"
                : "",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: <label className="bottom-table-header">Initiated By</label>,
      dataIndex: "initiatedBy",
      key: "initiatedBy",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Acccepted By</label>,
      dataIndex: "acceptedBy",
      key: "acceptedBy",
      width: "150px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">TXN Accepted Time</label>,
      dataIndex: "txnAcceptedTime",
      key: "txnAcceptedTime",
      width: "150px",
      align: "center",
      ellipsis: true,
      render: (txnAcceptedTime) => {
        // Format the date and time
        return txnAcceptedTime !== "-"
          ? moment(convertDateTimeIntoLocal(txnAcceptedTime)).format(
              "h:mm:ss A"
            )
          : "-";
      },
    },
    {
      title: <label className="bottom-table-header">Cancelled By</label>,
      dataIndex: "cancelledBy",
      key: "cancelledBy",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Cancelled Time</label>,
      dataIndex: "cancelledTime",
      key: "cancelledTime",
      width: "120px",
      align: "center",
      render: (cancelledTime) => {
        if (
          cancelledTime &&
          (cancelledTime !== "" ||
            cancelledTime !== null ||
            cancelledTime !== undefined)
        ) {
          return moment(convertDateTimeIntoLocal(cancelledTime)).format(
            "h:mm:ss A"
          );
        } else {
          return;
        }
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
        updateField("Amount", /[^\d.]/g, value);
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

  // Function to handle date range selection
  const handleDateRangeChange = (selectedOption) => {
    setSelectedDateRange(selectedOption);

    if (selectedOption.value === 6) {
      setShowCustomDatePicker(true);
      return;
    }

    setShowCustomDatePicker(false);

    const today = new Date();
    const fromDate = new Date();

    switch (selectedOption.value) {
      case 1:
        // Set both from and to dates as today
        fromDate.setDate(today.getDate());
        break;
      case 2:
        fromDate.setMonth(today.getMonth() - 1);
        break;
      case 3:
        fromDate.setMonth(today.getMonth() - 3);
        break;
      case 4:
        fromDate.setMonth(today.getMonth() - 6);
        break;
      case 5:
        fromDate.setMonth(today.getMonth() - 12);
        break;
      default:
        fromDate.setMonth(today.getMonth() - 1);
    }

    // Format dates for display
    const fromDateStr = moment(fromDate).format("DD-MM-YYYY");
    const toDateStr = moment(today).format("DD-MM-YYYY");
    // const displayLabel = `${selectedOption.label} (${fromDateStr} to ${toDateStr})`;

    let displayLabel;
    if (selectedOption.value === 1) {
      displayLabel = `Today`;
    } else {
      displayLabel = `${fromDateStr} to ${toDateStr}`;
    }

    // Update the tradeCount state with new dates
    setTradeCount((prev) => ({
      ...prev,
      dateFrom: {
        ...prev.dateFrom,
        value: fromDate,
      },
      dateTo: {
        ...prev.dateTo,
        value: today,
      },
    }));

    // Update selected option with date range in label
    setSelectedDateRange({
      ...selectedOption,
      label: displayLabel,
    });
  };
  //Handle Date Change method
  const handleDateChange = (fieldName, value) => {
    console.log({ fieldName: fieldName, value: Date(value) });
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

    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let searchData = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
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
    // Set today as default
    setSelectedDateRange({
      value: 1,
      label: "Today",
    });
    setShowCustomDatePicker(false);
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    let FromDate = new Date();
    FromDate.setHours(0, 0, 0);
    let ToDate = new Date();
    ToDate.setHours(23, 59, 59);
    if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);

      setTradeCount({
        ...tradeCountSchema,
        side: {
          value: 0,
        },
        Nature: {
          value: "",
        },
        dateFrom: {
          value: FromDate,
        },
        dateTo: {
          value: ToDate,
        },
      });
      setSide(0);
      setNatureID("");
    }
    let data = {
      TxnID: "",
      CorporateName: "",
      AccountNumber: "",
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: "",
      Side: 0,
      NatureOfTransactionID: 0,
      Amount: 0.0,
      sRow: 0,
      Length: dropdownvalue,
    };

    dispatch(GetAllTradesAPI(navigate, data));
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
    console.log("Doc saved as Excel");
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
    };

    dispatch(downloadDailyTransactionSystemAdminReportApi(navigate, Data));
  };

  const exportToPDF = () => {
    console.log("doc saved as pdf");
    console.log("Doc saved as Excel");
    const FromDate = new Date(tradeCount.dateFrom.value);
    FromDate.setHours(0, 0, 0);
    const ToDate = new Date(tradeCount.dateTo.value);
    ToDate.setHours(23, 59, 59);
    let Data = {
      TxnID: tradeCount.TxnID.value,
      CorporateName: tradeCount.clientName.value,
      AccountNumber: tradeCount.AccountNumber.value,
      FromDate: formatDateToUTC(FromDate),
      ToDate: formatDateToUTC(ToDate),
      LCNumber: tradeCount.LC.value,
      Side: side.value,
      NatureOfTransactionID: tradeCount.natureOfClient.value,
      Amount: Number(tradeCount.Amount.value),
    };

    dispatch(downloadPDFDailyTransactionSystemAdminApi(navigate, Data));
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
    if (GetAllNatureOfTransactions !== null) {
      try {
        let newNatureOfTransactions =
          GetAllNatureOfTransactions.natureOfTransactions.map(
            (natureOTransaction) => {
              return {
                ...natureOTransaction,
                value: natureOTransaction.id,
                label: natureOTransaction.name,
              };
            }
          );
        setNatureOptions(newNatureOfTransactions);
      } catch (error) {}
    }
  }, [GetAllNatureOfTransactions]);

  //handelled scrolling here (4)
  useEffect(() => {
    if (GetAllTrades !== null) {
      try {
        const { transactions, totalCount } = GetAllTrades;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalCount);
          setTableData([...tableData, ...transactions]);
          setSRow(tableData.length + transactions.length);
        } else {
          setHasReachedBottom(false);
          setTableData(transactions);
          setRecordLength(totalCount);
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

  useEffect(() => {
    if (BlotterTransactionAccepted !== null) {
      console.log("BlotterTransactionAccepted: ", {
        BlotterTransactionAccepted,
        tableData,
      });
      const { transaction } = BlotterTransactionAccepted;
      let matchedId = tableData.find(
        (record) => record.pK_TransactionID === transaction.pK_TransactionID
      );
      console.log(matchedId, "matchedIdmatchedId");

      if (matchedId === undefined) {
        let record = {
          ...transaction,
          txnID: transaction.txnid,
          transactionDateTime: transaction.settlementDateTime,
        };
        setTableData((prev) => [record, ...prev]);
      }
    }
  }, [BlotterTransactionAccepted]);

  // useEffect(() => {
  //   if (BlotterTransactionCancelled !== null) {
  //     try {
  //       const { transaction } = BlotterTransactionCancelled;
  //       let findRecord = tableData.find(
  //         (tableRow, index) => tableRow.txnID === transaction.txnID
  //       );

  //     } catch (error) {}
  //   }
  // }, [BlotterTransactionCancelled]);

  useEffect(() => {
    if (BlotterTransactionCancelled !== null) {
      try {
        const { transaction } = BlotterTransactionCancelled;

        setTableData((prev) =>
          prev.filter((row) => row.txnID !== transaction.txnid)
        );
      } catch (error) {
        console.error("Error while removing cancelled transaction:", error);
      }
    }
  }, [BlotterTransactionCancelled]);

  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["tradeCount-label"]}>Daily Trade</span>
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
                  maxLength={20}
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
                {/* <TextField */}
                <NumericFormat
                  placeholder="Total Amount"
                  name="Amount"
                  maxLength={20}
                  onChange={tradeCountValidateHandler}
                  value={
                    tradeCount.Amount.value === 0 ? "" : tradeCount.Amount.value
                  }
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize form-control"
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
                  maxLength={20}
                />
              </Col>
            </Row>

            <Row className="mt-3 g-2">
              <Col lg={2} md={12} sm={12}>
                <TextField
                  placeholder="Account Number"
                  name="AccountNumber"
                  value={tradeCount.AccountNumber.value}
                  onChange={tradeCountValidateHandler}
                  labelClass="d-none"
                  className="tradeCount-textField-fontsize"
                  maxLength={20}
                />
              </Col>
              <Col lg={2} md={12} sm={12}>
                <Select
                  styles={{
                    placeholder: (base) => ({
                      ...base,
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                    }),
                  }}
                  placeholder="Select Date Range"
                  classNamePrefix="selectCateogyCorporateList"
                  options={dateRangeOptions}
                  value={selectedDateRange}
                  isSearchable={true}
                  onChange={handleDateRangeChange}
                  menuPortalTarget={document.body}
                ></Select>
              </Col>
              {showCustomDatePicker && (
                <Col
                  lg={4}
                  md={12}
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
                    editable={false}
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
                    editable={false}
                  />
                </Col>
              )}

              {!showCustomDatePicker && <Col lg={4} md={12} sm={12} />}
              <Col
                lg={4}
                md={12}
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
                  scroll={{ x: "scroll", y: 230 }}
                  className={"BankUserList-table"}
                  loading={GetAllTradesLoader}
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
