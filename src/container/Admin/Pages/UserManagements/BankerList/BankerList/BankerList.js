import React, { useCallback, useEffect, useState } from "react";
import styles from "./BankerList.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../../../components/elements";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  GetBankUserByUserIDAPI,
  SearchBankUsersAPI,
} from "../../../../../../store/actions/BOPSystemAdminActions";
import { useSelector } from "react-redux";
import { bankListSchema } from "../../../../../../utils/schemas";
import { ConfirmationModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Popover } from "antd";
import excelIcon from "../../../../../../assets/images/excel.png";
import pdfIcon from "../../../../../../assets/images/pdf.png";

import { GetBankUserRolesAPI } from "../../../../../../store/actions/Auth-Actions";
import {
  formatDateAndTimeFromString,
  IndexCell,
} from "../../../../../../helpers/reusableMethods";
import moment from "moment";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";
import ExportShowComponent from "../../../ReusableComponents/ExportShowComponent/ExportShowComponent";
import EditBankerModal from "../EditBankUserModal/EditBankerModal";
import {
  downloadBankUserlistReportApi,
  downloadPDFBankUserReportApi,
} from "../../../../../../store/actions/Download-Report";
import {
  setBankUserUpdated,
  setBranchUpdated,
} from "../../../../../../store/actions/RealtimeActions";
const BankerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const bankUserCreated = useSelector(
    (state) => state.RealtimeActionReducer.bankUserCreated
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
  const saveInstrumentModal = useSelector(
    (state) => state.BOPSystemAdminModal.saveInstrumentModal
  );

  console.log("saveInstrumentModal", saveInstrumentModal);

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);

  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
  const [modalState, setModalState] = useState(0);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //State for category
  const [tableData, setTableData] = useState([]);
  const [roleOptions, setRoleOptions] = useState([]);
  const [roleID, setRoleID] = useState({
    value: 0,
    label: "",
  });

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);

  //Search all corporate Users
  const SearchBankUsers = useSelector(
    (state) => state.BOPSystemAdminReducer.SearchBankUsersData
  );

  //Role List
  const RoleList = useSelector((state) => state.auth.GetBankUserRoles);

  //Edit Corporate Use Modal Calling
  const EditBankerModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editBankUserModal
  );

  //State BankList
  const [bankList, setBankList] = useState({ ...bankListSchema });

  //Checking snakbar state
  const [open, setOpen] = useState(false);
  const [dropdownvalue, setDropdownvalue] = useState(50);

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        EmployeeID: bankList.EmployeeID.value,
        Name: bankList.Name.value,
        Email: bankList.Email.value,
        RoleID: roleID.roleID ? roleID.roleID : 0,
        sRow: sRow,
        Length: dropdownvalue,
      };
      dispatch(SearchBankUsersAPI(navigate, Data));
    }
  });

  const handlePageSizeChange = (newSize) => {
    setDropdownvalue(newSize);
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    let data = {
      EmployeeID: bankList.EmployeeID.value,
      Name: bankList.Name.value,
      Email: bankList.Email.value,
      RoleID: roleID.roleID ? roleID.roleID : 0,
      sRow: 0,
      Length: newSize,
    };

    dispatch(SearchBankUsersAPI(navigate, data));
  };

  useEffect(() => {
    dispatch(GetBankUserRolesAPI(navigate));
    // let data = {
    //   EmployeeID: "",
    //   Name: "",
    //   Email: "",
    //   RoleID: 0,
    //   sRow: 0,
    //   Length: dropdownvalue, // Use dropdownvalue instead of hardcoded 10
    // };
    // dispatch(SearchBankUsersAPI(navigate, data));
    handlePageSizeChange(50);
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

  useEffect(() => {
    if (
      branchUpdated &&
      branchUpdated.branch &&
      branchUpdated.branch.branchID
    ) {
      const updatedTableData = tableData.map((user) => {
        if (
          user.branch &&
          user.branch.branchID === branchUpdated.branch.branchID
        ) {
          return {
            ...user,
            branch: {
              ...user.branch,
              branchName: branchUpdated.branch.branchName,
            },
          };
        }
        return user;
      });

      setTableData(updatedTableData);
      dispatch(setBranchUpdated(null));
    }
  }, [branchUpdated]);

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

  //handelled states for scrolling here (2)
  //handle Search Button event
  const handleSearchEventButton = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    let data = {
      EmployeeID: bankList.EmployeeID.value,
      Name: bankList.Name.value,
      Email: bankList.Email.value,
      RoleID: roleID.roleID ? roleID.roleID : 0,
      sRow: 0,
      Length: dropdownvalue,
    };
    dispatch(SearchBankUsersAPI(navigate, data));
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
  const handleReset = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };

  //handeled states for scrolling here (3)
  //Handle Reset
  const handleResetYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
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
        Name: "",
        Email: "",
        RoleID: 0,
        sRow: 0,
        Length: dropdownvalue,
      };

      // Call API to fetch all records after reset
      dispatch(SearchBankUsersAPI(navigate, data));
    }
  };

  //handle Edit Corporate
  const handleEditBanker = (record) => {
    let Data = { UserId: record.userID };
    dispatch(GetBankUserByUserIDAPI(navigate, Data));
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
      render: (val, record) => {
        return <IndexCell value={val} record={record} />;
      },
    },
    // Column definition for Role
    {
      title: <label className="px-3">Role</label>,
      dataIndex: "userRoleID",
      key: "userRoleID",
      width: "100px",
      ellipsis: true,
      align: "left",
      render: (val, record) => {
        let role =
          RoleList?.roles?.length > 0 &&
          RoleList.roles.find((role) => role.roleID === val);
        return (
          <IndexCell
            value={role !== undefined ? role.roleName : ""}
            record={record}
          />
        );
      },
    },
    {
      title: <label className="px-3">Branch Name</label>,
      dataIndex: "branch",
      key: "branch",
      width: "150px",
      align: "left",
      ellipsis: true,
      render: (val, record) => {
        console.log("valvalval", val);
        console.log("recordrecord", record);
        return (
          <IndexCell
            value={val !== null ? val?.branchName : ""}
            record={record}
          />
        );
      },
    },
    {
      title: <label className="px-3">Contact</label>,
      dataIndex: "contactNumber",
      key: "contactNumber",
      width: "120px",
      align: "left",
      ellipsis: true,
      render: (val, record) => {
        return <IndexCell value={val} record={record} />;
      },
    },
    {
      title: <label>Status</label>,
      dataIndex: "userStatusID",
      key: "userStatusID",
      width: "70px",
      align: "center",
      ellipsis: true,
      render: (val, record) => {
        return (
          <IndexCell
            value={val === 1 ? "Active" : "Inactive"}
            CellClassName={
              val === 1 ? styles.ActiveStatus : styles.InactiveStatus
            }
            record={record}
          />
        );
      },
    },
    {
      title: <label className="px-3">Creation Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "180px",
      ellipsis: true,
      render: (val, record) => {
        return (
          <IndexCell
            value={
              val !== "-"
                ? moment(formatDateAndTimeFromString(val)).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )
                : "-"
            }
            record={record}
          />
        );
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

  //handelled scrolling here (4)
  useEffect(() => {
    if (SearchBankUsers !== null) {
      try {
        const { bankUsers, totalRecords } = SearchBankUsers;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalRecords);
          setTableData([...tableData, ...bankUsers]);
          setSRow(tableData.length + bankUsers.length);
        } else {
          setHasReachedBottom(false);
          setTableData(bankUsers);
          setRecordLength(totalRecords);
          setSRow(bankUsers.length);
        }
      } catch (error) {}
    } else if (SearchBankUsers === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [SearchBankUsers]);

  useEffect(() => {
    if (bankUserCreated !== null) {
      console.log(bankUserCreated, "bankUserCreatedbankUserCreated");
      try {
        const { user, createdDateTime, createdUserID } = bankUserCreated;

        let findIsExist = tableData.find(
          (tableRow, index) => tableRow.employeeID === user.employeeID
        );
        if (findIsExist === undefined) {
          let userData = {
            branch: null,
            employeeID: user.employeeID,
            ldapAccount: user.loginID,
            userID: createdUserID,
            firstName: user.firstname,
            email: user.email,
            contactNumber: user.contactnumber,
            failedAttemptCount: 0,
            userRoleID: user.fK_UserRoleID,
            userStatusID: user.fK_UserStatusID,
            creationDateTime: createdDateTime,
          };
          setTableData((prevState) => [userData, ...prevState]);
        } else {
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [bankUserCreated]);

  useEffect(() => {
    if (bankUserRoleStatusChange !== null) {
      const { updatedUser } = bankUserRoleStatusChange;

      try {
        setTableData((prevTableData) => {
          return prevTableData.map((data2, index) => {
            if (data2.employeeID === updatedUser.employeeID) {
              return {
                ...data2,
                userRoleID: updatedUser.userRoleID,
                userStatusID: updatedUser.userStatusID,
                branch: updatedUser.branch,
              };
            }
            return data2;
          });
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [bankUserRoleStatusChange]);

  useEffect(() => {
    if (bankUserUpdated !== null) {
      const { user } = bankUserUpdated;
      try {
        setTableData((prevTableData) => {
          return prevTableData.map((data, index) => {
            if (data.employeeID === user.employeeID) {
              return {
                ...data,
                branch: {
                  ...user.branch,
                  branchName: user?.branch?.branchName,
                },
                contactNumber: user.contactNumber,
                firstName: user.firstName,
                email: user.email,
                userRoleID: user.userRoleID,
              };
            }
            return data;
          });
        });
      } catch (err) {
        console.log(err);
      }
      dispatch(setBankUserUpdated(null));
    }
  }, [bankUserUpdated]);

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

    setBankList((prevState) => ({
      ...prevState,
      roleID: { ...prevState.roleID, value: selectedRole.value },
    }));
  };
  const exportToExcel = () => {
    console.log("Doc saved as Excel");
    let data = {
      EmployeeID:
        bankList.EmployeeID.value !== "" ? bankList.EmployeeID.value : "",
      Name: bankList.Name.value !== "" ? bankList.Name.value : "",
      RoleID: roleID.value !== 0 ? roleID.value : 0,
      Email: bankList.Email.value !== "" ? bankList.Email.value : "",
    };
    console.log(data, "Doc saved as Excel");

    dispatch(downloadBankUserlistReportApi(navigate, data));
  };

  const exportToPDF = () => {
    let data = {
      EmployeeID:
        bankList.EmployeeID.value !== "" ? bankList.EmployeeID.value : "",
      Name: bankList.Name.value !== "" ? bankList.Name.value : "",
      RoleID: roleID.value !== 0 ? roleID.value : 0,
      Email: bankList.Email.value !== "" ? bankList.Email.value : "",
    };
    console.log(data, "Doc saved as Excel");

    dispatch(downloadPDFBankUserReportApi(navigate, data));
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
                  value={roleID.value ? roleID : null}
                  menuPortalTarget={document.body}
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
                <ExportShowComponent
                  value={dropdownvalue}
                  onChange={handlePageSizeChange}
                />
              </Col>
            </Row>

            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={false}
                  rows={tableData}
                  scroll={{ y: 280, x: "scroll" }}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {EditBankerModalGobalState && <EditBankerModal />}

      {/* {BOPSystemAdminReducer.Loading && <Loader />} */}
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleResetYes}
          handleNoButton={handleNoButton}
        />
      )}
    </section>
  );
};

export default BankerList;
