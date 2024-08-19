import React, { Fragment, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Table,
  Modal,
} from "../../../../components/elements";
import { Checkbox } from "antd";
import "./CounterModal.css";
import { useEffect } from "react";

const CounterModal = ({ ModalTitle, modalCounter, setModalCounter }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer, uploadReducer } = useSelector((state) => state);
  console.log(systemReducer, "systemReducersystemReducer");
  // state for CounterModal edit user
  const [counterModalField, setCounterModalField] = useState({
    corporateName: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    avaliableLimit: {
      value: "",
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    instumentNameTbill: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    instumentNamePib: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    instumentNameSukuk: {
      value: 0,
      label: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  console.log(counterModalField, "counterModalField");
  // onchange handler for counterModal
  const counterValidationHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "corporateName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCounterModalField({
          ...counterModalField,
          corporateName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "corporateName" && value === "") {
      setCounterModalField({
        ...counterModalField,
        corporateName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "avaliableLimit" && value !== "") {
      let valueCheck = value.replace(/[^\d]/g, "");
      console.log("valueCheckvalueCheck", valueCheck);
      if (valueCheck !== "") {
        setCounterModalField({
          ...counterModalField,
          avaliableLimit: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "avaliableLimit" && value === "") {
      setCounterModalField({
        ...counterModalField,
        avaliableLimit: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };

  // for close modal handler
  const closeCounterModal = () => {
    setModalCounter(false);
  };

  useEffect(() => {
    if (
      systemReducer.counterCorporateLimit !== null &&
      systemReducer.counterCorporateLimit !== undefined
    ) {
      setCounterModalField({
        ...counterModalField,
        avaliableLimit: {
          value:
            systemReducer.counterCorporateLimit.avaliableLimit.toLocaleString(
              "en-US"
            ),
        },
        corporateName: {
          value: systemReducer.counterCorporateLimit.corporateName,
        },
        instumentNameTbill: {
          value: systemReducer.counterCorporateLimit.instumentType[0].weightage,
        },
        instumentNamePib: {
          value: systemReducer.counterCorporateLimit.instumentType[1].weightage,
        },
        instumentNameSukuk: {
          value: systemReducer.counterCorporateLimit.instumentType[4].weightage,
        },
      });
    }
  }, [systemReducer.counterCorporateLimit]);

  return (
    <Fragment>
      <Modal
        show={modalCounter}
        setShow={setModalCounter}
        className="modaldialog modal-Counter-Party"
        modalHeaderClassName={"header-Counter-Party-close-btn"}
        modalFooterClassName="modal-Counter-Party-footer"
        size="lg"
        onHide={closeCounterModal}
        ModalBody={
          <Fragment>
            {modalCounter ? (
              <Fragment>
                <Row>
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="d-flex justify-content-start"
                  >
                    <span className="edit-user-heading">Edit Detail</span>
                  </Col>
                </Row>

                <Row>
                  <Col lg={9} md={9} sm={12}>
                    <Row>
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Company Name
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <TextField
                          name="corporateName"
                          disable={true}
                          value={counterModalField.corporateName.value}
                          labelClass="d-none"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Total Limit(PKR)
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name="avaliableLimit"
                          disable={true}
                          value={counterModalField.avaliableLimit.value}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={9} md={9} sm={12}>
                    <Row>
                      <Col lg={4} md={4} sm={12}>
                        <span className="labels-modal-Counter">
                          Instrument allow
                          <span className="Counter-aesterick-color">*</span>
                        </span>
                      </Col>
                      <Col lg={8} md={8} sm={12}>
                        <Row>
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">Tbills</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              labelClass="d-none"
                              name="Tbills"
                              disable={true}
                              value={counterModalField.instumentNameTbill.value}
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">PIB</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              name="Pib"
                              disable={true}
                              value={counterModalField.instumentNamePib.value}
                              labelClass="d-none"
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col lg={4} md={4} sm={12} className="checkbox-col">
                            <Checkbox disabled />
                            <p className="checkbox-text">SUKUK</p>
                          </Col>
                          <Col
                            lg={8}
                            md={8}
                            sm={12}
                            className="d-flex justify-content-center"
                          >
                            <TextField
                              name="Sukuk"
                              disable={true}
                              value={counterModalField.instumentNameSukuk.value}
                              labelClass="d-none"
                              placeholder="Weightage"
                            />
                            <label className="percentage-icon ">%</label>
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Fragment>
            ) : null}
          </Fragment>
        }
        ModalFooter={
          <Fragment>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="modal-Counter-btn-col">
                <Button
                  text="Cancel"
                  onClick={closeCounterModal}
                  className="Cancel-btn"
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

export default CounterModal;
