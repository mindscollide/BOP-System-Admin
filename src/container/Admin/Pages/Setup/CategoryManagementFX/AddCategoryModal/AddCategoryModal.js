import React, { useState } from "react";
import style from "./AddCategoryModal.module.css";
import {
  Button,
  Modal,
  TextField,
} from "../../../../../../components/elements";
import { AddCategoryModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
// import { Addcategory } from "../../../../../store/actions/AddCategoryActions";
import { addCategroyModalSchema } from "../../../../../../utils/schemas";
import { Addcategory } from "../../../../../../store/actions/AddCategoryActions";
import { formatCurrencyInput } from "../../../../../../helpers/reusableMethods";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const [addCategory, setAddCategory] = useState({ ...addCategroyModalSchema });

  //handle Cross icon
  const handleCrossIcon = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
  };

  //handle Add Button
  const handleAddButton = () => {
    let data = {
      Name: addCategory.Name.value,
      Bid: Number(addCategory.Bid.value),
      Offer: Number(addCategory.Offer.value),
    };

    console.log("data save", data);
    dispatch(Addcategory(navigate, data));
  };

  //handle CancelButton
  const handleCancelButton = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
  };

  const handleValueChange = (e) => {
    const { name, value } = e.target;

    const validateInput = {
      Name: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
      // Bid: (val) => val.replace(/[^0-9]/g, "").trimStart(),
      Bid: (val) => formatCurrencyInput(val),
      Offer: (val) => formatCurrencyInput(val),
    };
    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setAddCategory((prevState) => ({
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
                onChange={handleValueChange}
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
        </>
      }
    />
  );
};

export default AddCategoryModal;
