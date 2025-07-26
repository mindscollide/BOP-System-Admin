import React, { useEffect, useState } from "react";
import styles from "./EditCorporateModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  Checkbox,
  Modal,
  TextField,
} from "../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { EditCorporateModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { updateCorporateUserSchema } from "../../../../../../utils/schemas";
import { useNavigate } from "react-router-dom";
import { UpdateCorporateUsersAPI } from "../../../../../../store/actions/CorporateUsersAction";
import {
  setCorporateUpdated,
  setCorporateUserRoleStatusChange,
} from "../../../../../../store/actions/RealtimeActions";
const EditCorporateModal = ({ corporateUserId, setCorproateUserId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const corporateUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUpdated
  );
  const corporateUserRoleStatusChange = useSelector(
    (state) => state.RealtimeActionReducer.corporateUserRoleStatusChange
  );

  const { BOPSystemAdminModal } = useSelector((state) => state);
  const GetCorporateUserByUserID = useSelector(
    (state) => state.CorporateUsersReducer.GetCorporateUserByUserID
  );

  //State for edit company
  const [updateCorporate, setUpdateCorporate] = useState({
    ...updateCorporateUserSchema,
  });

  useEffect(() => {
    if (GetCorporateUserByUserID !== null) {
      try {
        const {
          firstName,
          email,
          corporateName,
          statusId,
          rfqTimers,
          categoryID,
          isChatEnabled,
          isFEEnabled,
          isNonFEEnabled,
        } = GetCorporateUserByUserID.user;

        setUpdateCorporate({
          ...updateCorporate,
          corporateName: {
            value: corporateName,
            categoryID: categoryID,
          },
          firstName: {
            value: firstName,
          },
          RFQTimerCorporate: {
            value: rfqTimers.corporateRFQTimer,
          },
          RFQTimerTreasury: {
            value: rfqTimers.treasuryRFQTimer,
          },
          email: {
            value: email,
          },
          activeUser: {
            value: statusId,
          },
          isChatActive: {
            ...updateCorporate.isChatActive,
            value: isChatEnabled,
          },
          isFEActive: {
            ...updateCorporate.isFEActive,
            value: isFEEnabled,
          },
          isNonFEActive: {
            ...updateCorporate.isNonFEActive,
            value: isNonFEEnabled,
          },
        });
      } catch (error) {}
    }
  }, [GetCorporateUserByUserID]);

  useEffect(() => {
    if (corporateUpdated !== null) {
      try {
        setUpdateCorporate({
          ...updateCorporate,
          corporateName: {
            value: corporateUpdated.corporate.corporateName,
            categoryID: corporateUpdated.corporate.corporateCategory.categoryID,
          },
          RFQTimerCorporate: {
            value: Number(
              corporateUpdated.corporate.rfqTimers.corporateRFQTimer
            ),
          },
          RFQTimerTreasury: {
            value: Number(
              corporateUpdated.corporate.rfqTimers.treasuryRFQTimer
            ),
          },
          // isChatActive: {
          //   ...updateCorporate.isChatActive,
          //   value: isChatEnabled,
          // },
          // isFEActive: {
          //   ...updateCorporate.isFEActive,
          //   value: isFEEnabled,
          // },
          // isNonFEActive: {
          //   ...updateCorporate.isNonFEActive,
          //   value: isNonFEEnabled,
          // },
        });
        dispatch(setCorporateUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateUpdated]);

  useEffect(() => {
    if (corporateUserRoleStatusChange !== null) {
      try {
        setUpdateCorporate({
          ...updateCorporate,
          activeUser: {
            value: corporateUserRoleStatusChange.updatedUser.statusId,
          },
        });
        dispatch(setCorporateUserRoleStatusChange(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateUserRoleStatusChange]);

  //Handle Value Change and Validation
  const handleValueChangeAndValidation = (e) => {
    const { name, value } = e.target;

    //Validation rules
    const validateInput = {
      firstName: (val) => val.replace(/[^a-zA-Z ]/g, "").trimStart(),
    };

    const isFieldEmpty = (val) => val === "";

    // Update field function
    const updateField = (fieldName, fieldValue) => {
      const validValue = validateInput[fieldName]
        ? validateInput[fieldName](fieldValue)
        : fieldValue;

      const hasError = isFieldEmpty(validValue);

      setUpdateCorporate((prevState) => ({
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

  // show error message When user hit activate btn
  const handleUpdateButton = () => {
    try {
      if (
        updateCorporate.firstName.value !== "" &&
        updateCorporate.email.value !== "" &&
        updateCorporate.corporateName.value !== "" &&
        updateCorporate.RFQTimerTreasury.value !== 0 &&
        updateCorporate.RFQTimerCorporate.value !== 0 &&
        updateCorporate.activeUser.value !== 0
      ) {
        // let newData = {
        //   FirstName: updateCorporate.firstName.value,
        //   UserStatusId: updateCorporate.activeUser.value,
        //   CorporateID: updateCorporate.corporateName.categoryID,
        //   UserId: corporateUserId,
        // };

        let newData = {
          FirstName: updateCorporate.firstName.value,
          IsChat: updateCorporate.isChatActive.value,
          IsFEEnabled: updateCorporate.isFEActive.value,
          IsNonFEEnabled: updateCorporate.isNonFEActive.value,
          UserId: corporateUserId,
          CorporateID: updateCorporate.corporateName.categoryID,
          // UserRegisterationRequestID: 4567,
        };
        dispatch(
          UpdateCorporateUsersAPI(navigate, newData, setCorproateUserId)
        );
      }
    } catch (err) {}
  };

  //handle Discard Button
  const handleDiscardButton = () => {
    dispatch(EditCorporateModalSystemAdmin(false));
  };
  const changeFETick = (event) => {
    console.log(event, "event");
    setUpdateCorporate((prevState) => ({
      ...prevState,
      isFEActive: {
        value: event.target.checked,
      },
    }));
  };

  const changeNonFETick = (event) => {
    setUpdateCorporate((prevState) => ({
      ...prevState,
      isNonFEActive: {
        value: event.target.checked,
      },
    }));
  };

  const changeActiveTick = (event) => {
    setUpdateCorporate((prevState) => ({
      ...prevState,
      isChatActive: {
        value: event.target.checked,
      },
    }));
  };

  return (
    <Modal
      show={BOPSystemAdminModal.editCorporateModal}
      setShow={(value) => dispatch(EditCorporateModalSystemAdmin(value))}
      className="UniversalBOPModalStyles"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="md"
      onHide={() => dispatch(EditCorporateModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col
              lg={6}
              md={6}
              sm={6}
              className={styles["EditCorporate_modal-title"]}
            >
              Edit Corporate User
            </Col>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={styles["EditCorporate_modal-crossIcon"]}
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
                value={updateCorporate.firstName.value}
                onChange={handleValueChangeAndValidation}
                maxLength={50}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Email
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField
                className={styles["disableText"]}
                labelClass="d-none"
                name="email"
                value={updateCorporate.email.value}
                onChange={handleValueChangeAndValidation}
                disable
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                Corporate Name
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <TextField
                className={styles["disableText"]}
                labelClass="d-none"
                name={"corporateName"}
                value={updateCorporate.corporateName.value}
                onChange={handleValueChangeAndValidation}
                disable={true}
              />
            </Col>
          </Row>
          {/* <Row className="mt-3 ">
            <Col lg={12} md={12} sm={12}>
              <div className="d-flex justify-content-start gap-4">
                <Checkbox
                  label2="FE"
                  classNameDiv={`${"d-flex align-items-center gap-2 m-0"}`}
                  onChange={changeFETick}
                  checked={updateCorporate.isFEActive.value ? true : false}
                />
                <span className={styles["labels-add-bank"]}>FE</span>
                <Checkbox
                  // label2="Non-FE"
                  classNameDiv={`${"d-flex align-items-center gap-2 m-0"}`}
                  onChange={changeNonFETick}
                  checked={updateCorporate.isNonFEActive.value ? true : false}
                />
                <span className={styles["labels-add-bank"]}>Non-FE</span>
              </div>
            </Col>
          </Row> */}
          <Row className="mt-3 ">
            <Col lg={12} md={12} sm={12}>
              <div className="d-flex justify-content-start gap-4">
                <Checkbox
                  label2="Chat"
                  classNameDiv={styles["CheckboxActive"]}
                  onChange={changeActiveTick}
                  checked={updateCorporate.isChatActive.value ? true : false}
                  className={styles["InputFieldClass"]}
                  labelClass2={styles["switchLabel"]}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <div className="d-flex justify-content-start align-items-start w-100">
                {/* <span className={styles["labels-add-bank"]}>FE / Non-FE</span> */}
                <Checkbox
                  label2="FE"
                  classNameDiv={styles["CheckboxActive"]}
                  onChange={changeFETick}
                  checked={updateCorporate.isFEActive.value ? true : false}
                  labelClass2={styles["switchLabel"]}
                />
                <Checkbox
                  label2="Non-FE"
                  classNameDiv={styles["CheckboxActive"]}
                  onChange={changeNonFETick}
                  checked={updateCorporate.isNonFEActive.value ? true : false}
                  labelClass2={styles["switchLabel"]}
                />
              </div>
            </Col>
          </Row>

          <Row className="mt-3">
            <Col lg={12} md={12} sm={12} className="flex-column flex-wrap">
              <span className={styles["labels-add-bank"]}>
                RFQ Timer
                <span className={styles["aesterick-color"]}>*</span>
              </span>
              <Row>
                <Col lg={6} md={6} sm={12} className="flex-column flex-wrap">
                  <span className={styles["labels-add-bank"]}>
                    Treasury
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>

                  <TextField
                    className={styles["disableText"]}
                    labelClass="d-none"
                    value={`${updateCorporate.RFQTimerTreasury.value} Minutes`}
                    disable={true}
                  />
                </Col>

                <Col lg={6} md={6} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Corporate
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>

                  <TextField
                    className={styles["disableText"]}
                    labelClass="d-none"
                    value={`${updateCorporate.RFQTimerCorporate.value} Minutes`}
                    disable={true}
                  />
                </Col>
              </Row>
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
              {Number(updateCorporate.activeUser?.value) === 1 ? (
                <span className={styles["ActiveStatus"]}>Active</span>
              ) : Number(updateCorporate.activeUser?.value) === 2 ? (
                <span className={styles["InactiveStatus"]}>Inactive</span>
              ) : Number(updateCorporate.activeUser?.value) === 3 ? (
                <span className={styles["InactiveStatus"]}>Inactive</span>
              ) : Number(updateCorporate.activeUser?.value) === 4 ? (
                <span className={styles["InactiveStatus"]}>Inactive</span>
              ) : (
                <span className={styles["InactiveStatus"]}>Inactive</span>
              )}
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
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
                className={styles["EditCorpUserBtn"]}
                iconClass={styles["IconClass"]}
                onClick={handleUpdateButton}
                disableBtn={
                  updateCorporate.firstName.value !== "" &&
                  updateCorporate.RFQTimerTreasury.value !== 0 &&
                  updateCorporate.RFQTimerCorporate.value !== 0
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
        </>
      }
    />
  );
};

export default EditCorporateModal;
