import React, { lazy, useEffect, useState } from "react";
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
import { validateEmail } from "../../../utils/regexUtil";
import { useNavigate } from "react-router-dom";
import { CreateCorporateUserRequestAPI } from "../../../store/actions/BOPSystemAdminActions";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { getAllCorporatesCategory } from "../../../store/actions/Auth-Actions";
const CorporateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global Staate
  // const { BOPSystemAdminReducer } = useSelector((state) => state);

  // get all corporates (company name)
  const GetAllCorporates = useSelector(
    (state) => state.auth.GetAllCorporatesData
  );

  //  //Global Modal for confirmation
  // const AddBankUserConfirmationModal = useSelector(
  //   (state) => state.BOPSystemAdminModal.addBankUserConfirmationModal
  // );

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

  //companyRoles
  const [companyRoleID, setCompanyRole] = useState({
    value: 0,
    label: "",
  });

  //Global State
  const { BOPSystemAdminReducer, auth } = useSelector((state) => state);
  //State for branch options
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  console.log("companyNameOptions", companyNameOptions);

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
    if (validateEmail(corporateUser.email.value)) {
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
      corporateUser.companyName !== ""
    ) {
      console.log(
        "corporateUser.firstName.value",
        corporateUser.firstName.value
      );
      console.log("corporateUser.email.value", corporateUser.email.value);
      console.log(
        "corporateUser.companyName.value",
        corporateUser.companyName.value
      );

      if (validateEmail(corporateUser.email.value)) {
        setErrorShow(false);
        let newData = {
          User: {
            FirstName: corporateUser.firstName.value,
            Email: corporateUser.email.value,
            ContactNumber: "03909090909",
          },
          // BankId: 1,
          CorporateID: 1,
          // CategoryID: corporateUser.category.value,
          // CompanyName: corporateUser.companyName.value,
          IsChatActive: corporateUser.isChatActive.value,
        };

        dispatch(CreateCorporateUserRequestAPI(navigate, newData));
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

  // //Edit Button
  // const handleEditButton = () => {
  //   dispatch(editCompanyModalSystemAdmin(true));
  // };

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
    setCompanyNameOptions("");
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

  const CompanySelectHandler = async (selectedCompany) => {
    console.log(
      selectedCompany,
      "selectedCompanyselectedCompanyselectedCompany"
    );
    setCompanyRole(selectedCompany);

    setCorporateUser((prevState) => ({
      ...prevState,
      companyID: selectedCompany.value,
      categoryName: selectedCompany.category.categoryName,
      natureOfClient: selectedCompany.natureofBusiness.name,
      rfqTreasury: `${selectedCompany.rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
      rfqCorporate: `${selectedCompany.rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
    }));
  };
  console.log("corporateUser.corporateID", corporateUser);

  useEffect(() => {
    dispatch(getAllCorporatesCategory(navigate));
  }, []);

  useEffect(() => {
    if (GetAllCorporates !== null) {
      try {
        let newCorporateData = GetAllCorporates.corporates.map((corporate) => {
          return {
            ...corporate,
            value: corporate.corporateID,
            label: corporate.corporateName,
          };
        });
        setCompanyNameOptions(newCorporateData);
        console.log("newCorporateData", newCorporateData[0]);
        if (newCorporateData.length > 0) {
          console.log("im here");
          setCompanyRole(newCorporateData[0]);
          console.log("companyRoleID", companyRoleID);
          setCorporateUser((prevState) => ({
            ...prevState,
            companyID: newCorporateData[0].value,
            categoryName: newCorporateData[0].category.categoryName,
            natureOfClient: newCorporateData[0].natureofBusiness.name,
            rfqTreasury: `${newCorporateData[0].rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
            rfqCorporate: `${newCorporateData[0].rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
            // isChatActive: newCorporateData[0].isChatActive.value,
            //needs to be cleared
          }));
        }
      } catch (error) {
        console.log("Encounred an Error: ", error);
      }
    }
  }, [GetAllCorporates]);

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
                          value={corporateUser.firstName?.value || ""}
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
                          value={corporateUser.email?.value || ""}
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
                        !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
                          corporateUser.email.value
                        ) ? (
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <p className={styles["bankErrorMessage"]}>
                                Enter Valid Email Address
                              </p>
                            </Col>
                          </Row>
                        ) : (
                          ""
                        )}
                      </Col>
                    </Row>

                    <Row className="mt-3 position-relative">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Company Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12} className="position-relative">
                        <Select
                          // name="companyName"
                          options={companyNameOptions}
                          isSearchable={true}
                          value={companyRoleID}
                          onChange={CompanySelectHandler}
                          classNamePrefix={"selectCateogyCorporateList"}
                        />
                        <Button
                          className={styles["PlusButton"]}
                          icon={<span className={styles["PlusIcon"]}>+</span>}
                          onClick={handlePlusButton}
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Category
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          // name={"category"}
                          value={corporateUser.categoryName || ""}
                          maxLength={50}
                          disable={true}
                        />
                      </Col>
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
                              value={corporateUser.rfqTreasury || ""}
                              disable={true}
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
                              value={corporateUser.rfqCorporate || ""}
                              disable={true}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Nature of the Client
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          value={corporateUser.natureOfClient || ""}
                          disable={true}
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
                          className={styles["Active-btn"]}
                          onClick={handleActivateButton}
                          disableBtn={
                            corporateUser.firstName.value !== "" &&
                            corporateUser.email.value !== ""
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

      {PlusIconCorporateModalGobalState && <CorporatePlusIconModal />}
      {editCompanyModalGobalState && <EditCompanyModal />}
      {
        // AddBankUserConfirmationModal && (
        <ActivateConfirmationModal onConfirm={handleActivateButtonYes} />
        // )
      }
      {BOPSystemAdminReducer.Loading || auth.Loading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default CorporateUser;
