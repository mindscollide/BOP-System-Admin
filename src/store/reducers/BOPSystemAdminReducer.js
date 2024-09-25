import { GetAllBranches } from "../../commen/apis/Api_config";
import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  createNewCorporate: null,
  updateCorporateByID: null,
  AddBranchData: null,
  UpdateBranchData: null,
  GetAllBranchesData: null,
  CreateBankUserRequestData: null,
  CreateBulkBankUserRequestData: null,
  CreateCorporateUserRequestData: null,
  CreateBulkCorporateUserData: null,
  BankUsersBankList: null,
  CorporateUsersBulkListData: null,
  SearchCorporateUsersData: null,
  SearchBankUsersData: null,
  UpdateCorporateUsersData: null,
};

const BOPSystemAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    //Create New Corporate
    case actions.CREATE_NEW_CORPORATE_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.CREATE_NEW_CORPORATE_SUCCESS:
      return {
        ...state,
        Loading: true,
        createNewCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.CREATE_NEW_CORPORATE_FAIL:
      return {
        ...state,
        Loading: true,
        createNewCorporate: null,
        ResponseMessage: action.message,
      };
    //Update Corporate By CorporateID
    case actions.UPDATE_CORPORATE_BY_CORPORATEID_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_BY_CORPORATEID_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCorporateByID: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_BY_CORPORATEID_FAIL:
      return {
        ...state,
        Loading: false,
        updateCorporateByID: null,
        ResponseMessage: action.message,
      };
    //Add Branch
    case actions.ADD_BRANCH_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ADD_BRANCH_SUCCESS:
      return {
        ...state,
        Loading: true,
        AddBranchData: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_FAIL:
      return {
        ...state,
        Loading: true,
        AddBranchData: null,
        ResponseMessage: action.message,
      };
    //Update Branch
    case actions.UPDATE_BRANCH_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
        Loading: true,
        UpdateBranchData: action.response,
        ResponseMessage: action.response,
      };

    case actions.UPDATE_BRANCH_FAIL:
      return {
        ...state,
        Loading: true,
        UpdateBranchData: null,
        ResponseMessage: action.response,
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
        GetAllBranches: action.response,
        ResponseMessage: action.response,
      };

    case actions.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllBranches: null,
        ResponseMessage: action.response,
      };
    //Create  Bank User Request
    case actions.CREATE_BANK_USER_REQUEST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.CREATE_BANK_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        CreateBankUserRequestData: action.response,
        ResponseMessage: action.response,
      };
    case actions.CREATE_BANK_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        CreateBankUserRequestData: null,
        ResponseMessage: action.response,
      };
    //Create Bulk Bank User Request
    case actions.CREATE_BULK_BANK_USER_REQUEST_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.CREATE_BULK_BANK_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        CreateBulkBankUserRequestData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CREATE_BULK_BANK_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        CreateBulkBankUserRequestData: null,
        ResponseMessage: action.message,
      };
    //Create CorporateUser Request
    case actions.CREATE_CORPORATE_USER_REQUEST_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.CREATE_CORPORATE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        CreateCorporateUserRequestData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CREATE_CORPORATE_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        CreateCorporateUserRequestData: null,
        ResponseMessage: action.message,
      };
    //Create Bulk Corporate User Request
    case actions.CREATE_BULK_CORPORATE_USER_REQUEST_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.CREATE_BULK_CORPORATE_USER_REQUEST_SUCCESS:
      return {
        ...state,
        Loading: false,
        CreateBulkCorporateUserData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CREATE_BULK_CORPORATE_USER_REQUEST_FAIL:
      return {
        ...state,
        Loading: false,
        CreateBulkCorporateUserData: null,
        ResponseMessage: action.message,
      };
    //Bank Users BankUserList
    case actions.BANK_USERS_BANK_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.BANK_USERS_BANK_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        BankUsersBankList: action.response,
        ResponseMessage: action.message,
      };
    case actions.BANK_USERS_BANK_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        BankUsersBankList: null,
        ResponseMessage: action.message,
      };
    //Corporate Users Bulk List
    case actions.CORPORATE_USERS_BULK_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.CORPORATE_USERS_BULK_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        CorporateUsersBulkListData: action.response,
        ResponseMessage: action.message,
      };
    case actions.CORPORATE_USERS_BULK_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        CorporateUsersBulkListData: action.response,
        ResponseMessage: action.message,
      };
    //Search Corporate Users
    case actions.SEARCH_CORPORATE_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SEARCH_CORPORATE_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchCorporateUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_CORPORATE_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        SearchCorporateUsersData: null,
        ResponseMessage: action.message,
      };
    //Search Bank Users
    case actions.SEARCH_BANK_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SEARCH_BANK_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchBankUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_BANK_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        SearchBankUsersData: null,
        ResponseMessage: action.message,
      };
    //Update Corporate User
    case actions.UPDATE_CORPORATE_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_CORPORATE_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateCorporateUsersData: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_CORPORATE_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateCorporateUsersData: null,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default BOPSystemAdminReducer;
