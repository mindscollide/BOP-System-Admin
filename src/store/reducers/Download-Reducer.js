import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  corporateUserlistReportData: null,
  BankUserlistReportData: null,
  loginHistoryReportData: null,
  pdfReportBankUserlistData: null,
  pdfReportCorporateUserlistData: null,
  pdfReportLoginHistorylistData: null,
};

const downloadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.DOWNLOAD_EXCEL_CORPORATE_FILE_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DOWNLOAD_REPORT_INIT:
      return {
        ...state,
        Loading: false,
      };

    case actions.DOWNLOAD_EXCEL_BANK_FILE_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.DOWNLOAD_COUNTER_PARTY_REPORT_INIT:
      return {
        state,
        Loading: true,
      };

    //Corporate User List Report
    case actions.CORPORATE_USERlIST_REPORT_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.CORPORATE_USERlIST_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        corporateUserlistReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CORPORATE_USERlIST_REPORT_FAIL:
      return {
        state,
        Loading: false,
        corporateUserlistReportData: null,
        ResponseMessage: action.message,
      };

    //Bank User List Report
    case actions.BANK_USERlIST_REPORT_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.BANK_USERlIST_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        BankUserlistReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.BANK_USERlIST_REPORT_FAIL:
      return {
        state,
        Loading: false,
        BankUserlistReportData: null,
        ResponseMessage: action.message,
      };

    //Login History Report
    case actions.LOGIN_HISTORY_REPORT_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.LOGIN_HISTORY_REPORT_SUCCESS:
      return {
        state,
        Loading: false,
        loginHistoryReportData: action.response,
        ResponseMessage: action.message,
      };
    case actions.LOGIN_HISTORY_REPORT_FAIL:
      return {
        state,
        Loading: false,
        loginHistoryReportData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Bank User List
    case actions.PDF_REPORT_BANK_USER_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.PDF_REPORT_BANK_USER_SUCCESS:
      return {
        state,
        Loading: false,
        pdfReportBankUserlistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_BANK_USER_FAIL:
      return {
        state,
        Loading: false,
        pdfReportBankUserlistData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Bank User List
    case actions.PDF_REPORT_CORPORATE_USER_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.PDF_REPORT_CORPORATE_USER_SUCCESS:
      return {
        state,
        Loading: false,
        pdfReportCorporateUserlistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_CORPORATE_USER_FAIL:
      return {
        state,
        Loading: false,
        pdfReportCorporateUserlistData: null,
        ResponseMessage: action.message,
      };

    //PDF  Report Login History List
    case actions.PDF_REPORT_LOGINHISTORY_USER_INIT:
      return {
        state,
        Loading: true,
      };

    case actions.PDF_REPORT_LOGINHISTORY_USER_SUCCESS:
      return {
        state,
        Loading: false,
        pdfReportLoginHistorylistData: action.response,
        ResponseMessage: action.message,
      };
    case actions.PDF_REPORT_LOGINHISTORY_USER_FAIL:
      return {
        state,
        Loading: false,
        pdfReportLoginHistorylistData: null,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_DOWNLOADREDUCER:
      return {
        ...state,
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};

export default downloadReducer;
