import axios from "axios";
import {
  AddBranch,
  CorporateUsersBulkList,
  CreateBankUserRequest,
  CreateBulkBankUserRequest,
  CreateBulkCorporateUserRequest,
  CreateCorporateUserRequest,
  CreateNewCorporate,
  UpdateBranch,
  UpdateCorporateByCorporateID,
  SearchBankUsers,
  GetBankUserByUserID,
  UpdateBankUserByUserID,
  GetVolmeterByBankID,
  AddUpdateVolmeter,
  UpdateVolmeterByDealer,
  UpdateVolMeterSettingByBankId,
  GetVolMeterSettingByBankId,
  UpdateCategory,
  GetCounterPartyNames,
  GetAllInstruments,
  BankUsersBulkList,
  SearchAllUserLoginHistory,
  GetCounterPartyList,
  GetAllTrades,
} from "../../commen/apis/Api_config";
import {
  authenticationAPI,
  systemAdminAPI,
} from "../../commen/apis/Api_ends_points";
import * as actions from "../action_types";
import { RefreshToken } from "./Auth-Actions";
import {
  AdduserModalSystemAdmin,
  ConfirmationModalSystemAdmin,
  corporatePlusIconModalSystemAdmin,
  editBankUserModalSystemAdmin,
  editCompanyModalSystemAdmin,
} from "./BOPSystemAdminModalsActions";

//Create New Corporate API
const CreateNewCorporateInit = () => {
  return {
    type: actions.CREATE_NEW_CORPORATE_INIT,
  };
};

const CreateNewCorporateSuccess = (response, message) => {
  return {
    type: actions.CREATE_NEW_CORPORATE_SUCCESS,
    response: response,
    message: message,
  };
};

const CreateNewCorporateFail = (message) => {
  return {
    type: actions.CREATE_NEW_CORPORATE_FAIL,
    message: message,
  };
};

const CreateNewCorporateAPI = (navigate, data, setAddCompnany) => {
  let token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(CreateNewCorporateInit());
    let form = new FormData();
    form.append("RequestMethod", CreateNewCorporate.RequestMethod);
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
          dispatch(CreateNewCorporateAPI(navigate, data, setAddCompnany));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateNewCorporate_01".toLowerCase()
            ) {
              dispatch(
                CreateNewCorporateSuccess(
                  response.data.responseResult,
                  "Company successfully created"
                )
              );
              // dispatch(getAllCorporatesCategory(navigate));
              dispatch(corporatePlusIconModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_02".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Corporate Category Not Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_03".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Corporate Asset Not Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_04".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Corporate Not Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_05".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Corporate Already Exists"));

              setAddCompnany((prevState) => {
                return {
                  ...prevState,
                  companyName: {
                    ...prevState.companyName,
                    errorMessage: "Corporate Already Exists",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_06".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Exception"));
            }
          } else {
            dispatch(CreateNewCorporateFail("Something went wrong"));
          }
        } else {
          dispatch(CreateNewCorporateFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CreateNewCorporateFail("something went wrong"));
      });
  };
};

//Update Corporate By Corporate ID
const UpdateCorporateByCorporateIDInit = () => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATEID_INIT,
  };
};

const UpdateCorporateByCorporateIDSuccess = (response, message) => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATEID_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCorporateByCorporateIDFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATEID_FAIL,
    message: message,
  };
};

const UpdateCorporateByCorporateIDAPI = (
  navigate,
  data,
  setCompanyEditError
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateCorporateByCorporateIDInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCorporateByCorporateID.RequestMethod);
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
          dispatch(
            UpdateCorporateByCorporateIDAPI(navigate, data, setCompanyEditError)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_01".toLowerCase()
            ) {
              dispatch(
                UpdateCorporateByCorporateIDSuccess(
                  response.data.responseResult,
                  "Record Updated"
                )
              );

              dispatch(editCompanyModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_02".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateByCorporateIDFail("No Record Updated "));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_03".toLowerCase()
                )
            ) {
              dispatch(
                UpdateCorporateByCorporateIDFail("Corporate Already Exists")
              );
              setCompanyEditError((prevState) => {
                return {
                  ...prevState,
                  corporateName: {
                    errorMessage: "Corporate Already Exists",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_04".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateByCorporateIDFail("Exception"));
            }
          } else {
            dispatch(UpdateCorporateByCorporateIDFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCorporateByCorporateIDFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCorporateByCorporateIDFail("something went wrong"));
      });
  };
};

//Add Branch
const AddBranchInit = () => {
  return {
    type: actions.ADD_BRANCH_INIT,
  };
};

const AddBranchSuccess = (response, message) => {
  return {
    type: actions.ADD_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const AddBranchFail = (message) => {
  return {
    type: actions.ADD_BRANCH_FAIL,
    message: message,
  };
};

const AddBranchAPI = (navigate, data, setAddBranch) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(AddBranchInit());
    let form = new FormData();
    form.append("RequestMethod", AddBranch.RequestMethod);
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
          dispatch(AddBranchAPI(navigate, data, setAddBranch));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_AddBranch_01".toLowerCase()
            ) {
              dispatch(
                AddBranchSuccess(
                  response.data.responseResult,
                  "branch created successfully"
                )
              );
              dispatch(AdduserModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_02".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("save unsuccessful"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_03".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("Exception"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_04".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("Branch Name Already Exists"));
              setAddBranch((prevState) => {
                return {
                  ...prevState,
                  branchName: {
                    ...prevState.branchName,
                    errorMessage: "Branch Name Already Exists",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_05".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("Branch Code Already Exists"));
              setAddBranch((prevState) => {
                return {
                  ...prevState,
                  branchCode: {
                    ...prevState.branchCode,
                    errorMessage: "Branch Code Already Exists",
                    errorStatus: true,
                  },
                };
              });
            }
          } else {
            dispatch(AddBranchFail("Something went wrong"));
          }
        } else {
          dispatch(AddBranchFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(AddBranchFail("something went wrong"));
      });
  };
};

//Update Branch
const UpdateBranchInit = () => {
  return {
    type: actions.UPDATE_BRANCH_INIT,
  };
};

const UpdateBranchSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BRANCH_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateBranchFail = (message) => {
  return {
    type: actions.UPDATE_BRANCH_FAIL,
    message: message,
  };
};

const UpdateBranchAPI = (navigate, data, setBranchEditError) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateBranchInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateBranch.RequestMethod);
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
          dispatch(UpdateBranchAPI(navigate, data, setBranchEditError));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranch_01".toLowerCase()
            ) {
              dispatch(
                UpdateBranchSuccess(
                  response.data.responseResult,
                  "branch updated successfully"
                )
              );

              dispatch(editBankUserModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_02".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("save unsuccessful"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_03".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("Exception"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_04".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("Branch Name Already Exists"));

              setBranchEditError((prevState) => {
                return {
                  ...prevState,
                  branchName: {
                    errorMessage: "Branch Name Already Exists",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_05".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("Branch Code Already Exists"));
              setBranchEditError((prevState) => {
                return {
                  ...prevState,
                  branchCode: {
                    errorMessage: "Branch Code Already Exists",
                    errorStatus: true,
                  },
                };
              });
            }
          } else {
            dispatch(UpdateBranchFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateBranchFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateBranchFail("something went wrong"));
      });
  };
};

//Create Bank User Request
const CreateBankUserRequestInit = () => {
  return {
    type: actions.CREATE_BANK_USER_REQUEST_INIT,
  };
};

const CreateBankUserRequestSuccess = (response, message) => {
  return {
    type: actions.CREATE_BANK_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};

const CreateBankUserRequestFail = (message) => {
  return {
    type: actions.CREATE_BANK_USER_REQUEST_FAIL,
    message: message,
  };
};

const CreateBankUserRequestAPI = (
  navigate,
  data,
  handleCancelYes,
  setAddBankUser
) => {
  let token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(CreateBankUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", CreateBankUserRequest.RequestMethod);
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
          dispatch(
            CreateBankUserRequestAPI(
              navigate,
              data,
              handleCancelYes,
              setAddBankUser
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBankUserRequest_01".toLowerCase()
            ) {
              await dispatch(
                CreateBankUserRequestSuccess(
                  response.data.responseResult,
                  "bank user request created"
                )
              );
              await dispatch(ConfirmationModalSystemAdmin(false));
              handleCancelYes();
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(
                CreateBankUserRequestFail("bank user request not created")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(CreateBankUserRequestFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_05".toLowerCase()
                )
            ) {
              dispatch(
                CreateBankUserRequestFail("bank user request not created")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_06".toLowerCase()
                )
            ) {
              await dispatch(
                CreateBankUserRequestFail("user's email already exists")
              );
              await dispatch(ConfirmationModalSystemAdmin(false));

              setAddBankUser((prevState) => {
                return {
                  ...prevState,
                  email: {
                    ...prevState.email,
                    errorMessage: "Email Already Exist",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_07".toLowerCase()
                )
            ) {
              dispatch(CreateBankUserRequestFail("Employee ID Already Exists"));
              dispatch(ConfirmationModalSystemAdmin(false));

              setAddBankUser((prevState) => {
                return {
                  ...prevState,
                  EmployeeID: {
                    ...prevState.EmployeeID,
                    errorMessage: "Employee ID Already Exist",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_08".toLowerCase()
                )
            ) {
              dispatch(CreateBankUserRequestFail("exception"));
            }
          } else {
            dispatch(CreateBankUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(CreateBankUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CreateBankUserRequestFail("something went wrong"));
      });
  };
};

//Create Bulk Bank Use Request

const CreateBulkBankUserRequestInit = () => {
  return {
    type: actions.CREATE_BULK_BANK_USER_REQUEST_INIT,
  };
};

const CreateBulkBankUserRequestSuccess = (response, message) => {
  return {
    type: actions.CREATE_BULK_BANK_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};

const CreateBulkBankUserRequestFail = (message) => {
  return {
    type: actions.CREATE_BULK_BANK_USER_REQUEST_FAIL,
    message: message,
  };
};

const CreateBulkBankUserRequestAPI = (navigate, data, setBulkUploadClicked) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(CreateBulkBankUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", CreateBulkBankUserRequest.RequestMethod);
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
          dispatch(
            CreateBulkBankUserRequestAPI(navigate, data, setBulkUploadClicked)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_01".toLowerCase()
            ) {
              dispatch(
                CreateBulkBankUserRequestSuccess(
                  response.data.responseResult,
                  "bank user request/s created"
                )
              );
              setBulkUploadClicked(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(CreateBulkBankUserRequestFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_04".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkBankUserRequestFail("no users to be added or updated")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_05".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkBankUserRequestFail("bank user request not created")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_07".toLowerCase()
                )
            ) {
              dispatch(CreateBulkBankUserRequestFail("exception"));
            }
          } else {
            dispatch(CreateBulkBankUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(CreateBulkBankUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CreateBulkBankUserRequestFail("something went wrong"));
      });
  };
};

//Create Corporate User Request
const CreateCorporateUserRequestInit = () => {
  return {
    type: actions.CREATE_CORPORATE_USER_REQUEST_INIT,
  };
};

const CreateCorporateUserRequestSuccess = (response, message) => {
  return {
    type: actions.CREATE_CORPORATE_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};

const CreateCorporateUserRequestFail = (message) => {
  return {
    type: actions.CREATE_CORPORATE_USER_REQUEST_FAIL,
    message: message,
  };
};

const CreateCorporateUserRequestAPI = (
  navigate,
  data,
  handleCancelButtonYes,
  setCorporateUser
) => {
  let token = localStorage.getItem("token");

  return (dispatch) => {
    dispatch(CreateCorporateUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", CreateCorporateUserRequest.RequestMethod);
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
          dispatch(
            CreateCorporateUserRequestAPI(
              navigate,
              data,
              handleCancelButtonYes,
              setCorporateUser
            )
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_01".toLowerCase()
            ) {
              await dispatch(
                CreateCorporateUserRequestSuccess(
                  response.data.responseResult,
                  "Corporate user request created"
                )
              );
              await dispatch(ConfirmationModalSystemAdmin(false));
              handleCancelButtonYes();
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(
                CreateCorporateUserRequestFail(
                  "corporate user request not created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(
                CreateCorporateUserRequestFail("User's email already exists")
              );
              setCorporateUser((prevState) => {
                return {
                  ...prevState,
                  email: {
                    ...prevState.email,
                    errorMessage: "User's email already exists",
                    errorStatus: true,
                  },
                };
              });
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_04".toLowerCase()
                )
            ) {
              dispatch(
                CreateCorporateUserRequestFail(
                  "no users to be added or updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_05".toLowerCase()
                )
            ) {
              dispatch(
                CreateCorporateUserRequestFail(
                  "corporate user request not created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_08".toLowerCase()
                )
            ) {
              dispatch(CreateCorporateUserRequestFail("Exception"));
            }
          } else {
            dispatch(CreateCorporateUserRequestFail("Something went wrong"));
          }
        } else {
          dispatch(CreateCorporateUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CreateCorporateUserRequestFail("something went wrong"));
      });
  };
};

//Create Bulk Corporate User Request
const CreateBulkCorporateUserRequestInit = () => {
  return {
    type: actions.CREATE_BULK_CORPORATE_USER_REQUEST_INIT,
  };
};

const CreateBulkCorporateUserRequestSuccess = (response, message) => {
  return {
    type: actions.CREATE_BULK_CORPORATE_USER_REQUEST_SUCCESS,
    response: response,
    message: message,
  };
};

const CreateBulkCorporateUserRequestFail = (message) => {
  return {
    type: actions.CREATE_BULK_CORPORATE_USER_REQUEST_FAIL,
    message: message,
  };
};

const CreateBulkCorporateUserRequestAPI = (
  navigate,
  data,
  setBulkUploadClicked
) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(CreateBulkCorporateUserRequestInit());
    let form = new FormData();
    form.append("RequestMethod", CreateBulkCorporateUserRequest.RequestMethod);
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
          dispatch(CreateBulkCorporateUserRequestAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_01".toLowerCase()
            ) {
              dispatch(
                CreateBulkCorporateUserRequestSuccess(
                  response.data.responseResult,
                  "Corporate User Request Created"
                )
              );
              setBulkUploadClicked(false);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkCorporateUserRequestFail(
                  "Corporate User Request Not Created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(CreateBulkCorporateUserRequestFail("Not A Valid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_04".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkCorporateUserRequestFail(
                  "corporate user request not created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_05".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkCorporateUserRequestFail(
                  "corporate user request not created"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_06".toLowerCase()
                )
            ) {
              dispatch(CreateBulkCorporateUserRequestFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkCorporateUserRequests_07".toLowerCase()
                )
            ) {
              dispatch(CreateBulkCorporateUserRequestFail("exception"));
            }
          } else {
            dispatch(
              CreateBulkCorporateUserRequestFail("Something went wrong")
            );
          }
        } else {
          dispatch(CreateBulkCorporateUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CreateBulkCorporateUserRequestFail("something went wrong"));
      });
  };
};

//Bank Users BankUserList
const BankUsersBulkListInit = () => {
  return {
    type: actions.BANK_USERS_BANK_LIST_INIT,
  };
};

const BankUsersBulkListSuccess = (response, message) => {
  return {
    type: actions.BANK_USERS_BANK_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const BankUsersBulkListFail = (message) => {
  return {
    type: actions.BANK_USERS_BANK_LIST_FAIL,
    message: message,
  };
};

const BankUsersBulkListAPI = (navigate, data, setBulkUploadClicked) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(BankUsersBulkListInit());
    let form = new FormData();
    form.append("RequestMethod", BankUsersBulkList.RequestMethod);
    form.append("Files", data);
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
          dispatch(BankUsersBulkListAPI(navigate, data, setBulkUploadClicked));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_BankUsersBulkList_01".toLowerCase()
            ) {
              dispatch(
                BankUsersBulkListSuccess(
                  response.data.responseResult,
                  "file Uploaded SuccessFully"
                )
              );
              setBulkUploadClicked(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_BankUsersBulkList_02".toLowerCase()
                )
            ) {
              dispatch(BankUsersBulkListFail("Invalid File"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_BankUsersBulkList_03".toLowerCase()
                )
            ) {
              dispatch(BankUsersBulkListFail("Invalid Request Data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_BankUsersBulkList_05".toLowerCase()
                )
            ) {
              dispatch(BankUsersBulkListFail("Exception"));
            }
          } else {
            dispatch(BankUsersBulkListFail("Something went wrong"));
          }
        } else {
          dispatch(BankUsersBulkListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(BankUsersBulkListFail("something went wrong"));
      });
  };
};

//Corporate Users Bulk List
const CorporateUsersBulkListInit = () => {
  return {
    type: actions.CORPORATE_USERS_BULK_LIST_INIT,
  };
};

const CorporateUsersBulkListSuccess = (response, message) => {
  return {
    type: actions.CORPORATE_USERS_BULK_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const CorporateUsersBulkListFail = (message) => {
  return {
    type: actions.CORPORATE_USERS_BULK_LIST_SUCCESS,
    message: message,
  };
};

const CorporateUsersBulkListAPI = (navigate, data, setBulkUploadClicked) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(CorporateUsersBulkListInit());
    let form = new FormData();
    form.append("RequestMethod", CorporateUsersBulkList.RequestMethod);
    form.append("Files", data);

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
          dispatch(
            CorporateUsersBulkListAPI(navigate, data, setBulkUploadClicked)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_01".toLowerCase()
            ) {
              dispatch(
                CorporateUsersBulkListSuccess(
                  response.data.responseResult,
                  "file Uploaded SuccessFully"
                )
              );
              setBulkUploadClicked(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_02".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Invalid File"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_03".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Invalid Request Data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_04".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_05".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Exception"));
            }
          } else {
            dispatch(CorporateUsersBulkListFail("Something went wrong"));
          }
        } else {
          dispatch(CorporateUsersBulkListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(CorporateUsersBulkListFail("something went wrong"));
      });
  };
};

//Search Bank Users
const SearchBankUsersInit = () => {
  return {
    type: actions.SEARCH_BANK_USERS_INIT,
  };
};

const SearchBankUsersSuccess = (response, message) => {
  return {
    type: actions.SEARCH_BANK_USERS_SUCCESS,
    response: response,
    message: message,
  };
};

const SearchBankUsersFail = (message) => {
  return {
    type: actions.SEARCH_BANK_USERS_FAIL,
    message: message,
  };
};

const SearchBankUsersAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SearchBankUsersInit());
    let form = new FormData();
    form.append("RequestMethod", SearchBankUsers.RequestMethod);
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
          dispatch(SearchBankUsersAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_SearchBankUsers_01".toLowerCase()
            ) {
              dispatch(
                SearchBankUsersSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchBankUsers_02".toLowerCase()
                )
            ) {
              dispatch(SearchBankUsersFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchBankUsers_03".toLowerCase()
                )
            ) {
              dispatch(SearchBankUsersFail("Exception"));
            }
          } else {
            dispatch(SearchBankUsersFail("Something went wrong"));
          }
        } else {
          dispatch(SearchBankUsersFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SearchBankUsersFail("something went wrong"));
      });
  };
};

//Get Bank User by UserID
const GetBankUserByUserIDInit = () => {
  return {
    type: actions.GET_BANK_USER_BY_USERID_INIT,
  };
};

const GetBankUserByUserIDSuccess = (response, message) => {
  return {
    type: actions.GET_BANK_USER_BY_USERID_SUCCESS,
    response: response,
    message: message,
  };
};

const GetBankUserByUserIDFail = (message) => {
  return {
    type: actions.GET_BANK_USER_BY_USERID_FAIL,
    message: message,
  };
};

const GetBankUserByUserIDAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(GetBankUserByUserIDInit());
    let form = new FormData();
    form.append("RequestMethod", GetBankUserByUserID.RequestMethod);
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
          dispatch(GetBankUserByUserIDAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetBankUserbyUserID_01".toLowerCase()
            ) {
              dispatch(
                GetBankUserByUserIDSuccess(
                  response.data.responseResult,
                  "User Status Updated"
                )
              );
              dispatch(editBankUserModalSystemAdmin(true));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetBankUserbyUserID_02".toLowerCase()
                )
            ) {
              dispatch(GetBankUserByUserIDFail("User Status Not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetBankUserbyUserID_03".toLowerCase()
                )
            ) {
              dispatch(GetBankUserByUserIDFail("Exception"));
            }
          } else {
            dispatch(GetBankUserByUserIDFail("Something went wrong"));
          }
        } else {
          dispatch(GetBankUserByUserIDFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetBankUserByUserIDFail("something went wrong"));
      });
  };
};

//Update Bank User By Bank ID

const UpdateBankUserByUserIdInit = () => {
  return {
    type: actions.UPDATE_BANK_USER_BY_USERID_INIT,
  };
};

const UpdateBankUserByUserIdSuccess = (response, message) => {
  return {
    type: actions.UPDATE_BANK_USER_BY_USERID_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateBankUserByUserIdFail = (message) => {
  return {
    type: actions.UPDATE_BANK_USER_BY_USERID_FAIL,
    message: message,
  };
};

const UpdateBankUserByUserIdAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateBankUserByUserIdInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateBankUserByUserID.RequestMethod);
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
          dispatch(UpdateBankUserByUserIdAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBankUserbyUserID_01".toLowerCase()
            ) {
              dispatch(
                UpdateBankUserByUserIdSuccess(
                  response.data.responseResult,
                  "User Status Updated"
                )
              );
              dispatch(editBankUserModalSystemAdmin(false));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBankUserbyUserID_02".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserByUserIdFail("User Status Not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBankUserbyUserID_03".toLowerCase()
                )
            ) {
              dispatch(UpdateBankUserByUserIdFail("Exception"));
            }
          } else {
            dispatch(UpdateBankUserByUserIdFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateBankUserByUserIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateBankUserByUserIdFail("something went wrong"));
      });
  };
};

//Get VolMeters By Bannking ID

const GetVolmeterByBankIDInit = () => {
  return {
    type: actions.GET_VOLMETER_BY_BANKID_INIT,
  };
};

const GetVolmeterByBankIDsuccess = (response, message) => {
  return {
    type: actions.GET_VOLMETER_BY_BANKID_SUCCESS,
    response: response,
    message: message,
  };
};

const GetVolmeterByBankIDfail = (message) => {
  return {
    type: actions.GET_VOLMETER_BY_BANKID_FAIL,
    message: message,
  };
};

const GetVolmeterByBankIDAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(GetVolmeterByBankIDInit());
    let form = new FormData();
    form.append("RequestMethod", GetVolmeterByBankID.RequestMethod);
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
          dispatch(GetVolmeterByBankIDAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_01".toLowerCase()
            ) {
              dispatch(
                GetVolmeterByBankIDsuccess(
                  response.data.responseResult,
                  "Volmeter values by bank"
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_02".toLowerCase()
            ) {
              dispatch(
                GetVolmeterByBankIDsuccess(
                  response.data.responseResult,
                  "All Volmeter values"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_03".toLowerCase()
                )
            ) {
              dispatch(GetVolmeterByBankIDfail("No values available"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_04".toLowerCase()
                )
            ) {
              dispatch(GetVolmeterByBankIDfail("Not valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMetersByBankID_05".toLowerCase()
                )
            ) {
              dispatch(GetVolmeterByBankIDfail("Exception"));
            }
          } else {
            dispatch(GetVolmeterByBankIDfail("Something went wrong"));
          }
        } else {
          dispatch(GetVolmeterByBankIDfail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetVolmeterByBankIDfail("something went wrong"));
      });
  };
};

//Add Update Volmeter

const AddUpdateVolmterInit = () => {
  return {
    type: actions.ADD_UPDATE_VOLMTER_INIT,
  };
};

const AddUpdateVolmterSuccess = (response, message) => {
  return {
    type: actions.ADD_UPDATE_VOLMTER_SUCCESS,
    response: response,
    message: message,
  };
};

const AddUpdateVolmterFail = (message) => {
  return {
    type: actions.ADD_UPDATE_VOLMTER_FAIL,
    message: message,
  };
};

const AddUpdateVolmterAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(AddUpdateVolmterInit());
    let form = new FormData();
    form.append("RequestMethod", AddUpdateVolmeter.RequestMethod);
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
          dispatch(AddUpdateVolmterAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_01".toLowerCase()
            ) {
              dispatch(
                AddUpdateVolmterSuccess(
                  response.data.responseResult,
                  "Record Saved"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_02".toLowerCase()
                )
            ) {
              dispatch(AddUpdateVolmterFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_03".toLowerCase()
            ) {
              dispatch(
                AddUpdateVolmterSuccess(
                  response.data.responseResult,
                  "Record Saved"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_04".toLowerCase()
                )
            ) {
              dispatch(AddUpdateVolmterFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_05".toLowerCase()
                )
            ) {
              dispatch(AddUpdateVolmterFail("No Record Saved"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_06".toLowerCase()
                )
            ) {
              dispatch(AddUpdateVolmterFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddUpdateVolmeter_07".toLowerCase()
                )
            ) {
              dispatch(AddUpdateVolmterFail("exception"));
            }
          } else {
            dispatch(AddUpdateVolmterFail("Something went wrong"));
          }
        } else {
          dispatch(AddUpdateVolmterFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(AddUpdateVolmterFail("something went wrong"));
      });
  };
};

//UpdateVolmeneterByDealer
const UpdateVolmeterByDealerInit = () => {
  return {
    type: actions.UPDATE_VOLMETER_BY_DEALER_INIT,
  };
};

const UpdateVolmeterByDealerSuccess = (response, message) => {
  return {
    type: actions.UPDATE_VOLMETER_BY_DEALER_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateVolmeterByDealerFail = (message) => {
  return {
    type: actions.UPDATE_VOLMETER_BY_DEALER_FAIL,
    message: message,
  };
};

const UpdateVolmeterByDealerAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(UpdateVolmeterByDealerInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateVolmeterByDealer.RequestMethod);
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
          dispatch(UpdateVolmeterByDealerAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateVolmeterByDealer_01".toLowerCase()
            ) {
              dispatch(
                UpdateVolmeterByDealerSuccess(
                  response.data.responseResult,
                  "Vol Meter Status Updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateVolmeterByDealer_02".toLowerCase()
                )
            ) {
              dispatch(UpdateVolmeterByDealerFail("Invalid Action Id"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateVolmeterByDealer_03".toLowerCase()
                )
            ) {
              dispatch(UpdateVolmeterByDealerFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateVolmeterByDealer_04".toLowerCase()
                )
            ) {
              dispatch(UpdateVolmeterByDealerFail("Exception"));
            }
          } else {
            dispatch(UpdateVolmeterByDealerFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateVolmeterByDealerFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateVolmeterByDealerFail("something went wrong"));
      });
  };
};

//Update Volmeter Setting By Bank Id
const UpdateVolmeterSettingByBankIdInit = () => {
  return {
    type: actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_INIT,
  };
};

const UpdateVolmeterSettingByBankIdSuccess = (response, message) => {
  return {
    type: actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateVolmeterSettingByBankIdFail = (message) => {
  return {
    type: actions.UPDATE_VOLMETER_SETTING_BY_BANK_ID_FAIL,
    message: message,
  };
};

const UpdateVolmeterSettingByBankIdAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(UpdateVolmeterSettingByBankIdInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateVolMeterSettingByBankId.RequestMethod);
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
          dispatch(UpdateVolmeterSettingByBankIdAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateVolMeterSettingByBankId_01".toLowerCase()
            ) {
              dispatch(
                UpdateVolmeterSettingByBankIdSuccess(
                  response.data.responseResult,
                  "Update Successfully"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateVolMeterSettingByBankId_02".toLowerCase()
                )
            ) {
              dispatch(UpdateVolmeterSettingByBankIdFail("UnSuccessful"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateVolMeterSettingByBankId_03".toLowerCase()
                )
            ) {
              dispatch(UpdateVolmeterSettingByBankIdFail("Exception"));
            }
          } else {
            dispatch(UpdateVolmeterSettingByBankIdFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateVolmeterSettingByBankIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateVolmeterSettingByBankIdFail("something went wrong"));
      });
  };
};

//Get Volmeter Setting By Bank Id
const GetVolMeterSettingByBankIdInit = () => {
  return {
    type: actions.GET_VOLMETER_SETTING_BY_BANK_ID_INIT,
  };
};

const GetVolMeterSettingByBankIdSuccess = (response, message) => {
  return {
    type: actions.GET_VOLMETER_SETTING_BY_BANK_ID_SUCCESS,
    response: response,
    message: message,
  };
};

const GetVolMeterSettingByBankIdFail = (message) => {
  return {
    type: actions.GET_VOLMETER_SETTING_BY_BANK_ID_FAIL,
    message: message,
  };
};

const GetVolMeterSettingByBankIdAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(GetVolMeterSettingByBankIdInit());
    let form = new FormData();
    form.append("RequestMethod", GetVolMeterSettingByBankId.RequestMethod);
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
          dispatch(GetVolMeterSettingByBankIdAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetVolMeterSettingByBankId_01".toLowerCase()
            ) {
              dispatch(
                GetVolMeterSettingByBankIdSuccess(
                  response.data.responseResult,
                  "Record found"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMeterSettingByBankId_02".toLowerCase()
                )
            ) {
              dispatch(GetVolMeterSettingByBankIdFail("No Record found"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetVolMeterSettingByBankId_03".toLowerCase()
                )
            ) {
              dispatch(GetVolMeterSettingByBankIdFail("Exception"));
            }
          } else {
            dispatch(GetVolMeterSettingByBankIdFail("Something went wrong"));
          }
        } else {
          dispatch(GetVolMeterSettingByBankIdFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetVolMeterSettingByBankIdFail("something went wrong"));
      });
  };
};

//Update Category
const UpdateCategoryInit = () => {
  return {
    type: actions.UPDATE_CATEGORY_INIT,
  };
};

const UpdateCategorySuccess = (response, message) => {
  return {
    type: actions.UPDATE_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const UpdateCategoryFail = (message) => {
  return {
    type: actions.UPDATE_CATEGORY_FAIL,
    message: message,
  };
};

const UpdateCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(UpdateCategoryInit());
    let form = new FormData();
    form.append("RequestMethod", UpdateCategory.RequestMethod);
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
          dispatch(UpdateCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCategory_02".toLowerCase()
            ) {
              dispatch(
                UpdateCategorySuccess(
                  response.data.responseResult,
                  "category Updated"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCategory_01".toLowerCase()
                )
            ) {
              dispatch(UpdateCategoryFail("Category Already Exists"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCategory_03".toLowerCase()
                )
            ) {
              dispatch(UpdateCategoryFail("category not Updated"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCategory_04".toLowerCase()
                )
            ) {
              dispatch(UpdateCategoryFail("Invalid Role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCategory_05".toLowerCase()
                )
            ) {
              dispatch(UpdateCategoryFail("Exception"));
            }
          } else {
            dispatch(UpdateCategoryFail("Something went wrong"));
          }
        } else {
          dispatch(UpdateCategoryFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(UpdateCategoryFail("something went wrong"));
      });
  };
};

//Get All Branches
const GetCounterPartyNamesInit = () => {
  return {
    type: actions.GET_COUNTER_PARTY_NAMES_INIT,
  };
};

const GetCounterPartyNamesSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTER_PARTY_NAMES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCounterPartyNamesFail = (message) => {
  return {
    type: actions.GET_COUNTER_PARTY_NAMES_FAIL,
    message: message,
  };
};

const GetCounterPartyNamesAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCounterPartyNamesInit());
    let form = new FormData();
    form.append("RequestMethod", GetCounterPartyNames.RequestMethod);
    // form.append("RequestData", JSON.stringify(data));
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
          dispatch(GetCounterPartyNamesAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyNames_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCounterPartyNamesSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetCounterPartyNames_04".toLowerCase()
            ) {
              dispatch(GetCounterPartyNamesFail("Exception"));
            }
          } else {
            dispatch(GetCounterPartyNamesFail("Something went wrong"));
          }
        } else {
          dispatch(GetCounterPartyNamesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCounterPartyNamesFail("something went wrong"));
      });
  };
};
const GetAllInstrumentsInit = () => {
  return {
    type: actions.GET_ALL_INSTRUMENTS_INIT,
  };
};
const GetAllInstrumentsSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_INSTRUMENTS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllInstrumentsFail = (message) => {
  return {
    type: actions.GET_ALL_INSTRUMENTS_FAIL,
    message: message,
  };
};

const GetAllInstrumentsAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllInstrumentsInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllInstruments.RequestMethod);
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
          dispatch(GetAllInstrumentsAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstruments_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllInstrumentsSuccess(response.data.responseResult, "")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstruments_02".toLowerCase()
                )
            ) {
              dispatch(GetAllInstrumentsFail("Data UnAvailable"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "ERM_AuthService_CommonManager_GetAllInstruments_03".toLowerCase()
                )
            ) {
              dispatch(GetAllInstrumentsFail("Exception"));
            } else {
              dispatch(GetAllInstrumentsFail("Something went wrong"));
            }
          } else {
            dispatch(GetAllInstrumentsFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllInstrumentsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllInstrumentsFail("something went wrong"));
      });
  };
};

//SearchAllUserLoginHistoryAPI Actions
const SearchAllUserLoginHistoryInit = () => {
  return {
    type: actions.SEARCH_ALL_USER_LOGIN_HISTORY_INIT,
  };
};

const SearchAllUserLoginHistorySuccess = (response, message) => {
  return {
    type: actions.SEARCH_ALL_USER_LOGIN_HISTORY_SUCCESS,
    response: response,
    message: message,
  };
};

const SearchAllUserLoginHistoryFail = (message) => {
  return {
    type: actions.SEARCH_ALL_USER_LOGIN_HISTORY_FAIL,
    message: message,
  };
};

const SearchAllUserLoginHistoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return (dispatch) => {
    dispatch(SearchAllUserLoginHistoryInit());
    let form = new FormData();
    form.append("RequestMethod", SearchAllUserLoginHistory.RequestMethod);
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
          dispatch(SearchAllUserLoginHistoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_SearchAllUserLoginHistory_01".toLowerCase()
            ) {
              dispatch(
                SearchAllUserLoginHistorySuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchAllUserLoginHistory_02".toLowerCase()
                )
            ) {
              dispatch(SearchAllUserLoginHistoryFail(""));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchAllUserLoginHistory_03".toLowerCase()
                )
            ) {
              dispatch(SearchAllUserLoginHistoryFail("Exception"));
            }
          } else {
            dispatch(SearchAllUserLoginHistoryFail("Something went wrong"));
          }
        } else {
          dispatch(SearchAllUserLoginHistoryFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SearchAllUserLoginHistoryFail("something went wrong"));
      });
  };
};

//GetCounterPartyList
const GetCounterPartyListInit = () => {
  return {
    type: actions.GET_COUNTER_PARTY_LIST_INIT,
  };
};
const GetCounterPartyListSuccess = (response, message) => {
  return {
    type: actions.GET_COUNTER_PARTY_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCounterPartyListFail = (message) => {
  return {
    type: actions.GET_COUNTER_PARTY_LIST_FAIL,
    message: message,
  };
};

const GetCounterPartyListAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCounterPartyListInit());
    let form = new FormData();
    form.append("RequestMethod", GetCounterPartyList.RequestMethod);
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
          dispatch(GetCounterPartyListAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyList_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCounterPartyListSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCounterPartyList_04".toLowerCase()
                )
            ) {
              dispatch(GetCounterPartyListFail("Exception"));
            }
          } else {
            dispatch(GetCounterPartyListFail("Something went wrong"));
          }
        } else {
          dispatch(GetCounterPartyListFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCounterPartyListFail("something went wrong"));
      });
  };
};
//GetCounterPartyList
const GetAllTradesInit = () => {
  return {
    type: actions.GET_ALL_TRADES_INIT,
  };
};
const GetAllTradesSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_TRADES_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllTradesFail = (message) => {
  return {
    type: actions.GET_ALL_TRADES_FAIL,
    message: message,
  };
};

const GetAllTradesAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllTradesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllTrades.RequestMethod);
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
          dispatch(GetAllTradesAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllTrades_01".toLowerCase()
                )
            ) {
              dispatch(
                GetAllTradesSuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllTrades_02".toLowerCase()
                )
            ) {
              dispatch(GetAllTradesFail(""));
            } else {
              dispatch(GetAllTradesFail("Something went wrong"));
            }
          } else {
            dispatch(GetAllTradesFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllTradesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllTradesFail("something went wrong"));
      });
  };
};

const clearResponseMessageBopSystemAdmin = () => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_BOPSYSTEMADMINREDUCER,
  };
};
export {
  clearResponseMessageBopSystemAdmin,
  CreateNewCorporateAPI,
  UpdateCorporateByCorporateIDAPI,
  AddBranchAPI,
  UpdateBranchAPI,
  CreateBankUserRequestAPI,
  CreateBulkBankUserRequestAPI,
  CreateCorporateUserRequestAPI,
  CreateBulkCorporateUserRequestAPI,
  BankUsersBulkListAPI,
  CorporateUsersBulkListAPI,
  SearchBankUsersAPI,
  // getAllCorporatesCategory,
  GetBankUserByUserIDAPI,
  UpdateBankUserByUserIdAPI,
  GetVolmeterByBankIDAPI,
  AddUpdateVolmterAPI,
  UpdateVolmeterByDealerAPI,
  UpdateVolmeterSettingByBankIdAPI,
  GetVolMeterSettingByBankIdAPI,
  UpdateCategoryAPI,
  GetCounterPartyNamesAPI,
  GetAllInstrumentsAPI,
  SearchAllUserLoginHistoryAPI,
  GetCounterPartyListAPI,
  GetAllTradesAPI,
};
