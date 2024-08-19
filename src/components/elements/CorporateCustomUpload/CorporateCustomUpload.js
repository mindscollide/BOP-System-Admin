import React from "react";
import styles from "./CorporateCustomUpload.module.css";
import { Box } from "@material-ui/core";
const CorporateCustomUpload = ({ change, onClick, disable }) => {
  return (
    <Box display="flex">
      <input
        className={styles.uploadText}
        id="contained-button-file"
        type="file"
        onChange={change}
        disabled={disable}
        onClick={onClick}
        accept=".doc, .docx, .xls, .xlsx,.pdf,.png,.txt,.jpg, .jpeg,.gif"
      />
      <label
        htmlFor="contained-button-file"
        className={styles["OuterBodyCustomUpload"]}
      >
        <span className={styles["PlusIcon"]}>+</span>
      </label>
    </Box>
  );
};

export default CorporateCustomUpload;
