import { GetAllBranches } from "../../commen/apis/Api_config";
import * as actions from "../action_types";

const initialState = {
  Loading: false,
  ResponseMessage: "",
  createNewCorporate: null,
  updateCorporateByID: null,
  AddBranchData: null,
  UpdateBranchData: null,
  GetAllBranchesData: null,
};

const BOPSystemAdminModal = (state = initialState, action) => {
  switch (action.type) {
    //Create New Corporate
    case actions.CREATE_NEW_CORPORATE_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.CREATE_NEW_CORPORATE_SUCCESS:
      return {
        ...state,
        Loading: true,
        createNewCorporate: action.response,
        ResponseMessage: action.message,
      };

    case actions.CREATE_NEW_CORPORATE_FAIL:
      return {
        ...state,
        Loading: true,
        createNewCorporate: null,
        ResponseMessage: action.message,
      };
    //Update Corporate By CorporateID
    case actions.UPDATE_CORPORATE_BY_CORPORATEID_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_CORPORATE_BY_CORPORATEID_SUCCESS:
      return {
        ...state,
        Loading: false,
        updateCorporateByID: action.response,
        ResponseMessage: action.message,
      };

    case actions.UPDATE_CORPORATE_BY_CORPORATEID_FAIL:
      return {
        ...state,
        Loading: false,
        updateCorporateByID: null,
        ResponseMessage: action.message,
      };
    //Add Branch
    case actions.ADD_BRANCH_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.ADD_BRANCH_SUCCESS:
      return {
        ...state,
        Loading: true,
        AddBranchData: action.response,
        ResponseMessage: action.message,
      };

    case actions.ADD_BRANCH_FAIL:
      return {
        ...state,
        Loading: true,
        AddBranchData: null,
        ResponseMessage: action.message,
      };
    //Update Branch
    case actions.UPDATE_BRANCH_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.UPDATE_BRANCH_SUCCESS:
      return {
        ...state,
        Loading: true,
        UpdateBranchData: action.response,
        ResponseMessage: action.response,
      };

    case actions.UPDATE_BRANCH_FAIL:
      return {
        ...state,
        Loading: true,
        UpdateBranchData: null,
        ResponseMessage: action.response,
      };
    //Get All Branches
    case actions.GET_ALL_BRANCHES_INIT:
      return {
        ...state,
        Loading: true,
      };

    case actions.GET_ALL_BRANCHES_SUCCESS:
      return {
        ...state,
        Loading: false,
        GetAllBranches: action.response,
        ResponseMessage: action.response,
      };
    case actions.GET_ALL_BRANCHES_FAIL:
      return {
        ...state,
        Loading: false,
        GetAllBranches: null,
        ResponseMessage: action.response,
      };
    default:
      return { ...state };
  }
};
