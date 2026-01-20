import React, { useEffect, useState } from "react";
import styles from "./CurrencyModal.module.css";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Modal } from "../../../../../../components/elements";
import { SaveInstrumentApplicabilitySystemAdminModal } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { SaveInstrumentApplicabilityAPI } from "../../../../../../store/actions/SpreadManagementActions";
const CurrencyModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  console.log("CHecckckk");

  const { saveInstrumentModal, selectedInstrument } = useSelector(
    (state) => state.BOPSystemAdminModal
  );

  // Local state for checkboxes
  const [formState, setFormState] = useState({
    InstrumentID: null,
    IsDefaultCurrency: false,
    ForwardApplicable: false,
    FEDiscountingApplicable: false,
    NonFEDiscountingApplicable: false,
  });

  console.log(formState, "formStatejhadvjhv");

  // When modal opens, fill local state from selectedInstrument
  useEffect(() => {
    if (selectedInstrument) {
      setFormState({
        InstrumentID: selectedInstrument.key,
        InstrumentName: selectedInstrument.shortCode,
        IsDefaultCurrency: selectedInstrument.isDefaultCurrency || false,
        ForwardApplicable: selectedInstrument.forwardApplicable || false,
        FEDiscountingApplicable:
          selectedInstrument.discountingApplicable || false,
        NonFEDiscountingApplicable: selectedInstrument.nonFEApplicable || false,
      });
    }
  }, [selectedInstrument]);

  const handleCheckboxChange = (field) => {
    setFormState((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const saveDataOnClick = () => {
    dispatch(SaveInstrumentApplicabilityAPI(navigate, formState));
  };

  return (
    <Modal
      show={saveInstrumentModal}
      setShow={(value) =>
        dispatch(SaveInstrumentApplicabilitySystemAdminModal(value))
      }
      className="UniversalBOPModalStylesBankUser"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="lg"
      onHide={() =>
        dispatch(SaveInstrumentApplicabilitySystemAdminModal(false))
      }
      ModalBody={
        <>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className={styles["currencymodal-label"]}
            >
              Edit Currency
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className={styles["currencymodal-heading2"]}
            >
              {formState.InstrumentName}
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className={styles["EditBranchLabel"]}>
              <Checkbox
                checked={formState.IsDefaultCurrency}
                onChange={() => handleCheckboxChange("IsDefaultCurrency")}
                name="chatPannal"
              >
                is Default Currency
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className={styles["EditBranchLabel"]}>
              <Checkbox
                checked={formState.ForwardApplicable}
                onChange={() => handleCheckboxChange("ForwardApplicable")}
                name="chatPannal"
              >
                Forward Applicable
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className={styles["EditBranchLabel"]}>
              <Checkbox
                checked={formState.FEDiscountingApplicable}
                onChange={() => handleCheckboxChange("FEDiscountingApplicable")}
                name="chatPannal"
              >
                FE Discounting Applicable
              </Checkbox>
            </Col>
          </Row>
          <Row>
            <Col lg={12} md={12} sm={12} className={styles["EditBranchLabel"]}>
              <Checkbox
                checked={formState.NonFEDiscountingApplicable}
                disabled={true}
                onChange={() =>
                  handleCheckboxChange("NonFEDiscountingApplicable")
                }
                name="chatPannal"
              >
                Non-FE Discounting Applicable
              </Checkbox>
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <Row className="mt-4 mb-3">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center gap-2"
          >
            <Button
              icon={<i className="icon-refresh"></i>}
              text={"Save Changes"}
              onClick={saveDataOnClick}
              className={styles["saveChangesButton"]}
              iconClass={styles["IconClass"]}
            />

            <Button
              icon={<i className="icon-close"></i>}
              text={"Cancel"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={() =>
                dispatch(SaveInstrumentApplicabilitySystemAdminModal(false))
              }
            />
          </Col>
        </Row>
      }
    />
  );
};

export default CurrencyModal;
