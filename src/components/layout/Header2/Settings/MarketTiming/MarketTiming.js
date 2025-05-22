import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./MarketTiming.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";
import { useSelector } from "react-redux";
import { ConvertDateTimrStringIntoGTM } from "../../../../../helpers/reusableMethods";

const MarketTiming = ({
  monToThruStartTime,
  setMonToThruStartTime,
  monToThruEndTime,
  setMonToThruEndTime,
  fridayStartTime,
  setFridayStartTime,
  fridayEndTime,
  setFridayEndTime,
}) => {
  const GetMarketTimeSettings = useSelector(
    (state) => state.settingsReducer.GetMarketTimeSettings
  );

  useEffect(() => {
    if (GetMarketTimeSettings !== null) {
      try {
        const { fridayEnd, fridayStart, monThuEnd, monThuStart } =
          GetMarketTimeSettings;

        setMonToThruStartTime(
          ConvertDateTimrStringIntoGTM(monThuStart, "hh:mm")
        );
        setMonToThruEndTime(ConvertDateTimrStringIntoGTM(monThuEnd, "hh:mm"));

        setFridayStartTime(ConvertDateTimrStringIntoGTM(fridayStart, "hh:mm"));
        setFridayEndTime(ConvertDateTimrStringIntoGTM(fridayEnd, "hh:mm"));
      } catch (error) {
        console.log(error);
      }
    }
  }, [GetMarketTimeSettings]);

  const handleChange = (eventName, event) => {
    if (eventName === "monToThruStartTime") {
      setMonToThruStartTime(new Date(event));
    }
    if (eventName === "monToThruEndTime") {
      setMonToThruEndTime(new Date(event));
    }
    if (eventName === "fridayStartTime") {
      setFridayStartTime(new Date(event));
    }
    if (eventName === "fridayEndTime") {
      setFridayEndTime(new Date(event));
    }
  };

  return (
    <>
      <Row className="mt-4">
        <Col>
          <p className="change-password-text">Mon - Thur</p>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={8} sm={8}>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">Start Time</label>
              <DatePicker
                onlyTimePicker
                disableDayPicker
                inputClass="markettimePicker"
                format="hh:mm A"
                plugins={[<TimePicker hideSeconds />]}
                value={monToThruStartTime}
                onChange={(value) => handleChange("monToThruStartTime", value)}
                placeholder="Select start time"
              />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">End Time</label>
              <DatePicker
                onlyTimePicker
                disableDayPicker
                format="hh:mm A"
                inputClass="markettimePicker"
                plugins={[<TimePicker hideSeconds />]}
                value={monToThruEndTime}
                onChange={(value) => handleChange("monToThruEndTime", value)}
                // minuteStep={15}
                placeholder="Select end time"
              />
            </Col>
          </Row>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col>
          <p className="change-password-text">Friday</p>
        </Col>
      </Row>
      <Row>
        <Col lg={8} md={8} sm={8}>
          <Row>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">Start Time</label>
              <DatePicker
                onlyTimePicker
                disableDayPicker
                format="hh:mm A"
                inputClass="markettimePicker"
                plugins={[<TimePicker hideSeconds />]}
                value={fridayStartTime}
                onChange={(value) => handleChange("fridayStartTime", value)}
                minuteStep={15}
                placeholder="Select start time"
              />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">End Time</label>
              <DatePicker
                onlyTimePicker
                disableDayPicker
                format="hh:mm A"
                inputClass="markettimePicker"
                plugins={[<TimePicker hideSeconds />]}
                value={fridayEndTime}
                onChange={(value) => handleChange("fridayEndTime", value)}
                minuteStep={15}
                placeholder="Select end time"
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MarketTiming;
