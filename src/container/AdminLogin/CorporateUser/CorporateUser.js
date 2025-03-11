import React, { useEffect, useState } from "react";
import styles from "./Corporateuser.module.css";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Checkbox,
  CustomUpload,
  Loader,
  Notification,
  Paper,
  TextField,
} from "../../../components/elements";
import Select from "react-select";
// import { validateEmail } from "../../../commen/functions/emailValidation";
import { useSelector } from "react-redux";
import CorporatePlusIconModal from "./CorporatePlusIconModal/CorporatePlusIconModal";
import {
  // AddBankUserConfirmationModalSystemAdmin,
  ConfirmationModalSystemAdmin,
  corporatePlusIconModalSystemAdmin,
  editCompanyModalSystemAdmin,
} from "../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import EditCompanyModal from "./EditCompanyModal/EditCompanyModal";
import { addCorporateUserSchema } from "../../../utils/schemas";
import { categoryOptions, companyOptions } from "../../../helpers/Dropdown";
import { validateBopEmail } from "../../../utils/regexUtil";
import { useNavigate } from "react-router-dom";
import { CreateCorporateUserRequestAPI } from "../../../store/actions/BOPSystemAdminActions";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
// import ActivateConfirmationModal from "../BankUser/ActivateConfirmationModal/ActivateConfirmationModal";
const CorporateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  //  //Global Modal for confirmation
  const AddBankUserConfirmationModal = useSelector(
    (state) => state.BOPSystemAdminModal.addBankUserConfirmationModal
  );
  //Add Company Use Modal Calling
  const PlusIconCorporateModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.corporatePlusIconModal
  );

  //Edit Company Use Modal Calling
  const editCompanyModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editCompanyModal
  );

  //Corporate User State
  const [corporateUser, setCorporateUser] = useState({
    ...addCorporateUserSchema,
  });

  // States for dropdown
  const [companyName, setCompanyName] = useState("");
  const [category, setCategory] = useState("");

  //Set Activate Button
  const [isActive, setIsActive] = useState(false);

  //

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //add bank user security admin validate handler
  // const addCorporateUserValidateHandler = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;

  //   if (name === "firstName" && value !== "") {
  //     let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
  //     if (valueCheck !== "") {
  //       setCorporateUser({
  //         ...corporateUser,
  //         firstName: {
  //           value: valueCheck.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "firstName" && value === "") {
  //     setCorporateUser({
  //       ...corporateUser,
  //       firstName: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: false,
  //       },
  //     });
  //   }

  //   if (name === "email" && value !== "") {
  //     // console.log("valuevalueemailvaluevalueemail", value);
  //     const trimmedValue = value.replace(/\s+/g, "");
  //     if (trimmedValue !== "") {
  //       setCorporateUser({
  //         ...corporateUser,
  //         email: {
  //           value: trimmedValue,
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "email" && value === "") {
  //     setCorporateUser({
  //       ...corporateUser,
  //       email: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }

  //   if (name === "companyName" && value !== "") {
  //     // console.log("valuevalueemailvaluevalueemail", value);
  //     // const trimmedValue = value.replace(/\s+/g, "");
  //     if (value !== "") {
  //       setCorporateUser({
  //         ...corporateUser,
  //         companyName: {
  //           value: value,
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "companyName" && value === "") {
  //     setCorporateUser({
  //       ...corporateUser,
  //       companyName: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }

  //   if (name === "category" && value !== "") {
  //     if (value !== "") {
  //       setCorporateUser({
  //         ...corporateUser,
  //         category: {
  //           value: value,
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "category" && value === "") {
  //     setCorporateUser({
  //       ...corporateUser,
  //       category: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }
  // };

  const addCorporateUserValidateHandler = (e) => {
    const { name, value } = e.target;

    // Validation rules
    const validateInput = {
      firstName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
      email: (val) => val.replace(/\s+/g, ""),
      companyName: (val) => val.trim(),
      category: (val) => val.trim(),
    };

    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setCorporateUser((prevState) => ({
        ...prevState,
        [fieldName]: {
          value: validValue,
          errorMessage: hasError ? "This field is required" : "",
          errorStatus: hasError,
        },
      }));
    };

    // Update the specific field
    updateField(name, value);
  };

  // show error message When user hit activate btn
  const handleActivateButton = () => {
    if (validateBopEmail(corporateUser.email.value)) {
      dispatch(ConfirmationModalSystemAdmin(true));
    } else {
      setErrorShow(true);
    }
  };
  //handle Active Button
  // show error message When user hit activate btn
  const handleActivateButtonYes = () => {
    if (
      corporateUser.firstName.value !== "" &&
      corporateUser.email.value !== "" &&
      corporateUser.companyName.value !== "" &&
      corporateUser.category.value !== ""
    ) {
      if (validateBopEmail(corporateUser.email.value)) {
        setErrorShow(false);
        let newData = {
          User: {
            FirstName: corporateUser.firstName.value,
            Email: corporateUser.email.value,
          },
          // BankId: 1,
          CategoryID: corporateUser.category.value,
          CompanyName: corporateUser.companyName.value,
          IsChatActive: corporateUser.isChatActive.value,
        };
        console.log("newData", newData);

        dispatch(CreateCorporateUserRequestAPI(navigate, newData));
        setOpen({
          open: true,
          message: "CreateCorporateUserRequestAPI id dispatched",
        });
      } else {
        console.log("corporateUsercorporateUser");
        setErrorShow(true);
      }
    } else {
      // setTimeout();

      setOpen({
        open: true,
        message: "Fill All Required Fields",
      });
      setErrorShow(true);
    }
  };

  //handle Plus Button
  const handlePlusButton = () => {
    dispatch(corporatePlusIconModalSystemAdmin(true));
  };

  //Edit Button
  const handleEditButton = () => {
    dispatch(editCompanyModalSystemAdmin(true));
  };

  const changeTick = () => {
    let opposeTick = !corporateUser.isChatActive.value;
    setCorporateUser((prevState) => ({
      ...prevState,
      isChatActive: {
        value: opposeTick,
      },
    }));
  };

  const handleCancelButton = () => {
    setCompanyName("");
    setCategory("");
    setIsActive(false);
    setCorporateUser({
      ...corporateUser,
      firstName: {
        value: "",
      },
      email: {
        value: "",
      },
      companyName: {
        value: "",
      },
      category: {
        value: "",
      },
    });
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
  };

  useEffect(() => {
    if (
      corporateUser.firstName.value !== "" &&
      corporateUser.email.value !== "" &&
      corporateUser.companyName.value !== "" &&
      corporateUser.category.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    corporateUser,
    corporateUser.companyName.value,
    corporateUser.category.value,
  ]);
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
              <span className={styles["bank-user-label"]}>
                Add a Corporate user
              </span>
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
                          Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name={"firstName"}
                          value={corporateUser.firstName.value}
                          onChange={addCorporateUserValidateHandler}
                          maxLength={50}
                        />
                      </Col>

                      <Col lg={4} md={4} sm={4}>
                        <CustomUpload />
                      </Col>
                    </Row>
                    {/* <Row className="mt-3"></Row> */}

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Email
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name={"email"}
                          value={corporateUser.email.value}
                          onChange={addCorporateUserValidateHandler}
                        />
                        {/* <Row>
                            <Col className="d-flex justify-content-start">
                              <p
                                className={
                                  errorShow &&
                                  !/^[a-zA-Z0-9._%+-]+@bop\.com$/.test(
                                    corporateUser.email.value
                                  )
                                    ? styles["bankErrorMessage"]
                                    : styles["bankErrorMessage_hidden"]
                                }
                              >
                                Email address with domain of bop is required
                              </p>
                            </Col>
                          </Row> */}
                        {errorShow &&
                        !/^[a-zA-Z0-9._%+-]+@bop\.com$/.test(
                          corporateUser.email.value
                        ) ? (
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <p className={styles["bankErrorMessage"]}>
                                Email address with domain of bop is required
                              </p>
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                      </Col>
                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>

                    <Row className="mt-3 position-relative">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Company Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          name="companyName"
                          isSearchable={true}
                          classNamePrefix={"companyName"}
                          options={companyOptions}
                          value={companyName}
                          onChange={(e) =>
                            handleDropdownChange(
                              "companyName",
                              e,
                              setCompanyName,
                              corporateUser.companyName
                            )
                          }
                          className={styles["react-select-field"]}
                        />
                      </Col>
                      <Col lg={1} md={1} sm={12}>
                        {/* <CorporateCustomUpload /> */}
                        <Button
                          className={styles["PlusButton"]}
                          icon={<span className={styles["PlusIcon"]}>+</span>}
                          onClick={handlePlusButton}
                        />
                        <Button
                          className={styles["EditButton"]}
                          icon={<i className="icon-edit color-blue"></i>}
                          onClick={handleEditButton}
                        />
                      </Col>
                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>
                    {/* <Row className="mt-3"></Row> */}
                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Category
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          name="category"
                          isSearchable={true}
                          classNamePrefix={"category"}
                          options={categoryOptions}
                          value={category}
                          onChange={(e) =>
                            handleDropdownChange(
                              "category",
                              e,
                              setCategory,
                              corporateUser.category
                            )
                          }
                          className={styles["react-select-field"]}
                        />
                      </Col>

                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Chat
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={6} md={6} sm={12} className="m-0 p-0">
                        <Checkbox
                          label2="Active"
                          classNameDiv={styles["CheckboxActive"]}
                          onChange={changeTick}
                          checked={
                            corporateUser.isChatActive.value ? true : false
                          }
                        />
                      </Col>

                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          RFQ Timer
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Row>
                          <Col lg={5} md={5} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Treasury
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                            <TextField
                              labelClass="d-none"
                              disable={true}
                              placeholder={"3 Minutes"}
                            />
                          </Col>
                          <Col lg={5} md={5} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Corporate
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                            <TextField
                              labelClass="d-none"
                              disable={true}
                              placeholder={"3 Minutes"}
                            />
                          </Col>
                        </Row>
                      </Col>

                      {/* <Col lg={4} md={4} sm={12}></Col> */}
                    </Row>
                    {/* <Row className="mt-3"></Row> */}

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Nature of the Client
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField labelClass="d-none" disable={true} />
                      </Col>

                      {/* <Col lg={4} md={4} sm={12}></Col> */}
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
                          className={styles["Active-btn"]}
                          onClick={handleActivateButton}
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
      {PlusIconCorporateModalGobalState && <CorporatePlusIconModal />}
      {editCompanyModalGobalState && <EditCompanyModal />}
      {AddBankUserConfirmationModal && (
        <ActivateConfirmationModal onConfirm={handleActivateButtonYes} />
      )}
      {BOPSystemAdminReducer.Loading && <Loader />}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default CorporateUser;
