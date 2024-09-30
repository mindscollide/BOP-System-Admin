import React from "react";
import styles from "./CorporatePlusIconModal.module.css";
import { Button, Modal, TextField } from "../../../../components/elements";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
import { corporatePlusIconModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import { CreateNewCorporateAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
const CorporatePlusIconModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const handleCrossIcon = () => {
    dispatch(corporatePlusIconModalSystemAdmin(false));
  };

  const handleAddCorporateModal = () => {
    let data = {
      FK_AssetTypeID: 2,
      RFQTreasuryExpiryTimer: 30,
      RFQCorporateExpiryTimer: 40,
      CorporateName: "Stonk Tech",
      NatureOfBusinessID: 2,
      FK_CategoryID: 57,
      BankId: 1,
    };
    dispatch(CreateNewCorporateAPI(navigate, data));
  };
  return (
    <Modal
      show={BOPSystemAdminModal.corporatePlusIconModal}
      setShow={(value) => dispatch(corporatePlusIconModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(corporatePlusIconModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={11} md={11} sm={12}>
              <span className={styles["AddCompanyLabel"]}>Add Company</span>
            </Col>
            <Col lg={1} md={1} sm={12}>
              <Button
                className={styles["CrossButton"]}
                icon={<i class="icon-close"></i>}
                iconClass={styles["crossIconClass"]}
                onClick={handleCrossIcon}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Company Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <TextField labelClass="d-none" name={"firstName"} />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Category
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Select
                classNamePrefix={"selectCateogyCorporateList"}
                placeholder={"01 bps"}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                <span className={styles["labels-add-bank"]}>
                  RFQ Timer
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    classNamePrefix="selectCateogyCorporateList"
                    placeholder={"3 Minutes"}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    classNamePrefix="selectCateogyCorporateList"
                    placeholder={"3 Minutes"}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={4} md={4} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Nature of Client
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col lg={8} md={8} sm={12}>
              <Select
                classNamePrefix="selectCateogyCorporateList"
                placeholder={"IMPORTANT PAYMENT"}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-4">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                text={"Add"}
                icon={<i class="icon-users"></i>}
                className={styles["AddButton"]}
                onClick={handleAddCorporateModal}
              />
              <Button
                text={"Cancel"}
                icon={<i class="icon-close"></i>}
                className={styles["CancelButton"]}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default CorporatePlusIconModal;
