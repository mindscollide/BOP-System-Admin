import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  errorSeverity: "",
  GetAllCorporateUsers: null,
  GetCorporateUserByUserID: null,
  SearchCorporateUsersData: null,
  UpdateCorporateUsersData: null,
};

const corporateUsersReducer = (state = initialState, action) => {
  switch (action.type) {
    //GetAllCorporateUsers Reducer
    case actions.GET_ALL_CORPORATE_USER_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CORPORATE_USER_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllCorporateUsers: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_USER_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllCorporateUsers: [],
        ResponseMessage: action.message,
      };

    //GetCorporateUserByUserID Reducer
    case actions.GET_CORPORATE_USER_BY_USERID_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_CORPORATE_USER_BY_USERID_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetCorporateUserByUserID: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_CORPORATE_USER_BY_USERID_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetCorporateUserByUserID: "",
        ResponseMessage: action.message,
      };
    //Search Corporate Users
    case actions.SEARCH_CORPORATE_USERS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SEARCH_CORPORATE_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SearchCorporateUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_CORPORATE_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SearchCorporateUsersData: null,
        ResponseMessage: action.message,
      };
    //Update Corporate User
    case actions.UPDATE_CORPORATE_USERS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.UPDATE_CORPORATE_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        UpdateCorporateUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_CORPORATE_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        UpdateCorporateUsersData: null,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_CORPORATEUSERREDUCER:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };

    default:
      return { ...state };
  }
};

export default corporateUsersReducer;
