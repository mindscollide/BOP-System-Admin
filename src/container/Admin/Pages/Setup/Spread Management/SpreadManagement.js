import React, { useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import Select from "react-select";
import { Col, Row } from "react-bootstrap";
import ForwardTable from "./ForwardTable.js";
import { useDispatch } from "react-redux";

import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { GetAllCategoriesAPI } from "../../../../../store/actions/Auth-Actions.js";

import { CustomPaper, Loader } from "../../../../../components/elements";
import {
  GetCrossRateSpreadsForCategoryAPI,
  GetSpotSpreadsForCategoryAPI,
  GetTenorWiseForwardSpreadsForCategoryAPI,
  GetAllTenorsAPI,
  GetTenorWiseFEDiscountingSpreadsForCategoryAPI,
  GetTenorWiseNonFEDiscountingSpreadsForCategoryAPI,
} from "../../../../../store/actions/SpreadManagementActions.js";
import { GetAllInstrumentsAPI } from "../../../../../store/actions/BOPSystemAdminActions.js";
import FEDiscountingTable from "./FEDiscountingTable.js";
import ParityAndCross from "./ParityAndCrossTable/ParityAndCrossTable.js";
import NonFEDiscountingTable from "./NonFEDiscountingTable.js";
const SpreadManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const LoadingState = useSelector(
    (state) => state.SpreadManagementReducer.Loading
  );
  const LoadingTradeState = useSelector((state) => state.uploadReducer.Loading);
  console.log(LoadingTradeState, "LoadingTradeState");
  const LoadingCategoryState = useSelector((state) => state.auth.Loading);
  console.log(LoadingCategoryState, "LoadingCategoryDtate");

  const getAllCategories = useSelector((state) => state.auth.getAllCategories);

  const [categoryOptions, setCategoryOptions] = useState([]);
  //State for dropdown
  const [categoryID, setCategoryID] = useState({
    value: 0,
    label: "",
  });

  useEffect(() => {
    dispatch(GetAllCategoriesAPI(navigate));
    dispatch(GetAllInstrumentsAPI(navigate));
    dispatch(GetAllTenorsAPI(navigate));
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
        if (newCategoriesData.length > 0) {
          setCategoryID({
            label: newCategoriesData[0].categoryName,
            value: newCategoriesData[0].categoryID,
          });
          handleSelectCategory(newCategoriesData[0]);
        }
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
    dispatch(
      GetTenorWiseNonFEDiscountingSpreadsForCategoryAPI(navigate, {
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
            <ParityAndCross categoryID={categoryID.categoryID} />

            {/* Forward Table  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>Forward (bps)</span>
                <ForwardTable categoryID={categoryID.categoryID} />
              </Col>
            </Row>

            {/* FE Discounting (%)  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>
                  FE Discounting (%)
                </span>
                <FEDiscountingTable categoryID={categoryID.categoryID} />
              </Col>
            </Row>

            {/* Non-FE Discounting (%)  */}
            <Row>
              <Col lg={12} md={12} sm={12}>
                <span className={style["ForwardLabel"]}>
                  Non-FE Discounting (%)
                </span>
                <NonFEDiscountingTable categoryID={categoryID.categoryID} />
              </Col>
            </Row>
          </CustomPaper>
        </Col>
      </Row>
      {(LoadingCategoryState && <Loader />) ||
        (LoadingState && <Loader />) ||
        (LoadingTradeState && <Loader />)}
    </section>
  );
};

export default SpreadManagement;
