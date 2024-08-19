import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  uploadValidCorporates: null,
};

const uploadReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_INIT:
      return { ...state, Loading: true };

    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_SUCCESS:
      return {
        ...state,
        Loading: false,
        uploadValidCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_FAIL:
      return {
        ...state,
        Loading: false,
        uploadValidCorporates: null,
        ResponseMessage: action.message,
      };

    case actions.RESET_COUNTER_PART_FILE_UPLOAD:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.response,
        uploadValidCorporates: null,
      };

    default:
      return { ...state };
  }
};
export default uploadReducer;
