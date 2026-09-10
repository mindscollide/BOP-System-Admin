import React from "react";
import { Col, Row } from "react-bootstrap";
import BOPlogo from "../../../../assets/images/BOP-logo.png";
import "./EmailSentTo.css"
const EmailSentTo = () => {
  return (
    <section className={"wrapper_emailSendTo"}>
      <Row>
        <Col
          sm={12}
          md={12}
          lg={12}
          className='d-flex justify-content-center mt-5 '>
          <img
            src={BOPlogo}
            style={{ maxWidth: "100%" }}
            width='300'
            className='img-fluid'
            alt='BOP Logo'
          />
        </Col>
        <Col sm={12} md={12} lg={12} className='d-flex justify-content-center'>
          <section className={"forgetPasswordEMailSentPage"}>
            <h4 className={"Heading-passwordResetEMailSentTo"}>
              {`Email has been sent `}
            </h4>
            {/* <h4>{localStorage.getItem.email}</h4> */}
            <span className='d-block text-center mb-4'>
              Please check your email and click on the Password Reset Link
            </span>
          </section>
        </Col>
      </Row>
    </section>
  );
};

export default EmailSentTo;
