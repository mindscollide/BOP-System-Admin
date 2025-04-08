import React from "react";
import styles from "./CommentModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { Button, Modal } from "../../../../../components/elements";
import { TradeCountCommentModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";

const CommentModal = ({ text }) => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  // const showActivationMOdal = useSelector(
  //   (state) => state.BOPSystemAdminModal.addBankUserConfirmationModal
  // );

  // const handleYesButton = () => {
  //   if (onConfirm) {
  //     onConfirm();
  //   }
  //   dispatch(TradeCountCommentModalSystemAdmin(false));
  // };
  const handleCrossIcon = () => {
    dispatch(TradeCountCommentModalSystemAdmin(false));
  };
  return (
    <Modal
      // show={showActivationMOdal}
      show={BOPSystemAdminModal.tradeCountCommentModal}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(TradeCountCommentModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={11} md={11} sm={11}>
              <span className={styles["AddBranchLabel"]}>Comments</span>
            </Col>
            <Col lg={1} md={1} sm={1}>
              <Button
                className={styles["CrossButton"]}
                icon={<i className="icon-close"></i>}
                onClick={handleCrossIcon}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="d-flex align-items-center">
              <span className={styles["labels-add-bank"]}>{"text"}</span>
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
            {/* <Button
              icon={<i className="icon-check"></i>}
              text={"Yes"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
              onClick={handleYesButton}
            /> */}

            {/* <Button
              icon={<i className="icon-close"></i>}
              text={"No"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleNoButton}
            /> */}
          </Col>
        </Row>
      }
    />
  );
};

export default CommentModal;
