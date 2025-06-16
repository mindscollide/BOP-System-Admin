import React, { Fragment, useEffect, useState } from "react";
import BOPLOGO from "../../../assets/images/logo2.png";
import { Col } from "react-bootstrap";
import styles from "./Loader.module.css";
import { useSelector } from "react-redux";

const Loader = () => {
  const [showLoading, setShowLoading] = useState(false);
  const AddCategoryLoader = useSelector((state) => state.AddCategory.Loading);
  const BOPSystemAdminModalloader = useSelector(
    (state) => state.BOPSystemAdminModal.Loading
  );
  const BOPSystemAdminReducerloader = useSelector(
    (state) => state.BOPSystemAdminReducer.Loading
  );
  const CorporateUsersReducerloader = useSelector(
    (state) => state.CorporateUsersReducer.Loading
  );
  const SetupTradeAccessManagementReducerloader = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.Loading
  );
  const SpreadManagementReducer = useSelector(
    (state) => state.SpreadManagementReducer.Loading
  );
  const authloader = useSelector((state) => state.auth.Loading);
  const downloadReducerloader = useSelector(
    (state) => state.downloadReducer.Loading
  );
  const settingsReducerloader = useSelector(
    (state) => state.settingsReducer.Loading
  );
  const uploadReducerloader = useSelector(
    (state) => state.uploadReducer.Loading
  );

  const isLoading = [
    AddCategoryLoader,
    BOPSystemAdminModalloader,
    BOPSystemAdminReducerloader,
    CorporateUsersReducerloader,
    SetupTradeAccessManagementReducerloader,
    SpreadManagementReducer,
    authloader,
    downloadReducerloader,
    settingsReducerloader,
    uploadReducerloader,
  ];

  useEffect(() => {}, []);
  return (
    <Col sm={12} md={12} lg={12} className={styles["overlay"]}>
      <Col sm={12} md={12} lg={12} className={styles["overlay-content"]}>
        <img src={BOPLOGO} width={200} alt="" />
        <span className={styles["loader-line"]}></span>
      </Col>
    </Col>
  );
};

export default Loader;
