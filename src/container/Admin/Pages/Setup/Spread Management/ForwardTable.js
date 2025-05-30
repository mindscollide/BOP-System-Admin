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
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  console.log("GetAllInstrumentsGetAllInstruments", GetAllInstruments);
  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );
  console.log(
    "GetTenorWiseForwardSpreadsForCategory",
    GetTenorWiseForwardSpreadsForCategory?.forwardSpreads
  );

  console.log("GetAllTenors", GetAllTenors?.tenors);
  // Function to handle input changes in Forward table
  const handleForwardInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...forwardData];
    updatedData[index][field] = validateValue;
    setForwardData(updatedData);
  };
  useEffect(() => {
    if (
      GetAllInstruments !== null &&
      GetAllTenors !== null &&
      GetTenorWiseForwardSpreadsForCategory !== null
    ) {
      try {
        console.log(
          {
            GetAllTenors,
            GetAllInstruments,
            GetTenorWiseForwardSpreadsForCategory,
          },
          "GetTenorWiseForwardSpreadsForCategoryGetTenorWiseForwardSpreadsForCategory"
        );
        let tenors = GetAllTenors.tenors;
        let instruments = GetAllInstruments.instruments;
        let forwardSpreadsData =
          GetTenorWiseForwardSpreadsForCategory.forwardSpreads;

        let { forwardsRates } = generateData(
          4,
          tenors,
          instruments,
          forwardSpreadsData
        );
        console.log(forwardsRates, "getDatagetData");
        const columnData = createColumns(forwardsRates, 2);
        setForwardColumns(columnData);
        setForwardData(forwardsRates);
        console.log(columnData, "getDatagetData");

        // setForwardData(GetTenorWiseForwardSpreadsForCategory.forwardSpreads);
      } catch (error) {}
    }
  }, [GetTenorWiseForwardSpreadsForCategory, GetAllInstruments, GetAllTenors]);
  //Forward Table

  console.log({ forwardData, forwardColumns }, "forwardColumnsforwardColumns");

  return (
    <Table
      rows={forwardData}
      column={forwardColumns}
      bordered
      pagination={false}
      scroll={{ y: 200, x: "100%" }}
      prefixCls="groupTable"
      // className={"GrayHeader-table"}
      // className={"Forward-table"}
    />
  );
};

export default ForwardTable;
