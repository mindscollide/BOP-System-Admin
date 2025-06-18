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
import { useMqtt } from "../../../../../../context/MQTTContext";
const ParityAndCross = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [paritySpotData, setParitySpotData] = useState([]);
  const GetSpotSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetSpotSpreadsForCategory
  );
  const [crossRateData, setCrossRateData] = useState([]);
  const GetCrossRateSpreadsForCategory = useSelector(
    (state) => state.SpreadManagementReducer.GetCrossRateSpreadsForCategory
  );
  console.log(categoryID, "categoryIDcategoryIDcategoryID");

  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  const {
    spotSpreadUpdated,
    setSpotSpreadUpdated,
    spotCrossUpdated,
    setCrossSpreadUpdated,
  } = useMqtt();

  useEffect(() => {
    if (GetSpotSpreadsForCategory !== null && GetAllInstruments !== null) {
      try {
        if (
          GetAllInstruments.instruments &&
          GetAllInstruments.instruments.length > 0
        ) {
          const newDataMapping = GetAllInstruments.instruments.map(
            (instrument) => {
              const matchedInstrument =
                GetSpotSpreadsForCategory.paritySpotSpreads?.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              // If match found, merge the data and set instrumentName
              if (matchedInstrument) {
                return {
                  ...matchedInstrument,
                  instrumentName: instrument.instrumentName,
                };
              }

              // If no match, return default values
              return {
                instrumentID: instrument.instrumentID,
                instrumentName: instrument.instrumentName,
                bidSpread: 0,
                askSpread: 0,
              };
            }
          );
          setParitySpotData(newDataMapping);
        }
      } catch (error) {
        console.error("Error in mapping instrument data:", error);
      }
    }
  }, [GetSpotSpreadsForCategory, GetAllInstruments]);

  useEffect(() => {
    if (spotSpreadUpdated !== null && GetAllInstruments !== null) {
      try {
        if (
          GetAllInstruments.instruments &&
          GetAllInstruments.instruments.length > 0
        ) {
          const newDataMapping = GetAllInstruments.instruments.map(
            (instrument) => {
              const matchedInstrument =
                spotSpreadUpdated.categorySpreads.paritySpotSpreads?.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              // If match found, merge the data and set instrumentName
              if (matchedInstrument) {
                return {
                  ...matchedInstrument,
                  instrumentName: instrument.instrumentName,
                };
              }

              // If no match, return default values
              return {
                instrumentID: instrument.instrumentID,
                instrumentName: instrument.instrumentName,
                bidSpread: 0,
                askSpread: 0,
              };
            }
          );
          setParitySpotData(newDataMapping);
        }
        setSpotSpreadUpdated(null);
      } catch (error) {
        console.error("Error in mapping instrument data:", error);
      }
    }
  }, [spotSpreadUpdated, GetAllInstruments]);

  useEffect(() => {
    if (GetCrossRateSpreadsForCategory !== null && GetAllInstruments !== null) {
      try {
        if (
          GetAllInstruments.instruments &&
          GetAllInstruments.instruments.length > 0
        ) {
          const newDataMapping = GetAllInstruments.instruments.map(
            (instrument) => {
              const matchedInstrument =
                GetCrossRateSpreadsForCategory.crossRatesSpreads?.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              // If match found, merge the data and set instrumentName
              if (matchedInstrument) {
                return {
                  ...matchedInstrument,
                  instrumentName: instrument.instrumentName,
                };
              }

              // If no match, return default values
              return {
                instrumentID: instrument.instrumentID,
                instrumentName: instrument.instrumentName,
                bidSpread: 0,
                askSpread: 0,
              };
            }
          );

          setCrossRateData(newDataMapping);
        }
      } catch (error) {
        console.error("Error setting cross rate data:", error);
      }
    }
  }, [GetCrossRateSpreadsForCategory, GetAllInstruments]);

  //mqtt for cross spread
  useEffect(() => {
    if (spotCrossUpdated !== null && GetAllInstruments !== null) {
      try {
        if (
          GetAllInstruments.instruments &&
          GetAllInstruments.instruments.length > 0
        ) {
          const newDataMapping = GetAllInstruments.instruments.map(
            (instrument) => {
              const matchedInstrument =
                spotCrossUpdated.categorySpreads.crossRatesSpreads?.find(
                  (item) => item.instrumentID === instrument.instrumentID
                );

              // If match found, merge the data and set instrumentName
              if (matchedInstrument) {
                return {
                  ...matchedInstrument,
                  instrumentName: instrument.instrumentName,
                };
              }

              // If no match, return default values
              return {
                instrumentID: instrument.instrumentID,
                instrumentName: instrument.instrumentName,
                bidSpread: 0,
                askSpread: 0,
              };
            }
          );

          setCrossRateData(newDataMapping);
        }
        setCrossSpreadUpdated(null);
      } catch (error) {
        console.error("Error setting cross rate data:", error);
      }
    }
  }, [spotCrossUpdated, GetAllInstruments]);

  const handleSaveParityAndCross = () => {
    setConfirmationModal(true);
    setModalState(1);
  };

  const handleNoButton = useCallback(() => {
    if (modalState === 1) {
      setConfirmationModal(false);
      setModalState(0);
    } else if (modalState === 2) {
      setConfirmationModal(false);
      setModalState(0);
    }
  }, [modalState]);

  const handleResetParityAndCross = () => {
    console.log("handleResetParityAndCross clicked");
    setConfirmationModal(true);
    setModalState(2);
  };

  const handleConfirmationYes = useCallback(() => {
    console.log("reached here");
    console.log(paritySpotData, crossRateData, "paritySpotData");
    if (modalState === 1) {
      if (paritySpotData || paritySpotData.length > 0) {
        const parityData = {
          CategoryID: categoryID, // Use the selected category
          ParitySpotSpreads: paritySpotData.map((item) => ({
            InstrumentID: item.instrumentID,
            BidSpread: Number(item.bidSpread),
            AskSpread: Number(item.askSpread),
          })),
        };
        console.log("parityData Data to be saved:", parityData);
        dispatch(SaveCategoryParitySpotAPI(navigate, parityData));
      }
      if (crossRateData || crossRateData.length > 0) {
        const crossData = {
          CategoryID: categoryID, // Use the selected category
          CrossRatesSpreads: crossRateData.map((item) => ({
            InstrumentID: item.instrumentID,
            BidSpread: Number(item.bidSpread),
            AskSpread: Number(item.askSpread),
          })),
        };
        console.log("crossData Data to be saved:", crossData);

        dispatch(SaveCategoryCrossRatesAPI(navigate, crossData));
      }
      setConfirmationModal(false);
    } else if (modalState === 2) {
      setConfirmationModal(false);

      setModalState(0);
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
    }
  }, [crossRateData, modalState, paritySpotData]);

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

      <Row className="mt-2 mb-5">
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
      {confirmationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleConfirmationYes}
          handleNoButton={handleNoButton}
          show={confirmationModal}
        />
      )}
    </>
  );
};

export default ParityAndCross;
