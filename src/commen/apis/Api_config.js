const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const UpdateCorporateMapping = {
  RequestMethod: "ServiceManager.UpdateCorporateCategoryMapping",
};

const Addcateogry = {
  RequestMethod: "ServiceManager.AddCorporateCategory",
};

const getallCoporatesSystem = {
  RequestMethod: "ServiceManager.GetAllCorporateDetails",
};

// download Reports coporateUserLogin History Report
const downloadCorporateUserLogin = {
  RequestMethod: "CorporateUsersLoginHistoryReport",
};

//DOWNLOAD REPORTS FOR BANK USER LOGIN HISTORY REPORT
const downloadBankUserLoginHistory = {
  RequestMethod: "BankUsersLoginHistoryReportExcel",
};

//upload counter party Limit Excel file
const uploadCounterPartyFile = {
  RequestMethod: "ServiceManager.CounterPartyLimitExcelUpload",
};

//Delete a Category
const DeleteCategory = {
  RequestMethod: "ServiceManager.DeleteCorporateCategory",
};

// download counter party file
const counterPartyDownloadApi = {
  RequestMethod: "DownloadFile",
};

//login api
const LoginSystemAdmin = {
  RequestMethod: "ServiceManager.Login",
};

//Send Email for Reset Password
const SendEmailResetPassword = {
  RequestMethod: "ServiceManager.SendEmailForResetPasword",
};

export {
  authenticationRefreshToken,
  UpdateCorporateMapping,
  Addcateogry,
  getallCoporatesSystem,
  downloadCorporateUserLogin,
  downloadBankUserLoginHistory,
  uploadCounterPartyFile,
  DeleteCategory,
  counterPartyDownloadApi,
  LoginSystemAdmin,
  SendEmailResetPassword,
};
