import React, { useEffect, useState } from "react";
import styles from "./EditCompanyModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import Select from "react-select";
// import { editCompanyModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
// import { Button, Modal, TextField } from "../../../../components/elements";
import { Col, Row } from "react-bootstrap";
// import { UpdateCorporateByCorporateIDAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { editCompanyModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { UpdateCorporateByCorporateIDAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import { GetAllNatureAPI } from "../../../../../../store/actions/Auth-Actions";
import {
  Button,
  Modal,
  TextField,
} from "../../../../../../components/elements";
import { RFQTimerOptions } from "../../../../../../helpers/Dropdown";
// import { RFQTimerOptions } from "../../../../helpers/Dropdown";
// import { GetAllNatureAPI } from "../../../../store/actions/Auth-Actions";
const EditCompanyModal = ({ editCompanyData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const [updateCompany, setUpdateCompany] = useState({ ...editCompanyData });

  const [companyEditError, setCompanyEditError] = useState({
    corporateName: {
      errorStatus: false,
      errorMessage: "",
    },
  });

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(editCompanyModalSystemAdmin(false));
  };

  const [natureOptions, setNatureOptions] = useState([]);
  const getAllNatureOfBuisness = useSelector(
    (state) => state.auth.getAllNatureOfBuisness
  );

  //RFQTreasuryRoles
  const [treasuryOptionsID, setTreasuryOptionsID] = useState(
    updateCompany.rfqTimers
      ? {
          value: updateCompany.rfqTimers[0].treasuryRFQExpiryInMin,
          label: `${updateCompany.rfqTimers[0].treasuryRFQExpiryInMin} Minutes`,
        }
      : null
  );

  //RFQTreasuryRoles
  const [corporateOptionsID, setCorporateOptionsID] = useState(
    updateCompany.rfqTimers
      ? {
          value: updateCompany.rfqTimers[0].corporateRFQExpiryInMin,
          label: `${updateCompany.rfqTimers[0].corporateRFQExpiryInMin} Minutes`,
        }
      : null
  );

  //companyRoles
  const [natureOptionsID, setNatureOptionsID] = useState(
    updateCompany.natureofBusiness
      ? {
          value: updateCompany.natureofBusiness.pK_NatureOfBusiness,
          label: updateCompany.natureofBusiness.name,
        }
      : null
  );

  const handleUpdateEditCompany = () => {
    try {
      let data = {
        CorporateId: updateCompany.corporateID, //done
        CorporateName: updateCompany.corporateName, //done
        RFQTreasuryExpiryTimer: treasuryOptionsID.value,
        RFQCorporateExpiryTimer: corporateOptionsID.value,
        NatureOfBusinessId: natureOptionsID.value,
      };

      console.log("UpdateCorporateByCorporateID", data);
      dispatch(
        UpdateCorporateByCorporateIDAPI(navigate, data, setCompanyEditError)
      );
    } catch (error) {
      console.log("Error: ", error);
    }
  };

  useEffect(() => {
    dispatch(GetAllNatureAPI(navigate));
  }, []);

  useEffect(() => {
    if (getAllNatureOfBuisness !== null) {
      try {
        let newNatureOfBusiness = getAllNatureOfBuisness.natureofBusinesses.map(
          (natureOfBusiness) => {
            return {
              ...natureOfBusiness,
              value: natureOfBusiness.pK_NatureOfBusiness,
              label: natureOfBusiness.name,
            };
          }
        );
        setNatureOptions(newNatureOfBusiness);
      } catch (err) {
        console.log("Error: ", err);
      }
    }
  }, [getAllNatureOfBuisness]);

  const updateCompanyValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "companyName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUpdateCompany({
          ...updateCompany,
          corporateName: valueCheck,
        });
      }
    } else if (name === "companyName" && value === "") {
      setUpdateCompany({
        ...updateCompany,
        corporateName: "",
      });
    }
  };

  return (
    <Modal
      show={BOPSystemAdminModal.editCompanyModal}
      setShow={(value) => dispatch(editCompanyModalSystemAdmin(value))}
      className="UniversalBOPModalStylesEditCompany"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(editCompanyModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col
              lg={6}
              md={6}
              sm={6}
              className={styles["EditCompany_modal-title"]}
            >
              Edit Company
            </Col>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={styles["EditCompany_modal-crossIcon"]}
            >
              <i
                className={`icon-close cursor-pointer ${styles["cross-icon-style"]}`}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Company Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["editCompany-inputField"]}
            >
              <TextField
                labelClass="d-none"
                name={"companyName"}
                value={updateCompany.corporateName}
                maxLength={50}
                onChange={updateCompanyValidateHandler}
              />
              {companyEditError.corporateName.errorStatus && (
                <Row>
                  <Col className="d-flex justify-content-start">
                    <p className={styles["companyErrorMessage"]}>
                      {companyEditError.corporateName.errorMessage}
                    </p>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                <span className={styles["labels-add-bank"]}>
                  RFQ Timer
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </span>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["editCompany-inputField"]}
            >
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select
                    classNamePrefix="selectCateogyCorporateList"
                    placeholder={"3 Minutes"}
                    options={RFQTimerOptions}
                    value={treasuryOptionsID}
                    menuPortalTarget={document.body}
                    onChange={setTreasuryOptionsID}
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
                    options={RFQTimerOptions}
                    value={corporateOptionsID}
                    menuPortalTarget={document.body}
                    onChange={setCorporateOptionsID}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={3} md={3} sm={12}>
              <span className={styles["labels-add-bank"]}>
                Nature of Client
                <span className={styles["aesterick-color"]}>*</span>
              </span>
            </Col>
            <Col
              lg={9}
              md={9}
              sm={12}
              className={styles["editCompany-inputField"]}
            >
              <Select
                classNamePrefix="selectCateogyCorporateList"
                placeholder={"IMPORTANT PAYMENT"}
                options={natureOptions}
                value={natureOptionsID}
                menuPortalTarget={document.body}
                onChange={setNatureOptionsID}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-4 mb-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                text={"Update"}
                icon={<i className="icon-refresh"></i>}
                className={styles["AddBranchClass"]}
                onClick={handleUpdateEditCompany}
                disableBtn={updateCompany.corporateName !== "" ? false : true}
              />
              <Button
                text={"Cancel"}
                icon={<i className="icon-close"></i>}
                className={styles["CancelButton"]}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default EditCompanyModal;
