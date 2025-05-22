import { createContext, useContext, useState } from "react";

export const BankUserContext = createContext();

export const BankUserProvider = ({ children }) => {
  const [editBranchData, setEditBranchData] = useState(null);
  const [BulkUploadClicked, setBulkUploadClicked] = useState(false);
  return (
    <BankUserContext.Provider
      value={{
        editBranchData,
        setEditBranchData,
        BulkUploadClicked,
        setBulkUploadClicked,
      }}
    >
      {children}
    </BankUserContext.Provider>
  );
};

export const useBankUser = () => useContext(BankUserContext);
