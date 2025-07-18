import React, { useEffect, useState } from "react";
import styles from "./EditBankerModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  Modal,
  Notification,
  TextField,
} from "../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { editBankUserModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import Select from "react-select";
import { updateBankUserSchema } from "../../../../../../utils/schemas";
import { useNavigate } from "react-router-dom";
import { UpdateBankUserByUserIdAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import {
  GetAllBranchesAPI,
  GetBankUserRolesAPI,
} from "../../../../../../store/actions/Auth-Actions";
import {
  setBankUserRoleStatusChange,
  setBranchCreated,
  setBranchUpdated,
} from "../../../../../../store/actions/RealtimeActions";

const EditBankerModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  const branchCreated = useSelector(
    (state) => state.RealtimeActionReducer.branchCreated
  );
  const bankUserRoleStatusChange = useSelector(
    (state) => state.RealtimeActionReducer.bankUserRoleStatusChange
  );
  const branchUpdated = useSelector(
    (state) => state.RealtimeActionReducer.branchUpdated
  );
  const bankUserUpdated = useSelector(
    (state) => state.RealtimeActionReducer.bankUserUpdated
  );

  // GetBankUserbyUserID
  const GetBankUserbyUserID = useSelector(
    (state) => state.BOPSystemAdminReducer.GetBankUserbyUserIDData
  );

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);

  //getAllBranch
  const getAllBranches = useSelector((state) => state.auth.GetAllBranchesData);

  const [branchOptions, setBranchOptions] = useState([]);
  const [branchRole, setBranchRole] = useState({
    value: 0,
    label: "",
    branchCode: "",
    branchContact: "",
    branchName: "",
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
  console.log(updateBankUser, "updateBankUserupdateBankUser");
  //Handle Value Change and Validation
  const handleValueChangeAndValidation = (e) => {
    const { name, value } = e.target;

    //Validation rules
    const validateInput = {
      firstName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
      ContactNumber: (val) => val.replace(/[^\d]/g, ""),
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

  //handle select CategoryID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);

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
    setBranchRole(selectedBranch);
  };
  //handle Active Button
  // show error message When user hit activate btn
  const handleUpdateButton = () => {
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
      dispatch(UpdateBankUserByUserIdAPI(navigate, newData));
    } else {
      console.log("Error Encoutered");
    }
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(editBankUserModalSystemAdmin(false));
  };

  useEffect(() => {
    dispatch(GetBankUserRolesAPI(navigate));
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
        if (roleOptions.length > 0) {
          let fingRoleName = roleOptions.find(
            (roleIDData, index) => roleIDData.value === bankUser.userRoleID
          );
          if (fingRoleName !== undefined) {
            setRoleID(fingRoleName);
          }
        }
      } catch (error) {
        console.log("error: ", error);
      }
  }, [GetBankUserbyUserID, roleOptions]);

  useEffect(() => {
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
  }, [RoleList]);

  useEffect(() => {
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
  }, [getAllBranches]);

  useEffect(() => {
    if (branchCreated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchCreated.branch.branchID
        );
        if (findBranchObj === undefined) {
          let newBranchData = {
            ...branchCreated.branch,
            value: branchCreated.branch.branchID,
            label: branchCreated.branch.branchName,
          };
          setBranchOptions([...branchOptions, newBranchData]);
          dispatch(setBranchCreated(null));
        }
      }
    }
  }, [branchCreated]);

  useEffect(() => {
    if (branchUpdated !== null) {
      if (Array.isArray(branchOptions)) {
        let findBranchObj = branchOptions.find(
          (branchData, index) =>
            branchData.branchID === branchUpdated.branch.branchID
        );
        if (findBranchObj !== undefined) {
          setBranchOptions((prevBranchData) => {
            return prevBranchData.map((data4, index) => {
              if (data4.branchID === branchUpdated.branch.branchID) {
                return {
                  ...data4,
                  value: branchUpdated.branch.branchID,
                  label: branchUpdated.branch.branchName,
                  branchCode: branchUpdated.branch.branchCode,
                  branchContact: branchUpdated.branch.branchContact,
                  branchName: branchUpdated.branch.branchName,
                };
              }
              return data4;
            });
          });

          if (
            branchRole &&
            branchRole?.value === branchUpdated.branch.branchID
          ) {
            setBranchRole({
              value: branchUpdated.branch.branchID,
              label: branchUpdated.branch.branchName,
              branchCode: branchUpdated.branch.branchCode,
              branchContact: branchUpdated.branch.branchContact,
              branchName: branchUpdated.branch.branchName,
            });
          }
          dispatch(setBranchUpdated(null));
        }
      }
    }
  }, [branchUpdated]);

  useEffect(() => {
    if (bankUserUpdated !== null) {
      console.log(bankUserUpdated);

      try {
        setUpdateBankUser({
          ...updateBankUser,
          firstName: {
            value: bankUserUpdated.user.firstName,
          },
          ContactNumber: {
            value: bankUserUpdated.user.contactNumber,
          },
        });
        if (roleOptions.length > 0) {
          let fingRoleName = roleOptions.find(
            (roleIDData, index) =>
              roleIDData.value === bankUserUpdated.user.userRoleID
          );
          if (fingRoleName !== undefined) {
            setRoleID(fingRoleName);
          }
        }
        if (branchOptions.length > 0) {
          if (bankUserUpdated.user.branch?.branchID !== undefined) {
            let findBranchName = branchOptions.find(
              (branchID, index) =>
                branchID.value === bankUserUpdated.user?.branch?.branchID
            );
            if (findBranchName !== undefined) {
              setBranchRole(findBranchName);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [bankUserUpdated]);

  useEffect(() => {
    if (bankUserRoleStatusChange !== null) {
      try {
        setUpdateBankUser({
          ...updateBankUser,
          activeUser: {
            value:
              bankUserRoleStatusChange.updatedUser.userStatusID === 1
                ? "Active"
                : "Inactive",
          },

          roleID: {
            value: bankUserRoleStatusChange.updatedUser.userRoleID,
          },
          branch: bankUserRoleStatusChange.updatedUser.branch,
        });
        if (roleOptions.length > 0) {
          let fingRoleName = roleOptions.find(
            (roleIDData, index) =>
              roleIDData.value ===
              bankUserRoleStatusChange.updatedUser.userRoleID
          );
          if (fingRoleName !== undefined) {
            setRoleID(fingRoleName);
          }
        }
        if (bankUserRoleStatusChange.updatedUser.userRoleID === 9) {
          setBranchRole({
            value: bankUserRoleStatusChange.updatedUser.branch.branchID,
            label: bankUserRoleStatusChange.updatedUser.branch.branchName,
          });
        }
        dispatch(setBankUserRoleStatusChange(null));
      } catch (error) {
        console.log("Error:", error);
      }
    }
  }, [bankUserRoleStatusChange]);
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
              <Col
                lg={6}
                md={6}
                sm={6}
                className={styles["EditBank_modal-title"]}
              >
                Edit Banker
              </Col>
              <Col
                sm={6}
                md={6}
                lg={6}
                className={styles["EditBank_modal-crossIcon"]}
              >
                <i
                  className="icon-close cursor-pointer"
                  onClick={handleDiscardButton}
                />
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
                  className={styles["disableText"]}
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
                  className={styles["disableText"]}
                  classNamePrefix={"selectCateogyCorporateList"}
                  options={roleOptions}
                  value={roleID}
                  isSearchable="true"
                  menuPortalTarget={document.body}
                  onChange={handleSelectRole}
                  isDisabled
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
                  roleID.value !== 9
                    ? false
                    : updateBankUser.firstName.value !== "" &&
                      updateBankUser.ContactNumber.value !== "" &&
                      roleID.value === 9 &&
                      branchRole.value !== 0
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
