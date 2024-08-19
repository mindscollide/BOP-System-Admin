import React, { useState } from "react";
import "./Assets-Banking.css";
import { Col, Container, Row } from "react-bootstrap";
import { Paper } from "@material-ui/core";
import { TextField, Button } from "../../../../components/elements";
import DatePicker from "react-multi-date-picker";
const NonBankingAssets = () => {
  const [value, setValue] = useState(new Date());

  const [startDateProps, setStartDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  const [endDateProps, setEndDateProps] = useState({
    value: new Date(),
    format: "MM-DD-YYYY",
    onChange: (date) => console.log(date.format()),
  });

  const [reportsFields, setReportsFields] = useState({
    totalAcquistionFrom: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    totalAcquistionTo: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    mysisCustomer: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    ecibCode: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    nameOfBrower: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //onChange Reports handler
  const validateReportsHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "totalAcquistionFrom" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setReportsFields({
          ...reportsFields,
          totalAcquistionFrom: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "totalAcquistionFrom" && value === "") {
      setReportsFields({
        ...reportsFields,
        totalAcquistionFrom: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }

    if (name === "totalAcquistionTo" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setReportsFields({
          ...reportsFields,
          totalAcquistionTo: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "totalAcquistionTo" && value === "") {
      setReportsFields({
        ...reportsFields,
        totalAcquistionTo: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }

    if (name === "mysisCustomer" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setReportsFields({
          ...reportsFields,
          mysisCustomer: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "mysisCustomer" && value === "") {
      setReportsFields({
        ...reportsFields,
        mysisCustomer: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }

    if (name === "ecibCode" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^\d]/g, "");
      if (valueCheck !== "") {
        setReportsFields({
          ...reportsFields,
          ecibCode: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "ecibCode" && value === "") {
      setReportsFields({
        ...reportsFields,
        ecibCode: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }

    if (name === "nameOfBrower" && value !== "") {
      console.log(value, "loginIDloginIDloginID");
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setReportsFields({
          ...reportsFields,
          nameOfBrower: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "nameOfBrower" && value === "") {
      setReportsFields({
        ...reportsFields,
        nameOfBrower: {
          value: "",
          errorMessage: "",
          errorStatus: false,
        },
      });
    }
  };

  // resetHandler for reports

  const resetHandler = () => {
    setReportsFields({
      ...reportsFields,
      totalAcquistionFrom: {
        value: "",
      },

      totalAcquistionTo: {
        value: "",
      },

      mysisCustomer: {
        value: "",
      },

      ecibCode: {
        value: "",
      },

      nameOfBrower: {
        value: "",
      },
    });

    setStartDateProps({
      ...startDateProps,
      value: "",
    });

    setEndDateProps({
      ...endDateProps,
      value: "",
    });
  };

  return (
    <Container className="Reports-container">
      <Row>
        <Col lg={11} md={11} sm={12}>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  <span className="Non_banking_Assets">
                    Reports - Non-Banking Assets
                  </span>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col lg={12} md={12} sm={12}>
                  <Paper className="Non_banking_assets_paper">
                    <Row>
                      <Col
                        lg={12}
                        md={12}
                        sm={12}
                        className="Reports-textfield-column"
                      >
                        <TextField
                          name="totalAcquistionFrom"
                          labelClass="d-none"
                          maxLength={100}
                          value={reportsFields.totalAcquistionFrom.value}
                          onChange={validateReportsHandler}
                          className="text-fields-edituser"
                          placeholder="Total Acquistion Value From"
                        />
                        <TextField
                          name="totalAcquistionTo"
                          value={reportsFields.totalAcquistionTo.value}
                          maxLength={100}
                          labelClass="d-none"
                          onChange={validateReportsHandler}
                          className="text-fields-edituser"
                          placeholder="Total Acquistion Value From"
                        />
                        <TextField
                          name="mysisCustomer"
                          labelClass="d-none"
                          maxLength={100}
                          value={reportsFields.mysisCustomer.value}
                          onChange={validateReportsHandler}
                          className="text-fields-edituser"
                          placeholder="Misyis Customer Code"
                        />
                        <TextField
                          name="ecibCode"
                          labelClass="d-none"
                          maxLength={100}
                          value={reportsFields.ecibCode.value}
                          onChange={validateReportsHandler}
                          className="text-fields-edituser"
                          placeholder="ECIB Code"
                        />
                      </Col>
                    </Row>
                    <Row className="mt-3 mb-3">
                      <Col
                        lg={6}
                        md={6}
                        sm={6}
                        className="Reports-textfield-column"
                      >
                        <TextField
                          name="nameOfBrower"
                          labelClass="d-none"
                          maxLength={100}
                          value={reportsFields.nameOfBrower.value}
                          onChange={validateReportsHandler}
                          className="text-fields-edituser"
                          placeholder="Name of Brower"
                        />
                        <Row>
                          <Col
                            lg={12}
                            md={12}
                            sm={12}
                            className="JS-Security-Datepicker"
                          >
                            <DatePicker
                              {...startDateProps}
                              onPropsChange={setStartDateProps}
                              placeholder="Start date"
                              showOtherDays={true}
                              inputClass="date-picker-left"
                            />
                            <label className="date-to">to</label>

                            <DatePicker
                              {...endDateProps}
                              onPropsChange={setEndDateProps}
                              placeholder="End Date"
                              showOtherDays={true}
                              inputClass="date-picker-right"
                            />
                          </Col>
                        </Row>
                        {/* <TextField
                  labelClass="d-none"
                  className="text-fields-edituser"
                  value="Total Acquistion Value From"
                /> */}
                      </Col>

                      <Col lg={6} md={6} sm={6} className="buttons-col">
                        <Button
                          icon={<i class="icon-download icons-gap"></i>}
                          text="Download"
                          className="button-download"
                        />
                        <Button
                          icon={<i class="icon-refresh icons-gap"></i>}
                          text="Reset"
                          onClick={resetHandler}
                          className="btn-reset"
                        />
                      </Col>
                    </Row>
                  </Paper>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default NonBankingAssets;
