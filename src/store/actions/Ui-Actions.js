import * as actions from "../action_types";

// severity: "success" | "error" | "warning" | "info"
const showSnackbar = (message, severity = "error") => {
  return {
    type: actions.SHOW_SNACKBAR,
    payload: { message, severity },
  };
};

const hideSnackbar = () => {
  return { type: actions.HIDE_SNACKBAR };
};

const setGlobalLoading = (loading) => {
  return { type: actions.SET_GLOBAL_LOADING, payload: loading };
};

export { showSnackbar, hideSnackbar, setGlobalLoading };
