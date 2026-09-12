import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
} from "react";
import { useSelector, useDispatch } from "react-redux";
import NotificationSnackBar from "../components/common/NotificationSnackbar/NotificationSnackbar";

import { clearResponseMessageAuth } from "../store/actions/Auth-Actions";
import { AddCategoryResponseMessage } from "../store/actions/AddCategoryActions";
import { clearResponseMessageBopSystemAdmin } from "../store/actions/BOPSystemAdminActions";
import { clearResponseMessageBopSystemAdminModal } from "../store/actions/BOPSystemAdminModalsActions";
import { clearResponseMessageCorporateUserReducer } from "../store/actions/CorporateUsersAction";
import { clearResponseMessageSettings } from "../store/actions/SettingsActions";
import { clearResponseMessageSetupTradeAccessManagementReducer } from "../store/actions/SetupTradeAccessManagementActions";
import { clearResponseMessageSpreadManagementReducer } from "../store/actions/SpreadManagementActions";
import { clearResponseMessageDownloadReducer } from "../store/actions/Download-Report";
import { clearResponseMessageUploadReducer } from "../store/actions/Upload-Action";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const timeouts = useRef({});

  const sources = [
    {
      key: "auth",
      msg: useSelector((s) => s.auth?.ResponseMessage),
      severity: useSelector((s) => s.auth?.errorSeverity),
      clear: clearResponseMessageAuth,
    },
    {
      key: "addCategory",
      msg: useSelector((s) => s.AddCategory?.ResponseMessage),
      severity: useSelector((s) => s.AddCategory?.errorSeverity),
      clear: AddCategoryResponseMessage,
    },
    {
      key: "bopSystemAdmin",
      msg: useSelector((s) => s.BOPSystemAdminReducer?.ResponseMessage),
      severity: useSelector((s) => s.BOPSystemAdminReducer?.errorSeverity),
      clear: clearResponseMessageBopSystemAdmin,
    },
    {
      key: "bopSystemAdminModal",
      msg: useSelector((s) => s.BOPSystemAdminModal?.ResponseMessage),
      severity: useSelector((s) => s.BOPSystemAdminModal?.errorSeverity),
      clear: clearResponseMessageBopSystemAdminModal,
    },
    {
      key: "corporateUsers",
      msg: useSelector((s) => s.CorporateUsersReducer?.ResponseMessage),
      severity: useSelector((s) => s.CorporateUsersReducer?.errorSeverity),
      clear: clearResponseMessageCorporateUserReducer,
    },
    {
      key: "settings",
      msg: useSelector((s) => s.settingsReducer?.ResponseMessage),
      severity: useSelector((s) => s.settingsReducer?.errorSeverity),
      clear: clearResponseMessageSettings,
    },
    {
      key: "setupTradeAccessManagement",
      msg: useSelector(
        (s) => s.SetupTradeAccessManagementReducer?.ResponseMessage,
      ),
      severity: useSelector(
        (s) => s.SetupTradeAccessManagementReducer?.errorSeverity,
      ),
      clear: clearResponseMessageSetupTradeAccessManagementReducer,
    },
    {
      key: "spreadManagement",
      msg: useSelector((s) => s.SpreadManagementReducer?.ResponseMessage),
      severity: useSelector((s) => s.SpreadManagementReducer?.errorSeverity),
      clear: clearResponseMessageSpreadManagementReducer,
    },
    {
      key: "download",
      msg: useSelector((s) => s.downloadReducer?.ResponseMessage),
      severity: useSelector((s) => s.downloadReducer?.errorSeverity),
      clear: clearResponseMessageDownloadReducer,
    },
    {
      key: "upload",
      msg: useSelector((s) => s.uploadReducer?.ResponseMessage),
      severity: useSelector((s) => s.uploadReducer?.errorSeverity),
      clear: clearResponseMessageUploadReducer,
    },
  ];

  // Listen to all Redux messages
  useEffect(
    () => {
      sources.forEach(({ key, msg, severity, clear }) => {
        if (!msg || timeouts.current[key]) return;

        const newItem = {
          id: `${key}-${Date.now()}`,
          message: msg,
          source: key,
          severity,
        };
        setMessages((prev) => [...prev, newItem]);

        // Clear after 3 seconds
        timeouts.current[key] = setTimeout(() => {
          dispatch(clear());
          setMessages((prev) => prev.filter((m) => m.source !== key));
          delete timeouts.current[key];
        }, 3000);
      });

      // Cleanup on unmount
      return () => {
        Object.values(timeouts.current).forEach(clearTimeout);
        timeouts.current = {};
      };
    },
    sources.flatMap((s) => [s.msg, s.severity]),
  );

  // Manual trigger — every current call site is a validation/error message,
  // so severity defaults to "error"; pass "success" explicitly if needed.
  const showMessage = useCallback((msg, severity = "error") => {
    const id = `manual-${Date.now()}`;
    const newItem = { id, message: msg, source: "manual", severity };
    setMessages((prev) => [...prev, newItem]);
    setTimeout(() => {
      setMessages((prev) => prev.filter((m) => m.id !== id));
    }, 3000);
  }, []);

  return (
    <NotificationContext.Provider value={{ showMessage }}>
      {children}
      <NotificationSnackBar message={messages} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
