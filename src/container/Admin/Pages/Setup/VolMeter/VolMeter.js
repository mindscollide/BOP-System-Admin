import React, { useEffect } from "react";
import style from "./VolMeter.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Loader,
} from "../../../../../components/elements";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  AddUpdateVolmterAPI,
  GetVolmeterByBankIDAPI,
} from "../../../../../store/actions/BOPSystemAdminActions";
import { useSelector } from "react-redux";
import { isValidNumberUnderMax } from "../../../../../helpers/reusableMethods";

const VolMeter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Global Staate
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  const GetVolmeterByBankID = useSelector(
    (state) => state.BOPSystemAdminReducer.GetVolmeterByBankID
  );

  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  // state for vol meter field
  const [volMeterFields, setVolMeterFields] = useState({
    volatilityMeter: {
      value: 0,
      errorMessage: "",
      errorStatus: false,
    },

    nameVol: {
      value: 0,
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
  // Add this useEffect to set the values when API response is received
  useEffect(() => {
    if (GetVolmeterByBankID !== null) {
      const volMetersData = GetVolmeterByBankID;

      // Assuming the order is always Vol 1, Vol 2, Vol 3
      setVolMeterFields({
        volatilityMeter: {
          value: volMetersData.volMeters[0].meter || 0,
          errorMessage: "",
          errorStatus: false,
        },
        nameVol: {
          value: volMetersData.volMeters[1].meter || 0,
          errorMessage: "",
          errorStatus: false,
        },
        volMeter: {
          value: volMetersData.volMeters[2].meter || 0,
          errorMessage: "",
          errorStatus: false,
        },
        isVolActive: volMetersData.isVolMeterOnOff,
      });
    }
  }, [GetVolmeterByBankID]);

  // const onChanngeVolMterValidation = (e) => {
  //   let name = e.target.name;
  //   let value = e.target.value;
  //   let validateValue = value.replace(/[^0-9.]/g, "");

  //   if (name === "volatilityMeter" && validateValue !== "") {
  //     if (validateValue !== "") {
  //       setVolMeterFields({
  //         ...volMeterFields,
  //         volatilityMeter: {
  //           value: validateValue.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "volatilityMeter" && validateValue === "") {
  //     setVolMeterFields({
  //       ...volMeterFields,
  //       volatilityMeter: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }

  //   if (name === "nameVol" && validateValue !== "") {
  //     if (validateValue !== "") {
  //       setVolMeterFields({
  //         ...volMeterFields,
  //         nameVol: {
  //           value: validateValue.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "nameVol" && validateValue === "") {
  //     setVolMeterFields({
  //       ...volMeterFields,
  //       nameVol: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }

  //   if (name === "volMeter" && validateValue !== "") {
  //     if (validateValue !== "") {
  //       setVolMeterFields({
  //         ...volMeterFields,
  //         volMeter: {
  //           value: validateValue.trimStart(),
  //           errorMessage: "",
  //           errorStatus: false,
  //         },
  //       });
  //     }
  //   } else if (name === "volMeter" && validateValue === "") {
  //     setVolMeterFields({
  //       ...volMeterFields,
  //       volMeter: {
  //         value: "",
  //         errorMessage: "",
  //         errorStatus: true,
  //       },
  //     });
  //   }
  // };

  const onChanngeVolMterValidation = (e) => {
    const { name, value } = e.target;
    if (isValidNumberUnderMax(value, "", 100)) {
      const regular_ex = /^(0\d)$/; // Matches "00", "01", ..., "09"
      const sanitizedValue =
        value === "" || value === "."
          ? "0"
          : regular_ex.test(value)
          ? value.slice(1)
          : value === "0.0"
          ? "0.1"
          : // Remove leading "0" (e.g., "09" → "9")
            value;

      if (name === "volatilityMeter") {
        setVolMeterFields({
          ...volMeterFields,
          volatilityMeter: {
            value: sanitizedValue,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }

      if (name === "nameVol") {
        setVolMeterFields({
          ...volMeterFields,
          nameVol: {
            value: sanitizedValue,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }

      if (name === "volMeter") {
        setVolMeterFields({
          ...volMeterFields,
          volMeter: {
            value: sanitizedValue,
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    }
  };

  //Handle Click Update Button
  const onUpdateBtnHit = async () => {
    let data = {
      VolMeters: [
        {
          VolMeterID: 1,
          Meter: Number(volMeterFields.volatilityMeter.value),
        },
        {
          VolMeterID: 2,
          Meter: Number(volMeterFields.nameVol.value),
        },
        {
          VolMeterID: 3,
          Meter: Number(volMeterFields.volMeter.value),
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
                  % load to spread
                  <span className={style["volMeter-aesterick-color"]}>*</span>
                </label>
              </Col>
            </Row>
            <Row className="mt-2">
              <Col lg={3} md={3} sm={12} />
              <Col lg={6} md={6} sm={12}>
                <Row className={style["vol-meter-fields"]}>
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className={style["VolMeterInputBox"]}
                  >
                    <span className={style["number-on-textfiels"]}>1</span>
                    <TextField
                      name="volatilityMeter"
                      type="text"
                      value={volMeterFields.volatilityMeter.value}
                      // onChange={onChanngeVolMterValidation}
                      // disabled by mehdi
                      disable={true}
                      labelClass="d-none"
                      className={style["disableText"]}
                    />
                  </Col>
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className={style["VolMeterInputBox"]}
                  >
                    <span className={style["number-on-textfiels"]}>2</span>
                    <TextField
                      name="nameVol"
                      type="text"
                      onChange={onChanngeVolMterValidation}
                      value={volMeterFields.nameVol.value}
                      labelClass="d-none"
                    />
                  </Col>
                  <Col
                    lg={2}
                    md={2}
                    sm={12}
                    className={style["VolMeterInputBox"]}
                  >
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
                  icon={<i className="icon-refresh"></i>}
                  className={style["VolMeter-Update-btn"]}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {/* {BOPSystemAdminReducer.Loading && <Loader />} */}
    </section>
  );
};

export default VolMeter;
