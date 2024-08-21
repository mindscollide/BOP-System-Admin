import React from "react";
import style from "./SpreadManagement.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { Button, CustomPaper, Table } from "../../../../components/elements";
import { Input } from "antd";
const SpreadManagement = () => {
  //Table columns for parity spot
  const ParitySpotcolumns = [
    {
      title: <label className="bottom-table-header">Currency</label>,
      dataIndex: "currency",
      key: "currency",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Bid Spread</label>,
      dataIndex: "bidSpread",
      key: "bidSpread",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Ask Spread</label>,
      dataIndex: "askSpread",
      key: "askSpread",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
  ];

  //Table columns for parity spot
  const CrossRatecolumns = [
    {
      title: <label className="bottom-table-header">Currency</label>,
      dataIndex: "currency",
      key: "currency",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label className="bottom-table-header">Bid Spread</label>,
      dataIndex: "bidSpread",
      key: "bidSpread",
      width: "100px",
      align: "center",
      ellipsis: true,
    },

    {
      title: <label className="bottom-table-header">Ask Spread</label>,
      dataIndex: "askSpread",
      key: "askSpread",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
  ];

  // Dummy data for the table
  const data = [
    {
      key: "1",
      currency: "EUR",
      bidSpread: "3.3",
      askSpread: "3.3",
    },
    {
      key: "1",
      currency: "EUR",
      bidSpread: "3.3",
      askSpread: "3.3",
    },
    {
      key: "1",
      currency: "EUR",
      bidSpread: "3.3",
      askSpread: "3.3",
    },
    {
      key: "1",
      currency: "EUR",
      bidSpread: "3.3",
      askSpread: "3.3",
    },
  ];

  //Forward Table
  const Forwardcolumns = [
    {
      title: "Tenor",
      dataIndex: "tenor",
      key: "tenor",
      fixed: "left",
      align: "center",
      ecllipse: true,
      width: 100,
      render: (text) => {
        return (
          <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "USD",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "usdBid",
          key: "usdBid",
          align: "center",
          width: 100,
          ecllipse: true,

          render: (text) => <Input width={80} value={text} />,
        },
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Ask Spread
              </span>
            </>
          ),
          dataIndex: "usdAsk",
          align: "center",
          key: "usdAsk",
          width: 100,

          render: (text) => <Input width={80} value={text} />,
        },
      ],
    },
    {
      title: "EUR",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "eurBid",
          align: "center",
          key: "eurBid",
          width: 100,

          render: (text) => <Input width={80} value={text} />,
        },
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Ask Spread
              </span>
            </>
          ),
          dataIndex: "eurAsk",
          align: "center",
          key: "eurAsk",
          width: 100,

          render: (text) => <Input width={80} value={text} />,
        },
      ],
    },
    {
      title: "GBP",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "gbpBid",
          key: "gbpBid",
          align: "center",
          width: 100,
          render: (text) => <Input width={80} value={text} />,
        },
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Ask Spread
              </span>
            </>
          ),
          dataIndex: "gbpAsk",
          key: "gbpAsk",
          align: "center",
          width: 100,

          render: (text) => <Input width={80} value={text} />,
        },
      ],
    },
    {
      title: "HKD",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "hkdBid",
          key: "hkdBid",
          align: "center",
          width: 100,
          render: (text) => <Input width={80} value={text} />,
        },
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Ask Spread
              </span>
            </>
          ),
          dataIndex: "hkdAsk",
          width: 100,
          align: "center",
          key: "hkdAsk",
          render: (text) => <Input width={80} value={text} />,
        },
      ],
    },
    {
      title: "JPY",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "jpyBid",
          key: "jpyBid",
          width: 100,
          align: "center",
          render: (text) => <Input width={80} value={text} />,
        },
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Ask Spread
              </span>
            </>
          ),
          dataIndex: "jpyAsk",
          key: "jpyAsk",
          width: 100,
          align: "center",
          ecllipse: true,
          render: (text) => <Input width={80} value={text} />,
        },
      ],
    },
  ];

  //Discounting Table
  const Discountingcolumns = [
    {
      title: "Tenor",
      dataIndex: "tenor",
      key: "tenor",
      fixed: "left",
      align: "center",
      ecllipse: true,
      width: 100,
      render: (text) => {
        return (
          <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
            {text}
          </span>
        );
      },
    },
    {
      title: "USD",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Value
              </span>
            </>
          ),
          dataIndex: "usdBid",
          key: "usdBid",
          align: "center",
          width: 100,
          ecllipse: true,

          render: (text) => (
            <Input
              className={style["InputTableSpreadManagement"]}
              value={text}
            />
          ),
        },
      ],
    },
    {
      title: "EUR",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Value
              </span>
            </>
          ),
          dataIndex: "eurBid",
          align: "center",
          key: "eurBid",
          width: 100,

          render: (text) => (
            <Input
              className={style["InputTableSpreadManagement"]}
              value={text}
            />
          ),
        },
      ],
    },
    {
      title: "GBP",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Value
              </span>
            </>
          ),
          dataIndex: "gbpBid",
          key: "gbpBid",
          align: "center",
          width: 100,
          render: (text) => (
            <Input
              className={style["InputTableSpreadManagement"]}
              value={text}
            />
          ),
        },
      ],
    },
    {
      title: "HKD",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Value
              </span>
            </>
          ),
          dataIndex: "hkdBid",
          key: "hkdBid",
          align: "center",
          width: 100,
          render: (text) => (
            <Input
              className={style["InputTableSpreadManagement"]}
              value={text}
            />
          ),
        },
      ],
    },
    {
      title: "JPY",
      align: "center",
      children: [
        {
          title: (
            <>
              <span style={{ whiteSpace: "nowrap", overflow: "hidden" }}>
                Value
              </span>
            </>
          ),
          dataIndex: "jpyBid",
          key: "jpyBid",
          width: 100,
          align: "center",
          render: (text) => (
            <Input
              className={style["InputTableSpreadManagement"]}
              value={text}
            />
          ),
        },
      ],
    },
  ];

  //Forward Table Dummy Data
  const initialState = [
    {
      key: "1",
      tenor: "1 WEEK",
      usdBid: "10.10",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "2",
      tenor: "3 WEEK",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "3",
      tenor: "1 MONTH",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "4",
      tenor: "3 MONTH",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "5",
      tenor: "6 MONTH",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "6",
      tenor: "9 MONTH",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
    {
      key: "7",
      tenor: "10 MONTH",
      usdBid: "10.00",
      usdAsk: "10.10",
      eurBid: "10.00",
      eurAsk: "10.10",
      gbpBid: "10.00",
      gbpAsk: "10.10",
      hkdBid: "10.00",
      hkdAsk: "10.10",
      jpyBid: "10.00",
      jpyAsk: "10.10",
    },
  ];
  return (
    <section className={style["SpreadManagementOverAllStyles"]}>
      <Row className="mt-4">
        <Col lg={6} md={6} sm={12}>
          <span className={style["CategoryManagementLabel"]}>
            Category Spread Management
          </span>
        </Col>
        <Col lg={3} md={3} sm={12}></Col>
        <Col lg={3} md={3} sm={12}>
          <Select
            name="userStatus"
            placeholder={"Category"}
            classNamePrefix={"CategorySpreadManagement"}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={style["SpreadManagmentPaper"]}>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>Parity Spot</span>
                <Table
                  column={ParitySpotcolumns}
                  bordered
                  rows={data}
                  pagination={false}
                  className={"GrayHeader-table"}
                />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>Cross Rate</span>
                <Table
                  column={CrossRatecolumns}
                  rows={data}
                  bordered
                  pagination={false}
                  className={"GrayHeader-table"}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i class="icon-refresh"></i>}
                  className={style["Reset-btn"]}
                  text="Reset"
                />
                <Button
                  icon={<i class="icon-save"></i>}
                  className={style["Search-btn-BankList"]}
                  text="Save"
                />
              </Col>
            </Row>
            {/* Forward Table  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Forward</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={Forwardcolumns}
                  rows={initialState}
                  bordered
                  pagination={false}
                  prefixCls="groupTable"
                  style={{ overflowX: "auto" }}
                />
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i class="icon-refresh"></i>}
                  className={style["Reset-btn"]}
                  text="Reset"
                />
                <Button
                  icon={<i class="icon-save"></i>}
                  className={style["Search-btn-BankList"]}
                  text="Save"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Discounting</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={Discountingcolumns}
                  rows={initialState}
                  bordered
                  pagination={false}
                  prefixCls="groupTable"
                  style={{ overflowX: "auto" }}
                />
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i class="icon-refresh"></i>}
                  className={style["Reset-btn"]}
                  text="Reset"
                />
                <Button
                  icon={<i class="icon-save"></i>}
                  className={style["Search-btn-BankList"]}
                  text="Save"
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
    </section>
  );
};

export default SpreadManagement;
