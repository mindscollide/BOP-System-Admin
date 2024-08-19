import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
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

    default:
      return { ...state };
  }
};

export default downloadReducer;
