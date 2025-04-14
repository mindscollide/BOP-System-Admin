import React, { useEffect, useState } from "react";
import styles from "./LoginHistory.module.css";
import DatePicker from "react-multi-date-picker";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import ExportShowComponent from "../BankerList/ExportShowComponent";
import { loginHistorySchema } from "../../../../utils/schemas";
import { formatDate } from "../../../../helpers/reusableMethods";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { ConfirmationModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RoleListAPI } from "../../../../store/actions/Auth-Actions";
const LoginHistory = () => {
  //Login History States
  const [loginHistory, setLoginHistory] = useState({
    ...loginHistorySchema,
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      dataIndex: "Email",
      key: "Email",
      width: "220px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="px-3">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "200px",
      align: "left",
      ellipsis: true,
    },

    {
      title: <label className="px-3">Counter party Name</label>,
      dataIndex: "CounterPartyName",
      key: "CounterPartyName",
      width: "200px",
      align: "left",
      ellipsis: true,
    },

    {
      title: <label className="px-3">Role</label>,
      dataIndex: "Role",
      key: "Role",
      width: "100px",
      ellipsis: true,
      align: "left",
    },

    {
      title: <label className="px-3">Branch</label>,
      dataIndex: "BranchName",
      key: "BranchName",
      width: "100px",
      ellipsis: true,
      align: "left",
    },

    {
      title: <label className="px-3">IP Address</label>,
      dataIndex: "IPAddress",
      key: "IPAddress",
      width: "150px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="px-3">Logged In Time</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "left",
      width: "180px",
      ellipsis: true,
    },
    {
      title: <label className="px-3">Logged Out Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "left",
      width: "180px",
      ellipsis: true,
    },

    {
      title: <label className="px-3">Total Span</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "left",
      width: "180px",
      ellipsis: true,
    },
  ];
  //Dummy Data
  const data = [
    {
      key: "1",
      EmployeeID: "0123",
      Email: "john.doe@example.com",
      Name: "John Doe",
      Role: "Branch",
      BranchName: "Saddar",
      IPAddress: "225.225.225.225",
      CounterPartyName: "Zohair Zanzibarwala",
      ContactNumber: "03909090909",
      Status: "Active",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i className="icon-edit color-blue"></i>
            {/* <i className="icon-trash color-red"></i> */}
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      EmployeeID: "0654",
      Email: "yunus@bop.com",
      Name: "Tom Cruise",
      Role: "Dealer",
      BranchName: "Clifton",
      IPAddress: "192.168.121.111",
      CounterPartyName: "Yunus Zanzibarwala",
      ContactNumber: "01234567890",
      Status: "Active",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i className="icon-edit color-blue"></i>
            {/* <i className="icon-trash color-red"></i> */}
          </Col>
        </Row>
      ),
    },
  ];
  //Handle search Button even
  const handleSearchEventButton = () => {
    let data = {
      FirstName: loginHistory?.Name?.value,
      CounterPartyName: loginHistory?.CounterPartyName?.value,
      Email: loginHistory?.Email?.value,
      Role: loginHistory?.Role?.value,
      CategoryID: loginHistory?.category?.value,
      From: formatDate(loginHistory.dateFrom.value),
      To: formatDate(loginHistory.dateTo.value),
      PageNumber: 1,
      Length: 10,
    };
    console.log("Search Customer:", data);
  };

  // show error message When user hit activate btn
  const handleResetEventButton = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  //Handle Resest Button
  const handleResetYes = () => {
    // Reset the form
    setLoginHistory({
      ...loginHistorySchema,

      dateFrom: { value: "", errorMessage: "", errorStatus: false },
      dateTo: { value: "", errorMessage: "", errorStatus: false },
      category: { value: "", errorMessage: "", errorStatus: false },
      Role: { value: "", errorMessage: "", errorStatus: false },
    });
    setRoleID("");
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
  }, [RoleList]);

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
                  rows={data}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {<ActivateConfirmationModal onConfirm={handleResetYes} />}
    </section>
  );
};

export default LoginHistory;
