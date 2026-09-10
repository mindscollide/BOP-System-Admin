import React, { Fragment, useRef, useState } from "react";

import { Container, Col, Row, InputGroup, Form } from "react-bootstrap";

import { Button } from "../../../../components/elements";

import { useDispatch } from "react-redux";

import { Link, useNavigate } from "react-router-dom";

import BOPlogo from "../../../../assets/images/BOP-logo.png";

import { loginSystemAdminAPI } from "../../../../store/actions/Auth-Actions";
import { showSnackbar } from "../../../../store/actions/Ui-Actions";

import "./SystemLogin.css";

import {
  encryptField,
  bopEmailValidation,
} from "../../../../commen/functions/utils";

const SystemLogin = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const Email = useRef(null);

  const Password = useRef(null);


  const [securityCredentials, setSecurityCredentials] = useState({
    Email: "",
    Password: "",
    fakePassword: "",
  });

  const isEmailValid = bopEmailValidation(
    securityCredentials.Email.trim(),
  );

  const isLoginValid =
    isEmailValid &&
    securityCredentials.Password.trim() !== "";

  // Enter key handler
  const enterKeyHandler = (event, nextInput) => {
    if (event.key === "Enter") {
      event.preventDefault();
      nextInput.current?.focus();
    }
  };

  // Email and Password handler
  const setCredentialHandler = (e) => {
    const { name, value } = e.target;

    if (name === "Password") {
      let maskedPassword = "";

      for (let i = 0; i < value.length; i++) {
        maskedPassword += "•";
      }

      setSecurityCredentials((previousState) => ({
        ...previousState,
        Password: value,
        fakePassword: maskedPassword,
      }));

      return;
    }

    setSecurityCredentials((previousState) => ({
      ...previousState,
      Email: value,
    }));
  };

  // Login submit handler
  const loginValidateHandler = async (e) => {
    e.preventDefault();

    if (!isLoginValid) {
      return;
    }

    try {
      const encryptedEmail = await encryptField(
        securityCredentials.Email.trim(),
      );

      const encryptedPassword = await encryptField(
        securityCredentials.Password,
      );

      const data = {
        Email: encryptedEmail,
        Password: encryptedPassword,
        DeviceID: "1",
        Device: "Browser",
        RoleID: 4,
      };

      dispatch(loginSystemAdminAPI(navigate, data));
    } catch (error) {
      console.error("Login encryption error:", error);

      dispatch(showSnackbar("Something went wrong", "error"));
    }
  };

  return (
    <Fragment>
      <Col sm={12} lg={12} md={12} className="sign-in">
        <Container>
          <Row className="mt-5">
            <Col sm={12} md={12} lg={12} className="login-container">
              <Row>
                <Col className="mb-4">
                  <img src={BOPlogo} width="300px" alt="" />
                </Col>
              </Row>

              <Row>
                <Col className="center-div flex-column">
                  <Row>
                    <Col
                      sm={12}
                      md={12}
                      lg={12}
                      className="login-heading"
                    >
                      Login
                    </Col>
                  </Row>

                  <Form onSubmit={loginValidateHandler}>
                    <Row>
                      {/* Email */}
                      <Col sm={12} md={12} lg={12} className="mt-3">
                        <InputGroup className="mb-1">
                          <InputGroup.Text>
                            <i className="icon-user"></i>
                          </InputGroup.Text>

                          <Form.Control
                            ref={Email}
                            onKeyDown={(event) =>
                              enterKeyHandler(event, Password)
                            }
                            name="new_Email"
                            type="text"
                            autoComplete="off"
                            value={securityCredentials.Email}
                            onChange={setCredentialHandler}
                            className="form-comtrol-textfield"
                            placeholder="Email ID"
                            aria-label="email"
                            aria-describedby="basic-addon1"
                          />
                        </InputGroup>

                        {securityCredentials.Email.trim() !== "" &&
                          !isEmailValid && (
                            <div className="text-danger mt-1">
                              Email should be correct
                            </div>
                          )}
                      </Col>

                      {/* Password */}
                      <Col sm={12} md={12} lg={12} className="mt-3 mb-1">
                        <InputGroup>
                          <InputGroup.Text
                            id="basic-addon2"
                            className="Icon-Field-class"
                          >
                            <i className="icon-lock"></i>
                          </InputGroup.Text>

                          <Form.Control
                            name="Password"
                            id="password"
                            ref={Password}
                            autoComplete="off"
                            className="form-comtrol-textfield-password pwd-mask"
                            placeholder="Password"
                            aria-label="Password"
                            aria-describedby="basic-addon2"
                            type="text"
                            value={securityCredentials.Password}
                            onChange={setCredentialHandler}
                          />
                        </InputGroup>
                      </Col>

                      {/* Forgot Password */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="mb-2 d-flex justify-content-end"
                      >
                        <Link
                          className="forgotPassword-text"
                          to="/forgotpassword"
                        >
                          Forgot Password?
                        </Link>
                      </Col>

                      {/* Login Button */}
                      <Col
                        sm={12}
                        md={12}
                        lg={12}
                        className="signIn-Signup-btn-col"
                      >
                        <Button
                          text="Login"
                          className="login-btn"
                          disableBtn={!isLoginValid}
                        />
                      </Col>
                    </Row>
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </Col>
    </Fragment>
  );
};

export default SystemLogin;