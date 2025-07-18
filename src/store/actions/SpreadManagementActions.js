import axios from "axios";
import * as actions from "../action_types";
import {
  GetAllTenors,
  GetCrossRateSpreadsForCategory,
  GetSpotSpreadsForCategory,
  GetTenorWiseFEDiscountingSpreadsForCategory,
  GetTenorWiseForwardSpreadsForCategory,
  GetTenorWiseNonFEDiscountingSpreadsForCategory,
  SaveCategoryCrossRates,
  SaveCategoryFEDiscounts,
  SaveCategoryForwards,
  SaveCategoryNonFEDiscounts,
  SaveCategoryParitySpot,
} from "../../commen/apis/Api_config";
import {
  systemAdminAPI,
  uploadRateAPI,
} from "../../commen/apis/Api_ends_points";
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
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetSpotSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(GetSpotSpreadsForCategoryFail(""));
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
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetCrossRateSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(GetCrossRateSpreadsForCategoryFail(""));
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
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseForwardSpreadsForCategory_02".toLowerCase()
                )
            ) {
              dispatch(GetTenorWiseForwardSpreadsForCategoryFail(""));
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
//GetTenorWiseFEDiscountingSpreadsForCategory
const GetTenorWiseFEDiscountingSpreadsForCategoryInit = () => {
  return {
    type: actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT,
  };
};

const GetTenorWiseFEDiscountingSpreadsForCategorySuccess = (
  response,
  message
) => {
  return {
    type: actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const GetTenorWiseFEDiscountingSpreadsForCategoryFail = (message) => {
  return {
    type: actions.GET_TENOR_WISE_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL,
    message: message,
  };
};

const GetTenorWiseFEDiscountingSpreadsForCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetTenorWiseFEDiscountingSpreadsForCategoryInit());

    let form = new FormData();
    form.append(
      "RequestMethod",
      GetTenorWiseFEDiscountingSpreadsForCategory.RequestMethod
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
          dispatch(
            GetTenorWiseFEDiscountingSpreadsForCategoryAPI(navigate, data)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseFEDiscountingSpreadsForCategory_01".toLowerCase()
                )
            ) {
              dispatch(
                GetTenorWiseFEDiscountingSpreadsForCategorySuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetTenorWiseFEDiscountingSpreadsForCategory_02".toLowerCase()
            ) {
              let data = {
                feDiscountingSpreads: [
                  {
                    instrumentID: 21,
                    tenorID: 1,
                    spread: 0.4,
                  },
                  {
                    instrumentID: 22,
                    tenorID: 1,
                    spread: 0.7,
                  },
                  {
                    instrumentID: 23,
                    tenorID: 1,
                    spread: 0.35,
                  },
                  {
                    instrumentID: 21,
                    tenorID: 2,
                    spread: 0.4,
                  },
                  {
                    instrumentID: 22,
                    tenorID: 2,
                    spread: 0.7,
                  },
                  {
                    instrumentID: 23,
                    tenorID: 2,
                    spread: 0.5,
                  },
                  {
                    instrumentID: 21,
                    tenorID: 3,
                    spread: 0.86,
                  },
                  {
                    instrumentID: 22,
                    tenorID: 3,
                    spread: 1.9,
                  },
                  {
                    instrumentID: 23,
                    tenorID: 3,
                    spread: 0.98,
                  },
                ],
              };
              dispatch(
                GetTenorWiseFEDiscountingSpreadsForCategorySuccess(data, "")
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetTenorWiseFEDiscountingSpreadsForCategory_04".toLowerCase()
            ) {
              dispatch(
                GetTenorWiseFEDiscountingSpreadsForCategoryFail("Exception")
              );
            } else {
              dispatch(
                GetTenorWiseFEDiscountingSpreadsForCategoryFail(
                  "Something went wrong"
                )
              );
            }
          } else {
            dispatch(
              GetTenorWiseFEDiscountingSpreadsForCategoryFail(
                "Something went wrong"
              )
            );
          }
        } else {
          dispatch(
            GetTenorWiseFEDiscountingSpreadsForCategoryFail(
              "Something went wrong"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(
          GetTenorWiseFEDiscountingSpreadsForCategoryFail(
            "Something went wrong"
          )
        );
      });
  };
};
//GetAllTenors
const GetAllTenorsInit = () => {
  return {
    type: actions.GET_ALL_TENORS_INIT,
  };
};

const GetAllTenorsSuccess = (response, message) => {
  return {
    type: actions.GET_ALL_TENORS_SUCCESS,
    response: response,
    message: message,
  };
};

const GetAllTenorsFail = (message) => {
  return {
    type: actions.GET_ALL_TENORS_FAIL,
    message: message,
  };
};

const GetAllTenorsAPI = (navigate) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetAllTenorsInit());

    let form = new FormData();
    form.append("RequestMethod", GetAllTenors.RequestMethod);
    axios({
      method: "POST",
      url: uploadRateAPI,
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
          dispatch(GetAllTenorsAPI(navigate));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "UploadRate_UploadRateServiceManager_GetAllTenors_01".toLowerCase()
                )
            ) {
              dispatch(GetAllTenorsSuccess(response.data.responseResult, ""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "UploadRate_UploadRateServiceManager_GetAllTenors_02".toLowerCase()
            ) {
              dispatch(GetAllTenorsFail(""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "UploadRate_UploadRateServiceManager_GetAllTenors_02".toLowerCase()
            ) {
              dispatch(GetAllTenorsFail("Role doesn’t matched"));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "UploadRate_UploadRateServiceManager_GetAllTenors_03".toLowerCase()
            ) {
              dispatch(GetAllTenorsFail("Exception has been occurred."));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "UploadRate_UploadRateServiceManager_GetAllTenors_04".toLowerCase()
            ) {
              dispatch(GetAllTenorsFail("DB Error."));
            } else {
              dispatch(GetAllTenorsFail("Something went wrong"));
            }
          } else {
            dispatch(GetAllTenorsFail("Something went wrong"));
          }
        } else {
          dispatch(GetAllTenorsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(GetAllTenorsFail("Something went wrong"));
      });
  };
};

//GetTenorWiseNonFEDiscountingSpreadsForCategory
const GetTenorWiseNonFEDiscountingSpreadsForCategoryInit = () => {
  return {
    type: actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_INIT,
  };
};

const GetTenorWiseNonFEDiscountingSpreadsForCategorySuccess = (
  response,
  message
) => {
  return {
    type: actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const GetTenorWiseNonFEDiscountingSpreadsForCategoryFail = (message) => {
  return {
    type: actions.GET_TENOR_WISE_NON_FE_DISCOUNTING_SPREADS_FOR_CATEGORY_FAIL,
    message: message,
  };
};

const GetTenorWiseNonFEDiscountingSpreadsForCategoryAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(GetTenorWiseNonFEDiscountingSpreadsForCategoryInit());

    let form = new FormData();
    form.append(
      "RequestMethod",
      GetTenorWiseNonFEDiscountingSpreadsForCategory.RequestMethod
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
          dispatch(
            GetTenorWiseNonFEDiscountingSpreadsForCategoryAPI(navigate, data)
          );
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_GetTenorWiseNonFEDiscountingSpreadsForCategory_01".toLowerCase()
                )
            ) {
              dispatch(
                GetTenorWiseNonFEDiscountingSpreadsForCategorySuccess(
                  response.data.responseResult,
                  ""
                )
              );
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetTenorWiseNonFEDiscountingSpreadsForCategory_02".toLowerCase()
            ) {
              dispatch(GetTenorWiseNonFEDiscountingSpreadsForCategoryFail(""));
            } else if (
              response.data.responseResult.responseMessage.toLowerCase() ===
              "SystemAdmin_SystemAdminManager_GetTenorWiseNonFEDiscountingSpreadsForCategory_04".toLowerCase()
            ) {
              dispatch(
                GetTenorWiseNonFEDiscountingSpreadsForCategoryFail("Exception")
              );
            } else {
              dispatch(
                GetTenorWiseNonFEDiscountingSpreadsForCategoryFail(
                  "Something went wrong"
                )
              );
            }
          } else {
            dispatch(
              GetTenorWiseNonFEDiscountingSpreadsForCategoryFail(
                "Something went wrong"
              )
            );
          }
        } else {
          dispatch(
            GetTenorWiseNonFEDiscountingSpreadsForCategoryFail(
              "Something went wrong"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(
          GetTenorWiseNonFEDiscountingSpreadsForCategoryFail(
            "Something went wrong"
          )
        );
      });
  };
};

//SaveCategoryParitySpot
const SaveCategoryParitySpotInit = () => {
  return {
    type: actions.SAVE_CATEGORY_PARITY_SPOT_INIT,
  };
};

const SaveCategoryParitySpotSuccess = (response, message) => {
  return {
    type: actions.SAVE_CATEGORY_PARITY_SPOT_SUCCESS,
    response: response,
    message: message,
  };
};

const SaveCategoryParitySpotFail = (message) => {
  return {
    type: actions.SAVE_CATEGORY_PARITY_SPOT_FAIL,
    message: message,
  };
};

const SaveCategoryParitySpotAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(SaveCategoryParitySpotInit());

    let form = new FormData();
    form.append("RequestMethod", SaveCategoryParitySpot.RequestMethod);
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
          dispatch(SaveCategoryParitySpotAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryParitySpot_01".toLowerCase()
                )
            ) {
              dispatch(
                SaveCategoryParitySpotSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryParitySpot_02".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryParitySpotFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryParitySpot_04".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryParitySpotFail("Exception."));
            } else {
              dispatch(SaveCategoryParitySpotFail("Something went wrong"));
            }
          } else {
            dispatch(SaveCategoryParitySpotFail("Something went wrong"));
          }
        } else {
          dispatch(SaveCategoryParitySpotFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveCategoryParitySpotFail("Something went wrong"));
      });
  };
};

//SaveCategoryCrossRates
const SaveCategoryCrossRatesInit = () => {
  return {
    type: actions.SAVE_CATEGORY_CROSS_RATES_INIT,
  };
};

const SaveCategoryCrossRatesSuccess = (response, message) => {
  return {
    type: actions.SAVE_CATEGORY_CROSS_RATES_SUCCESS,
    response: response,
    message: message,
  };
};

const SaveCategoryCrossRatesFail = (message) => {
  return {
    type: actions.SAVE_CATEGORY_CROSS_RATES_FAIL,
    message: message,
  };
};

const SaveCategoryCrossRatesAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(SaveCategoryCrossRatesInit());

    let form = new FormData();
    form.append("RequestMethod", SaveCategoryCrossRates.RequestMethod);
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
          dispatch(SaveCategoryCrossRatesAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryCrossRates_01".toLowerCase()
                )
            ) {
              dispatch(
                SaveCategoryCrossRatesSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryCrossRates_02".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryCrossRatesFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryCrossRates_04".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryCrossRatesFail("Exception."));
            } else {
              dispatch(SaveCategoryCrossRatesFail("Something went wrong"));
            }
          } else {
            dispatch(SaveCategoryCrossRatesFail("Something went wrong"));
          }
        } else {
          dispatch(SaveCategoryCrossRatesFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveCategoryCrossRatesFail("Something went wrong"));
      });
  };
};

//SaveCategoryCrossRates
const SaveCategoryForwardsInit = () => {
  return {
    type: actions.SAVE_CATEGORY_FORWARDS_INIT,
  };
};

const SaveCategoryForwardsSuccess = (response, message) => {
  return {
    type: actions.SAVE_CATEGORY_FORWARDS_SUCCESS,
    response: response,
    message: message,
  };
};

const SaveCategoryForwardsFail = (message) => {
  return {
    type: actions.SAVE_CATEGORY_FORWARDS_FAIL,
    message: message,
  };
};

const SaveCategoryForwardsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(SaveCategoryForwardsInit());

    let form = new FormData();
    form.append("RequestMethod", SaveCategoryForwards.RequestMethod);
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
          dispatch(SaveCategoryForwardsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryForwards_01".toLowerCase()
                )
            ) {
              dispatch(
                SaveCategoryForwardsSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryForwards_02".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryForwardsFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryForwards_04".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryForwardsFail("Exception."));
            } else {
              dispatch(SaveCategoryForwardsFail("Something went wrong"));
            }
          } else {
            dispatch(SaveCategoryForwardsFail("Something went wrong"));
          }
        } else {
          dispatch(SaveCategoryForwardsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveCategoryForwardsFail("Something went wrong"));
      });
  };
};

const SaveCategoryFEDiscountsInit = () => {
  return {
    type: actions.SAVE_CATEGORY_FE_DISCOUNTS_INIT,
  };
};

const SaveCategoryFEDiscountsSuccess = (response, message) => {
  return {
    type: actions.SAVE_CATEGORY_FE_DISCOUNTS_SUCCESS,
    response: response,
    message: message,
  };
};

const SaveCategoryFEDiscountsFail = (message) => {
  return {
    type: actions.SAVE_CATEGORY_FE_DISCOUNTS_FAIL,
    message: message,
  };
};

const SaveCategoryFEDiscountsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(SaveCategoryFEDiscountsInit());

    let form = new FormData();
    form.append("RequestMethod", SaveCategoryFEDiscounts.RequestMethod);
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
          dispatch(SaveCategoryFEDiscountsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryFEDiscounts_01".toLowerCase()
                )
            ) {
              dispatch(
                SaveCategoryFEDiscountsSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryFEDiscounts_02".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryFEDiscountsFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryFEDiscounts_04".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryFEDiscountsFail("Exception."));
            } else {
              dispatch(SaveCategoryFEDiscountsFail("Something went wrong"));
            }
          } else {
            dispatch(SaveCategoryFEDiscountsFail("Something went wrong"));
          }
        } else {
          dispatch(SaveCategoryFEDiscountsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveCategoryFEDiscountsFail("Something went wrong"));
      });
  };
};

const SaveCategoryNonFEDiscountsInit = () => {
  return {
    type: actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_INIT,
  };
};

const SaveCategoryNonFEDiscountsSuccess = (response, message) => {
  return {
    type: actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_SUCCESS,
    response: response,
    message: message,
  };
};

const SaveCategoryNonFEDiscountsFail = (message) => {
  return {
    type: actions.SAVE_CATEGORY_NON_FE_DISCOUNTS_FAIL,
    message: message,
  };
};

const SaveCategoryNonFEDiscountsAPI = (navigate, data) => {
  let token = localStorage.getItem("token");
  return async (dispatch) => {
    dispatch(SaveCategoryNonFEDiscountsInit());

    let form = new FormData();
    form.append("RequestMethod", SaveCategoryNonFEDiscounts.RequestMethod);
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
          dispatch(SaveCategoryNonFEDiscountsAPI(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryNonFEDiscounts_01".toLowerCase()
                )
            ) {
              dispatch(
                SaveCategoryNonFEDiscountsSuccess(
                  response.data.responseResult,
                  "Successful."
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryNonFEDiscounts_02".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryNonFEDiscountsFail("UnSuccessful."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_SaveCategoryNonFEDiscounts_04".toLowerCase()
                )
            ) {
              dispatch(SaveCategoryNonFEDiscountsFail("Exception."));
            } else {
              dispatch(SaveCategoryNonFEDiscountsFail("Something went wrong"));
            }
          } else {
            dispatch(SaveCategoryNonFEDiscountsFail("Something went wrong"));
          }
        } else {
          dispatch(SaveCategoryNonFEDiscountsFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(SaveCategoryNonFEDiscountsFail("Something went wrong"));
      });
  };
};
const clearResponseMessageSpreadManagementReducer = () => {
  return {
    type: actions.CLEAR_RESPONSEMESSAGE_SPREADMANAGEMENTREDUCER,
  };
};

export {
  GetSpotSpreadsForCategoryAPI,
  GetCrossRateSpreadsForCategoryAPI,
  GetTenorWiseForwardSpreadsForCategoryAPI,
  GetTenorWiseFEDiscountingSpreadsForCategoryAPI,
  GetAllTenorsAPI,
  GetTenorWiseNonFEDiscountingSpreadsForCategoryAPI,
  SaveCategoryParitySpotAPI,
  SaveCategoryCrossRatesAPI,
  SaveCategoryForwardsAPI,
  SaveCategoryFEDiscountsAPI,
  SaveCategoryNonFEDiscountsAPI,
  clearResponseMessageSpreadManagementReducer,
};
