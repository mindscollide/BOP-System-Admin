import React from "react";
import styles from "./LoginHistory.module.css";
import DatePicker from "react-multi-date-picker";
import { Col, Row } from "react-bootstrap";
import {
  CustomPaper,
  TextField,
  Button,
  Table,
} from "../../../../components/elements";

const LoginHistory = () => {
  //Table columns for customer List
  const columns = [
    {
      title: <label className="bottom-table-header">Email</label>,
      dataIndex: "Email",
      key: "Email",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Name</label>,
      dataIndex: "Name",
      key: "Name",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Counter party Name</label>,
      dataIndex: "CounterpartyName",
      key: "CounterpartyName",
      width: "119px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">IP Address</label>,
      dataIndex: "Status",
      key: "Status",
      width: "100px",
      align: "center",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged In Time</label>,
      dataIndex: "LastPassowrdChange",
      key: "LastPassowrdChange",
      align: "center",
      width: "120px",
      ellipsis: true,
    },
    {
      title: <label className="bottom-table-header">Logged Out Time</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "120px",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Total Span</label>,
      dataIndex: "creationDateTime",
      key: "creationDateTime",
      align: "center",
      width: "130px",
      ellipsis: true,
    },
  ];
  return (
    <section className={styles["SectionContainer"]}>
      <Row className="mt-4">
        <Col lg={12} md={12} sm={12}>
          <span className={styles["customer-List-label"]}>
            Customer Login History
          </span>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row className="mt-3">
              <Col lg={2} md={2} sm={12}>
                <TextField placeholder="Name" labelClass={"d-none"} />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField
                  placeholder="Counter Party Name"
                  labelClass={"d-none"}
                />
              </Col>
              <Col lg={2} md={2} sm={12}>
                <TextField placeholder="Email" labelClass={"d-none"} />
              </Col>
              <Col
                lg={4}
                md={4}
                sm={12}
                className="d-flex align-items-center  pe-4"
              >
                <DatePicker
                  placeholder="Start date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-left"]}
                />
                <label className={styles["Tradecount-date-to"]}>to</label>

                <DatePicker
                  placeholder="End Date"
                  showOtherDays={true}
                  inputClass={styles["Tradecount-Datepicker-right"]}
                />
              </Col>
            </Row>

            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-1"
              >
                <Button
                  icon={<i className="icon-search icon-check-space"></i>}
                  text="Search"
                  className={styles["SearchButton_loginHistory"]}
                />
                <Button
                  icon={<i className="icon-refresh icon-check-space"></i>}
                  className={styles["Banklist-Reset-btn"]}
                  text="Reset"
                />

                <Button
                  icon={<i class="icon-download-excel"></i>}
                  className={styles["Download-button"]}
                  text="Download Excel"
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

export default LoginHistory;
