import React, { useState } from "react";
import styles from "./AddBankUserModal.module.css";
import {
  Button,
  Modal,
  Notification,
  TextField,
} from "../../../../components/elements";
import Select from "react-select";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { AdduserModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import { AddBranchAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { useNavigate } from "react-router-dom";
const AddBankUserModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //States
  const [open, setOpen] = useState(false);
  const [addBranch, setAddBranch] = useState({
    BranchName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    BranchCode: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Category: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    BranchContact: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(AdduserModalSystemAdmin(false));
  };

  //onChange Add Branch Module
  const handleChangeAddBranch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "BranchName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          BranchName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "BranchName" && value === "") {
      setAddBranch({
        ...addBranch,
        BranchName: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "BranchCode" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          BranchCode: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "BranchCode" && value === "") {
      setAddBranch({
        ...addBranch,
        BranchCode: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "BranchContact" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          BranchContact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "BranchContact" && value === "") {
      setAddBranch({
        ...addBranch,
        BranchContact: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //Handle Add Branch Event
  const handleAddBranchEvent = (e) => {
    e.preventDefault();
    let data = {
      BankID: 1,
      BranchName: "Gulshan Branch",
      BranchCode: "BOP002",
      BranchContact: "021234567890",
      CategoryID: 59,
    };
    dispatch(AddBranchAPI(navigate, data));
  };
  return (
    <>
      <Modal
        show={BOPSystemAdminModal.addBankUserModal}
        setShow={(value) => dispatch(AdduserModalSystemAdmin(value))}
        className="UniversalBOPModalStyles"
        modalHeaderClassName={"d-none"}
        modalFooterClassName="UniversalBOPModalStylesfooter"
        size="md"
        onHide={() => dispatch(AdduserModalSystemAdmin(false))}
        ModalBody={
          <>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={styles["AddBranchLabel"]}>Add Branch</span>
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
                  name={"BranchName"}
                  labelClass="d-none"
                  value={addBranch.BranchName.value}
                  onChange={handleChangeAddBranch}
                  maxLength={50}
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
                  name={"BranchCode"}
                  labelClass="d-none"
                  value={addBranch.BranchCode.value}
                  maxLength={4}
                  onChange={handleChangeAddBranch}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={4} md={4} sm={12} className="d-flex align-items-center">
                <span className={styles["labels-add-bank"]}>
                  Category
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
              </Col>
              <Col lg={8} md={8} sm={12}>
                <Select isSearchable={true} />
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
                  name={"BranchContact"}
                  labelClass="d-none"
                  value={addBranch.BranchContact.value}
                  onChange={handleChangeAddBranch}
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
                icon={<i class="icon-users"></i>}
                text={"Add Branch"}
                className={styles["AddBranchClass"]}
                iconClass={styles["IconClass"]}
                onClick={handleAddBranchEvent}
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

export default AddBankUserModal;
