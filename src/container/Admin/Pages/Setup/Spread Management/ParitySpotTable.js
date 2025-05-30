import React, { useEffect, useState } from "react";
import { Input } from "antd";
import { Table } from "../../../../../components/elements";
import "./SpreadManagement.module.css";
import { useSelector } from "react-redux";

const ParitySpotTable = () => {
  const [paritySpotData, setParitySpotData] = useState([]);

  const GetSpotSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetSpotSpreadsForCategory
  );

  console.log(
    paritySpotData,
    GetSpotSpreadsForCategory,
    "paritySpotDataparitySpotData"
  );

  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );

  // Function to handle input changes in Parity Spot table
  const handleParitySpotInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...paritySpotData];
    updatedData[index][field] = validateValue;
    setParitySpotData(updatedData);
  };
  useEffect(() => {
    if (GetSpotSpreadsForCategory !== null) {
      try {
        setParitySpotData(GetSpotSpreadsForCategory.paritySpotSpreads);
      } catch (error) {}
    }
  }, [GetSpotSpreadsForCategory]);

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
            handleParitySpotInputChange(index, "bidSpread", e.target.value)
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
