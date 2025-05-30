import * as actions from "../action_types";

const initialState = {
  Loading: false,
  GetCorporatesWithStatus: null,
  GetBranchesWithStatus: null,
  UpdateCorporateStatus: null,
  UpdateBranchStatus: null,
  GetBranchTradeRights: null,
  GetCorporateTradeRights: null,
  UpdateBranchTradeRights: null,
  UpdateCorporateTradeRights: null,
  GetTenorWiseFEDiscountingSpreadsForCategory: null,
};

const SetupTradeAccessManagementReducer = (state = initialState, action) => {
  switch (action.type) {
    //Get GetCorporatesWithStatus reducer
    case actions.GET_CORPORATES_WITH_STATUS_INTI:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_CORPORATES_WITH_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetCorporatesWithStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_CORPORATES_WITH_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        GetCorporatesWithStatus: null,
        ResponseMessage: action.message,
      };

    //UpdateCorporateStatus
    case actions.UPDATE_CORPORATE_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateCorporateStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateCorporateStatus: null,
        ResponseMessage: action.message,
      };

    //Get GetBranchesWithStatus reducer
    case actions.GET_BRANCHES_WITH_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_BRANCHES_WITH_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetBranchesWithStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BRANCHES_WITH_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        GetBranchesWithStatus: null,
        ResponseMessage: action.message,
      };

    //UpdateBranchesWithStatus reducer
    case actions.UPDATE_BRANCH_STATUS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_BRANCH_STATUS_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateBranchStatus: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_STATUS_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateBranchStatus: null,
        ResponseMessage: action.message,
      };

    //GetCorporateTradeRights reducer
    case actions.GET_CORPORATE_TRADE_RIGHTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_CORPORATE_TRADE_RIGHTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetCorporateTradeRights: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_CORPORATE_TRADE_RIGHTS_FAIL:
      return {
        ...state,
        Loading: false,
        GetCorporateTradeRights: null,
        ResponseMessage: action.message,
      };

    //GetBranchTradeRights reducer
    case actions.GET_BRANCH_TRADE_RIGHTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_BRANCH_TRADE_RIGHTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetBranchTradeRights: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_BRANCH_TRADE_RIGHTS_FAIL:
      return {
        ...state,
        Loading: false,
        GetBranchTradeRights: null,
        ResponseMessage: action.message,
      };

    //UpdateBranchTradeRights reducer
    case actions.UPDATE_BRANCH_TRADE_RIGHTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_BRANCH_TRADE_RIGHT_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateBranchTradeRights: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_BRANCH_TRADE_RIGHT_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateBranchTradeRights: null,
        ResponseMessage: action.message,
      };

    //UpdateCorporateTradeRights reducer
    case actions.UPDATE_CORPORATE_TRADE_RIGHTS_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_TRADE_RIGHT_SUCCESS:
      return {
        ...state,
        Loading: false,
        UpdateCorporateTradeRights: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_TRADE_RIGHT_FAIL:
      return {
        ...state,
        Loading: false,
        UpdateCorporateTradeRights: null,
        ResponseMessage: action.message,
      };

    //GetTenorWiseFEDiscountingSpreadsForCategory  reducer
    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetTenorWiseFEDiscountingSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };

    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        GetTenorWiseFEDiscountingSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default SetupTradeAccessManagementReducer;
