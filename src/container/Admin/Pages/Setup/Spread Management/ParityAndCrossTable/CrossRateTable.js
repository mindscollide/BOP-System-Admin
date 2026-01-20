import React from "react";
import styles from "../SpreadManagement.module.css";
import { Table, TextField } from "../../../../../../components/elements";
import { isValidNumberUnderMax } from "../../../../../../helpers/reusableMethods";

const CrossRateTable = ({ crossRateData, setCrossRateData }) => {
  const handleCrossRateInputChange = (index, field, value) => {
    if (isValidNumberUnderMax(value, "", 1000)) {
      const regular_ex = /^(0\d)$/; // Matches "00", "01", ..., "09"
      const sanitizedValue =
        value === "" || value === "."
          ? "0"
          : regular_ex.test(value)
          ? value.slice(1)
          : // : value === "0.0"
            // ? "0.1"
            value;
      const updatedData = crossRateData.map((item) => ({ ...item }));
      updatedData[index] = {
        ...updatedData[index],
        [field]: sanitizedValue,
      };

      setCrossRateData(updatedData);
    }
    // Create a deep copy of the data before modifying
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
          maxLength={6}
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
          maxLength={6}
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
