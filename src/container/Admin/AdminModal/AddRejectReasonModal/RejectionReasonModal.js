import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./RejectionReasonModal.css";

const RejectionReasonModal = ({ ModalTitle, modalReason, setModalReason }) => {
  // for close modal handler
  const closeRejectionReasonModal = () => {
    setModalReason(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalReason}
        setShow={setModalReason}
        className="modaldialog modal-Reason"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="modal-Reason-footer"
        size="lg"
        onHide={closeRejectionReasonModal}
        ModalBody={
          <Fragment>
            {modalReason ? (
              <Fragment>
                <Row className="mt-2">
                  <Col lg={12} md={12} sm={12}>
                    <p className="paragraph-accepting">
                      Are you sure you want to add Rejection Reason?
                    </p>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-Reason-btn-col">
                <Button
                  text="Proceed"
                  className="proceed-btn"
                  icon={<i class="icon-arrow-right icon-right"></i>}
                />
                <Button
                  text="Discard"
                  className="discard-accept-btn"
                  icon={<i class="icon-close icon-right"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default RejectionReasonModal;
