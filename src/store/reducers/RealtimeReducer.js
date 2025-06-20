// reducer.js
import * as types from "../action_types";

const initialState = {
  bankUserCreated: null,
  bankUserRoleStatusChange: null,
  bankUserUpdated: null,
  branchCreated: null,
  branchUpdated: null,

  corporateUserCreated: null,
  corporateUserRoleStatusChange: null,
  corporateCreated: null,
  corporateUpdated: null,
  corporateUserUpdated: null,

  marketTimingsUpdated: null,

  categoryAdded: null,
  categoryUpdated: null,
  categoryDeleted: null,

  counterpartyChanged: null,
  counterpartyBranchChanged: null,

  corporateStatusUpdated: null,
  branchStatusUpdated: null,
  corporateTradeStatusUpdated: null,
  branchTradeStatusUpdated: null,

  corporateTradeRightsUpdated: null,
  branchTradeRightsUpdated: null,

  spotSpreadUpdated: null,
  spotCrossUpdated: null,
  forwardSpreadUpdated: null,
  FEDiscountingSpreadUpdated: null,
  NonFEDiscountingSpreadUpdated: null,
};

const eventReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.SET_BANK_USER_CREATED:
      return { ...state, bankUserCreated: action.payload };
    case types.SET_BANK_USER_ROLE_STATUS_CHANGE:
      return { ...state, bankUserRoleStatusChange: action.payload };
    case types.SET_BANK_USER_UPDATED:
      return { ...state, bankUserUpdated: action.payload };
    case types.SET_BRANCH_CREATED:
      return { ...state, branchCreated: action.payload };
    case types.SET_BRANCH_UPDATED:
      return { ...state, branchUpdated: action.payload };

    case types.SET_CORPORATE_USER_CREATED:
      return { ...state, corporateUserCreated: action.payload };
    case types.SET_CORPORATE_USER_ROLE_STATUS_CHANGE:
      return { ...state, corporateUserRoleStatusChange: action.payload };
    case types.SET_CORPORATE_CREATED:
      return { ...state, corporateCreated: action.payload };
    case types.SET_CORPORATE_UPDATED:
      return { ...state, corporateUpdated: action.payload };
    case types.SET_CORPORATE_USER_UPDATED:
      return { ...state, corporateUserUpdated: action.payload };

    case types.SET_MARKET_TIMINGS_UPDATED:
      return { ...state, marketTimingsUpdated: action.payload };

    case types.SET_CATEGORY_ADDED:
      return { ...state, categoryAdded: action.payload };
    case types.SET_CATEGORY_UPDATED:
      return { ...state, categoryUpdated: action.payload };
    case types.SET_CATEGORY_DELETED:
      return { ...state, categoryDeleted: action.payload };

    case types.SET_COUNTERPARTY_CHANGED:
      return { ...state, counterpartyChanged: action.payload };
    case types.SET_COUNTERPARTY_BRANCH_CHANGED:
      return { ...state, counterpartyBranchChanged: action.payload };

    case types.SET_CORPORATE_STATUS_UPDATED:
      return { ...state, corporateStatusUpdated: action.payload };
    case types.SET_BRANCH_STATUS_UPDATED:
      return { ...state, branchStatusUpdated: action.payload };
    case types.SET_CORPORATE_TRADE_STATUS_UPDATED:
      return { ...state, corporateTradeStatusUpdated: action.payload };
    case types.SET_BRANCH_TRADE_STATUS_UPDATED:
      return { ...state, branchTradeStatusUpdated: action.payload };

    case types.SET_CORPORATE_TRADE_RIGHTS_UPDATED:
      return { ...state, corporateTradeRightsUpdated: action.payload };
    case types.SET_BRANCH_TRADE_RIGHTS_UPDATED:
      return { ...state, branchTradeRightsUpdated: action.payload };

    case types.SET_SPOT_SPREAD_UPDATED:
      return { ...state, spotSpreadUpdated: action.payload };
    case types.SET_SPOT_CROSS_UPDATED:
      return { ...state, spotCrossUpdated: action.payload };
    case types.SET_FORWARD_SPREAD_UPDATED:
      return { ...state, forwardSpreadUpdated: action.payload };
    case types.SET_FE_DISCOUNTING_SPREAD_UPDATED:
      return { ...state, FEDiscountingSpreadUpdated: action.payload };
    case types.SET_NON_FE_DISCOUNTING_SPREAD_UPDATED:
      return { ...state, NonFEDiscountingSpreadUpdated: action.payload };

    default:
      return state;
  }
};

export default eventReducer;
