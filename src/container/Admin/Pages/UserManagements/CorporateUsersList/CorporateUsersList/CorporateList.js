import React, { useCallback, useEffect, useState } from "react";
import styles from "./CorporateList.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
  Loader,
} from "../../../../../../components/elements";
import Select from "react-select";
import { useSelector } from "react-redux";
import EditCorporateModal from "../EditCorporateModal/EditCorporateModal";
import {
  ConfirmationModalSystemAdmin,
  DeleteCorporateModalSystemAdmin,
  EditCorporateModalSystemAdmin,
  UserDetailsCorporateModalSystemAdmin,
} from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
// import DeleteConfirmationModal from "../../../../Setups/CorporateUserList/DeleteConfirmationModal/DeleteConfirmationModal";
// import CorporateUserDetailsModal from "../../../../Setups/CorporateUserList/CorporateUserDetailsModal/CorporateUserDetailsModal";
import { useNavigate } from "react-router-dom";
import { corporateListSchema } from "../../../../../../utils/schemas";
// import ExportShowComponent from "../../../../Setups/BankerList/ExportShowComponent";

import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Popover } from "antd";
import pdfIcon from "../../../../../../assets/images/pdf.png";
import excelIcon from "../../../../../../assets/images/excel.png";
import { GetAllCategoriesAPI } from "../../../../../../store/actions/Auth-Actions";
import { formatDateAndTimeFromString } from "../../../../../../helpers/reusableMethods";
import moment from "moment";
import {
  GetCorporateUserByUserIDApi,
  SearchCorporateUsersAPI,
} from "../../../../../../store/actions/CorporateUsersAction";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";
import { useMqtt } from "../../../../../../context/MQTTContext";
import CorporateUserDetailsModal from "../CorporateUserDetailsModal/CorporateUserDetailsModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ExportShowComponent from "../../../ReusableComponents/ExportShowComponent/ExportShowComponent";
const CorporateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    corproateUserCreated,
    corporateUserRoleStatusChange,
    corporateUpdated,
    setCorporateUpdated,
  } = useMqtt();

  //Global State
  // const { BOPSystemAdminReducer } = useSelector((state) => state);
  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
  const [modalState, setModalState] = useState(0);
  // State to control visibility of export buttons
  const [showExportOptions, setShowExportOptions] = useState(false);
  // Function to toggle the export options (PDF & Excel buttons)
  const toggleExportOptions = () => {
    setShowExportOptions(!showExportOptions);
  };

  //States Corporate List
  const [corporateUserId, setCorproateUserId] = useState(0);
  const [corporateList, setCorporateList] = useState({
    ...corporateListSchema,
  });
  const [tableData, setTableData] = useState([]);
  const [categoryOptions, setCategoryOptions] = useState([]);
  //State for dropdown
  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);
  console.log(tableData, "tableData");
  const loadingState = useSelector(
    (state) => state.CorporateUsersReducer.Loading
  );
  //Search all  corporate Users
  const SearchCorporateUsers = useSelector(
    (state) => state.CorporateUsersReducer.SearchCorporateUsersData
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

  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (recordsLength !== tableData.length) {
      let Data = {
        FirstName: corporateList.Name.value,
        CompanyName: corporateList.CorporateName.value,
        CategoryID: categoryID.categoryID ? categoryID.categoryID : 0,
        Email: corporateList.Email.value,
        sRow: sRow,
        Length: 10,
      };
      dispatch(SearchCorporateUsersAPI(navigate, Data));
    }
  });

  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
    let data = {
      FirstName: "",
      CompanyName: "",
      CategoryID: 0,
      Email: "",
      sRow: 0,
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
    console.log("record: ", record);
    let Data = {
      CorporateId: record.corporateID,
      UserId: record.userID,
    };
    dispatch(
      GetCorporateUserByUserIDApi(navigate, Data, setCorproateUserId, 0)
    );

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
  const handleOnClickEmail = (record) => {
    dispatch(UserDetailsCorporateModalSystemAdmin(true));
    console.log("record: ", record);
    let Data = {
      CorporateId: record.corporateID,
      UserId: record.userID,
    };
    dispatch(
      GetCorporateUserByUserIDApi(navigate, Data, setCorproateUserId, 1)
    );
    dispatch(EditCorporateModalSystemAdmin(false));
    dispatch(DeleteCorporateModalSystemAdmin(false));
  };

  //handelled states for scrolling here (2)
  //Handle search Button even
  const handleSearchEventButton = () => {
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);
    let data = {
      FirstName: corporateList.Name.value,
      CompanyName: corporateList.CorporateName.value,
      Email: corporateList.Email.value,
      CategoryID: categoryID.categoryID ? categoryID.categoryID : 0,
      sRow: 0,
      Length: 10,
    };

    console.log("Data to Search", data);
    dispatch(SearchCorporateUsersAPI(navigate, data));
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
    // dispatch(AddBankUserConfirmationModalSystemAdmin(true));
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };
  //handeled states for scrolling here (3)
  const handleResetYes = () => {
    setHasReachedBottom(false);
    setRecordLength(0);
    setSRow(0);
    setTableData([]);
    if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
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
        sRow: 0,
        Length: 10,
      };

      console.log("Data to Search", data);
      dispatch(SearchCorporateUsersAPI(navigate, data));
    }
  };
  const columns = [
    {
      title: <label className="px-3">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "220px",
      align: "left",
      ellipsis: true,
      render: (email, record) => (
        <span
          style={{ cursor: "pointer" }}
          onClick={() => handleOnClickEmail(record)}
        >
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

  //handelled scrolling here (4)
  useEffect(() => {
    if (SearchCorporateUsers !== null) {
      try {
        const { corporateUsers, totalRecords } = SearchCorporateUsers;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setRecordLength(totalRecords);
          setTableData([...tableData, ...corporateUsers]);
          setSRow(tableData.length + corporateUsers.length);
        } else {
          setHasReachedBottom(false);
          setTableData(corporateUsers);
          setRecordLength(totalRecords);
          setSRow(corporateUsers.length);
        }
        // if (corporateUsers.length > 0) {
        //   setTableData(SearchCorporateUsers.corporateUsers);
        // }
      } catch (error) {}
    } else if (SearchCorporateUsers === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setTableData([]);
        setRecordLength(0);
        setSRow(0);
      }
    }
  }, [SearchCorporateUsers]);

  useEffect(() => {
    if (corporateUserRoleStatusChange !== null) {
      try {
        const { updatedUser } = corporateUserRoleStatusChange;
        setTableData((prevState) => {
          return prevState.map((data2, index) => {
            if (data2.userID === updatedUser.userID) {
              return {
                ...data2,
                statusId: updatedUser.statusId,
              };
            }
            return data2;
          });
        });
      } catch (error) {}
    }
  }, [corporateUserRoleStatusChange]);

  useEffect(() => {
    if (corproateUserCreated !== null) {
      try {
        const { user, createdUserID, createdDateTime } = corproateUserCreated;
        let findIsExist = tableData.find(
          (tableRow, index) => tableRow.userID === user.createdUserID
        );
        if (findIsExist === undefined) {
          let userData = {
            userID: createdUserID,
            email: user.email,
            firstName: user.firstname,
            corporateID: user.fK_CorporateID,
            corporateName: user.corporateName,
            statusId: user.fK_UserStatusID,
            creationDateTime: createdDateTime,
            passwordModificationTime: "",
          };
          setTableData((prevState) => [userData, ...prevState]);
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [corproateUserCreated]);

  useEffect(() => {
    if (corporateUpdated !== null) {
      console.log("corporateUpdatedcorporateUpdated", corporateUpdated);
      console.log("tableDatatableData", tableData);
      const updatedTableData = tableData.map((user) => {
        if (user.corporateID === corporateUpdated.corporate.corporateID) {
          return {
            ...user,
            corporateName: corporateUpdated.corporate.corporateName,
          };
        }
        return user;
      });
      setTableData(updatedTableData);
      setCorporateUpdated(null);
    }
  }, [corporateUpdated]);

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
                  scroll={{ y: 300, x: "scroll" }}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {loadingState && <Loader />}

      {EditCorporateModalGobalState && (
        <EditCorporateModal
          setCorproateUserId={setCorproateUserId}
          corporateUserId={corporateUserId}
        />
      )}
      {DeleteCorporateModalGobalState && <DeleteConfirmationModal />}
      {UserDetailsCorporateModalGobalState && (
        <CorporateUserDetailsModal
          setCorproateUserId={setCorproateUserId}
          corporateUserId={corporateUserId}
        />
      )}
      {/* {UserDetailsCorporateModalGobalState && <CorporatePlusIconModal />}
       */}

      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleResetYes}
          handleNoButton={handleNoButton}
        />
      )}
    </section>
  );
};

export default CorporateList;
