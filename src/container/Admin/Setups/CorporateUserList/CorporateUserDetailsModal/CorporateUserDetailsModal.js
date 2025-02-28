import React, { useState } from "react";
import styles from "./CorporateUserDetails.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Button,
  CustomPaper,
  Modal,
  Table,
  TextField,
} from "../../../../../components/elements";
import DatePicker from "react-multi-date-picker";
import { Col, Row } from "react-bootstrap";
import { UserDetailsCorporateModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import Select from "react-select";
import { formatDate } from "../../../../../helpers/reusableMethods";
const CorporateUserDetailsModal = () => {
  const dispatch = useDispatch();

  //State for Enabling Dropdown
  const [isDropdownEnabled, setIsDropdownEnabled] = useState(false);
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //company drpdown options
  const companyOptions = [
    { value: "Shield", label: "Shield" },
    { value: "Gulahmed", label: "Gulahmed" },
    { value: "Nestle", label: "Nestle" },
  ];

  //state for user data
  const [userData, setUserData] = useState({
    userDetails: {
      email: {
        value: "muhammad.ahmed@gmail.com",
      },
      name: {
        value: "Muhammad Ahmed",
      },
      company: {
        value: "Shield",
      },
      category: {
        value: "Corporate",
      },
      ipAddress: {
        value: "192.168.0.1",
      },
    },
    rights: {
      timer: {
        value: "5 minutes",
      },
      natureOfBusiness: {
        value: "Foods",
      },
    },
  });
  //state for date picker
  const [searchUserRecord, setSearchUserRecord] = useState({
    startDate: {
      value: "",
    },

    endDate: {
      value: "",
    },
  });
  //handle Cross Icon
  const handleCrossIcon = () => {
    dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  //Table columns for customer List
  const TableColumn = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "Email",
      key: "Email",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "120px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Company</label>,
      dataIndex: "Company",
      key: "Company",
      width: "60px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">IP Address</label>,
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "120px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged In Time</label>,
      dataIndex: "loginTime",
      key: "loginTime",
      align: "center",
      width: "100px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged Out Time</label>,
      dataIndex: "logoutTime",
      key: "logoutTime",
      align: "center",
      width: "120px",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Total span</label>,
      dataIndex: "Totalspan",
      key: "Totalspan",
      align: "center",
      width: "170px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Interface</label>,
      dataIndex: "Interface",
      key: "Interface",
      align: "center",
      width: "80px",
      ellipsis: true,
    },
  ];
  //Handle Date Change method
  const handleDateChange = (fieldName, value) => {
    setSearchUserRecord((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));
  };
  // // Example validation: Start Date should be before End Date
  // if (
  //   fieldName === "dateFrom" &&
  //   tradeCount.dateTo.value &&
  //   new Date(value) > new Date(tradeCount.dateTo.value)
  // ) {
  //   setTradeCount((prev) => ({
  //     ...prev,
  //     dateFrom: {
  //       ...prev.dateFrom,
  //       errorMessage: "Start date cannot be after end date.",
  //       errorStatus: true,
  //     },
  //   }));
  // }

  const handleSearchRecord = () => {
    let searchData = {
      startDate: formatDate(searchUserRecord.startDate.value),
      endDate: formatDate(searchUserRecord.endDate.value),
    };
    console.log("Search Date is: ", searchData);
  };
  return (
    <Modal
      show={BOPSystemAdminModal.userDetailsCorporateModal}
      setShow={(value) => dispatch(UserDetailsCorporateModalSystemAdmin(value))}
      className="userDetailsCorporateList"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="xl"
      onHide={() => dispatch(UserDetailsCorporateModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={11} md={11} sm={12} className="d-flex gap-1">
              <span className={styles["NameLabel"]}>Muhammad Ahmed</span>
              <span className={styles["ActiveLabel"]}>Active</span>
            </Col>
            <Col lg={1} md={1} sm={1}>
              <Button
                className={styles["CrossButton"]}
                icon={<i className="icon-close"></i>}
                iconClass={styles["crossIconClass"]}
                onClick={handleCrossIcon}
              />
            </Col>
          </Row>
          <Row>
            <Col lg={8} md={8} sm={12}>
              <Row className="mt-3">
                <Col lg={11} md={11} sm={12}>
                  <span className={styles["UserDetails_label"]}>
                    User Detail
                  </span>
                </Col>
                <Col lg={1} md={1} sm={12}>
                  <Button
                    icon={<i className="icon-edit"></i>}
                    className={styles["EditIconClass"]}
                    iconClass={styles["EditIconClassCross"]}
                    onClick={() => setIsDropdownEnabled(true)}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <TextField
                    labelClass={"d-none"}
                    value={userData.userDetails.email.value}
                    disable={true}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={12}>
                  <TextField
                    labelClass={"d-none"}
                    placeholder={"muhammad.ahmed"}
                    value={userData.userDetails.name.value}
                    disable={true}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <Select
                    className="basic-single"
                    classNamePrefix="select"
                    options={companyOptions}
                    defaultValue={companyOptions[0]}
                    isDisabled={isDropdownEnabled ? false : true}
                    isSearchable={true}
                    placeholder={"Select Category"}
                  />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={12}>
                  <TextField
                    labelClass={"d-none"}
                    placeholder={"Category 1"}
                    value={userData.userDetails.category.value}
                    disable={true}
                  />
                </Col>
                <Col lg={6} md={6} sm={12}>
                  <TextField
                    labelClass={"d-none"}
                    placeholder={"123"}
                    value={userData.userDetails.ipAddress.value}
                    disable={true}
                  />
                </Col>
              </Row>
            </Col>{" "}
            <Col
              lg={4}
              md={4}
              sm={12}
              className="d-flex align-items-center mt-3"
            >
              <span className={styles["OuterBoxUserDetailsRights"]}>
                <Row>
                  <Col lg={12} md={12} sm={12}>
                    <span className={styles["RightsLabel"]}>Rights</span>
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="flex-column flex-wrap"
                  >
                    <span className={styles["RightsLabels"]}>Timer</span>
                    <TextField
                      labelClass={"d-none"}
                      placeholder={"5 minutes"}
                      disable={true}
                      value={userData.rights.timer.value}
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col
                    lg={12}
                    md={12}
                    sm={12}
                    className="flex-column flex-wrap mb-2"
                  >
                    <span className={styles["RightsLabels"]}>
                      Nature of busniess
                    </span>
                    <TextField
                      labelClass={"d-none"}
                      placeholder={"Foods"}
                      disable={true}
                      value={userData.rights.natureOfBusiness.value}
                    />
                  </Col>
                </Row>
              </span>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col lg={12} md={12} sm={12}>
              <CustomPaper className={styles["CustomPaperUserDetailsStyles"]}>
                <Row>
                  <Col
                    lg={5}
                    md={5}
                    sm={12}
                    className="d-flex align-items-center  pe-4"
                  >
                    <DatePicker
                      name="startDate"
                      placeholder="Start date"
                      showOtherDays={true}
                      inputClass={styles["Tradecount-Datepicker-left"]}
                      value={searchUserRecord.startDate.value}
                      onChange={(date) => handleDateChange("startDate", date)}
                      minDate={null} // No restriction initially
                      maxDate={searchUserRecord.endDate.value || null}
                    />
                    <label className={styles["Tradecount-date-to"]}>to</label>

                    <DatePicker
                      placeholder="End Date"
                      showOtherDays={true}
                      inputClass={styles["Tradecount-Datepicker-right"]}
                      value={searchUserRecord.endDate.value}
                      onChange={(date) => {
                        handleDateChange("endDate", date);
                      }}
                      minDate={searchUserRecord.startDate.value || null} // Disable dates before selected startDate
                      maxDate={null} // No restriction initially
                    />
                  </Col>
                  <Col
                    lg={4}
                    md={4}
                    sm={12}
                    className="d-flex gap-1 align-items-center  ps-0"
                  >
                    <Button
                      icon={<i className="icon-search icon-check-space"></i>}
                      className={styles["Search-btn-BankList"]}
                      text="Search"
                      onClick={handleSearchRecord}
                    />
                    <Button
                      icon={<i className="icon-download-excel"></i>}
                      className={styles["Download-btn-Corporate"]}
                      text="Download Excel"
                    />
                  </Col>
                </Row>
                <Row className="mt-3">
                  <Col lg={12} md={12} sm={12}>
                    <Table
                      column={TableColumn}
                      pagination={false}
                      className={"BankUserList-table"}
                    />
                  </Col>
                </Row>
              </CustomPaper>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-3"
            >
              <Button
                text={"Update"}
                className={styles["UpdateButton"]}
                icon={<i className="icon-refresh"></i>}
              />
              <Button
                text={"Discard"}
                icon={<i className="icon-close"></i>}
                className={styles["DiscardButton"]}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={<></>}
    />
  );
};

export default CorporateUserDetailsModal;
