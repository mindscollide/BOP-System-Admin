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
  SearchBankUsersAPI,
} from "../../../../store/actions/BOPSystemAdminActions";
import { useSelector } from "react-redux";
import { roleOptions } from "../../../../helpers/Dropdown";
import { bankListSchema } from "../../../../utils/schemas";
import {
  AddBankUserConfirmationModalSystemAdmin,
  editBankUserModalSystemAdmin,
} from "../../../../store/actions/BOPSystemAdminModalsActions";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
// import { render } from "@testing-library/react";
const BankerList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State for category
  const [Role, setRole] = useState("");

  // //State for category
  // const [category, setCategory] = useState("");

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
    // let data = {
    //   FirstName: "",
    //   LastName: "",
    //   RoleID: 0,
    //   StatusID: 0,
    //   Email: "",
    //   LDAPAccount: "",
    //   PageNumber: 1,
    //   Length: 10,
    // };
    let data = {
      EmployeeID: bankList.EmployeeID.value,
      FirstName: bankList.Name.value,
      Email: bankList.Email.value,
      Role: bankList.Role.value,
      StatusID: 0,
      PageNumber: 1,
      Length: 10,
    };
    console.log("BankList Data", data);

    // dispatch(SearchBankUsersAPI(navigate, data));
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value; // Update the corporateUser object
  };

  // show error message When user hit activate btn
  const handleReset = () => {
    dispatch(AddBankUserConfirmationModalSystemAdmin(true));
  };

  //Handle Reset
  const handleResetYes = () => {
    // dispatch(AddBankUserConfirmationModalSystemAdmin(false));
    // Reset all form fields, including the dropdown
    setBankList({
      EmployeeID: { value: "" },
      Name: { value: "" },
      Email: { value: "" },
      Role: { value: "" }, // Ensure role is cleared
    });
    setRole(null); // Reset dropdown value

    let resetData = {
      EmployeeID: "",
      FirstName: "",
      Email: "",
      Role: "",
      StatusID: 0,
      PageNumber: 1,
      Length: 10,
    };

    // Call API to fetch all records after reset
    // dispatch(SearchBankUsersAPI(navigate, resetData));
  };

  //handle Edit Corporate
  const handleEditBanker = () => {
    dispatch(editBankUserModalSystemAdmin(true));
    // dispatch(DeleteCorporateModalSystemAdmin(false));
    // dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">EmployeeID</label>,
      dataIndex: "EmployeeID",
      key: "EmployeeID",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "220px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "150px",
      ellipsis: true,
      align: "center",
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
      title: <label className="bottom-table-header">Branch Name</label>,
      dataIndex: "BranchName",
      key: "BranchName",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Contact</label>,
      dataIndex: "ContactNumber",
      key: "ContactNumber",
      width: "150px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "Status",
      key: "Status",
      width: "100px",
      align: "center",
      ellipsis: true,
      render: (status) => (
        <span
          className={
            status === "Active" ? styles.ActiveStatus : styles.InactiveStatus
          }
        >
          {status}
        </span>
      ),
    },
    {
      title: <label className="bottom-table-header">Last Password</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "180px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "180px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header"></label>,
      dataIndex: "Edit",
      key: "Edit",
      align: "center",
      width: "100px",
      ellipsis: true,
      render: () => {
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
                  onClick={handleEditBanker}
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
  //Dummy Data
  const data = [
    {
      key: "1",
      EmployeeID: "0123",
      email: "john.doe@example.com",
      Name: "John Doe",
      Role: "Branch",
      BranchName: "Saddar",
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
      email: "yunus@bop.com",
      Name: "Tom Cruise",
      Role: "Dealer",
      BranchName: "Clifton",
      ContactNumber: "01234567890",
      Status: "Inactive",
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
                  name="Role"
                  isSearchable={true}
                  placeholder={"Select Role"}
                  options={roleOptions}
                  value={Role}
                  onChange={(e) =>
                    handleDropdownChange("Role", e, setRole, bankList.Role)
                  }
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
                <Button
                  icon={<i className="icon-download"></i>}
                  className={styles["Export_Button"]}
                  text="Export"
                  iconClass={styles["resetIconClass"]}
                />
              </Col>
            </Row>

            <Row className="mt-3"></Row>
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
                  scroll={true}
                  expandable={true}
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
    </section>
  );
};

export default BankerList;
