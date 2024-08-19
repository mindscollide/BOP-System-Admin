import React, { Fragment, useState, useRef, useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { TextField, Button, Modal } from "../../../../components/elements";
import "./CustomerListEditModal.css";
import Select from "react-select";

const CustomerListEditModal = ({
  editCustomerModal,
  setEditCustomerModal,
  editCustomerList,
  setEditCustomerList,
  natureOfBusinessOnchange,
  natureOption,
  natureSelectValue,
  updateButtonHit,
}) => {
  const closeEditModal = () => {
    setEditCustomerModal(false);
  };

  console.log("editCustomerList", editCustomerList);

  return (
    <Fragment>
      <Modal
        show={editCustomerModal}
        setShow={setEditCustomerModal}
        className="modaldialog Edit-Customer-List"
        modalHeaderClassName={"Edit-Customer-List-close-btn"}
        modalFooterClassName="Edit-Customer-List-footer"
        size="lg"
        onHide={closeEditModal}
        ModalBody={
          <Fragment>
            {editCustomerModal ? (
              <Fragment>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <label className="Customer-User-heading">
                      Customer List
                    </label>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={6} md={6} sm={12}>
                    <TextField
                      disable={true}
                      name="corporatesName"
                      value={editCustomerList.corporatesName.label}
                      placeholder="Company Name"
                      labelClass="d-none"
                      className="CustomerListdisable-field-Name"
                    />
                  </Col>

                  <Col lg={6} md={6} sm={12}>
                    <TextField
                      name="corporatesCategory"
                      disable={true}
                      value={editCustomerList.corporatesCategory.label}
                      placeholder="Category Name"
                      labelClass="d-none"
                      className="CustomerListdisable-field-Name"
                    />
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={6} md={6} sm={12}>
                    <Select
                      options={natureOption}
                      value={editCustomerList.natureBusiness}
                      onChange={natureOfBusinessOnchange}
                      menuPosition="fixed"
                      placeholder="Nature Business"
                      className="Edit-select-company"
                    />
                  </Col>
                  <Col lg={6} md={6} sm={12} />
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  text="Update"
                  className="Edit-Customer-List-Update-btn"
                  onClick={updateButtonHit}
                  icon={<i class="icon-refresh Upload-Customer-modal"></i>}
                />
                <Button
                  text="Discard"
                  onClick={closeEditModal}
                  className="Edit-Customer-List-Cancel-btn"
                  icon={<i class="icon-close Upload-Customer-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default CustomerListEditModal;
