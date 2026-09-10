import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  errorSeverity: "",
  corporateUserlistReportData: null,
  BankUserlistReportData: null,
  loginHistoryReportData: null,
  pdfReportBankUserlistData: null,
  pdfReportCorporateUserlistData: null,
  pdfReportLoginHistorylistData: null,
  dailyTransactionDataReportData: null,
  dailyTransactionDataPDFReportData: null,
};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DOWNLOAD_EXCEL_CORPORATE_FILE_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.DOWNLOAD_REPORT_INIT:
      return {
        ...state,
        Loading: false,
        errorSeverity: "",
      };

    case actions.DOWNLOAD_EXCEL_BANK_FILE_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.DOWNLOAD_COUNTER_PARTY_REPORT_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    //Corporate User List Report
    case actions.CORPORATE_USERlIST_REPORT_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.CORPORATE_USERlIST_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        corporateUserlistReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CORPORATE_USERlIST_REPORT_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        corporateUserlistReportData: null,
        ResponseMessage: action.message,
      };

    //Bank User List Report
    case actions.BANK_USERlIST_REPORT_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.BANK_USERlIST_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        BankUserlistReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.BANK_USERlIST_REPORT_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        BankUserlistReportData: null,
        ResponseMessage: action.message,
      };

    //Login History Report
    case actions.LOGIN_HISTORY_REPORT_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.LOGIN_HISTORY_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        loginHistoryReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.LOGIN_HISTORY_REPORT_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        loginHistoryReportData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Bank User List
    case actions.PDF_REPORT_BANK_USER_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.PDF_REPORT_BANK_USER_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        pdfReportBankUserlistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_BANK_USER_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        pdfReportBankUserlistData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Bank User List
    case actions.PDF_REPORT_CORPORATE_USER_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.PDF_REPORT_CORPORATE_USER_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        pdfReportCorporateUserlistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_CORPORATE_USER_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        pdfReportCorporateUserlistData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Login History List
    case actions.PDF_REPORT_LOGINHISTORY_USER_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.PDF_REPORT_LOGINHISTORY_USER_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        pdfReportLoginHistorylistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_LOGINHISTORY_USER_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        pdfReportLoginHistorylistData: null,
        ResponseMessage: action.message,
      };

    //Daily Transaction Report
    case actions.DAILY_TRANSACTION_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.DAILY_TRANSACTION_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        dailyTransactionDataReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.DAILY_TRANSACTION_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        dailyTransactionDataReportData: null,
        ResponseMessage: action.message,
      };

    //Daily Transaction PDF Report
    case actions.DAILY_TRANSACTION_PDF_INIT:
      return {
        state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.DAILY_TRANSACTION_PDF_SUCCESS:
      return {
        state,
        Loading: false,
        errorSeverity: "success",
        dailyTransactionDataPDFReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.DAILY_TRANSACTION_PDF_FAIL:
      return {
        state,
        Loading: false,
        errorSeverity: "error",
        dailyTransactionDataPDFReportData: null,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_DOWNLOADREDUCER:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};

export default downloadReducer;
