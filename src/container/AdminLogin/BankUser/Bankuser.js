import React, { useCallback, useEffect, useState } from "react";
import styles from "./Bankuser.module.css";
import { Row, Col } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  CustomUpload,
  Loader,
} from "../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import AddBankUserModal from "./AddBankUserModal/AddBankUserModal";
import {
  AdduserModalSystemAdmin,
  // DeleteCorporateModalSystemAdmin,
  // AddBankUserConfirmationModalSystemAdmin,
  // editBankUserModalSystemAdmin,
  ConfirmationModalSystemAdmin,
  editBankUserModalSystemAdmin,
} from "../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import EditBankUserModal from "./EditBankUserModal/EditBankUserModal";
import { addBankUserSchema } from "../../../utils/schemas";
import {
  BankUsersBulkListAPI,
  CreateBankUserRequestAPI,
} from "../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { validateBopEmail } from "../../../utils/regexUtil";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import {
  GetAllCategoriesAPI,
  GetAllBranchesAPI,
  GetBankUserRolesAPI,
} from "../../../store/actions/Auth-Actions";
import BankBulkUploadModal from "./BankBulkUploadModal/BankBulkUploadModal";

// import {  } from "../../../../store/actions/Auth-Actions";
// import ResponseMessage from "../../../utils/ResponseMessage";
// import ActivateConfirmationModal from "./ActivateConfirmationModal/ActivateConfirmationModal";
const Bankuser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getALlBranches = useSelector((state) => state.auth.GetAllBranchesData);
  //Search all corporate Users
  const SearchBankUsers = useSelector(
    (state) => state.BOPSystemAdminReducer.SearchBankUsersData
  );

  console.log("SearchBankUserSearchBankUser", SearchBankUsers);

  // const { BOPSystemAdminModal } = useSelector((state) => state);
  //Dummy employee ID
  const dummyEmployeeIDs = ["0001", "0002", "0003", "0004"];

  // const modalforactivationconfirmation = useSelector(
  //   (state) => state.BOPSystemAdminModal.deleteCorporateModal
  // );

  // const AddBankUserConfirmationModal = useSelector(
  //   (state) => state.BOPSystemAdminModal.addBankUserConfirmationModal
  // );

  //State for branch options
  const [branchOptions, setBranchOptions] = useState([]);
  console.log("branchOptionsbranchOptions", branchOptions);

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  //Add Bank  Use Modal Calling
  const AddBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserModal
  );

  //

  //Edit Bank  Use Modal Calling
  const EditBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editBankUserModal
  );

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);
  const [rolesOptions, setRolesOptions] = useState([]);

  console.log(rolesOptions, "rolesroles");

  //State for Roles
  const [branchRole, setBranchRole] = useState(null);
  const [role, setRole] = useState({
    label: "",
    value: 0,
  });

  const [editBranchData, setEditBranchData] = useState();

  console.log({ branchRole, role }, "branchRolebranchRole");
  //state for save button
  const [saveClicked, setSaveClicked] = useState(false);

  const [BulkUploadClicked, setBulkUploadClicked] = useState(false);

  //state for cancel button
  const [cancelClicked, setCancelClicked] = useState(false);

  //handle Open AddBankUser Modal
  const handleOpenAddBankUserModal = () => {
    dispatch(AdduserModalSystemAdmin(true));
  };

  //handle Edit AddBankUser Modal
  const handleOpenEditBankUserModal = (branchData) => {
    dispatch(editBankUserModalSystemAdmin(true));
    console.log("branchData", branchData);
    setEditBranchData(branchData);
  };

  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
    ...addBankUserSchema,
  });
  console.log(addBankUser, "addBankUseraddBankUser");

  // Fetch branches on component mount
  useEffect(() => {
    dispatch(GetAllBranchesAPI(navigate));
    dispatch(GetAllCategoriesAPI(navigate));
    dispatch(GetBankUserRolesAPI(navigate));
  }, []);

  useEffect(() => {
    // Check if branch data is available before proceeding
    if (getALlBranches !== null) {
      try {
        // Transform raw branch data into a format suitable for dropdown options (with `value` and `label`)
        let newBranchesData = getALlBranches.branches.map((branch) => {
          return {
            ...branch, // Spread original branch data to retain all properties
            value: branch.branchID, // Assign `branchID` to `value` for dropdown use
            label: branch.branchName, // Assign `branchName` to `label` for dropdown display
          };
        });

        // Update local state with formatted branch options
        setBranchOptions(newBranchesData);

        // If the user role is "Admin" (value === 9) and a branch role is already set (not 0)
        if (role.value === 9 && branchRole.value !== 0) {
          console.log(
            { role, branchRole, newBranchesData },
            "findSelectDatafindSelectData"
          );

          // Proceed only if we have at least one branch option
          if (newBranchesData.length > 0) {
            // Attempt to find the branch option that matches the current `branchRole.value`
            let findSelectData = newBranchesData.find(
              (data) => data.value === branchRole.value
            );

            console.log(findSelectData, "findSelectDatafindSelectData");

            // If a matching branch is found, update `branchRole` with the full branch object
            if (findSelectData !== undefined) {
              setBranchRole(findSelectData);
            }
          }
        }
      } catch (error) {
        // Log any error that occurs while processing branches
        console.log("Error in mapping Branches", error);
      }
    }

    console.log("branchOptionsare", branchOptions);

    // Check if role list data is available before proceeding
    if (RoleList !== null) {
      try {
        // Transform raw roles into format suitable for dropdown options
        let newRolesData = RoleList.roles.map((role) => {
          return {
            ...role, // Spread original role data
            value: role.roleID, // Assign `roleID` to `value` for dropdown use
            label: role.roleName, // Assign `roleName` to `label` for display
          };
        });

        // Update local state with formatted role options
        setRolesOptions(newRolesData);
      } catch (error) {
        // Handle any errors in role mapping
        console.error("Error in mapping Roles", error);
      }
    }
  }, [getALlBranches, RoleList]); // Dependency array: re-run effect when branches or roles change

  //add bank user security admin validate handler
  const addBankUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;
    if (name === "EmployeeID") {
      let valueCheck = value.replace(/[^0-9]/g, "");

      if (valueCheck !== "") {
        let errorMessage = "";
        let errorStatus = false;

        // Check if the length is less than 4 digits
        if (valueCheck.length < 4) {
          errorMessage = "ID must be 4 digits";
          errorStatus = true;
        }
        // Check if the ID already exists in dummyEmployeeIDs
        else if (dummyEmployeeIDs.includes(valueCheck)) {
          errorMessage = `Employee ID till ${
            dummyEmployeeIDs[dummyEmployeeIDs.length - 1]
          } is already used`;
          errorStatus = true;
        }

        setAddBankUser({
          ...addBankUser,
          EmployeeID: {
            value: valueCheck.trimStart(),
            errorMessage: errorMessage,
            errorStatus: errorStatus,
          },
        });
      } else {
        setAddBankUser({
          ...addBankUser,
          EmployeeID: {
            value: "",
            errorMessage: "ID must be 4 digits",
            errorStatus: true,
          },
        });
      }
    }

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAddBankUser({
        ...addBankUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "roleID" && value !== "") {
      // let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          roleID: {
            value: value,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setAddBankUser({
        ...addBankUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "ldapAccount" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          ldapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
          email: {
            value: value.trimStart() + "@bop.com",
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ldapAccount" && value === "") {
      setAddBankUser({
        ...addBankUser,
        ldapAccount: { value: "", errorMessage: "", errorStatus: false },
        email: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          Contact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Contact" && value === "") {
      setAddBankUser({
        ...addBankUser,
        Contact: { value: "", errorMessage: "", errorStatus: true },
      });
    }

    if (name === "email" && value !== "") {
      // Remove all spaces from the input
      const trimmedValue = value.replace(/\s+/g, "");

      if (trimmedValue !== "") {
        setAddBankUser({
          ...addBankUser,
          email: {
            value: trimmedValue,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setAddBankUser({
        ...addBankUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  const bankSelectRoleHandler = async (selectedRole) => {
    setRole(selectedRole);
    if (selectedRole.value === 9 && branchOptions.length > 0) {
      const firstBranchOption = branchOptions[0];
      console.log(firstBranchOption, "firstBranchOptionfirstBranchOption");
      setBranchRole(firstBranchOption);
      setAddBankUser({
        ...addBankUser,
        category: {
          value: firstBranchOption.categoryName,
        },
      });
    } else {
      setBranchRole(null);
      setAddBankUser({
        ...addBankUser,
        category: {
          value: "",
        },
      });
    }
  };

  const branchSelectRoleHandler = async (selectedBranch) => {
    console.log(selectedBranch, "selectroleselectroleselectrole");
    setBranchRole(selectedBranch);
    setAddBankUser({
      ...addBankUser,
      category: {
        value: selectedBranch.categoryName,
      },
    });
    // setAddBankUser((prevState) => ({
    //   ...prevState,
    //   // category: selectedBranch.categoryName,
    //   branchID: { BranchID: selectedBranch.value },
    // }));
  };

  const handleCancelButton = () => {
    setCancelClicked(true);
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleCancelYes = () => {
    setBranchRole(null);
    setRole({
      value: 0,
      label: "",
    });
    setAddBankUser({
      ...addBankUser,

      EmployeeID: {
        value: "",
      },
      firstName: {
        value: "",
      },

      ldapAccount: {
        value: "",
      },

      email: {
        value: "",
      },

      Contact: {
        value: "",
      },

      roleID: {
        value: "",
      },
      branchID: {
        value: 0,
      },
    });
    setCancelClicked(false);
  };
  // show error message When user hit activate btn
  const handleActivateButton = () => {
    setSaveClicked(true);
    if (validateBopEmail(addBankUser.email.value)) {
      setErrorShow(false);
      dispatch(ConfirmationModalSystemAdmin(true));
    } else {
      setErrorShow(true);
    }
  };

  const handleConfirmationYes = useCallback(() => {
    let employeeID = addBankUser.EmployeeID.value;

    // Check if EmployeeID is unique and greater than the last dummy ID
    if (
      parseInt(employeeID) >
      parseInt(dummyEmployeeIDs[dummyEmployeeIDs.length - 1])
    ) {
      setErrorShow(false);

      // Extract LDAPAccount from email (part before "@")
      const ldapAccountValue = addBankUser.email.value.split("@")[0];

      // Prepare the data for API request
      let newData = {
        BankId: 1, // Default bank ID
        User: {
          UserID: 0, // Assuming this is a new user
          FirstName: addBankUser.firstName.value,
          Lastname: "", // Default value
          Email: addBankUser.email.value,
          ContactNumber: addBankUser.Contact.value,
          LDAPAccount: ldapAccountValue, // Use the extracted LDAPAccount
          FailedAttemptCount: 0, // Default value
          UserRoleID: role.value, // Role ID from the form
          // UserRoleID: 9,
          EmployeeID: addBankUser.EmployeeID.value,
          Branch:
            role.value === 9
              ? {
                  BranchID: branchRole.value, // Include BranchID inside a Branch object
                }
              : null,
        },
      };

      // Add branchID only if the role is "Branch" (roleID === 7)
      // if (addBankUser.roleID.value === 7) {
      //   newData.User.branchID = addBankUser.branchID.value;
      // }

      console.log("newData", newData);

      // Dispatch API request to create the bank user
      dispatch(CreateBankUserRequestAPI(navigate, newData));
    } else {
      // Show error if EmployeeID is not unique
      setErrorShow(true);
      setAddBankUser({
        ...addBankUser,
        EmployeeID: {
          ...addBankUser.EmployeeID,
          errorStatus: true,
        },
      });
      // }
    }

    // Reset saveClicked state
    setSaveClicked(false);
  }, [addBankUser]);

  // Handle File upload
  const HandleFileUpload = (event) => {
    // setBulkUploadClicked(true);
    console.log(event, "datadata");
    const { files } = event.target;
    console.log(files, "filesfiles");
    if (files !== undefined && files.length > 0) {
      let ext = files[0].name.split(".").pop();
      console.log("uploadedFileuploadedFile", ext);
      if (ext === "xls" || ext === "xlsx") {
        let fileData = files[0];
        dispatch(
          BankUsersBulkListAPI(navigate, fileData, setBulkUploadClicked)
        );
        // dispatch(FileBulkUpload(navigate, uploadedFile, setUploadModal));
      } else {
        alert("Invalid type");
      }

      event.target.value = null;
    }
    // // const UploadFile = data.target;
    // const uploadedFile = data.target.files[0];
    // // console.log("UploadFileUploadFile", UploadFile);
    // console.log("uploadedFileuploadedFile", uploadedFile);
    // var ext = uploadedFile.name.split(".").pop();
  };

  return (
    <section className={styles["Container_bank_user"]}>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-start m-0 p-0"
            >
              <span className={styles["bank-user-label"]}>Add a Bank user</span>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col lg={12} md={12} sm={12} className="m-0 p-0">
              <Paper className={styles["bankuser-paper"]}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Employee ID
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>

                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"EmployeeID"}
                          labelClass="d-none"
                          value={addBankUser.EmployeeID.value}
                          maxLength={4}
                          onChange={addBankUserValidateHandler}
                        />
                        {addBankUser.EmployeeID.errorStatus && (
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <p className={styles["bankErrorMessage"]}>
                                {addBankUser.EmployeeID.errorMessage}
                              </p>
                            </Col>
                          </Row>
                        )}
                        {/* <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow && addBankUser.EmployeeID.errorStatus
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              Employee ID till{" "}
                              {dummyEmployeeIDs[dummyEmployeeIDs.length - 1]}{" "}
                              number is already used{" "}
                            </p>
                          </Col>
                        </Row> */}
                      </Col>

                      <Col lg={4} md={4} sm={4}>
                        <CustomUpload change={HandleFileUpload} />
                        {/* <CustomUpload onClick={handleCustomUploadClick} /> */}
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Treasury Person Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"firstName"}
                          value={addBankUser.firstName.value}
                          maxLength={50}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          User Role
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          options={rolesOptions}
                          value={role}
                          onChange={bankSelectRoleHandler}
                          isSearchable={true}
                          classNamePrefix={"selectCateogyCorporateList"}
                        />

                        {/* <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow && addBankUser.roleID.value === ""
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              Role is required
                            </p>
                          </Col>
                        </Row> */}
                      </Col>
                    </Row>

                    {role.value === 9 && (
                      <>
                        <Row className="mt-3 position-relative">
                          <Col lg={2} md={2} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Select Branch
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                          </Col>

                          <Col
                            lg={5}
                            md={5}
                            sm={12}
                            className="position-relative"
                          >
                            <Select
                              options={branchOptions}
                              placeholder="Select Branch"
                              value={branchRole.value !== 0 ? branchRole : null}
                              onChange={branchSelectRoleHandler}
                              isSearchable={true}
                              classNamePrefix="selectCateogyCorporateList"
                              menuPortalTarget={document.body}
                            />
                            <Button
                              className={styles["PlusButton"]}
                              icon={
                                <span className={styles["PlusIcon"]}>+</span>
                              }
                              onClick={handleOpenAddBankUserModal}
                            />
                            <Button
                              className={styles["EditButton"]}
                              icon={<i className={"icon-edit color-blue"}></i>}
                              onClick={() =>
                                handleOpenEditBankUserModal(branchRole)
                              }
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col lg={2} md={2} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Category
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                          </Col>
                          <Col lg={5} md={5} sm={12}>
                            <TextField
                              name={"cateogry"}
                              value={addBankUser.category.value}
                              maxLength={50}
                              disable
                              // onChange={addBankUserValidateHandler}
                              labelClass="d-none"
                            />
                          </Col>
                        </Row>
                      </>
                    )}

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Email
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"email"}
                          value={addBankUser.email.value}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                          // maxLength={50}
                        />
                        {errorShow &&
                        !/^[a-zA-Z0-9._%+-]+@bop\.com$/.test(
                          addBankUser.email.value
                        ) ? (
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <p className={styles["bankErrorMessage"]}>
                                Email address with domain of bop is required
                              </p>
                            </Col>
                          </Row>
                        ) : null}
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Contact
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"Contact"}
                          value={addBankUser.Contact.value}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                          maxLength={20}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3 mb-5">
                      <Col
                        lg={9}
                        md={9}
                        sm={12}
                        className="d-flex justify-content-center gap-2"
                      >
                        <Button
                          icon={<i className="icon-check icon-check-space"></i>}
                          text="Activate"
                          onClick={handleActivateButton}
                          className={styles["Active-btn"]}
                          disableBtn={
                            addBankUser.EmployeeID.errorStatus !== true &&
                            addBankUser.firstName.value !== "" &&
                            addBankUser.roleID.value !== "" &&
                            addBankUser.email.value !== "" &&
                            addBankUser.Contact.value !== ""
                              ? false
                              : true
                          }
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          onClick={handleCancelButton}
                          className={styles["Cancel-btn-AddBankUser"]}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>

      {BulkUploadClicked && (
        <BankBulkUploadModal
          setBulkUploadClicked={setBulkUploadClicked}
          BulkUploadClicked={BulkUploadClicked}
        />
      )}
      {AddBankUserModalGobalState && <AddBankUserModal />}
      {EditBankUserModalGobalState && (
        <EditBankUserModal editBranchData={editBranchData} />
      )}
      {
        // AddBankUserConfirmationModal && (
        saveClicked === true && (
          <ActivateConfirmationModal onConfirm={handleConfirmationYes} />
        )
        // )
      }
      {
        //
        cancelClicked === true && (
          <ActivateConfirmationModal onConfirm={handleCancelYes} />
        )
        // )
      }

      {BOPSystemAdminReducer.Loading && <Loader />}
    </section>
  );
};

export default Bankuser;
