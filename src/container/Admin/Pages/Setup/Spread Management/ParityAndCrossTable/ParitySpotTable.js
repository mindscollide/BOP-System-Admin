import React from "react";
import styles from "../SpreadManagement.module.css";
import { Table, TextField } from "../../../../../../components/elements";
import { isValidAmount } from "../../../../../../helpers/reusableMethods";

const ParitySpotTable = ({ paritySpotData, setParitySpotData }) => {
  // Function to handle input changes in Parity Spot table
  const handleParitySpotInputChange = (index, field, value) => {
    // let validateValue = value.replace(/[^0-9.]/g, "");

    if (isValidAmount(value)) {
      // Create a deep copy of the array and the specific item being modified
      const updatedData = paritySpotData.map((item, i) => {
        if (i === index) {
          return {
            ...item,
            [field]: value,
          };
        }
        return { ...item };
      });

      setParitySpotData(updatedData);
    }
  };

  const columns = [
    {
      title: <label>Currency</label>,
      dataIndex: "instrumentName",
      key: "instrumentName",
      width: "100px",
      ellipsis: true,
      align: "center",
    },
    {
      title: <label>Bid Spread</label>,
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
            handleParitySpotInputChange(index, "bidSpread", e.target.value)
          }
        />
      ),
    },
    {
      title: <label>Ask Spread</label>,
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
            handleParitySpotInputChange(index, "askSpread", e.target.value)
          }
        />
      ),
    },
  ];

  return (
    <Table
      column={columns}
      rows={paritySpotData}
      bordered
      pagination={false}
      className={"GrayHeader-table"}
    />
  );
};

export default ParitySpotTable;
