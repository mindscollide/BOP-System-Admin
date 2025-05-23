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
  UpdateBankUserByUserIdData: null,
  GetVolmeterByBankIDData: null,
  AddUpdateVolmeter: null,
  GetBankUserbyUserIDData: null,

  //from here
  UpdateVolmeterByDealer: null,
  UpdateVolMeterSettingByBankId: null,
  GetVolMeterSettingByBankId: null,
  GetAllBankUsers: null,
  GetVolmeterByBankID: null,
  GetCounterPartyNamesData: null,
  GetAllInstruments: null,
  SearchAllUserLoginHistory: null,
  GetCounterPartyList: null,
  updateCateogryData: null,
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
        Loading: false,
        createNewCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.CREATE_NEW_CORPORATE_FAIL:
      return {
        ...state,
        Loading: false,
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
        Loading: false,
        AddBranchData: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_FAIL:
      return {
        ...state,
        Loading: false,
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
        Loading: false,
        UpdateBranchData: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateBranchData: null,
        ResponseMessage: action.message,
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
        ResponseMessage: action.message,
      };
    case actions.CREATE_BANK_USER_REQUEST_FAIL:
      console.log(action);
      return {
        ...state,
        Loading: false,
        CreateBankUserRequestData: null,
        ResponseMessage: action.message,
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

    //Get All Bank Users
    case actions.GET_ALL_BANK_USERS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_ALL_BANK_USERS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllBankUsers: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_ALL_BANK_USERS_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllBankUsers: null,
        ResponseMessage: action.message,
      };

    //Get Bank User by UserID
    case actions.GET_BANK_USER_BY_USERID_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_BANK_USER_BY_USERID_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetBankUserbyUserIDData: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_BANK_USER_BY_USERID_FAIL:
      return {
        ...state,
        Loading: false,
        GetBankUserbyUserIDData: null,
        ResponseMessage: action.message,
      };
    //Update Bank User By Bank ID
    case actions.UPDATE_BANK_USER_BY_USERID_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_BANK_USER_BY_USERID_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateBankUserByUserIdData: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_BANK_USER_BY_USERID_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateBankUserByUserIdData: null,
        ResponseMessage: action.message,
      };
    //Get VolMeters By Bannking ID
    case actions.GET_VOLMETER_BY_BANKID_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_VOLMETER_BY_BANKID_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetVolmeterByBankID: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_VOLMETER_BY_BANKID_FAIL:
      return {
        ...state,
        Loading: false,
        GetVolmeterByBankID: null,
        ResponseMessage: action.message,
      };
    //Add Update Volmeter
    case actions.ADD_UPDATE_VOLMTER_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.ADD_UPDATE_VOLMTER_SUCCESS:
      return {
        ...state,
        Loading: false,
        AddUpdateVolmeter: action.response,
        ResponseMessage: action.message,
      };
    case actions.ADD_UPDATE_VOLMTER_FAIL:
      return {
        ...state,
        Loading: false,
        AddUpdateVolmeter: null,
        ResponseMessage: action.message,
      };

    //Update Volmeter By Dealer
    case actions.UPDATE_VOLMETER_BY_DEALER_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_VOLMETER_BY_DEALER_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateVolmeterByDealer: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_VOLMETER_BY_DEALER_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateVolmeterByDealer: null,
        ResponseMessage: action.message,
      };

    //Update VolMeter Setting By Bank Id
    case actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateVolmeterSettingByBankId: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateVolmeterSettingByBankId: null,
        ResponseMessage: action.message,
      };

    //Get Vometer setting by bank ID
    case actions.GET_VOLMETER_SETTING_BY_BANK_ID_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_VOLMETER_SETTING_BY_BANK_ID_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetVolmeterSettingByBankId: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_VOLMETER_SETTING_BY_BANK_ID_FAIL:
      return {
        ...state,
        Loading: false,
        GetVolMeterSettingByBankId: null,
        ResponseMessage: action.message,
      };

    // //Get all Corporates
    // case actions.GET_ALL_CORPORATES_INIT:
    //   return {
    //     ...state,
    //     Loading: true,
    //   };
    // case actions.GET_ALL_CORPORATES_SUCCESS:
    //   return {
    //     ...state,
    //     Loading: false,
    //     GetAllCorporates: action.response,
    //     ResponseMessage: action.message,
    //   };
    // case actions.GET_ALL_CORPORATES_FAIL:
    //   return {
    //     ...state,
    //     Loading: false,
    //     GetAllCorporates: null,
    //     ResponseMessage: action.message,
    //   };
    //Delete Volmeter

    //GetCounterPartyNames Reducer
    case actions.GET_COUNTER_PARTY_NAMES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_COUNTER_PARTY_NAMES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetCounterPartyNamesData: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_COUNTER_PARTY_NAMES_FAIL:
      return {
        ...state,
        Loading: false,
        GetCounterPartyNamesData: "",
        ResponseMessage: action.message,
      };

    //GetAllInstruments Reducer
    case actions.GET_ALL_INSTRUMENTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_INSTRUMENTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllInstruments: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_ALL_INSTRUMENTS_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllInstruments: null,
        ResponseMessage: action.message,
      };
    //Search Bank Users
    case actions.SEARCH_ALL_USER_LOGIN_HISTORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SEARCH_ALL_USER_LOGIN_HISTORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        SearchAllUserLoginHistory: action.response,
        ResponseMessage: action.message,
      };
    case actions.SEARCH_ALL_USER_LOGIN_HISTORY_FAIL:
      return {
        ...state,
        Loading: false,
        SearchAllUserLoginHistory: null,
        ResponseMessage: action.message,
      };

    //Get Counter Party List
    case actions.GET_COUNTER_PARTY_LIST_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_COUNTER_PARTY_LIST_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetCounterPartyList: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_COUNTER_PARTY_LIST_FAIL:
      return {
        ...state,
        Loading: false,
        GetCounterPartyList: null,
        ResponseMessage: action.message,
      };

    //Update Category
    case actions.UPDATE_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.UPDATE_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCateogryData: action.response,
        ResponseMessage: action.message,
      };
    case actions.UPDATE_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        updateCateogryData: null,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default BOPSystemAdminReducer;
