import React, { useEffect, useState } from "react";
import BOPLOGO from "../../../assets/images/logo-hd.png";
import { useSelector } from "react-redux";
import "./Loader.css";

const Loader = () => {
  const [isLoader, setIsLoading] = useState(false);

  const AddCategoryLoader = useSelector((state) => state.AddCategory.Loading);
  const BOPSystemAdminModalloader = useSelector(
    (state) => state.BOPSystemAdminModal.Loading
  );
  const BOPSystemAdminReducerloader = useSelector(
    (state) => state.BOPSystemAdminReducer.Loading
  );
  console.log(BOPSystemAdminReducerloader, "BOPSystemAdminReducerloader");
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
  const globalLoader = useSelector((state) => state.ui.loading);

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
    globalLoader,
  ].some((loading) => loading);

  useEffect(() => {
    let timeout;

    if (isLoading) {
      setIsLoading(true); // Show loader
    } else {
      // Hide loader after a short delay when loading completes
      timeout = setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }

    return () => clearTimeout(timeout);
  }, [isLoading]);

  return (
    isLoader && (
      <div className="body-loader overflow-hidden">
        <div className="body-loader-inner">
          <div className="logo-loader-wrapper">
            <img
              className="img-fluid"
              src={BOPLOGO}
              alt="Section-Loader"
              width={200}
            />
            <div className="loader-line-highlight" />
          </div>
        </div>
      </div>
    )
  );
};

export default Loader;
