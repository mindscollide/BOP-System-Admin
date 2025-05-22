import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Notification } from "../components/elements";

const ResponseMessage = () => {
  const BOPSystemAdminReducerResponseMessage = useSelector(
    (state) => state.BOPSystemAdminReducer.ResponseMessage
  );
  console.log(BOPSystemAdminReducerResponseMessage);
  useEffect(() => {
    if (BOPSystemAdminReducerResponseMessage !== "") {
      setOpen({ open: true, message: BOPSystemAdminReducerResponseMessage });
      setTimeout(() => {
        setOpen({ open: false, message: "" });
      }, 5000); // 5 seconds timeout for the snackbar message to disappear.
    }
  }, [BOPSystemAdminReducerResponseMessage]);
  //Checking snakbar state
  const [open, setOpen] = useState({ open: false, message: "" });
  return (
    <Notification setOpen={setOpen} open={open.open} message={open.message} />
  );
};

export default ResponseMessage;
