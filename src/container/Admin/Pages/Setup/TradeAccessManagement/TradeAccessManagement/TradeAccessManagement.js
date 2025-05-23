import React, { useEffect, useState } from "react";
import styles from "./TradeAccessManagement.module.css";
import {
  CustomPaper,
  CustomRadio,
  Loader,
  TextField,
} from "../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import { Select } from "antd";
import { useSelector } from "react-redux";
// import CorporateTrade from "./CorporateTradeAccessManagement/CorporateTrade";
import BranchTrade from "./BranchTradeAccessManagement.js/BranchTrade";
import CorporateTrade from "./CorporateTradeAccessManagement/CorporateTrade";
const TradeAccessManagement = () => {
  const { Option } = Select;

  const Loading = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.Loading
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
    console.log("radio checked", e, e.target.value);
    if (e.target.value === "Branch") {
      setBranchName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    } else {
      setCorporateName({
        Name: { value: "", errorMessage: "", errorStatus: false },
      });
    }
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
                ) : radioValue === "Branch" ? (
                  <TextField
                    placeholder="Branch Name"
                    labelClass={"d-none"}
                    name={"branchName"}
                    value={branchName.Name.value}
                    onChange={TradeAccessManagementValidateHandler}
                    className={"BranchNameTradeAccessManagement"}
                  />
                ) : (
                  ""
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
            {radioValue === "Corporate" ? (
              <CorporateTrade />
            ) : radioValue === "Branch" ? (
              <BranchTrade />
            ) : (
              ""
            )}
          </CustomPaper>
        </Col>
      </Row>

      {Loading && <Loader />}
    </section>
  );
};

export default TradeAccessManagement;
