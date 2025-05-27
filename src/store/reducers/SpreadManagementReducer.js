// import * as actions from "../action_types";
import * as actions from "../action_types";

const initalState = {
  Loading: false,
  GetSpotSpreadsForCategory: null,
  GetCrossRateSpreadsForCategory: null,
  GetTenorWiseForwardSpreadsForCategory: null,
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
    default:
      return { ...state };
  }
};

export default SpreadManagementReducer;
