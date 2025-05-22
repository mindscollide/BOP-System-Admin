import React from "react";
import { Input } from "antd";
import { Table } from "../../../../../components/elements";
import "./SpreadManagement.module.css";

const ParitySpotTable = ({ data, onInputChange }) => {
  const columns = [
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
      render: (text, record, index) => (
        <Input
          maxLength={5}
          style={{ width: "60px", textAlign: "center" }}
          className="WidthInputParitySpot"
          value={text}
          onChange={(e) => onInputChange(index, "bidSpread", e.target.value)}
        />
      ),
    },
    {
      title: <label className="bottom-table-header">Ask Spread</label>,
      dataIndex: "askSpread",
      key: "askSpread",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record, index) => (
        <Input
          className="WidthInputParitySpot"
          maxLength={5}
          style={{ width: "60px", textAlign: "center" }}
          value={text}
          onChange={(e) => onInputChange(index, "askSpread", e.target.value)}
        />
      ),
    },
  ];

  return (
    <Table
      column={columns}
      rows={data}
      bordered
      pagination={false}
      className={"GrayHeader-table"}
    />
  );
};

export default ParitySpotTable;
