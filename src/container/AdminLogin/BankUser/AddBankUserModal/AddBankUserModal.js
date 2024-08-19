import React from "react";
import styles from "./AddBankUserModal.module.css";
import { Button, Modal, TextField } from "../../../../components/elements";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdduserModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
const AddBankUserModal = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(AdduserModalSystemAdmin(false));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.addBankUserModal}
      setShow={(value) => dispatch(AdduserModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(AdduserModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Add Branch</span>
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
                Category
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Select isSearchable={true} />
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
              icon={<i class="icon-users"></i>}
              text={"Add Branch"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
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

export default AddBankUserModal;
