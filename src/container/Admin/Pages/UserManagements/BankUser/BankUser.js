import React from "react";
import AddBankUser from "./AddBankUser/AddBankuser";
import BankBulkUploadModal from "./BankBulkUploadModal/BankBulkUploadModal";
import { useBankUser } from "./utils/BankUserContext";
import { useSelector } from "react-redux";
import AddBranchModal from "./AddBranchModal/AddBranchModal";
import EditBranchModal from "./EditBranchModal/EditBranchModal";

const BankUser = () => {
  const { BulkUploadClicked, editBranchData } = useBankUser();

  //Add Bank  Use Modal Calling
  const AddBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserModal
  );

  //Edit Bank  Use Modal Calling
  const EditBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editBankUserModal
  );

  return (
    <>
      <AddBankUser />

      {BulkUploadClicked && <BankBulkUploadModal />}
      {AddBankUserModalGobalState && <AddBranchModal />}
      {EditBankUserModalGobalState && (
        <EditBranchModal editBranchData={editBranchData} />
      )}
    </>
  );
};

export default BankUser;
