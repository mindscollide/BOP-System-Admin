import axios from "axios";
import {
  GetAllCorporateUsers,
  GetCorporateUserByUserID,
  SearchCorporateUsers,
  UpdateCorporateUsers,
} from "../../commen/apis/Api_config";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth-Actions";
import {
  EditCorporateModalSystemAdmin,
  UserDetailsCorporateModalSystemAdmin,
} from "./BOPSystemAdminModalsActions";
import * as actions from "../action_types";

//Get All Corporate Users
const GetAllCorporateUsersInit = () => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_INIT,
  };
};

const GetAllCorporateUsersSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllCorporateUsersFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATE_USER_FAIL,
    message: message,
  };
};

const GetAllCorporateUsersAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllCorporateUsersInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllCorporateUsers.RequestMethod);
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
          dispatch(GetAllCorporateUsersAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllCorporateUsersSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_02".toLowerCase()
            ) {
              dispatch(GetAllCorporateUsersFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(GetAllCorporateUsersFail("Exception"));
            }
          } else {
            dispatch(GetAllCorporateUsersFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllCorporateUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllCorporateUsersFail("something went wrong"));
      });
  };
};

//Get All Corporate Users
const GetCorporateUserByUserIDInit = () => {
  return {
    type: actions.GET_CORPORATE_USER_BY_USERID_INIT,
  };
};

const GetCorporateUserByUserIDSuccess = (response, message) => {
  return {
    type: actions.GET_CORPORATE_USER_BY_USERID_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCorporateUserByUserIDFail = (message) => {
  return {
    type: actions.GET_CORPORATE_USER_BY_USERID_FAIL,
    message: message,
  };
};

const GetCorporateUserByUserIDApi = (
  navigate,
  data,
  setCorproateUserId,
  view
) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCorporateUserByUserIDInit());
    let form = new FormData();
    form.append("RequestMethod", GetCorporateUserByUserID.RequestMethod);
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
            GetCorporateUserByUserIDApi(
              navigate,
              data,
              setCorproateUserId,
              view
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCorporateUserByUserID_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCorporateUserByUserIDSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
              setCorproateUserId(data.UserId);
              if (view === 0) {
                dispatch(EditCorporateModalSystemAdmin(true));
              } else if (view === 1) {
                dispatch(UserDetailsCorporateModalSystemAdmin(true));
              }
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCorporateUserByUserID_02".toLowerCase()
            ) {
              dispatch(GetCorporateUserByUserIDFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCorporateUserByUserID_03".toLowerCase()
                )
            ) {
              dispatch(GetCorporateUserByUserIDFail("Exception"));
            }
          } else {
            dispatch(GetCorporateUserByUserIDFail("Something went wrong"));
          }
        } else {
          dispatch(GetCorporateUserByUserIDFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCorporateUserByUserIDFail("something went wrong"));
      });
  };
};
//Search Corporate Users
const SearchCorporateUsersInit = () => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_INIT,
  };
};

const SearchCorporateUsersSuccess = (response, message) => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const SearchCorporateUsersFail = (message) => {
  return {
    type: actions.SEARCH_CORPORATE_USERS_FAIL,
    message: message,
  };
};

const SearchCorporateUsersAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SearchCorporateUsersInit());
    let form = new FormData();
    form.append("RequestMethod", SearchCorporateUsers.RequestMethod);
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(SearchCorporateUsersAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_SearchCorporateUsers_01".toLowerCase()
            ) {
              dispatch(
                SearchCorporateUsersSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("Exception"));
            }
          } else {
            dispatch(SearchCorporateUsersFail("Something went wrong"));
          }
        } else {
          dispatch(SearchCorporateUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SearchCorporateUsersFail("something went wrong"));
      });
  };
};

//Update Corporate User
const UpdateCorporateUsersInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_USERS_INIT,
  };
};

const UpdateCorporateUsersSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCorporateUsersFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_USERS_FAIL,
    message: message,
  };
};

const UpdateCorporateUsersAPI = (navigate, data, setCorproateUserId) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateCorporateUsersInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateUsers.RequestMethod);
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateCorporateUsersAPI(navigate, data, setCorproateUserId));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateUser_01".toLowerCase()
            ) {
              dispatch(
                UpdateCorporateUsersSuccess(
                  response.data.responseResult,
                  "Updated Successfully"
                )
              );
              dispatch(EditCorporateModalSystemAdmin(false));

              setCorproateUserId(0);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_02".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateUsersFail("UnSuccessful"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateUser_03".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateUsersFail("Exception"));
            }
          } else {
            dispatch(UpdateCorporateUsersFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCorporateUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCorporateUsersFail("something went wrong"));
      });
  };
};

const clearResponseMessageCorporateUserReducer = () => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_CORPORATEUSERREDUCER,
  };
};

export {
  GetAllCorporateUsersAPI,
  GetCorporateUserByUserIDApi,
  SearchCorporateUsersAPI,
  UpdateCorporateUsersAPI,
  clearResponseMessageCorporateUserReducer,
};
