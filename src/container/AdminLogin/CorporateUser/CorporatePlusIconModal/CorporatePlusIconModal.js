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
import { RFQTimerOptions } from "../../../../helpers/Dropdown";
import {
  GetAllCategoriesAPI,
  GetAllNatureAPI,
} from "../../../../store/actions/Auth-Actions";
const CorporatePlusIconModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  const getAllNatureOfBuisness = useSelector(
    (state) => state.auth.getAllNatureOfBuisness
  );
  // console.log("getAllNatureOfBuisness", getAllNatureOfBuisness);

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [natureOptions, setNatureOptions] = useState([]);

  // console.log("categoryOptions", categoryOptions);
  //State for add company
  const [addCompany, setAddCompnany] = useState({ ...addCompanySchema });

  //State For Category dropdown
  // const [category, setCategory] = useState(null);

  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });
  const [natureID, setNatureID] = useState({
    value: 0,
    label: "",
  });
  //State for RFQ Timer Treasury
  const [RFQTimerTreasury, setRFQTimerTreasury] = useState(null);

  //State for RFQ Timer Corporate
  const [RFQTimerCorporate, setRFQTimerCorporate] = useState(null);

  //Activate Button
  // const [isActive, setIsActive] = useState(false);

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
    let data = {
      FK_CategoryID: categoryID.categoryID,
      FK_AssetTypeID: categoryID.fK_AssetTypeID,
      RFQTreasuryExpiryTimer: addCompany.RFQTimerTreasury.value,
      RFQCorporateExpiryTimer: addCompany.RFQTimerCorporate.value,
      CorporateName: addCompany.companyName.value,
      // NatureOfBusinessID: addCompany.natureOfClient.value,
      NatureOfBusinessID: natureID.pK_NatureOfBusiness,
      BankId: 1,
    };
    dispatch(CreateNewCorporateAPI(navigate, data));
    dispatch(corporatePlusIconModalSystemAdmin(false));
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
    dispatch(GetAllNatureAPI(navigate));
  }, []);

  useEffect(() => {
    if (getAllCategories !== null) {
      try {
        let newCategoriesData = getAllCategories.categories.map((category) => {
          return {
            ...category,
            value: { value: category.categoryID },
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);
      } catch (error) {}
    }

    if (getAllNatureOfBuisness !== null) {
      try {
        let newNatureOfBusiness = getAllNatureOfBuisness.natureofBusinesses.map(
          (natureOfBusiness) => {
            return {
              ...natureOfBusiness,
              value: natureOfBusiness.pK_NatureOfBusiness,
              label: natureOfBusiness.name,
            };
          }
        );
        setNatureOptions(newNatureOfBusiness);
      } catch (error) {}
    }
  }, [getAllCategories, getAllNatureOfBuisness]);

  //handle select categoryID
  const handleSelectCategory = async (selectedCategory) => {
    setCategoryID(selectedCategory);

    addCompanySchema((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.categoryID, value: selectedCategory.value },
    }));
  };

  //handle select categoryID
  const handleSelectNature = async (selectedNature) => {
    console.log(selectedNature.value, "selectedCategoryselectedCategory");
    setNatureID(selectedNature);

    addCompanySchema((prevState) => ({
      ...prevState,
      natureOfClient: {
        ...prevState.natureOfClient,
        value: selectedNature.value,
      },
    }));
  };
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
                placeholder="Select Category"
                classNamePrefix={"ModalAbsoluteDropdown"}
                isSearchable="true"
                options={categoryOptions}
                value={categoryID.value !== 0 ? categoryID : null}
                menuPortalTarget={document.body}
                onChange={handleSelectCategory}
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
                placeholder
                classNamePrefix="ModalAbsoluteDropdown"
                options={natureOptions}
                value={natureID.value !== 0 ? natureID : null}
                isSearchable="true"
                menuPortalTarget={document.body}
                onChange={handleSelectNature}
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
                disableBtn={
                  categoryID.value !== 0 &&
                  categoryID.value !== 0 &&
                  addCompany.RFQTimerTreasury.value !== "" &&
                  addCompany.RFQTimerCorporate.value !== "" &&
                  addCompany.companyName.value !== "" &&
                  natureID.value !== 0
                    ? false
                    : true
                }
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
