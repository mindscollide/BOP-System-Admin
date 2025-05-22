import { Checkbox } from "antd";
import React from "react";
import { Col, Row } from "react-bootstrap";

const UserSetting = ({ settingsRecord, onChangeCheckbox }) => {
  return (
    <>
      <Row className="mt-4">
        <Col className="checkbox-border">
          <Checkbox
            name="chatPannal"
            checked={settingsRecord.BD_EmailOnEveryMessage}
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
            checked={settingsRecord.BD_SoundOnEveryMessage}
            onChange={onChangeCheckbox}
          >
            Sound on every personal message
          </Checkbox>
        </Col>
      </Row>
    </>
  );
};

export default UserSetting;
