import * as actions from "../action_types";
import axios from "axios";
import {
  downloadCorporateUserLogin,
  downloadBankUserLoginHistory,
  counterPartyDownloadApi,
  DownloadCorporateUserListSystemAdminReport,
  DownloadBankUserListSystemAdminReport,
  DownloadLoginHistorySystemAdminReport,
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

// Corporate User List Report

const downloadCorporateUserlistReport_init = () => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_INIT,
  };
};
const downloadCorporateUserlistReport_success = (response, message) => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadCorporateUserlistReport_fail = (message) => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_FAIL,
    message: message,
  };
};

const downloadCorporateUserlistReportApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append(
    "RequestMethod",
    DownloadCorporateUserListSystemAdminReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadCorporateUserlistReport_init());
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadCorporateUserlistReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Corporate User List.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadCorporateUserlistReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadCorporateUserlistReport_fail(response));
      });
  };
};

// Bank User List Report

const downloadBankUserlistReport_init = () => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_INIT,
  };
};
const downloadBankUserlistReport_success = (response, message) => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadBankUserlistReport_fail = (message) => {
  return {
    type: actions.CORPORATE_USERlIST_REPORT_FAIL,
    message: message,
  };
};

const downloadBankUserlistReportApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append(
    "RequestMethod",
    DownloadBankUserListSystemAdminReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadBankUserlistReport_init());
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadBankUserlistReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Bank User List.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadBankUserlistReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadBankUserlistReport_fail(response));
      });
  };
};

// Login History Report

const downloadLoginHistoryReport_init = () => {
  return {
    type: actions.LOGIN_HISTORY_REPORT_INIT,
  };
};
const downloadLoginHistoryReport_success = (response, message) => {
  return {
    type: actions.LOGIN_HISTORY_REPORT_SUCCESS,
    response: response,
    message: message,
  };
};
const downloadLoginHistoryReport_fail = (message) => {
  return {
    type: actions.LOGIN_HISTORY_REPORT_FAIL,
    message: message,
  };
};

const downloadLoginHistoryReportApi = (navigate, Data) => {
  let token = localStorage.getItem("token");
  let form = new FormData();
  form.append(
    "RequestMethod",
    DownloadLoginHistorySystemAdminReport.RequestMethod
  );
  form.append("RequestData", JSON.stringify(Data));
  return async (dispatch) => {
    await dispatch(downloadLoginHistoryReport_init());
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
        if (response.data.responseCode === 417) {
          await dispatch(RefreshToken(navigate));
          dispatch(downloadLoginHistoryReportApi(navigate, Data));
        } else if (response.status === 200) {
          const url = window.URL.createObjectURL(new Blob([response.data]));

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "Login History.xlsx");
          document.body.appendChild(link);
          link.click();
          dispatch(
            downloadLoginHistoryReport_success(
              response.data.responseResult,
              "Download-successffuly"
            )
          );
        }
      })
      .catch((response) => {
        dispatch(downloadLoginHistoryReport_fail(response));
      });
  };
};

export {
  downloadCorporateLoginReports,
  bankUserDownloadReport,
  counterPartyDownloadReport,
  downloadCorporateUserlistReportApi,
  downloadBankUserlistReportApi,
  downloadLoginHistoryReportApi,
};
