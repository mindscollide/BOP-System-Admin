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
  SaveCategoryFEDiscounts: null,
  SaveCategoryNonFEDiscounts: null,
  CurrencyManagementData: null,
  SaveInstrumentAppliacableData: null,
};

const SpreadManagementReducer = (state = initalState, action) => {
  switch (action.type) {
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetSpotSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_SPOT_SPREAD_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetSpotSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetCrossRateSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetCrossRateSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetTenorWiseForwardSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetTenorWiseForwardSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetTenorWiseFEDiscountingSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetTenorWiseFEDiscountingSpreadsForCategory: null,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        GetTenorWiseNonFEDiscountingSpreadsForCategory: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        GetTenorWiseNonFEDiscountingSpreadsForCategory: null,
        ResponseMessage: action.message,
      };

    case actions.SAVE_CATEGORY_PARITY_SPOT_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_CATEGORY_PARITY_SPOT_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveCategoryParitySpot: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_PARITY_SPOT_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveCategoryParitySpot: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveCategoryCrossRates: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_CROSS_RATES_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveCategoryCrossRates: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FORWARDS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_CATEGORY_FORWARDS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveCategoryForwards: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FORWARDS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveCategoryForwards: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FE_DISCOUNTS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_CATEGORY_FE_DISCOUNTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveCategoryFEDiscounts: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_FE_DISCOUNTS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveCategoryFEDiscounts: null,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveCategoryNonFEDiscounts: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveCategoryNonFEDiscounts: null,
        ResponseMessage: action.message,
      };

    case actions.GET_INSTRUMENT_APPLICABLE_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.GET_INSTRUMENT_APPLICABLE_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        CurrencyManagementData: action.response,
        ResponseMessage: action.message,
      };
    case actions.GET_INSTRUMENT_APPLICABLE_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        CurrencyManagementData: null,
        ResponseMessage: action.message,
      };

    case actions.SAVE_INSTRUMENT_APPLICABLE_INIT:
      return {
        ...state,
        Loading: true,
        errorSeverity: "",
      };
    case actions.SAVE_INSTRUMENT_APPLICABLE_SUCCESS:
      return {
        ...state,
        Loading: false,
        errorSeverity: "success",
        SaveInstrumentAppliacableData: action.response,
        ResponseMessage: action.message,
      };
    case actions.SAVE_INSTRUMENT_APPLICABLE_FAIL:
      return {
        ...state,
        Loading: false,
        errorSeverity: "error",
        SaveInstrumentAppliacableData: null,
        ResponseMessage: action.message,
      };

    case actions.CLEAR_RESPONSEMESSAGE_SPREADMANAGEMENTREDUCER:
      return {
        ...state,
        errorSeverity: "",
        ResponseMessage: "",
      };
    default:
      return { ...state };
  }
};

export default SpreadManagementReducer;
