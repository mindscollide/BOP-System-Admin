import * as actions from "../action_types";

const AdduserModalSystemAdmin = (response, message) => {
  return {
    type: actions.ADD_BANK_USER_MODAL,
    response: response,
    message: message,
  };
};

const EditCorporateModalSystemAdmin = (response, message) => {
  return {
    type: actions.EDIT_CORPORATE_MODAL,
    response: response,
    message: message,
  };
};

const DeleteCorporateModalSystemAdmin = (response, message) => {
  return {
    type: actions.DELETE_CORPORATE_MODAL,
    response: response,
    message: message,
  };
};

const UserDetailsCorporateModalSystemAdmin = (response, message) => {
  return {
    type: actions.USER_DETAILS_CORPORATE_MODAL,
    response: response,
    message: message,
  };
};

const AddCategoryModalSystemAdmin = (response, message) => {
  return {
    type: actions.ADD_CATEGORY_MODAL,
    response: response,
    message: message,
  };
};

const corporatePlusIconModalSystemAdmin = (response, message) => {
  return {
    type: actions.CORPORATE_PLUS_ICON_MODAL,
    response: response,
    message: message,
  };
};

const editCompanyModalSystemAdmin = (response, message) => {
  return {
    type: actions.CORPORATE_EDIT_COMPANY_MODAL,
    response: response,
    message: message,
  };
};

const editBankUserModalSystemAdmin = (response, message) => {
  return {
    type: actions.EDIT_BANK_USER_MODAL,
    response: response,
    message: message,
  };
};

const editTradeAccessManagementModalSystemAdmin = (response, message) => {
  return {
    type: actions.EDIT_TRADE_ACCESS_MANAGMENT_MODAL,
    response: response,
    message: message,
  };
};

export {
  AdduserModalSystemAdmin,
  EditCorporateModalSystemAdmin,
  DeleteCorporateModalSystemAdmin,
  UserDetailsCorporateModalSystemAdmin,
  AddCategoryModalSystemAdmin,
  corporatePlusIconModalSystemAdmin,
  editCompanyModalSystemAdmin,
  editBankUserModalSystemAdmin,
  editTradeAccessManagementModalSystemAdmin,
};
