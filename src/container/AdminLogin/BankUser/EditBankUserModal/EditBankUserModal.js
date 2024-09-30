import React from "react";
import styles from "./EditBankUserModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { editBankUserModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Button, Modal, TextField } from "../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { UpdateBranchAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
const EditBankUserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(editBankUserModalSystemAdmin(false));
  };

  //Handle Update Branch
  const handleUpdateBranch = () => {
    let data = {};
    dispatch(UpdateBranchAPI(navigate, data));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.editBankUserModal}
      setShow={(value) => dispatch(editBankUserModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(editBankUserModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Edit Branch</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
              <span className={styles["labels-add-bank"]}>
                Branch Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
              <span className={styles["labels-add-bank"]}>
                Branch Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
              <span className={styles["labels-add-bank"]}>
                Contact
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <Row className="mb-3">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center gap-2"
          >
            <Button
              icon={<i class="icon-refresh"></i>}
              text={"Update"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
              onClick={handleUpdateBranch}
            />

            <Button
              icon={<i class="icon-close"></i>}
              text={"Cancel"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleCancelButton}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default EditBankUserModal;
