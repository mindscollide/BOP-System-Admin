import React, { Fragment } from "react";
import { Col, Row, Container } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Loader,
  Notification,
  Table,
} from "../../../../components/elements";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./VolMeter.css";
import { useState } from "react";
import { useEffect } from "react";

const VolMeter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { systemReducer } = useSelector((state) => state);
  console.log(systemReducer, "systemReducersystemReducer");
  let volBankId = localStorage.getItem("bankID");

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // state for volmeter array field
  const [volMeter, setVolMeter] = useState([]);

  // state for vol meter field
  const [volMeterFields, setVolMeterFields] = useState({
    volatilityMeter: {
      value: 1,
      errorMessage: "",
      errorStatus: false,
    },

    nameVol: {
      label: "",
      errorMessage: "",
      errorStatus: false,
    },

    volMeter: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    isVolActive: true,
  });

  console.log(volMeterFields, "volMeterFieldsvolMeterFields");

  const onChanngeVolMterValidation = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "volatilityMeter" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setVolMeterFields({
          ...volMeterFields,
          volatilityMeter: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "volatilityMeter" && value === "") {
      setVolMeterFields({
        ...volMeterFields,
        volatilityMeter: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "nameVol" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setVolMeterFields({
          ...volMeterFields,
          nameVol: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "nameVol" && value === "") {
      setVolMeterFields({
        ...volMeterFields,
        nameVol: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "volMeter" && value !== "") {
      console.log("valuevalueemailvaluevalueemail", value);
      if (value !== "") {
        setVolMeterFields({
          ...volMeterFields,
          volMeter: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "volMeter" && value === "") {
      setVolMeterFields({
        ...volMeterFields,
        volMeter: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  const onUpdateBtnHit = async () => {};

  return (
    <section className="SystemContainer">
      <Row>
        <Col lg={12} md={12} sm={12}>
          <span className="volMeter-label">Volatility Meter</span>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className="volMeter-paper">
            <Row className="mt-4">
              <Col lg={12} md={12} sm={12}>
                <label className="volMeter-load-heading">
                  {" "}
                  % load to spread{" "}
                  <span className="volMeter-aesterick-color">*</span>
                </label>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={3} md={3} sm={12} />
              <Col lg={6} md={6} sm={12}>
                <Row className="vol-meter-fields">
                  <Col lg={2} md={2} sm={12}>
                    <span className="number-on-textfiels">1</span>
                    <TextField
                      name="volatilityMeter"
                      type="text"
                      value={volMeterFields.volatilityMeter.value}
                      onChange={onChanngeVolMterValidation}
                      labelClass="d-none"
                    />
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <span className="number-on-textfiels">2</span>
                    <TextField
                      name="nameVol"
                      type="text"
                      onChange={onChanngeVolMterValidation}
                      value={volMeterFields.nameVol.label}
                      labelClass="d-none"
                    />
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <span className="number-on-textfiels">3</span>
                    <TextField
                      name="volMeter"
                      type="text"
                      value={volMeterFields.volMeter.value}
                      onChange={onChanngeVolMterValidation}
                      labelClass="d-none"
                    />
                  </Col>
                </Row>
              </Col>
              <Col lg={3} md={3} sm={12} />
            </Row>

            <Row className="mt-4 mb-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center"
              >
                <Button
                  text="Update"
                  onClick={onUpdateBtnHit}
                  icon={<i className="icon-refresh icon-update-refresh"></i>}
                  className="VolMeter-Update-btn"
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {systemReducer.Loading ? <Loader /> : null}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default VolMeter;
