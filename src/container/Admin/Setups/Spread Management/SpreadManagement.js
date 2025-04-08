import React, { useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import { Button, CustomPaper } from "../../../../components/elements";
// import { categoryOptions } from "../../../../helpers/Dropdown";
import {
  crossData,
  initialDiscountingState,
  initialForwardState,
  parityData,
} from "./SpreadManagementColumns";
import ParitySpotTable from "./ParitySpotTable";
import CrossRateTable from "./CrossRateTable.js";
import ForwardTable from "./ForwardTable.js";
import DiscountingTable from "./DiscountingTable.js";
import { useDispatch } from "react-redux";
import { ConfirmationModalSystemAdmin } from "../../../../store/actions/BOPSystemAdminModalsActions.js";
import ActivateConfirmationModal from "../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetAllCategoriesAPI } from "../../../../store/actions/Auth-Actions.js";
import { SpreadManagementSchema } from "../../../../utils/schemas.js";
const SpreadManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  // const [category, setCategory] = useState(defaultCategory);
  const [paritySpotData, setParitySpotData] = useState(parityData);
  const [crossRateData, setCrossRateData] = useState(crossData);
  const [forwardData, setForwardData] = useState(initialForwardState);
  const [discountingData, setDiscountingData] = useState(
    initialDiscountingState
  );
  const [resetOrSaveComponent, setResetOrSaveComponent] = useState("");
  const [categoryOptions, setCategoryOptions] = useState([]);
  //State for dropdown
  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });
  // Function to handle input changes in Parity Spot table
  const handleParitySpotInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...paritySpotData];
    updatedData[index][field] = validateValue;
    setParitySpotData(updatedData);
  };
  // Function to handle input changes in Cross Rate table
  const handleCrossRateInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...crossRateData];
    updatedData[index][field] = validateValue;
    setCrossRateData(updatedData);
  };

  // Function to handle input changes in Forward table
  const handleForwardInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...forwardData];
    updatedData[index][field] = validateValue;
    setForwardData(updatedData);
  };

  // Function to handle input changes in Discounting table
  const handleDiscountingInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...discountingData];
    updatedData[index][field] = validateValue;
    setDiscountingData(updatedData);
  };

  // Save action placeholder (can be extended to API calls)
  const saveData = (dataType) => {
    // console.log(`Saving data for ${dataType}:`, JSON.stringify(dataType));
    console.log(
      `Saving data for Parity Data: ${paritySpotData}:`,
      JSON.stringify(paritySpotData),

      `Saving data for Cross Data: ${crossRateData}:`,
      JSON.stringify(crossRateData)
    );
  };

  //reset Parity and Cross Rate to 0.0
  const handleResetParityAndCross = () => {
    setResetOrSaveComponent("resetPartyAndCrossTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleSaveParityAndCross = () => {
    setResetOrSaveComponent("savePartyAndCrossTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleResetForward = () => {
    setResetOrSaveComponent("resetForwardTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleResetDiscounting = () => {
    setResetOrSaveComponent("resetDiscountingTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };

  const handleResetOrSave = () => {
    if (resetOrSaveComponent === "resetForwardTable") {
      setForwardData(resetForwardState);
    }
    if (resetOrSaveComponent === "resetPartyAndCrossTable") {
      setParitySpotData(
        parityData.map((row) => ({
          ...row,
          bidSpread: "0.0",
          askSpread: "0.0",
        }))
      );
      setCrossRateData(
        crossData.map((row) => ({
          ...row,
          bidSpread: "0.0",
          askSpread: "0.0",
        }))
      );
    }
    if (resetOrSaveComponent === "resetDiscountingTable") {
      setDiscountingData(resetDiscountingState);
    }
    if (resetOrSaveComponent === "savePartyAndCrossTable") {
      console.log("here i am now");
      saveData();
    }
  };
  //Reset Discouting Table to 0
  const resetDiscountingState = initialDiscountingState.map((row) => ({
    ...row,
    usdBid: "0.0",
    usdAsk: "0.0",
    eurBid: "0.0",
    eurAsk: "0.0",
    gbpBid: "0.0",
    gbpAsk: "0.0",
    hkdBid: "0.0",
    hkdAsk: "0.0",
    jpyBid: "0.0",
    jpyAsk: "0.0",
  }));

  //Reset Forward Table to 0
  const resetForwardState = initialForwardState.map((row) => ({
    ...row,
    usdBid: "0.0",
    usdAsk: "0.0",
    eurBid: "0.0",
    eurAsk: "0.0",
    gbpBid: "0.0",
    gbpAsk: "0.0",
    hkdBid: "0.0",
    hkdAsk: "0.0",
    jpyBid: "0.0",
    jpyAsk: "0.0",
  }));
  // useEffect(() => {}, [resetTableData]);

  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
  }, []);
  useEffect(() => {
    if (getAllCategories !== null) {
      try {
        let newCategoriesData = getAllCategories.categories.map((category) => {
          return {
            ...category,
            value: { value: category.categoryID },
            label: category.categoryName,
          };
        });
        setCategoryOptions(newCategoriesData);
      } catch (error) {}
    }
  }, [getAllCategories]);
  //handle select CategoryID
  const handleSelectCategory = async (selectedCategory) => {
    setCategoryID(selectedCategory);

    SpreadManagementSchema((prevState) => ({
      ...prevState,
      categoryID: { ...prevState.categoryID, value: selectedCategory.value },
    }));
  };
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
            isSearchable
            value={categoryID.value !== 0 ? categoryID : null}
            onChange={handleSelectCategory}
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
                <ParitySpotTable
                  data={paritySpotData}
                  onInputChange={handleParitySpotInputChange}
                />
              </Col>

              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>Cross Rate</span>
                <CrossRateTable
                  data={crossRateData}
                  onInputChange={handleCrossRateInputChange}
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
                  onClick={handleResetParityAndCross}
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                  // onClick={() => saveData()}
                  onClick={handleSaveParityAndCross}
                />
              </Col>
            </Row>

            {/* Forward Table  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Forward</span>
                <ForwardTable
                  data={forwardData}
                  onInputChange={handleForwardInputChange}
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
                  onClick={handleResetForward}
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>

            {/* Discounting Table  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Discounting</span>
                <DiscountingTable
                  data={discountingData}
                  onInputChange={handleDiscountingInputChange}
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
                  // onClick={() => setDiscountingData(resetDiscountingState)}
                  onClick={handleResetDiscounting}
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
      {<ActivateConfirmationModal onConfirm={handleResetOrSave} />}
      {/* {<ActivateConfirmationModal onConfirm={handleResetForwardYes} />} */}
    </section>
  );
};

export default SpreadManagement;
