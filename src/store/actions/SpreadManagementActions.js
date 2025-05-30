import axios from "axios";
import * as actions from "../action_types";
import {
  GetCrossRateSpreadsForCategory,
  GetSpotSpreadsForCategory,
  GetTenorWiseForwardSpreadsForCategory,
} from "../../commen/apis/Api_config";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth-Actions";

//GetSpotSpreadsForCategory
const GetSpotSpreadsForCategoryInit = () => {
  return {
    type: actions.GET_SPOT_SPREAD_FOR_CATEGORY_INIT,
  };
};

const GetSpotSpreadsForCategorySuccess = (response, message) => {
  return {
    type: actions.GET_SPOT_SPREAD_FOR_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const GetSpotSpreadsForCategoryFail = (message) => {
  return {
    type: actions.GET_SPOT_SPREAD_FOR_CATEGORY_FAIL,
    message: message,
  };
};

const GetSpotSpreadsForCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetSpotSpreadsForCategoryInit());

    let form = new FormData();
    form.append("RequestMethod", GetSpotSpreadsForCategory.RequestMethod);
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
          dispatch(GetSpotSpreadsForCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetSpotSpreadsForCategory_01".toLowerCase()
                )
            ) {
              dispatch(
                GetSpotSpreadsForCategorySuccess(
                  response.data.responseResult,
                  "Data Available."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetSpotSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(GetSpotSpreadsForCategoryFail("No Data Available."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetSpotSpreadsForCategory_03".toLowerCase()
                )
            ) {
              dispatch(GetSpotSpreadsForCategoryFail("Exception"));
            }
          } else {
            dispatch(GetSpotSpreadsForCategoryFail("Something went wrong"));
          }
        } else {
          dispatch(GetSpotSpreadsForCategoryFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetSpotSpreadsForCategoryFail("Something went wrong"));
      });
  };
};

//GetCrossRateSpreadsForCategory
const GetCrossRateSpreadsForCategoryInit = () => {
  return {
    type: actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_INIT,
  };
};

const GetCrossRateSpreadsForCategorySuccess = (response, message) => {
  return {
    type: actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const GetCrossRateSpreadsForCategoryFail = (message) => {
  return {
    type: actions.GET_CROSS_RATE_SPREADS_FOR_CATEGORY_FAIL,
    message: message,
  };
};

const GetCrossRateSpreadsForCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetCrossRateSpreadsForCategoryInit());

    let form = new FormData();
    form.append("RequestMethod", GetCrossRateSpreadsForCategory.RequestMethod);
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
          dispatch(GetCrossRateSpreadsForCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCrossRateSpreadsForCategory_01".toLowerCase()
                )
            ) {
              dispatch(
                GetCrossRateSpreadsForCategorySuccess(
                  response.data.responseResult,
                  "Data Available."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCrossRateSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                GetCrossRateSpreadsForCategoryFail("No Data Available.")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCrossRateSpreadsForCategory_04".toLowerCase()
                )
            ) {
              dispatch(GetCrossRateSpreadsForCategoryFail("Exception."));
            }
          } else {
            dispatch(
              GetCrossRateSpreadsForCategoryFail("Something went wrong")
            );
          }
        } else {
          dispatch(GetCrossRateSpreadsForCategoryFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetCrossRateSpreadsForCategoryFail("Something went wrong"));
      });
  };
};

//GetTenorWiseForwardSpreadsForCategory
const GetTenorWiseForwardSpreadsForCategoryInit = () => {
  return {
    type: actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_INIT,
  };
};

const GetTenorWiseForwardSpreadsForCategorySuccess = (response, message) => {
  return {
    type: actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const GetTenorWiseForwardSpreadsForCategoryFail = (message) => {
  return {
    type: actions.GET_TENOR_WISE_FORWARD_SPREADS_FOR_CATEGORY_FAIL,
    message: message,
  };
};

const GetTenorWiseForwardSpreadsForCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetTenorWiseForwardSpreadsForCategoryInit());

    let form = new FormData();
    form.append(
      "RequestMethod",
      GetTenorWiseForwardSpreadsForCategory.RequestMethod
    );
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
          dispatch(GetTenorWiseForwardSpreadsForCategoryAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseForwardSpreadsForCategory_01".toLowerCase()
                )
            ) {
              dispatch(
                GetTenorWiseForwardSpreadsForCategorySuccess(
                  response.data.responseResult,
                  "Data Available."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseForwardSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                GetTenorWiseForwardSpreadsForCategoryFail("No Data Available.")
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseForwardSpreadsForCategory_04".toLowerCase()
                )
            ) {
              dispatch(GetTenorWiseForwardSpreadsForCategoryFail("Exception."));
            }
          } else {
            dispatch(
              GetTenorWiseForwardSpreadsForCategoryFail("Something went wrong")
            );
          }
        } else {
          dispatch(
            GetTenorWiseForwardSpreadsForCategoryFail("Something went wrong")
          );
        }
      })
      .catch((response) => {
        dispatch(
          GetTenorWiseForwardSpreadsForCategoryFail("Something went wrong")
        );
      });
  };
};

export {
  GetSpotSpreadsForCategoryAPI,
  GetCrossRateSpreadsForCategoryAPI,
  GetTenorWiseForwardSpreadsForCategoryAPI,
};
