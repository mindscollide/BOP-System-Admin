import axios from "axios";
import * as actions from "../action_types";
import {
  GetBranchesWithStatus,
  GetBranchTradeRights,
  GetCorporatesWithStatus,
  GetCorporateTradeRights,
  UpdateBranchStatus,
  UpdateBranchTradeRights,
  UpdateCorporateStatus,
  UpdateCorporateTradeRights,
} from "../../commen/apis/Api_config";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth-Actions";
import {
  ConfirmationModalSystemAdmin,
  editTradeAccessManagementModalSystemAdmin,
} from "./BOPSystemAdminModalsActions";

//GetCorporatesWithStatus
const GetCorporatesWithStatusInit = () => {
  return {
    type: actions.GET_CORPORATES_WITH_STATUS_INTI,
  };
};

const GetCorporatesWithStatusSuccess = (response, message) => {
  return {
    type: actions.GET_CORPORATES_WITH_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCorporatesWithStatusFail = (message) => {
  return {
    type: actions.GET_CORPORATES_WITH_STATUS_FAIL,
    message: message,
  };
};

const GetCorporatesWithStatusAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCorporatesWithStatusInit());

    let form = new FormData();
    form.append("RequestMethod", GetCorporatesWithStatus.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetCorporatesWithStatusAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCorporatesWithStatus_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCorporatesWithStatusSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCorporatesWithStatus_02".toLowerCase()
            ) {
              dispatch(GetCorporatesWithStatusFail(""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCorporatesWithStatus_04".toLowerCase()
            ) {
              dispatch(GetCorporatesWithStatusFail("Exception"));
            } else {
              dispatch(GetCorporatesWithStatusFail("Something went wrong"));
            }
          } else {
            dispatch(GetCorporatesWithStatusFail("Something went wrong"));
          }
        } else {
          dispatch(GetCorporatesWithStatusFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCorporatesWithStatusFail("Something went wrong"));
      });
  };
};

//UpdateCorporateStatus
const UpdateCorporateStatusInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_STATUS_INIT,
  };
};

const UpdateCorporateStatusSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCorporateStatusFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_STATUS_FAIL,
    message: message,
  };
};

const UpdateCorporateStatusAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(UpdateCorporateStatusInit());

    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateStatus.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateCorporateStatusAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateStatus_01".toLowerCase()
                )
            ) {
              dispatch(
                UpdateCorporateStatusSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateStatus_02".toLowerCase()
            ) {
              dispatch(UpdateCorporateStatusFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateStatus_03".toLowerCase()
            ) {
              dispatch(UpdateCorporateStatusFail("Corporate Not Found."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateStatus_04".toLowerCase()
            ) {
              dispatch(UpdateCorporateStatusFail("Exception."));
            } else {
              dispatch(UpdateCorporateStatusFail("Something went wrong"));
            }
          } else {
            dispatch(UpdateCorporateStatusFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCorporateStatusFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCorporateStatusFail("Something went wrong"));
      });
  };
};

//GetBranchesWithStatus
const GetBranchesWithStatusInit = () => {
  return {
    type: actions.GET_BRANCHES_WITH_STATUS_INIT,
  };
};

const GetBranchesWithStatusSuccess = (response, message) => {
  return {
    type: actions.GET_BRANCHES_WITH_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetBranchesWithStatusFail = (message) => {
  return {
    type: actions.GET_BRANCHES_WITH_STATUS_FAIL,
    message: message,
  };
};

const GetBranchesWithStatusAPI = (navigate, data) => {
  console.log("reached here");
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetBranchesWithStatusInit());

    let form = new FormData();
    form.append("RequestMethod", GetBranchesWithStatus.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetBranchesWithStatusAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetBranchesWithStatus_01".toLowerCase()
                )
            ) {
              dispatch(
                GetBranchesWithStatusSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetBranchesWithStatus_02".toLowerCase()
            ) {
              dispatch(GetBranchesWithStatusFail(""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetBranchesWithStatus_04".toLowerCase()
            ) {
              dispatch(GetBranchesWithStatusFail("Exception."));
            } else {
              dispatch(GetBranchesWithStatusFail("Something went wrong"));
            }
          } else {
            dispatch(GetBranchesWithStatusFail("Something went wrong"));
          }
        } else {
          dispatch(GetBranchesWithStatusFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBranchesWithStatusFail("Something went wrong"));
      });
  };
};

//UpdateBranchStatus
const UpdateBranchStatusInit = () => {
  return {
    type: actions.UPDATE_BRANCH_STATUS_INIT,
  };
};

const UpdateBranchStatusSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_STATUS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateBranchStatusFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_STATUS_FAIL,
    message: message,
  };
};

const UpdateBranchStatusAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(UpdateBranchStatusInit());

    let form = new FormData();
    form.append("RequestMethod", UpdateBranchStatus.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateBranchStatusAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchStatus_01".toLowerCase()
                )
            ) {
              dispatch(
                UpdateBranchStatusSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchStatus_02".toLowerCase()
            ) {
              dispatch(UpdateBranchStatusFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchStatus_03".toLowerCase()
            ) {
              dispatch(UpdateBranchStatusFail("Branch not found."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchStatus_04".toLowerCase()
            ) {
              dispatch(UpdateBranchStatusFail("Exception."));
            } else {
              dispatch(UpdateBranchStatusFail("Something went wrong"));
            }
          } else {
            dispatch(UpdateBranchStatusFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateBranchStatusFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateBranchStatusFail("Something went wrong"));
      });
  };
};

//GetCorporateTradeRights
const GetCorporateTradeRightsInit = () => {
  return {
    type: actions.GET_CORPORATE_TRADE_RIGHTS_INIT,
  };
};

const GetCorporateTradeRightsSuccess = (response, message) => {
  return {
    type: actions.GET_CORPORATE_TRADE_RIGHTS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCorporateTradeRightsFail = (message) => {
  return {
    type: actions.GET_CORPORATE_TRADE_RIGHTS_FAIL,
    message: message,
  };
};

const GetCorporateTradeRightsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCorporateTradeRightsInit());

    let form = new FormData();
    form.append("RequestMethod", GetCorporateTradeRights.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetCorporateTradeRightsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCorporateTradeRights_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCorporateTradeRightsSuccess(
                  response.data.responseResult,
                  ""
                )
              );
              dispatch(editTradeAccessManagementModalSystemAdmin(true));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCorporateTradeRights_02".toLowerCase()
            ) {
              dispatch(
                GetCorporateTradeRightsSuccess(
                  response.data.responseResult,
                  ""
                )
              );
              dispatch(editTradeAccessManagementModalSystemAdmin(true));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCorporateTradeRights_04".toLowerCase()
            ) {
              dispatch(GetCorporateTradeRightsFail("Exception."));
            } else {
              dispatch(GetCorporateTradeRightsFail("Something went wrong"));
            }
          } else {
            dispatch(GetCorporateTradeRightsFail("Something went wrong"));
          }
        } else {
          dispatch(GetCorporateTradeRightsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCorporateTradeRightsFail("Something went wrong"));
      });
  };
};

//GetBranchTradeRights
const GetBranchTradeRightsInit = () => {
  return {
    type: actions.GET_BRANCH_TRADE_RIGHTS_INIT,
  };
};

const GetBranchTradeRightsSuccess = (response, message) => {
  return {
    type: actions.GET_BRANCH_TRADE_RIGHTS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetBranchTradeRightsFail = (message) => {
  return {
    type: actions.GET_BRANCH_TRADE_RIGHTS_FAIL,
    message: message,
  };
};

const GetBranchTradeRightsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetBranchTradeRightsInit());

    let form = new FormData();
    form.append("RequestMethod", GetBranchTradeRights.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetBranchTradeRightsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetBranchTradeRights_01".toLowerCase()
                )
            ) {
              dispatch(
                GetBranchTradeRightsSuccess(
                  response.data.responseResult,
                  ""
                )
              );
              dispatch(editTradeAccessManagementModalSystemAdmin(true));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetBranchTradeRights_02".toLowerCase()
            ) {
              dispatch(
                GetBranchTradeRightsSuccess(
                  response.data.responseResult,
                  ""
                )
              );
              dispatch(editTradeAccessManagementModalSystemAdmin(true));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetBranchTradeRights_04".toLowerCase()
            ) {
              dispatch(GetBranchTradeRightsFail("Exception."));
            } else {
              dispatch(GetBranchTradeRightsFail("Something went wrong"));
            }
          } else {
            dispatch(GetBranchTradeRightsFail("Something went wrong"));
          }
        } else {
          dispatch(GetBranchTradeRightsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBranchTradeRightsFail("Something went wrong"));
      });
  };
};

//UpdateBranchTradeRights
const UpdateBranchTradeRightsInit = () => {
  return {
    type: actions.UPDATE_BRANCH_TRADE_RIGHTS_INIT,
  };
};

const UpdateBranchTradeRightsSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_TRADE_RIGHT_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateBranchTradeRightsFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_TRADE_RIGHT_FAIL,
    message: message,
  };
};

const UpdateBranchTradeRightsAPI = (navigate, data, handleCloseModal) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(UpdateBranchTradeRightsInit());

    let form = new FormData();
    form.append("RequestMethod", UpdateBranchTradeRights.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(
            UpdateBranchTradeRightsAPI(navigate, data, handleCloseModal)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchTradeRights_01".toLowerCase()
                )
            ) {
              dispatch(
                UpdateBranchTradeRightsSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
              await dispatch(ConfirmationModalSystemAdmin(false));
              handleCloseModal();
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchTradeRights_02".toLowerCase()
            ) {
              dispatch(UpdateBranchTradeRightsFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchTradeRights_04".toLowerCase()
            ) {
              dispatch(UpdateBranchTradeRightsFail("Exception."));
            } else {
              dispatch(UpdateBranchTradeRightsFail("Something went wrong"));
            }
          } else {
            dispatch(UpdateBranchTradeRightsFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateBranchTradeRightsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateBranchTradeRightsFail("Something went wrong"));
      });
  };
};

//UpdateCorporateTradeRights
const UpdateCorporateTradeRightsInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_TRADE_RIGHTS_INIT,
  };
};

const UpdateCorporateTradeRightsSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_TRADE_RIGHT_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCorporateTradeRightsFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_TRADE_RIGHT_FAIL,
    message: message,
  };
};

const UpdateCorporateTradeRightsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(UpdateCorporateTradeRightsInit());

    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateTradeRights.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateCorporateTradeRightsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  // "SystemAdmin_SystemAdminManager_UpdateCorporateTradeRights_01".toLowerCase()
                  "SystemAdmin_SystemAdminManager_UpdateCoporateTradeRights_01".toLowerCase()
                )
            ) {
              dispatch(
                UpdateCorporateTradeRightsSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
              await dispatch(ConfirmationModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              // "SystemAdmin_SystemAdminManager_UpdateCorporateTradeRights_02".toLowerCase()
              "SystemAdmin_SystemAdminManager_UpdateCoporateTradeRights_02".toLowerCase()
            ) {
              dispatch(UpdateCorporateTradeRightsFail("Exception."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              // "SystemAdmin_SystemAdminManager_UpdateCorporateTradeRights_04".toLowerCase()
              "SystemAdmin_SystemAdminManager_UpdateCoporateTradeRights_04".toLowerCase()
            ) {
              dispatch(UpdateCorporateTradeRightsFail("Exception."));
            } else {
              dispatch(UpdateCorporateTradeRightsFail("Something went wrong"));
            }
          } else {
            dispatch(UpdateCorporateTradeRightsFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCorporateTradeRightsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCorporateTradeRightsFail("Something went wrong"));
      });
  };
};

const clearResponseMessageSetupTradeAccessManagementReducer = () => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_SETUPTRADEACCESSMANAGEMENTREDUCER,
  };
};

export {
  GetCorporatesWithStatusAPI,
  GetBranchesWithStatusAPI,
  UpdateCorporateStatusAPI,
  UpdateBranchStatusAPI,
  GetCorporateTradeRightsAPI,
  GetBranchTradeRightsAPI,
  UpdateBranchTradeRightsAPI,
  UpdateCorporateTradeRightsAPI,
  clearResponseMessageSetupTradeAccessManagementReducer,
};
