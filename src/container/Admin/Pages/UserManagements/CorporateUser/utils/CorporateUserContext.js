import { createContext, useContext, useState } from "react";

export const CorporateUserContext = createContext();

export const CorporateUserProvider = ({ children }) => {
  const [BulkUploadClicked, setBulkUploadClicked] = useState(false);
  return (
    <CorporateUserContext.Provider
      value={{ BulkUploadClicked, setBulkUploadClicked }}
    >
      {children}
    </CorporateUserContext.Provider>
  );
};
export const useCorporateUser = () => useContext(CorporateUserContext);
