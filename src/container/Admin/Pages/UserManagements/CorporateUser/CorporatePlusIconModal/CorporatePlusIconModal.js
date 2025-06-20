import React, { useEffect, useState } from "react";
import styles from "./CorporatePlusIconModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCompanySchema } from "../../../../../../utils/schemas";
import { corporatePlusIconModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { CreateNewCorporateAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import {
  GetAllCategoriesAPI,
  GetAllNatureAPI,
} from "../../../../../../store/actions/Auth-Actions";
import {
  Button,
  Modal,
  TextField,
} from "../../../../../../components/elements";
import { RFQTimerOptions } from "../../../../../../helpers/Dropdown";
import {
  setCategoryAdded,
  setCategoryUpdated,
} from "../../../../../../store/actions/RealtimeActions";

const CorporatePlusIconModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const categoryAdded = useSelector(
    (state) => state.RealtimeActionReducer.categoryAdded
  );
  const categoryUpdated = useSelector(
    (state) => state.RealtimeActionReducer.categoryUpdated
  );

  const { BOPSystemAdminModal } = useSelector((state) => state);

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);

  const getAllNatureOfBuisness = useSelector(
    (state) => state.auth.getAllNatureOfBuisness
  );

  const [categoryOptions, setCategoryOptions] = useState([]);
  const [natureOptions, setNatureOptions] = useState([]);

  //State for add company
  const [addCompany, setAddCompnany] = useState({ ...addCompanySchema });

  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });

  const [natureID, setNatureID] = useState({
    value: 0,
    label: "",
  });

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

  //Handle Select RFQTreasury
  const handleRFQTimerTreasurySelect = (selectedTrasury) => {
    setRFQTimerTreasury(selectedTrasury);
    setAddCompnany((prevState) => ({
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
    setAddCompnany((prevState) => ({
      ...prevState,
      RFQTimerCorporate: {
        ...prevState.RFQTimerCorporate,
        value: selectedCorporate.value,
        label: selectedCorporate.label,
      },
    }));
  };
  const handleAddCorporateCompany = () => {
    let data = {
      FK_CategoryID: categoryID.categoryID,
      FK_AssetTypeID: categoryID.fK_AssetTypeID,
      RFQTreasuryExpiryTimer: addCompany.RFQTimerTreasury.value,
      RFQCorporateExpiryTimer: addCompany.RFQTimerCorporate.value,
      CorporateName: addCompany.companyName.value,
      NatureOfBusinessID: natureID.pK_NatureOfBusiness,
      BankId: 1,
    };
    dispatch(CreateNewCorporateAPI(navigate, data, setAddCompnany));
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
            value: category.categoryID,
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);

        // Set the first category as default if categories exist
        if (newCategoriesData.length > 0) {
          setCategoryID(newCategoriesData[0]);
          setAddCompnany((prevState) => ({
            ...prevState,
            categoryID: {
              ...prevState.category,
              value: newCategoriesData[0].value,
            },
          }));
        }
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

        // Set the first nature as default if Nature exist
        if (newNatureOfBusiness.length > 0) {
          setNatureID(newNatureOfBusiness[0]);
          setAddCompnany((prevState) => ({
            ...prevState,
            natureOfClient: {
              ...prevState.natureOfClient,
              value: newNatureOfBusiness[0].value,
            },
          }));
        }
      } catch (error) {}
    }
  }, [getAllCategories, getAllNatureOfBuisness]);

  useEffect(() => {
    if (categoryAdded !== null) {
      if (Array.isArray(categoryOptions)) {
        let findCategoryObj = categoryOptions.find(
          (categoryData, index) =>
            categoryData.categoryID === categoryAdded.category.categoryId
        );
        if (findCategoryObj === undefined) {
          let newCategoryhData = {
            ...categoryAdded.category,
            value: categoryAdded.category.categoryId,
            label: categoryAdded.category.category,
          };
          setCategoryOptions([...categoryOptions, newCategoryhData]);
          dispatch(setCategoryAdded(null));
        }
      }
    }
  }, [categoryAdded]);

  useEffect(() => {
    if (categoryUpdated !== null) {
      if (Array.isArray(categoryOptions)) {
        let findCategoryObj = categoryOptions.find(
          (categoryData, index) =>
            categoryData.categoryID === categoryUpdated.category.categoryId
        );
        if (findCategoryObj !== undefined) {
          setCategoryOptions((prevCategoryData) => {
            return prevCategoryData.map((data4, index) => {
              if (data4.categoryID === categoryUpdated.category.categoryId) {
                return {
                  ...data4,
                  value: categoryUpdated.category.categoryId,
                  label: categoryUpdated.category.category,
                };
              }
              return data4;
            });
          });
          if (categoryID.value === categoryUpdated.category.categoryId) {
            setCategoryID({
              value: categoryUpdated.category.categoryId,
              label: categoryUpdated.category.category,
            });
          }

          dispatch(setCategoryUpdated(null));
        }
      }
    }
  }, [categoryUpdated]);

  //handle select categoryID
  const handleSelectCategory = async (selectedCategory) => {
    setCategoryID(selectedCategory);

    setAddCompnany((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.category, value: selectedCategory.value },
    }));
  };

  //handle select natureID
  const handleSelectNature = async (selectedNature) => {
    setNatureID(selectedNature);

    setAddCompnany((prevState) => ({
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
      className="UniversalBOPModalStylesAddCompany"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="lg"
      onHide={() => dispatch(corporatePlusIconModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col
              lg={6}
              md={6}
              sm={6}
              className={styles["AddCompany_modal-title"]}
            >
              Add Company
            </Col>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={styles["AddCompany_modal-crossIcon"]}
            >
              <i
                className={`icon-close cursor-pointer ${styles["cross-icon-style"]}`}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Company Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["addCompany-inputField"]}
            >
              <TextField
                labelClass="d-none"
                name="companyName"
                value={addCompany.companyName.value}
                onChange={handleValueChangeAndValidation}
                maxLength={50}
              />
              {addCompany.companyName.errorStatus && (
                <Row>
                  <Col className="d-flex justify-content-start">
                    <p className={styles["companyErrorMessage"]}>
                      {addCompany.companyName.errorMessage}
                    </p>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Category
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>

            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["addCompany-inputField"]}
            >
              <Select
                classNamePrefix={"selectCateogyCorporateList"}
                isSearchable={true}
                options={categoryOptions}
                value={categoryID}
                menuPortalTarget={document.body}
                onChange={handleSelectCategory}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                <span className={styles["labels-add-bank"]}>
                  RFQ Timer
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </span>
            </Col>

            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["addCompany-inputField"]}
            >
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    classNamePrefix={"selectCateogyCorporateList"}
                    options={RFQTimerOptions}
                    value={RFQTimerTreasury}
                    isSearchable={true}
                    menuPortalTarget={document.body}
                    onChange={handleRFQTimerTreasurySelect}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>

                  <Select
                    classNamePrefix={"selectCateogyCorporateList"}
                    options={RFQTimerOptions}
                    value={RFQTimerCorporate}
                    isSearchable={true}
                    menuPortalTarget={document.body}
                    onChange={handleRFQTimerCorporateSelect}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Nature of Client
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["addCompany-inputField"]}
            >
              <Select
                classNamePrefix="selectCateogyCorporateList"
                options={natureOptions}
                value={natureID}
                isSearchable={true}
                menuPortalTarget={document.body}
                onChange={handleSelectNature}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-4 mb-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                text={"Add"}
                icon={<i className="icon-users"></i>}
                className={styles["AddCorporateButton"]}
                onClick={handleAddCorporateCompany}
                disableBtn={
                  categoryID.value !== 0 &&
                  categoryID.value !== 0 &&
                  addCompany.RFQTimerTreasury.value !== 0 &&
                  addCompany.RFQTimerCorporate.value !== 0 &&
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
