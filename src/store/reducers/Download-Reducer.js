import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  corporateUserlistReportData: null,
  BankUserlistReportData: null,
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

    //Corporate User List Report
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

    default:
      return { ...state };
  }
};

export default downloadReducer;
