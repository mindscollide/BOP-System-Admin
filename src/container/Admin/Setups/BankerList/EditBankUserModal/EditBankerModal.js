import React, { useEffect, useState } from "react";
import styles from "./EditBankerModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  CustomRadio,
  Modal,
  TextField,
} from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { editBankUserModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import Select from "react-select";
import { roleOptions } from "../../../../../helpers/Dropdown";
import { updateBankUserSchema } from "../../../../../utils/schemas";
// import { validateBopEmail } from "../../../../../utils/regexUtil";
// import { useNavigate } from "react-router-dom";
// import { UpdateCorporateUsersAPI } from "../../../../../store/actions/BOPSystemAdminActions";

const EditBankerModal = () => {
  const dispatch = useDispatch();
  // const navigate = useNavigate();
  const { BOPSystemAdminModal } = useSelector((state) => state);
  // const { auth } = useSelector((state) => state);
  // console.log("this is the user", auth);
  //States
  // const [value, setValue] = useState("Corporate");

  //state for error Message
  // const [errorShow, setErrorShow] = useState(false);

  //Dummy User for handlin UI change bansed on the user Secuity admiin or system admin
  let user = "System Admin";
  //Checking snakbar state
  const [open, setOpen] = useState(false);

  //State for add company
  const [updateBankUser, setUpdateBankUser] = useState({
    ...updateBankUserSchema,
  });

  // //State for add company
  // const [updateCorporate, setUpdateCorporate] = useState({
  //   ...updateCorporateUserSchema,
  // });

  //Options for radio
  const radioOptions = [
    { label: "Active", value: "Active" },
    { label: "Inactive", value: "Inactive" },
  ];

  //State For Role
  const [role, setRole] = useState(null);

  //Set Activate Button
  const [isActive, setIsActive] = useState(false);

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

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
    console.log("value", value);
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

  //handle Active Button
  // show error message When user hit activate btn
  const handleUpdateButton = () => {
    if (
      updateBankUser.firstName.value !== "" &&
      updateBankUser.role.value !== "" &&
      updateBankUser.ContactNumber.value !== "" &&
      updateBankUser.activeUser.value !== ""
    ) {
      // setErrorShow(false);
      let newData = {
        User: {
          FirstName: updateBankUser.firstName.value,
          ContactNumber: updateBankUser.ContactNumber.value,
          Role: updateBankUser.role.value,
          ActiveUser: updateBankUser.activeUser.value,
        },
      };
      console.log("newData", newData);
      // dispatch(UpdateCorporateUsersAPI(navigate, newData));
      setOpen({
        open: true,
        message: "Hello Update Corporate User dispatched",
      });
    } else {
      // setTimeout();

      setOpen({
        open: true,
        message: "Fill All Required Fields",
      });
      // setErrorShow(true);
    }
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(editBankUserModalSystemAdmin(false));
  };

  useEffect(() => {
    if (
      updateBankUser.firstName.value !== "" &&
      updateBankUser.role.value !== "" &&
      updateBankUser.ContactNumber.value !== "" &&
      updateBankUser.activeUser.value !== ""
    ) {
      setIsActive(true);
    } else {
      setIsActive(false);
    }
  }, [updateBankUser, updateBankUser.role]);
  return (
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
                // onChange={handleValueChangeAndValidation}
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
                className="role"
                classNamePrefix={"ModalAbsoluteDropdown"}
                options={roleOptions}
                value={role}
                isSearchable="true"
                menuPortalTarget={document.body}
                onChange={(e) =>
                  handleDropdownChange("role", e, setRole, updateBankUser.role)
                }
              />
            </Col>
          </Row>
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

          {user === "Security Admin" && (
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
          )}

          {user === "System Admin" && (
            <>
              <Row>
                <Col lg={12} md={12} sm={12}>
                  {updateBankUser.activeUser?.value === "Active" ? (
                    <span className={styles["ActiveStatus"]}>Active</span>
                  ) : (
                    <span className={styles["InactiveStatus"]}>Inactive</span>
                  )}
                </Col>
              </Row>
            </>
          )}
        </>
      }
      ModalFooter={
        <Row className="mt-5">
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
              onClick={handleUpdateButton}
              disableBtn={isActive ? false : true}
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

export default EditBankerModal;
