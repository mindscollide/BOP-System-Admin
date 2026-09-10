import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  errorSeverity: "",
  uploadValidCorporates: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_INIT:
      return { ...state, Loading: true, errorSeverity: "" };

    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        uploadValidCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        uploadValidCorporates: null,
        ResponseMessage: action.message,
      };

    case actions.RESET_COUNTER_PART_FILE_UPLOAD:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
        uploadValidCorporates: null,
      };

    case actions.CLEAR_RESPONSEMESSAGE_UPLOADREDUCER:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};
export default uploadReducer;
