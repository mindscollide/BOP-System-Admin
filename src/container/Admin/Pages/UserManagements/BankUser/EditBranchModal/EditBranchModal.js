import React, { useState } from "react";
import styles from "./EditBranchModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { editBankUserModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { UpdateBranchAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import {
  Button,
  Modal,
  Notification,
  TextField,
} from "../../../../../../components/elements";
const EditBranchModal = ({ editBranchData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const [branchEditError, setBranchEditError] = useState({
    branchName: {
      errorStatus: false,
      errorMessage: "",
    },
    branchCode: {
      errorStatus: false,
      errorMessage: "",
    },
  });

  const [updateBranch, setUpdateBranch] = useState({ ...editBranchData });

  //State to activate the edit button
  //States
  const [open, setOpen] = useState(false);

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(editBankUserModalSystemAdmin(false));
  };

  //Handle Value Change
  const updateBranchUserValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "branchCode" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z0-9]/g, "");
      if (valueCheck !== "") {
        setUpdateBranch({
          ...updateBranch,
          branchCode: valueCheck,
        });
      }
    } else if (name === "branchCode" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchCode: "",
      });
    }
    if (name === "branchName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUpdateBranch({
          ...updateBranch,
          branchName: valueCheck,
        });
      }
    } else if (name === "branchName" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchName: "",
      });
    }

    if (name === "branchContact" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setUpdateBranch({
          ...updateBranch,
          branchContact: valueCheck,
        });
      }
    } else if (name === "branchContact" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchContact: "",
      });
    }
  };
  // Handle Update Branch
  const handleUpdateBranch = () => {
    try {
      let data = {
        BranchID: updateBranch.branchID,
        BranchName: updateBranch.branchName,
        BranchCode: updateBranch.branchCode,
        BranchContact: updateBranch.branchContact,
      };
      dispatch(UpdateBranchAPI(navigate, data, setBranchEditError));
    } catch (err) {
      console.log("error: ", err);
    }
  };

  return (
    <>
      <Modal
        show={BOPSystemAdminModal.editBankUserModal}
        setShow={(value) => dispatch(editBankUserModalSystemAdmin(value))}
        className="UniversalBOPModalStylesBankUser"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="UniversalBOPModalStylesfooter"
        size="lg"
        onHide={() => dispatch(editBankUserModalSystemAdmin(false))}
        ModalBody={
          <>
            <Row>
              <Col lg={6} md={6} sm={6} className={styles["EditBranchLabel"]}>
                Edit Branch
              </Col>
              <Col
                sm={6}
                md={6}
                lg={6}
                className={styles["EditBranch_modal-crossIcon"]}
              >
                <i
                  className={`icon-close cursor-pointer ${styles["cross-icon-style"]}`}
                  onClick={() => dispatch(editBankUserModalSystemAdmin(false))}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <span className={styles["labels-add-bank"]}>
                  Branch Name
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={12}
                className={styles["editBranch-inputField"]}
              >
                <TextField
                  name={"branchName"}
                  value={updateBranch.branchName}
                  maxLength={50}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />

                {branchEditError.branchName.errorStatus && (
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p className={styles["branchErrorMessage"]}>
                        {branchEditError.branchName.errorMessage}
                      </p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <span className={styles["labels-add-bank"]}>
                  Branch Code
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={12}
                className={styles["editBranch-inputField"]}
              >
                <TextField
                  name={"branchCode"}
                  maxLength={4}
                  value={updateBranch.branchCode}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />
                {branchEditError.branchCode.errorStatus && (
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p className={styles["branchErrorMessage"]}>
                        {branchEditError.branchCode.errorMessage}
                      </p>
                    </Col>
                  </Row>
                )}
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <span className={styles["labels-add-bank"]}>
                  Contact
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col
                lg={9}
                md={9}
                sm={12}
                className={styles["editBranch-inputField"]}
              >
                <TextField
                  name={"branchContact"}
                  value={updateBranch.branchContact}
                  maxLength={20}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />
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
                text={"Update"}
                className={styles["AddBranchClass"]}
                iconClass={styles["IconClass"]}
                onClick={handleUpdateBranch}
                disableBtn={
                  updateBranch.branchName !== "" &&
                  updateBranch.branchCode !== "" &&
                  updateBranch.branchContact !== ""
                    ? false
                    : true
                }
              />

              <Button
                icon={<i className="icon-close"></i>}
                text={"Cancel"}
                className={styles["CancelButton"]}
                iconClass={styles["IconClass"]}
                onClick={handleCancelButton}
              />
            </Col>
          </Row>
        }
      />
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </>
  );
};

export default EditBranchModal;
