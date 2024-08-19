import * as actions from "../action_types";
import axios from "axios";
import { systemAdminAPI } from "../../commen/apis/Api_ends_points";
import { RefreshToken } from "./Auth-Actions";
import { uploadCounterPartyFile } from "../../commen/apis/Api_config";

const counterPartyUploadInit = () => {
  return {
    type: actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_INIT,
  };
};

const counterPartyUploadSuccess = (response, message) => {
  return {
    type: actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_SUCCESS,
    response: response,
    message: message,
  };
};

const counterPartyUploadFail = (message) => {
  return {
    type: actions.COUNTER_PARTY_LIMIT_EXCEL_FILE_FAIL,
    message: message,
  };
};

const resetCounterPartyUpload = () => {
  return {
    type: actions.RESET_COUNTER_PART_FILE_UPLOAD,
    response: [],
  };
};

const counterPartyUpload = (navigate, data, setCounterUploadModal, setFile) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", uploadCounterPartyFile.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  form.append("File", data);

  return async (dispatch) => {
    dispatch(counterPartyUploadInit());
    await axios({
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
          dispatch(counterPartyUpload(navigate, data));
        } else if (response.data.responseCode === 200) {
          if (response.data.responseResult.isExecuted === true) {
            if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CounterPartyLimitExcelUpload_01".toLowerCase()
                )
            ) {
              dispatch(
                counterPartyUploadFail(
                  response.data.responseResult,
                  "Invalid File"
                )
              );
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CounterPartyLimitExcelUpload_02".toLowerCase()
                )
            ) {
              await dispatch(
                counterPartyUploadSuccess(
                  response.data.responseResult,
                  "File Uploaded Successfully"
                )
              );
              setFile(null);
              setCounterUploadModal(true);
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CounterPartyLimitExcelUpload_03".toLowerCase()
                )
            ) {
              await dispatch(counterPartyUploadFail("Invalid Request Data"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CounterPartyLimitExcelUpload_04".toLowerCase()
                )
            ) {
              await dispatch(counterPartyUploadFail("not a valid role"));
            } else if (
              response.data.responseResult.responseMessage
                .toLowerCase()
                .includes(
                  "SystemAdmin_SystemAdminManager_CounterPartyLimitExcelUpload_05".toLowerCase()
                )
            ) {
              await dispatch(
                counterPartyUploadFail("Exception Something went wrong")
              );
            } else {
              await dispatch(counterPartyUploadFail("Something went wrong"));
            }
          } else {
            await dispatch(counterPartyUploadFail("Something went wrong"));
          }
        } else {
          await dispatch(counterPartyUploadFail("Something went wrong"));
        }
      })
      .catch((response) => {
        dispatch(counterPartyUploadFail("Something went wrong"));
      });
  };
};

export { counterPartyUpload };
