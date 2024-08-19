import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  isSignUp: false,
  SessionExpeireResponseMessage: "",
  UserRoleslist: [],
  bankUserLoginHistory: [],
  getAllCorporate: [],
  allCorporateCompany: [],
  searchBankLogin: [],
  allUserStatus: [],
  getAllNature: [],
  Corporates: [],
  UpdatedCorporates: [],
  DeleteCategory: [],
  corporateGetSearchLoginHistory: [],
  bankGetSearchLoginHistory: [],
  roles: null,
  Token: "",
  Refresh: "",
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        Token: "",
        Refresh: "",
      };

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.SIGN_OUT:
      localStorage.clear();
      return {
        ...state,
        UserDetails: null,
        isLoggedIn: false,
        Loading: false,
        Token: "",
        Refresh: "",
        SessionExpeireResponseMessage: action.message,
      };

      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.USER_ROLES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        UserRoleslist: action.response,
        ResponseMessage: action.message,
      };

    case actions.USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        UserRoleslist: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        Loading: false,
        getAllCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_FAIL:
      return {
        ...state,
        Loading: false,
        getAllCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_LOGIN_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.GET_BANK_USER_LOGIN_SUCCESS:
      console.log("logogogog", action.response);
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankUserLoginHistory: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        getAllCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_LOGIN_INIT:
      return {
        ...state,
        Spinner: true,
        Loading: true,
      };

    case actions.SEARCH_BANK_USER_LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchBankLogin: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        searchBankLogin: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_API_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_USER_STATUS_API_SUCCESS:
      return {
        ...state,
        Loading: false,
        allUserStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_API_FAIL:
      return {
        ...state,
        Loading: false,
        allUserStatus: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_COMPANY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_COMPANY_SUCCESS:
      return {
        ...state,
        Loading: false,
        allCorporateCompany: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_COMPANY_FAIL:
      return {
        ...state,
        Loading: false,
        allCorporateCompany: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_NATURE_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        getAllNature: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        getAllNature: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_SUCCESS:
      return {
        ...state,
        Loading: false,
        Corporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_MAPPING_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_MAPPING_SUCCESS:
      return {
        ...state,
        // Loading: false,
        UpdatedCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_MAPPING_FAIL:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.DELETE_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        DeleteCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        Loading: false,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_COMPANY_USER_LOGIN_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_GET_COMPANY_USER_LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateGetSearchLoginHistory: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_COMPANY_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        corporateGetSearchLoginHistory: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_BANK_USER_LOGIN_INIT:
      return {
        ...state,
        Loading: true,
        Spinner: true,
      };

    case actions.SEARCH_GET_BANK_USER_LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankGetSearchLoginHistory: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_GET_BANK_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        Spinner: false,
        bankGetSearchLoginHistory: [],
        ResponseMessage: action.message,
      };

    default:
      return { ...state };
  }
};

export default authReducer;
