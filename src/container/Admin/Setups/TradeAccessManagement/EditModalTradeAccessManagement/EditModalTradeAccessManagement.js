import React from "react";
import styles from "./EditModalTradeAccessManagement.module.css";
import { useDispatch } from "react-redux";
import Select from "react-select";
import { useSelector } from "react-redux";
import { editTradeAccessManagementModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import { Col, Row } from "react-bootstrap";
import {
  Button,
  Modal,
  Table,
  TextField,
} from "../../../../../components/elements";
const EditModalTradeAccessManagement = () => {
  const dispatch = useDispatch();
  const { BOPSystemAdminModal } = useSelector((state) => state);

  //handle No Button
  const handleNoButton = () => {
    dispatch(editTradeAccessManagementModalSystemAdmin(false));
  };

  const columns = [
    {
      title: "Instrument",
      key: "Instrument",
      dataIndex: "currentBid",
      align: "center",
    },
    {
      title: "CrossRate",
      key: "CrossRate",
      children: [
        {
          title: "Bid",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () => {},
        },
        {
          title: "Offer",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () => {},
        },
      ],
    },
    {
      title: "Parity",
      key: "Parity",
      children: [
        {
          title: "Bid",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () => {},
        },
        {
          title: "Offer",
          dataIndex: "currentBid",
          key: "currentBid",
          align: "center",
          render: () => {},
        },
      ],
    },
    {
      title: "Forward",
      key: "Forward",
      dataIndex: "Forward",
      align: "center",
    },
    {
      title: "Discounting",
      key: "Discounting",
      dataIndex: "Discounting",
      align: "center",
    },
    {
      title: "Active",
      key: "Active",
      dataIndex: "Active",
      align: "center",
    },
    {
      title: "Hide",
      key: "Hide",
      dataIndex: "Hide",
      align: "center",
    },
  ];
  return (
    <Modal
      show={BOPSystemAdminModal.editModalTradeAccessManagement}
      setShow={(value) =>
        dispatch(editTradeAccessManagementModalSystemAdmin(value))
      }
      className="UniversalBOPModalStylesTradeAccessManagment"
      modalHeaderClassName={"d-none"}
      modalFooterClassName="UniversalBOPModalStylesfooter"
      size="xl"
      onHide={() => dispatch(editTradeAccessManagementModalSystemAdmin(false))}
      ModalBody={
        <>
          <Row>
            <Col lg={12} md={12} sm={12}>
              <span className={styles["HeaderNameLabel"]}>Gulahmed</span>
            </Col>
          </Row>
          <Row>
            <Col lg={2} md={2} sm={12}></Col>
            <Col lg={8} md={8} sm={12}>
              <Row>
                <Col lg={6} md={6} sm={6}>
                  <span className={styles["labels-add-bank"]}>
                    Total Limit (PKR)
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <TextField name={"firstName"} labelClass="d-none" />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <span className={styles["labels-add-bank"]}>
                    Instrument allowed
                    <span className={styles["aesterick-color"]}>*</span>
                  </span>
                  <Select />
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={12} md={12} sm={12}>
                  <span className={styles["labels-add-bank"]}>
                    Default Transaction Amount Limit (Min-Max)
                  </span>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"firstName"}
                    labelClass="d-none"
                    placeholder={"Min Amount"}
                  />
                </Col>
                <Col lg={6} md={6} sm={6}>
                  <TextField
                    name={"firstName"}
                    labelClass="d-none"
                    placeholder={"Max Amount"}
                  />
                </Col>
              </Row>
            </Col>
            <Col lg={2} md={2} sm={12}></Col>
          </Row>
          <Row className="mt-3">
            <Col lg={12} md={12} sm={12}>
              <Table
                column={columns}
                pagination={true}
                // rows={dataSource}
                className={"TradeAccessManagement"}
              />
            </Col>
          </Row>
        </>
      }
      ModalFooter={
        <Row className="mb-3">
          <Col
            lg={12}
            md={12}
            sm={12}
            className="d-flex justify-content-center gap-2"
          >
            <Button
              icon={<i class="icon-refresh"></i>}
              text={"Save Changes"}
              className={styles["AddBranchClass"]}
              iconClass={styles["IconClass"]}
            />

            <Button
              icon={<i class="icon-close"></i>}
              text={"Cancel"}
              className={styles["CancelButton"]}
              iconClass={styles["IconClass"]}
              onClick={handleNoButton}
            />
          </Col>
        </Row>
      }
    />
  );
};

export default EditModalTradeAccessManagement;
