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
  GetAllNatureOfTransactions,
  GetAllInstrumentsForHolidayRM,
  AddHolidaysRM,
  GetAllHolidaysRM,
  GetHolidayRM,
  UpdateHolidayRM,
  DeleteHolidayRM,
  BankResetPassword,
  ForgetPassword,
  EmailTokenVerify,
} from "../../commen/apis/Api_config";
import {
  authenticationAPI,
  systemAdminAPI,
  watchListAPI,
} from "../../commen/apis/Api_ends_points";
import { DeleteCategoryModalSystemAdmin } from "./BOPSystemAdminModalsActions";
import { encryptField } from "../../commen/functions/utils";
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
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_RefreshToken_01".toLowerCase()
            ) {
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken,
              );
              // await
              dispatch(refreshtokenSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_RefreshToken_02".toLowerCase()
            ) {
              let message2 = "Your Session has expired. Please login again";
              dispatch(signOut(navigate, message2));
              return;
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
          refreshtokenFail("Your Session has expired. Please login again."),
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
                  "Record Updated",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_02".toLowerCase(),
                )
            ) {
              dispatch(updatecorporatefailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_03".toLowerCase(),
                )
            ) {
              dispatch(updatecorporatefailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateCategoryMapping_04".toLowerCase(),
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
      url: watchListAPI,
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
                  "Category Deleted",
                ),
              );
              dispatch(DeleteCategoryModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_02".toLowerCase(),
                )
            ) {
              dispatch(DeleteCategoryModalSystemAdmin(false));
              dispatch(
                deletecorporatecategorysuccess(
                  response.data.responseResult.corporateCategory,
                  "Category Cannot be delete It is mapped with a corporate",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_03".toLowerCase(),
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Category not Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_04".toLowerCase(),
                )
            ) {
              dispatch(deletecorporatecategoryfailed("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_DeleteCategory_05".toLowerCase(),
                )
            ) {
              dispatch(
                deletecorporatecategoryfailed(
                  "Exception Something went wrong ",
                ),
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
        const {
          isExecuted,
          responseMessage,
          token,
          refreshToken,
          isPasswordReset,
          user: {
            branch,
            employeeID,
            ldapAccount,
            userID,
            firstName,
            email,
            contactNumber,
            userRoleID,
            userStatusID,
          },
        } = response.data.responseResult;
        if (response.data?.responseCode === 401) {
          navigate("/");
          localStorage.clear();
        }
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(loginSystemAdminAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          console.log("loginSystemAdmin", response);

          if (isExecuted === true) {
            if (
              responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_Login_01".toLowerCase()
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Device is Empty"));
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
              dispatch(loginSystemAdminSuccess("LDAP auth Successful"));

              if (!isPasswordReset) {
                const encryptedName = await encryptField(firstName);
                const encryptedUserID = await encryptField(String(userID));
                navigate("/ResetPassword", {
                  state: {
                    isResetPassword: false,
                    firstName: encryptedName,
                    email: email,
                    userID: encryptedUserID,
                  },
                });
                return;
              }
              localStorage.setItem("defaultOpenKey", "sub1");
              localStorage.setItem("defaultSelectedKey", "1");
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken,
              );

              localStorage.setItem(
                "userID",
                response.data.responseResult.user.userID,
              );
              localStorage.setItem(
                "userName",
                response.data.responseResult.user.firstName,
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
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes("ERM_AuthService_AuthManager_Login_14".toLowerCase())
            ) {
              console.log("loginSystemAdmin", response);
              dispatch(loginSystemAdminFailed("Invalid Role"));
            } else {
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
                  "Email for Reset Password Sent Successfully",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_02".toLowerCase(),
                )
            ) {
              dispatch(
                SendEmailResetPasswordFail("No Email sent for Reset Password"),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForResetPasword_03".toLowerCase(),
                )
            ) {
              dispatch(SendEmailResetPasswordFail("Invalid Corporate UserF"));
            }
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_04".toLowerCase(),
              )
          ) {
            dispatch(SendEmailResetPasswordFail("Please Enter A valid Email"));
          } else if (
            response.data.responseResult.responseMessage
              .toLowerCase()
              .includes(
                "ERM_AuthService_AuthManager_SendEmailForResetPasword_05".toLowerCase(),
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
                  "ERM_AuthService_CommonManager_GetAllCategories_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetAllCategoriesSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCategories_02".toLowerCase()
            ) {
              dispatch(GetAllCategoriesFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCategories_03".toLowerCase(),
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
      url: watchListAPI,
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
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_01".toLowerCase(),
                )
            ) {
              dispatch(
                getAllCorporatesSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_02".toLowerCase()
            ) {
              dispatch(getAllCorporatesFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllCategoryDetailsWithCounterParties_04".toLowerCase(),
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
    type: actions.GET_ALL_CORPORATES_DATA_INIT,
  };
};

const GetAllCorporatesDataSuccess = (response, message) => {
  console.log(response, "responseresponse");
  return {
    type: actions.GET_ALL_CORPORATES_DATA_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllCorporatesDataFail = (message) => {
  return {
    type: actions.GET_ALL_CORPORATES_DATA_FAIL,
    message: message,
  };
};

const GetAllCorporatesDataAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllCorporatesDataInit());
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
          dispatch(GetAllCorporatesDataAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            console.log(response.data.responseResult, "responseResult");
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetAllCorporatesDataSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllCorporates_02".toLowerCase()
            ) {
              dispatch(GetAllCorporatesDataFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_02".toLowerCase(),
                )
            ) {
              dispatch(GetAllCorporatesDataFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllCorporates_03".toLowerCase(),
                )
            ) {
              dispatch(GetAllCorporatesDataFail("Exception"));
            }
          } else {
            dispatch(GetAllCorporatesDataFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllCorporatesDataFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllCorporatesDataFail("something went wrong"));
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
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_01".toLowerCase(),
                )
            ) {
              dispatch(GetAllNatureSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_02".toLowerCase()
            ) {
              dispatch(GetAllNatureFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfBussiness_03".toLowerCase(),
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

//Get All Nature Of Transactions
const GetAllNatureOfTransactionsInit = () => {
  return {
    type: actions.GET_ALL_NATURE_OF_TRANSACTIONS_INIT,
  };
};

const GetAllNatureOfTransactionsSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_NATURE_OF_TRANSACTIONS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllNatureOfTransactionsFail = (message) => {
  return {
    type: actions.GET_ALL_NATURE_OF_TRANSACTIONS_FAIL,
    message: message,
  };
};

const GetAllNatureOfTransactionsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllNatureOfTransactionsInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllNatureOfTransactions.RequestMethod);
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
          dispatch(GetAllNatureOfTransactionsAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetAllNatureOfTransactionsSuccess(
                  response.data.responseResult,
                  "",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_02".toLowerCase()
            ) {
              dispatch(GetAllNatureOfTransactionsFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllNatureOfTransactions_03".toLowerCase(),
                )
            ) {
              dispatch(GetAllNatureOfTransactionsFail("Exception"));
            }
          } else {
            dispatch(GetAllNatureOfTransactionsFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllNatureOfTransactionsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllNatureOfTransactionsFail("something went wrong"));
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
                  "ERM_AuthService_CommonManager_RoleList_01".toLowerCase(),
                )
            ) {
              dispatch(RoleListSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_RoleList_02".toLowerCase()
            ) {
              dispatch(RoleListFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_RoleList_03".toLowerCase(),
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
                  "ERM_AuthService_CommonManager_GetBankUserRoles_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetBankUserRolesSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetBankUserRoles_02".toLowerCase()
            ) {
              dispatch(GetBankUserRolesFail(""));
              throw new Error("Something went wrong");
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetBankUserRoles_03".toLowerCase(),
                )
            ) {
              dispatch(GetBankUserRolesFail("Something went wrong"));
              throw new Error("Something went wrong");
            }
          } else {
            dispatch(GetBankUserRolesFail("Something went wrong"));
          }
        } else {
          dispatch(GetBankUserRolesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBankUserRolesFail("Something went wrong"));
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
                  "ERM_AuthService_CommonManager_GetAllInstrumentTypes_01".toLowerCase(),
                )
            ) {
              dispatch(
                GetAllInstrumentTypesSuccess(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllInstrumentTypes_02".toLowerCase()
            ) {
              dispatch(GetAllInstrumentTypesFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstrumentTypes_03".toLowerCase(),
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
                  "ERM_AuthService_CommonManager_GetAllBranches_01".toLowerCase(),
                )
            ) {
              dispatch(GetAllBranchesSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_CommonManager_GetAllBranches_02".toLowerCase()
            ) {
              dispatch(GetAllBranchesFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllBranches_03".toLowerCase(),
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
                  "Record Updated",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchCategoryMapping_02".toLowerCase(),
                )
            ) {
              dispatch(updateBranchCataegoryFailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranchCategoryMapping_04".toLowerCase(),
                )
            ) {
              dispatch(updateBranchCataegoryFailed("Exception."));
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
const clearResponseMessageAuth = () => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_AUTH,
  };
};

const getListAllInstrumentsAPI = () => {
  return {
    type: actions.GET_LIST_ALL_INSTRUMENTS_INIT,
  };
};

const getListAllInstrumentsAPISuccess = (response, message) => {
  return {
    type: actions.GET_LIST_ALL_INSTRUMENTS_SUCCESS,
    response: response,
    message: message,
  };
};

const getListAllInstrumentsAPIFailed = (message) => {
  return {
    type: actions.GET_LIST_ALL_INSTRUMENTS_FAIL,
    message: message,
  };
};

const getListAllInstrumentsApi = (navigate) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getListAllInstrumentsAPI());
    let form = new FormData();
    form.append("RequestMethod", GetAllInstrumentsForHolidayRM.RequestMethod);
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(getListAllInstrumentsApi(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_GetAllInstruments_01".toLowerCase()
            ) {
              dispatch(
                getListAllInstrumentsAPISuccess(
                  response.data.responseResult,
                  "",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_GetAllInstruments_02".toLowerCase(),
                )
            ) {
              dispatch(getListAllInstrumentsAPIFailed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetListAllInstruments_04".toLowerCase(),
                )
            ) {
              dispatch(getListAllInstrumentsAPIFailed("Exception."));
            }
          } else {
            dispatch(getListAllInstrumentsAPIFailed("Something went wrong"));
          }
        } else {
          dispatch(getListAllInstrumentsAPIFailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getListAllInstrumentsAPIFailed("something went wrong"));
      });
  };
};

/**
 * Initializes the add holiday action
 * @returns {Object} Action object with type ADD_HOLIDAY_INIT
 */
const AddHolidays_init = () => {
  return {
    type: actions.ADD_HOLIDAY_INIT,
  };
};

/**
 * Handles successful holiday addition
 * @param {Object} response - The response data from the API containing holiday details
 * @param {string} message - Success message to display
 * @returns {Object} Action object with type ADD_HOLIDAY_SUCCESS, response, and message
 */
const AddHolidays_success = (response, message) => {
  return {
    type: actions.ADD_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

/**
 * Handles failed holiday addition
 * @param {string} message - Error message to display
 * @returns {Object} Action object with type ADD_HOLIDAY_FAIL and message
 */
const AddHolidays_failed = (message) => {
  return {
    type: actions.ADD_HOLIDAY_FAIL,
    message: message,
  };
};

/**
 * API call to add a new holiday to the system
 * @param {Function} navigate - Navigation function for routing
 * @param {Object} data - Holiday data containing HolidayDate, Description, and CurrencyIds
 * @returns {Function} Thunk function that dispatches actions based on API response
 * @description Makes a POST request to add a holiday. Handles token refresh on 417 response.
 * Response codes:
 * - WatchList_WatchListServiceManager_AddHoliday_01: Holiday added successfully
 * - WatchList_WatchListServiceManager_AddHoliday_02: No record updated
 * - WatchList_WatchListServiceManager_AddHoliday_03: Exception occurred
 */
const AddHolidays_API = (
  navigate,
  data,
  setAddEditDeleteHolidayModal,
  setAddEditViewState,
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(AddHolidays_init());
    let form = new FormData();
    form.append("RequestMethod", AddHolidaysRM.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(
            AddHolidays_API(
              navigate,
              data,
              setAddEditDeleteHolidayModal,
              setAddEditViewState,
            ),
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_AddHoliday_01".toLowerCase()
            ) {
              dispatch(AddHolidays_success(response.data.responseResult, ""));
              setAddEditDeleteHolidayModal(false);
              setAddEditViewState(1);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_AddHoliday_02".toLowerCase(),
                )
            ) {
              dispatch(AddHolidays_failed("Date is already exist"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_AddHoliday_03".toLowerCase(),
                )
            ) {
              dispatch(AddHolidays_failed("Exception."));
            }
          } else {
            dispatch(AddHolidays_failed("Something went wrong"));
          }
        } else {
          dispatch(AddHolidays_failed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(AddHolidays_failed("something went wrong"));
      });
  };
};

/**
 * Initializes the get holiday list action
 * @returns {Object} Action object with type GET_HOLIDAY_LIST_INIT
 */
const getHolidayList_init = () => {
  return {
    type: actions.GET_HOLIDAY_LIST_INIT,
  };
};

/**
 * Handles successful retrieval of holiday list
 * @param {Object} response - The response data containing array of all holidays
 * @param {string} message - Success message to display
 * @returns {Object} Action object with type GET_HOLIDAY_LIST_SUCCESS, response, and message
 */
const getHolidayList_success = (response, message) => {
  return {
    type: actions.GET_HOLIDAY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

/**
 * Handles failed retrieval of holiday list
 * @param {string} message - Error message to display
 * @returns {Object} Action object with type GET_HOLIDAY_LIST_FAIL and message
 */
const getHolidayList_failed = (message) => {
  return {
    type: actions.GET_HOLIDAY_LIST_FAIL,
    message: message,
  };
};

/**
 * API call to retrieve all holidays from the system
 * @param {Function} navigate - Navigation function for routing
 * @returns {Function} Thunk function that dispatches actions based on API response
 * @description Makes a POST request to fetch all holidays. Handles token refresh on 417 response.
 * Response codes:
 * - WatchList_WatchListServiceManager_GetAllHolidays_01: Holidays retrieved successfully
 * - WatchList_WatchListServiceManager_GelAllHoliday_03: No records found or exception occurred
 */
const getHolidayList_API = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getHolidayList_init());
    let form = new FormData();
    form.append("RequestMethod", GetAllHolidaysRM.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(getHolidayList_API(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_GetAllHolidays_01".toLowerCase()
            ) {
              dispatch(
                getHolidayList_success(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_GelAllHoliday_03".toLowerCase(),
                )
            ) {
              dispatch(getHolidayList_failed("No Record Updated"));
            } else {
              dispatch(getHolidayList_failed("Something went wrong"));
            }
          } else {
            dispatch(getHolidayList_failed("Something went wrong"));
          }
        } else {
          dispatch(getHolidayList_failed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getHolidayList_failed("something went wrong"));
      });
  };
};

/**
 * Initializes the get holiday by ID action
 * @returns {Object} Action object with type GET_HOLIDAY_BY_HOLIDAYID_INIT
 */
const getHolidayByHolidayId_init = () => {
  return {
    type: actions.GET_HOLIDAY_BY_HOLIDAYID_INIT,
  };
};

/**
 * Handles successful retrieval of a specific holiday by ID
 * @param {Object} response - The response data containing the holiday details
 * @param {string} message - Success message to display
 * @returns {Object} Action object with type GET_HOLIDAY_BY_HOLIDAYID_SUCCESS, response, and message
 */
const getHolidayByHolidayId_success = (response, message) => {
  return {
    type: actions.GET_HOLIDAY_BY_HOLIDAYID_SUCCESS,
    response: response,
    message: message,
  };
};

/**
 * Handles failed retrieval of a specific holiday by ID
 * @param {string} message - Error message to display
 * @returns {Object} Action object with type GET_HOLIDAY_BY_HOLIDAYID_FAIL and message
 */
const getHolidayByHolidayId_failed = (message) => {
  return {
    type: actions.GET_HOLIDAY_BY_HOLIDAYID_FAIL,
    message: message,
  };
};
/**
 * API call to retrieve a specific holiday by its ID
 * @param {Function} navigate - Navigation function for routing
 * @returns {Function} Thunk function that dispatches actions based on API response
 * @description Makes a POST request to fetch a specific holiday by ID. Handles token refresh on 417 response.
 * Response codes:
 * - WatchList_WatchListServiceManager_GetHoliday_01: Holiday retrieved successfully
 * - WatchList_WatchListServiceManager_GelHoliday_03: No record found or exception occurred
 */
const getHolidayByHolidayId_API = (
  navigate,
  requestData,
  setAddEditViewState,
  viewState,
  setAddEditDeleteHolidayModal,
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(getHolidayByHolidayId_init());
    let form = new FormData();
    form.append("RequestMethod", GetHolidayRM.RequestMethod);
    form.append("RequestData", JSON.stringify(requestData));
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(
            getHolidayByHolidayId_API(
              navigate,
              requestData,
              setAddEditViewState,
              viewState,
              setAddEditDeleteHolidayModal,
            ),
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_GetHoliday_01".toLowerCase()
            ) {
              dispatch(
                getHolidayByHolidayId_success(response.data.responseResult, ""),
              );
              setAddEditViewState(viewState);
              setAddEditDeleteHolidayModal(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_GelHoliday_03".toLowerCase(),
                )
            ) {
              dispatch(getHolidayByHolidayId_failed("No Record Updated"));
            } else {
              dispatch(getHolidayByHolidayId_failed("Something went wrong"));
            }
          } else {
            dispatch(getHolidayByHolidayId_failed("Something went wrong"));
          }
        } else {
          dispatch(getHolidayByHolidayId_failed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(getHolidayByHolidayId_failed("something went wrong"));
      });
  };
};

/**
 * Initializes the update holiday action
 * @returns {Object} Action object with type UPDATE_HOLIDAY_INIT
 */
const updateHolidayByHolidayId_init = () => {
  return {
    type: actions.UPDATE_HOLIDAY_INIT,
  };
};

/**
 * Handles successful holiday update
 * @param {Object} response - The response data containing updated holiday details
 * @param {string} message - Success message to display
 * @returns {Object} Action object with type UPDATE_HOLIDAY_SUCCESS, response, and message
 */
const updateHolidayByHolidayId_success = (response, message) => {
  return {
    type: actions.UPDATE_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

/**
 * Handles failed holiday update
 * @param {string} message - Error message to display
 * @returns {Object} Action object with type UPDATE_HOLIDAY_FAIL and message
 */
const updateHolidayByHolidayId_failed = (message) => {
  return {
    type: actions.UPDATE_HOLIDAY_FAIL,
    message: message,
  };
};

/**
 * API call to update an existing holiday by its ID
 * @param {Function} navigate - Navigation function for routing
 * @returns {Function} Thunk function that dispatches actions based on API response
 * @description Makes a POST request to update a holiday. Handles token refresh on 417 response.
 * Response codes:
 * - WatchList_WatchListServiceManager_UpdateHoliday_01: Holiday updated successfully
 * - WatchList_WatchListServiceManager_UpdateHoliday_02: No record updated
 * - WatchList_WatchListServiceManager_UpdateHoliday_03: Exception occurred
 */
const updateHolidayByHolidayId_API = (
  navigate,
  Data,
  setAddEditDeleteHolidayModal,
  setAddEditViewState,
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(updateHolidayByHolidayId_init());
    let form = new FormData();
    form.append("RequestMethod", UpdateHolidayRM.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(
            updateHolidayByHolidayId_API(
              navigate,
              Data,
              setAddEditDeleteHolidayModal,
              setAddEditViewState,
            ),
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_UpdateHoliday_01".toLowerCase()
            ) {
              dispatch(
                updateHolidayByHolidayId_success(
                  response.data.responseResult,
                  "",
                ),
              );
              setAddEditDeleteHolidayModal(false);
              setAddEditViewState(1);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_UpdateHoliday_02".toLowerCase(),
                )
            ) {
              dispatch(updateHolidayByHolidayId_failed("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_UpdateHoliday_03".toLowerCase(),
                )
            ) {
              dispatch(updateHolidayByHolidayId_failed("Something went wrong"));
            } else {
              dispatch(updateHolidayByHolidayId_failed("Something went wrong"));
            }
          } else {
            dispatch(updateHolidayByHolidayId_failed("Something went wrong"));
          }
        } else {
          dispatch(updateHolidayByHolidayId_failed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(updateHolidayByHolidayId_failed("something went wrong"));
      });
  };
};

/**
 * Initializes the delete holiday action
 * @returns {Object} Action object with type DELETE_HOLIDAY_INIT
 */
const deleteHolidayByHolidayId_init = () => {
  return {
    type: actions.DELETE_HOLIDAY_INIT,
  };
};

/**
 * Handles successful holiday deletion
 * @param {Object} response - The response data from the API
 * @param {string} message - Success message to display
 * @returns {Object} Action object with type DELETE_HOLIDAY_SUCCESS, response, and message
 */
const deleteHolidayByHolidayId_success = (response, message) => {
  return {
    type: actions.DELETE_HOLIDAY_SUCCESS,
    response: response,
    message: message,
  };
};

/**
 * Handles failed holiday deletion
 * @param {string} message - Error message to display
 * @returns {Object} Action object with type DELETE_HOLIDAY_FAIL and message
 */
const deleteHolidayByHolidayId_failed = (message) => {
  return {
    type: actions.DELETE_HOLIDAY_FAIL,
    message: message,
  };
};

/**
 * API call to delete a holiday by its ID
 * @param {Function} navigate - Navigation function for routing
 * @returns {Function} Thunk function that dispatches actions based on API response
 * @description Makes a POST request to delete a holiday. Handles token refresh on 417 response.
 * Response codes:
 * - WatchList_WatchListServiceManager_DeleteHoliday_01: Holiday deleted successfully
 * - WatchList_WatchListServiceManager_DeleteHoliday_02: No record deleted
 * - WatchList_WatchListServiceManager_DeleteHoliday_03: Exception occurred
 */
const deleteHolidayByHolidayId_API = (
  navigate,
  requestData,
  setAddEditDeleteHolidayModal,
  setAddEditViewState,
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(deleteHolidayByHolidayId_init());
    let form = new FormData();
    form.append("RequestMethod", DeleteHolidayRM.RequestMethod);
    form.append("RequestData", JSON.stringify(requestData));
    axios({
      method: "POST",
      url: watchListAPI,
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
          dispatch(
            deleteHolidayByHolidayId_API(
              navigate,
              requestData,
              setAddEditDeleteHolidayModal,
              setAddEditViewState,
            ),
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "WatchList_WatchListServiceManager_DeleteHoliday_01".toLowerCase()
            ) {
              dispatch(
                deleteHolidayByHolidayId_success(
                  response.data.responseResult,
                  "",
                ),
              );
              setAddEditDeleteHolidayModal(false);
              setAddEditViewState(1);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_DeleteHoliday_02".toLowerCase(),
                )
            ) {
              dispatch(deleteHolidayByHolidayId_failed("No Record Deleted"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "WatchList_WatchListServiceManager_DeleteHoliday_03".toLowerCase(),
                )
            ) {
              dispatch(deleteHolidayByHolidayId_failed("Something went wrong"));
            } else {
              dispatch(deleteHolidayByHolidayId_failed("Something went wrong"));
            }
          } else {
            dispatch(deleteHolidayByHolidayId_failed("Something went wrong"));
          }
        } else {
          dispatch(deleteHolidayByHolidayId_failed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(deleteHolidayByHolidayId_failed("something went wrong"));
      });
  };
};

const setHolidayAdded = (payload) => {
  return {
    type: actions.HOLIDAY_ADDED,
    payload: payload,
  };
};

const setHolidayUpdated = (payload) => {
  return {
    type: actions.HOLIDAY_UPDATED,
    payload: payload,
  };
};

const setHolidayDeleted = (payload) => {
  return {
    type: actions.HOLIDAY_DELETED,
    payload: payload,
  };
};

const resetPassword_init = () => {
  return {
    type: actions.RESET_PASSWORD_INIT,
  };
};
const resetPassword_success = (response, message) => {
  return {
    type: actions.RESET_PASSWORD_SUCCESS,
    response,
    message,
  };
};
const resetPassword_fail = (message) => {
  return {
    type: actions.RESET_PASSWORD_FAIL,
  };
};

const resetPasswordApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(resetPassword_init());
    let form = new FormData();
    form.append("RequestMethod", BankResetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
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
          dispatch(resetPasswordApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_ResetPassword_01".toLowerCase()
            ) {
                localStorage.setItem("defaultOpenKey", "sub1");
              localStorage.setItem("defaultSelectedKey", "1");
              localStorage.setItem("token", response.data.responseResult.token);
              localStorage.setItem(
                "refreshToken",
                response.data.responseResult.refreshToken,
              );

              localStorage.setItem(
                "userID",
                response.data.responseResult.user.userID,
              );
              localStorage.setItem(
                "userName",
                response.data.responseResult.user.firstName,
              );
              navigate("/BOP/AddBankUser");
              dispatch(resetPassword_success(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_02".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("No Record Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_03".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_04".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_ResetPassword_05".toLowerCase(),
                )
            ) {
              dispatch(resetPassword_fail("Something went wrong"));
            } else {
              dispatch(resetPassword_fail("Something went wrong"));
            }
          } else {
            dispatch(resetPassword_fail("Something went wrong"));
          }
        } else {
          dispatch(resetPassword_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(resetPassword_fail("something went wrong"));
      });
  };
};

const forgotPassword_init = () => {
  return {
    type: actions.FORGOT_PASSWORD_INIT,
  };
};
const forgotPassword_success = (response, message) => {
  return {
    type: actions.FORGOT_PASSWORD_SUCCESS,
    response,
    message,
  };
};
const forgotPassword_fail = (message) => {
  return {
    type: actions.FORGOT_PASSWORD_FAIL,
  };
};

const forgotPasswordApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(forgotPassword_init());
    let form = new FormData();
    form.append("RequestMethod", ForgetPassword.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
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
          dispatch(forgotPasswordApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_SendEmailForForgetPasword_01".toLowerCase()
            ) {
              navigate("/emailSentTo", { replace: true });

              dispatch(
                forgotPassword_success(response.data.responseResult, ""),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_02".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("Invalid Email"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_03".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("User Inactive"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_04".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("Something went wrong"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_SendEmailForForgetPasword_05".toLowerCase(),
                )
            ) {
              dispatch(forgotPassword_fail("Something went wrong"));
            } else {
              dispatch(forgotPassword_fail("Something went wrong"));
            }
          } else {
            dispatch(forgotPassword_fail("Something went wrong"));
          }
        } else {
          dispatch(forgotPassword_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(forgotPassword_fail("something went wrong"));
      });
  };
};

const resetPasswordEmailVerification_init = () => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_INIT,
  };
};
const resetPasswordEmailVerification_success = (response, message) => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_SUCCESS,
    response,
    message,
  };
};
const resetPasswordEmailVerification_fail = (message) => {
  return {
    type: actions.RESETPASSWORDEMAILVERIFICATION_FAIL,
    message,
  };
};

const resetPasswordEmailVerificationApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(resetPasswordEmailVerification_init());
    let form = new FormData();
    form.append("RequestMethod", EmailTokenVerify.RequestMethod);
    form.append("RequestData", JSON.stringify(Data));
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
          dispatch(resetPasswordEmailVerificationApi(navigate, Data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "ERM_AuthService_AuthManager_EmailToken_01".toLowerCase()
            ) {
              navigate("/resetPassword", {
                replace: true,
                state: {
                  email: response.data.responseResult.email,
                  requestToken: Data.EncryptedString,
                },
              });

              dispatch(
                resetPasswordEmailVerification_success(
                  response.data.responseResult,
                  "",
                ),
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_AuthManager_EmailToken_02".toLowerCase(),
                )
            ) {
              navigate("/resetPasswordLinkExpired", {
                replace: true,
                state: { email: response.data.responseResult?.email },
              });
              dispatch(resetPasswordEmailVerification_fail("Invalid Email"));
            } else {
              dispatch(
                resetPasswordEmailVerification_fail("Something went wrong"),
              );
            }
          } else {
            dispatch(
              resetPasswordEmailVerification_fail("Something went wrong"),
            );
          }
        } else {
          dispatch(resetPasswordEmailVerification_fail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(resetPasswordEmailVerification_fail("something went wrong"));
      });
  };
};

export {
  resetPasswordApi,
  resetPasswordEmailVerificationApi,
  forgotPasswordApi,
  setHolidayAdded,
  setHolidayUpdated,
  setHolidayDeleted,
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
  GetAllCorporatesDataAPI,
  clearResponseMessageAuth,
  GetAllNatureOfTransactionsAPI,
  getListAllInstrumentsApi,
  AddHolidays_API,
  getHolidayList_API,
  getHolidayByHolidayId_API,
  updateHolidayByHolidayId_API,
  deleteHolidayByHolidayId_API,
  getHolidayByHolidayId_failed,
};
