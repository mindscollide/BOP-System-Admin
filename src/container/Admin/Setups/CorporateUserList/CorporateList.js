import React, { useEffect, useState } from "react";
import styles from "./CorporateList.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import EditCorporateModal from "./EditCorporateModal/EditCorporateModal";
import {
  // AddBankUserConfirmationModalSystemAdmin,
  ConfirmationModalSystemAdmin,
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
import { SearchCorporateUsersAPI } from "../../../../store/actions/BOPSystemAdminActions";
import { corporateListSchema } from "../../../../utils/schemas";
import ExportShowComponent from "../BankerList/ExportShowComponent";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Popover } from "antd";
import pdfIcon from "../../../../assets/images/pdf.png";
import excelIcon from "../../../../assets/images/excel.png";
import {
  GetAllCategoriesAPI,
  // getAllCorporatesCategory,
} from "../../../../store/actions/Auth-Actions";
import { formatDateAndTimeFromString } from "../../../../helpers/reusableMethods";
import moment from "moment";

const CorporateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //Global State
  const { BOPSystemAdminReducer } = useSelector((state) => state);
  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  // const GetAllCorporateUsers = useSelector(
  //   (state) => state.BOPSystemAdminReducer.GetAllCorporateUsers
  // );
  // console.log("GetAllCorporateUsers", GetAllCorporateUsers);

  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //States Corporate List
  const [corporateList, setCorporateList] = useState(corporateListSchema);
  const [tableData, setTableData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  //State for dropdown
  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });
  console.log(tableData, "tableData");
  //Search all  corporate Users
  const SearchCorporateUsers = useSelector(
    (state) => state.BOPSystemAdminReducer.SearchCorporateUsersData
  );
  console.log("SearchCorporateUsers", SearchCorporateUsers);
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

  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
    let data = {
      FirstName: "",
      CompanyName: "",
      CategoryID: 0,
      Email: "",
      PageNumber: 1,
      Length: 10,
    };

    console.log("Data to Search", data);
    dispatch(SearchCorporateUsersAPI(navigate, data));
  }, []);

  useEffect(() => {
    if (getAllCategories !== null) {
      try {
        let newCategoriesData = getAllCategories.categories.map((category) => {
          return {
            ...category,
            value: { value: category.categoryID },
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);
      } catch (error) {}
    }
  }, [getAllCategories]);
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
  const handleEditCorporate = (record) => {
    // console.log("record: ", record);
    // let Data = {
    //   CorporateID: 1,
    //   UserID: record.userID,
    // };
    // dispatch(GetCorporateUserByUserIDAPI(navigate, Data));
    dispatch(EditCorporateModalSystemAdmin(true));

    dispatch(DeleteCorporateModalSystemAdmin(false));
    dispatch(UserDetailsCorporateModalSystemAdmin(false));
  };

  // //handle Delete Corporate
  // const handleDeleteCorporate = () => {
  //   dispatch(DeleteCorporateModalSystemAdmin(true));
  //   dispatch(EditCorporateModalSystemAdmin(false));
  //   dispatch(UserDetailsCorporateModalSystemAdmin(false));
  // };

  //handle OnClick Email
  const handleOnClickEmail = () => {
    dispatch(UserDetailsCorporateModalSystemAdmin(true));
    dispatch(EditCorporateModalSystemAdmin(false));
    dispatch(DeleteCorporateModalSystemAdmin(false));
  };

  //Handle search Button even
  const handleSearchEventButton = () => {
    let data = {
      FirstName: corporateList.Name.value,
      CompanyName: corporateList.CorporateName.value,
      CategoryID: categoryID.categoryID,
      Email: corporateList.Email.value,
      PageNumber: 1,
      Length: 10,
    };

    console.log("Data to Search", data);
    dispatch(SearchCorporateUsersAPI(navigate, data));
  };

  // show error message When user hit activate btn
  const handleReset = () => {
    // dispatch(AddBankUserConfirmationModalSystemAdmin(true));
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  //Table columns for customer List

  const handleResetYes = () => {
    setCorporateList({
      Name: { value: "", errorMessage: "", errorStatus: false },
      CorporateName: { value: "", errorMessage: "", errorStatus: false },
      Email: { value: "", errorMessage: "", errorStatus: false },
      category: { value: "", errorMessage: "", errorStatus: false },
    });
    setCategoryID("");

    let data = {
      FirstName: "",
      CompanyName: "",
      CategoryID: 0,
      Email: "",
      PageNumber: 1,
      Length: 10,
    };

    console.log("Data to Search", data);
    dispatch(SearchCorporateUsersAPI(navigate, data));
  };
  const columns = [
    {
      title: <label className="px-3">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "220px",
      align: "left",
      ellipsis: true,
      render: (email) => (
        <span style={{ cursor: "pointer" }} onClick={handleOnClickEmail}>
          {email}
        </span>
      ),
    },
    {
      title: <label className="px-3">Name</label>,
      dataIndex: "firstName",
      key: "firstName",
      width: "150px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="px-3">Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "150px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label>Status</label>,
      dataIndex: "statusId",
      key: "statusId",
      render: (statusId) => (
        <span
          className={
            statusId === 1 ? styles.ActiveStatus : styles.InactiveStatus
          }
        >
          {statusId === 1 ? "Active" : "Inactive"}
        </span>
      ),
      width: "70px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label>last Password Change</label>,
      dataIndex: "passwordModificationTime",
      key: "passwordModificationTime",
      align: "center",
      width: "180px",
      ellipsis: true,
      render: (passwordModificationTime) => {
        // Format the date and time
        return passwordModificationTime !== "-"
          ? moment(
              formatDateAndTimeFromString(passwordModificationTime)
            ).format("DD/MM/YYYY HH:mm:ss")
          : "-";
      },
    },
    {
      title: <label>Create Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "180px",
      ellipsis: true,
      render: (creationDateTime) => {
        console.log(creationDateTime, "creationDateTime");
        // Format the date and time
        return moment(formatDateAndTimeFromString(creationDateTime)).format(
          "DD/MM/YYYY HH:mm:ss"
        );
      },
    },

    {
      title: <label></label>,
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
                // className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["EditButton"]}
                  icon={<i className="icon-edit color-blue"></i>}
                  onClick={() => handleEditCorporate(record)}
                />
                {/* <Button
                  className={styles["EditButton"]}
                  icon={<i class="icon-trash color-red"></i>}
                  iconClass={"iconClassTrashCorporate"}
                  onClick={handleDeleteCorporate}
                /> */}
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
  useEffect(() => {
    if (SearchCorporateUsers !== null) {
      try {
        const { corporateUsers } = SearchCorporateUsers;
        if (corporateUsers.length > 0) {
          setTableData(SearchCorporateUsers.corporateUsers);
        }
      } catch (error) {}
    }
  }, [SearchCorporateUsers]);

  const [open, setOpen] = useState(false);

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
  const handleSelectCategory = async (selectedCategory) => {
    setCategoryID(selectedCategory);

    corporateListSchema((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.categoryID, value: selectedCategory.value },
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
          <span className={styles["customer-List-label"]}>
            Corporate Users List
          </span>
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
                  // isClearable={true}
                  // isSearchable={true}
                  placeholder="Select Category"
                  options={categoryOptions}
                  value={categoryID.value !== 0 ? categoryID : null}
                  onChange={handleSelectCategory}
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
                <Popover
                  content={
                    <div className={styles["export-options"]}>
                      <Button
                        icon={<img src={pdfIcon} alt="PDF Icon" />}
                        onClick={() => handleExport("pdf")}
                        className={styles["export-button"]}
                      />
                      <Button
                        icon={<img src={excelIcon} alt="Excel Icon" />}
                        onClick={() => handleExport("excel")}
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

            {/* <Row className="mt-3"></Row>

            {showExportOptions && (
              <Row className="mt-3">
                <Col
                  lg={12}
                  md={12}
                  sm={12}
                  className="d-flex justify-content-center gap-1"
                >
                //Export as PDF Button
                  <Button
                    variant="primary"
                    text="Export as PDF"
                    onClick={() => console.log("Exporting as PDF")}
                  />
                // Export as Excel Button 
                  <Button
                    variant="secondary"
                    text="Export as Excel"
                    onClick={() => console.log("Exporting as Excel")}
                  />
                </Col>
              </Row>
            )} */}

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
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {BOPSystemAdminReducer.Loading && <Loader />}

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
