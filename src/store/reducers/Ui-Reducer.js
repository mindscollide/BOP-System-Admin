import * as actions from "../action_types";

const initialState = {
  loading: false,
  snackbar: {
    open: false,
    message: "",
    severity: "error",
  },
};

const UiReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.SET_GLOBAL_LOADING:
      return { ...state, loading: !!action.payload };

    case actions.SHOW_SNACKBAR:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.payload.message,
          severity: action.payload.severity || "error",
        },
      };

    case actions.HIDE_SNACKBAR:
      return {
        ...state,
        snackbar: { ...state.snackbar, open: false },
      };

    default:
      return state;
  }
};

export default UiReducer;
