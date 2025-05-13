import React from "react";
import AddCorporateUser from "./AddCorporateUser/AddCorporateUser";
import { useCorporateUser } from "./utils/CorporateUserContext";
import CorporateBulkUploadModal from "./CorporateBulkUploadModal/CorporateBulkUploadModal";
import { useSelector } from "react-redux";
import CorporatePlusIconModal from "../CorporateUser/CorporatePlusIconModal/CorporatePlusIconModal";
import EditCompanyModal from "../CorporateUser/EditCompanyModal/EditCompanyModal";

const CorporateUser = () => {
  const { BulkUploadClicked, editCompanyData } = useCorporateUser();

  //Add Company Use Modal Calling
  const PlusIconCorporateModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.corporatePlusIconModal
  );

  //Edit Company Use Modal Calling
  const editCompanyModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editCompanyModal
  );
  return (
    <>
      <AddCorporateUser />
      {BulkUploadClicked && <CorporateBulkUploadModal />}
      {PlusIconCorporateModalGobalState && <CorporatePlusIconModal />}
      {editCompanyModalGobalState && (
        <EditCompanyModal editCompanyData={editCompanyData} />
      )}
    </>
  );
};

export default CorporateUser;
