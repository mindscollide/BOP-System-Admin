import React, { useEffect, useState } from "react";

import styles from "./CorporateBulkUploadModal.module.css";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Table } from "../../../../components/elements";
import { CreateBulkCorporateUserRequestAPI } from "../../../../store/actions/BOPSystemAdminActions";

const CorporateBulkUploadModal = ({
  BulkUploadClicked,
  setBulkUploadClicked,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [usersToBeAdded, setUsersToBeAdded] = useState([]);
  const [usersToBeUpdated, setUsersToBeUpdated] = useState([]);
  const [invalidUsers, setInvalidUsers] = useState([]);

  // const BankUsersBankList = useSelector(
  //   (state) => state.BOPSystemAdminReducer.BankUsersBankList
  // );

  const CorporateUsersBulkList = useSelector(
    (state) => state.BOPSystemAdminReducer.CorporateUsersBulkListData
  );

  console.log("CorporateUsersBulkList", CorporateUsersBulkList);

  useEffect(() => {
    if (CorporateUsersBulkList !== null) {
      try {
        const { usersToBeAdded, usersToBeUpdated, invalidUsers } =
          CorporateUsersBulkList;
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
  }, [CorporateUsersBulkList]);

  const newUserToBeAddedColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "CorporateName",
      dataIndex: "corporateName",
      align: "center",
      key: "corporateName",
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
  const newUserToBeUpdatedColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "CorporateName",
      dataIndex: "corporateName",
      align: "center",
      key: "corporateName",
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
  const invalidUsersColumns = [
    {
      title: "Name",
      dataIndex: "firstName",
      key: "firstName",
      align: "center",
    },
    {
      title: "CorporateName",
      dataIndex: "corporateName",
      align: "center",
      key: "corporateName",
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
  const handleAddBulkCorporateUser = () => {
    try {
      const transformedPayload = {
        UsersToBeAdded: usersToBeAdded.map((user) => ({
          FirstName: user.firstName,
          Email: user.email,
          UserRole: user.userRole.toLowerCase(),
          ContactNumber: user.contactNumber,
          CorporateName: user.corporateName,
          IsChatActive: user.isChatActive,
        })),
        UsersToBeUpdated: usersToBeUpdated.map((user) => ({
          FirstName: user.firstName,
          Email: user.email,
          UserRole: user.userRole.toLowerCase(),
          ContactNumber: user.contactNumber,
          CorporateName: user.corporateName,
          IsChatActive: user.isChatActive,
        })),
      };
      console.log("transformedPayload", transformedPayload);
      dispatch(
        CreateBulkCorporateUserRequestAPI(
          navigate,
          transformedPayload,
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
              Corporate Users List
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
                New Customers to Be Added
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
                Customers to be Updated
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
                onClick={handleAddBulkCorporateUser}
              />
              <Button
                size={"lg"}
                icon={<i className="icon-close icon-check-space"></i>}
                text="Cancel Import"
                className={styles["Cancel-btn-BulkUpload"]}
                onClick={() => setBulkUploadClicked(false)}
              />
            </Col>
          </Row>
        </>
      }
    />
  );
};

export default CorporateBulkUploadModal;
