import React, { useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
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
import { ConfirmationModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions.js";

import ActivateConfirmationModal from "../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal.js";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetAllCategoriesAPI } from "../../../../../store/actions/Auth-Actions.js";

import {
  Button,
  CustomPaper,
  Loader,
} from "../../../../../components/elements";
import {
  GetCrossRateSpreadsForCategoryAPI,
  GetSpotSpreadsForCategoryAPI,
  GetTenorWiseForwardSpreadsForCategoryAPI,
} from "../../../../../store/actions/SpreadManagementActions.js";
import { GetAllInstrumentsAPI } from "../../../../../store/actions/BOPSystemAdminActions.js";
import { GetTenorWiseFEDiscountingSpreadsForCategoryAPI } from "../../../../../store/actions/SetupTradeAccessManagementActions.js";
const SpreadManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingState = useSelector(
    (state) => state.SpreadManagementReducer.Loading
  );

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);
  console.log("getAllCategories", getAllCategories);

  const GetTenorWiseForwardSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseForwardSpreadsForCategory
  );

  const GetTenorWiseFEDiscountingSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseFEDiscountingSpreadsForCategory
  );

  console.log(
    "GetTenorWiseFEDiscountingSpreadsForCategory",
    GetTenorWiseFEDiscountingSpreadsForCategory
  );
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

  // Function to handle input changes in Cross Rate table

  // Function to handle input changes in Discounting table
  const handleDiscountingInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...discountingData];
    updatedData[index][field] = validateValue;
    setDiscountingData(updatedData);
  };

  // Save action placeholder (can be extended to API calls)
  const saveData = (dataType) => {};

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

  const handleResetFEDiscounting = () => {
    setResetOrSaveComponent("resetDiscountingTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };
  const handleResetNonFEDiscounting = () => {
    setResetOrSaveComponent("resetDiscountingTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };
  const handleResetOrSave = () => {
    // if (resetOrSaveComponent === "resetForwardTable") {
    //   setForwardData(resetForwardState);
    // }
    if (resetOrSaveComponent === "resetPartyAndCrossTable") {
      // setCrossRateData(
      //   crossData.map((row) => ({
      //     ...row,
      //     bidSpread: "0.0",
      //     askSpread: "0.0",
      //   }))
      // );
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
    dispatch(GetAllInstrumentsAPI(navigate));
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
    dispatch(
      GetSpotSpreadsForCategoryAPI(navigate, {
        CategoryID: selectedCategory.categoryID,
      })
    );
    dispatch(
      GetCrossRateSpreadsForCategoryAPI(navigate, {
        CategoryID: selectedCategory.categoryID,
      })
    );
    dispatch(
      GetTenorWiseForwardSpreadsForCategoryAPI(navigate, {
        CategoryID: selectedCategory.categoryID,
      })
    );
    dispatch(
      GetTenorWiseFEDiscountingSpreadsForCategoryAPI(navigate, {
        CategoryID: selectedCategory.categoryID,
      })
    );
  };
  return (
    <section className={style["SpreadManagementOverAllStyles"]}>
      <Row className="mt-4">
        <Col lg={6} md={6} sm={12}>
          <span className={style["CategoryManagementLabel"]}>
            Spread Management
          </span>
        </Col>
        <Col lg={3} md={3} sm={12}></Col>
        <Col lg={3} md={3} sm={12}>
          <Select
            // name="category"
            placeholder={"Select Category"}
            classNamePrefix={"selectCateogyCorporateList"}
            options={categoryOptions}
            isSearchable
            value={categoryID.value !== 0 ? categoryID : null}
            onChange={handleSelectCategory}
          />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={12} md={12} sm={12}>
          <CustomPaper className={style["SpreadManagmentPaper"]}>
            <Row>
              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>
                  Against USD (bps)
                </span>
                <ParitySpotTable />
              </Col>

              <Col lg={6} md={6} sm={12}>
                <span className={style["ParitySpotHeading"]}>
                  Against PKR (bps)
                </span>
                <CrossRateTable />
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
                <span className={style["ForwardLabel"]}>Forward (bps)</span>
                <ForwardTable />
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
                  disableBtn={true}
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>

            {/* FE Discounting (%)  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>
                  FE Discounting (%)
                </span>
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
                  onClick={handleResetFEDiscounting}
                  disableBtn={true}
                />
                <Button
                  icon={<i className="icon-save"></i>}
                  className={style["Search-btn-spreadManagement"]}
                  text="Save"
                />
              </Col>
            </Row>

            {/* Non-FE Discounting (%)  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>
                  Non-FE Discounting (%)
                </span>
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
                  onClick={handleResetNonFEDiscounting}
                  disableBtn={true}
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
      {LoadingState && <Loader />}
      {<ActivateConfirmationModal onConfirm={handleResetOrSave} />}
      {/* {<ActivateConfirmationModal onConfirm={handleResetForwardYes} />} */}
    </section>
  );
};

export default SpreadManagement;
