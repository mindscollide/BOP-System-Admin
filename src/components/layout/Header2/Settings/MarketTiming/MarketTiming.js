import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import "./MarketTiming.css";
import DatePicker from "react-multi-date-picker";
import MultiTimePicker from "react-multi-date-picker/plugins/time_picker";
import { useSelector } from "react-redux";
import { ConvertDateTimrStringIntoGTM } from "../../../../../helpers/reusableMethods";
import { TimePicker } from "antd";
import moment from "moment";

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

  const disabledTimeMonToThur = (monToThurEnd, monToThurStart, value) => {
    const allHours = Array.from({ length: 24 }, (_, i) => i);
    const allMinutes = Array.from({ length: 60 }, (_, i) => i);

    if (value === 2 && monToThurStart) {
      const minTime = moment(monToThurStart).clone().add(15, "minutes");
      const minHour = minTime.hour();
      const minMinute = minTime.minute();

      return {
        disabledHours: () =>
          allHours.filter((hour) => hour < minHour || hour > 15),

        disabledMinutes: (selectedHour) => {
          if (selectedHour === minHour) {
            return allMinutes.filter((min) => min < minMinute);
          } else if (selectedHour === 15) {
            return allMinutes.filter((i) => i !== 0);
          }
          return [];
        },
      };
    } else if (value === 1 && monToThurEnd) {
      const maxTime = moment(monToThurEnd).clone().subtract(15, "minutes");
      const maxHour = maxTime.hour();
      const maxMinute = maxTime.minute();

      return {
        disabledHours: () =>
          allHours.filter((hour) => hour < 9 || hour > maxHour),

        disabledMinutes: (selectedHour) => {
          if (selectedHour === maxHour) {
            return allMinutes.filter((min) => min > maxMinute);
          }
          return [];
        },
      };
    }

    // Default time restriction: 09:00–15:00 (only 15:00 is allowed)
    return {
      disabledHours: () => allHours.filter((i) => i < 9 || i > 15),
      disabledMinutes: (selectedHour) => {
        if (selectedHour >= 9 && selectedHour <= 14) return [];
        if (selectedHour === 15) return allMinutes.filter((i) => i !== 0);
        return allMinutes;
      },
    };
  };

  const disabledTimeFri = (FriEnd, FriStart, value) => {
    const allHours = Array.from({ length: 24 }, (_, i) => i);
    const allMinutes = Array.from({ length: 60 }, (_, i) => i);

    if (value === 2 && FriStart) {
      const minTime = moment(FriStart).clone().add(15, "minutes");
      const minHour = minTime.hour();
      const minMinute = minTime.minute();

      return {
        disabledHours: () =>
          allHours.filter((hour) => hour < minHour || hour > 13),

        disabledMinutes: (selectedHour) => {
          if (selectedHour === minHour) {
            return allMinutes.filter((min) => min < minMinute);
          } else if (selectedHour === 13) {
            return allMinutes.filter((i) => i !== 0);
          }
          return [];
        },
      };
    } else if (value === 1 && FriEnd) {
      const maxTime = moment(FriEnd).clone().subtract(15, "minutes");
      const maxHour = maxTime.hour();
      const maxMinute = maxTime.minute();

      return {
        disabledHours: () =>
          allHours.filter((hour) => hour < 9 || hour > maxHour),

        disabledMinutes: (selectedHour) => {
          if (selectedHour === maxHour) {
            return allMinutes.filter((min) => min > maxMinute);
          }
          return [];
        },
      };
    }

    // Default time restriction: 09:00–15:00 (only 15:00 is allowed)
    return {
      disabledHours: () => allHours.filter((i) => i < 9 || i > 13),
      disabledMinutes: (selectedHour) => {
        if (selectedHour >= 9 && selectedHour <= 13) return [];
        if (selectedHour === 13) return allMinutes.filter((i) => i !== 0);
        return allMinutes;
      },
    };
  };
  // const disabledTimeFri = () => {
  //   return {
  //     disabledHours: () =>
  //       Array.from({ length: 24 }, (_, i) => i).filter((i) => i < 9 || i > 13),
  //   };
  // };

  const handleChangeTime = (value, eventName) => {
    console.log(new Date(value), eventName, "handleChangeTimehandleChangeTime");
    if (eventName === "monToThruStartTime") {
      setMonToThruStartTime(new Date(value));
    }
    if (eventName === "monToThruEndTime") {
      setMonToThruEndTime(new Date(value));
    }
    if (eventName === "fridayStartTime") {
      setFridayStartTime(new Date(value));
    }
    if (eventName === "fridayEndTime") {
      setFridayEndTime(new Date(value));
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
              <TimePicker
                format={"hh:mm"}
                inputReadOnly={true}
                value={moment(monToThruStartTime, "HH:mm")}
                showNow={false}
                onOk={(event) => handleChange("monToThruStartTime", event)}
                onSelect={(event) =>
                  handleChangeTime(event, "monToThruStartTime")
                }
                disabledTime={() =>
                  disabledTimeMonToThur(monToThruEndTime, monToThruStartTime, 1)
                }
              />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">End Time</label>
              <TimePicker
                format={"hh:mm"}
                inputReadOnly={true}
                value={moment(monToThruEndTime, "HH:mm")}
                showNow={false}
                onOk={(event) => handleChange("monToThruEndTime", event)}
                onSelect={(event) =>
                  handleChangeTime(event, "monToThruEndTime")
                }
                disabledTime={() =>
                  disabledTimeMonToThur(monToThruEndTime, monToThruStartTime, 2)
                }
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
              <TimePicker
                format={"hh:mm"}
                inputReadOnly={true}
                value={moment(fridayStartTime, "HH:mm")}
                showNow={false}
                onOk={(event) => handleChange("fridayStartTime", event)}
                onSelect={(event) => handleChangeTime(event, "fridayStartTime")}
                disabledTime={() =>
                  disabledTimeFri(fridayEndTime, fridayStartTime, 1)
                }
              />
            </Col>
            <Col lg={6} md={6} sm={6}>
              <label className="two-factor-text">End Time</label>
              <TimePicker
                format={"hh:mm"}
                inputReadOnly={true}
                value={moment(fridayEndTime, "HH:mm")}
                showNow={false}
                onOk={(event) => handleChange("fridayEndTime", event)}
                onSelect={(event) => handleChangeTime(event, "fridayEndTime")}
                disabledTime={() =>
                  disabledTimeFri(fridayEndTime, fridayStartTime, 2)
                }
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default MarketTiming;
