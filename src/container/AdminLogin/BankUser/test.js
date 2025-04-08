// const handleConfirmationYes = useCallback(() => {
//     let employeeID = addBankUser.EmployeeID.value;

//     // First, check if the EmployeeID exists in the SearchBankUsers response
//     const employeeExists = SearchBankUsers?.bankUsers?.some(
//       user => user.employeeID === employeeID
//     );

//     if (employeeExists) {
//       // Show error message if EmployeeID already exists
//       setErrorShow(true);
//       setAddBankUser({
//         ...addBankUser,
//         EmployeeID: {
//           ...addBankUser.EmployeeID,
//           errorMessage: "This Employee ID already exists in the system",
//           errorStatus: true,
//         },
//       });
//       setSaveClicked(false);
//       return; // Exit the function early
//     }

//     // Then check if it's greater than the last dummy ID
//     if (parseInt(employeeID) > parseInt(dummyEmployeeIDs[dummyEmployeeIDs.length - 1])) {
//       setErrorShow(false);

//       // Extract LDAPAccount from email (part before "@")
//       const ldapAccountValue = addBankUser.email.value.split("@")[0];

//       // Prepare the data for API request
//       let newData = {
//         BankId: 1, // Default bank ID
//         User: {
//           UserID: 0, // Assuming this is a new user
//           FirstName: addBankUser.firstName.value,
//           Lastname: "Branch User", // Default value
//           Email: addBankUser.email.value,
//           ContactNumber: addBankUser.Contact.value,
//           LDAPAccount: ldapAccountValue, // Use the extracted LDAPAccount
//           FailedAttemptCount: 0, // Default value
//           UserRoleID: 9,
//           EmployeeID: addBankUser.EmployeeID.value,
//           Branch: {
//             BranchID: addBankUser.branchID.value,
//           },
//         },
//       };

//       console.log("newData", newData);
//       dispatch(CreateBankUserRequestAPI(navigate, newData));
//     } else {
//       // Show error if EmployeeID is not unique
//       setErrorShow(true);
//       setAddBankUser({
//         ...addBankUser,
//         EmployeeID: {
//           ...addBankUser.EmployeeID,
//           errorStatus: true,
//         },
//       });
//     }

//     // Reset saveClicked state
//     setSaveClicked(false);
//   }, [addBankUser, SearchBankUsers]);
