import React, { useCallback, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import style from "../SpreadManagement.module.css";
import ParitySpotTable from "./ParitySpotTable";
import CrossRateTable from "./CrossRateTable";
import { Button } from "../../../../../../components/elements";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  SaveCategoryCrossRatesAPI,
  SaveCategoryParitySpotAPI,
} from "../../../../../../store/actions/SpreadManagementActions";
import ActivateConfirmationModal from "../../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { ConfirmationModalSystemAdmin } from "../../../../../../store/actions/BOPSystemAdminModalsActions";

const ParityAndCross = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(0);
  const [paritySpotData, setParitySpotData] = useState([]);
  const GetSpotSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetSpotSpreadsForCategory
  );
  const [crossRateData, setCrossRateData] = useState([]);
  const GetCrossRateSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetCrossRateSpreadsForCategory
  );
  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );

  useEffect(() => {
    if (GetSpotSpreadsForCategory !== null) {
      try {
        setParitySpotData(GetSpotSpreadsForCategory.paritySpotSpreads);
      } catch (error) {}
    }
  }, [GetSpotSpreadsForCategory]);

  useEffect(() => {
    if (GetCrossRateSpreadsForCategory !== null) {
      try {
        setCrossRateData(GetCrossRateSpreadsForCategory.crossRatesSpreads);
      } catch (error) {
        console.error("Error setting cross rate data:", error);
      }
    }
  }, [GetCrossRateSpreadsForCategory]);

  const handleSaveParityAndCross = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(1);
    console.log("in this method");
  };
  const handleSaveParityAndCrossYes = useCallback(() => {
    console.log("object");
    try {
      if (modalState === 1) {
        if (paritySpotData || paritySpotData.length > 0) {
          const parityData = {
            CategoryID: categoryID.categoryID || categoryID.value, // Use the selected category
            ParitySpotSpreads: paritySpotData.map((item) => ({
              InstrumentID: item.instrumentID,
              BidSpread: item.bidSpread,
              AskSpread: item.askSpread,
            })),
          };
          console.log("Data to be saved:", parityData);
          dispatch(SaveCategoryParitySpotAPI(navigate, parityData));
        }
        if (crossRateData || crossRateData.length > 0) {
          const crossData = {
            CategoryID: categoryID.categoryID || categoryID.value, // Use the selected category
            CrossRatesSpreads: crossRateData.map((item) => ({
              InstrumentID: item.instrumentID,
              BidSpread: item.bidSpread,
              AskSpread: item.askSpread,
            })),
          };
          dispatch(SaveCategoryCrossRatesAPI(navigate, crossData));
        }
        dispatch(ConfirmationModalSystemAdmin(false));
      } else if (modalState === 2) {
        dispatch(ConfirmationModalSystemAdmin(false));
        setModalState(0);
        handleResetParityAndCrossYes();
      }
    } catch (error) {
      console.log("error in saving Parity or Corss Data: ", error);
    }
  }, [modalState, paritySpotData, crossRateData, showActivationModal]);

  const handleNoButton = useCallback(() => {
    console.log("object");
    if (modalState === 1) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    } else if (modalState === 2) {
      dispatch(ConfirmationModalSystemAdmin(false));
      setModalState(0);
    }
  }, [modalState]);

  const handleResetParityAndCross = () => {
    console.log("object");
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(2);
  };

  const handleResetParityAndCrossYes = () => {
    console.log(paritySpotData, crossRateData, "paritySpotData");
    setCrossRateData((prevData) => {
      return prevData.map((item) => ({
        ...item,
        bidSpread: 0.0,
        askSpread: 0.0,
      }));
    });
    setParitySpotData((prevData) => {
      return prevData.map((item) => ({
        ...item,
        bidSpread: 0.0,
        askSpread: 0.0,
      }));
    });
  };

  console.log("object");
  return (
    <>
      <Row>
        <Col lg={6} md={6} sm={12}>
          <span className={style["ParitySpotHeading"]}>Against USD (bps)</span>
          <ParitySpotTable
            paritySpotData={paritySpotData}
            setParitySpotData={setParitySpotData}
          />
        </Col>

        <Col lg={6} md={6} sm={12}>
          <span className={style["ParitySpotHeading"]}>Against PKR (bps)</span>
          <CrossRateTable
            crossRateData={crossRateData}
            setCrossRateData={setCrossRateData}
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
            onClick={handleSaveParityAndCross}
          />
        </Col>
      </Row>
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleSaveParityAndCrossYes}
          handleNoButton={handleNoButton}
        />
      )}
    </>
  );
};

export default ParityAndCross;
