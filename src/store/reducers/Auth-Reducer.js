import * as actions from "../action_types";

const initialState = {
  UserDetails: null,
  isLoggedIn: false,
  Loading: false,
  Spinner: false,
  ResponseMessage: "",
  errorSeverity: "",
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
  GetAllNatureOfTransactions: null,
  getListAllInstruments: null,
  addHoliday: null,
  getHolidayByHolidayId: null,
  updateHolidayByHolidayId: null,
  getAllHolidays: null,
  deleteHolidayByHolidayId: null,
  holidayAdded: null,
  holidayUpdated: null,
  holidayDeleted: null,

  resetPassword: null,
  forgotPassword: null,
  resetPasswordEmailVerification: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOG_IN_INIT:
      return { ...state, Loading: true, errorSeverity: "" };

    case actions.LOG_IN_SUCCESS:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        errorSeverity: "success",
        Token: action.response.token,
        Refresh: action.response.refreshToken,
      };

    case actions.LOG_IN_FAIL:
      return {
        ...state,
        UserDetails: action.response,
        ResponseMessage: action.message,
        Loading: false,
        errorSeverity: "error",
        Token: "",
        Refresh: "",
      };
    case actions.USER_LOGOUT_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.USER_LOGOUT_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        userLogout: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.USER_LOGOUT_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        userLogout: null,
        ResponseMessage: action.message,
      };
    }

    case actions.SIGN_UP_INIT:
      return { ...state, Loading: true, errorSeverity: "" };

    case actions.SIGN_UP_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        isLoggedIn: true,
        ResponseMessage: action.message,
      };

    case actions.SIGN_UP_FAIL:
      return {
        ...state,
        isLoggedIn: false,
        Loading: false,
        errorSeverity: "error",
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
        errorSeverity: "",
      };

    case actions.USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        UserRoleslist: action.response,
        ResponseMessage: action.message,
      };

    case actions.USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        UserRoleslist: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getAllCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATE_CATEGORIES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getAllCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_LOGIN_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
        Spinner: true,
      };

    case actions.GET_BANK_USER_LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        Spinner: false,
        bankUserLoginHistory: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        Spinner: false,
        getAllCorporate: [],
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_LOGIN_INIT:
      return {
        ...state,
        Spinner: true,
        Loading: true,
        errorSeverity: "",
      };

    case actions.SEARCH_BANK_USER_LOGIN_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        Spinner: false,
        searchBankLogin: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEARCH_BANK_USER_LOGIN_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        Spinner: false,
        searchBankLogin: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_API_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_USER_STATUS_API_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        allUserStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_USER_STATUS_API_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        allUserStatus: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_COMPANY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CORPORATES_COMPANY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        allCorporateCompany: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_COMPANY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        allCorporateCompany: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_OF_BUSINESS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_NATURE_OF_BUSINESS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getAllNatureOfBuisness: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_OF_BUSINESS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getAllNatureOfBuisness: [],
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CORPORATES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllCorporatesData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllCorporatesData: null,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_MAPPING_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.UPDATE_CORPORATE_MAPPING_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        UpdatedCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_MAPPING_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        ResponseMessage: action.message,
      };

    case actions.DELETE_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        DeleteCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.DELETE_CATEGORY_FAILED:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        ResponseMessage: action.message,
      };

    //Send Email Reset Password
    case actions.SEND_EMAIL_RESET_PASSWORD_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        sendEmailResetPassword: action.response,
        ResponseMessage: action.message,
      };

    case actions.SEND_EMAIL_RESET_PASSWORD_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        sendEmailResetPassword: null,
        ResponseMessage: action.message,
      };

    //getAllCategories Reducer
    case actions.GET_ALL_CATEGORIES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CATEGORIES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getAllCategories: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CATEGORIES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getAllCategories: [],
        ResponseMessage: action.message,
      };

    //RoleList Reducer
    case actions.ROLE_LIST_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.ROLE_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        RoleList: action.response,
        ResponseMessage: action.message,
      };

    case actions.ROLE_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        RoleList: [],
        ResponseMessage: action.message,
      };

    //GetBankUserRoles Reducer
    case actions.GET_BANK_USER_ROLES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_BANK_USER_ROLES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetBankUserRoles: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BANK_USER_ROLES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetBankUserRoles: null,
        ResponseMessage: action.message,
      };

    case actions.CLEARE_MESSAGE:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };

    //GetAllInstruments Reducer
    case actions.GET_ALL_INSTRUMENT_TYPES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_INSTRUMENT_TYPES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllInstrumentTypes: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_INSTRUMENT_TYPES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllInstrumentTypes: [],
        ResponseMessage: action.message,
      };

    //Get All Branches
    case actions.GET_ALL_BRANCHES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllBranchesData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllBranchesData: null,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        updatedBranchCategoryData: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_CATEGORY_MAPPING_FAILED:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        updatedBranchCategoryData: null,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_DATA_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_CORPORATES_DATA_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllCorporates: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_CORPORATES_DATA_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllCorporates: null,
        ResponseMessage: action.message,
      };
    case actions.GET_ALL_NATURE_OF_TRANSACTIONS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };

    case actions.GET_ALL_NATURE_OF_TRANSACTIONS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetAllNatureOfTransactions: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_NATURE_OF_TRANSACTIONS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetAllNatureOfTransactions: [],
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_AUTH:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };
    case actions.GET_LIST_ALL_INSTRUMENTS_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.GET_LIST_ALL_INSTRUMENTS_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getListAllInstruments: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.GET_LIST_ALL_INSTRUMENTS_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getListAllInstruments: null,
        ResponseMessage: action.message,
      };
    }
    case actions.ADD_HOLIDAY_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.ADD_HOLIDAY_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        addHoliday: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.ADD_HOLIDAY_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        addHoliday: null,
        ResponseMessage: action.message,
      };
    }
    case actions.GET_HOLIDAY_LIST_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.GET_HOLIDAY_LIST_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getAllHolidays: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.GET_HOLIDAY_LIST_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getAllHolidays: null,
        ResponseMessage: action.message,
      };
    }
    case actions.DELETE_HOLIDAY_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.DELETE_HOLIDAY_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        deleteHolidayByHolidayId: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.DELETE_HOLIDAY_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        deleteHolidayByHolidayId: null,
        ResponseMessage: action.message,
      };
    }
    case actions.GET_HOLIDAY_BY_HOLIDAYID_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.GET_HOLIDAY_BY_HOLIDAYID_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        getHolidayByHolidayId: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.GET_HOLIDAY_BY_HOLIDAYID_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        getHolidayByHolidayId: null,
        ResponseMessage: action.message,
      };
    }
    case actions.UPDATE_HOLIDAY_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }
    case actions.UPDATE_HOLIDAY_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        updateHolidayByHolidayId: action.response,
        ResponseMessage: action.message,
      };
    }
    case actions.UPDATE_HOLIDAY_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        updateHolidayByHolidayId: null,
        ResponseMessage: action.message,
      };
    }
    case actions.HOLIDAY_ADDED: {
      return {
        ...state,
        Loading: false,
        holidayAdded: action.payload,
      };
    }
    case actions.HOLIDAY_UPDATED: {
      return {
        ...state,
        Loading: false,
        holidayUpdated: action.payload,
      };
    }
    case actions.HOLIDAY_DELETED: {
      return {
        ...state,
        Loading: false,
        holidayDeleted: action.payload,
      };
    }
    case actions.RESET_PASSWORD_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }

    case actions.RESET_PASSWORD_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        resetPassword: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.RESET_PASSWORD_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        resetPassword: null,
        ResponseMessage: action.message,
      };
    }

    case actions.FORGOT_PASSWORD_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }

    case actions.FORGOT_PASSWORD_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        forgotPassword: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.FORGOT_PASSWORD_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        forgotPassword: null,
        ResponseMessage: action.message,
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_INIT: {
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_SUCCESS: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        resetPasswordEmailVerification: action.response,
        ResponseMessage: action.message,
      };
    }

    case actions.RESETPASSWORDEMAILVERIFICATION_FAIL: {
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        resetPasswordEmailVerification: null,
        ResponseMessage: action.message,
      };
    }
    default:
      return { ...state };
  }
};

export default authReducer;
