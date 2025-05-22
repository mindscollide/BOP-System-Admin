export const addBranchSchema = {
  bankID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchCode: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  categoryID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchContact: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const updateBranchSchema = {
  branchID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchCode: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchContact: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const addBankUserSchema = {
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  firstName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  lastName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  email: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Contact: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  ldapAccount: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  roleID: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
  branchID: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
  EmployeeID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  category: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const viewCounterModalSchema = {
  counterFileType: {
    value: 3,
    errorMessage: "",
    errorStatus: false,
  },
  corporateName: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  avaliableLimit: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  instrumentName: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  weightage: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },

  instrumentAvaliableLimit: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
};

export const counterModalFieldSchema = {
  corporateName: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  avaliableLimit: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  instumentNameTbill: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  instumentNamePib: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  instumentNameSukuk: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const viewCustomerSchema = {
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  FirstName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  LastName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  Category: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  corporateID: {
    value: "",
    label: "",
    errorMessage: "",
    errorStatus: false,
  },

  selectShield: 0,
  fieldOneTwoThree: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const corporateListSchema = {
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  CorporateName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Email: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  categoryID: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const addCorporateUserSchema = {
  firstName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  email: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  contactNumber: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  companyName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  isChatActive: {
    value: false,
    errorMessage: "",
    errorStatus: false,
  },

  isFEActive: {
    value: false,
    errorMessage: "",
    errorStatus: false,
  },

  isNonFEActive: {
    value: false,
    errorMessage: "",
    errorStatus: false,
  },

  corporateID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  category: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  categoryName: { value: "", errorMessage: "", errorStatus: false },
  natureOfClient: { value: "", errorMessage: "", errorStatus: false },
  rfqTreasury: { value: "", errorMessage: "", errorStatus: false },
  rfqCorporate: { value: "", errorMessage: "", errorStatus: false },
};

export const addCompanySchema = {
  companyName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  category: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  RFQTimerTreasury: {
    value: 3,
    label: "3 Minutes",
    errorMessage: "",
    errorStatus: false,
  },

  RFQTimerCorporate: {
    value: 3,
    label: "3 Minutes",
    errorMessage: "",
    errorStatus: false,
  },
  natureOfClient: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
};

export const updateCorporateUserSchema = {
  firstName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  email: { value: "", errorMessage: "", errorStatus: false },
  corporateName: {
    value: "",
    categoryID: 0,
    errorMessage: "",
    errorStatus: false,
  },
  RFQTimerTreasury: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
  RFQTimerCorporate: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
  activeUser: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
};

export const bankListSchema = {
  EmployeeID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Email: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  roleID: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const updateBankUserSchema = {
  firstName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },

  email: { value: "", errorMessage: "", errorStatus: false },

  roleID: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
  ContactNumber: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  activeUser: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
  userID: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
  branch: null,
};

export const loginHistorySchema = {
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  CounterPartyName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Email: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Role: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  category: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  dateFrom: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  dateTo: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const tradeCountSchema = {
  TxnID: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  clientName: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  side: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Amount: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  LC: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  AccountNumber: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  dateFrom: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  dateTo: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  natureOfClient: {
    value: 0,
    errorMessage: "",
    errorStatus: false,
  },
};
export const updateCorporateDataSchema = {
  TotalLimit: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  InstrumentType: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
  DefaultMinAmountLimit: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  DefaultMaxAmountLimit: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const addCategroyModalSchema = {
  Name: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Bid: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
  Offer: {
    value: "",
    errorMessage: "",
    errorStatus: false,
  },
};

export const tradeAccessManagementSchema = {
  searchCorporate: {
    value: "",
  },
  searchBranch: {
    value: "",
  },
};

export const SpreadManagementSchema = {
  categoryID: {
    value: 0,
    label: "",
    errorMessage: "",
    errorStatus: false,
  },
};
