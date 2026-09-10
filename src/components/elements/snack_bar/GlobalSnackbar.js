import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { useDispatch, useSelector } from "react-redux";
import * as actionTypes from "../../../store/action_types";
import { hideSnackbar } from "../../../store/actions/Ui-Actions";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// Every domain reducer that tracks its own ResponseMessage/errorSeverity
// (same fields each reducer already uses for its own Loading state).
const REDUCER_MESSAGE_SOURCES = [
  ["auth", actionTypes.CLEAR_RESPONSEMESSAGE_AUTH],
  ["AddCategory", actionTypes.CLEAR_RESPONSEMESSAGE_ADD_CATEGORY],
  [
    "BOPSystemAdminModal",
    actionTypes.CLEAR_RESPONSEMESSAGE_BOPSYSTEMADMINREDUCERMODAL,
  ],
  [
    "BOPSystemAdminReducer",
    actionTypes.CLEAR_RESPONSEMESSAGE_BOPSYSTEMADMINREDUCER,
  ],
  [
    "CorporateUsersReducer",
    actionTypes.CLEAR_RESPONSEMESSAGE_CORPORATEUSERREDUCER,
  ],
  ["settingsReducer", actionTypes.CLEAR_RESPONSEMESSAGE_SETTINGS],
  [
    "SetupTradeAccessManagementReducer",
    actionTypes.CLEAR_RESPONSEMESSAGE_SETUPTRADEACCESSMANAGEMENTREDUCER,
  ],
  [
    "SpreadManagementReducer",
    actionTypes.CLEAR_RESPONSEMESSAGE_SPREADMANAGEMENTREDUCER,
  ],
  ["downloadReducer", actionTypes.CLEAR_RESPONSEMESSAGE_DOWNLOADREDUCER],
  ["uploadReducer", actionTypes.CLEAR_RESPONSEMESSAGE_UPLOADREDUCER],
];

/**
 * Single Snackbar mounted once at the app root. Shows either:
 *  - a manually triggered message (dispatch(showSnackbar(message, severity)))
 *  - or, if none is active, the first non-empty ResponseMessage found across
 *    the domain reducers, colored by that reducer's own errorSeverity.
 */
const GlobalSnackbar = () => {
  const dispatch = useDispatch();
  const state = useSelector((s) => s);
  const uiSnackbar = state.ui.snackbar;

  let active = uiSnackbar.open
    ? { source: "ui", message: uiSnackbar.message, severity: uiSnackbar.severity }
    : null;

  if (!active) {
    for (const [key, clearType] of REDUCER_MESSAGE_SOURCES) {
      const slice = state[key];
      if (slice && slice.ResponseMessage) {
        active = {
          source: key,
          clearType,
          message: slice.ResponseMessage,
          severity: slice.errorSeverity || "error",
        };
        break;
      }
    }
  }

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    if (!active) {
      return;
    }
    if (active.source === "ui") {
      dispatch(hideSnackbar());
    } else {
      dispatch({ type: active.clearType });
    }
  };

  if (!active) {
    return null;
  }

  return (
    <Snackbar
      autoHideDuration={4000}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      open
      onClose={handleClose}
      style={{ zIndex: 10000 }}
      key='global-snackbar'>
      <Alert onClose={handleClose} severity={active.severity}>
        {active.message}
      </Alert>
    </Snackbar>
  );
};

export default GlobalSnackbar;
