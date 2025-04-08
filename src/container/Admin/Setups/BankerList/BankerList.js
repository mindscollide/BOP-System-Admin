import React, { useEffect, useState } from "react";
import styles from "./BankerList.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Notification,
  Loader,
} from "../../../../components/elements";
import ExportShowComponent from "./ExportShowComponent";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import EditBankerModal from "./EditBankUserModal/EditBankerModal";
import {
  GetAllBranchesAPI,
  GetBankUserByUserIDAPI,
  SearchBankUsersAPI,
} from "../../../../store/actions/BOPSystemAdminActions";
import { useSelector } from "react-redux";
import { bankListSchema } from "../../../../utils/schemas";
import { ConfirmationModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Popover } from "antd";
// import { render } from "@testing-library/react";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";
import { RoleListAPI } from "../../../../store/actions/Auth-Actions";
import { formatDateAndTimeFromString } from "../../../../helpers/reusableMethods";
import moment from "moment";

const BankerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);

  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //State for category
  // const [Role, setRole] = useState("");
  const [tableData, setTableData] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleID, setRoleID] = useState({
    value: 0,
    label: "",
  });

  // //Sate for handling export options
  // const [showExportOptions, setShowExportOptions] = useState(false);

  //Search all corporate Users
  const SearchBankUsers = useSelector(
    (state) => state.BOPSystemAdminReducer.SearchBankUsersData
  );

  console.log("tabledata", tableData);
  console.log("SearchBankUserSearchBankUser", SearchBankUsers);

  //Role List
  const RoleList = useSelector((state) => state.auth.RoleList);

  //Edit Corporate Use Modal Calling
  const EditBankerModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editBankUserModal
  );

  //Global State
  const { BOPSystemAdminReducer } = useSelector((state) => state);

  //Get All Branches
  useEffect(() => {
    dispatch(GetAllBranchesAPI(navigate));
  }, []);

  //State BankList
  const [bankList, setBankList] = useState({ ...bankListSchema });

  //Checking snakbar state
  const [open, setOpen] = useState(false);

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

  //Banker List validate handler
  const BankerListValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //Client Name
    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setBankList({
          ...bankList,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setBankList({
        ...bankList,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    //Email
    if (name === "email" && value !== "") {
      if (value !== "") {
        setBankList({
          ...bankList,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setBankList({
        ...bankList,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    //Employee ID
    if (name === "EmployeeID" && value !== "") {
      if (value !== "") {
        setBankList({
          ...bankList,
          EmployeeID: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "EmployeeID" && value === "") {
      setBankList({
        ...bankList,
        EmployeeID: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //handle Search Button event
  const handleSearchEventButton = () => {
    let data = {
      FirstName: bankList.Name.value,
      LastName: "",
      RoleID: roleID.roleID ? roleID.roleID : "",
      StatusID: 0,
      Email: bankList.Email.value,
      LDAPAccount: "",
      // EmployeeID: bankList.EmployeeID.value,
      PageNumber: 1,
      Length: 10,
    };
    console.log("Data to Search", data);
    dispatch(SearchBankUsersAPI(navigate, data));
  };

  useEffect(() => {
    dispatch(RoleListAPI(navigate));
    let data = {
      EmployeeID: "",
      FirstName: "",
      Email: "",
      Role: "",
      StatusID: 0,
      PageNumber: 1,
      Length: 100,
    };

    console.log("Data to Search", data);
    dispatch(SearchBankUsersAPI(navigate, data));
  }, []);

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
  };

  // show error message When user hit activate btn
  const handleReset = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  //Handle Reset
  const handleResetYes = () => {
    // dispatch(AddBankUserConfirmationModalSystemAdmin(false));
    // Reset all form fields, including the dropdown
    setBankList({
      EmployeeID: { value: "" },
      Name: { value: "" },
      Email: { value: "" },
      roleID: { value: "" }, // Ensure role is cleared
    });
    setRoleID(""); // Reset dropdown value

    let data = {
      EmployeeID: "",
      FirstName: "",
      Email: "",
      Role: "",
      StatusID: 0,
      PageNumber: 1,
      Length: 10,
    };

    // Call API to fetch all records after reset
    dispatch(SearchBankUsersAPI(navigate, data));
  };

  //handle Edit Corporate
  const handleEditBanker = (record) => {
    console.log(record.userID);
    let Data = { UserId: record.userID };
    dispatch(GetBankUserByUserIDAPI(navigate, Data));

    // dispatch(DeleteCorporateModalSystemAdmin(false));
    // dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="px-3">EmployeeID</label>,
      dataIndex: "employeeID",
      key: "employeeID",
      width: "100px",
      ellipsis: true,
      align: "left",
    },
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
      dataIndex: "firstName",
      key: "firstName",
      width: "150px",
      ellipsis: true,
      align: "left",
    },
    // Column definition for Role
    {
      title: <label className="px-3">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      width: "150px",
      ellipsis: true,
      align: "left",
      render: (userRoleID) => {
        // Find the role name from the roles array based on userRoleID
        const role = RoleList.roles.find((role) => role.roleID === userRoleID);
        return role ? role.roleName : ""; // Default if role not found
      },
    },
    {
      title: <label className="px-3">Branch Name</label>,
      dataIndex: "branch",
      key: "branch",
      width: "150px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label className="px-3">Contact</label>,
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: "120px",
      align: "left",
      ellipsis: true,
    },
    {
      title: <label>Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      width: "70px",
      align: "center",
      ellipsis: true,
      render: (userStatusID) => (
        <span
          className={
            userStatusID === 1 ? styles.ActiveStatus : styles.InactiveStatus
          }
        >
          {userStatusID === 1 ? "Active" : "Inactive"}
        </span>
      ),
    },
    {
      title: <label className="px-3">Last Password Change</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "180px",
      ellipsis: true,
      render: (LastPassowrdChange) => {
        // Format the date and time
        // return LastPassowrdChange !== ""
        //   ? moment(formatDateAndTimeFromString(LastPassowrdChange)).format(
        //       "DD/MM/YYYY HH:mm:ss"
        //     )
        // : "-";
        return "-";
      },
    },
    {
      title: <label className="px-3">Creation Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "180px",
      ellipsis: true,
      render: (creationDateTime) => {
        // Format the date and time
        return creationDateTime !== "-"
          ? moment(formatDateAndTimeFromString(creationDateTime)).format(
              "DD/MM/YYYY HH:mm:ss"
            )
          : "-";
      },
    },
    {
      title: <label className="px-3"></label>,
      dataIndex: "Edit",
      key: "Edit",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-edit color-blue"></i>}
                  onClick={() => handleEditBanker(record)}
                />
                {/* <Button
                  className={styles["EditButton"]}
                  icon={<i class="icon-trash color-red"></i>}
                  iconClass={"iconClassTrashCorporate"}
                  // onClick={handleDeleteCorporate}
                /> */}
              </Col>
            </Row>
          </>
        );
      },
    },
  ];

  useEffect(() => {
    if (SearchBankUsers !== null) {
      console.log("SearchBankUsersSearchBankUsers", SearchBankUsers);
      try {
        const { bankUsers } = SearchBankUsers;
        if (bankUsers.length > 0) {
          setTableData(SearchBankUsers.bankUsers);
        }
      } catch (error) {}
    }
  }, [SearchBankUsers]);

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
  //handle select CategoryID
  const handleSelectRole = async (selectedRole) => {
    setRoleID(selectedRole);

    bankListSchema((prevState) => ({
      ...prevState,
      roleID: { ...prevState.roleID, value: selectedRole.value },
    }));
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
  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["customer-List-label"]}>Banker List</span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row className="mt-2 g-2">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  name={"EmployeeID"}
                  placeholder="Employee ID"
                  labelClass={"d-none"}
                  value={bankList.EmployeeID.value}
                  onChange={BankerListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Name"
                  labelClass={"d-none"}
                  name={"Name"}
                  value={bankList.Name.value}
                  onChange={BankerListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Email"
                  labelClass={"d-none"}
                  name={"email"}
                  value={bankList.Email.value}
                  onChange={BankerListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <Select
                  isSearchable={true}
                  placeholder={"Select Role"}
                  options={roleOptions}
                  value={roleID.value !== 0 ? roleID : null}
                  onChange={handleSelectRole}
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col>
              <Col
                lg={4}
                md={4}
                sm={12}
                className="d-flex justify-content-center gap-1"
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className={styles["Search-btn-BankList"]}
                  text="Search"
                  onClick={handleSearchEventButton}
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                  onClick={handleReset}
                />
                {/* <Button
                  icon={<i className="icon-download"></i>}
                  className={styles["Export_Button"]}
                  text="Export"
                  iconClass={styles["resetIconClass"]}
                  // onClick={() => setShowExportOptions(!showExportOptions)}
                /> */}
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
                  trigger="click"
                  open={open}
                  onOpenChange={handleOpenChange}
                  placement="bottomLeft"
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

            {/* <Row className="mt-3"></Row> */}
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
                  // scroll={true}
                  // expandable={true}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {EditBankerModalGobalState && <EditBankerModal />}

      {BOPSystemAdminReducer.Loading && <Loader />}
      {<ActivateConfirmationModal onConfirm={handleResetYes} />}
      <Notification setOpen={setOpen} open={open.open} message={open.message} />
      {/* {showExportOptions && (
        <ExportOptions onClose={() => setShowExportOptions(false)} />
      )} */}
    </section>
  );
};

export default BankerList;
