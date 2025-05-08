import React, { useCallback, useEffect, useState } from "react";
import styles from "./LoginHistory.module.css";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../components/elements";
import ExportShowComponent from "../BankerList/ExportShowComponent";
import { loginHistorySchema } from "../../../../utils/schemas";
import {
  formatDate,
  formatDateAndTimeFromString,
  formatTimeSpan,
} from "../../../../helpers/reusableMethods";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { ConfirmationModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleListAPI } from "../../../../store/actions/Auth-Actions";
import { SearchAllUserLoginHistoryAPI } from "../../../../store/actions/BOPSystemAdminActions";
import moment from "moment";
import { useTableScrollBottom } from "../../../../helpers/useTableScrollBottom";
const LoginHistory = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Login History States
  const [loginHistory, setLoginHistory] = useState({
    ...loginHistorySchema,
  });
  //Global State
  const { BOPSystemAdminReducer } = useSelector((state) => state);
  // Search All User Login History
  const SearchAllUserLoginHistory = useSelector(
    (state) => state.BOPSystemAdminReducer.SearchAllUserLoginHistory
  );

  console.log("SearchAllUserLoginHistory", SearchAllUserLoginHistory);
  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );

  const [tableData, setTableData] = useState([]);
  const [modalState, setModalState] = useState(0);
  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  //Role List
  const RoleList = useSelector((state) => state.auth.RoleList);

  //Select Role Handling
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleID, setRoleID] = useState({
    value: 0,
    label: "",
  });

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)

  //Checking snakbar state
  const [open, setOpen] = useState(false);

  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //Login History validate handler
  const LoginHistoryValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //Client Name
    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setLoginHistory({
          ...loginHistory,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setLoginHistory({
        ...loginHistory,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    //Counter Party Name
    if (name === "CounterPartyname" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setLoginHistory({
          ...loginHistory,
          CounterPartyName: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "CounterPartyname" && value === "") {
      setLoginHistory({
        ...loginHistory,
        CounterPartyName: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    //Email
    if (name === "email" && value !== "") {
      if (value !== "") {
        setLoginHistory({
          ...loginHistory,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setLoginHistory({
        ...loginHistory,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //handle select CategoryID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);

    setLoginHistory((prevState) => ({
      ...prevState,
      roleID: { ...prevState.roleID, value: selectedRole.value },
    }));
  };
  //Table columns for customer List
  const columns = [
    {
      title: <label className="px-3">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "220px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="px-3">Name</label>,
      dataIndex: "userName",
      key: "userName",
      width: "200px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="px-3">Counter Party</label>,
      dataIndex: "counterPartyName",
      key: "counterPartyName",
      width: "150px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="px-3">Role</label>,
      dataIndex: "roleID",
      key: "roleID",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (roleID) => {
        // Find the role name from the roles array based on userRoleID
        const role =
          RoleList?.roles?.length > 0 &&
          RoleList.roles.find((role) => role.roleID === roleID);
        return role ? role.roleName : ""; // Default if role not found
      },
    },

    {
      title: <label className="px-3">IP Address</label>,
      dataIndex: "ipAddress",
      key: "ipAddress",
      width: "130px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="px-3">Logged In Time</label>,
      dataIndex: "logInDateTime",
      key: "logInDateTime",
      align: "left",
      width: "160px",
      ellipsis: true,
      render: (logInDateTime) => {
        // Format the date and time
        return logInDateTime !== "-"
          ? moment(formatDateAndTimeFromString(logInDateTime)).format(
              "DD/MM/YYYY HH:mm:ss"
            )
          : "-";
      },
    },
    {
      title: <label className="px-3">Logged Out Time</label>,
      dataIndex: "logOutDateTime",
      key: "logOutDateTime",
      align: "left",
      width: "160px",
      ellipsis: true,
      render: (logOutDateTime) => {
        // Format the date and time
        return logOutDateTime !== "-"
          ? moment(formatDateAndTimeFromString(logOutDateTime)).format(
              "DD/MM/YYYY HH:mm:ss"
            )
          : "-";
      },
    },

    {
      title: <label className="px-3">Total Span</label>,
      dataIndex: "totalSpan",
      key: "totalSpan",
      align: "left",
      width: "150px",
      ellipsis: true,
      render: (duration) => {
        return formatTimeSpan(duration);
      },
    },
  ];
  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        UserName: loginHistory.Name.value,
        CounterPartyName: loginHistory?.CounterPartyName?.value,
        Email: loginHistory.Email.value,
        RoleID: roleID.value,

        StartDateTime: formatDate(loginHistory.dateFrom.value),
        EndDateTime: formatDate(loginHistory.dateTo.value),
        sRow: sRow,
        Length: 10,
      };
      dispatch(SearchAllUserLoginHistoryAPI(navigate, Data));
    }
  });

  //handelled states for scrolling here (2)
  //Handle search Button even
  const handleSearchEventButton = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);
    let data = {
      UserName: loginHistory.Name.value,
      CounterPartyName: loginHistory?.CounterPartyName?.value,
      Email: loginHistory.Email.value,
      RoleID: roleID.value,

      StartDateTime: formatDate(loginHistory.dateFrom.value),
      EndDateTime: formatDate(loginHistory.dateTo.value),
      sRow: 0,
      Length: 10,
    };
    console.log("Search Customer:", data);
    dispatch(SearchAllUserLoginHistoryAPI(navigate, data));
  };
  //Table columns for customer List
  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);
  // show error message When user hit activate btn
  const handleResetEventButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };

  //handeled states for scrolling here (3)
  //Handle Resest Button
  const handleResetYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);

      // Reset the form
      setLoginHistory({
        ...loginHistorySchema,

        dateFrom: { value: "", errorMessage: "", errorStatus: false },
        dateTo: { value: "", errorMessage: "", errorStatus: false },
        category: { value: "", errorMessage: "", errorStatus: false },
        Role: { value: "", errorMessage: "", errorStatus: false },
      });
      setRoleID({
        value: 0,
        label: "",
      });
    }
    let data = {
      Email: "",
      CounterPartyName: "",
      UserName: "",
      RoleID: 0,
      StartDateTime: "",
      EndDateTime: "",
      sRow: 0,
      Length: 10,
    };
    dispatch(SearchAllUserLoginHistoryAPI(navigate, data));
  };

  //Handle Date Change method
  const handleDateChange = (fieldName, value) => {
    setLoginHistory((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        value,
        errorMessage: "",
        errorStatus: false,
      },
    }));
  };
  const handleOpenChange = (newOpen) => {
    setOpen(newOpen);
  };
  const handleExport = (format) => {
    if (format === "excel") {
      exportToExcel();
    } else if (format === "pdf") {
      exportToPDF();
    }
  };

  const exportToExcel = () => {
    // const worksheet = XLSX.utils.json_to_sheet(data);
    // const workbook = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(workbook, worksheet, "Corporate List");
    // XLSX.writeFile(workbook, "CorporateList.xlsx");
    console.log("Doc saved as Excel");
  };

  const exportToPDF = () => {
    // const doc = new jsPDF();
    // doc.autoTable({
    //   head: [columns.map((col) => col.title)],
    //   body: data.map((row) => columns.map((col) => row[col.dataIndex])),
    // });
    // doc.save("CorporateList.pdf");
    console.log("doc saved as pdf");
  };
  //Metod to perform action of Export options
  const ExportOptions = ({ onClose }) => {
    return (
      <div className={styles["export-options"]}>
        <button
          onClick={() => {
            /* Handle CSV export */
          }}
        >
          Export as CSV
        </button>
        <button
          onClick={() => {
            /* Handle PDF export */
          }}
        >
          Export as PDF
        </button>
        <button onClick={onClose}>Close</button>
      </div>
    );
  };

  useEffect(() => {
    let data = {
      Email: "",
      CounterPartyName: "",
      UserName: "",
      RoleID: 0,
      StartDateTime: "",
      EndDateTime: "",
      sRow: 0,
      Length: 10,
    };
    dispatch(SearchAllUserLoginHistoryAPI(navigate, data));
    dispatch(RoleListAPI(navigate));
  }, []);

  //Role list:
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

    if (SearchAllUserLoginHistory !== null) {
      console.log(
        "SearchAllUserLoginHistorySearchAllUserLoginHistory",
        SearchAllUserLoginHistory
      );
      try {
        const { userLoginHistory, totalRecords } = SearchAllUserLoginHistory;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalRecords);
          setTableData([...tableData, ...userLoginHistory]);
          setSRow(tableData.length + userLoginHistory.length);
        } else {
          setHasReachedBottom(false);
          setTableData(userLoginHistory);
          setRecordLength(totalRecords);
          setSRow(userLoginHistory.length);
        }

        // if (userLoginHistory.length > 0) {
        //   console.log("userLoginHistoryuserLoginHistory", userLoginHistory);
        //   setTableData(userLoginHistory);
        // }
      } catch (error) {}
    } else if (SearchAllUserLoginHistory === null) {
      if (!hasReachedBottom) {
        console.log(
          "SearchBankUsersSearchBankUsers",
          SearchAllUserLoginHistory
        );

        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [RoleList, SearchAllUserLoginHistory]);

  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["customer-List-label"]}>
            Customer Login History
          </span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row className="mt-2 g-2">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  name={"Name"}
                  placeholder="Name"
                  labelClass={"d-none"}
                  value={loginHistory.Name.value}
                  onChange={LoginHistoryValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  name={"CounterPartyname"}
                  placeholder="Counter Party Name"
                  labelClass={"d-none"}
                  value={loginHistory.CounterPartyName.value}
                  onChange={LoginHistoryValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  name={"email"}
                  placeholder="Email"
                  labelClass={"d-none"}
                  value={loginHistory.Email.value}
                  onChange={LoginHistoryValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <Select
                  isSearchable={true}
                  placeholder={"Select Role"}
                  options={roleOptions}
                  value={roleID.value ? roleID : null}
                  onChange={handleSelectRole}
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col>

              <Col
                lg={4}
                md={4}
                sm={12}
                className="d-flex align-items-center pe-4"
              >
                <DatePicker
                  name={"dateFrom"}
                  labelClass={"d-none"}
                  inputClass={styles["Tradecount-Datepicker-left"]}
                  placeholder="Start date"
                  showOtherDays={true}
                  value={loginHistory.dateFrom.value}
                  onChange={(date) => handleDateChange("dateFrom", date)}
                  minDate={null} // No restriction initially
                  maxDate={loginHistory.dateTo.value || null}
                />

                <label className={styles["Tradecount-date-to"]}>to</label>

                <DatePicker
                  name="dateTo"
                  labelClass={"d-none"}
                  placeholder="End Date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-right"]}
                  value={loginHistory.dateTo.value}
                  onChange={(date) => handleDateChange("dateTo", date)}
                  minDate={loginHistory.dateFrom.value || null} // Disable dates before selected startDate
                  maxDate={null} // No restriction initially
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-1"
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className={styles["SearchButton_loginHistory"]}
                  text="Search"
                  onClick={handleSearchEventButton}
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                  onClick={handleResetEventButton}
                />

                <Popover
                  content={
                    <div className={styles["export-options"]}>
                      <Button
                        icon={<img src={excelIcon} alt="Excel Icon" />}
                        onClick={() => handleExport("excel")}
                        className={styles["export-button"]}
                      />
                      <Button
                        icon={<img src={pdfIcon} alt="PDF Icon" />}
                        onClick={() => handleExport("pdf")}
                        className={styles["export-button"]}
                      />
                    </div>
                  }
                  // title="Title"
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                  placement="bottomRight"
                  arrow={false}
                >
                  <Button
                    icon={<i className="icon-download"></i>}
                    className={styles["Export_Button"]}
                    text="Export"
                    iconClass={styles["resetIconClass"]}
                    onClick={toggleExportOptions}
                  />
                </Popover>
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <ExportShowComponent />
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={false}
                  rows={tableData}
                  scroll={{ y: 250, x: "scroll" }}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {BOPSystemAdminReducer.Loading && <Loader />}
      {<ActivateConfirmationModal onConfirm={handleResetYes} />}
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleResetYes}
          handleNoButton={handleNoButton}
        />
      )}
    </section>
  );
};

export default LoginHistory;
