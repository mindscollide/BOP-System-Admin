import React, { Fragment } from "react";
import { Container, Col, Row } from "react-bootstrap";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./DeleteModal.css";

const DeleteModal = ({ ModalTitle, deleteModal, setDeleteModal }) => {
  // for close modal handler
  const closeRejectionModal = () => {
    setDeleteModal(false);
  };
  return (
    <Fragment>
      <Modal
        show={deleteModal}
        setShow={setDeleteModal}
        className="modaldialog modal-Rejection"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="modal-Rejection-footer"
        size="lg"
        onHide={closeRejectionModal}
        ModalBody={
          <Fragment>
            {deleteModal ? (
              <Fragment>
                <Row className="mt-2">
                  <Col lg={12} md={12} sm={12}>
                    <p className="paragraph-accepting">
                      Are you sure you want to delete this?
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
              <Col lg={12} md={12} sm={12} className="footer-Rejection-btn-col">
                <Button
                  text="Yes"
                  className="proceed-btn"
                  icon={<i class="icon-check icon-right"></i>}
                />
                <Button
                  text="No"
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

export default DeleteModal;
