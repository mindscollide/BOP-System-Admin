import React, { useEffect, useState } from "react";
import styles from "./EditBankerModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  // CustomRadio,
  Modal,
  Notification,
  TextField,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { editBankUserModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import Select from "react-select";
import { updateBankUserSchema } from "../../../../../utils/schemas";
import { useNavigate } from "react-router-dom";
import { UpdateBankUserByUserIdAPI } from "../../../../../store/actions/BOPSystemAdminActions";
import {
  RoleListAPI,
  GetAllBranchesAPI,
} from "../../../../../store/actions/Auth-Actions";

// import { UpdateCorporateUsersAPI } from "../../../../../store/actions/BOPSystemAdminActions";

const EditBankerModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  // const { auth } = useSelector((state) => state);
  // console.log("this is the user", auth);
  //States
  // const [value, setValue] = useState("Corporate");

  //state for error Message
  // const [errorShow, setErrorShow] = useState(false);
  // GetBankUserbyUserID
  const GetBankUserbyUserID = useSelector(
    (state) => state.BOPSystemAdminReducer.GetBankUserbyUserIDData
  );
  console.log("GetBankUserbyUserID", GetBankUserbyUserID);

  // updateBankUserByUserID
  const UpdateBankUserbyUserID = useSelector(
    (state) => state.BOPSystemAdminReducer.UpdateBankUserbyUserIDData
  );
  console.log("UpdateBankUserbyUserID", UpdateBankUserbyUserID);

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);
  console.log("RoleList is: ", RoleList);

  //getAllBranch
  const getAllBranches = useSelector((state) => state.auth.GetAllBranchesData);
  //Dummy User for handlin UI change bansed on the user Secuity admiin or system admin
  // let user = "System Admin";
  //Checking snakbar state

  // //State for add company
  // const [updateCorporate, setUpdateCorporate] = useState({
  //   ...updateCorporateUserSchema,
  // });

  // //Options for radio
  // const radioOptions = [
  //   { label: "Active", value: "Active" },
  //   { label: "Inactive", value: "Inactive" },
  // ];

  const [branchOptions, setBranchOptions] = useState([]);
  const [branchRole, setBranchRole] = useState({
    value: 0,
    label: "",
  });
  //state for role
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleID, setRoleID] = useState({
    value: 0,
    label: "",
  });

  //Notification state
  const [open, setOpen] = useState({
    open: false,
    message: "",
  });

  //State for add company
  const [updateBankUser, setUpdateBankUser] = useState({
    ...updateBankUserSchema,
  });

  console.log(updateBankUser, branchRole, "updateBankUserupdateBankUser");
  //Handle Value Change and Validation
  const handleValueChangeAndValidation = (e) => {
    const { name, value } = e.target;
    console.log("name", name, "value", value);

    //Validation rules
    const validateInput = {
      firstName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
      ContactNumber: (val) => val.replace(/[^\d]/g, ""),

      // email: (val) => val.replace(/\s+/g, ""),
      // corporateName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
    };

    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setUpdateBankUser((prevState) => ({
        ...prevState,
        [fieldName]: {
          value: validValue,
          errorMessage: hasError ? "This field is required" : "",
          errorStatus: hasError,
        },
      }));
    };

    // Update the specific field
    updateField(name, value);
  };

  //Radio Buttons Management
  const handleRadioChange = (e) => {
    console.log("radio checked", e.target.value);
    setUpdateBankUser({
      ...updateBankUser,
      activeUser: {
        value: e.target.value,
      },
    });
  };
  //handle select CategoryID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);
    console.log("roleID is", roleID.value);

    setUpdateBankUser((prevState) => ({
      ...prevState,
      roleID: {
        value: selectedRole.value,
      },
      branch: null,
    }));
    setBranchRole({
      value: 0,
      label: "",
    });
  };

  const branchSelectRoleHandler = async (selectedBranch) => {
    console.log(selectedBranch, "selectroleselectroleselectrole");
    setBranchRole(selectedBranch);

    setUpdateBankUser((prevState) => ({
      ...prevState,
      // category: selectedBranch.categoryName,
      branch: {
        branchCode: "BOP002",
        branchID: 2,
        branchName: "Gulshan Branch",
      },
    }));
  };
  //handle Active Button
  // show error message When user hit activate btn
  const handleUpdateButton = () => {
    // console.log("updateBankUser data is: ", updateBankUser);
    if (
      updateBankUser.firstName.value !== "" &&
      updateBankUser.roleID.value !== 0 &&
      updateBankUser.ContactNumber.value !== "" &&
      updateBankUser.activeUser.value !== ""
    ) {
      // setErrorShow(false);
      let newData = {
        UserID: updateBankUser.userID.value, // temporary for state management
        FirstName: updateBankUser.firstName.value,
        ContactNumber: updateBankUser.ContactNumber.value,
        UserRoleID: updateBankUser.roleID.value,
        // ActiveUser: updateBankUser.activeUser.value,
        BranchID: branchRole.value,
      };
      console.log("newData", newData);
      dispatch(UpdateBankUserByUserIdAPI(navigate, newData));
    } else {
      console.log("Error Encoutered");
      // setTimeout();
      // setErrorShow(true);
    }
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(editBankUserModalSystemAdmin(false));
  };

  useEffect(() => {
    dispatch(RoleListAPI(navigate));
    dispatch(GetAllBranchesAPI(navigate));
  }, []);

  useEffect(() => {
    if (GetBankUserbyUserID !== null)
      try {
        let bankUser = GetBankUserbyUserID.bankUser;

        setUpdateBankUser({
          firstName: {
            value: bankUser.firstName || "",
            errorMessage: "",
            errorStatus: false,
          },
          email: {
            value: bankUser.email || "",
            errorMessage: "",
            errorStatus: false,
          },
          ContactNumber: {
            value: bankUser.contactNumber || "",
            errorMessage: "",
            errorStatus: false,
          },
          roleID: {
            value: bankUser.userRoleID || 0,
            errorMessage: "",
            errorStatus: false,
          },
          branch: bankUser.branch,
          activeUser: {
            value: bankUser.userStatusID === 1 ? "Active" : "Inactive",
            errorMessage: "",
            errorStatus: false,
          },
          userID: {
            value: bankUser.userID,
            errorMessage: "",
            errorStatus: false,
          },
        });
        if (bankUser.branch !== null && bankUser.branch !== undefined) {
          let branch = {
            value: bankUser.branch.branchID,
            label: bankUser.branch.branchName,
          };
          setBranchRole(branch);
        }

        // Set the role in the Select dropdown
        const selectedRole = roleOptions.find(
          (option) => option.value === bankUser.userRoleID
        );
        setRoleID(selectedRole);
      } catch (error) {
        console.log("error: ", error);
      }
    if (RoleList !== null) {
      try {
        let newRolesData = RoleList.roles.map((role) => {
          return {
            ...role,
            value: role.roleID,
            label: role.roleName,
          };
        });
        setRoleOptions(newRolesData);
      } catch (error) {}
    }
    if (getAllBranches !== null) {
      try {
        let newBranchesData = getAllBranches.branches.map((branch) => {
          return {
            ...branch,
            value: branch.branchID,
            label: branch.branchName,
          };
        });
        setBranchOptions(newBranchesData);
      } catch (error) {}
    }
  }, [GetBankUserbyUserID, RoleList]);
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
                <span className={styles["AddBranchLabel"]}>Edit Bank</span>
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
                <span className={styles["labels-add-bank"]}>
                  Name
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
                <TextField
                  labelClass="d-none"
                  name={"firstName"}
                  value={updateBankUser.firstName.value}
                  onChange={handleValueChangeAndValidation}
                  maxLength={50}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
                <span className={styles["labels-add-bank"]}>Email</span>
                <TextField
                  disable={true}
                  labelClass="d-none"
                  name="email"
                  value={updateBankUser.email.value}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
                <span className={styles["labels-add-bank"]}>
                  Select Role
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
                <Select
                  classNamePrefix={"selectCateogyCorporateList"}
                  options={roleOptions}
                  value={roleID}
                  isSearchable="true"
                  menuPortalTarget={document.body}
                  onChange={handleSelectRole}
                />
              </Col>
            </Row>
            {roleID?.value === 9 && (
              <>
                <Row className="mt-3">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="flex-column flex-wrap"
                  >
                    <span className={styles["labels-add-bank"]}>
                      Select Branch
                      <span className={styles["aesterick-color"]}>*</span>
                    </span>
                    <Select
                      options={branchOptions}
                      placeholder="Select Branch"
                      value={branchRole.value !== 0 ? branchRole : null}
                      onChange={branchSelectRoleHandler}
                      isSearchable={true}
                      classNamePrefix="selectCateogyCorporateList"
                      menuPortalTarget={document.body}
                    />
                  </Col>

                  <Col
                    lg={5}
                    md={5}
                    sm={12}
                    className="position-relative"
                  ></Col>
                </Row>
              </>
            )}

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
                <span className={styles["labels-add-bank"]}>
                  Contact
                  <span className={styles["aesterick-color"]}>*</span>
                </span>
                <TextField
                  labelClass="d-none"
                  name={"ContactNumber"}
                  value={updateBankUser.ContactNumber.value}
                  onChange={handleValueChangeAndValidation}
                  maxLength={20}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <span className={styles["labels-add-bank"]}>Status</span>
                <span className={styles["aesterick-color"]}>*</span>
              </Col>
            </Row>
            {/* {user === "Security Admin" && (
              <>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <CustomRadio
                      name="customRadio"
                      options={radioOptions}
                      onChange={handleRadioChange}
                      value={updateBankUser.activeUser?.value || ""}
                      size="default"
                      className="custom-radio-group"
                    />
                  </Col>
                </Row>
              </>
            )} */}
            {/* {user === "System Admin" && (
              <> */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                {updateBankUser.activeUser?.value === "Active" ? (
                  <span className={styles["ActiveStatus"]}>Active</span>
                ) : (
                  <span className={styles["InactiveStatus"]}>Inactive</span>
                )}
              </Col>
            </Row>
            {/* </>
            )} */}
          </>
        }
        ModalFooter={
          <Row className="mt-3 mb-3">
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
                onClick={handleUpdateButton}
                disableBtn={
                  updateBankUser.firstName.value !== "" &&
                  updateBankUser.ContactNumber.value !== "" &&
                  updateBankUser.roleID.value !== 9
                    ? false
                    : updateBankUser.roleID.value === 9 &&
                      updateBankUser.branch !== null &&
                      updateBankUser.branch.branchID !== 0
                    ? false
                    : true
                }
              />

              <Button
                icon={<i className="icon-close"></i>}
                text={"Discard"}
                className={styles["CancelButton"]}
                iconClass={styles["IconClass"]}
                onClick={handleDiscardButton}
              />
            </Col>
          </Row>
        }
      />
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
    </>
  );
};

export default EditBankerModal;
