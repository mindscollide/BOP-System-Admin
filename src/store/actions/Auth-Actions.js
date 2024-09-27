import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationRefreshToken,
  getallCoporatesSystem,
  UpdateCorporateMapping,
  DeleteCategory,
  LoginSystemAdmin,
  CorporateUserLogin,
  SendEmailResetPassword,
} from "../../commen/apis/Api_config";
import {
  authenticationAPI,
  systemAdminAPI,
} from "../../commen/apis/Api_ends_points";

const cleareMessage = (response) => {
  return {
    type: actions.CLEARE_MESSAGE,
  };
};

const signOut = (navigate, message) => {
  localStorage.clear();
  navigate("/");
  if (message !== "") {
    return {
      type: actions.SIGN_OUT,
      message: message,
    };
  } else {
    return {
      type: actions.SIGN_OUT,
    };
  }
};

// REFRESH TOKEN
const refreshtokenFail = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_FAIL,
    response: response,
    message: message,
  };
};
// SUCCESS
const refreshtokenSuccess = (response, message) => {
  return {
    type: actions.REFRESH_TOKEN_SUCCESS,
    response: response,
    message: message,
  };
};
// API
const RefreshToken = (navigate) => {
  let Token = JSON.parse(localStorage.getItem("token"));
  let RefreshToken = JSON.parse(localStorage.getItem("refreshToken"));
  console.log("RefreshToken", Token, RefreshToken);
  let Data = {
    Token: Token,
    RefreshToken: RefreshToken,
  };
  console.log("RefreshToken", Data);
  return async (dispatch) => {
    let form = new FormData();
    form.append("RequestMethod", authenticationRefreshToken.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    await axios({
      method: "post",
      url: authenticationAPI,
      data: form,
    })
      .then(async (response) => {
        console.log("RefreshToken", response);
        if (response.data.responseCode === 200) {
          await dispatch(
            refreshtokenSuccess(
              response.data.responseResult,
              "Refresh Token Update Successfully"
            )
          );
        } else {
          console.log("RefreshToken", response);
          let message2 = "Your Session has expired. Please login again";
          dispatch(signOut(navigate, message2));
          await dispatch(
            refreshtokenFail("Your Session has expired. Please login again.")
          );
        }
      })
      .catch((response) => {
        dispatch(
          refreshtokenFail("Your Session has expired. Please login again.")
        );
      });
  };
};

const getallcoporatesinit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_INIT,
  };
};

const getallcorporatessuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CORPORATES_SUCCESS,
    response: response,
    message: message,
  };
};

const getallcorporatesfailed = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_FAIL,
    message: message,
  };
};

const getAllCorporatesCategory = (navigate) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let data = {};
  return (dispatch) => {
    // dispatch(categoryCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", getallCoporatesSystem.RequestMethod);
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
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(getAllCorporatesCategory(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_01".toLowerCase()
            ) {
              dispatch(
                getallcorporatessuccess(
                  response.data.responseResult.corporateCategories,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_02".toLowerCase()
                )
            ) {
              dispatch(getallcorporatesfailed("No Record Found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_03".toLowerCase()
                )
            ) {
              dispatch(getallcorporatesfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCorporateDetails_04".toLowerCase()
                )
            ) {
              dispatch(
                getallcorporatesfailed("Exception Something went wrong")
              );
            }
          } else {
            dispatch(getallcorporatesfailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(getallcorporatesfailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(getallcorporatesfailed("something went wrong"));
      });
  };
};

const updatecorporateinit = () => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_INIT,
  };
};

const updatecorporatesuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_SUCCESS,
    response: response,
    message: message,
  };
};

const updatecorporatefailed = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_MAPPING_FAIL,
    message: message,
  };
};

const UpdatecorporateMapping = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    // dispatch(categoryCompanyInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateMapping.RequestMethod);
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
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdatecorporateMapping(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_01".toLowerCase()
            ) {
              await dispatch(getAllCorporatesCategory(navigate));
              dispatch(
                updatecorporatesuccess(
                  response.data.responseResult.corporateCategory,
                  "Record Updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_02".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_03".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_04".toLowerCase()
                )
            ) {
              dispatch(updatecorporatefailed("Exception Something went wrong"));
            }
          } else {
            dispatch(updatecorporatefailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(updatecorporatefailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(updatecorporatefailed("something went wrong"));
      });
  };
};

const deletecorporatecategoryinit = () => {
  return {
    type: actions.DELETE_CATEGORY_INIT,
  };
};

const deletecorporatecategorysuccess = (response, message) => {
  return {
    type: actions.DELETE_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const deletecorporatecategoryfailed = (message) => {
  return {
    type: actions.DELETE_CATEGORY_FAILED,
    message: message,
  };
};

const DeleteCorporateCategoryAPI = (navigate, data, setDeleteRejectModal) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return async (dispatch) => {
    dispatch(deletecorporatecategoryinit());
    let form = new FormData();
    form.append("RequestMethod", DeleteCategory.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    await axios({
      method: "POST",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        console.log("CorporateCategoryCorporateCategory", response);
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(DeleteCorporateCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_01".toLowerCase()
            ) {
              setDeleteRejectModal(true);
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Cannot be delete It is mapped with a corporate"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Deleted"
                )
              );
              dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_03".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Category not Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_04".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCorporateCategory_05".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategoryfailed("Exception Something went wrong ")
              );
            }
          } else {
            dispatch(deletecorporatecategoryfailed("Something went wrong"));
            console.log("There's no corporates category");
          }
        } else {
          dispatch(deletecorporatecategoryfailed("Something went wrong"));
          console.log("There's no corporates category");
        }
      })
      .catch((response) => {
        dispatch(deletecorporatecategoryfailed("something went wrong"));
      });
  };
};

//Login API System Admin
const loginSystemAdmininit = () => {
  return {
    type: actions.LOG_IN_INIT,
  };
};

const loginSystemAdminSuccess = (response, message) => {
  return {
    type: actions.LOG_IN_SUCCESS,
    response: response,
    message: message,
  };
};

const loginSystemAdminFailed = (response, message) => {
  return {
    type: actions.LOG_IN_FAIL,
    message: message,
  };
};

const loginSystemAdminAPI = (navigate, data) => {
  // let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(loginSystemAdmininit());
    let form = new FormData();
    form.append("RequestMethod", LoginSystemAdmin.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        // _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(loginSystemAdminAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_Login_01".toLowerCase()
            ) {
              dispatch(
                loginSystemAdminFailed(
                  response.data.responseResult,
                  "Device is Empty"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_02".toLowerCase())
            ) {
              dispatch(loginSystemAdminFailed("Device ID is Empty"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
            ) {
              dispatch(loginSystemAdminSuccess("LDAP auth Successful"));
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "userID",
                response.data.responseResult.userID
              );
              localStorage.setItem(
                "userName",
                response.data.responseResult.userName
              );
              navigate("/SystemAdmin/AddBankUser");
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_04".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("LDAP Auth Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("User is Locked"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("User is Disabled"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("User is Closed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("User is Dormant"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("Login Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("Not A valid role to login"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("Login Failed"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
          ) {
            dispatch(loginSystemAdminFailed("Something went wrong"));
          } else {
            dispatch(loginSystemAdminFailed("Something went wrong"));
          }
        } else {
          dispatch(loginSystemAdminFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(loginSystemAdminFailed("something went wrong"));
      });
  };
};

//Send Email Reset Password
const SendEmailResetPasswordInit = () => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_INIT,
  };
};

const SendEmailResetPasswordSuccess = (response, message) => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_SUCCESS,
    response: response,
    message: message,
  };
};

const SendEmailResetPasswordFail = (message) => {
  return {
    type: actions.SEND_EMAIL_RESET_PASSWORD_FAIL,
    message: message,
  };
};

const SendEmailResetPasswordAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(SendEmailResetPasswordInit());
    let form = new FormData();
    form.append("RequestMethod", SendEmailResetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: authenticationAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(SendEmailResetPasswordAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_SendEmailForResetPasword_01".toLowerCase()
            ) {
              dispatch(
                SendEmailResetPasswordSuccess(
                  response.data.responseResult,
                  "Email for Reset Password Sent Successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_02".toLowerCase()
                )
            ) {
              dispatch(
                SendEmailResetPasswordFail("No Email sent for Reset Password")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_03".toLowerCase()
                )
            ) {
              dispatch(SendEmailResetPasswordFail("Invalid Corporate UserF"));
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_04".toLowerCase()
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Please Enter A valid Email"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_05".toLowerCase()
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Something went wrong"));
          } else {
            dispatch(SendEmailResetPasswordFail("Something went wrong"));
          }
        } else {
          dispatch(SendEmailResetPasswordFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SendEmailResetPasswordFail("something went wrong"));
      });
  };
};

export {
  signOut,
  RefreshToken,
  getAllCorporatesCategory,
  UpdatecorporateMapping,
  DeleteCorporateCategoryAPI,
  loginSystemAdminAPI,
  SendEmailResetPasswordAPI,
  cleareMessage,
};
