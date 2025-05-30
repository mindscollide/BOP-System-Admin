import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./SpreadManagement.module.css";
import { Table } from "../../../../../components/elements";
import { useSelector } from "react-redux";

const CrossRateTable = () => {
  const [crossRateData, setCrossRateData] = useState([]);

  const GetCrossRateSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetCrossRateSpreadsForCategory
  );
  console.log("GetCrossRateSpreadsForCategory", GetCrossRateSpreadsForCategory);
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  const handleCrossRateInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...crossRateData];
    updatedData[index][field] = validateValue;
    setCrossRateData(updatedData);
  };
  useEffect(() => {
    if (GetCrossRateSpreadsForCategory !== null) {
      try {
        setCrossRateData(GetCrossRateSpreadsForCategory.crossRatesSpreads);
      } catch (error) {}
    }
  }, [GetCrossRateSpreadsForCategory]);
  const columns = [
    {
      title: <label className="bottom-table-header">Currency</label>,
      dataIndex: "instrumentID",
      key: "instrumentID",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (val, record) => {
        const matchedInstrument = GetAllInstruments.instruments?.find(
          (instrument) => instrument.instrumentID === val
        );
        console.log("matchedInstrumentmatchedInstrument", matchedInstrument);
        return matchedInstrument ? matchedInstrument.instrumentName : val;
      },
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
        <Input
          className="WidthInputParitySpot"
          maxLength={5}
          style={{ width: "60px", textAlign: "center" }}
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
