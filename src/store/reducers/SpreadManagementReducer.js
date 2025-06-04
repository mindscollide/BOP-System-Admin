// import * as actions from "../action_types";
import * as actions from "../action_types";

const initalState = {
  Loading: false,
  GetSpotSpreadsForCategory: null,
  GetCrossRateSpreadsForCategory: null,
  GetTenorWiseForwardSpreadsForCategory: null,
  GetTenorWiseFEDiscountingSpreadsForCategory: null,
  GetTenorWiseNonFEDiscountingSpreadsForCategory: null,
  SaveCategoryParitySpot: null,
  SaveCategoryCrossRates: null,
  SaveCategoryForwards: null,
};

const SpreadManagementReducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetSpotSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        GetSpotSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetCrossRateSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        GetCrossRateSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetTenorWiseForwardSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        GetTenorWiseForwardSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
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
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetTenorWiseNonFEDiscountingSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        GetTenorWiseNonFEDiscountingSpreadsForCategory: null,
        ResponseMessage: action.message,
      };

    case actions.SAVE_CATEGORY_PARITY_SPOT_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SAVE_CATEGORY_PARITY_SPOT_SUCCESS:
      return {
        ...state,
        Loading: false,
        SaveCategoryParitySpot: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_PARITY_SPOT_FAIL:
      return {
        ...state,
        Loading: false,
        SaveCategoryParitySpot: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_SUCCESS:
      return {
        ...state,
        Loading: false,
        SaveCategoryCrossRates: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_FAIL:
      return {
        ...state,
        Loading: false,
        SaveCategoryCrossRates: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FORWARDS_INIT:
      return {
        ...state,
        Loading: true,
      };
    case actions.SAVE_CATEGORY_FORWARDS_SUCCESS:
      return {
        ...state,
        Loading: false,
        SaveCategoryForwards: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FORWARDS_FAIL:
      return {
        ...state,
        Loading: false,
        SaveCategoryForwards: null,
        ResponseMessage: action.message,
      };
    default:
      return { ...state };
  }
};

export default SpreadManagementReducer;
