import React, { useState } from "react";
import "./SettingModal.css";
import { Row, Col } from "react-bootstrap";

import { TextField, Button, Table, Modal } from "../../../components/elements";
import { Checkbox, Switch } from "antd";
import { settingSchema } from "../../../utils/schemas";
import Password from "antd/es/input/Password";

const SettingModal = ({ SettingModalState, setSettingModalState }) => {
  const [settingUser, setSettingUser] = useState(true);
  const [passcodeSetting, setPasscodeSetting] = useState(false);
  const [marketTiming, setMarketTiming] = useState(false);
  const [settings, setSettings] = useState({ ...settingSchema });
  const [errors, setErrors] = useState({
    lengthError: true,
    numberError: true,
    specialCharError: true,
    matchError: true,
  });

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
      setSettings({
        ...settings,
        chatPannalOverlap: e.target.checked,
      });
    } else if (encodeURI.target.name === "soundOnEveryMessage") {
      setSettings({
        ...settings,
        soundOnEveryMessage: e.target.checked,
      });
    }
  };

  // radio button for Two factor authentication
  const onChangeSwitch = (e) => {
    setSettings({
      ...settings,
      twoFactorAuthentication: e,
    });
    console.log(`switch to ${e}`);
  };

  // handle input value change
  // const handleValueChange = (e) => {
  //   const { name, value } = e.target;
  //   console.log("name:", name, "value:", value);

  //   if (name === "newPassword") {
  //     setSettings({ ...settings, [name]: { value: value.trim() } });
  //     if (value.length <= 8) {
  //       console.log("error 1: Length of at least 8 characters ");
  //     }
  //     if (!/[0-9]/.test(value)) {
  //       console.log("error 2: Contains Numbers");
  //     }
  //     if (!/[^\w\s]/.test(value)) {
  //       console.log("error 3: Contains special chanracters");
  //     }
  //   }
  //   if (name === "confirmNewPassword") {
  //     setSettings({ ...settings, [name]: { value: value.trim() } });
  //   }
  //   if (settings.newPassword !== settings.confirmNewPassword) {
  //     console.log("error 4: Password Match");
  //   }
  // };

  const handleValueChange = (e) => {
    const { name, value } = e.target;
    setSettings({ ...settings, [name]: { value: value.trim() } });

    if (name === "newPassword") {
      const newErrors = {
        lengthError: value.length < 8,
        numberError: !/[0-9]/.test(value),
        specialCharError: !/[^\w\s]/.test(value),
        matchError: settings.confirmNewPassword.value !== value,
      };
      setErrors(newErrors);
    }

    if (name === "confirmNewPassword") {
      const newErrors = {
        ...errors,
        matchError: settings.newPassword.value !== value,
      };
      setErrors(newErrors);
    }
  };

  console.log("setting", settings);
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
              <>
                <Row className="mt-4">
                  <Col className="checkbox-border">
                    <Checkbox
                      name="chatPannal"
                      defaultChecked={settings.chatPannalOverlap}
                      onChange={onChangeCheckbox}
                    >
                      Chat Panel Overlap
                    </Checkbox>
                  </Col>
                </Row>
                <Row>
                  <Col className="checkbox-border">
                    <Checkbox
                      name="soundOnEveryMessage"
                      defaultChecked={settings.soundOnEveryMessage}
                      onChange={onChangeCheckbox}
                    >
                      Sound on every personal message
                    </Checkbox>
                  </Col>
                </Row>
              </>
            ) : passcodeSetting ? (
              <>
                <div className="border-line-passcode">
                  <Row>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-start"
                    >
                      <p className="two-factor-text">
                        Two Factor Authentication
                      </p>
                    </Col>
                    <Col
                      lg={6}
                      md={6}
                      sm={12}
                      className="d-flex justify-content-end"
                    >
                      <Switch name="twoFactorAuth" onChange={onChangeSwitch} />
                    </Col>
                  </Row>
                </div>

                <Row className="mt-3">
                  <Col lg={12} md={12} sm={12}>
                    <p className="change-password-text">Change Password</p>
                  </Col>
                </Row>

                <Row className="mt-1">
                  <Col lg={4} md={4} sm={12}>
                    <span className="change-password-label">
                      Enter New Password*
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name={"newPassword"}
                      labelClass="d-none"
                      autoComplete={"off"}
                      type={"password"}
                      value={settings.newPassword.value}
                      onChange={handleValueChange}
                    />
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col lg={4} md={4} sm={12}>
                    <span className="change-password-label">
                      Confirm New Password*
                    </span>
                  </Col>
                  <Col lg={8} md={8} sm={12}>
                    <TextField
                      name={"confirmNewPassword"}
                      autoComplete={"off"}
                      labelClass="d-none"
                      type={"password"}
                      value={settings.confirmNewPassword.value}
                      onChange={handleValueChange}
                    />
                  </Col>
                </Row>
                {/* Display all errors */}
                {settings.newPassword.value.length > 0 ||
                settings.confirmNewPassword.value.length > 0 ? (
                  <Row className="mt-3">
                    <Col lg={12} md={12} sm={12}>
                      <p
                        className={
                          errors.lengthError
                            ? "error-message"
                            : "success-message"
                        }
                      >
                        {errors.lengthError ? "X " : "✓ "}Length of at least 8
                        characters
                      </p>
                      <p
                        className={
                          errors.numberError
                            ? "error-message"
                            : "success-message"
                        }
                      >
                        {errors.numberError ? "X " : "✓ "}Contains numbers
                      </p>
                      <p
                        className={
                          errors.specialCharError
                            ? "error-message"
                            : "success-message"
                        }
                      >
                        {errors.specialCharError ? "X " : "✓ "}Contains special
                        characters
                      </p>
                      <p
                        className={
                          errors.matchError
                            ? "error-message"
                            : "success-message"
                        }
                      >
                        {errors.matchError ? "X " : "✓ "}Passwords do not match
                      </p>
                    </Col>
                  </Row>
                ) : null}
              </>
            ) : marketTiming ? (
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
                        <TextField
                          labelClass="d-none"
                          name={"monToThurStartTime"}
                          value={settings.monToThurStartTime.value}
                          onChange={handleValueChange}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">End Time</label>
                        <TextField
                          labelClass="d-none"
                          name={"monToThurEndTime"}
                          value={settings.monToThurEndTime.value}
                          onChange={handleValueChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>

                <Row className="mt-3">
                  <Col>
                    <p className="change-password-text">Friday</p>
                  </Col>
                </Row>
                <Row>
                  <Col lg={8} md={8} sm={8}>
                    <Row>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">Start Time</label>
                        <TextField
                          name={"friStartTime"}
                          labelClass="d-none"
                          value={settings.friStartTime.value}
                          onChange={handleValueChange}
                        />
                      </Col>
                      <Col lg={6} md={6} sm={6}>
                        <label className="two-factor-text">End Time</label>
                        <TextField
                          name={"friEndTime"}
                          labelClass="d-none"
                          value={settings.friEndTime.value}
                          onChange={handleValueChange}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </>
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
                  //   onClick={UpdateButtonOnClick}
                />
              </Col>
            </Row>
          </>
        }
      />
    </>
  );
};

export default SettingModal;
