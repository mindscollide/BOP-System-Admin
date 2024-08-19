import React, { useState } from "react";
import styles from "./Corporateuser.module.css";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Checkbox,
  CorporateCustomUpload,
  CustomUpload,
  Paper,
  TextField,
} from "../../../components/elements";
import Select from "react-select";
import { validateEmail } from "../../../commen/functions/emailValidation";

const CorporateUser = () => {
  //Corporate User State
  const [corporateUser, setCorporateUser] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //state for error Message
  const [errorShow, setErrorShow] = useState(false);

  //add bank user security admin validate handler
  const addCorporateUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "firstName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setCorporateUser({
          ...corporateUser,
          firstName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "firstName" && value === "") {
      setCorporateUser({
        ...corporateUser,
        firstName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    if (name === "email" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setCorporateUser({
          ...corporateUser,
          email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setCorporateUser({
        ...corporateUser,
        email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //email validation handler
  const handlerEmail = () => {
    if (corporateUser.email.value !== "") {
      if (validateEmail(corporateUser.email.value)) {
        alert("Email verified");
      } else {
        alert("Email Not Verified");
      }
    }
  };

  //handle Active Button
  const handleActiveButton = () => {
    if (corporateUser.Name.value !== "" && corporateUser.email.value !== "") {
      setErrorShow(false);
    } else {
      setErrorShow(true);
    }
  };

  return (
    <section className={styles["Container_bank_user"]}>
      <Row>
        <Col lg={12} md={12} sm={12}>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-start m-0 p-0"
            >
              <span className={styles["bank-user-label"]}>
                Add a Corporate user
              </span>
            </Col>
          </Row>
          <Row className="mt-1">
            <Col lg={12} md={12} sm={12} className="m-0 p-0">
              <Paper className={styles["bankuser-paper"]}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name={"firstName"}
                          value={corporateUser.Name.value}
                          onChange={addCorporateUserValidateHandler}
                        />
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex justify-content-start"
                          >
                            <p
                              className={
                                errorShow && corporateUser.Name.value === ""
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              First Name is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={4}>
                        <CustomUpload />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Email
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField
                          labelClass="d-none"
                          name={"email"}
                          value={corporateUser.email.value}
                          onChange={addCorporateUserValidateHandler}
                        />
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="d-flex justify-content-start"
                          >
                            <p
                              className={
                                errorShow && corporateUser.email.value === ""
                                  ? styles["bankErrorMessage"]
                                  : styles["bankErrorMessage_hidden"]
                              }
                            >
                              Email is required
                            </p>
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3 position-relative">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Company Name
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          isSearchable={true}
                          classNamePrefix={"CompanyName"}
                        />
                      </Col>
                      <Col lg={1} md={1} sm={12}>
                        <CorporateCustomUpload />
                      </Col>
                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Category
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Select
                          isSearchable={true}
                          className={styles["react-select-field"]}
                        />
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Chat
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12} className="m-0 p-0">
                        <Checkbox
                          label2="Active"
                          classNameDiv={styles["CheckboxActive"]}
                        />
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          RFQ Timer
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <Row>
                          <Col lg={6} md={6} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Treasury
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                            <TextField
                              labelClass="d-none"
                              disable={true}
                              placeholder={"3 Minutes"}
                            />
                          </Col>
                          <Col lg={6} md={6} sm={12}>
                            <span className={styles["labels-add-bank"]}>
                              Corporate
                              <span className={styles["aesterick-color"]}>
                                *
                              </span>
                            </span>
                            <TextField
                              labelClass="d-none"
                              disable={true}
                              placeholder={"3 Minutes"}
                            />
                          </Col>
                        </Row>
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col lg={2} md={2} sm={12}>
                        <span className={styles["labels-add-bank"]}>
                          Nature of the Client
                          <span className={styles["aesterick-color"]}>*</span>
                        </span>
                      </Col>
                      <Col lg={5} md={5} sm={12}>
                        <TextField labelClass="d-none" disable={true} />
                      </Col>

                      <Col lg={4} md={4} sm={12}></Col>
                    </Row>

                    <Row className="mt-3">
                      <Col
                        lg={9}
                        md={9}
                        sm={12}
                        className="d-flex justify-content-center gap-2"
                      >
                        <Button
                          icon={<i className="icon-check icon-check-space"></i>}
                          text="Activate"
                          className={styles["Active-btn"]}
                          onClick={handleActiveButton}
                        />
                        <Button
                          icon={<i className="icon-close icon-check-space"></i>}
                          text="Cancel"
                          className={styles["Cancel-btn-AddBankUser"]}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Paper>
            </Col>
          </Row>
        </Col>
      </Row>
    </section>
  );
};

export default CorporateUser;
