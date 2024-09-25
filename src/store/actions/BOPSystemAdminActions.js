import axios from "axios";
import {
  AddBranch,
  BankUsersBankList,
  CorporateUsersBulkList,
  CreateBankUserRequest,
  CreateBulkBankUserRequest,
  CreateBulkCorporateUserRequest,
  CreateCorporateUserRequest,
  CreateNewCorporate,
  GetAllBranches,
  UpdateBranch,
  UpdateCorporateByCorporateID,
  SearchCorporateUsers,
} from "../../commen/apis/Api_config";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";
import * as actions from "../action_types";
import { RefreshToken } from "./Auth-Actions";

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

const CreateNewCorporateAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CreateNewCorporateAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateNewCorporate_01".toLowerCase()
            ) {
              dispatch(
                CreateNewCorporateSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_02".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateNewCorporate_03".toLowerCase()
                )
            ) {
              dispatch(CreateNewCorporateFail("Something went wrong"));
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
    type: actions.UPDATE_CORPORATE_BY_CORPORATEID_INIT,
    response: response,
    message: message,
  };
};

const UpdateCorporateByCorporateIDFail = (message) => {
  return {
    type: actions.UPDATE_CORPORATE_BY_CORPORATEID_INIT,
    message: message,
  };
};

const UpdateCorporateByCorporateIDAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateCorporateByCorporateIDAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_01".toLowerCase()
            ) {
              dispatch(
                UpdateCorporateByCorporateIDSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_02".toLowerCase()
                )
            ) {
              dispatch(UpdateCorporateByCorporateIDFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateCorporateByCorporateID_03".toLowerCase()
                )
            ) {
              dispatch(
                UpdateCorporateByCorporateIDFail("Something went wrong")
              );
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

const AddBranchAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(AddBranchAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_AddBranch_01".toLowerCase()
            ) {
              dispatch(
                AddBranchSuccess(response.data.responseResult, "Successfull")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_02".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddBranch_03".toLowerCase()
                )
            ) {
              dispatch(AddBranchFail("Something went wrong"));
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

const UpdateBranchAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(UpdateBranchAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_UpdateBranch_01".toLowerCase()
            ) {
              dispatch(
                UpdateBranchSuccess(response.data.responseResult, "Successfull")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_02".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_UpdateBranch_03".toLowerCase()
                )
            ) {
              dispatch(UpdateBranchFail("Something went wrong"));
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

const GetAllBranchesAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(GetAllBranchesInit());
    let form = new FormData();
    form.append("RequestMethod", GetAllBranches.RequestMethod);
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(GetAllBranchesAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetAllBranches_01".toLowerCase()
            ) {
              dispatch(
                GetAllBranchesSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllBranches_02".toLowerCase()
                )
            ) {
              dispatch(GetAllBranchesFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetAllBranches_03".toLowerCase()
                )
            ) {
              dispatch(GetAllBranchesFail("Something went wrong"));
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

const CreateBankUserRequestAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CreateBankUserRequestAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBankUserRequest_01".toLowerCase()
            ) {
              dispatch(
                CreateBankUserRequestSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(CreateBankUserRequestFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBankUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(CreateBankUserRequestFail("Something went wrong"));
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

const CreateBulkBankUserRequestAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CreateBulkBankUserRequestAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_01".toLowerCase()
            ) {
              dispatch(
                CreateBulkBankUserRequestSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(CreateBulkBankUserRequestFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(CreateBulkBankUserRequestFail("Something went wrong"));
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

const CreateCorporateUserRequestAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CreateCorporateUserRequestAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_01".toLowerCase()
            ) {
              dispatch(
                CreateCorporateUserRequestSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_02".toLowerCase()
                )
            ) {
              dispatch(CreateCorporateUserRequestFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateCorporateUserRequest_03".toLowerCase()
                )
            ) {
              dispatch(CreateCorporateUserRequestFail("Something went wrong"));
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

const CreateBulkCorporateUserRequestAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CreateBulkCorporateUserRequestAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_01".toLowerCase()
            ) {
              dispatch(
                CreateBulkCorporateUserRequestSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_02".toLowerCase()
                )
            ) {
              dispatch(CreateBulkCorporateUserRequestFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CreateBulkBankUserRequests_03".toLowerCase()
                )
            ) {
              dispatch(
                CreateBulkCorporateUserRequestFail("Something went wrong")
              );
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

const BankUsersBankListInit = () => {
  return {
    type: actions.BANK_USERS_BANK_LIST_INIT,
  };
};

const BankUsersBankListSuccess = (response, message) => {
  return {
    type: actions.BANK_USERS_BANK_LIST_SUCCESS,
    response: response,
    message: message,
  };
};

const BankUsersBankListFail = (message) => {
  return {
    type: actions.BANK_USERS_BANK_LIST_FAIL,
    message: message,
  };
};

const BankUsersBankListAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(BankUsersBankListInit());
    let form = new FormData();
    form.append("RequestMethod", BankUsersBankList.RequestMethod);
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(BankUsersBankListAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_BankUsersBulkList_01".toLowerCase()
            ) {
              dispatch(
                BankUsersBankListSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_BankUsersBulkList_02".toLowerCase()
                )
            ) {
              dispatch(BankUsersBankListFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_BankUsersBulkList_03".toLowerCase()
                )
            ) {
              dispatch(BankUsersBankListFail("Something went wrong"));
            }
          } else {
            dispatch(BankUsersBankListFail("Something went wrong"));
          }
        } else {
          dispatch(CreateBulkCorporateUserRequestFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(BankUsersBankListFail("something went wrong"));
      });
  };
};

//Corporate Users Bulk List

const CorporateUsersBulkListInit = () => {
  return {
    type: actions.BANK_USERS_BANK_LIST_INIT,
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

const CorporateUsersBulkListAPI = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  return (dispatch) => {
    dispatch(CorporateUsersBulkListInit());
    let form = new FormData();
    form.append("RequestMethod", CorporateUsersBulkList.RequestMethod);
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(CorporateUsersBulkListAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_01".toLowerCase()
            ) {
              dispatch(
                CorporateUsersBulkListSuccess(
                  response.data.responseResult,
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_02".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CorporateUsersBulkList_03".toLowerCase()
                )
            ) {
              dispatch(CorporateUsersBulkListFail("Something went wrong"));
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
  let token = JSON.parse(localStorage.getItem("token"));
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
                  "Successfull"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_02".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("Failed"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SearchCorporateUsers_03".toLowerCase()
                )
            ) {
              dispatch(SearchCorporateUsersFail("Something went wrong"));
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

export {
  CreateNewCorporateAPI,
  UpdateCorporateByCorporateIDAPI,
  AddBranchAPI,
  UpdateBranchAPI,
  GetAllBranchesAPI,
  CreateBankUserRequestAPI,
  CreateBulkBankUserRequestAPI,
  CreateCorporateUserRequestAPI,
  CreateBulkCorporateUserRequestAPI,
  BankUsersBankListAPI,
  CorporateUsersBulkListAPI,
  SearchCorporateUsersAPI,
};
