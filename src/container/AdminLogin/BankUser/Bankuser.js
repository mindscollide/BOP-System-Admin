import React, { useState } from "react";
import styles from "./Bankuser.module.css";
import { Row, Col } from "react-bootstrap";
import {
  Paper,
  TextField,
  Button,
  CustomUpload,
} from "../../../components/elements";
import { validateEmail } from "../../../commen/functions/emailValidation";
import Select from "react-select";
import { useSelector } from "react-redux";
import AddBankUserModal from "./AddBankUserModal/AddBankUserModal";
import { AdduserModalSystemAdmin } from "../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";

const Bankuser = () => {
  const dispatch = useDispatch();

  //Add Bank  Use Modal Calling
  const AddBankUserModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserModal
  );

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //State for Roles
  const [branchRole, setBranchRole] = useState(false);
  const [roles, setRoles] = useState("");

  //options For Selector
  const options = [
    { value: "Dealer", label: "Dealer" },
    { value: "Treasury", label: "Treasury" },
    { value: "Branch", label: "Branch" },
  ];

  //handle Open AddBankUser Modal
  const handleOpenAddBankUserModal = () => {
    dispatch(AdduserModalSystemAdmin(true));
  };

  //state for Add Bank User
  const [addBankUser, setAddBankUser] = useState({
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
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //add bank user security admin validate handler
  const addBankUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
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

    if (name === "lastName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setAddBankUser({
          ...addBankUser,
          lastName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "lastName" && value === "") {
      setAddBankUser({
        ...addBankUser,
        lastName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "ldapAccount" && value !== "") {
      // let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      // console.log("valueCheckvalueCheck", valueCheck);
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          ldapAccount: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ldapAccount" && value === "") {
      setAddBankUser({
        ...addBankUser,
        ldapAccount: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "Contact" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
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
        Contact: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setAddBankUser({
          ...addBankUser,
          email: {
            value: value.trimStart(),
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

  //email validation handler
  // const handlerEmail = () => {
  //   if (addBankUser.email.value !== "") {
  //     if (validateEmail(addBankUser.email.value)) {
  //       alert("Email verified");
  //     } else {
  //       alert("Email Not Verified");
  //     }
  //   }
  // };

  // onchange handler for edit select role
  const bankSelectRoleHandler = async (selectedRole) => {
    console.log(selectedRole.value, "selectroleselectroleselectrole");
    setBranchRole(selectedRole);
    setRoles(selectedRole.value);
  };

  const createResetHandler = () => {
    setAddBankUser({
      ...addBankUser,
      firstName: {
        value: "",
      },

      lastName: {
        value: "",
      },

      roleID: {
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
    });
  };

  // show error message When user hit activate btn
  const activateHandler = () => {
    if (
      addBankUser.firstName.value !== "" &&
      addBankUser.lastName.value !== "" &&
      addBankUser.roleID.value !== "" &&
      addBankUser.ldapAccount.value !== "" &&
      addBankUser.email.value !== "" &&
      addBankUser.Contact.value !== ""
    ) {
      setErrorShow(false);
      let newData = {
        User: {
          FirstName: addBankUser.firstName.value,
          Lastname: addBankUser.lastName.value,
          Email: addBankUser.email.value,
          ContactNumber: addBankUser.Contact.value,
          LDAPAccount: addBankUser.ldapAccount.value,
          // LDAPAccount: `mindscollide.${addBankUser.Name.value.replace(
          //   " ",
          //   ""
          // )}`,
          UserRoleID: addBankUser.roleID.value,
        },
        BankId: 1,
      };
    } else {
      setErrorShow(true);
    }
  };

  //Handle File upload
  const HandleFileUpload = (data) => {
    const UploadFile = data.target.value;
    const uploadedFile = data.target.files[0];
    console.log("UploadFileUploadFile", UploadFile);
    console.log("uploadedFileuploadedFile", uploadedFile);
    var ext = uploadedFile.name.split(".").pop();
    if (ext === "xls" || ext === "xlsx") {
      // dispatch(FileBulkUpload(navigate, uploadedFile, setUploadModal));
    } else {
      alert("Invalid type");
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
          <Row className="mt-1">
            <Col lg={12} md={12} sm={12} className="m-0 p-0">
              <Paper className={styles["bankuser-paper"]}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
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
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex justify-content-start"
                          >
                            <p
                              className={
                                errorShow && addBankUser.firstName.value === ""
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              First Name is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={4}>
                        <CustomUpload />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          User Role
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          name="roleID"
                          options={options}
                          value={branchRole}
                          onChange={bankSelectRoleHandler}
                          isSearchable={true}
                          className={styles["react-select-field"]}
                        />

                        <Row>
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
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    {roles === "Branch" ? (
                      <>
                        {" "}
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
                              isSearchable={true}
                              classNamePrefix={"CompanyName"}
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
                          <Col lg={4} md={4} sm={12}></Col>
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
                            <Select isSearchable={true} />
                          </Col>

                          <Col lg={4} md={4} sm={12}></Col>
                        </Row>
                      </>
                    ) : null}

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
                        />
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
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
                          name={"ldapAccount"}
                          value={addBankUser.ldapAccount.value}
                          onChange={addBankUserValidateHandler}
                          labelClass="d-none"
                        />
                        <Row>
                          <Col className="d-flex justify-content-start">
                            <p
                              className={
                                errorShow &&
                                addBankUser.ldapAccount.value === ""
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              LDAP Account is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col
                        lg={9}
                        md={9}
                        sm={12}
                        className="d-flex justify-content-center gap-2"
                      >
                        <Button
                          icon={<i className="icon-check icon-check-space"></i>}
                          text="Activate"
                          onClick={activateHandler}
                          className={styles["Active-btn"]}
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          onClick={createResetHandler}
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
    </section>
  );
};

export default Bankuser;
