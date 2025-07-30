// Base URL from .env
const baseURL = process.env.REACT_APP_API_BASE_URL;

// Final API endpoints
const authenticationAPI = `${baseURL}${process.env.REACT_APP_AUTH_PORT}`;
const systemAdminAPI = `${baseURL}${process.env.REACT_APP_SYSTEM_ADMIN_PORT}`;
const securityAdminAPI = `${baseURL}${process.env.REACT_APP_SECURITY_ADMIN_PORT}`;
const downloadReportAPI = `${baseURL}${process.env.REACT_APP_DOWNLOAD_REPORT_PORT}`;
const settingsAPI = `${baseURL}${process.env.REACT_APP_SETTINGS_PORT}`;
const uploadRateAPI = `${baseURL}${process.env.REACT_APP_UPLOAD_RATE_PORT}`;
const watchListAPI = `${baseURL}${process.env.REACT_APP_WATCHLIST_PORT}`;

// Export all
export {
  watchListAPI,
  authenticationAPI,
  systemAdminAPI,
  securityAdminAPI,
  downloadReportAPI,
  settingsAPI,
  uploadRateAPI,
};
