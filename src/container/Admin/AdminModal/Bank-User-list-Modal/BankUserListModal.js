import React, { Fragment, useState, useRef, useEffect } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import "./BankUserListModal.css";
import Select from "react-select";

const BankUserListModal = ({
  viewBankModal,
  setViewBankModal,
  bankViewField,
  setBankViewField,
  bankValidation,
  onChangeStatusSelect,
  statusRoleOption,
  updateUserByBankIdOnClick,
}) => {
  const FirstName = useRef(null);
  const LastName = useRef(null);
  const Email = useRef(null);

  const [enableFname, setEnableFname] = useState(true);
  const [enableLname, setEnableLname] = useState(true);
  const [enableEmail, setEnableEmail] = useState(true);

  const fieldEnableHandler = () => {
    setEnableFname(false);
    setEnableLname(false);
    setEnableEmail(false);
    FirstName.current.focus();
    LastName.current.focus();
    Email.current.focus();
  };

  // for close modal handler
  const closeViewBankModal = () => {
    setViewBankModal(false);
  };

  return (
    <Fragment>
      <Modal
        show={viewBankModal}
        setShow={setViewBankModal}
        className="modaldialog View-BankUserList-styles"
        modalHeaderClassName={"View-BankUserList-Modal-close-btn"}
        modalFooterClassName="View-BankUserList-footer"
        size="lg"
        onHide={closeViewBankModal}
        ModalBody={
          <Fragment>
            {viewBankModal ? (
              <Fragment>
                <Row className="mt-4">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="Modal-Upload-Customer-Title">
                      {/* Muhammad Ahmed */}
                      <span>{bankViewField.firstName}</span>
                      {bankViewField.userStatus.value === 1 ? (
                        <span className="Active-Bank-member">Enabled</span>
                      ) : bankViewField.userStatus.value === 2 ? (
                        <span className="colors-for-Bankdisabled-status">
                          Disabled
                        </span>
                      ) : bankViewField.userStatus.value === 3 ? (
                        <span className="colors-for-otherBank-status">
                          {" "}
                          Locked
                        </span>
                      ) : bankViewField.userStatus.value === 4 ? (
                        <span className="colors-for-otherBank-status">
                          {" "}
                          Closed
                        </span>
                      ) : bankViewField.userStatus.value === 5 ? (
                        <span className="colors-for-otherBank-status">
                          {" "}
                          New
                        </span>
                      ) : bankViewField.userStatus.value === 6 ? (
                        <span className="colors-for-otherBank-status">
                          Approved
                        </span>
                      ) : bankViewField.userStatus.value === 7 ? (
                        <span className="colors-for-otherBank-status">
                          Declined
                        </span>
                      ) : bankViewField.userStatus.value === 8 ? (
                        <span className="colors-for-otherBank-status">
                          Created
                        </span>
                      ) : bankViewField.userStatus.value === 9 ? (
                        <span className="colors-for-otherBank-status">
                          Dormant
                        </span>
                      ) : null}
                    </span>
                  </Col>
                </Row>

                <Row className="mt-4">
                  <Col lg={12} md={12} sm={12}>
                    <Row>
                      <Col
                        lg={6}
                        md={6}
                        sm={12}
                        className="d-flex justify-content-start"
                      >
                        <span className="right-and-BankUser-heading">
                          Bank User Details
                        </span>
                      </Col>

                      <Col
                        lg={6}
                        md={6}
                        sm={12}
                        className="d-flex justify-content-end"
                      >
                        <i
                          className="icon-edit"
                          onClick={fieldEnableHandler}
                        ></i>
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          // placeholder="aunnaqvi123@gmail.com"
                          name="ldapAccount"
                          value={bankViewField.LDAPAccount.value}
                          disable={true}
                          className="disable-BankUserfield-Name"
                          labelClass="d-none"
                        />
                      </Col>
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          // placeholder="aunnaqvi123@gmail.com"
                          disable={enableEmail ? true : false}
                          ref={Email}
                          name="Email"
                          value={bankViewField.Email.value}
                          onChange={bankValidation}
                          className={
                            enableEmail
                              ? `${"disable-BankUserfield-Name"}`
                              : `${"BankTextfield-Name"}`
                          }
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableFname ? true : false}
                          ref={FirstName}
                          value={bankViewField.FirstName.value}
                          onChange={bankValidation}
                          name="FirstName"
                          placeholder="muhammad.ahmed"
                          className={
                            enableFname
                              ? `${"disable-BankUserfield-Name"}`
                              : `${"BankTextfield-Name"}`
                          }
                          labelClass="d-none"
                        />
                      </Col>

                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          disable={enableLname ? true : false}
                          ref={LastName}
                          value={bankViewField.LastName.value}
                          onChange={bankValidation}
                          name="LastName"
                          placeholder="muhammad.ahmed"
                          className={
                            enableLname
                              ? `${"disable-BankUserfield-Name"}`
                              : `${"BankTextfield-Name"}`
                          }
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <TextField
                          name="userRoleID"
                          value={bankViewField.userRoleID.value}
                          disable={true}
                          className="disable-BankUserfield-Name"
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>
                    {/* <Row className="mt-3">
                      <Col lg={6} md={6} sm={12}>
                        <Select
                          isDisabled={enableSelectCompanyName ? true : false}
                          ref={corporateID}
                          name="userStatus"
                          className="select-company"
                          onChange={onChangeStatusSelect}
                          options={statusRoleOption}
                          value={{
                            value: bankViewField.userStatus.value,
                            label: bankViewField.userStatus.label,
                          }}
                          placeholder="Company Name"
                        />
                      </Col>
                    </Row> */}
                  </Col>
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
                  className="Bank-List-Update-btn"
                  onClick={() => updateUserByBankIdOnClick()}
                  icon={<i class="icon-refresh Upload-BankList-modal"></i>}
                />
                <Button
                  text="Discard"
                  onClick={closeViewBankModal}
                  className="Bank-List-Cancel-btn"
                  icon={<i class="icon-close Upload-BankList-modal"></i>}
                />
              </Col>
            </Row>
          </Fragment>
        }
      />
    </Fragment>
  );
};

export default BankUserListModal;
