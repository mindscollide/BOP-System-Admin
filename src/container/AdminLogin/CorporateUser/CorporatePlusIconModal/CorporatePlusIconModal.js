import React, { useEffect, useState } from "react";
import styles from "./CorporatePlusIconModal.module.css";
import { Button, Modal, TextField } from "../../../../components/elements";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { corporatePlusIconModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import { CreateNewCorporateAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { addCompanySchema } from "../../../../utils/schemas";
import {
  categoryOptions,
  natureOfClientOptions,
  RFQTimerOptions,
} from "../../../../helpers/Dropdown";
const CorporatePlusIconModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //State for add company
  const [addCompany, setAddCompnany] = useState({ ...addCompanySchema });

  //State For Category dropdown
  const [category, setCategory] = useState(null);

  //State for RFQ Timer Treasury
  const [RFQTimerTreasury, setRFQTimerTreasury] = useState(null);

  //State for RFQ Timer Corporate
  const [RFQTimerCorporate, setRFQTimerCorporate] = useState(null);

  //State for Nature of Client
  const [natureOfClient, setNatureOfClient] = useState(null);

  //Activate Button
  const [isActive, setIsActive] = useState(false);

  //Handle Cancel Button
  const handleCancelButton = () => {
    dispatch(corporatePlusIconModalSystemAdmin(false));
  };

  //Handle Change Function for input
  const handleValueChangeAndValidation = (e) => {
    const { name, value } = e.target;

    // Validation rules
    const validateInput = {
      companyName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
    };

    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setAddCompnany((prevState) => ({
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

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
  };

  const handleAddCorporateCompany = () => {
    // let data = {
    //   FK_AssetTypeID: 2,
    //   RFQTreasuryExpiryTimer: 30,
    //   RFQCorporateExpiryTimer: 40,
    //   CorporateName: "Stonk Tech",
    //   NatureOfBusinessID: 2,
    //   FK_CategoryID: 57,
    //   BankId: 1,
    // };
    let data = {
      CorporateName: addCompany.companyName.value,
      FK_CategoryID: addCompany.category.value,
      RFQTreasuryExpiryTimer: addCompany.RFQTimerTreasury.value,
      RFQCorporateExpiryTimer: addCompany.RFQTimerCorporate.value,
      NatureOfBusinessID: addCompany.natureOfClient.value,
    };
    console.log("Create New Corporate Company Data", data);
    dispatch(CreateNewCorporateAPI(navigate, data));
  };

  useEffect(() => {
    if (
      addCompany.companyName.value !== "" &&
      addCompany.category.value !== "" &&
      addCompany.RFQTimerTreasury.value !== "" &&
      addCompany.RFQTimerCorporate.value !== "" &&
      addCompany.natureOfClient.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [
    addCompany,
    addCompany.category.value,
    addCompany.RFQTimerTreasury.value,
    addCompany.RFQTimerCorporate.value,
    addCompany.natureOfClient.value,
  ]);

  return (
    <Modal
      show={BOPSystemAdminModal.corporatePlusIconModal}
      setShow={(value) => dispatch(corporatePlusIconModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(corporatePlusIconModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={11} md={11} sm={12}>
              <span className={styles["AddCompanyLabel"]}>Add Company</span>
            </Col>
            <Col lg={1} md={1} sm={12}>
              <Button
                className={styles["CrossButton"]}
                icon={<i className="icon-close"></i>}
                iconClass={styles["crossIconClass"]}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Company Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <TextField
                labelClass="d-none"
                name="companyName"
                value={addCompany.companyName.value}
                onChange={handleValueChangeAndValidation}
                maxLength={50}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Category
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Select
                classNamePrefix={"ModalAbsoluteDropdown"}
                isSearchable="true"
                options={categoryOptions}
                value={category}
                menuPortalTarget={document.body}
                onChange={(e) =>
                  handleDropdownChange(
                    "category",
                    e,
                    setCategory,
                    addCompany.category
                  )
                }
                className={styles["react-select-field"]}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                <span className={styles["labels-add-bank"]}>
                  RFQ Timer
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </span>
            </Col>

            <Col lg={8} md={8} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    className="RFQTimerTreasury"
                    classNamePrefix={"ModalAbsoluteDropdown"}
                    options={RFQTimerOptions}
                    value={RFQTimerTreasury}
                    isSearchable="true"
                    menuPortalTarget={document.body}
                    onChange={(e) =>
                      handleDropdownChange(
                        "RFQTimerTreasury",
                        e,
                        setRFQTimerTreasury,
                        addCompany.RFQTimerTreasury
                      )
                    }
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>

                  <Select
                    className="RFQTimerCorporate"
                    classNamePrefix={"ModalAbsoluteDropdown"}
                    options={RFQTimerOptions}
                    value={RFQTimerCorporate}
                    isSearchable="true"
                    // styles={{
                    //   menuPortal: (props) => (
                    //     <div
                    //       {...props}
                    //       style={{
                    //         position: "absolute",
                    //         top: "100%",
                    //         left: "0",
                    //         width: "100%",
                    //         zIndex: "1000",
                    //       }}
                    //     >
                    //       {props.children}
                    //     </div>
                    //   ),
                    // }}
                    // }}
                    menuPortalTarget={document.body}
                    onChange={(e) =>
                      handleDropdownChange(
                        "RFQTimerCorporate",
                        e,
                        setRFQTimerCorporate,
                        addCompany.RFQTimerCorporate
                      )
                    }
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Nature of Client
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Select
                classNamePrefix="ModalAbsoluteDropdown"
                options={natureOfClientOptions}
                value={natureOfClient}
                isSearchable="true"
                menuPortalTarget={document.body}
                onChange={(e) =>
                  handleDropdownChange(
                    "natureOfClient",
                    e,
                    setNatureOfClient,
                    addCompany.natureOfClient
                  )
                }
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-4">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                text={"Add"}
                icon={<i className="icon-users"></i>}
                className={styles["AddButton"]}
                onClick={handleAddCorporateCompany}
                disableBtn={isActive ? false : true}
              />
              <Button
                text={"Cancel"}
                icon={<i className="icon-close"></i>}
                className={styles["CancelButton"]}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default CorporatePlusIconModal;
