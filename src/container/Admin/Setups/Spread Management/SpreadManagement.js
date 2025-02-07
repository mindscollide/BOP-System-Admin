import React, { useState } from "react";
import style from "./SpreadManagement.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { Button, CustomPaper, Table } from "../../../../components/elements";
import { categoryOptions } from "../../../../helpers/Dropdown";
// import { categorySpreadManagementSchema } from "../../../../utils/schemas";
import {
  CrossRatecolumns,
  data,
  Discountingcolumns,
  emptyData,
  emptyInitialState,
  Forwardcolumns,
  initialState,
  ParitySpotcolumns,
} from "./SpreadManagementColumns";
import { Input } from "antd";
const SpreadManagement = () => {
  // const [categorySpread, setCategorySpread] = useState({
  //   ...categorySpreadManagementSchema,
  // });
  const defaultCategory = categoryOptions.find(
    (option) => option.value === "Category 1"
  );
  const [category, setCategory] = useState(defaultCategory);
  const [paritySpotData, setParitySpotData] = useState(data);
  const [crossRateData, setCrossRateData] = useState(data);
  const [forwardData, setForwardData] = useState(initialState);
  const [discountingData, setDiscountingData] = useState(initialState);

  // Handle table cell changes
  const handleTableChange = (key, field, value, tableSetter, tableData) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = tableData.map((row) =>
      row.key === key ? { ...row, [field]: validateValue } : row
    );
    tableSetter(updatedData);
  };

  // Reset specific table data
  const resetTableData = (val) => {
    // setter(
    //   initialData.map((row) => ({ ...row, bidSpread: "", askSpread: "" }))
    // );
    if (val === "resetParityAndCross") {
      setParitySpotData(emptyData);
      setCrossRateData(emptyData);
    } else if (val === "resetForward") {
      setForwardData(emptyInitialState);
    } else if (val === "resetDiscounting") {
      setDiscountingData(emptyInitialState);
    }
  };

  // Save action placeholder (can be extended to API calls)
  const saveData = (dataType) => {
    console.log(`Saving data for ${dataType}:`, JSON.stringify(dataType));
  };

  //Handle Select Change
  // A generic function to handle dropdown changes
  const handleDropdownChange = (field, value, setter, userField) => {
    setter(value); // Set the state
    userField.value = value.value || ""; // Update the corporateUser object
  };
  console.log(category);
  return (
    <section className={style["SpreadManagementOverAllStyles"]}>
      <Row className="mt-4">
        <Col lg={6} md={6} sm={12}>
          <span className={style["CategoryManagementLabel"]}>
            Category Spread Management
          </span>
        </Col>
        <Col lg={3} md={3} sm={12}></Col>
        <Col lg={3} md={3} sm={12}>
          <Select
            name="category"
            placeholder={"Select Category"}
            classNamePrefix={"CategorySpreadManagement"}
            options={categoryOptions}
            value={category}
            isSearchable
            onChange={(e) => setCategory(e)}
            className={style["react-select-field"]}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={style["SpreadManagmentPaper"]}>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>Parity Spot</span>
                <Table
                  column={ParitySpotcolumns.map((col) => ({
                    ...col,
                    render:
                      col.dataIndex !== "currency"
                        ? (text, record) => (
                            <Input
                              maxLength={5}
                              style={{ width: "75px" }}
                              value={record[col.dataIndex]}
                              onChange={(e) =>
                                handleTableChange(
                                  record.key,
                                  col.dataIndex,
                                  e.target.value,
                                  setParitySpotData,
                                  paritySpotData
                                )
                              }
                            />
                          )
                        : undefined,
                  }))}
                  bordered
                  rows={paritySpotData}
                  pagination={false}
                  className={"GrayHeader-table"}
                />
              </Col>
              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>Cross Rate</span>
                <Table
                  column={CrossRatecolumns.map((col) => ({
                    ...col,
                    render:
                      col.dataIndex !== "currency"
                        ? (text, record) => (
                            <Input
                              maxLength={5}
                              style={{ width: "75px" }}
                              value={record[col.dataIndex]}
                              onChange={(e) =>
                                handleTableChange(
                                  record.key,
                                  col.dataIndex,
                                  e.target.value,
                                  setCrossRateData,
                                  crossRateData
                                )
                              }
                            />
                          )
                        : undefined,
                  }))}
                  rows={crossRateData}
                  bordered
                  pagination={false}
                  className={"GrayHeader-table"}
                />
              </Col>
            </Row>
            <Row className="mt-3">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i className="icon-refresh"></i>}
                  className={style["Reset-btn-spreadManagement"]}
                  text="Reset"
                  onClick={
                    () => resetTableData("resetParityAndCross")
                    // resetTableData(setCrossRateData, data))
                  }
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>
            {/* Forward Table  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Forward</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={Forwardcolumns.map((col) => ({
                    ...col,
                    render:
                      col.dataIndex !== "currency"
                        ? (text, record) => (
                            <Input
                              maxLength={5}
                              style={{ width: "75px" }}
                              value={record[col.dataIndex]}
                              onChange={(e) =>
                                handleTableChange(
                                  record.key,
                                  col.dataIndex,
                                  e.target.value,
                                  setForwardData,
                                  forwardData
                                )
                              }
                            />
                          )
                        : undefined,
                  }))}
                  rows={forwardData}
                  bordered
                  pagination={false}
                  prefixCls="groupTable"
                />
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i className="icon-refresh"></i>}
                  className={style["Reset-btn-spreadManagement"]}
                  text="Reset"
                  onClick={
                    () => resetTableData("resetForward")
                    // resetTableData(setCrossRateData, data))
                  }
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Discounting</span>
              </Col>
            </Row>
            <Row>
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={Discountingcolumns.map((col) => ({
                    ...col,
                    render:
                      col.dataIndex !== "currency"
                        ? (text, record) => (
                            <Input
                              maxLength={5}
                              style={{ width: "75px" }}
                              value={record[col.dataIndex]}
                              onChange={(e) =>
                                handleTableChange(
                                  record.key,
                                  col.dataIndex,
                                  e.target.value,
                                  setDiscountingData,
                                  discountingData
                                )
                              }
                            />
                          )
                        : undefined,
                  }))}
                  rows={discountingData}
                  bordered
                  pagination={false}
                  prefixCls="groupTable"
                />
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex justify-content-center gap-2"
              >
                <Button
                  icon={<i className="icon-refresh"></i>}
                  className={style["Reset-btn-spreadManagement"]}
                  text="Reset"
                  onClick={
                    () => resetTableData("resetDiscounting")
                    // resetTableData(setCrossRateData, data))
                  }
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
    </section>
  );
};

export default SpreadManagement;
