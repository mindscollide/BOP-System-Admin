import React, { useEffect, useState } from "react";
import { Input } from "antd";
import "./SpreadManagement.module.css";
import { Table } from "../../../../../components/elements";
import { useSelector } from "react-redux";
import { createColumns, generateData } from "./testCode";

const ForwardTable = () => {
  const [forwardData, setForwardData] = useState([]);
  const [forwardColumns, setForwardColumns] = useState([]);

  const GetTenorWiseForwardSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseForwardSpreadsForCategory
  );
  // Function to handle input changes in Forward table
  const handleForwardInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...forwardData];
    updatedData[index][field] = validateValue;
    setForwardData(updatedData);
  };
  useEffect(() => {
    if (GetTenorWiseForwardSpreadsForCategory !== null) {
      try {
        let { forwardsRates } = generateData(3);
        console.log(forwardsRates, "getDatagetData");
        const columnData = createColumns(forwardsRates, 2);
        setForwardColumns(columnData);
        setForwardData(forwardsRates);
        console.log(columnData, "getDatagetData");

        // setForwardData(GetTenorWiseForwardSpreadsForCategory.forwardSpreads);
      } catch (error) {}
    }
  }, [GetTenorWiseForwardSpreadsForCategory]);
  //Forward Table

  console.log({ forwardData, forwardColumns }, "forwardColumnsforwardColumns");

  return (
    <Table
      rows={forwardData}
      column={forwardColumns}
      bordered
      pagination={false}
      prefixCls="groupTable"
      // className={"GrayHeader-table"}
      className={"Forward-table"}
    />
  );
};

export default ForwardTable;
