import React, { useEffect, useState } from "react";
import "./Setting.css";
import { Row, Col } from "react-bootstrap";

import {
  TextField,
  Button,
  Modal,
  Loader,
} from "../../../../components/elements";
import { Checkbox, Switch } from "antd";
// import Password from "antd/es/input/Password";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  GetMarketTimeSettingsAPI,
  GetUserSettingsAPI,
  SaveMarketTimeSettingsAPI,
  UpdateUserSettingsAPI,
} from "../../../../store/actions/SettingsActions";
import UserSetting from "./UserSettings/UserSetting";
import PassCodeSetting from "./PassCodeSetting/PassCodeSetting";
import MarketTiming from "./MarketTiming/MarketTiming";
import { extractTimeOnly } from "../../../../helpers/reusableMethods";

const SettingModal = ({ SettingModalState, setSettingModalState }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [settingUser, setSettingUser] = useState(true);
  const [passcodeSetting, setPasscodeSetting] = useState(false);
  const [marketTiming, setMarketTiming] = useState(false);
  const [settings, setSettings] = useState({
    chatPannalOverlap: true,
    soundOnEveryMessage: true,
    twoFactorAuthentication: true,
    newPassword: {
      value: "",
    },
    confirmNewPassword: {
      value: "",
    },
    monToThurStartTime: {
      value: "",
    },
    monToThurEndTime: {
      value: "",
    },
    friStartTime: {
      value: "",
    },
    friEndTime: {
      value: "",
    },
  });

  const [settingsRecord, setSettingRecords] = useState({
    BD_Enable2FA: false,
    BD_SoundOnEveryMessage: false,
    BD_EmailOnEveryMessage: false,
    monThuStart: { value: "00:00", errorMessage: "", errorStatus: false },
    monThuEnd: { value: "00:00", errorMessage: "", errorStatus: false },
    fridayStart: { value: "00:00", errorMessage: "", errorStatus: false },
    fridayEnd: { value: "00:00", errorMessage: "", errorStatus: false },
  });

  const [monToThruStartTime, setMonToThruStartTime] = useState("");
  const [monToThruEndTime, setMonToThruEndTime] = useState(null);
  const [fridayStartTime, setFridayStartTime] = useState(null);
  const [fridayEndTime, setFridayEndTime] = useState(null);
  const [errors, setErrors] = useState({
    lengthError: true,
    numberError: true,
    specialCharError: true,
    matchError: true,
  });

  const Loading = useSelector((state) => state.settingsReducer.Loading);
  const GetUserSettings = useSelector(
    (state) => state.settingsReducer.GetUserSettings
  );
  const GetMarketTimeSettings = useSelector(
    (state) => state.settingsReducer.GetMarketTimeSettings
  );

  useEffect(() => {
    dispatch(GetUserSettingsAPI(navigate));
    dispatch(GetMarketTimeSettingsAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetUserSettings !== null) {
      try {
        const { userSettingsList } = GetUserSettings;
        if (userSettingsList.length > 0) {
          const newSettings = {};

          userSettingsList.forEach((settingData) => {
            newSettings[settingData.configKey] = JSON.parse(
              settingData.configValue
            );
          });

          setSettingRecords((prevSettings) => ({
            ...prevSettings,
            ...newSettings,
          }));
        }
      } catch (error) {
        console.error("Error setting user settings:", error);
      }
    }

    if (GetMarketTimeSettings !== null) {
      try {
        setSettingRecords((preSettings) => ({
          ...preSettings,
          monThuStart: {
            value: GetMarketTimeSettings.monThuStart,
            errorMessage: "",
            errorStatus: false,
          },
          monThuEnd: {
            value: GetMarketTimeSettings.monThuEnd,
            errorMessage: "",
            errorStatus: false,
          },
          fridayStart: {
            value: GetMarketTimeSettings.fridayStart,
            errorMessage: "",
            errorStatus: false,
          },
          fridayEnd: {
            value: GetMarketTimeSettings.fridayEnd,
            errorMessage: "",
            errorStatus: false,
          },
        }));
      } catch (err) {}
    } else {
      setSettingRecords((preSettings) => ({
        ...preSettings,
        monThuStart: "00:00",
        monThuEnd: "00:00",
        fridayStart: "00:00",
        fridayEnd: "00:00",
      }));
    }
  }, [GetUserSettings, GetMarketTimeSettings]);

  const onCloseButton = () => {
    setSettingModalState(false);
  };

  const onClickSettingUser = () => {
    setSettingUser(true);
    setPasscodeSetting(false);
    setMarketTiming(false);
  };

  const onClickPasscodeSetting = () => {
    setSettingUser(false);
    setPasscodeSetting(true);
    setMarketTiming(false);
  };

  const onClickMarketSetting = () => {
    setSettingUser(false);
    setPasscodeSetting(false);
    setMarketTiming(true);
  };

  // const onChange = (e) => {
  //   console.log(`checked = ${e.target.checked}`);
  // };

  // Checkbox for Chat Panal Overlap and Sound on every personal message
  const onChangeCheckbox = (e) => {
    console.log("e.target.checked,", e.target.checked);
    if (e.target.name === "chatPannal") {
      setSettingRecords({
        ...settingsRecord,
        BD_EmailOnEveryMessage: e.target.checked,
      });
    } else if (e.target.name === "soundOnEveryMessage") {
      setSettingRecords({
        ...settingsRecord,
        BD_SoundOnEveryMessage: e.target.checked,
      });
    }
  };

  // radio button for Two factor authentication
  const onChangeSwitch = (e) => {
    setSettingRecords({
      ...settingsRecord,
      BD_Enable2FA: e,
    });
    console.log(`switch to ${e}`);
  };

  // const validateTime = (time) => {
  //   if (!time || time.length !== 5 || time[2] !== ":") {
  //     return { valid: false, message: "Time must be in HH:MM format" };
  //   }

  //   const [hours, minutes] = time.split(":");
  //   const hoursNum = parseInt(hours, 10);
  //   const minutesNum = parseInt(minutes, 10);

  //   if (isNaN(hoursNum)) {
  //     return { valid: false, message: "Hours must be a number" };
  //   }

  //   if (isNaN(minutesNum)) {
  //     return { valid: false, message: "Minutes must be a number" };
  //   }

  //   if (hoursNum < 0 || hoursNum > 23) {
  //     return { valid: false, message: "Hours must be between 00:00 - 23:59" };
  //   }

  //   if (minutesNum < 0 || minutesNum > 59) {
  //     return { valid: false, message: "Minutes must be between 00-59" };
  //   }

  //   return { valid: true, message: "" };
  // };

  // const validateTimeComparison = (startTime, endTime) => {
  //   if (
  //     !startTime ||
  //     !endTime ||
  //     startTime.length !== 5 ||
  //     endTime.length !== 5
  //   ) {
  //     return "";
  //   }

  //   const [startH, startM] = startTime.split(":").map(Number);
  //   const [endH, endM] = endTime.split(":").map(Number);

  //   if (startH > endH || (startH === endH && startM > endM)) {
  //     return "Start time cannot be after end time";
  //   }

  //   return "";
  // };

  const UpdateButtonOnClick = () => {
    try {
      let updateData = {
        Settings: [
          {
            Key: "BD_EmailOnEveryMessage",
            Value: String(settingsRecord.BD_EmailOnEveryMessage),
          },
          {
            Key: "BD_SoundOnEveryMessage",
            Value: String(settingsRecord.BD_SoundOnEveryMessage),
          },
          {
            Key: "BD_Enable2FA",
            Value: String(settingsRecord.BD_Enable2FA),
          },
        ],
      };

      dispatch(
        UpdateUserSettingsAPI(navigate, updateData, setSettingModalState)
      );
      console.log("updateDataupdateData", updateData);
      // setSettingModalState(false);
    } catch (err) {}

    try {
      let updateTime = {
        MonThuStartTime: extractTimeOnly(monToThruStartTime),
        MonThuEndTime: extractTimeOnly(monToThruEndTime),
        FridayStartTime: extractTimeOnly(fridayStartTime),
        FridayEndTime: extractTimeOnly(fridayEndTime),
      };
      console.log("updated time is:", updateTime);
      dispatch(
        SaveMarketTimeSettingsAPI(navigate, updateTime, setSettingModalState)
      );
    } catch (error) {}
  };

  return (
    <>
      <Modal
        show={SettingModalState}
        setShow={setSettingModalState}
        className="modaldialog modal-setting-styles"
        modalHeaderClassName={"header-setting-Modal-close-btn"}
        modalFooterClassName={"modal-footer-setting"}
        size="lg"
        onHide={onCloseButton}
        ModalBody={
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-start gap-1"
              >
                <Button
                  text="User Setting"
                  onClick={onClickSettingUser}
                  className={
                    settingUser
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
                <Button
                  text="Passcode Setting"
                  onClick={onClickPasscodeSetting}
                  className={
                    passcodeSetting
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
                <Button
                  text="Market Timing"
                  onClick={onClickMarketSetting}
                  className={
                    marketTiming
                      ? `${"setting-button-modal"}`
                      : `${"setting-button-disabled"}`
                  }
                />
              </Col>
            </Row>

            {settingUser ? (
              <UserSetting
                onChangeCheckbox={onChangeCheckbox}
                settingsRecord={settingsRecord}
              />
            ) : passcodeSetting ? (
              <PassCodeSetting
                onChangeSwitch={onChangeSwitch}
                settingsRecord={settingsRecord}
              />
            ) : marketTiming ? (
              <MarketTiming
                monToThruStartTime={monToThruStartTime}
                setMonToThruStartTime={setMonToThruStartTime}
                monToThruEndTime={monToThruEndTime}
                setMonToThruEndTime={setMonToThruEndTime}
                fridayStartTime={fridayStartTime}
                setFridayStartTime={setFridayStartTime}
                fridayEndTime={fridayEndTime}
                setFridayEndTime={setFridayEndTime}
              />
            ) : null}
          </>
        }
        ModalFooter={
          <>
            <Row className="mb-3">
              <Col lg={12} md={12} sm={12} className="footer-btn-col">
                <Button
                  text="Save"
                  className="update-btn-editModal"
                  onClick={UpdateButtonOnClick}
                />
              </Col>
            </Row>
          </>
        }
      />
      {Loading && <Loader />}
    </>
  );
};

export default SettingModal;
