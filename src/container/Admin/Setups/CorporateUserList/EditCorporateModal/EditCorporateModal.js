import React, { useEffect, useState } from "react";
import styles from "./EditCorporateModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  CustomRadio,
  Modal,
  TextField,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { EditCorporateModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import Select from "react-select";
import { RFQTimerOptions } from "../../../../../helpers/Dropdown";
import { updateCorporateUserSchema } from "../../../../../utils/schemas";
import { validateBopEmail } from "../../../../../utils/regexUtil";
import { useNavigate } from "react-router-dom";
import { UpdateCorporateUsersAPI } from "../../../../../store/actions/BOPSystemAdminActions";
const EditCorporateModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  // const { auth } = useSelector((state) => state);
  // console.log("this is the user", auth);
  //States
  // const [value, setValue] = useState("Corporate");

  //state for error Message
  // const [errorShow, setErrorShow] = useState(false);

  //Dummy User for handlin UI change bansed on the user Secuity admiin or system admin
  let user = "System Admin";

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //State for add company
  const [updateCorporate, setUpdateCorporate] = useState({
    ...updateCorporateUserSchema,
  });

  //Options for radio
  const radioOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  //State for RFQ Timer Treasury
  const [RFQTimerTreasury, setRFQTimerTreasury] = useState({
    label: "3 Minutes",
    value: 3,
  });

  //State for RFQ Timer Corporate
  const [RFQTimerCorporate, setRFQTimerCorporate] = useState({
    label: "3 Minutes",
    value: 3,
  });

  //Handle Value Change and Validation
  const handleValueChangeAndValidation = (e) => {
    const { name, value } = e.target;

    //Validation rules
    const validateInput = {
      firstName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
      // email: (val) => val.replace(/\s+/g, ""),
      // corporateName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
    };

    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setUpdateCorporate((prevState) => ({
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

  //Handle Select RFQTreasury
  const handleRFQTimerTreasurySelect = (selectedTrasury) => {
    setRFQTimerTreasury(selectedTrasury);
    setUpdateCorporate((prevState) => ({
      ...prevState,
      RFQTimerTreasury: {
        ...prevState.RFQTimerTreasury,
        value: selectedTrasury.value,
        label: selectedTrasury.label,
      },
    }));
  };

  //Handle Select RFQCorporate
  const handleRFQTimerCorporateSelect = (selectedCorporate) => {
    setRFQTimerCorporate(selectedCorporate);
    setUpdateCorporate((prevState) => ({
      ...prevState,
      RFQTimerCorporate: {
        ...prevState.RFQTimerCorporate,
        value: selectedCorporate.value,
        label: selectedCorporate.label,
      },
    }));
  };
  //Radio Buttons Management
  const handleRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setUpdateCorporate({
      ...updateCorporate,
      activeUser: {
        value: e.target.value,
      },
    });
  };

  // show error message When user hit activate btn
  const handleUpdateButton = () => {
    if (
      updateCorporate.firstName.value !== "" &&
      updateCorporate.email.value !== "" &&
      updateCorporate.corporateName.value !== "" &&
      updateCorporate.RFQTimerTreasury.value !== "" &&
      updateCorporate.RFQTimerCorporate.value !== "" &&
      updateCorporate.activeUser.value !== ""
    ) {
      if (validateBopEmail(updateCorporate.email.value)) {
        // setErrorShow(false);
        let newData = {
          User: {
            FirstName: updateCorporate.firstName.value,
            Email: updateCorporate.email.value,
            CorporateName: updateCorporate.corporateName.value,
            RFQTimerTreasury: updateCorporate.RFQTimerTreasury.value,
            RFQTimerCorporate: updateCorporate.RFQTimerCorporate.value,
            ActiveUser: updateCorporate.activeUser.value,
          },
        };
        console.log("newData", newData);
        dispatch(UpdateCorporateUsersAPI(navigate, newData));
      } else {
        console.log("updateCorporateUser Dispatched");
        // setErrorShow(true);
      }
    } else {
      // setTimeout();

      setOpen({
        open: true,
        message: "Fill All Required Fields",
      });
      // setErrorShow(true);
    }
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(EditCorporateModalSystemAdmin(false));
  };

  return (
    <Modal
      show={BOPSystemAdminModal.editCorporateModal}
      setShow={(value) => dispatch(EditCorporateModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(EditCorporateModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Edit Corporate</span>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField
                labelClass="d-none"
                name={"firstName"}
                value={updateCorporate.firstName.value}
                onChange={handleValueChangeAndValidation}
                maxLength={50}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Email
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField
                labelClass="d-none"
                name="email"
                value={updateCorporate.email.value}
                onChange={handleValueChangeAndValidation}
                disable
              />
            </Col>

            {/* <Col className="d-flex justify-content-start">
              <p
                className={
                  errorShow &&
                  !/^[a-zA-Z0-9._%+-]+@bop\.com$/.test(
                    updateCorporate.email.value
                  )
                    ? styles["bankErrorMessage"]
                    : styles["bankErrorMessage_hidden"]
                }
              >
                Email address with domain of bop is required
              </p>
            </Col> */}
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Corporate Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField
                labelClass="d-none"
                name={"corporateName"}
                value={updateCorporate.corporateName.value}
                onChange={handleValueChangeAndValidation}
                disable={true}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                RFQ Timer
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  {/* <Select
                    className="RFQTimerTreasury"
                    classNamePrefix={"selectCateogyCorporateList"}
                    options={RFQTimerOptions}
                    value={RFQTimerTreasury}
                    isSearchable={true}
                    menuPortalTarget={document.body}
                    onChange={handleRFQTimerTreasurySelect}
                    isDisabled
                  /> */}
                  <TextField
                    labelClass="d-none"
                    value={`${RFQTimerTreasury.value} Minutes`}
                    disable={true}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>

                  {/* <Select
                    className="RFQTimerCorporate"
                    classNamePrefix={"selectCateogyCorporateList"}
                    options={RFQTimerOptions}
                    value={RFQTimerCorporate}
                    isSearchable={true}
                    menuPortalTarget={document.body}
                    onChange={handleRFQTimerCorporateSelect}
                    isDisabled
                  /> */}
                  <TextField
                    labelClass="d-none"
                    value={`${RFQTimerCorporate.value} Minutes`}
                    disable={true}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <span className={styles["labels-add-bank"]}>Status</span>
              <span className={styles["aesterick-color"]}>*</span>
            </Col>
          </Row>
          {user === "Security Admin" && (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <CustomRadio
                    name="customRadio"
                    options={radioOptions}
                    onChange={handleRadioChange}
                    value={updateCorporate.activeUser?.value || ""}
                    size="default"
                    className="custom-radio-group"
                  />
                </Col>
              </Row>
            </>
          )}

          {user === "System Admin" && (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  {updateCorporate.activeUser?.value === "Active" ? (
                    <span className={styles["ActiveStatus"]}>Active</span>
                  ) : (
                    <span className={styles["InactiveStatus"]}>Inactive</span>
                  )}
                </Col>
              </Row>
            </>
          )}
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-3 mb-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                icon={<i className="icon-refresh"></i>}
                text={"Update"}
                className={styles["AddBranchClass"]}
                iconClass={styles["IconClass"]}
                onClick={handleUpdateButton}
                disableBtn={
                  updateCorporate.firstName.value !== "" &&
                  updateCorporate.RFQTimerTreasury.value !== "" &&
                  updateCorporate.RFQTimerCorporate.value !== ""
                    ? false
                    : true
                }
              />

              <Button
                icon={<i className="icon-close"></i>}
                text={"Discard"}
                className={styles["CancelButton"]}
                iconClass={styles["IconClass"]}
                onClick={handleDiscardButton}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default EditCorporateModal;
