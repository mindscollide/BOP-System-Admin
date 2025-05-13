import React from "react";
import AddCorporateUser from "./AddCorporateUser/AddCorporateUser";
import { useCorporateUser } from "./utils/CorporateUserContext";
import CorporateBulkUploadModal from "./CorporateBulkUploadModal/CorporateBulkUploadModal";

const CorporateUser = () => {
  const { BulkUploadClicked } = useCorporateUser();

  return (
    <>
      <AddCorporateUser />
      {BulkUploadClicked && <CorporateBulkUploadModal />}
    </>
  );
};

export default CorporateUser;
