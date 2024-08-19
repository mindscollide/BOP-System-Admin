import * as actions from "../action_types";

const initialState = {
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  addCategory: [],
};

const AddCategory = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        addCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default AddCategory;
