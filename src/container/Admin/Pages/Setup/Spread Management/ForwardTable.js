import React from "react";
import { Input } from "antd";
// import { Table } from "../../../../components/elements";
import "./SpreadManagement.module.css";
import { Table } from "../../../../../components/elements";

const ForwardTable = ({ data, onInputChange }) => {
  //Forward Table
  const columns = [
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

          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "usdBid", e.target.value)}
            />
          ),
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

          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "usdAsk", e.target.value)}
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
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "eurBid",
          align: "center",
          key: "eurBid",
          width: 100,

          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "eurBid", e.target.value)}
            />
          ),
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

          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "eurAsk", e.target.value)}
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
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "gbpBid",
          key: "gbpBid",
          align: "center",
          width: 100,
          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "gbpBid", e.target.value)}
            />
          ),
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

          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "gbpAsk", e.target.value)}
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
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "hkdBid",
          key: "hkdBid",
          align: "center",
          width: 100,
          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "hkdBid", e.target.value)}
            />
          ),
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
          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "hkdAsk", e.target.value)}
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
                Bid Spread
              </span>
            </>
          ),
          dataIndex: "jpyBid",
          key: "jpyBid",
          width: 100,
          align: "center",
          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "jpyBid", e.target.value)}
            />
          ),
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
          render: (text, record, index) => (
            <Input
              maxLength={5}
              style={{ width: "60px", textAlign: "center" }}
              value={text}
              onChange={(e) => onInputChange(index, "jpyAsk", e.target.value)}
            />
          ),
        },
      ],
    },
  ];

  return (
    <Table
      column={columns}
      rows={data}
      bordered
      pagination={false}
      prefixCls="groupTable"
    />
  );
};

export default ForwardTable;
