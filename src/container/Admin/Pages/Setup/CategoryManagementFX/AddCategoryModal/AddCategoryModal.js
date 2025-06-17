import React, { useState } from "react";
import style from "./AddCategoryModal.module.css";
import {
  Button,
  Loader,
  Modal,
  TextField,
} from "../../../../../../components/elements";
import { AddCategoryModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { addCategroyModalSchema } from "../../../../../../utils/schemas";
import { Addcategory } from "../../../../../../store/actions/AddCategoryActions";
import {
  formatCurrencyInput,
  isValidNumberUnderMax,
} from "../../../../../../helpers/reusableMethods";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal, AddCategory } = useSelector((state) => state);
  const [addCategory, setAddCategory] = useState({ ...addCategroyModalSchema });

  //Handle Cross icon
  const handleCrossIcon = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
  };

  //Handle Add Button Api hit for Adding a Category
  const handleAddButton = () => {
    let data = {
      Category: addCategory.Name.value,
      BidSpread: Number(addCategory.Bid.value),
      OfferSpread: Number(addCategory.Offer.value),
    };

    console.log("data save", data);
    dispatch(Addcategory(navigate, data));
  };

  //Handle CancelButton
  const handleCancelButton = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
  };

  // Handle Onchange for text fields
  const handleNameChange = (e) => {
    const { value } = e.target;
    let validName = value.replace(/[^a-zA-Z0-9 ]/g, "").trimStart();

    // const validateInput = (val) => val;
    const isFieldEmpty = (val) => val === "";

    const hasError = isFieldEmpty(validName);

    setAddCategory((prevState) => ({
      ...prevState,
      Name: {
        value: validName,
        errorMessage: hasError ? "This field is required" : "",
        errorStatus: hasError,
      },
    }));
    // };
    // Update field function
    // const updateField = (fieldName, fieldValue) => {
    //   const validValue = validateInput[fieldName]
    //     ? validateInput[fieldName](fieldValue)
    //     : fieldValue;

    //   const hasError = isFieldEmpty(validValue);

    //   setAddCategory((prevState) => ({
    //     ...prevState,
    //     [fieldName]: {
    //       value: validValue,
    //       errorMessage: hasError ? "This field is required" : "",
    //       errorStatus: hasError,
    //     },
    //   }));
    // };

    // // Update the specific field
    // updateField(name, value);
  };

  // Handle Onchange for text fields
  const handleValueChange = (e) => {
    const { name, value } = e.target;

    // const validateInput = {
    //   Name: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
    //   // Bid: (val) => val.replace(/[^0-9]/g, "").trimStart(),
    //   Bid: (val) => formatCurrencyInput(val),
    //   Offer: (val) => formatCurrencyInput(val),
    // };
    if (isValidNumberUnderMax(value, "", 1000)) {
      const regular_ex = /^(0\d)$/; // Matches "00", "01", ..., "09"
      const sanitizedValue =
        value === "" || value === "."
          ? "0"
          : regular_ex.test(value)
          ? value.slice(1)
          : value === "0.0"
          ? "0.1"
          : // Remove leading "0" (e.g., "09" → "9")
            value;
      if (name === "Bid") {
        setAddCategory((prevState) => ({
          ...prevState,
          Bid: {
            value: sanitizedValue,
            errorMessage: "",
            errorStatus: false,
          },
        }));
      }
      if (name === "Offer") {
        setAddCategory((prevState) => ({
          ...prevState,
          Offer: {
            value: sanitizedValue,
            errorMessage: "",
            errorStatus: false,
          },
        }));
      }
    }
    // const isFieldEmpty = (val) => val === "";

    // Update field function
    // const updateField = (fieldName, fieldValue) => {
    //   const validValue = validateInput[fieldName]
    //     ? validateInput[fieldName](fieldValue)
    //     : fieldValue;

    //   const hasError = isFieldEmpty(validValue);

    // };

    // Update the specific field
  };

  return (
    <Modal
      show={BOPSystemAdminModal.addCategoryModal}
      setShow={(value) => dispatch(AddCategoryModalSystemAdmin(value))}
      className="UniversalBOPModalStylesAddCategory"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(AddCategoryModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col
              lg={11}
              md={11}
              sm={12}
              className="d-flex justify-content-center"
            >
              <span className={style["HeadingAddCategory"]}>Add Category</span>
            </Col>
            <Col lg={1} md={1} sm={12}>
              <Button
                className={style["CrossButton"]}
                icon={<i class="icon-close"></i>}
                iconClass={style["crossIconClass"]}
                onClick={handleCrossIcon}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={style["Label"]}>
                Name <span className={style["asteric"]}>*</span>
              </span>
              <TextField
                labelClass={"d-none"}
                name={"Name"}
                value={addCategory.Name.value}
                onChange={handleNameChange}
                maxLength={25}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <span className={style["Label"]}>
                Spread <span className={style["asteric"]}>*</span>
              </span>
            </Col>
          </Row>
          <Row>
            <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
              <span className={style["Label"]}>Bid</span>
              <TextField
                labelClass={"d-none"}
                value={addCategory.Bid.value}
                name={"Bid"}
                onChange={handleValueChange}
                maxLength={10}
              />
            </Col>
            <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
              <span className={style["Label"]}>Offer</span>
              <TextField
                labelClass={"d-none"}
                value={addCategory.Offer.value}
                name={"Offer"}
                onChange={handleValueChange}
                maxLength={10}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                text={"Add"}
                className={style["AddButton"]}
                onClick={handleAddButton}
                disableBtn={
                  addCategory.Name.value !== "" &&
                  addCategory.Bid.value !== "" &&
                  addCategory.Offer.value !== ""
                    ? false
                    : true
                }
              />
              <Button
                text={"Cancel"}
                className={style["cancelButton"]}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
          {AddCategory.Loading && <Loader />}
        </>
      }
    />
  );
};

export default AddCategoryModal;
