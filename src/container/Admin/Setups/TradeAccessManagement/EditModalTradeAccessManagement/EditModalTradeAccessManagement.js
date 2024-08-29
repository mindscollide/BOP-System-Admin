import React from "react";
import styles from "./EditModalTradeAccessManagement.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { editTradeAccessManagementModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import { Button, Modal } from "../../../../../components/elements";
const EditModalTradeAccessManagement = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle No Button
  const handleNoButton = () => {
    dispatch(editTradeAccessManagementModalSystemAdmin(false));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.editModalTradeAccessManagement}
      setShow={(value) =>
        dispatch(editTradeAccessManagementModalSystemAdmin(value))
      }
      className="UniversalBOPModalStylesTradeAccessManagment"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="xl"
      onHide={() => dispatch(editTradeAccessManagementModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["HeaderNameLabel"]}>Gulahmed</span>
            </Col>
          </Row>
          <Row>
            <Col lg></Col>
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
              text={"Save Changes"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
            />

            <Button
              icon={<i class="icon-close"></i>}
              text={"Cancel"}
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

export default EditModalTradeAccessManagement;
