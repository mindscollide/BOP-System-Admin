import React, { useState } from "react";
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
import BranchTrade from "./BranchTradeAccessManagement.js/BranchTrade";
import CorporateTrade from "./CorporateTradeAccessManagement/CorporateTrade";
import { useDispatch } from "react-redux";
import {
  GetBranchesWithStatusAPI,
  GetCorporatesWithStatusAPI,
} from "../../../../../../store/actions/SetupTradeAccessManagementActions";
import { useNavigate } from "react-router-dom";
import { useTableScrollBottom } from "../../../../../../helpers/useTableScrollBottom";

const TradeAccessManagement = () => {
  const { Option } = Select;
  const [corporateTableData, setCorporateTableData] = useState([]);
  const [branchTableData, setBranchTableData] = useState([]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [crossIcon, setCrossIcon] = useState(false);

  const Loading = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.Loading
  );

  //row length on scroll
  const [sRow, setSRow] = useState(0);
  const [corporateRecordsLength, setCorporateRecordLength] = useState(0);
  const [branchRecordsLength, setBranchRecordLength] = useState(0);

  //States
  const [radioValue, setRadioValue] = useState("Corporate");
  const [branchName, setBranchName] = useState({
    Name: {
      value: "",
    },
  });
  const [corporateName, setCorporateName] = useState({
    Name: {
      value: "",
    },
  });
  const [dropdownvalue, setDropdownvalue] = useState(50);

  const handleChangeDropDown = (value) => {
    setDropdownvalue(value);
  };

  //Radio Buttons Management
  const handleChange = (e) => {
    if (e.target.value === "Branch") {
      setCrossIcon(false);
      setBranchName({
        Name: { value: "" },
      });
    } else {
      setCrossIcon(false);
      setCorporateName({
        Name: { value: "" },
      });
    }
    setRadioValue(e.target.value);
  };

  //Options for radio
  const radioOptions = [
    { label: "Corporate", value: "Corporate" },
    { label: "Branch", value: "Branch" },
  ];

  const handleEmptySearchState = () => {
    if (radioValue === "Branch") {
      setHasReachedBottom(false);
      setBranchRecordLength(0);
      setSRow(0);
      setBranchTableData([]);
      let data = {
        BranchName: "",
        sRow: 0,
        Length: dropdownvalue,
      };
      dispatch(GetBranchesWithStatusAPI(navigate, data));

      setBranchName({
        Name: {
          value: "",
        },
      });

      setCrossIcon(false);
    } else if (radioValue === "Corporate") {
      setHasReachedBottom(false);
      setCorporateRecordLength(0);
      setSRow(0);
      setCorporateTableData([]);
      let data = {
        CorporateName: "",
        sRow: 0,
        Length: dropdownvalue,
      };
      dispatch(GetCorporatesWithStatusAPI(navigate, data));

      setCorporateName({
        Name: {
          value: "",
        },
      });

      setCrossIcon(false);
    }
  };
  //Custome hook for Scrolling (1)
  const { hasReachedBottom, setHasReachedBottom } = useTableScrollBottom(() => {
    console.log("🚀 Table reached bottom");
    // Load more data here if needed
    if (radioValue === "Corporate") {
      if (corporateRecordsLength !== corporateTableData.length) {
        let data = {
          CorporateName: corporateName.Name.value,
          sRow: sRow,
          Length: dropdownvalue,
        };
        dispatch(GetCorporatesWithStatusAPI(navigate, data));
      }
    } else if (radioValue === "Branch") {
      if (branchRecordsLength !== branchTableData.length) {
        let data = {
          BranchName: branchName.Name.value,
          sRow: sRow,
          Length: dropdownvalue,
        };
        dispatch(GetBranchesWithStatusAPI(navigate, data));
      }
    }
  });
  //Banker List validate handler
  const TradeAccessManagementValidateHandler = (e) => {
    let name = e.target.name;
    let value = e.target.value;

    //Branch Name
    if (name === "branchName" && value !== "") {
      setCorporateName({
        Name: { value: "" },
      });
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setBranchName({
          ...branchName,
          Name: {
            value: valueCheck.trimStart(),
          },
        });
      }
    } else if (name === "branchName" && value === "") {
      setCorporateName({
        Name: { value: "" },
      });
      setBranchName({
        ...branchName,
        Name: { value: "" },
      });
    }
    //Branch Name
    if (name === "corporateName" && value !== "") {
      setBranchName({
        Name: { value: "" },
      });
      let valueCheck = value.replace(/[^a-zA-Z ]/g, "");
      if (valueCheck !== "") {
        setCorporateName({
          ...corporateName,
          Name: {
            value: valueCheck.trimStart(),
          },
        });
      }
    } else if (name === "corporateName" && value === "") {
      setBranchName({
        Name: { value: "" },
      });
      setCorporateName({
        ...corporateName,
        Name: { value: "" },
      });
    }
  };

  // scroll (2)
  const handleBlur = (event) => {
    if (event.key === "Enter") {
      if (radioValue === "Corporate") {
        if (
          corporateName.Name.value.length >= 3 ||
          corporateName.Name.value.length === 0
        ) {
          if (corporateName.Name.value.length === 0) {
            setCrossIcon(false);
          }
          if (corporateName.Name.value.length >= 3) {
            setCrossIcon(true);
          }
          setSRow(0);
          setHasReachedBottom(false);
          setCorporateTableData([]);
          setCorporateRecordLength(0);
          let data = {
            CorporateName: corporateName.Name.value
              ? corporateName.Name.value
              : "",
            sRow: 0,
            Length: dropdownvalue,
          };

          dispatch(GetCorporatesWithStatusAPI(navigate, data));
        }
      } else {
        if (
          branchName.Name.value.length >= 3 ||
          branchName.Name.value.length === 0
        ) {
          if (branchName.Name.value.length === 0) {
            setCrossIcon(false);
          }
          if (branchName.Name.value.length >= 3) {
            setCrossIcon(true);
          }
          setSRow(0);
          setHasReachedBottom(false);
          setBranchTableData([]);
          setBranchRecordLength(0);
          let data = {
            BranchName: branchName.Name.value ? branchName.Name.value : "",
            sRow: 0,
            Length: dropdownvalue,
          };
          dispatch(GetBranchesWithStatusAPI(navigate, data));
        }
      }
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
                    formParentClass={
                      "BranchNameTradeAccessManagement_inputSearchBar"
                    }
                    placeholder="Corporate Name"
                    labelClass={"d-none"}
                    name={"corporateName"}
                    value={corporateName.Name.value}
                    onChange={TradeAccessManagementValidateHandler}
                    handleKeyDown={handleBlur}
                    inputIcon={
                      crossIcon ? (
                        <i
                          className="icon-close"
                          onClick={handleEmptySearchState}
                        />
                      ) : (
                        ""
                      )
                    }
                    iconClassName={
                      styles["BranchNameTradeAccessManagement_inputSearchIcon"]
                    }
                    className={
                      styles["BranchNameTradeAccessManagement_inputSearch"]
                    }
                  />
                ) : radioValue === "Branch" ? (
                  <TextField
                    formParentClass={
                      "BranchNameTradeAccessManagement_inputSearchBar"
                    }
                    placeholder="Branch Name"
                    labelClass={"d-none"}
                    name={"branchName"}
                    value={branchName.Name.value}
                    onChange={TradeAccessManagementValidateHandler}
                    handleKeyDown={handleBlur}
                    inputIcon={
                      crossIcon ? (
                        <i
                          className="icon-close"
                          onClick={handleEmptySearchState}
                        />
                      ) : (
                        ""
                      )
                    }
                    iconClassName={
                      styles["BranchNameTradeAccessManagement_inputSearchIcon"]
                    }
                    className={
                      styles["BranchNameTradeAccessManagement_inputSearch"]
                    }
                  />
                ) : (
                  ""
                )}
              </Col>
            </Row>
            {/* <Row className="mt-3">
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
            </Row> */}
            {radioValue === "Corporate" ? (
              <CorporateTrade
                hasReachedBottom={hasReachedBottom}
                setHasReachedBottom={setHasReachedBottom}
                corporateTableData={corporateTableData}
                setCorporateTableData={setCorporateTableData}
                setSRow={setSRow}
                setCorporateRecordLength={setCorporateRecordLength}
                setDropdownvalue={setDropdownvalue}
                dropdownvalue={dropdownvalue}
              />
            ) : radioValue === "Branch" ? (
              <BranchTrade
                hasReachedBottom={hasReachedBottom}
                setHasReachedBottom={setHasReachedBottom}
                branchTableData={branchTableData}
                setBranchTableData={setBranchTableData}
                setSRow={setSRow}
                setBranchRecordLength={setBranchRecordLength}
                setDropdownvalue={setDropdownvalue}
                dropdownvalue={dropdownvalue}
              />
            ) : (
              ""
            )}
          </CustomPaper>
        </Col>
      </Row>

      {/* {Loading && <Loader />} */}
    </section>
  );
};

export default TradeAccessManagement;
