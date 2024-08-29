import React from "react";
import styles from "./EditCompanyModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { editCompanyModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Button, Modal, TextField } from "../../../../components/elements";
import { Col, Row } from "react-bootstrap";
const EditCompanyModal = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const handleCrossIcon = () => {
    dispatch(editCompanyModalSystemAdmin(false));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.editCompanyModal}
      setShow={(value) => dispatch(editCompanyModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(editCompanyModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={11} md={11} sm={12}>
              <span className={styles["AddCompanyLabel"]}>Edit Company</span>
            </Col>
            <Col lg={1} md={1} sm={12}>
              <Button
                className={styles["CrossButton"]}
                icon={<i class="icon-close"></i>}
                iconClass={styles["crossIconClass"]}
                onClick={handleCrossIcon}
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
              <TextField labelClass="d-none" name={"firstName"} />
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
                    classNamePrefix="selectCateogyCorporateList"
                    placeholder={"3 Minutes"}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    classNamePrefix="selectCateogyCorporateList"
                    placeholder={"3 Minutes"}
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
                classNamePrefix="selectCateogyCorporateList"
                placeholder={"IMPORTANT PAYMENT"}
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
                text={"Update"}
                icon={<i class="icon-refresh"></i>}
                className={styles["AddButton"]}
              />
              <Button
                text={"Cancel"}
                icon={<i class="icon-close"></i>}
                className={styles["CancelButton"]}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default EditCompanyModal;
