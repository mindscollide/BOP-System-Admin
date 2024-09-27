import { applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
// import { authReducer, systemReducer, securityReducer } from "./reducers";

import { configureStore } from "@reduxjs/toolkit";
import * as actions from "./action_types";
import {
  authReducer,
  downloadReducer,
  uploadReducer,
  AddCategory,
  BOPSystemAdminModal,
  BOPSystemAdminReducer,
} from "./reducers";

const AppReducer = combineReducers({
  auth: authReducer,
  downloadReducer: downloadReducer,
  uploadReducer: uploadReducer,
  AddCategory: AddCategory,
  BOPSystemAdminModal: BOPSystemAdminModal,
  BOPSystemAdminReducer: BOPSystemAdminReducer,
});

const rootReducer = (state, action) => {
  // when a logout action is dispatched it will reset redux state
  if (action.type === actions.SIGN_OUT) {
    state = undefined;
  }
  return AppReducer(state, action);
};

const store = configureStore(
  { reducer: rootReducer },
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
