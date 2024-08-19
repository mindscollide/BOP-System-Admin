import React from "react";
import styles from "./upload.module.css";
import { Box } from "@material-ui/core";
const CustomUpload = ({ change, onClick, disable }) => {
  return (
    <Box display="flex">
      {/* <Input value={file} disabled={file ? false : true} /> */}
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={change}
        disabled={disable}
        onClick={onClick}
        // size={1000}
        accept=".doc, .docx, .xls, .xlsx,.pdf,.png,.txt,.jpg, .jpeg,.gif"
        // maxfilesize={10000000}
      />
      <label
        htmlFor="contained-button-file"
        className={styles["ButtonForUpload"]}
      >
        <span className={styles["Heading"]}>Bulk Upload</span>
      </label>
    </Box>
  );
};

export default CustomUpload;
