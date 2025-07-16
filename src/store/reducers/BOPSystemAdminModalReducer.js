import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  addBankUserModal: false,
  editCorporateModal: false,
  deleteCorporateModal: false,
  userDetailsCorporateModal: false,
  addCategoryModal: false,
  corporatePlusIconModal: false,
  editCompanyModal: false,
  editBankUserModal: false,
  editModalTradeAccessManagement: false,
  addBankUserConfirmationModal: false,
  confirmationModal: false,
  tradeCountCommentModal: false,
  BankBulkUploadModal: false,
  deleteCategoryModal: false,
};

const BOPSystemAdminModal = (state = initialState, action) => {
  switch (action.type) {
    case actions.ADD_BANK_USER_MODAL: {
      return {
        ...state,
        addBankUserModal: action.response,
      };
    }

    case actions.EDIT_CORPORATE_MODAL: {
      return {
        ...state,
        editCorporateModal: action.response,
      };
    }

    case actions.DELETE_CORPORATE_MODAL: {
      return {
        ...state,
        deleteCorporateModal: action.response,
      };
    }

    case actions.USER_DETAILS_CORPORATE_MODAL: {
      return {
        ...state,
        userDetailsCorporateModal: action.response,
      };
    }

    case actions.ADD_CATEGORY_MODAL: {
      return {
        ...state,
        addCategoryModal: action.response,
      };
    }

    case actions.CORPORATE_PLUS_ICON_MODAL: {
      return {
        ...state,
        corporatePlusIconModal: action.response,
      };
    }

    case actions.CORPORATE_EDIT_COMPANY_MODAL: {
      return {
        ...state,
        editCompanyModal: action.response,
      };
    }

    case actions.EDIT_BANK_USER_MODAL: {
      return {
        ...state,
        editBankUserModal: action.response,
      };
    }

    case actions.EDIT_TRADE_ACCESS_MANAGMENT_MODAL: {
      return {
        ...state,
        editModalTradeAccessManagement: action.response,
      };
    }

    // **********Modal For Confirmation*******************************by Yunus
    case actions.ADD_BANK_USER_CONFIRMATION_MODAL: {
      return {
        ...state,
        addBankUserConfirmationModal: action.response,
      };
    }

    case actions.CONFIRMATION_MODAL: {
      return {
        ...state,
        confirmationModal: action.response,
      };
    }

    case actions.TRADE_COUNT_COMMENT_MODAL: {
      return {
        ...state,
        tradeCountCommentModal: action.response,
      };
    }

    case action.BULK_UPLOAD_BANK_MODAL: {
      return {
        ...state,
        BankBulkUploadModal: action.response,
      };
    }

    case actions.DELETE_CATEGORY_MODAL: {
      return {
        ...state,
        deleteCategoryModal: action.response,
      };
    }

    case actions.CLEAR_RESPONSEMESSAGE_BOPSYSTEMADMINREDUCERMODAL: {
      return {
        ...state,
        ResponseMessage: "",
      };
    }

    default:
      return { ...state };
  }
};

export default BOPSystemAdminModal;
