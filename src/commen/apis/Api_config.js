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

//Create New Corporate
const CreateNewCorporate = {
  RequestMethod: "ServiceManager.CreateNewCorporate",
};

//Update Corporate By CorporateID
const UpdateCorporateByCorporateID = {
  RequestMethod: "ServiceManager.UpdateCorporateByCorporateID",
};

//Add Branch
const AddBranch = {
  RequestMethod: "ServiceManager.AddBranch",
};
//Update Branch
const UpdateBranch = {
  RequestMethod: "ServiceManager.UpdateBranch",
};
//Get all Branched
const GetAllBranches = {
  RequestMethod: "ServiceManager.GetAllBranches",
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
  CreateNewCorporate,
  UpdateCorporateByCorporateID,
  AddBranch,
  UpdateBranch,
  GetAllBranches,
};
