import React from "react";
import { Input } from "antd";
import { Table } from "../../../../components/elements";
import "./SpreadManagement.module.css";

const DiscountingTable = ({ data, onInputChange }) => {
  //Discounting Table
  const columns = [
    {
      // title: "Tenor",
      title: <label className="bottom-table-header">Tenor</label>,
      dataIndex: "tenor",
      key: "tenor",
      align: "left",
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
          title: <label className="bottom-table-header">Value</label>,
          dataIndex: "usdBid",
          key: "usdBid",
          align: "center",
          width: 100,
          ecllipse: true,

          render: (text, record, index) => (
            <Input
              classNames={"InputTableSpreadManagement"}
              style={{ width: "60px", textAlign: "center" }}
              maxLength={5}
              value={text}
              onChange={(e) => onInputChange(index, "usdBid", e.target.value)}
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
          title: <label className="bottom-table-header">Value</label>,
          dataIndex: "eurBid",
          align: "center",
          key: "eurBid",
          width: 100,

          render: (text, record, index) => (
            <Input
              classNames={"InputTableSpreadManagement"}
              style={{ width: "60px", textAlign: "center" }}
              maxLength={5}
              value={text}
              onChange={(e) => onInputChange(index, "eurBid", e.target.value)}
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
          title: <label className="bottom-table-header">Value</label>,
          dataIndex: "gbpBid",
          key: "gbpBid",
          align: "center",
          width: 100,
          render: (text, record, index) => (
            <Input
              classNames={"InputTableSpreadManagement"}
              style={{ width: "60px", textAlign: "center" }}
              maxLength={5}
              value={text}
              onChange={(e) => onInputChange(index, "gbpBid", e.target.value)}
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
          title: <label className="bottom-table-header">Value</label>,
          dataIndex: "hkdBid",
          key: "hkdBid",
          align: "center",
          width: 100,
          render: (text, record, index) => (
            <Input
              classNames={"InputTableSpreadManagement"}
              style={{ width: "60px", textAlign: "center" }}
              maxLength={5}
              value={text}
              onChange={(e) => onInputChange(index, "hkdBid", e.target.value)}
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
          render: (text, record, index) => (
            <Input
              classNames={"InputTableSpreadManagement"}
              style={{ width: "60px", textAlign: "center" }}
              maxLength={5}
              value={text}
              onChange={(e) => onInputChange(index, "jpyBid", e.target.value)}
            />
          ),
        },
      ],
    },
  ];
  return (
    <>
      <Table
        column={columns}
        rows={data}
        bordered
        pagination={false}
        prefixCls="groupTable"
      />
    </>
  );
};

export default DiscountingTable;
