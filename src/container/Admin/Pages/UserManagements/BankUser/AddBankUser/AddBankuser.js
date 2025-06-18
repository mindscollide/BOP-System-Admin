import React, { useCallback, useEffect, useState } from "react";
import styles from "./AddBankuser.module.css";
import { Row, Col } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  CustomUpload,
  Loader,
} from "../../../../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import {
  AdduserModalSystemAdmin,
  ConfirmationModalSystemAdmin,
  editBankUserModalSystemAdmin,
} from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import { addBankUserSchema } from "../../../../../../utils/schemas";
import {
  BankUsersBulkListAPI,
  CreateBankUserRequestAPI,
} from "../../../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { validateBopEmail } from "../../../../../../utils/regexUtil";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import {
  GetAllCategoriesAPI,
  GetAllBranchesAPI,
  GetBankUserRolesAPI,
} from "../../../../../../store/actions/Auth-Actions";
import { useBankUser } from "../utils/BankUserContext";
import { useMqtt } from "../../../../../../context/MQTTContext";

const AddBankUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { branchCreated, branchUpdated, setBranchCreated, setBranchUpdated } =
    useMqtt();
  const getALlBranches = useSelector((state) => state.auth.GetAllBranchesData);

  const { setEditBranchData, setBulkUploadClicked } = useBankUser();

  const [modalState, setModalState] = useState(0);

  //Dummy employee ID
  const dummyEmployeeIDs = ["0001", "0002", "0003", "0004"];

  //State for branch options
  const [branchOptions, setBranchOptions] = useState([]);

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);

  //state for error Message
  // const [errorShow, setErrorShow] = useState(false);
  const [rolesOptions, setRolesOptions] = useState([]);

  //State for Roles
  const [branchRole, setBranchRole] = useState(null);
  const [role, setRole] = useState({
    label: "",
    value: 0,
  });

  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );

  //handle Open AddBankUser Modal
  const handleOpenAddBankUserModal = () => {
    dispatch(AdduserModalSystemAdmin(true));
  };

  //handle Edit AddBankUser Modal
  const handleOpenEditBankUserModal = (branchData) => {
    dispatch(editBankUserModalSystemAdmin(true));
    setEditBranchData(branchData);
  };

  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
    ...addBankUserSchema,
  });

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
          // Proceed only if we have at least one branch option
          if (newBranchesData.length > 0) {
            // Attempt to find the branch option that matches the current `branchRole.value`
            let findSelectData = newBranchesData.find(
              (data) => data.value === branchRole.value
            );

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

  useEffect(() => {
    if (branchCreated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchCreated.branch.branchID
        );
        if (findBranchObj === undefined) {
          let newBranchData = {
            ...branchCreated.branch,
            value: branchCreated.branch.branchID,
            label: branchCreated.branch.branchName,
          };
          setBranchOptions([...branchOptions, newBranchData]);
          setBranchCreated(null);
        }
      }
    }
  }, [branchCreated]);

  useEffect(() => {
    if (branchUpdated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchUpdated.branch.branchID
        );
        if (findBranchObj !== undefined) {
          setBranchOptions((prevBranchData) => {
            return prevBranchData.map((data4, index) => {
              if (data4.branchID === branchUpdated.branch.branchID) {
                return {
                  ...data4,
                  value: branchUpdated.branch.branchID,
                  label: branchUpdated.branch.branchName,
                  branchCode: branchUpdated.branch.branchCode,
                  branchContact: branchUpdated.branch.branchContact,
                  branchName: branchUpdated.branch.branchName,
                };
              }
              return data4;
            });
          });

          if (
            branchRole &&
            branchRole?.value === branchUpdated.branch.branchID
          ) {
            setBranchRole({
              value: branchUpdated.branch.branchID,
              label: branchUpdated.branch.branchName,
              branchCode: branchUpdated.branch.branchCode,
              branchContact: branchUpdated.branch.branchContact,
              branchName: branchUpdated.branch.branchName,
            });
          }
          setBranchUpdated(null);
        }
      }
    }
  }, [branchUpdated]);
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
    setBranchRole(selectedBranch);
    setAddBankUser({
      ...addBankUser,
      category: {
        value: selectedBranch.categoryName,
      },
    });
  };

  const handleCancelButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };

  const handleCancelYes = () => {
    setBranchRole(null);
    setRole({
      value: 0,
      label: "",
    });
    setAddBankUser({
      ...addBankUser,
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
    });
  };

  // show error message When user hit activate btn
  const handleActivateButton = () => {
    if (validateBopEmail(addBankUser.email.value)) {
      dispatch(ConfirmationModalSystemAdmin(true));
      setModalState(1);
    } else {
      setAddBankUser((prevState) => {
        return {
          ...prevState,
          email: {
            ...prevState.email,
            errorMessage: "Email should be in email format",
            errorStatus: true,
          },
        };
      });
    }
  };

  const handleConfirmationYes = useCallback(() => {
    // Extract LDAPAccount from email (part before "@")
    try {
      if (modalState === 1) {
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
        dispatch(
          CreateBankUserRequestAPI(
            navigate,
            newData,
            handleCancelYes,
            setAddBankUser
          )
        );
      } else if (modalState === 2) {
        dispatch(ConfirmationModalSystemAdmin(false));
        setModalState(0);
        handleCancelYes();
      }
    } catch (error) {
      console.log("newData", error);
    }

    // Dispatch API request to create the bank user

    // Reset saveClicked state
  }, [addBankUser, modalState]);

  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

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
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="m-0 p-0">
              <Paper className={styles["bankuser-paper"]}>
                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12} className="d-flex">
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Employee ID
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        name={"EmployeeID"}
                        labelClass="d-none"
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                        value={addBankUser.EmployeeID.value}
                        maxLength={4}
                        onBlur={(event) =>
                          console.log(
                            "addBankUserValidateHandleraddBankUserValidateHandler",
                            event.target.value
                          )
                        }
                        onChange={addBankUserValidateHandler}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <CustomUpload change={HandleFileUpload} />
                    {/* <CustomUpload onClick={handleCustomUploadClick} /> */}
                  </Col>
                  {addBankUser.EmployeeID.errorStatus && (
                    <Row>
                      <p className={styles["bankErrorMessage"]}>
                        {addBankUser.EmployeeID.errorMessage}
                      </p>
                    </Row>
                  )}
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Treasury Person Name
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        name={"firstName"}
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                        value={addBankUser.firstName.value}
                        maxLength={50}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        User Role
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <Select
                        options={rolesOptions}
                        value={role}
                        onChange={bankSelectRoleHandler}
                        isSearchable={true}
                        className={styles["InputFieldClass"]}
                        classNamePrefix={"selectCateogyCorporateList"}
                      />
                    </div>
                  </Col>
                </Row>

                {role.value === 9 && (
                  <>
                    <Row className="mt-3 position-relative">
                      <Col lg={7} md={7} sm={12}>
                        <div className="d-flex justify-content-start align-items-start w-100">
                          <span className={styles["labels-add-bank"]}>
                            Select Branch
                            <span className={styles["aesterick-color"]}>*</span>
                          </span>

                          <Col className="position-relative">
                            <Select
                              options={branchOptions}
                              placeholder="Select Branch"
                              value={branchRole.value !== 0 ? branchRole : null}
                              onChange={branchSelectRoleHandler}
                              isSearchable={true}
                              // classNamePrefix="selectCateogyCorporateList"
                              className={styles["InputFieldClass"]}
                              classNamePrefix={"selectCateogyCorporateList"}
                              menuPortalTarget={document.body}
                            />

                            <Button
                              className={styles["EditButton"]}
                              icon={<i className={"icon-edit "}></i>}
                              onClick={() =>
                                handleOpenEditBankUserModal(branchRole)
                              }
                            />
                            <Button
                              className={styles["PlusButton"]}
                              icon={
                                <span className={styles["PlusIcon"]}>+</span>
                              }
                              onClick={handleOpenAddBankUserModal}
                            />
                          </Col>
                        </div>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={7} md={7} sm={12}>
                        <div className="d-flex justify-content-start align-items-start w-100">
                          <span className={styles["labels-add-bank"]}>
                            Category
                            <span className={styles["aesterick-color"]}>*</span>
                          </span>
                          <TextField
                            name={"cateogry"}
                            value={addBankUser.category.value}
                            maxLength={50}
                            disable
                            labelClass="d-none"
                            formParentClass={"MainClass"}
                            className={styles["disableText"]}
                          />
                        </div>
                      </Col>
                    </Row>
                  </>
                )}

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Email
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        name={"email"}
                        value={addBankUser.email.value}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                        // maxLength={50}
                      />
                    </div>

                    {addBankUser.email.errorStatus && (
                      <p className={styles["bankErrorMessage"]}>
                        {addBankUser.email.errorMessage}
                      </p>
                    )}
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Contact
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        name={"Contact"}
                        value={addBankUser.Contact.value}
                        onChange={addBankUserValidateHandler}
                        labelClass="d-none"
                        maxLength={20}
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                      />
                    </div>
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
                        role.value !== 0 &&
                        addBankUser.EmployeeID.value !== "" &&
                        addBankUser.firstName.value !== "" &&
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
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>

      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleConfirmationYes}
          handleNoButton={handleNoButton}
        />
      )}
      {BOPSystemAdminReducer.Loading && <Loader />}
    </section>
  );
};

export default AddBankUser;
