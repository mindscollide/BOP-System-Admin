import React, { useState } from "react";
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
  DeleteCorporateModalSystemAdmin,
  EditCorporateModalSystemAdmin,
  UserDetailsCorporateModalSystemAdmin,
} from "../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import DeleteConfirmationModal from "./DeleteConfirmationModal/DeleteConfirmationModal";
import CorporateUserDetailsModal from "./CorporateUserDetailsModal/CorporateUserDetailsModal";

const CorporateList = () => {
  const dispatch = useDispatch();

  //States Corporate List
  const [corporateList, setCorporateList] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },

    CorporateName: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
    Email: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });

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

  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "160px",
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Corporate Name</label>,
      dataIndex: "Corporatename",
      key: "Corporatename",
      width: "120px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "Status",
      key: "Status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: (
        <label className="bottom-table-header">last password Change</label>
      ),
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "150px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Create Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "140px",
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
          <span onClick={handleOnClickEmail}>john.doe@example.com</span>
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
            <Row className="mt-3">
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
                  placeholder="Corporate Name"
                  labelClass={"d-none"}
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
              <Col lg={3} md={3} sm={12}>
                <Select
                  placeholder={"Select Category"}
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col>
              <Col lg={3} md={3} sm={12} className="d-flex gap-2">
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className={styles["CorporateList-btn-Search"]}
                  text="Search"
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Corporatelist-Reset-btn"]}
                  text="Reset"
                  iconClass={styles["resetIconClass"]}
                />
              </Col>
            </Row>

            <Row className="mt-3">
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
    </section>
  );
};

export default CorporateList;
