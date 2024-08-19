import * as actions from "../action_types";
import axios from "axios";
import {
  downloadCorporateUserLogin,
  downloadBankUserLoginHistory,
  counterPartyDownloadApi,
} from "../../commen/apis/Api_config";
import { RefreshToken } from "./Auth-Actions";
import { downloadReportAPI } from "../../commen/apis/Api_ends_points";

const downloadCorporateFileInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_CORPORATE_FILE_INIT,
  };
};

// for Download Report Loader
const loaderReport = (response) => {
  return {
    type: actions.DOWNLOAD_REPORT_INIT,
    action: response,
  };
};

// For Download Report Something Went wrong
const SomeThingWentWrong = (response) => {
  return {
    type: actions.SOME_THING_WENT_WRONG,
    action: response,
  };
};

const downloadCorporateLoginReports = (data) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadCorporateUserLogin.RequestMethod);
  form.append("RequestData", JSON.stringify(data));
  return (dispatch) => {
    console.log("downloadCorporateLoginReports", data);
    dispatch(downloadCorporateFileInit());
    axios({
      method: "post",
      url: downloadReportAPI,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("downloadCorporateLoginReports", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(downloadCorporateLoginReports(data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("downloadCorporateLoginReports", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-corporate-login-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadCorporateLoginReports", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// FOR DOWNLOAD BANK USER LOGIN HISTORY REPORT

const downloadBankFileInit = () => {
  return {
    type: actions.DOWNLOAD_EXCEL_BANK_FILE_INIT,
  };
};

const bankUserDownloadReport = (newReportData) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", downloadBankUserLoginHistory.RequestMethod);
  form.append("RequestData", JSON.stringify(newReportData));
  return (dispatch) => {
    dispatch(downloadBankFileInit());
    axios({
      method: "post",
      url: downloadReportAPI,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("bankUserDownloadReport", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(bankUserDownloadReport(newReportData));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("bankUserDownloadReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-corporate-login-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("downloadCorporateLoginReports", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

// FOR DOWNLOAD COUNTER PARTY LIMIT REPORT FILE

const downloadCounterFileInit = () => {
  return {
    type: actions.DOWNLOAD_COUNTER_PARTY_REPORT_INIT,
  };
};

const counterPartyDownloadReport = (downloadCounterReport) => {
  let token = JSON.parse(localStorage.getItem("token"));
  let form = new FormData();
  form.append("RequestMethod", counterPartyDownloadApi.RequestMethod);
  form.append("RequestData", JSON.stringify(downloadCounterReport));
  return (dispatch) => {
    dispatch(downloadCounterFileInit());
    axios({
      method: "post",
      url: downloadReportAPI,
      data: form,
      headers: {
        _token: token,
        "Content-Disposition": "attachment; filename=template.xlsx",
        "Content-Type":
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      },
      responseType: "arraybuffer",
    })
      .then(async (response) => {
        console.log("counterPartyDownloadReport", response);

        if (response.status === 417) {
          await dispatch(RefreshToken());
          dispatch(counterPartyDownloadReport(downloadCounterReport));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));
          console.log("counterPartyDownloadReport", url);
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            "download-counter-party-format-reports.xlsx"
          );
          document.body.appendChild(link);
          link.click();

          dispatch(loaderReport(false));
        }
      })
      .catch((response) => {
        console.log("counterPartyDownloadReport", response);
        dispatch(SomeThingWentWrong(response));
      });
  };
};

export {
  downloadCorporateLoginReports,
  bankUserDownloadReport,
  counterPartyDownloadReport,
};
