import * as types from "../action_types";

export const setBankUserCreated = (payload) => ({
  type: types.SET_BANK_USER_CREATED,
  payload,
});

export const setBankUserRoleStatusChange = (payload) => ({
  type: types.SET_BANK_USER_ROLE_STATUS_CHANGE,
  payload,
});

export const setBankUserUpdated = (payload) => {
  return {
    type: types.SET_BANK_USER_UPDATED,
    payload,
  };
};

export const setBranchCreated = (payload) => ({
  type: types.SET_BRANCH_CREATED,
  payload,
});

export const setBranchUpdated = (payload) => ({
  type: types.SET_BRANCH_UPDATED,
  payload,
});

// Corporate Actions
export const setCorporateUserCreated = (payload) => ({
  type: types.SET_CORPORATE_USER_CREATED,
  payload,
});

export const setCorporateUserRoleStatusChange = (payload) => ({
  type: types.SET_CORPORATE_USER_ROLE_STATUS_CHANGE,
  payload,
});

export const setCorporateCreated = (payload) => ({
  type: types.SET_CORPORATE_CREATED,
  payload,
});

export const setCorporateUpdated = (payload) => ({
  type: types.SET_CORPORATE_UPDATED,
  payload,
});

export const setCorporateUserUpdated = (payload) => ({
  type: types.SET_CORPORATE_USER_UPDATED,
  payload,
});

// Additional Events
export const setMarketTimingsUpdated = (payload) => ({
  type: types.SET_MARKET_TIMINGS_UPDATED,
  payload,
});

export const setCategoryAdded = (payload) => ({
  type: types.SET_CATEGORY_ADDED,
  payload,
});

export const setCategoryUpdated = (payload) => ({
  type: types.SET_CATEGORY_UPDATED,
  payload,
});

export const setCategoryDeleted = (payload) => ({
  type: types.SET_CATEGORY_DELETED,
  payload,
});

export const setCounterpartyChanged = (payload) => ({
  type: types.SET_COUNTERPARTY_CHANGED,
  payload,
});

export const setCounterpartyBranchChanged = (payload) => ({
  type: types.SET_COUNTERPARTY_BRANCH_CHANGED,
  payload,
});

export const setCorporateStatusUpdated = (payload) => ({
  type: types.SET_CORPORATE_STATUS_UPDATED,
  payload,
});

export const setBranchStatusUpdated = (payload) => ({
  type: types.SET_BRANCH_STATUS_UPDATED,
  payload,
});

export const setCorporateTradeStatusUpdated = (payload) => ({
  type: types.SET_CORPORATE_TRADE_STATUS_UPDATED,
  payload,
});

export const setBranchTradeStatusUpdated = (payload) => ({
  type: types.SET_BRANCH_TRADE_STATUS_UPDATED,
  payload,
});

export const setCorporateTradeRightsUpdated = (payload) => ({
  type: types.SET_CORPORATE_TRADE_RIGHTS_UPDATED,
  payload,
});

export const setBranchTradeRightsUpdated = (payload) => ({
  type: types.SET_BRANCH_TRADE_RIGHTS_UPDATED,
  payload,
});

export const setSpotSpreadUpdated = (payload) => ({
  type: types.SET_SPOT_SPREAD_UPDATED,
  payload,
});

export const setSpotCrossUpdated = (payload) => ({
  type: types.SET_SPOT_CROSS_UPDATED,
  payload,
});

export const setForwardSpreadUpdated = (payload) => ({
  type: types.SET_FORWARD_SPREAD_UPDATED,
  payload,
});

export const setFEDiscountingSpreadUpdated = (payload) => ({
  type: types.SET_FE_DISCOUNTING_SPREAD_UPDATED,
  payload,
});

export const setNonFEDiscountingSpreadUpdated = (payload) => ({
  type: types.SET_NON_FE_DISCOUNTING_SPREAD_UPDATED,
  payload,
});
