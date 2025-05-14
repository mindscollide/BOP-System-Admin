import React, { useEffect, useState } from "react";
import styles from "./TradeAccessManagement.module.css";
import {
  Button,
  CustomPaper,
  CustomRadio,
  CustomSwitch,
  Table,
  TextField,
} from "../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import { useSelector } from "react-redux";
// import EditModalTradeAccessManagement from "./EditModalTradeAccessManagement/EditModalTradeAccessManagement";
import { useDispatch } from "react-redux";
// import { editTradeAccessManagementModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions";
// import { tradeAccessManagementSchema } from "../../../../utils/schemas";
import { useNavigate } from "react-router-dom";
import { editTradeAccessManagementModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";
import { GetCounterPartyListAPI } from "../../../../../../store/actions/BOPSystemAdminActions";
import EditModalTradeAccessManagement from "../EditModalTradeAccessManagement/EditModalTradeAccessManagement";
const TradeAccessManagement = () => {
  const { Option } = Select;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [tableData, setTableData] = useState([]);

  //getcounterPartyNames API calling
  const GetCounterPartyList = useSelector(
    (state) => state.BOPSystemAdminReducer.GetCounterPartyList
  );

  console.log("GetCounterPartyList", GetCounterPartyList);

  console.log(GetCounterPartyList);

  //Add Bank  Use Modal Calling
  const EditTradeAccessManagementModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editModalTradeAccessManagement
  );
  //States
  const [radioValue, setRadioValue] = useState("Corporate");
  const [branchName, setBranchName] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  const [corporateName, setCorporateName] = useState({
    Name: {
      value: "",
      errorMessage: "",
      errorStatus: false,
    },
  });
  const [dropdownvalue, setDropdownvalue] = useState(25);

  const handleChangeDropDown = (value) => {
    console.log(`selected ${value}`);
    setDropdownvalue(value);
  };

  //Radio Buttons Management
  const handleChange = (e) => {
    console.log("radio checked", e.target.value);
    setRadioValue(e.target.value);
  };

  //Options for radio
  const radioOptions = [
    { label: "Corporate", value: "Corporate" },
    { label: "Branch", value: "Branch" },
  ];

  //Banker List validate handler
  const TradeAccessManagementValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //Branch Name
    if (name === "branchName" && value !== "") {
      setCorporateName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setBranchName({
          ...branchName,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "branchName" && value === "") {
      setCorporateName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
      setBranchName({
        ...branchName,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
    //Branch Name
    if (name === "corporateName" && value !== "") {
      setBranchName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setCorporateName({
          ...corporateName,
          Name: {
            value: valueCheck.trimStart(),
            errorMessage: "",
            errorStatus: false,
          },
        });
      }
    } else if (name === "corporateName" && value === "") {
      setBranchName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
      setCorporateName({
        ...corporateName,
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  };
  useEffect(() => {
    dispatch(GetCounterPartyListAPI(navigate));
  }, []);

  //useEffect to empty fields value on radio Change
  useEffect(() => {
    if (radioValue === "Branch") {
      setCorporateName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    } else if (radioValue === "Corporate") {
      setBranchName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
  }, [radioValue]);

  //to show data in the table
  useEffect(() => {
    if (GetCounterPartyList !== null) {
      console.log("GetCounterPartyList", GetCounterPartyList);
      try {
        const { counterPartyLists } = GetCounterPartyList;
        if (counterPartyLists.length > 0) {
          setTableData(GetCounterPartyList.counterPartyLists);
        }
      } catch (error) {}
    }
  }, [GetCounterPartyList]);

  //Handle Edit Trade Access managment Modal

  const handleEditTradeAccessManagementModal = (record) => {
    console.log("record", record);
    let userID = record.counterPartyID;

    dispatch(editTradeAccessManagementModalSystemAdmin(true));
  };

  //Table columns for TradeAccess Management List
  const columns = [
    {
      title: <label className="bottom-table-header">Counter Party Name</label>,
      dataIndex: "counterPartyName",
      key: "counterPartyName",
      width: "190px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "Edit",
      key: "Edit",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["edit-icon"]}
                  icon={<i className="icon-edit color-blue"></i>}
                  onClick={() => handleEditTradeAccessManagementModal(record)}
                />
              </Col>
            </Row>
          </>
        );
      },
    },

    {
      title: <label className="bottom-table-header">Active</label>,
      dataIndex: "isActive",
      key: "isActive",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <CustomSwitch
              size="large"
              checked={record.isActive}
              // onChange={(e) => handleToggle(e, record)}
            />
          </>
        );
      },
    },
    //  Active: (
    //     <>
    //     <CustomSwitch size="large" defaultChecked />
    //   </>
    // ),

    {
      title: <label className="bottom-table-header">Trade</label>,
      dataIndex: "isTrade",
      key: "isTrade",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <CustomSwitch
              size="large"
              checked={record.isTrade}
              // onChange={(e) => handleToggle(e, record)}
            />
          </>
        );
      },
    },
  ];

  //Dummy Data Source
  const dataSource = [
    {
      key: "1",

      CounterPartyName: "Atlas Honda",
      Edit: (
        <>
          <Row>
            <Col
              lg={12}
              md={12}
              sm={12}
              className="d-flex gap-2 justify-content-center align-items-center"
            >
              <Button
                className={styles["edit-icon"]}
                icon={<i className="icon-edit color-blue"></i>}
                onClick={handleEditTradeAccessManagementModal}
              />
            </Col>
          </Row>
        </>
      ),
      Active: (
        <>
          <CustomSwitch size="large" defaultChecked />
        </>
      ),
      Trade: (
        <>
          <CustomSwitch size="large" defaultChecked />
        </>
      ),
    },
  ];

  return (
    <section className={styles["TradeAccessmangementStyles"]}>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={styles["customer-List-paper"]}>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-3 align-items-center"
              >
                <CustomRadio
                  options={radioOptions}
                  onChange={handleChange}
                  value={radioValue}
                  name="customRadio"
                  size="default"
                  className={styles["custom-radio-group"]}
                />
                {radioValue === "Corporate" ? (
                  <TextField
                    placeholder="Corporate Name"
                    labelClass={"d-none"}
                    name={"corporateName"}
                    value={corporateName.Name.value}
                    onChange={TradeAccessManagementValidateHandler}
                    className={"BranchNameTradeAccessManagement"}
                  />
                ) : (
                  <TextField
                    placeholder="Branch Name"
                    labelClass={"d-none"}
                    name={"branchName"}
                    value={branchName.Name.value}
                    onChange={TradeAccessManagementValidateHandler}
                    className={"BranchNameTradeAccessManagement"}
                  />
                )}
              </Col>
            </Row>
            <Row className="mt-4">
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-1 align-items-center"
              >
                <span className={styles["spanshowClass"]}>Show</span>

                <Select
                  defaultValue={dropdownvalue}
                  style={{ width: 60, margin: "0 10px" }}
                  onChange={handleChangeDropDown}
                >
                  <Option value={10}>10</Option>
                  <Option value={25}>25</Option>
                  <Option value={50}>50</Option>
                  <Option value={100}>100</Option>
                </Select>

                <span className={styles["spanshowClass"]}>entries</span>
              </Col>
            </Row>
            <Row className="mt-1">
              <Col lg={12} md={12} sm={12}>
                <Table
                  column={columns}
                  pagination={true}
                  rows={tableData}
                  className={"TradeAccessManagement"}
                />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {EditTradeAccessManagementModalGobalState && (
        <EditModalTradeAccessManagement />
      )}
    </section>
  );
};

export default TradeAccessManagement;
