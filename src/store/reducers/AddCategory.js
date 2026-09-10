import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  errorSeverity: "",
  addCategory: [],
};

const AddCategory = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
        Spinner: true,
      };

    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        Spinner: false,
        addCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        Spinner: false,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_ADD_CATEGORY:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };

    default:
      return { ...state };
  }
};

export default AddCategory;
