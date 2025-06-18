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
  RequestMethod: "ServiceManager.DeleteCategory",
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
const BankUsersBulkList = {
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
  RequestMethod: "ServiceManager.GetAllCategoryDetailsWithCounterParties",
};

const GetAllCorporatesData = {
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

const GetBankUserRoles = {
  RequestMethod: "ServiceManager.GetBankUserRoles",
};

const GetCounterPartyNames = {
  RequestMethod: "ServiceManager.GetCounterPartyNames",
};
const GetAllInstruments = {
  RequestMethod: "ServiceManager.GetAllInstruments",
};
const GetAllInstrumentTypes = {
  RequestMethod: "ServiceManager.GetAllInstrumentTypes",
};

const GetUserSettings = {
  RequestMethod: "ServiceManager.GetUserSettings",
};

const UpdateUserSettings = {
  RequestMethod: "ServiceManager.UpdateUserSettings",
};

const IsEmployeeIDExists = {
  RequestMethod: "ServiceManager.IsEmployeeIDExists",
};
const SearchAllUserLoginHistory = {
  RequestMethod: "ServiceManager.SearchAllUserLoginHistory",
};
const GetMarketTimeSettings = {
  RequestMethod: "ServiceManager.GetMarketTimeSettings",
};

const SaveMarketTimeSettings = {
  RequestMethod: "ServiceManager.SaveMarketTimeSettings",
};

const LogoutRM = {
  RequestMethod: "ServiceManager.LogOut",
};

const GetCounterPartyList = {
  RequestMethod: "ServiceManager.GetCounterPartyList",
};

const GetCorporatesWithStatus = {
  RequestMethod: "ServiceManager.GetCorporatesWithStatus",
};

const UpdateCorporateStatus = {
  RequestMethod: "ServiceManager.UpdateCorporateStatus",
};

const GetCorporateTradeRights = {
  RequestMethod: "ServiceManager.GetCorporateTradeRights",
};

const GetBranchesWithStatus = {
  RequestMethod: "ServiceManager.GetBranchesWithStatus",
};

const UpdateBranchStatus = {
  RequestMethod: "ServiceManager.UpdateBranchStatus",
};

const GetBranchTradeRights = {
  RequestMethod: "ServiceManager.GetBranchTradeRights",
};

const UpdateBranchTradeRights = {
  RequestMethod: "ServiceManager.UpdateBranchTradeRights",
};

const UpdateCorporateTradeRights = {
  RequestMethod: "ServiceManager.UpdateCorporateTradeRights",
};
const UpdateBranchCategoryMappingapi = {
  RequestMethod: "ServiceManager.UpdateBranchCategoryMapping",
};

const GetSpotSpreadsForCategory = {
  RequestMethod: "ServiceManager.GetSpotSpreadsForCategory",
};
const GetCrossRateSpreadsForCategory = {
  RequestMethod: "ServiceManager.GetCrossRateSpreadsForCategory",
};

const GetTenorWiseForwardSpreadsForCategory = {
  RequestMethod: "ServiceManager.GetTenorWiseForwardSpreadsForCategory",
};
const GetTenorWiseFEDiscountingSpreadsForCategory = {
  RequestMethod: "ServiceManager.GetTenorWiseFEDiscountingSpreadsForCategory",
};

const GetAllTenors = {
  RequestMethod: "ServiceManager.GetAllTenors",
};

const GetTenorWiseNonFEDiscountingSpreadsForCategory = {
  RequestMethod:
    "ServiceManager.GetTenorWiseNonFEDiscountingSpreadsForCategory",
};

const SaveCategoryParitySpot = {
  RequestMethod: "ServiceManager.SaveCategoryParitySpot",
};

const SaveCategoryCrossRates = {
  RequestMethod: "ServiceManager.SaveCategoryCrossRates",
};

const SaveCategoryForwards = {
  RequestMethod: "ServiceManager.SaveCategoryForwards",
};

const GetAllTrades = {
  RequestMethod: "ServiceManager.GetAllTrades",
};

const SaveCategoryFEDiscounts = {
  RequestMethod: "ServiceManager.SaveCategoryFEDiscounts",
};

const SaveCategoryNonFEDiscounts = {
  RequestMethod: "ServiceManager.SaveCategoryNonFEDiscounts",
};

const DownloadCorporateUserListSystemAdminReport = {
  RequestMethod: "ServiceManager.DownloadCorporateUserListSystemAdminReport",
};
export {
  LogoutRM,
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
  BankUsersBulkList,
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
  GetBankUserRoles,
  GetCounterPartyNames,
  GetAllInstruments,
  GetAllInstrumentTypes,
  GetUserSettings,
  UpdateUserSettings,
  IsEmployeeIDExists,
  SearchAllUserLoginHistory,
  GetMarketTimeSettings,
  SaveMarketTimeSettings,
  GetCounterPartyList,
  GetCorporatesWithStatus,
  GetBranchesWithStatus,
  UpdateCorporateStatus,
  UpdateBranchStatus,
  GetCorporateTradeRights,
  GetBranchTradeRights,
  UpdateBranchTradeRights,
  UpdateCorporateTradeRights,
  UpdateBranchCategoryMappingapi,
  GetSpotSpreadsForCategory,
  GetCrossRateSpreadsForCategory,
  GetTenorWiseForwardSpreadsForCategory,
  GetAllCorporatesData,
  GetTenorWiseFEDiscountingSpreadsForCategory,
  GetAllTenors,
  GetTenorWiseNonFEDiscountingSpreadsForCategory,
  SaveCategoryParitySpot,
  SaveCategoryCrossRates,
  SaveCategoryForwards,
  GetAllTrades,
  SaveCategoryFEDiscounts,
  SaveCategoryNonFEDiscounts,
  DownloadCorporateUserListSystemAdminReport,
};
