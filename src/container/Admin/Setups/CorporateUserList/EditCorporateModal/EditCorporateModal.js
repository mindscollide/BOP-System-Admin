import React, { useState } from "react";
import styles from "./EditCorporateModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  CustomRadio,
  Modal,
  TextField,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { EditCorporateModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
const EditCorporateModal = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //States
  const [value, setValue] = useState("Corporate");

  //Options for radio
  const radioOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  //Radio Buttons Management
  const handleChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(EditCorporateModalSystemAdmin(false));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.editCorporateModal}
      setShow={(value) => dispatch(EditCorporateModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(EditCorporateModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["AddBranchLabel"]}>Edit Corporate</span>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Email
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Corporate Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField name={"firstName"} labelClass="d-none" />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              {" "}
              <CustomRadio
                options={radioOptions}
                onChange={handleChange}
                value={value}
                name="customRadio"
                size="default"
                className="custom-radio-group"
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <Row className="mt-4">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center gap-2"
          >
            <Button
              icon={<i class="icon-refresh"></i>}
              text={"Update"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
            />

            <Button
              icon={<i class="icon-close"></i>}
              text={"Discard"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleDiscardButton}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default EditCorporateModal;
