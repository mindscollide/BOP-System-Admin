import React from "react";
import styles from "../SpreadManagement.module.css";
import { Table, TextField } from "../../../../../../components/elements";
import { formatCurrencyInput } from "../../../../../../helpers/reusableMethods";

const CrossRateTable = ({ crossRateData, setCrossRateData }) => {
  const handleCrossRateInputChange = (index, field, value) => {
    // Create a deep copy of the data before modifying
    const updatedData = crossRateData.map((item) => ({ ...item }));
    updatedData[index] = {
      ...updatedData[index],
      [field]: formatCurrencyInput(value),
    };

    setCrossRateData(updatedData);
  };

  const columns = [
    {
      title: <label className="bottom-table-header">Currency</label>,
      dataIndex: "instrumentName",
      key: "instrumentName",
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
        <TextField
          maxLength={5}
          className={styles["InputParitySpot"]}
          value={text}
          onChange={(e) =>
            handleCrossRateInputChange(index, "bidSpread", e.target.value)
          }
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
        <TextField
          className={styles["InputParitySpot"]}
          maxLength={5}
          value={text}
          onChange={(e) =>
            handleCrossRateInputChange(index, "askSpread", e.target.value)
          }
        />
      ),
    },
  ];

  return (
    <Table
      column={columns}
      rows={crossRateData}
      bordered
      pagination={false}
      className={"GrayHeader-table"}
    />
  );
};

export default CrossRateTable;
