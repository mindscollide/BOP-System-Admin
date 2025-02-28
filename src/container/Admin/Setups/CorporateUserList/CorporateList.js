import React, { useCallback, useEffect, useState } from "react";
import styles from "./CorporateList.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import EditCorporateModal from "./EditCorporateModal/EditCorporateModal";
import {
  AddBankUserConfirmationModalSystemAdmin,
  DeleteCorporateModalSystemAdmin,
  EditCorporateModalSystemAdmin,
  UserDetailsCorporateModalSystemAdmin,
} from "../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
// import CorporatePlusIconModal from "../../../AdminLogin/CorporateUser/CorporatePlusIconModal/CorporatePlusIconModal";
import CorporateUserDetailsModal from "./CorporateUserDetailsModal/CorporateUserDetailsModal";
import { useNavigate } from "react-router-dom";
// import { getAllCorporatesCategory } from "../../../../store/actions/Auth-Actions";
import {
  getAllCorporatesCategory,
  SearchCorporateUsersAPI,
} from "../../../../store/actions/BOPSystemAdminActions";
import { corporateListSchema } from "../../../../utils/schemas";
import { categoryOptions } from "../../../../helpers/Dropdown";
import ExportShowComponent from "../BankerList/ExportShowComponent";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";

const CorporateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //Get All Coporates
  useEffect(() => {
    dispatch(getAllCorporatesCategory(navigate));
  }, [dispatch, navigate]);

  //States Corporate List
  const [corporateList, setCorporateList] = useState({
    ...corporateListSchema,
  });

  //State for dropdown
  const [category, setCategory] = useState("");

  //Edit Corporate Use Modal Calling
  const EditCorporateModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editCorporateModal
  );

  //Delete Corporate Use Modal Calling
  const DeleteCorporateModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.deleteCorporateModal
  );

  //UserDetails Corporate Use Modal Calling
  const UserDetailsCorporateModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.userDetailsCorporateModal
  );

  //Banker List validate handler
  const CorporateListValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    // Name
    if (name === "Name" && value !== "") {
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setCorporateList({
          ...corporateList,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "Name" && value === "") {
      setCorporateList({
        ...corporateList,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }

    //Email
    if (name === "corporateName" && value !== "") {
      if (value !== "") {
        setCorporateList({
          ...corporateList,
          CorporateName: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "corporateName" && value === "") {
      setCorporateList({
        ...corporateList,
        CorporateName: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }

    //Email
    if (name === "email" && value !== "") {
      if (value !== "") {
        setCorporateList({
          ...corporateList,
          Email: {
            value: value.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "email" && value === "") {
      setCorporateList({
        ...corporateList,
        Email: {
          value: "",
          errorMessage: "",
          errorStatus: true,
        },
      });
    }
  };

  //handle Edit Corporate
  const handleEditCorporate = () => {
    dispatch(EditCorporateModalSystemAdmin(true));
    dispatch(DeleteCorporateModalSystemAdmin(false));
    dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  //handle Delete Corporate
  const handleDeleteCorporate = () => {
    dispatch(DeleteCorporateModalSystemAdmin(true));
    dispatch(EditCorporateModalSystemAdmin(false));
    dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  //handle OnClick Email
  const handleOnClickEmail = () => {
    dispatch(UserDetailsCorporateModalSystemAdmin(true));
    dispatch(EditCorporateModalSystemAdmin(false));
    dispatch(DeleteCorporateModalSystemAdmin(false));
  };

  //Handle search Button even
  const handleSearchEventButton = () => {
    // let data = {
    //   FirstName: "",
    //   CategoryID: 0,
    //   Email: "",
    //   CompanyName: "",
    //   PageNumber: 1,
    //   Length: 10,
    // };

    let data = {
      FirstName: corporateList.Name.value,
      CompanyName: corporateList.CorporateName.value,
      CategoryID: corporateList.category.value,
      Email: corporateList.Email.value,
      PageNumber: 1,
      Length: 10,
      // CompanyName: "",
    };

    console.log("Data to Search", data);
    dispatch(SearchCorporateUsersAPI(navigate, data));
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

  const handleResetYes = () => {
    // dispatch(AddBankUserConfirmationModalSystemAdmin(false));
    // Reset all form fields, including the dropdown
    setCorporateList({
      Name: { value: "", errorMessage: "", errorStatus: false },
      CorporateName: { value: "", errorMessage: "", errorStatus: false },
      Email: { value: "", errorMessage: "", errorStatus: false },
      category: { value: "", errorMessage: "", errorStatus: false }, // Ensure role is cleared
    });
    setCategory(""); // Reset dropdown value

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
    // dispatch(SearchCorporateUsersAPI(navigate, resetData));
  };

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "200px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "200px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "Corporatename",
      key: "Corporatename",
      width: "200px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "Status",
      key: "Status",
      render: (status) => (
        <span
          className={
            status === "Active" ? styles.ActiveStatus : styles.InactiveStatus
          }
        >
          {status}
        </span>
      ),
      width: "80px",
      align: "center",
      ellipsis: true,
    },
    {
      title: (
        <label className="bottom-table-header">last Password Change</label>
      ),
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "180px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Create Date Time</label>,
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
                  icon={<i class="icon-edit color-blue"></i>}
                  onClick={handleEditCorporate}
                />
                <Button
                  className={styles["EditButton"]}
                  icon={<i class="icon-trash color-red"></i>}
                  iconClass={"iconClassTrashCorporate"}
                  onClick={handleDeleteCorporate}
                />
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
      email: (
        <>
          <span className="cursor-pointer" onClick={handleOnClickEmail}>
            john.doe@example.com
          </span>
        </>
      ),
      Name: "John Doe",
      Corporatename: "Acme Corp",
      Status: "Active",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i className="icon-edit color-blue"></i>
            <i className="icon-trash color-red"></i>
          </Col>
        </Row>
      ),
    },
    {
      key: "2",
      email: (
        <>
          <span className="cursor-pointer" onClick={handleOnClickEmail}>
            tom.cruise@bop.com
          </span>
        </>
      ),
      Name: "Tom Cruise",
      Corporatename: "Yunus Corp",
      Status: "Inactive",
      LastPassowrdChange: "13/05/2023 01:15:10",
      creationDateTime: "13/05/2023 01:15:10",
      Edit: (
        <Row>
          <Col lg={12} md={12} sm={12} className="d-flex gap-2">
            <i class="icon-edit color-blue"></i>
            <i class="icon-trash color-red"></i>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["customer-List-label"]}>Corporate List</span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row className="mt-2 g-2">
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Name"
                  labelClass={"d-none"}
                  name={"Name"}
                  value={corporateList.Name.value}
                  onChange={CorporateListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  labelClass={"d-none"}
                  placeholder="Corporate Name"
                  name={"corporateName"}
                  value={corporateList.CorporateName.value}
                  onChange={CorporateListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Email"
                  labelClass={"d-none"}
                  name={"email"}
                  value={corporateList.Email.value}
                  onChange={CorporateListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
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
                      corporateList.category
                    )
                  }
                  className={styles["react-select-field"]}
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
                  className={styles["CorporateList-btn-Search"]}
                  text="Search"
                  onClick={handleSearchEventButton}
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Corporatelist-Reset-btn"]}
                  text="Reset"
                  iconClass={styles["resetIconClass"]}
                  onClick={handleReset}
                />
                <Button
                  icon={<i class="icon-download"></i>}
                  className={styles["Export_Button"]}
                  text="Export"
                  iconClass={styles["resetIconClass"]}
                  onClick={toggleExportOptions}
                />
              </Col>
            </Row>

            <Row className="mt-3"></Row>

            {showExportOptions && (
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center gap-1"
                >
                  {/* Export as PDF Button */}
                  <Button
                    variant="primary"
                    text="Export as PDF"
                    onClick={() => console.log("Exporting as PDF")}
                  />
                  {/* Export as Excel Button */}
                  <Button
                    variant="secondary"
                    text="Export as Excel"
                    onClick={() => console.log("Exporting as Excel")}
                  />
                </Col>
              </Row>
            )}

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
      {EditCorporateModalGobalState && <EditCorporateModal />}
      {DeleteCorporateModalGobalState && <DeleteConfirmationModal />}
      {UserDetailsCorporateModalGobalState && <CorporateUserDetailsModal />}
      {/* {UserDetailsCorporateModalGobalState && <CorporatePlusIconModal />}
       */}

      {<ActivateConfirmationModal onConfirm={handleResetYes} />}
    </section>
  );
};

export default CorporateList;
