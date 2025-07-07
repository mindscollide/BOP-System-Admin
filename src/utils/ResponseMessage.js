import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../components/elements";
import { useDispatch } from "react-redux";
import { clearResponseMessageBopSystemAdmin } from "../store/actions/BOPSystemAdminActions";
import { clearResponseMessageSettings } from "../store/actions/SettingsActions";
import { clearResponseMessageBopSystemAdminModal } from "../store/actions/BOPSystemAdminModalsActions";
import { clearResponseMessageCorporateUserReducer } from "../store/actions/CorporateUsersAction";
import { clearResponseMessageSetupTradeAccessManagementReducer } from "../store/actions/SetupTradeAccessManagementActions";
import { clearResponseMessageSpreadManagementReducer } from "../store/actions/SpreadManagementActions";
import { clearResponseMessageAuth } from "../store/actions/Auth-Actions";
import { clearResponseMessageDownloadReducer } from "../store/actions/Download-Report";
import { clearResponseMessageUploadReducer } from "../store/actions/Upload-Action";
const ResponseMessage = () => {
  const dispatch = useDispatch();

  const allStates = useSelector((state) => state);
  console.log("allStatesallStates", allStates);

  //BOPSystemAdminReducer
  const BOPSystemAdminReducerResponseMessage = useSelector(
    (state) => state.BOPSystemAdminReducer.ResponseMessage
  );

  //settingsReducer
  const settingsReducerResponseMessage = useSelector(
    (state) => state.settingsReducer.ResponseMessage
  );

  //addCategory
  const AddCategoryResponseMessage = useSelector(
    (state) => state.AddCategory.ResponseMessage
  );

  //BOPSystemAdminModalResponseMessage
  const BOPSystemAdminModalResponseMessage = useSelector(
    (state) => state.BOPSystemAdminModal.ResponseMessage
  );

  //CorporateUsersReducer
  const CorporateUsersReducerResponseMessage = useSelector(
    (state) => state.CorporateUsersReducer.ResponseMessage
  );

  //SetupTradeAccessManagementReducer
  const SetupTradeAccessManagementReducerResponseMessage = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.ResponseMessage
  );

  //SpreadManagementReducer
  const SpreadManagementReducerResponseMessage = useSelector(
    (state) => state.SpreadManagementReducer.ResponseMessage
  );

  //authResponseMessage
  const authResponseMessage = useSelector(
    (state) => state.auth.ResponseMessage
  );

  //downloadReducerResponseMessage
  const downloadReducerResponseMessage = useSelector(
    (state) => state.downloadReducer.ResponseMessage
  );

  //uploadReducer
  const uploadReducerResponseMessage = useSelector(
    (state) => state.uploadReducer.ResponseMessage
  );

  //BOPSystemAdminReducerResponseMessage
  useEffect(() => {
    if (BOPSystemAdminReducerResponseMessage !== "") {
      setOpen({ open: true, message: BOPSystemAdminReducerResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageBopSystemAdmin());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [BOPSystemAdminReducerResponseMessage]);

  //settingsReducer
  useEffect(() => {
    if (settingsReducerResponseMessage !== "") {
      setOpen({ open: true, message: settingsReducerResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageSettings());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [settingsReducerResponseMessage]);

  //addCategory
  useEffect(() => {
    if (AddCategoryResponseMessage !== "") {
      setOpen({ open: true, message: AddCategoryResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(AddCategoryResponseMessage());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [AddCategoryResponseMessage]);

  //BOPSystemAdminModalResponseMessage
  useEffect(() => {
    if (BOPSystemAdminModalResponseMessage !== "") {
      setOpen({ open: true, message: BOPSystemAdminModalResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageBopSystemAdminModal());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [BOPSystemAdminModalResponseMessage]);

  //CorporateUsersReducerResponseMessage
  useEffect(() => {
    if (CorporateUsersReducerResponseMessage !== "") {
      setOpen({ open: true, message: CorporateUsersReducerResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageCorporateUserReducer());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [CorporateUsersReducerResponseMessage]);

  //SetupTradeAccessManagementReducerResponseMessage
  useEffect(() => {
    if (SetupTradeAccessManagementReducerResponseMessage !== "") {
      setOpen({
        open: true,
        message: SetupTradeAccessManagementReducerResponseMessage,
      });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageSetupTradeAccessManagementReducer());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [SetupTradeAccessManagementReducerResponseMessage]);

  //SetupTradeAccessManagementReducerResponseMessage
  useEffect(() => {
    if (SpreadManagementReducerResponseMessage !== "") {
      setOpen({
        open: true,
        message: SpreadManagementReducerResponseMessage,
      });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageSpreadManagementReducer());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [SpreadManagementReducerResponseMessage]);

  //authResponseMessage
  useEffect(() => {
    if (authResponseMessage !== "") {
      setOpen({
        open: true,
        message: authResponseMessage,
      });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageAuth());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [authResponseMessage]);

  //authResponseMessage
  useEffect(() => {
    if (downloadReducerResponseMessage !== "") {
      setOpen({
        open: true,
        message: downloadReducerResponseMessage,
      });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageDownloadReducer());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [downloadReducerResponseMessage]);

  //authResponseMessage
  useEffect(() => {
    if (uploadReducerResponseMessage !== "") {
      setOpen({
        open: true,
        message: uploadReducerResponseMessage,
      });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageUploadReducer());
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [uploadReducerResponseMessage]);

  const [open, setOpen] = useState({ open: false, message: "" });
  return (
    <Notification setOpen={setOpen} open={open.open} message={open.message} />
  );
};

export default ResponseMessage;
