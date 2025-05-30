import * as actions from "../action_types";
import axios from "axios";
import {
  authenticationRefreshToken,
  UpdateCorporateMapping,
  DeleteCategory,
  LoginSystemAdmin,
  SendEmailResetPassword,
  GetAllCategories,
  GetAllCorporates,
  GetAllNatureOfBussiness,
  RoleList,
  GetBankUserRoles,
  GetAllInstrumentTypes,
  GetAllBranches,
  LogoutRM,
  UpdateBranchCategoryMappingapi,
  GetAllCorporatesData,
} from "../../commen/apis/Api_config";
import {
  authenticationAPI,
  systemAdminAPI,
} from "../../commen/apis/Api_ends_points";
import { DeleteCategoryModalSystemAdmin } from "./BOPSystemAdminModalsActions";
// import { getAllCorporatesCategory } from "./BOPSystemAdminActions";

const cleareMessage = (response) => {
  return {
    type: actions.CLEARE_MESSAGE,
  };
};

const signOut = (navigate) => {
  localStorage.clear();
  navigate("/");

  return {
    type: actions.SIGN_OUT,
  };
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
  let Token = localStorage.getItem("token");
  let RefreshToken = localStorage.getItem("refreshToken");
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
        if (response.data.responseCode === 205) {
          let message2 = "Your Session has expired. Please login again";
          dispatch(signOut(navigate, message2));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted) {
            if (
              response.data.responseResult.responseMessage.includes.toLowerCase(
                "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
              )
            ) {
              await dispatch(
                refreshtokenSuccess(
                  response.data.responseResult,
                  "Refresh Token Update Successfully"
                )
              );
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken
              );
            } else if (
              response.data.responseResult.responseMessage.includes.toLowerCase(
                "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
              )
            ) {
              let message2 = "Your Session has expired. Please login again";
              dispatch(signOut(navigate, message2));
            }
          } else {
            dispatch(signOut(navigate, ""));
            await dispatch(refreshtokenFail("Something went wrong"));
          }
        } else {
          dispatch(refreshtokenFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(
          refreshtokenFail("Your Session has expired. Please login again.")
        );
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
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(updatecorporateinit());
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
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdatecorporateMapping(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_01".toLowerCase()
            ) {
              dispatch(
                updatecorporatesuccess(
                  response.data.responseResult.corporateCategory,
                  "Record Updated"
                )
              );
              await dispatch(getAllCorporatesCategory(navigate));
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
          }
        } else {
          dispatch(updatecorporatefailed("Something went wrong"));
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

const DeleteCorporateCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
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
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(DeleteCorporateCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_DeleteCategory_01".toLowerCase()
            ) {
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Deleted"
                )
              );
              dispatch(DeleteCategoryModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Cannot be delete It is mapped with a corporate"
                )
              );
              dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_03".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Category not Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_04".toLowerCase()
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_05".toLowerCase()
                )
            ) {
              dispatch(
                deletecorporatecategoryfailed("Exception Something went wrong ")
              );
            }
          } else {
            dispatch(deletecorporatecategoryfailed("Something went wrong"));
          }
        } else {
          dispatch(deletecorporatecategoryfailed("Something went wrong"));
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

const loginSystemAdminFailed = (message) => {
  console.log("loginSystemAdminFailed", message);

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
    })
      .then(async (response) => {
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(loginSystemAdminAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          console.log("loginSystemAdmin", response);

          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_Login_01".toLowerCase()
            ) {
              console.log("loginSystemAdmin", response);
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
              console.log("loginSystemAdmin", response);

              dispatch(loginSystemAdminFailed("Device ID is Empty"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_03".toLowerCase())
            ) {
              console.log("loginSystemAdminSuccess", response);
              localStorage.setItem("defaultOpenKey", "sub1");
              localStorage.setItem("defaultSelectedKey", "1");
              dispatch(loginSystemAdminSuccess("LDAP auth Successful"));
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken
              );

              localStorage.setItem(
                "userID",
                response.data.responseResult.userID
              );
              localStorage.setItem(
                "userName",
                response.data.responseResult.userName
              );
              navigate("/BOP/AddBankUser");
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_04".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("LDAP Auth Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_05".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("User is Locked"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_06".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("User is Disabled"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_07".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("User is Closed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_08".toLowerCase())
            ) {
              console.log("loginSystemAdminFa", response);
              dispatch(loginSystemAdminFailed("User is Dormant"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_09".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Login Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_12".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Not A valid role to login"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_10".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Login Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_11".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Something went wrong"));
            }
          } else {
            console.log("loginSystemAdmin", response);
            dispatch(loginSystemAdminFailed("Something went wrong"));
          }
        } else {
          console.log("loginSystemAdmin", response);
          dispatch(loginSystemAdminFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        console.log("loginSystemAdmin", response);
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
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
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

//Get All Categories
const GetAllCategoriesInit = () => {
  return {
    type: actions.GET_ALL_CATEGORIES_INIT,
  };
};

const GetAllCategoriesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_CATEGORIES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllCategoriesFail = (message) => {
  return {
    type: actions.GET_ALL_CATEGORIES_FAIL,
    message: message,
  };
};

const GetAllCategoriesAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllCategoriesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllCategories.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(GetAllCategoriesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCategories_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllCategoriesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCategories_02".toLowerCase()
            ) {
              dispatch(GetAllCategoriesFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCategories_03".toLowerCase()
                )
            ) {
              dispatch(GetAllCategoriesFail("Exception"));
            }
          } else {
            dispatch(GetAllCategoriesFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllCategoriesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllCategoriesFail("something went wrong"));
      });
  };
};

const getAllCoporatesInit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_INIT,
  };
};

const getAllCorporatesSuccess = (response, message) => {
  console.log(response, "responseresponse");
  return {
    type: actions.GET_ALL_CORPORATES_SUCCESS,
    response: response,
    message: message,
  };
};

const getAllCorporatesFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_FAIL,
    message: message,
  };
};

const getAllCorporatesCategory = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(getAllCoporatesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllCorporates.RequestMethod);
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
          dispatch(getAllCorporatesCategory(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log(response.data.responseResult, "responseResult");
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_01".toLowerCase()
                )
            ) {
              dispatch(
                getAllCorporatesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_02".toLowerCase()
            ) {
              dispatch(getAllCorporatesFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_04".toLowerCase()
                )
            ) {
              dispatch(getAllCorporatesFail("Exception"));
            }
          } else {
            dispatch(getAllCorporatesFail("Something went wrong"));
          }
        } else {
          dispatch(getAllCorporatesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getAllCorporatesFail("something went wrong"));
      });
  };
};

const GetAllCorporatesDataInit = () => {
  return {
    type: actions.GET_ALL_CORPORATES_INIT,
  };
};

const GetAllCorporatesDataSuccess = (response, message) => {
  console.log(response, "responseresponse");
  return {
    type: actions.GET_ALL_CORPORATES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllCorporatesDataFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_FAIL,
    message: message,
  };
};

const GetAllCorporatesDataAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(getAllCoporatesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllCorporatesData.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(getAllCorporatesCategory(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log(response.data.responseResult, "responseResult");
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_01".toLowerCase()
                )
            ) {
              dispatch(
                getAllCorporatesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_02".toLowerCase()
            ) {
              dispatch(getAllCorporatesFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_04".toLowerCase()
                )
            ) {
              dispatch(getAllCorporatesFail("Exception"));
            }
          } else {
            dispatch(getAllCorporatesFail("Something went wrong"));
          }
        } else {
          dispatch(getAllCorporatesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getAllCorporatesFail("something went wrong"));
      });
  };
};
//Get All Categories
const GetAllNatureInit = () => {
  return {
    type: actions.GET_ALL_NATURE_OF_BUSINESS_INIT,
  };
};

const GetAllNatureSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_NATURE_OF_BUSINESS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllNatureFail = (message) => {
  return {
    type: actions.GET_ALL_NATURE_OF_BUSINESS_FAIL,
    message: message,
  };
};

const GetAllNatureAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllNatureInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllNatureOfBussiness.RequestMethod);
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
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data?.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetAllNatureAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllNatureSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_02".toLowerCase()
            ) {
              dispatch(GetAllNatureFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_03".toLowerCase()
                )
            ) {
              dispatch(GetAllNatureFail("Exception"));
            }
          } else {
            dispatch(GetAllNatureFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllNatureFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllNatureFail("something went wrong"));
      });
  };
};
//Get All Categories
const RoleListInit = () => {
  return {
    type: actions.ROLE_LIST_INIT,
  };
};

const RoleListSuccess = (response, message) => {
  return {
    type: actions.ROLE_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const RoleListFail = (message) => {
  return {
    type: actions.ROLE_LIST_FAIL,
    message: message,
  };
};

const RoleListAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(RoleListInit());
    let form = new FormData();
    form.append("RequestMethod", RoleList.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(RoleListAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_01".toLowerCase()
                )
            ) {
              dispatch(
                RoleListSuccess(response.data.responseResult, "Data Available")
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_RoleList_02".toLowerCase()
            ) {
              dispatch(RoleListFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_03".toLowerCase()
                )
            ) {
              dispatch(RoleListFail("Exception"));
            }
          } else {
            dispatch(RoleListFail("Something went wrong"));
          }
        } else {
          dispatch(RoleListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(RoleListFail("something went wrong"));
      });
  };
};

const GetBankUserRolesInit = () => {
  return {
    type: actions.GET_BANK_USER_ROLES_INIT,
  };
};

const GetBankUserRolesSuccess = (response, message) => {
  return {
    type: actions.GET_BANK_USER_ROLES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetBankUserRolesFail = (message) => {
  return {
    type: actions.GET_BANK_USER_ROLES_FAIL,
    message: message,
  };
};

const GetBankUserRolesAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetBankUserRolesInit());
    let form = new FormData();
    form.append("RequestMethod", GetBankUserRoles.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(GetBankUserRolesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUserRoles_01".toLowerCase()
                )
            ) {
              dispatch(
                GetBankUserRolesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetBankUserRoles_02".toLowerCase()
            ) {
              dispatch(GetBankUserRolesFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUserRoles_03".toLowerCase()
                )
            ) {
              dispatch(GetBankUserRolesFail("Exception"));
            }
          } else {
            dispatch(GetBankUserRolesFail("Something went wrong"));
          }
        } else {
          dispatch(GetBankUserRolesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBankUserRolesFail("something went wrong"));
      });
  };
};
const GetAllInstrumentTypesInit = () => {
  return {
    type: actions.GET_ALL_INSTRUMENT_TYPES_INIT,
  };
};
const GetAllInstrumentTypesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_INSTRUMENT_TYPES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllInstrumentTypesFail = (message) => {
  return {
    type: actions.GET_ALL_INSTRUMENT_TYPES_FAIL,
    message: message,
  };
};

const GetAllInstrumentTypesAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllInstrumentTypesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllInstrumentTypes.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(GetAllInstrumentTypesInit(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstrumentTypes_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllInstrumentTypesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllInstrumentTypes_02".toLowerCase()
            ) {
              dispatch(GetAllInstrumentTypesFail("No Data Available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstrumentTypes_03".toLowerCase()
                )
            ) {
              dispatch(GetAllInstrumentTypesFail("Exception"));
            }
          } else {
            dispatch(GetAllInstrumentTypesFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllInstrumentTypesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllInstrumentTypesFail("something went wrong"));
      });
  };
};
//Get All Branches
const GetAllBranchesInit = () => {
  return {
    type: actions.GET_ALL_BRANCHES_INIT,
  };
};

const GetAllBranchesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_BRANCHES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllBranchesFail = (message) => {
  return {
    type: actions.GET_ALL_BRANCHES_FAIL,
    message: message,
  };
};

const GetAllBranchesAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllBranchesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllBranches.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(GetAllBranchesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllBranches_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllBranchesSuccess(
                  response.data.responseResult,
                  "Data Available"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllBranches_02".toLowerCase()
            ) {
              dispatch(GetAllBranchesFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllBranches_03".toLowerCase()
                )
            ) {
              dispatch(GetAllBranchesFail("Exception"));
            }
          } else {
            dispatch(GetAllBranchesFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllBranchesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllBranchesFail("something went wrong"));
      });
  };
};
const logOut_init = () => {
  return {
    type: actions.USER_LOGOUT_INIT,
  };
};

const logOut_success = (response, message) => {
  return {
    type: actions.USER_LOGOUT_SUCCESS,
    response: response,
    message: message,
  };
};

const logOut_failed = (message) => {
  return {
    type: actions.USER_LOGOUT_FAIL,
    message: message,
  };
};

const logOutApi = (navigate) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(logOut_init());
    let form = new FormData();
    form.append("RequestMethod", LogoutRM.RequestMethod);
    axios({
      method: "POST",
      url: authenticationAPI,
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
          dispatch(logOutApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (
            response.data.responseResult.responseMessage ===
            "ERM_AuthService_AuthManager_LogOut_01"
          ) {
            dispatch(logOut_success(response.data.responseResult, "Logout"));
            dispatch(signOut(navigate));
          } else if (
            response.data.responseResult.responseMessage ===
            "ERM_AuthService_AuthManager_LogOut_02"
          ) {
            dispatch(logOut_failed("Data unavailable"));
          } else if (
            response.data.responseResult.responseMessage ===
            "ERM_AuthService_AuthManager_LogOut_03"
          ) {
            dispatch(logOut_failed("something went wrong"));
          } else {
            dispatch(logOut_failed("something went wrong"));
          }
        } else {
          dispatch(logOut_failed("something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(logOut_failed("something went wrong"));
      });
  };
};

const updateBranchCataegoryInit = () => {
  return {
    type: actions.UPDATE_BRANCH_CATEGORY_MAPPING_INIT,
  };
};

const updateBranchCataegorySuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_CATEGORY_MAPPING_SUCCESS,
    response: response,
    message: message,
  };
};

const updateBranchCataegoryFailed = (message) => {
  return {
    type: actions.UPDATE_BRANCH_CATEGORY_MAPPING_FAILED,
    message: message,
  };
};

const UpdateBranchCataegoryMappingAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(updateBranchCataegoryInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateBranchCategoryMappingapi.RequestMethod);
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
          dispatch(UpdateBranchCataegoryMappingAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranchCategoryMapping_01".toLowerCase()
            ) {
              dispatch(
                updateBranchCataegorySuccess(
                  response.data.responseResult,
                  "Record Updated"
                )
              );
              await dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchCategoryMapping_02".toLowerCase()
                )
            ) {
              dispatch(updateBranchCataegoryFailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchCategoryMapping_04".toLowerCase()
                )
            ) {
              dispatch(
                updateBranchCataegoryFailed("Exception Something went wrong")
              );
            }
          } else {
            dispatch(updateBranchCataegoryFailed("Something went wrong"));
          }
        } else {
          dispatch(updateBranchCataegoryFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateBranchCataegoryFailed("something went wrong"));
      });
  };
};

export {
  logOutApi,
  signOut,
  RefreshToken,
  getAllCorporatesCategory,
  UpdatecorporateMapping,
  DeleteCorporateCategoryAPI,
  loginSystemAdminAPI,
  SendEmailResetPasswordAPI,
  cleareMessage,
  GetAllCategoriesAPI,
  GetAllNatureAPI,
  RoleListAPI,
  GetBankUserRolesAPI,
  GetAllInstrumentTypesAPI,
  GetAllBranchesAPI,
  UpdateBranchCataegoryMappingAPI,
};
