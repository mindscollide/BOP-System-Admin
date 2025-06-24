import React, { useCallback, useEffect, useState } from "react";
import styles from "./AddCoporateUser.module.css";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { validateEmail } from "../../../../../../utils/regexUtil";
import {
  ConfirmationModalSystemAdmin,
  corporatePlusIconModalSystemAdmin,
  editCompanyModalSystemAdmin,
} from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import {
  CorporateUsersBulkListAPI,
  CreateCorporateUserRequestAPI,
} from "../../../../../../store/actions/BOPSystemAdminActions";
import { GetAllCorporatesDataAPI } from "../../../../../../store/actions/Auth-Actions";
import {
  Button,
  Checkbox,
  CustomUpload,
  Loader,
  Notification,
  Paper,
  TextField,
} from "../../../../../../components/elements";
import { addCorporateUserSchema } from "../../../../../../utils/schemas";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useCorporateUser } from "../utils/CorporateUserContext";
import {
  setCategoryUpdated,
  setCorporateCreated,
  setCorporateUpdated,
} from "../../../../../../store/actions/RealtimeActions";

const AddCorporateUser = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const corporateCreated = useSelector(
    (state) => state.RealtimeActionReducer.corporateCreated
  );
  const corporateUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUpdated
  );
  const categoryUpdated = useSelector(
    (state) => state.RealtimeActionReducer.categoryUpdated
  );

  const { setBulkUploadClicked, setEditCompanyData } = useCorporateUser();

  const [modalState, setModalState] = useState(0);

  // get all corporates (company name)
  const GetAllCorporates = useSelector((state) => state.auth.GetAllCorporates);

  //Corporate User State
  const [corporateUser, setCorporateUser] = useState({
    ...addCorporateUserSchema,
  });
  console.log("corporateUser,", corporateUser);
  //companyRoles
  const [companyRoleID, setCompanyRole] = useState(null);

  //Global State
  const { BOPSystemAdminReducer, auth } = useSelector((state) => state);
  //State for branch options
  const [companyNameOptions, setCompanyNameOptions] = useState([]);
  console.log(companyNameOptions, "companyNameOptionscompanyNameOptions");
  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //state for cancel button
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
    try {
      if (modalState === 1) {
        if (
          corporateUser.firstName.value !== "" &&
          corporateUser.email.value !== "" &&
          corporateUser.companyName !== ""
        ) {
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
              IsFEEnabled: corporateUser.isFEActive.value,
              IsNonFEEnabled: corporateUser.isNonFEActive.value,
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
    dispatch(editCompanyModalSystemAdmin(true));
    setEditCompanyData(companyRoleID);
  };

  const changeActiveTick = (event) => {
    setCorporateUser((prevState) => ({
      ...prevState,
      isChatActive: {
        value: event.target.checked,
      },
    }));
  };

  const changeFETick = (event) => {
    console.log(event, "event");
    setCorporateUser((prevState) => ({
      ...prevState,
      isFEActive: {
        value: event.target.checked,
      },
    }));
  };

  const changeNonFETick = (event) => {
    setCorporateUser((prevState) => ({
      ...prevState,
      isNonFEActive: {
        value: event.target.checked,
      },
    }));
  };

  const handleCancelButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };
  const handleCancelButtonYes = () => {
    setCompanyRole(companyNameOptions[0]);

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
      isFEActive: {
        value: false,
      },
      isNonFEActive: {
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

  useEffect(() => {
    dispatch(GetAllCorporatesDataAPI(navigate));
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
                categoryID: getCompanyData.category.categoryID,
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

  useEffect(() => {
    if (corporateCreated !== null) {
      try {
        if (Array.isArray(companyNameOptions)) {
          let findCorporateObj = companyNameOptions.find(
            (corporateData, index) =>
              corporateData.corporateID ===
              corporateCreated.corporate.corporateID
          );
          if (findCorporateObj === undefined) {
            const { corporate } = corporateCreated;
            let newCorporateData = {
              corporateID: corporate.corporateID,
              corporateName: corporate.corporateName,
              natureofBusiness: {
                pK_NatureOfBusiness:
                  corporate.natureOFBussiness.natureOfBussinessID,
                name: corporate.natureOFBussiness.natureOfBussiness,
              },
              category: {
                categoryID: corporate.corporateCategory.categoryID,
                categoryName: corporate.corporateCategory.categoryName,
                bidSpread: corporate.corporateCategory.bidSpread,
                offerSpread: corporate.corporateCategory.offerSpread,
                fK_AssetTypeID: corporate.corporateCategory.fK_AssetTypeID,
                fK_UserID: corporate.corporateCategory.fK_UserID,
                fK_BankID: 1,
              },
              rfqTimers: [
                {
                  treasuryRFQExpiryInMin: Number(
                    corporate.rfqTimers.treasuryRFQTimer
                  ),
                  corporateRFQExpiryInMin: Number(
                    corporate.rfqTimers.corporateRFQTimer
                  ),
                  corporateID: corporate.corporateCategory.categoryID,
                },
              ],
              value: corporate.corporateID,
              label: corporate.corporateName,
            };
            setCompanyNameOptions([...companyNameOptions, newCorporateData]);
            dispatch(setCorporateCreated(null));
          }
        }
      } catch (error) {
        console.log(error, "Error in corporate created effect");
      }
    }
  }, [corporateCreated]);

  useEffect(() => {
    if (corporateUpdated !== null) {
      try {
        if (Array.isArray(companyNameOptions)) {
          let findCorporateObj = companyNameOptions.find(
            (corporateData, index) =>
              corporateData.corporateID ===
              corporateUpdated.corporate.corporateID
          );
          if (findCorporateObj !== undefined) {
            setCompanyNameOptions((prevCompanyData) => {
              return prevCompanyData.map((data, index) => {
                if (
                  data.corporateID === corporateUpdated.corporate.corporateID
                ) {
                  return {
                    ...data,
                    value: corporateUpdated.corporate.corporateID,
                    label: corporateUpdated.corporate.corporateName,
                    companyID: corporateUpdated.corporate.corporateID,

                    categoryName:
                      corporateUpdated.corporate.corporateCategory.categoryName,
                    natureOfClient:
                      corporateUpdated.corporate.natureOFBussiness
                        .natureOfBussiness,
                    rfqTreasury: `${corporateUpdated.corporate.rfqTimers.treasuryRFQTimer} Minutes`,
                    rfqCorporate: `${corporateUpdated.corporate.rfqTimers.corporateRFQTimer} Minutes`,
                  };
                }
                return data;
              });
            });
            if (
              companyRoleID.corporateID ===
              corporateUpdated.corporate.corporateID
            ) {
              let corporateRoleData = {
                corporateID: corporateUpdated.corporate.corporateID,
                corporateName: corporateUpdated.corporate.corporateName,
                natureofBusiness: {
                  pK_NatureOfBusiness:
                    corporateUpdated.corporate.natureOFBussiness
                      .natureOfBussinessID,
                  name: corporateUpdated.corporate.natureOFBussiness
                    .natureOfBussiness,
                },
                category: corporateUpdated.corporate.corporateCategory,
                rfqTimers: [
                  {
                    treasuryRFQExpiryInMin: Number(
                      corporateUpdated.corporate.rfqTimers.treasuryRFQTimer
                    ),
                    corporateRFQExpiryInMin: Number(
                      corporateUpdated.corporate.rfqTimers.corporateRFQTimer
                    ),
                    corporateID: corporateUpdated.corporate.corporateID,
                  },
                ],
                value: corporateUpdated.corporate.corporateID,
                label: corporateUpdated.corporate.corporateName,
              };
              setCompanyRole(corporateRoleData);
              setCorporateUser({
                ...corporateUser,
                rfqTreasury: `${corporateUpdated.corporate.rfqTimers.treasuryRFQTimer} Minutes`,
                rfqCorporate: `${corporateUpdated.corporate.rfqTimers.corporateRFQTimer} Minutes`,
                natureOfClient:
                  corporateUpdated.corporate.natureOFBussiness
                    .natureOfBussiness,
              });
            }
          }
        }
        dispatch(setCorporateUpdated(null));
      } catch (error) {
        console.log(error, "Error in corporate updated effect");
      }
    }
  }, [corporateUpdated]);

  useEffect(() => {
    if (categoryUpdated !== null) {
      if (Array.isArray(companyNameOptions)) {
        let findCategoryObj = companyNameOptions.find(
          (categoryData, index) =>
            categoryData.category.categoryID ===
            categoryUpdated.category.categoryId
        );
        if (findCategoryObj !== undefined) {
          setCompanyNameOptions((prevCategoryData) => {
            return prevCategoryData.map((data4, index) => {
              console.log(data4, "data4data4data4data4");
              if (
                data4.category.categoryID ===
                categoryUpdated.category.categoryId
              ) {
                return {
                  ...data4,
                  categoryID: categoryUpdated.category.categoryId,
                  categoryName: categoryUpdated.category.category,
                  category: {
                    ...data4.category,
                    categoryName: categoryUpdated.category.category,
                  },
                };
              }
              return data4;
            });
          });
          // console.log(categoryID, "categoryIDcategoryIDcategoryID");
          if (
            corporateUser.categoryID === categoryUpdated.category.categoryId
          ) {
            setCorporateUser({
              ...corporateUser,
              categoryName: categoryUpdated.category.category,
            });
          }

          dispatch(setCategoryUpdated(null));
        }
      }
    }
  }, [categoryUpdated]);

  // Handle File upload
  const HandleFileUpload = (event) => {
    // setBulkUploadClicked(true);
    const { files } = event.target;
    if (files !== undefined && files.length > 0) {
      let ext = files[0].name.split(".").pop();
      if (ext === "xls" || ext === "xlsx") {
        let fileData = files[0];
        dispatch(
          CorporateUsersBulkListAPI(navigate, fileData, setBulkUploadClicked)
        );
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
              <span className={styles["bank-user-label"]}>
                Add a Corporate user
              </span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="m-0 p-0">
              <Paper className={styles["corporateuser-paper"]}>
                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12} className="d-flex">
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Name
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        name={"firstName"}
                        labelClass="d-none"
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                        value={corporateUser.firstName?.value || ""}
                        onChange={addCorporateUserValidateHandler}
                        maxLength={50}
                      />
                    </div>
                  </Col>

                  <Col lg={4} md={4} sm={12}>
                    <CustomUpload change={HandleFileUpload} />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Email
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        labelClass="d-none"
                        name={"email"}
                        value={corporateUser.email.value || ""}
                        onChange={addCorporateUserValidateHandler}
                        formParentClass={"MainClass"}
                        className={styles["InputFieldClass"]}
                      />
                    </div>
                    {corporateUser.email.errorStatus && (
                      <Row>
                        <Col className="d-flex justify-content-start">
                          <p className={styles["bankErrorMessage"]}>
                            {corporateUser.email.errorMessage}
                          </p>
                        </Col>
                      </Row>
                    )}

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
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Company Name
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>

                      <Col className="position-relative">
                        <Select
                          options={companyNameOptions}
                          isSearchable={true}
                          value={companyRoleID !== 0 ? companyRoleID : null}
                          onChange={CompanySelectHandler}
                          classNamePrefix={"selectCateogyCorporateList"}
                          className={styles["InputFieldClass"]}
                        />
                        <Button
                          className={styles["PlusButton"]}
                          icon={<span className={styles["PlusIcon"]}>+</span>}
                          onClick={handlePlusButton}
                        />
                        <Button
                          className={styles["EditButton"]}
                          icon={<i className={"icon-edit color-blue"}></i>}
                          onClick={() => handleEditButton(companyRoleID)}
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
                        labelClass="d-none"
                        value={corporateUser.categoryName || ""}
                        maxLength={50}
                        disable={true}
                        formParentClass={"MainClass"}
                        className={styles["disableText"]}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>Chat</span>

                      <Checkbox
                        label2="Active"
                        classNameDiv={styles["CheckboxActive"]}
                        onChange={changeActiveTick}
                        checked={
                          corporateUser.isChatActive.value ? true : false
                        }
                        className={styles["InputFieldClass"]}
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        FE / Non-FE
                      </span>
                      <Checkbox
                        label2="FE"
                        classNameDiv={styles["CheckboxActive"]}
                        onChange={changeFETick}
                        checked={corporateUser.isFEActive.value ? true : false}
                      />
                      <Checkbox
                        label2="Non-FE"
                        classNameDiv={styles["CheckboxActive"]}
                        onChange={changeNonFETick}
                        checked={
                          corporateUser.isNonFEActive.value ? true : false
                        }
                      />
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        RFQ Timer
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>

                      <Col className="me-2">
                        <span className={styles["labels-add-bank"]}>
                          Treasury
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                        <TextField
                          className={styles["disableText"]}
                          labelClass="d-none"
                          value={corporateUser.rfqTreasury || ""}
                          disable={true}
                        />
                      </Col>

                      <Col>
                        <span className={styles["labels-add-bank"]}>
                          Corporate
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                        <TextField
                          className={styles["disableText"]}
                          labelClass="d-none"
                          value={corporateUser.rfqCorporate || ""}
                          disable={true}
                        />
                      </Col>
                    </div>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={7} md={7} sm={12}>
                    <div className="d-flex justify-content-start align-items-start w-100">
                      <span className={styles["labels-add-bank"]}>
                        Nature of the Client
                        <span className={styles["aesterick-color"]}>*</span>
                      </span>
                      <TextField
                        className={styles["disableText"]}
                        labelClass="d-none"
                        value={corporateUser.natureOfClient || ""}
                        disable={true}
                        formParentClass={"MainClass"}
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
                      className={styles["Active-btn-Corp"]}
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
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>

      {showActivationModal && (
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

export default AddCorporateUser;
