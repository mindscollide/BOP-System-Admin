import React, { useEffect, useState } from "react";
import CustomModal from "../../../../../../components/elements/modal/Modal";
import styles from "./addHolidays.module.css";
import { Col, Row } from "react-bootstrap";
import TextField from "../../../../../../components/elements/Inputfield/InputField";
import Select, { components } from "react-select";
import DatePicker from "react-multi-date-picker";
import moment from "moment";
import { useDispatch } from "react-redux";
import {
  getListAllInstrumentsApi,
  AddHolidays_API,
  getHolidayByHolidayId_failed,
  updateHolidayByHolidayId_API,
  deleteHolidayByHolidayId_API,
} from "../../../../../../store/actions/Auth-Actions";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CustomButton from "../../../../../../components/elements/button/Button";

const CustomMenuList = (props) => {
  const { options, selectProps } = props;

  return (
    <>
      <div className={styles.SelectAllWrapper}>
        <Row>
          <Col sm={6}>
            <CustomButton
              text='Select All'
              className={styles.SelectAllBtn}
              onClick={() => {
                selectProps.onChange(options);
              }}
            />
          </Col>

          <Col sm={6}>
            <CustomButton
              text='Unselect All'
              className={styles.UnSelectAllBtn}
              onClick={() => {
                selectProps.onChange([]);
              }}
            />
          </Col>
        </Row>
      </div>

      <components.MenuList {...props} />
    </>
  );
};

const AddHolidays = ({
  addEditDeleteHolidayModal,
  setAddEditDeleteHolidayModal,
  addEditViewState,
  setAddEditViewState,
}) => {
  console.log(addEditViewState, "addEditViewStateaddEditViewState");
  const getHolidayByHolidayId = useSelector(
    (state) => state.auth.getHolidayByHolidayId
  );
  const [addHoliday, setAddHoliday] = useState({
    holidayId: 0,
    holidayDate: "",
    description: "",
    currency: [],
  });
  const [listOfInstruemtns, setListOfInstruments] = useState([]);
  const listOfAllInstruments = useSelector(
    (state) => state.auth.getListAllInstruments
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getListAllInstrumentsApi(navigate));
  }, []);

  const handleClickSelect = (isSelect) => {
    console.log(isSelect, "isSelectisSelectisSelect");
  };

  useEffect(() => {
    if (listOfAllInstruments) {
      try {
        const { instruments } = listOfAllInstruments;
        if (instruments.length > 0) {
          let SelectAllLabel = {
            value: 0,
            label: (
              <>
                <Row>
                  <Col sm={6} md={6} lg={6}>
                    <CustomButton
                      onClick={() => handleClickSelect(true)}
                      className={styles["SelectAllBtn"]}
                      text={"Select All"}
                    />
                  </Col>
                  <Col sm={6} md={6} lg={6}>
                    <CustomButton
                      onClick={() => handleClickSelect(false)}
                      className={styles["UnSelectAllBtn"]}
                      text={"UnSelect All"}
                    />
                  </Col>
                </Row>
              </>
            ),
          };
          let updateData = instruments.map((data, index) => {
            return {
              ...data,
              value: data.currencyId,
              label: data.displayCode,
            };
          });
          setListOfInstruments(updateData);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [listOfAllInstruments]);

  useEffect(() => {
    if (!getHolidayByHolidayId && !listOfAllInstruments) return;
    try {
      const { holidayDate, description, currencyIds, pK_HolidayId } =
        getHolidayByHolidayId.holiday;
      const { instruments } = listOfAllInstruments;
      if (instruments && instruments.length > 0) {
        let updateData = instruments
          .filter((data) => currencyIds.includes(Number(data.currencyId)))
          .map((data) => ({
            ...data,
            value: data.currencyId,
            label: data.displayCode,
          }));

        setAddHoliday({
          holidayDate: moment(holidayDate).toDate(),
          description,
          currency: updateData,
          holidayId: pK_HolidayId,
        });
        dispatch(getHolidayByHolidayId_failed(""));
      }
    } catch (error) {
      console.log(error);
    }
  }, [getHolidayByHolidayId, listOfAllInstruments]);

  const handleChange = (event, no) => {
    switch (no) {
      case 1:
        setAddHoliday((prevState) => ({
          ...prevState,
          holidayDate: new Date(event),
        }));
        break;
      case 2:
        const { value } = event.target;
        setAddHoliday((prevState) => ({
          ...prevState,
          description: value,
        }));
        break;
      case 3:
        if (event.value !== 0) {
          setAddHoliday((prevState) => ({
            ...prevState,
            currency: event,
          }));
        }

        break;
      default:
        break;
    }
  };

  /**
   * Handles the creation of a new holiday
   * Validates all required fields and calls the API
   */
  const handleCreateHoliday = () => {
    // Validation: Check if all fields are filled

    if (addEditViewState === 3) {
      const requestData = {
        holidayID: addHoliday.holidayId,
      };
      dispatch(
        deleteHolidayByHolidayId_API(
          navigate,
          requestData,
          setAddEditDeleteHolidayModal,
          setAddEditViewState
        )
      );
      return;
    }
    if (!addHoliday.holidayDate) {
      alert("Please select a holiday date");
      return;
    }

    if (!addHoliday.description || addHoliday.description.trim() === "") {
      alert("Please enter a description");
      return;
    }

    if (!addHoliday.currency || addHoliday.currency.length === 0) {
      alert("Please select at least one currency");
      return;
    }

    // Format the data according to API pattern
    const currencyIds = addHoliday.currency.map((currency) => currency.value);
    if (addEditViewState === 2) {
      const requestData = {
        HolidayDate: moment(addHoliday.holidayDate).format("YYYY-MM-DD"),
        Description: addHoliday.description.trim(),
        CurrencyIds: currencyIds,
        HolidayID: addHoliday.holidayId,
      };
      dispatch(
        updateHolidayByHolidayId_API(
          navigate,
          requestData,
          setAddEditDeleteHolidayModal,
          setAddEditViewState
        )
      );
      return;
    } else {
      const requestData = {
        HolidayDate: moment(addHoliday.holidayDate).format("YYYY-MM-DD"),
        Description: addHoliday.description.trim(),
        CurrencyIds: currencyIds,
      };
      dispatch(
        AddHolidays_API(
          navigate,
          requestData,
          setAddEditDeleteHolidayModal,
          setAddEditViewState
        )
      );
    }
  };
  return (
    <CustomModal
      ModalTitle={
        <span className={styles.AddHolidaysHeading}>
          {" "}
          {addEditViewState === 1
            ? "Add Holiday"
            : addEditViewState === 2
            ? "Update Holiday"
            : "Delete Holiday"}
        </span>
      }
      modalHeaderClassName={"border-0"}
      modalFooterClassName={"border-0 d-block"}
      modalBodyClassName={"border-0"}
      size={"md"}
      show={addEditDeleteHolidayModal}
      onHide={() => {
        setAddEditDeleteHolidayModal(false);
        setAddEditViewState(0);
      }}
      ModalBody={
        <>
          <Row className='mb-2'>
            <Col
              sm={12}
              md={3}
              lg={3}
              xl={3}
              className='d-flex align-items-center'>
              Holiday Date
            </Col>
            <Col sm={12} md={9} lg={9} xl={9}>
              <div className={styles.DatePickerWrapper}>
                <DatePicker
                  value={addHoliday.holidayDate}
                  placeholder='Start date'
                  showOtherDays='true'
                  format='DD/MM/YYYY'
                  portalTarget={document.body}
                  disabled={addEditViewState === 3}
                  inputClass={styles.DatePicker}
                  onChange={(date) => handleChange(date, 1)}
                  minDate={moment().add(1, "days").toDate()}
                  editable={false}
                  render={(value, openCalendar) => {
                    return (
                      <div className={styles.DatePickerContainer}>
                        <input
                          value={value}
                          onClick={openCalendar}
                          placeholder='Start date'
                          className={
                            addEditViewState === 3
                              ? styles.DatePicker_disabled
                              : styles.DatePicker
                          }
                          readOnly
                        />
                        <i
                          className={`icon-calendar ${styles.CalendarIcon}`}
                          onClick={openCalendar}></i>
                      </div>
                    );
                  }}
                />
              </div>
            </Col>
          </Row>
          <Row className='mb-2'>
            <Col
              sm={12}
              md={3}
              lg={3}
              xl={3}
              className='d-flex align-items-center'>
              Description*
            </Col>
            <Col sm={12} md={9} lg={9} xl={9}>
              <TextField
                labelClass={"d-none"}
                value={addHoliday.description}
                disable={addEditViewState === 3}
                onChange={(event) => handleChange(event, 2)}
                placeholder={"Description"}
              />
            </Col>
          </Row>
          <Row>
            <Col
              sm={12}
              md={3}
              lg={3}
              xl={3}
              className='d-flex align-items-center'>
              Select Currency*
            </Col>
            <Col sm={12} md={9} lg={9} xl={9}>
              <Select
                isMulti={true}
                value={addHoliday.currency}
                isDisabled={addEditViewState === 3}
                options={listOfInstruemtns}
                placeholder={"Select Currency"}
                classNamePrefix='SelectCurrencyDropdown'
                onChange={(option) => handleChange(option, 3)}
                components={{ MenuList: CustomMenuList }}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row>
            <Col sm={12} md={6} lg={6} className='d-flex justify-content-end'>
              <CustomButton
                text={
                  addEditViewState === 1
                    ? "Create"
                    : addEditViewState === 2
                    ? "Update"
                    : "Delete"
                }
                className={styles.AddHoliday_btn}
                i_conClass={
                  addEditViewState === 1
                    ? "icon-add"
                    : addEditViewState === 2
                    ? "icon-refresh"
                    : "icon-trash"
                }
                onClick={handleCreateHoliday}
              />
            </Col>
            <Col sm={12} md={6} lg={6} className='d-flex justify-content-start'>
              <CustomButton
                className={styles.AddHoliday_btn}
                text={"Back to list"}
                i_conClass={"icon-back"}
                onClick={() => setAddEditDeleteHolidayModal(false)}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default AddHolidays;
