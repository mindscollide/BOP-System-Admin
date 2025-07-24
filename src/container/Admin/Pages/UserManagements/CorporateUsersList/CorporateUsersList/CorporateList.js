import React, { useCallback, useEffect, useState } from "react";
import styles from "./CorporateList.module.css";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
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
import { useNavigate } from "react-router-dom";
import { corporateListSchema } from "../../../../../../utils/schemas";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { Popover } from "antd";
import pdfIcon from "../../../../../../assets/images/pdf.png";
import excelIcon from "../../../../../../assets/images/excel.png";
import { GetAllCategoriesAPI } from "../../../../../../store/actions/Auth-Actions";
import {
  formatDateAndTimeFromString,
  IndexCell,
} from "../../../../../../helpers/reusableMethods";
import moment from "moment";
import {
  GetCorporateUserByUserIDApi,
  SearchCorporateUsersAPI,
} from "../../../../../../store/actions/CorporateUsersAction";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";
import CorporateUserDetailsModal from "../CorporateUserDetailsModal/CorporateUserDetailsModal";
import DeleteConfirmationModal from "../DeleteConfirmationModal/DeleteConfirmationModal";
import ExportShowComponent from "../../../ReusableComponents/ExportShowComponent/ExportShowComponent";
import {
  downloadCorporateUserlistReportApi,
  downloadPDFCorporateUserReportApi,
} from "../../../../../../store/actions/Download-Report";
import {
  setCategoryAdded,
  setCategoryUpdated,
  setCorporateUpdated,
  setCorporateUserCreated,
} from "../../../../../../store/actions/RealtimeActions";
const CorporateList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const corporateUserCreated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUserCreated
  );
  const corporateUserRoleStatusChange = useSelector(
    (state) => state.RealtimeActionReducer.corporateUserRoleStatusChange
  );
  const corporateUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUpdated
  );
  const corporateUserUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUserUpdated
  );
  const categoryAdded = useSelector(
    (state) => state.RealtimeActionReducer.categoryAdded
  );
  const categoryUpdated = useSelector(
    (state) => state.RealtimeActionReducer.categoryUpdated
  );

  //Global State
  const getAllCategories = useSelector((state) => state.auth.getAllCategories);

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
  const [dropdownvalue, setDropdownvalue] = useState(50);

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [recordsLength, setRecordLength] = useState(0);

  //Search all  corporate Users
  const SearchCorporateUsers = useSelector(
    (state) => state.CorporateUsersReducer.SearchCorporateUsersData
  );
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
        Length: dropdownvalue,
      };
      dispatch(SearchCorporateUsersAPI(navigate, Data));
    }
  });
  const handlePageSizeChange = (newSize) => {
    // Update local state
    setDropdownvalue(newSize);

    // // Reset pagination state
    setSRow(0);
    setHasReachedBottom(false);
    setTableData([]);
    setRecordLength(0);

    // Prepare API call data
    let data = {
      FirstName: corporateList.Name.value,
      CompanyName: corporateList.CorporateName.value,
      Email: corporateList.Email.value,
      CategoryID: categoryID.categoryID ? categoryID.categoryID : 0,
      sRow: 0,
      Length: newSize,
    };

    // Make the API call
    dispatch(SearchCorporateUsersAPI(navigate, data));
  };
  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
    handlePageSizeChange(50);
  }, []);

  useEffect(() => {
    if (getAllCategories !== null) {
      try {
        let newCategoriesData = getAllCategories.categories.map((category) => {
          return {
            ...category,
            value: category.categoryID,
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);
      } catch (error) {}
    }
  }, [getAllCategories]);

  useEffect(() => {
    if (categoryAdded !== null) {
      if (Array.isArray(categoryOptions)) {
        let findCategoryObj = categoryOptions.find(
          (categoryData, index) =>
            categoryData.categoryID === categoryAdded.category.categoryId
        );
        if (findCategoryObj === undefined) {
          let newCategoryhData = {
            ...categoryAdded.category,
            value: categoryAdded.category.categoryId,
            label: categoryAdded.category.category,
          };
          setCategoryOptions([...categoryOptions, newCategoryhData]);
          dispatch(setCategoryAdded(null));
        }
      }
    }
  }, [categoryAdded]);

  useEffect(() => {
    if (categoryUpdated !== null) {
      if (Array.isArray(categoryOptions)) {
        let findCategoryObj = categoryOptions.find(
          (categoryData, index) =>
            categoryData.categoryID === categoryUpdated.category.categoryId
        );
        if (findCategoryObj !== undefined) {
          setCategoryOptions((prevCategoryData) => {
            return prevCategoryData.map((data4, index) => {
              if (data4.categoryID === categoryUpdated.category.categoryId) {
                return {
                  ...data4,
                  value: categoryUpdated.category.categoryId,
                  label: categoryUpdated.category.category,
                };
              }
              return data4;
            });
          });
          console.log(categoryID, "categoryIDcategoryIDcategoryID");
          if (categoryID.value === categoryUpdated.category.categoryId) {
            setCategoryID({
              value: categoryUpdated.category.categoryId,
              label: categoryUpdated.category.category,
            });
          }

          dispatch(setCategoryUpdated(null));
        }
      }
    }
  }, [categoryUpdated]);

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
    if (corporateUserCreated !== null) {
      try {
        const { user, createdUserID, createdDateTime } = corporateUserCreated;
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
          dispatch(setCorporateUserCreated(null));
        }
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateUserCreated]);

  useEffect(() => {
    if (corporateUpdated !== null) {
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
      dispatch(setCorporateUpdated(null));
    }
  }, [corporateUpdated]);

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

  useEffect(() => {
    if (corporateUserUpdated !== null) {
      const { user } = corporateUserUpdated;
      try {
        setTableData((prevTableData) => {
          return prevTableData.map((data, index) => {
            if (data.userID === user.userID) {
              return {
                ...data,
                firstName: user.name,
              };
            }
            return data;
          });
        });
      } catch (err) {
        console.log(err);
      }
      setCorporateUpdated(null);
    }
  }, [corporateUserUpdated]);

  //handle Edit Corporate
  const handleEditCorporate = (record) => {
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
      Length: dropdownvalue,
    };

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
        Length: dropdownvalue,
      };

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
      // render: (email, record) => (
      //   <span
      //     style={{ cursor: "pointer" }}
      //     onClick={() => handleOnClickEmail(record)}
      //   >
      //     {email}
      // </span>
      // ),
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
    {
      title: <label className="px-3">Corporate Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "150px",
      ellipsis: true,
      align: "left",
      render: (val, record) => {
        return <IndexCell value={val} record={record} />;
      },
    },
    {
      title: <label>Status</label>,
      dataIndex: "statusId",
      key: "statusId",
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
      title: <label>last Password Change</label>,
      dataIndex: "passwordModificationTime",
      key: "passwordModificationTime",
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
      title: <label>Create Date Time</label>,
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

    setCorporateList((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.categoryID, value: selectedCategory.value },
    }));
  };
  const exportToExcel = () => {
    console.log("Doc saved as Excel");
    let data = {
      Name: corporateList.Name.value !== "" ? corporateList.Name.value : "",
      CorporateName:
        corporateList.CorporateName.value !== ""
          ? corporateList.CorporateName.value
          : "",
      Email: corporateList.Email.value !== "" ? corporateList.Email.value : "",
      categoryID: categoryID.value !== 0 ? categoryID.value : 0,
    };
    console.log(data, "Doc saved as Excel");
    dispatch(downloadCorporateUserlistReportApi(navigate, data));
  };

  const exportToPDF = () => {
    console.log("Doc saved as Excel");
    let data = {
      Name: corporateList.Name.value !== "" ? corporateList.Name.value : "",
      CorporateName:
        corporateList.CorporateName.value !== ""
          ? corporateList.CorporateName.value
          : "",
      Email: corporateList.Email.value !== "" ? corporateList.Email.value : "",
      categoryID: categoryID.value !== 0 ? categoryID.value : 0,
    };
    console.log(data, "Doc saved as Excel");
    dispatch(downloadPDFCorporateUserReportApi(navigate, data));
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
                  maxLength={50}
                  value={corporateList.Name.value}
                  onChange={CorporateListValidateHandler}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  labelClass={"d-none"}
                  placeholder="Corporate Name"
                  name={"corporateName"}
                  maxLength={50}
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
      {/* {loadingState && <Loader />} */}

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
