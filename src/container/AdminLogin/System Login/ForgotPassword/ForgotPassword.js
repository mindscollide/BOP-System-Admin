import React, { Fragment, useState } from "react";
import { Col, Row, InputGroup, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Button } from "../../../../components/elements";
import BOPlogo from "../../../../assets/images/BOP-logo.png";

import "./ForgotPassword.css";
import {
  bopEmailValidation,
  encryptField,
} from "../../../../commen/functions/utils";
import { forgotPasswordApi } from "../../../../store/actions/Auth-Actions";

// import { ForgotPasswordApi } from "../../../../redux/actions/authActions";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [email, setEmail] = useState("");
  const [touched, setTouched] = useState(false);

  const isEmailValid = email.trim() !== "" && bopEmailValidation(email.trim());

  const handleForgotPassword = async () => {
    setTouched(true);

    if (!isEmailValid) {
      return;
    }

    try {
      const Data = {
        Email: await encryptField(email.trim()),
        RoleID: 4,
      };

      dispatch(forgotPasswordApi(navigate, Data));
    } catch (error) {
      console.error("Forgot password error:", error);
    }
  };

  return (
    <Fragment>
      <section className='ResetPassword-Screen-bg'>
        <Row className='mt-5'>
          <Col sm={12} md={12} lg={12} className='ResetPassword-container'>
            <Row>
              <Col className='mb-4'>
                <img src={BOPlogo} width='300px' alt='' />
              </Col>
            </Row>

            <Row className='mt-2'>
              <Col
                sm={5}
                md={5}
                lg={5}
                className='ResetBOP-center-div flex-column'>
                <Row>
                  <Col sm={12} md={12} lg={12}>
                    <span className='Heading-ResetPaswword-BOP-container'>
                      Recover Password
                    </span>
                  </Col>

                  {/* Email */}
                  <Col sm={12} md={12} lg={12} className='mt-3'>
                    <InputGroup className='mb-1'>
                      <InputGroup.Text
                        id='basic-addon1'
                        className='Icon-Field-class'>
                        <i className='icon-user'></i>
                      </InputGroup.Text>

                      <Form.Control
                        name='new_email'
                        type='email'
                        autoComplete='email'
                        className='form-comtrol-ResetPassword-textfield'
                        placeholder='Email'
                        aria-label='Email'
                        aria-describedby='basic-addon1'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </InputGroup>

                    {(touched || email.trim() !== "") && !isEmailValid && (
                      <div className='emailErrorText'>
                        Enter a valid email address
                      </div>
                    )}
                  </Col>

                  {/* Button */}
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className='d-flex justify-content-center mt-2'>
                    <Button
                      text='Send Change Password Link'
                      className='ResetPassword-btn'
                      onClick={handleForgotPassword}
                    />
                  </Col>
                  <Col
                    sm={12}
                    md={12}
                    lg={12}
                    className='d-flex justify-content-center mt-2'>
                    <span className='text-center'>
                      <Link className={"forgotPasswordLink"} to={"/"}>
                        Back to Login
                      </Link>
                    </span>
                  </Col>
                </Row>
              </Col>
            </Row>
          </Col>
        </Row>
      </section>
    </Fragment>
  );
};

export default ForgotPassword;
