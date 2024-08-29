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

    default:
      return { ...state };
  }
};

export default BOPSystemAdminModal;
