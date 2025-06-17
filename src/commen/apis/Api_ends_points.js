// our base url or machine api
const baseURL = "http://192.168.18.241";

// our service URLs
const authenticationPort = ":13000/ERM_Auth";
const systemAdminPort = ":13009/SystemAdmin";
const securityAdminPort = ":12001/SecurityAdmin";
const downloadReportPort = ":12004/ExcelReport";
const settingsPort = ":13008/Setting";
const uploadRatePort = ":13010/UploadRate";

//our Final Api
const authenticationAPI = baseURL + authenticationPort;
const systemAdminAPI = baseURL + systemAdminPort;
const securityAdminAPI = baseURL + securityAdminPort;
const downloadReportAPI = baseURL + downloadReportPort;
const settingsAPI = baseURL + settingsPort;
const uploadRateAPI = baseURL + uploadRatePort;

export {
  authenticationAPI,
  systemAdminAPI,
  securityAdminAPI,
  downloadReportAPI,
  settingsAPI,
  uploadRateAPI,
};
