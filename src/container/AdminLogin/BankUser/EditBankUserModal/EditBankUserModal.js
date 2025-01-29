import React, { useState } from "react";
import styles from "./EditBankUserModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
// import Select from "react-select";
import { editBankUserModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import {
  Button,
  Modal,
  Notification,
  TextField,
} from "../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { UpdateBranchAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
import { updateBranchSchema } from "../../../../utils/schemas";
const EditBankUserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const [updateBranch, setUpdateBranch] = useState({ ...updateBranchSchema });

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
          branchCode: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchCode" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchCode: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
    if (name === "branchName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setUpdateBranch({
          ...updateBranch,
          branchName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchName" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchName: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "branchContact" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setUpdateBranch({
          ...updateBranch,
          branchContact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchContact" && value === "") {
      setUpdateBranch({
        ...updateBranch,
        branchContact: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };
  // Handle Update Branch
  const handleUpdateBranch = () => {
    let data = {
      BranchID: 1,
      BranchName: updateBranch.branchName.value,
      BranchCode: updateBranch.branchCode.value,
      BranchContact: updateBranch.branchContact.value,
    };
    console.log("data", data);
    dispatch(UpdateBranchAPI(navigate, data));
  };
  return (
    <>
      <Modal
        show={BOPSystemAdminModal.editBankUserModal}
        setShow={(value) => dispatch(editBankUserModalSystemAdmin(value))}
        className="UniversalBOPModalStyles"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="UniversalBOPModalStylesfooter"
        size="md"
        onHide={() => dispatch(editBankUserModalSystemAdmin(false))}
        ModalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={styles["AddBranchLabel"]}>Edit Branch</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                <span className={styles["labels-add-bank"]}>
                  Branch Name
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col lg={8} md={8} sm={12}>
                <TextField
                  name={"branchName"}
                  value={updateBranch.branchName.value}
                  maxLength={50}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                <span className={styles["labels-add-bank"]}>
                  Branch Code
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col lg={8} md={8} sm={12}>
                <TextField
                  name={"branchCode"}
                  value={updateBranch.branchCode.value}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                <span className={styles["labels-add-bank"]}>
                  Contact
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col lg={8} md={8} sm={12}>
                <TextField
                  name={"branchContact"}
                  value={updateBranch.branchContact.value}
                  maxLength={20}
                  onChange={updateBranchUserValidateHandler}
                  labelClass="d-none"
                />
              </Col>
            </Row>
          </>
        }
        ModalFooter={
          <Row className="mb-3">
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
                onClick={handleUpdateBranch}
              />

              <Button
                icon={<i class="icon-close"></i>}
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

export default EditBankUserModal;
