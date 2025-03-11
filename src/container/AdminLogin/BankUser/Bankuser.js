import React, { useCallback, useEffect, useState } from "react";
import styles from "./Bankuser.module.css";
import { Row, Col } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  CustomUpload,
  Notification,
  Loader,
} from "../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import AddBankUserModal from "./AddBankUserModal/AddBankUserModal";
import {
  AdduserModalSystemAdmin,
  // DeleteCorporateModalSystemAdmin,
  // AddBankUserConfirmationModalSystemAdmin,
  editBankUserModalSystemAdmin,
  ConfirmationModalSystemAdmin,
} from "../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import EditBankUserModal from "./EditBankUserModal/EditBankUserModal";
import { addBankUserSchema } from "../../../utils/schemas";
import {
  CreateBankUserRequestAPI,
  GetAllBranchesAPI,
} from "../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { validateBopEmail } from "../../../utils/regexUtil";
import { roleOptions } from "../../../helpers/Dropdown";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
// import ActivateConfirmationModal from "./ActivateConfirmationModal/ActivateConfirmationModal";
const Bankuser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  //Dummy employee ID
  const dummyEmployeeIDs = ["0001", "0002", "0003", "0004"];

  // const modalforactivationconfirmation = useSelector(
  //   (state) => state.BOPSystemAdminModal.deleteCorporateModal
  // );

  const AddBankUserConfirmationModal = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserConfirmationModal
  );
  //State for branch options
  const [branchOptions, setBranchOptions] = useState([
    { value: "1234 - Gulshan", label: "1234 - Gulshan" },
    { value: "2342 - Saddar", label: "2342 - Saddar" },
    { value: "4563 - Clifton", label: "4563 - Clifton" },
  ]);

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //Set Activate Button
  const [isActive, setIsActive] = useState(false);

  //Add Bank  Use Modal Calling
  const AddBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserModal
  );

  //Edit Bank  Use Modal Calling
  const EditBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editBankUserModal
  );

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //State for Roles
  const [branchRole, setBranchRole] = useState(false);
  const [roles, setRoles] = useState("");

  //handle Open AddBankUser Modal
  const handleOpenAddBankUserModal = () => {
    dispatch(AdduserModalSystemAdmin(true));
  };

  //handle Edit AddBankUser Modal
  const handleOpenEditBankUserModal = () => {
    dispatch(editBankUserModalSystemAdmin(true));
  };

  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
    ...addBankUserSchema,
  });

  // Fetch branches on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      const result = await dispatch(GetAllBranchesAPI(navigate));
      if (result?.branches) {
        const branchOptions = result.branches.map((branch) => ({
          value: branch.branchID,
          label: branch.branchName,
        }));
        setBranchOptions(branchOptions);
      } else {
        setBranchOptions(branchOptions);
      }
    };

    fetchBranches();
  }, [dispatch, navigate, branchOptions]);

  //add bank user security admin validate handler
  const addBankUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // if (name === "EmployeeID" && value !== "") {
    //   let valueCheck = value.replace(/[^0-9]/g, "");
    //   if (valueCheck !== "") {
    //     setAddBankUser({
    //       ...addBankUser,
    //       EmployeeID: {
    //         value: valueCheck.trimStart(),
    //         errorMessage: "",
    //         errorStatus: false,
    //       },
    //     });
    //   } else if (name === "EmployeeID" && value.length < 5) {
    //     setAddBankUser({
    //       ...addBankUser,
    //       EmployeeID: {
    //         value: "",
    //         errorMessage: "ID must be 4 digits",
    //         errorStatus: true,
    //       },
    //     });
    //     console.log("in this block");
    //   }
    // } else if (name === "EmployeeID" && value === "") {
    //   setAddBankUser({
    //     ...addBankUser,
    //     EmployeeID: {
    //       value: "",
    //       errorMessage: "",
    //       errorStatus: true,
    //     },
    //   });
    //   console.log("in 2nd block");
    // }
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

    // if (name === "email" && value !== "") {
    //   // Remove all spaces from the input
    //   const trimmedValue = value.replace(/\s+/g, "");

    //   if (trimmedValue !== "") {
    //     setAddBankUser({
    //       ...addBankUser,
    //       email: {
    //         value: trimmedValue,
    //         errorMessage: "",
    //         errorStatus: false,
    //       },
    //     });
    //   }
    // } else if (name === "email" && value === "") {
    //   setAddBankUser({
    //     ...addBankUser,
    //     email: {
    //       value: "",
    //       errorMessage: "",
    //       errorStatus: true,
    //     },
    //   });
    // }
  };

  const bankSelectRoleHandler = async (selectedRole) => {
    console.log(selectedRole.value, "selectroleselectroleselectrole");
    setRoles(selectedRole);
    setBranchRole("");

    setAddBankUser((prevState) => ({
      ...prevState,
      roleID: { ...prevState.roleID, value: selectedRole.value },
      branchID: { value: "" },
    }));
    // Automatically select the first branch option if the role is "Branch"
    if (selectedRole.value === "Branch" && branchOptions.length > 0) {
      const firstBranchOption = branchOptions[0];
      setBranchRole(firstBranchOption);
      setAddBankUser((prevState) => ({
        ...prevState,
        branchID: { ...prevState.branchID, value: firstBranchOption.value },
      }));
    }
  };

  const branchSelectRoleHandler = async (selectedBranch) => {
    console.log(selectedBranch.value, "selectroleselectroleselectrole");
    setBranchRole(selectedBranch);

    setAddBankUser((prevState) => ({
      ...prevState,
      branchID: { ...prevState.branchID, value: selectedBranch.value },
    }));
  };

  const handleCancelButton = () => {
    setBranchRole("");
    setRoles("");
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
        value: "",
      },
    });
  };

  // show error message When user hit activate btn
  const handleActivateButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleConfirmationYes = useCallback(() => {
    // dispatch(AddBankUser);
    let employeeID = addBankUser.EmployeeID.value;
    if (
      addBankUser.firstName.value !== "" &&
      addBankUser.roleID.value !== "" &&
      addBankUser.ldapAccount.value !== "" &&
      addBankUser.email.value !== "" &&
      addBankUser.Contact.value !== ""
    ) {
      // checking if EmployeeID is already present
      if (
        parseInt(employeeID) >
        parseInt(dummyEmployeeIDs[dummyEmployeeIDs.length - 1])
      ) {
        setErrorShow(false);
        //Validating email address
        if (validateBopEmail(addBankUser.email.value)) {
          setErrorShow(false);
          let newData = {
            User: {
              EmployeeID: addBankUser.EmployeeID.value,
              FirstName: addBankUser.firstName.value,
              UserRoleID: addBankUser.roleID.value,
              LDAPAccount: addBankUser.ldapAccount.value,
              Email: addBankUser.email.value,
              ContactNumber: addBankUser.Contact.value,
            },
            BankId: 1,
          };
          // Add branchID only if UserRoleID is "Branch"
          if (addBankUser.roleID.value === "Branch") {
            newData.User.branchID = addBankUser.branchID.value;
          }
          console.log("newData", newData);
          dispatch(CreateBankUserRequestAPI(navigate, newData));
          setOpen({
            open: true,
            message: "CreateBankUserRequestAPI is dispatched",
          });
        } else {
          setErrorShow(true);
        }
      } else {
        setErrorShow(true);
        setAddBankUser({
          ...addBankUser,
          EmployeeID: {
            ...addBankUser.EmployeeID,
            errorStatus: true,
          },
        });
      }
    }
  }, [addBankUser]);

  // Handle File upload
  const HandleFileUpload = (data) => {
    const UploadFile = data.target.value;
    const uploadedFile = data.target.files[0];
    console.log("UploadFileUploadFile", UploadFile);
    console.log("uploadedFileuploadedFile", uploadedFile);
    var ext = uploadedFile.name.split(".").pop();
    if (ext === "xls" || ext === "xlsx") {
      // dispatch(BankUsersBankListAPI(navigate, data));
      // dispatch(FileBulkUpload(navigate, uploadedFile, setUploadModal));
    } else {
      alert("Invalid type");
    }
  };

  //Handle activate button when branch is selected
  useEffect(() => {
    if (
      addBankUser.EmployeeID.errorStatus !== true &&
      addBankUser.firstName.value !== "" &&
      addBankUser.roleID.value !== "" &&
      addBankUser.ldapAccount.value !== "" &&
      addBankUser.email.value !== "" &&
      addBankUser.Contact.value !== ""
    ) {
      if (
        addBankUser.roleID.value === "Branch" &&
        addBankUser.branchID.value === ""
      ) {
        setIsActive(false);
      } else if (addBankUser.roleID.value !== "Branch") {
        setIsActive(true);
      } else {
        setIsActive(true);
      }
    } else {
      setIsActive(false);
    }
  }, [addBankUser]);

  console.log(
    "addBankUser.EmployeeID.errorMessage",
    addBankUser.EmployeeID.value.length
  );
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
                        <CustomUpload />
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
                        {/* <Row className="mt-3"></Row> */}
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
                          name="roleID"
                          options={roleOptions}
                          value={roles}
                          onChange={bankSelectRoleHandler}
                          isSearchable={true}
                          className={styles["react-select-field"]}
                        />
                        {/* <Row className="mt-3"></Row> */}

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

                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>

                    {roles.value === "Branch" && (
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

                          <Col lg={5} md={5} sm={12}>
                            <Select
                              name="branchName"
                              options={branchOptions}
                              placeholder="Select Branch"
                              value={branchRole}
                              onChange={branchSelectRoleHandler}
                              isSearchable={true}
                              className={styles["react-select-field"]}
                            />
                          </Col>
                          <Col lg={1} md={1} sm={12}>
                            <Button
                              className={styles["PlusButton"]}
                              icon={
                                <span className={styles["PlusIcon"]}>+</span>
                              }
                              onClick={handleOpenAddBankUserModal}
                            />
                          </Col>
                          <Col lg={1} md={1} sm={12}>
                            <Button
                              className={styles["EditButton"]}
                              icon={<i className="icon-edit color-blue"></i>}
                              onClick={handleOpenEditBankUserModal}
                            />
                          </Col>
                          {/* <Row className="mt-3"></Row> */}
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
                              name={"Category"}
                              disable={true}
                              placeholder={"01 bps"}
                              labelClass="d-none"
                            />
                          </Col>
                          {/* <Row className="mt-3"></Row> */}

                          <Col lg={4} md={4} sm={12}></Col>
                        </Row>
                      </>
                    )}

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          LDAP Account
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          name={"ldapAccount"}
                          value={addBankUser.ldapAccount.value}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                          maxLength={50}
                        />
                        {/* <Row className="mt-3"></Row> */}
                      </Col>
                    </Row>

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
                          disable={true}
                          // onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                          // maxLength={50}
                        />

                        {/* <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow &&
                                !/^[a-zA-Z0-9._%+-]+@bop\.com$/.test(
                                  addBankUser.email.value
                                )
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              Email address with domain of bop is required
                            </p>
                          </Col>
                        </Row> */}
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
                          disableBtn={isActive ? false : true}
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

      {AddBankUserModalGobalState && <AddBankUserModal />}
      {EditBankUserModalGobalState && <EditBankUserModal />}
      {AddBankUserConfirmationModal && (
        <ActivateConfirmationModal onConfirm={handleConfirmationYes} />
      )}

      {BOPSystemAdminReducer.Loading && <Loader />}

      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default Bankuser;
