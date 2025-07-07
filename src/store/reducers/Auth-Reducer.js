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
  Corporates: [],
  UpdatedCorporates: [],
  DeleteCategory: [],
  corporateGetSearchLoginHistory: [],
  bankGetSearchLoginHistory: [],
  roles: null,
  Token: "",
  Refresh: "",
  corporateUserlogin: null,
  sendEmailResetPassword: null,
  createCorporatePassword: null,
  getAllCategories: null,
  GetAllCorporatesData: null,
  getAllNatureOfBuisness: null,
  RoleList: null,
  GetBankUserRoles: null,
  GetAllInstrumentTypes: null,
  GetAllBranchesData: null,
  userLogout: null,
  updatedBranchCategoryData: null,
  GetAllCorporates: null,
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
    case actions.USER_LOGOUT_INIT: {
      return {
        ...state,
        Loading: true,
      };
    }
    case actions.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        Loading: false,
        userLogout: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.USER_LOGOUT_FAIL: {
      return {
        ...state,
        Loading: false,
        userLogout: null,
        ResponseMessage: action.message,
      };
    }

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

    case actions.GET_ALL_NATURE_OF_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_NATURE_OF_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        getAllNatureOfBuisness: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_OF_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        getAllNatureOfBuisness: [],
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
        GetAllCorporatesData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllCorporatesData: null,
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
        Loading: false,
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

    //Send Email Reset Password
    case actions.SEND_EMAIL_RESET_PASSWORD_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        Loading: false,
        sendEmailResetPassword: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_FAIL:
      return {
        ...state,
        Loading: false,
        sendEmailResetPassword: null,
        ResponseMessage: action.message,
      };

    //getAllCategories Reducer
    case actions.GET_ALL_CATEGORIES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        Loading: false,
        getAllCategories: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        Loading: false,
        getAllCategories: [],
        ResponseMessage: action.message,
      };

    //RoleList Reducer
    case actions.ROLE_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ROLE_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        RoleList: action.response,
        ResponseMessage: action.message,
      };

    case actions.ROLE_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        RoleList: [],
        ResponseMessage: action.message,
      };

    //GetBankUserRoles Reducer
    case actions.GET_BANK_USER_ROLES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_BANK_USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetBankUserRoles: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        GetBankUserRoles: [],
        ResponseMessage: action.message,
      };

    case actions.CLEARE_MESSAGE:
      return {
        ...state,
        ResponseMessage: "",
      };

    //GetAllInstruments Reducer
    case actions.GET_ALL_INSTRUMENT_TYPES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_INSTRUMENT_TYPES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllInstrumentTypes: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_INSTRUMENT_TYPES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllInstrumentTypes: [],
        ResponseMessage: action.message,
      };

    //Get All Branches
    case actions.GET_ALL_BRANCHES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllBranchesData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllBranchesData: null,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_SUCCESS:
      return {
        ...state,
        Loading: false,
        updatedBranchCategoryData: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_FAILED:
      return {
        ...state,
        Loading: false,
        updatedBranchCategoryData: null,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_DATA_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_CORPORATES_DATA_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_DATA_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllCorporates: null,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_AUTH:
      return {
        ...state,
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};

export default authReducer;
