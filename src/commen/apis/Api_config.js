const authenticationRefreshToken = {
  RequestMethod: "ServiceManager.RefreshToken",
};

const UpdateCorporateMapping = {
  RequestMethod: "ServiceManager.UpdateCorporateCategoryMapping",
};

const Addcateogry = {
  RequestMethod: "ServiceManager.AddCategory",
};

const UpdateCategory = {
  RequestMethod: "ServiceManager.UpdateCategory",
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
//Create Bank User Request
const CreateBankUserRequest = {
  RequestMethod: "ServiceManager.CreateBankUserRequest",
};
//Create Bulk Bank User Request
const CreateBulkBankUserRequest = {
  RequestMethod: "ServiceManager.CreateBulkBankUserRequests",
};
//Create Corporate User Reqeust
const CreateCorporateUserRequest = {
  RequestMethod: "ServiceManager.CreateCorporateUserRequest",
};

//Create Bulk Corporate User Request
const CreateBulkCorporateUserRequest = {
  RequestMethod: "ServiceManager.CreateBulkCorporateUserRequests",
};

//Bank Users BankUserList
const BankUsersBankList = {
  RequestMethod: "ServiceManager.BankUsersBulkList",
};
//Corporate Users Bulk List
const CorporateUsersBulkList = {
  RequestMethod: "ServiceManager.CorporateUsersBulkList",
};
//Search Corporate Users
const SearchCorporateUsers = {
  RequestMethod: "ServiceManager.SearchCorporateUsers",
};
//Search Bank Users
const SearchBankUsers = {
  RequestMethod: "ServiceManager.SearchBankUsers",
};
//Update Corporate User
const UpdateCorporateUsers = {
  RequestMethod: "ServiceManager.UpdateCorporateUser",
};
//Get Bank User by UserID
const GetBankUserByUserID = {
  RequestMethod: "ServiceManager.GetBankUserbyUserID",
};
//Update Bank User By Bank ID
const UpdateBankUserByUserID = {
  RequestMethod: "ServiceManager.UpdateBankUserbyUserID",
};

//Get All Bank Users
const GetAllBankUsers = {
  RequestMethod: "ServiceManager.GetAllBankUsers",
};

//Get VolMeters By Bannking ID
const GetVolmeterByBankID = {
  RequestMethod: "ServiceManager.GetVolMetersByBankID",
};

//ADD Update Volmeter
const AddUpdateVolmeter = {
  RequestMethod: "ServiceManager.AddUpdateVolmeter",
};

//Update Volmeter by Dealer
const UpdateVolmeterByDealer = {
  RequestMethod: "ServiceManager.UpdateVolmeterByDealer",
};

//Update Volmeter Setting By Bank Id
const UpdateVolMeterSettingByBankId = {
  RequestMethod: "ServiceManager.UpdateVolMeterSettingByBankId",
};

//Update Volmeter Setting By Bank Id
const GetVolMeterSettingByBankId = {
  RequestMethod: "ServiceManager.GetVolMeterSettingByBankId",
};

//Get All Categories
const GetAllCategories = {
  RequestMethod: "ServiceManager.GetAllCategories",
};

const GetAllCorporates = {
  RequestMethod: "ServiceManager.GetAllCorporates",
};

const GetAllNatureOfBussiness = {
  RequestMethod: "ServiceManager.GetAllNatureOfBussiness",
};

const GetAllCorporateUsers = {
  RequestMethod: "ServiceManager.GetAllCorporateUsers",
};

const GetCorporateUserByUserID = {
  RequestMethod: "ServiceManager.GetCorporateUserByUserID",
};

const RoleList = {
  RequestMethod: "ServiceManager.RoleList",
};

const GetCounterPartyNames = {
  RequestMethod: "ServiceManager.GetCounterPartyNames",
};

export {
  authenticationRefreshToken,
  UpdateCorporateMapping,
  Addcateogry,
  UpdateCategory,
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
  CreateBankUserRequest,
  CreateBulkBankUserRequest,
  CreateCorporateUserRequest,
  CreateBulkCorporateUserRequest,
  BankUsersBankList,
  CorporateUsersBulkList,
  SearchCorporateUsers,
  SearchBankUsers,
  UpdateCorporateUsers,
  GetBankUserByUserID,
  UpdateBankUserByUserID,
  GetVolmeterByBankID,
  AddUpdateVolmeter,
  UpdateVolmeterByDealer,
  UpdateVolMeterSettingByBankId,
  GetVolMeterSettingByBankId,
  GetAllBankUsers,
  GetAllCategories,
  GetAllCorporates,
  GetAllNatureOfBussiness,
  GetAllCorporateUsers,
  GetCorporateUserByUserID,
  RoleList,
  GetCounterPartyNames,
};
