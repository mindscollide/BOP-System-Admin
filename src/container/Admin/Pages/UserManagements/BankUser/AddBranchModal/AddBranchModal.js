import React, { useEffect, useState } from "react";
import styles from "./AddBranchModal.module.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { addBranchSchema } from "../../../../../../utils/schemas";
import { AdduserModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { AddBranchAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import { GetAllCategoriesAPI } from "../../../../../../store/actions/Auth-Actions";
import {
  Button,
  Modal,
  Notification,
  TextField,
} from "../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import Select from "react-select";
const AddBranchModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);

  const [categoryOptions, setCategoryOptions] = useState([]);

  //Auth States
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });
  const [addBranch, setAddBranch] = useState({ ...addBranchSchema });

  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });

  //handle Cancel Button
  const handleCancelButton = () => {
    dispatch(AdduserModalSystemAdmin(false));
  };

  //onChange Add Branch Module
  const handleChangeAddBranch = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    if (name === "branchName" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          branchName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchName" && value === "") {
      setAddBranch({
        ...addBranch,
        branchName: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "branchCode" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          branchCode: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchCode" && value === "") {
      setAddBranch({
        ...addBranch,
        branchCode: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    if (name === "branchContact" && value !== "") {
      let valueCheck = value.replace(/[^0-9]/g, "");
      if (valueCheck !== "") {
        setAddBranch({
          ...addBranch,
          branchContact: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchContact" && value === "") {
      setAddBranch({
        ...addBranch,
        branchContact: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //handle select categoryID
  const handleSelectCategory = async (selectedCategory) => {
    setCategoryID(selectedCategory);

    setAddBranch((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.categoryID, value: selectedCategory.value },
    }));
  };

  //Handle Add Branch Event
  const handleAddBranchEvent = (e) => {
    e.preventDefault();
    let data = {
      BankID: 1,
      BranchName: addBranch.branchName.value,
      BranchCode: addBranch.branchCode.value,
      BranchContact: addBranch.branchContact.value,
      CategoryID: categoryID.value,
    };
    dispatch(AddBranchAPI(navigate, data, setAddBranch));
    // dispatch(AdduserModalSystemAdmin(false));
  };

  // Fetch categories on component mount
  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
  }, []);

  useEffect(() => {
    if (getAllCategories !== null) {
      try {
        let newCategoriesData = getAllCategories.categories.map((category) => {
          return {
            value: category.categoryID,
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);

        // Set the first category as default if categories exist
        if (newCategoriesData.length > 0) {
          setCategoryID(newCategoriesData[0]);
          setAddBranch((prevState) => ({
            ...prevState,
            categoryID: {
              ...prevState.categoryID,
              value: newCategoriesData[0].value,
            },
          }));
        }
      } catch (error) {
        console.error("Error processing categories:", error);
      }
    }
  }, [getAllCategories]);

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
              <Col lg={6} md={6} sm={6}>
                <span className={styles["AddBranchLabel"]}>Add Branch</span>
              </Col>
              <Col
                sm={6}
                md={6}
                lg={6}
                className={styles["AddBranch_modal-crossIcon"]}
              >
                <i
                  className="icon-close cursor-pointer"
                  onClick={() => dispatch(AdduserModalSystemAdmin(false))}
                />
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
                  labelClass="d-none"
                  value={addBranch.branchName.value}
                  onChange={handleChangeAddBranch}
                  maxLength={50}
                />
                {addBranch.branchName.errorStatus === true && (
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p className={styles["branchErrorMessage"]}>
                        {addBranch.branchName.errorMessage}
                      </p>
                    </Col>
                  </Row>
                )}
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
                  labelClass="d-none"
                  value={addBranch.branchCode.value}
                  onChange={handleChangeAddBranch}
                  maxLength={4}
                />
                {addBranch.branchCode.errorStatus && (
                  <Row>
                    <Col className="d-flex justify-content-start">
                      <p className={styles["branchErrorMessage"]}>
                        {addBranch.branchCode.errorMessage}
                      </p>
                    </Col>
                  </Row>
                )}
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
                <Select
                  name="categoryID"
                  options={categoryOptions}
                  placeholder="Select Category"
                  classNamePrefix={"selectCateogyCorporateList"}
                  value={categoryID.value !== 0 ? categoryID : null}
                  onChange={handleSelectCategory}
                  menuPortalTarget={document.body}
                  isSearchable={true}
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
                  labelClass="d-none"
                  value={addBranch.branchContact.value}
                  onChange={handleChangeAddBranch}
                  maxLength={20}
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
                icon={<i className="icon-users"></i>}
                text={"Add Branch"}
                className={styles["AddBranchClass"]}
                iconClass={styles["IconClass"]}
                onClick={handleAddBranchEvent}
                disableBtn={
                  addBranch.branchName.value !== "" &&
                  addBranch.branchCode.value !== "" &&
                  addBranch.branchContact.value !== "" &&
                  addBranch.categoryID.value !== ""
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

export default AddBranchModal;
