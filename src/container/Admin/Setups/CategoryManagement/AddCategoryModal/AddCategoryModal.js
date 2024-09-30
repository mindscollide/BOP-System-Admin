import React from "react";
import style from "./AddCategoryModal.module.css";
import { Button, Modal, TextField } from "../../../../../components/elements";
import { AddCategoryModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Addcategory } from "../../../../../store/actions/AddCategoryActions";

const AddCategoryModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle Cross icon
  const handleCrossIcon = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
  };

  //handle Add Button
  const handleAddButton = () => {
    let data = {
      Category: "Forex Category By Mehdee",
      BidSpread: 0.5,
      OfferSpread: 0.75,
      AssetTypeId: 2,
      UserId: 48,
      BankID: 1,
    };
    dispatch(Addcategory(navigate, data));
  };

  //handle CancelButton
  const handleCancelButton = () => {
    dispatch(AddCategoryModalSystemAdmin(false));
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
              <TextField labelClass={"d-none"} />
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
              <span className={style["Label"]}>
                Bid <span className={style["asteric"]}>*</span>
              </span>
              <TextField labelClass={"d-none"} />
            </Col>
            <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
              <span className={style["Label"]}>
                Offer <span className={style["asteric"]}>*</span>
              </span>
              <TextField labelClass={"d-none"} />
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
