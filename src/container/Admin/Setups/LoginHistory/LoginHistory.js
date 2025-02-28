import React, { useState } from "react";
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
import { categoryOptions, roleOptions } from "../../../../helpers/Dropdown";
import { loginHistorySchema } from "../../../../utils/schemas";
import { formatDate } from "../../../../helpers/reusableMethods";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { AddBankUserConfirmationModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
const LoginHistory = () => {
  //Login History States
  const [loginHistory, setLoginHistory] = useState({
    ...loginHistorySchema,
  });
  const dispatch = useDispatch();
  //State for category and role dropdown
  const [Role, setRole] = useState("");
  const [category, setCategory] = useState("");

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
  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "Email",
      key: "Email",
      width: "220px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "200px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Counter party Name</label>,
      dataIndex: "CounterPartyName",
      key: "CounterPartyName",
      width: "200px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "Role",
      key: "Role",
      width: "100px",
      ellipsis: true,
      align: "center",
    },

    {
      title: <label className="bottom-table-header">Branch</label>,
      dataIndex: "BranchName",
      key: "BranchName",
      width: "100px",
      ellipsis: true,
      align: "center",
    },

    {
      title: <label className="bottom-table-header">IP Address</label>,
      dataIndex: "IPAddress",
      key: "IPAddress",
      width: "150px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged In Time</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "180px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged Out Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "180px",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Total Span</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
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
    dispatch(AddBankUserConfirmationModalSystemAdmin(true));
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
    setCategory("");
    setRole("");
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
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
                  name="Role"
                  isSearchable={true}
                  placeholder={"Select Role"}
                  options={roleOptions}
                  value={Role}
                  onChange={(e) =>
                    handleDropdownChange("Role", e, setRole, loginHistory.Role)
                  }
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col>
              {/* <Col lg={2} md={2} sm={12}>
                <Select
                  name="category"
                  isSearchable={true}
                  placeholder={"Select Category"}
                  options={categoryOptions}
                  value={category}
                  onChange={(e) =>
                    handleDropdownChange(
                      "category",
                      e,
                      setCategory,
                      loginHistory.category
                    )
                  }
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col> */}
              <Col
                lg={4}
                md={4}
                sm={12}
                className="d-flex align-items-center pe-4"
              >
                <DatePicker
                  name={"dateFrom"}
                  labelClass={"d-none"}
                  placeholder="Start date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-left"]}
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

                <Button
                  icon={<i className="icon-download"></i>}
                  className={styles["Export_Button"]}
                  text="Export"
                />
              </Col>
            </Row>

            <Row className="mt-3">
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
