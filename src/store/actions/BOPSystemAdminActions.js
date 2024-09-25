import axios from "axios";
import {
  AddBranch,
  CreateNewCorporate,
  GetAllBranches,
  UpdateBranch,
  UpdateCorporateByCorporateID,
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

export {
  CreateNewCorporateAPI,
  UpdateCorporateByCorporateIDAPI,
  AddBranchAPI,
  UpdateBranchAPI,
  GetAllBranchesAPI,
};
