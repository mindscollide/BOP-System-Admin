import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./ApprovalModal.css";

const ApprovalModal = ({ ModalTitle, modalApproval, setModalApproval }) => {
  // for close modal handler
  const closeApprovalModal = () => {
    setModalApproval(false);
  };
  return (
    <Fragment>
      <Modal
        show={modalApproval}
        setShow={setModalApproval}
        className="modaldialog modal-Approval"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="modal-Approval-footer"
        size="lg"
        onHide={closeApprovalModal}
        ModalBody={
          <Fragment>
            {modalApproval ? (
              <Fragment>
                <Row className="mt-2">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                  >
                    <p className="paragraph-accepting">
                    Are you sure you want to add Approval Reason?
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
              <Col lg={12} md={12} sm={12} className="footer-approval-btn-col">
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

export default ApprovalModal;
