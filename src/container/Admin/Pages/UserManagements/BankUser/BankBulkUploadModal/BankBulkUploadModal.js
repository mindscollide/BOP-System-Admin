import React, { useEffect, useState } from "react";

import styles from "./BankBulkUploadModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { CreateBulkBankUserRequestAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import { Button, Modal, Table } from "../../../../../../components/elements";
import { useBankUser } from "../utils/BankUserContext";
// import { Button, Modal, Table } from "../../../../components/elements";
// import { CreateBulkBankUserRequestAPI } from "../../../../store/actions/BOPSystemAdminActions";

const BankBulkUploadModal = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { BulkUploadClicked, setBulkUploadClicked } = useBankUser();
  const [usersToBeAdded, setUsersToBeAdded] = useState([]);
  const [usersToBeUpdated, setUsersToBeUpdated] = useState([]);
  const [invalidUsers, setInvalidUsers] = useState([]);

  const BankUsersBankList = useSelector(
    (state) => state.BOPSystemAdminReducer.BankUsersBankList
  );

  console.log("BankUsersBankList", BankUsersBankList.usersToBeAdded);

  useEffect(() => {
    if (BankUsersBankList !== null) {
      try {
        const { usersToBeAdded, usersToBeUpdated, invalidUsers } =
          BankUsersBankList;
        if (usersToBeAdded.length > 0) {
          setUsersToBeAdded(usersToBeAdded);
        }
        if (usersToBeUpdated.length > 0) {
          setUsersToBeUpdated(usersToBeUpdated);
        }
        if (invalidUsers.length > 0) {
          setInvalidUsers(invalidUsers);
        }
      } catch (error) {}
    }
  }, [BankUsersBankList]);

  //columns for user to be added
  const newUserToBeAddedColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      align: "center",
    },
    {
      title: "UserRole",
      dataIndex: "userRole",
      key: "userRole",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      align: "center",
      key: "email",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      align: "center",
    },
  ];

  //columns for user to be Updated
  const newUserToBeUpdatedColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      align: "center",
    },
    {
      title: "UserRole",
      dataIndex: "userRole",
      key: "userRole",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      align: "center",
    },
  ];

  //columns for user to be Updated
  const invalidUsersColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "name",
      align: "center",
    },
    {
      title: "UserRole",
      dataIndex: "userRole",
      key: "userRole",
      align: "center",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      align: "center",
    },
    {
      title: "Contact",
      dataIndex: "contactNumber",
      key: "contactNumber",
      align: "center",
    },
  ];
  const handleAddBulkBankUser = () => {
    // e.preventDefault();
    // let bankUserData = "";
    try {
      const transformPayload = {
        UsersToBeAdded: usersToBeAdded.map((user) => ({
          FirstName: user.firstName,
          Email: user.email,
          UserRole: user.userRole.toLowerCase(),
          ContactNumber: user.contactNumber,
          LDAPAccount: user.ldapAccount,
          BranchName: user.branchName,
          EmployeeID: user.employeeID,
        })),
        UsersToBeUpdated: usersToBeUpdated.map((user) => ({
          FirstName: user.firstName,
          Email: user.email,
          UserRole: user.userRole.toLowerCase(),
          ContactNumber: user.contactNumber,
          LDAPAccount: user.ldapAccount,
          BranchName: user.branchName,
          EmployeeID: user.employeeID,
        })),
      };

      console.log("transformPayload", transformPayload);
      dispatch(
        CreateBulkBankUserRequestAPI(
          navigate,
          transformPayload,
          setBulkUploadClicked
        )
      );
    } catch (err) {
      console.log("Error: ", err);
    }
  };
  return (
    <Modal
      show={BulkUploadClicked}
      setShow={setBulkUploadClicked}
      onHide={() => setBulkUploadClicked(false)}
      // className={styles["BulkUpload-modalcontent"]}
      modalContentClassName={styles["BulkUpload-modalcontent"]}
      modalHeaderClassName={"d-none"}
      modalFooterClassName="d-block"
      size="lg"
      ModalBody={
        <>
          {/* Bulk Upload Modal Header */}
          <Row>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={styles["BulkUpload_modal-title"]}
            >
              Bank Users List
            </Col>
            <Col
              sm={6}
              md={6}
              lg={6}
              className={styles["BulkUpload_modal-crossIcon"]}
            >
              <i
                className="icon-close cursor-pointer"
                onClick={() => setBulkUploadClicked(false)}
              />
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={12} md={12} lg={12}>
              <span className={styles["BulkUpload_newusertabletitle"]}>
                New Users to Be Added
              </span>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Table
                column={newUserToBeAddedColumns}
                className={"BulkUpload-table"}
                rows={usersToBeAdded}
                pagination={false}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={12} md={12} lg={12}>
              <span className={styles["BulkUpload_newusertabletitle"]}>
                Users to be Updated
              </span>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Table
                className={"BulkUpload-table"}
                column={newUserToBeUpdatedColumns}
                rows={usersToBeUpdated}
                pagination={false}
              />
            </Col>
          </Row>

          <Row className="mt-3">
            <Col sm={12} md={12} lg={12}>
              <span className={styles["BulkUpload_newusertabletitle"]}>
                Invalid Users/ Users Not Found
              </span>
            </Col>
            <Col sm={12} md={12} lg={12}>
              <Table
                className={"BulkUpload-table"}
                column={invalidUsersColumns}
                rows={invalidUsers}
                pagination={false}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <>
          <Row className="mt-3">
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex justify-content-center gap-2"
            >
              <Button
                size={"lg"}
                icon={<i className="icon-upload-cloud icon-check-space"></i>}
                text="Complete Import"
                className={styles["Complete-btn-BulkUpload"]}
                onClick={handleAddBulkBankUser}
              />
              <Button
                size={"lg"}
                icon={<i className="icon-close icon-check-space"></i>}
                text="Cancel Import"
                onClick={() => setBulkUploadClicked(false)}
                className={styles["Cancel-btn-BulkUpload"]}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default BankBulkUploadModal;
