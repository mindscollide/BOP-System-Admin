import * as actions from "../action_types";
import axios from "axios";
import { Addcateogry, getBankUserApi } from "../../commen/apis/Api_config";
import { RefreshToken, getAllCorporatesCategory } from "./Auth-Actions";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";

const addcategoryinit = () => {
  return {
    type: actions.ADD_CATEGORY_INIT,
  };
};

const addcategorysuccess = (response, message) => {
  return {
    type: actions.ADD_CATEGORY_SUCCESS,
    response: response,
    message: message,
  };
};

const addcategoryfailed = (message) => {
  return {
    type: actions.ADD_CATEGORY_FAIL,
    message: message,
  };
};

const Addcategory = (navigate, data) => {
  let token = JSON.parse(localStorage.getItem("token"));

  return (dispatch) => {
    dispatch(addcategoryinit());
    let form = new FormData();
    form.append("RequestMethod", Addcateogry.RequestMethod);
    form.append("RequestData", JSON.stringify(data));
    axios({
      method: "post",
      url: systemAdminAPI,
      data: form,
      headers: {
        _token: token,
      },
    })
      .then(async (response) => {
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(Addcategory(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddCorporateCategory_01".toLowerCase()
                )
            ) {
              dispatch(addcategoryfailed("Category already exists."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddCorporateCategory_02".toLowerCase()
                )
            ) {
              dispatch(
                addcategorysuccess(
                  response.data.responseResult,
                  "Category saved"
                )
              );
              // dispatch(getAllCorporatesCategory(navigate));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddCorporateCategory_03".toLowerCase()
                )
            ) {
              dispatch(addcategoryfailed("Category not saved."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddCorporateCategory_04".toLowerCase()
                )
            ) {
              dispatch(addcategoryfailed("Invalid role."));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_AddCorporateCategory_05".toLowerCase()
                )
            ) {
              dispatch(addcategoryfailed("Exception Something went wrong"));
            }
          } else {
            dispatch(addcategoryfailed("Something went wrong"));
          }
        } else {
          dispatch(addcategoryfailed("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(addcategoryfailed("Something went wrong"));
      });
  };
};

export { Addcategory };
