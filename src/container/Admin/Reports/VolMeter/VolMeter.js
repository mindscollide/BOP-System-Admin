import React, { useEffect } from "react";
import style from "./VolMeter.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Notification,
  Loader,
} from "../../../../components/elements";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AddUpdateVolmterAPI,
  GetVolmeterByBankIDAPI,
} from "../../../../store/actions/BOPSystemAdminActions";
import { useSelector } from "react-redux";

const VolMeter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);
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

  //Getting volmeter data
  useEffect(() => {
    let data = {
      BankID: 1,
    };
    dispatch(GetVolmeterByBankIDAPI(navigate, data));
  }, []);

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

  //Handle Click Update Button
  const onUpdateBtnHit = async () => {
    let data = {
      VolMeters: [
        {
          VolMeterID: 1,
          meter: 1343,
        },
        {
          VolMeterID: 2,
          meter: 456,
        },
        {
          VolMeterID: 3,
          meter: 7896,
        },
      ],
      BankID: 1,
    };

    dispatch(AddUpdateVolmterAPI(navigate, data));
  };

  return (
    <section className={style["VolmeterContainer"]}>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <span className={style["volMeter-label"]}>Volatility Meter</span>
        </Col>
      </Row>

      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={style["volMeter-paper"]}>
            <Row className="mt-4">
              <Col lg={12} md={12} sm={12}>
                <label className={style["volMeter-load-heading"]}>
                  {" "}
                  % load to spread{" "}
                  <span className={style["volMeter-aesterick-color"]}>*</span>
                </label>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={3} md={3} sm={12} />
              <Col lg={6} md={6} sm={12}>
                <Row className={style["vol-meter-fields"]}>
                  <Col lg={2} md={2} sm={12}>
                    <span className={style["number-on-textfiels"]}>1</span>
                    <TextField
                      name="volatilityMeter"
                      type="text"
                      value={volMeterFields.volatilityMeter.value}
                      onChange={onChanngeVolMterValidation}
                      labelClass="d-none"
                    />
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <span className={style["number-on-textfiels"]}>2</span>
                    <TextField
                      name="nameVol"
                      type="text"
                      onChange={onChanngeVolMterValidation}
                      value={volMeterFields.nameVol.label}
                      labelClass="d-none"
                    />
                  </Col>
                  <Col lg={2} md={2} sm={12}>
                    <span className={style["number-on-textfiels"]}>3</span>
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
                  className={style["VolMeter-Update-btn"]}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {BOPSystemAdminReducer.Loading && <Loader />}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </section>
  );
};

export default VolMeter;
