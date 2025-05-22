import React from "react";
import styles from "./CorporateCustomUpload.module.css";
const CorporateCustomUpload = ({ change, onClick, disable }) => {
  return (
    <>
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
    </>
  );
};

export default CorporateCustomUpload;
