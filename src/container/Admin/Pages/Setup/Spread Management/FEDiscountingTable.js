import React, { useCallback, useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import { Button, Table, TextField } from "../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import ActivateConfirmationModal from "../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { useSelector } from "react-redux";
import {
  buildDiscountingTable,
  convertToDicountSpreads,
} from "../../../../../helpers/generateColumnsData";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { SaveCategoryFEDiscountsAPI } from "../../../../../store/actions/SpreadManagementActions";
import { isValidNumberUnderMax } from "../../../../../helpers/reusableMethods";
import { setFEDiscountingSpreadUpdated } from "../../../../../store/actions/RealtimeActions";

const FEDiscountingTable = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [FEDiscoutingData, setFEDiscoutingData] = useState([]);
  const [FEDiscoutingColumns, setFEDiscoutingColumns] = useState([]);

  const GetTenorWiseFEDiscountingSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseFEDiscountingSpreadsForCategory
  );

  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );

  console.log(GetAllInstruments, "GetAllInstrumentsGetAllInstruments");

  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );

  const FEDiscoutingSpreadUpdated = useSelector(
    (state) => state.RealtimeActionReducer.FEDiscountingSpreadUpdated
  );
  // console.log("FEDiscoutingSpreadUpdated", FEDiscoutingSpreadUpdated);

  const handleChangeDiscounting = (value, record, instrumentName) => {
    if (isValidNumberUnderMax(value, "", 100)) {
      const regular_ex = /^(0\d)$/; // Matches "00", "01", ..., "09"
      const sanitizedValue =
        value === "" || value === "."
          ? "0"
          : regular_ex.test(value)
          ? value.slice(1)
          : value === "0.0"
          ? "0.1"
          : // Remove leading "0" (e.g., "09" → "9")
            value;
      setFEDiscoutingData((prevState) =>
        prevState.map((stateData) => {
          // Match by tenorID
          console.log(stateData, "stateData.tenorID");
          if (stateData.TenorID !== record.TenorID) return stateData;
          // Loop through instrument name keys in the object
          const instrumentMatched = Object.keys(stateData).find((key) => {
            // Find keys like InstrumentName_XXX
            if (key.startsWith("InstrumentName_")) {
              return stateData[key] === instrumentName;
            }
            return false;
          });
          if (instrumentMatched) {
            return {
              ...stateData,
              [`rate_${instrumentName}`]: sanitizedValue,
            };
          }
          return stateData; // No match
        })
      );
    }
  };

  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (GetTenorWiseFEDiscountingSpreadsForCategory !== null) {
        try {
          const filteredInstruments = {
            ...GetAllInstruments,
            instruments: GetAllInstruments.instruments.filter(
              (instrument) => instrument.instrumentID !== 21
            ),
          };
          console.log(
            { filteredInstruments, GetAllInstruments },
            "filteredInstrumentsfilteredInstruments"
          );
          const { feDiscountingSpreads } =
            GetTenorWiseFEDiscountingSpreadsForCategory;
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            feDiscountingSpreads,
            GetAllTenors,
            filteredInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);
          setFEDiscoutingData(rowData);
        } catch (error) {}
      } else {
        try {
          const filteredInstruments = {
            ...GetAllInstruments,
            instruments: GetAllInstruments.instruments.filter(
              (instrument) => instrument.instrumentID !== 21
            ),
          };
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            [],
            GetAllTenors,
            filteredInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);
          setFEDiscoutingData(rowData);
        } catch (error) {}
      }
    }
  }, [
    GetTenorWiseFEDiscountingSpreadsForCategory,
    GetAllInstruments,
    GetAllTenors,
  ]);

  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (FEDiscoutingSpreadUpdated !== null) {
        console.log("FEDiscoutingSpreadUpdated", FEDiscoutingSpreadUpdated);
        try {
          console.log("FEDiscoutingSpreadUpdated", FEDiscoutingSpreadUpdated);

          const {
            categorySpreads: { discountingSpreads },
          } = FEDiscoutingSpreadUpdated;
          console.log("FEDiscoutingSpreadUpdated", discountingSpreads);
          const filteredInstruments = {
            ...GetAllInstruments,
            instruments: GetAllInstruments.instruments.filter(
              (instrument) => instrument.instrumentID !== 21
            ),
          };
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            discountingSpreads,
            GetAllTenors,
            filteredInstruments,
            TextField,
            handleChangeDiscounting
          );
          console.log("FEDiscoutingSpreadUpdated", rowData, columnsData);

          setFEDiscoutingColumns(columnsData);
          setFEDiscoutingData(rowData);
        } catch (error) {
          console.log(error);
        }
      }
      dispatch(setFEDiscountingSpreadUpdated(null));
    }
  }, [FEDiscoutingSpreadUpdated, GetAllInstruments, GetAllTenors]);

  const handleResetForward = () => {
    setConfirmationModal(true);
    setModalState(2);
  };

  const handleSave = () => {
    setConfirmationModal(true);
    setModalState(1);
  };

  const handleConfirmationYes = () => {
    if (modalState === 1) {
      const filteredInstruments = {
        ...GetAllInstruments,
        instruments: GetAllInstruments.instruments.filter(
          (instrument) => instrument.instrumentID !== 21
        ),
      };
      let updatedDiscounts = convertToDicountSpreads(
        FEDiscoutingData,
        filteredInstruments.instruments
      );
      let data = {
        CategoryID: categoryID,
        DiscountingSpreads: updatedDiscounts,
      };
      dispatch(SaveCategoryFEDiscountsAPI(navigate, data));

      console.log(data, "SaveCategoryFEDiscountsAPISaveCategoryFEDiscountsAPI");
      setConfirmationModal(false);
      setModalState(0);
    } else if (modalState === 2) {
      setConfirmationModal(false);
      setModalState(0);
      let updatedData = FEDiscoutingData.map((entry) => {
        const newEntry = { ...entry };

        for (const key in newEntry) {
          if (key.startsWith("rate_")) {
            newEntry[key] = 0;
          }
        }
        return newEntry;
      });
      setFEDiscoutingData(updatedData);
    }
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
  return (
    <>
      <Table
        column={FEDiscoutingColumns}
        rows={FEDiscoutingData}
        bordered
        pagination={false}
        scroll={{ y: 350, x: "100%" }}
        prefixCls="groupTable1"
      />
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
            onClick={handleSave}
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

export default FEDiscountingTable;
