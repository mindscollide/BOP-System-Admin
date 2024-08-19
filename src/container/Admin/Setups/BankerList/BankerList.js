import React from "react";
import styles from "./BankerList.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";

const BankerList = () => {
  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "email",
      key: "email",
      width: "120px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Role</label>,
      dataIndex: "Corporatename",
      key: "Corporatename",
      width: "60px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Branch Name</label>,
      dataIndex: "Status",
      key: "Status",
      width: "120px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Contact</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "80px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Status</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "70px",
      ellipsis: true,
    },

    {
      title: (
        <label className="bottom-table-header">Last Password Change</label>
      ),
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "170px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Creation Date Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "150px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header"></label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "70px",
      ellipsis: true,
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
            <Row className="mt-3">
              <Col lg={3} md={3} sm={12}>
                <TextField placeholder="Name" labelClass={"d-none"} />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <TextField placeholder="Email" labelClass={"d-none"} />
              </Col>
              <Col lg={3} md={3} sm={12}>
                <Select
                  name="userStatus"
                  placeholder={"Select Category"}
                  classNamePrefix="selectCateogyCorporateList"
                />
              </Col>
              <Col
                lg={3}
                md={3}
                sm={12}
                className={styles["customer-list-col-fields"]}
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  className={styles["Search-btn-BankList"]}
                  text="Search"
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={false}
                  className={"BankUserList-table"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
    </section>
  );
};

export default BankerList;
