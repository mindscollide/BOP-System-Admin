import React, { useCallback, useEffect, useState } from "react";
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
import {
  CorporateUsersBulkListAPI,
  CreateCorporateUserRequestAPI,
} from "../../../store/actions/BOPSystemAdminActions";
import ActivateConfirmationModal from "../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { getAllCorporatesCategory } from "../../../store/actions/Auth-Actions";
import CorporateBulkUploadModal from "./CorporateBulkUploadModal/CorporateBulkUploadModal";
const CorporateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global Staate
  // const { BOPSystemAdminReducer } = useSelector((state) => state);
  const [modalState, setModalState] = useState(0);

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
  const [companyRoleID, setCompanyRole] = useState(null);
  const [editCompanyData, setEditCompanyData] = useState();
  //Global State
  const { BOPSystemAdminReducer, auth } = useSelector((state) => state);
  //State for branch options
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  console.log("companyNameOptions", companyNameOptions);

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //state for cancel button

  const [BulkUploadClicked, setBulkUploadClicked] = useState(false);
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
  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
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
      setModalState(1);
    } else {
      setErrorShow(true);
    }
  };
  //handle Active Button
  // show error message When user hit activate btn
  const handleConfirmationYes = useCallback(() => {
    console.log(modalState, "modalState");
    try {
      if (modalState === 1) {
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
              CorporateID: companyRoleID.corporateID,
              IsChatActive: corporateUser.isChatActive.value,
            };

            dispatch(
              CreateCorporateUserRequestAPI(
                navigate,
                newData,
                handleCancelButtonYes,
                setCorporateUser
              )
            );
            dispatch(ConfirmationModalSystemAdmin(false));
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
      } else if (modalState === 2) {
        dispatch(ConfirmationModalSystemAdmin(false));
        setModalState(0);
        handleCancelButtonYes();
      }
    } catch (error) {
      console.log("newData", error);
    }
  }, [modalState, corporateUser]);

  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  //handle Plus Button
  const handlePlusButton = () => {
    dispatch(corporatePlusIconModalSystemAdmin(true));
  };

  //Edit Button
  const handleEditButton = (companyRoleID) => {
    console.log("companyRoleIDcompanyRoleID", companyRoleID);
    dispatch(editCompanyModalSystemAdmin(true));
    setEditCompanyData(companyRoleID);
  };

  const changeActiveTick = () => {
    let opposeTick = !corporateUser.isChatActive.value;
    setCorporateUser((prevState) => ({
      ...prevState,
      isChatActive: {
        value: opposeTick,
      },
    }));
  };

  const changeFETick = () => {
    let opposeTick = !corporateUser.isFEActive.value;
    setCorporateUser((prevState) => ({
      ...prevState,
      isFEActive: {
        value: opposeTick,
      },
    }));
  };

  const changeNonFETick = () => {
    let opposeTick = !corporateUser.isNonFEActive.value;
    setCorporateUser((prevState) => ({
      ...prevState,
      isNonFEActive: {
        value: opposeTick,
      },
    }));
  };

  const handleCancelButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };
  const handleCancelButtonYes = () => {
    setCompanyRole(companyNameOptions[0]);

    console.log(companyNameOptions, "companyNameOptions");
    setCorporateUser((prevState) => ({
      ...prevState,
      companyID: companyNameOptions[0].value,
      categoryName: companyNameOptions[0].category.categoryName,
      natureOfClient: companyNameOptions[0].natureofBusiness.name,
      rfqTreasury: `${companyNameOptions[0].rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
      rfqCorporate: `${companyNameOptions[0].rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
      firstName: {
        value: "",
      },
      email: {
        value: "",
      },
      isChatActive: {
        value: false,
      },
    }));
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
    dispatch(getAllCorporatesCategory(navigate, null));
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

        // Update local state with with formatted Company options
        setCompanyNameOptions(newCorporateData);

        if (newCorporateData.length > 0) {
          if (companyRoleID !== null) {
            let getCompanyData = newCorporateData.find(
              (data, index) => data.value === companyRoleID.value
            );
            if (getCompanyData !== undefined) {
              setCompanyRole(getCompanyData);
              setCorporateUser((prevState) => ({
                ...prevState,
                companyID: getCompanyData.value,
                categoryName: getCompanyData.category.categoryName,
                natureOfClient: getCompanyData.natureofBusiness.name,
                rfqTreasury: `${getCompanyData.rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
                rfqCorporate: `${getCompanyData.rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
              }));
            }
          } else {
            setCompanyRole(newCorporateData[0]);
            setCorporateUser((prevState) => ({
              ...prevState,
              companyID: newCorporateData[0].value,
              categoryName: newCorporateData[0].category.categoryName,
              natureOfClient: newCorporateData[0].natureofBusiness.name,
              rfqTreasury: `${newCorporateData[0].rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
              rfqCorporate: `${newCorporateData[0].rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
            }));
          }
        }
      } catch (error) {
        console.log("Encounred an Error: ", error);
      }
    }
  }, [GetAllCorporates]);

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
          CorporateUsersBulkListAPI(navigate, fileData, setBulkUploadClicked)
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
                        <CustomUpload change={HandleFileUpload} />
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
                          value={corporateUser.email.value || ""}
                          onChange={addCorporateUserValidateHandler}
                        />
                        {corporateUser.email.errorStatus && (
                          <Row>
                            <Col className="d-flex justify-content-start">
                              <p className={styles["bankErrorMessage"]}>
                                {corporateUser.email.errorMessage}
                              </p>
                            </Col>
                          </Row>
                        )}
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
                          options={companyNameOptions}
                          isSearchable={true}
                          value={companyRoleID !== 0 ? companyRoleID : null}
                          onChange={CompanySelectHandler}
                          classNamePrefix={"selectCateogyCorporateList"}
                        />
                        <Button
                          className={styles["PlusButton"]}
                          icon={<span className={styles["PlusIcon"]}>+</span>}
                          onClick={handlePlusButton}
                        />
                        <Button
                          className={styles["EditButton"]}
                          icon={<i className={"icon-edit color-blue"}></i>}
                          // onClick={handleEditButton}
                          onClick={() => handleEditButton(companyRoleID)}
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
                          value={corporateUser.categoryName || ""}
                          maxLength={50}
                          disable={true}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>Chat</span>
                      </Col>
                      <Col lg={6} md={6} sm={12} className="m-0 p-0">
                        <Checkbox
                          label2="Active"
                          classNameDiv={styles["CheckboxActive"]}
                          onChange={changeActiveTick}
                          checked={
                            corporateUser.isChatActive.value ? true : false
                          }
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          FE / Non-FE
                        </span>
                      </Col>
                      <Col lg={1} md={1} sm={12} className="m-0 p-0">
                        <Checkbox
                          label2="FE"
                          classNameDiv={styles["CheckboxActive"]}
                          onChange={changeFETick}
                          checked={
                            corporateUser.isFEActive.value ? true : false
                          }
                        />
                      </Col>
                      <Col lg={1} md={1} sm={12} className="m-0 p-0">
                        <Checkbox
                          label2="Non-FE"
                          classNameDiv={styles["CheckboxActive"]}
                          onChange={changeNonFETick}
                          checked={
                            corporateUser.isNonFEActive.value ? true : false
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
      {BulkUploadClicked && (
        <CorporateBulkUploadModal
          setBulkUploadClicked={setBulkUploadClicked}
          BulkUploadClicked={BulkUploadClicked}
        />
      )}
      {PlusIconCorporateModalGobalState && <CorporatePlusIconModal />}
      {editCompanyModalGobalState && (
        <EditCompanyModal editCompanyData={editCompanyData} />
      )}
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleConfirmationYes}
          handleNoButton={handleNoButton}
        />
      )}
      {BOPSystemAdminReducer.Loading || auth.Loading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default CorporateUser;
