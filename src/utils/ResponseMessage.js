import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../components/elements";
import { useDispatch } from "react-redux";
import { clearResponseMessageBopSystemAdmin } from "../store/actions/BOPSystemAdminActions";

const ResponseMessage = () => {
  const dispatch = useDispatch()
  const BOPSystemAdminReducerResponseMessage = useSelector(
    (state) => state.BOPSystemAdminReducer.ResponseMessage
  );
  console.log(BOPSystemAdminReducerResponseMessage);
  useEffect(() => {
    if (BOPSystemAdminReducerResponseMessage !== "") {
      setOpen({ open: true, message: BOPSystemAdminReducerResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
        dispatch(clearResponseMessageBopSystemAdmin())
      }, 4000); // 4 seconds timeout for the snackbar message to disappear.
    }
  }, [BOPSystemAdminReducerResponseMessage]);
  //Checking snakbar state
  const [open, setOpen] = useState({ open: false, message: "" });
  return (
    <Notification setOpen={setOpen} open={open.open} message={open.message} />
  );
};

export default ResponseMessage;
