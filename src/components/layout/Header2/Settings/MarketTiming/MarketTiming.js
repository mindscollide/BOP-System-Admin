import React, { useState } from "react";
import { Col, Row } from "react-bootstrap";
import "./MarketTiming.css";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

const MarketTiming = () => {
  const [monToThruStartTime, setMonToThruStartTime] = useState(null);
  const [monToThruEndTime, setMonToThruEndTime] = useState(null);
  const [fridayStartTime, setFridayStartTime] = useState(null);
  const [fridayEndTime, setFridayEndTime] = useState(null);
  const allowedStartHours = Array.from({ length: 24 }, (_, i) => i).filter(
    (hour) => hour < 9 || hour > 14 // allow 09:00 to 15:00 (3 PM inclusive)
  );

  const allowedEndHours = Array.from({ length: 24 }, (_, i) => i).filter(
    (hour) => hour <= 9 || hour >= 15 // allow 09:15 to 02:45 only (strictly inside)
  );
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
                plugins={[<TimePicker />]}
                value={monToThruStartTime}
                onChange={setMonToThruStartTime}
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
                plugins={[<TimePicker />]}
                value={monToThruEndTime}
                onChange={setMonToThruEndTime}
                minuteStep={15}
                disabledHours={allowedEndHours}
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
                plugins={[<TimePicker />]}
                value={fridayStartTime}
                onChange={setFridayStartTime}
                minuteStep={15}
                disabledHours={allowedStartHours}
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
                plugins={[<TimePicker />]}
                value={fridayEndTime}
                onChange={setFridayEndTime}
                minuteStep={15}
                disabledHours={allowedEndHours}
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
