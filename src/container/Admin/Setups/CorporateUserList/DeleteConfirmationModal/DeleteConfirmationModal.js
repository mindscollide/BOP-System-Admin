import React from "react";
import styles from "./DeleteConfirmationModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Button, Modal } from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { DeleteCorporateModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
const DeleteConfirmationModal = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle No Button
  const handleNoButton = () => {
    dispatch(DeleteCorporateModalSystemAdmin(false));
  };

  return (
    <Modal
      show={BOPSystemAdminModal.deleteCorporateModal}
      setShow={(value) => dispatch(DeleteCorporateModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(DeleteCorporateModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Confirmation</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="d-flex align-items-center">
              <span className={styles["labels-add-bank"]}>
                Are you sure you want to do this action?
              </span>
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
              icon={<i class="icon-check"></i>}
              text={"Yes"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
            />

            <Button
              icon={<i class="icon-close"></i>}
              text={"No"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleNoButton}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default DeleteConfirmationModal;
