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
import { SaveCategoryNonFEDiscountsAPI } from "../../../../../store/actions/SpreadManagementActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { isValidNumberUnderMax } from "../../../../../helpers/reusableMethods";
import { setNonFEDiscountingSpreadUpdated } from "../../../../../store/actions/RealtimeActions";

const NonFEDiscountingTable = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [NonFEDiscoutingData, setNonFEDiscoutingData] = useState([]);
  const [FEDiscoutingColumns, setFEDiscoutingColumns] = useState([]);

  const GetTenorWiseNonFEDiscountingSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer
        .GetTenorWiseNonFEDiscountingSpreadsForCategory
  );
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );

  const NonFEDiscoutingSpreadUpdated = useSelector(
    (state) => state.RealtimeActionReducer.NonFEDiscountingSpreadUpdated
  );

  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (GetTenorWiseNonFEDiscountingSpreadsForCategory !== null) {
        try {
          const { nonFEDiscountingSpreads } =
            GetTenorWiseNonFEDiscountingSpreadsForCategory;
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            nonFEDiscountingSpreads,
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);

          setNonFEDiscoutingData(rowData);
        } catch (error) {}
      } else {
        try {
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            [],
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);

          setNonFEDiscoutingData(rowData);
        } catch (error) {}
      }
    }
  }, [
    GetTenorWiseNonFEDiscountingSpreadsForCategory,
    GetAllInstruments,
    GetAllTenors,
  ]);

  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (NonFEDiscoutingSpreadUpdated !== null) {
        try {
          const {
            categorySpreads: { discountingSpreads },
          } = NonFEDiscoutingSpreadUpdated;
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            discountingSpreads,
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);

          setNonFEDiscoutingData(rowData);
          dispatch(setNonFEDiscountingSpreadUpdated(null));
        } catch (error) {}
      }
    }
  }, [NonFEDiscoutingSpreadUpdated, GetAllInstruments, GetAllTenors]);

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
      setNonFEDiscoutingData((prevState) =>
        prevState.map((stateData) => {
          // Match by tenorID
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
      let updatedDiscounts = convertToDicountSpreads(
        NonFEDiscoutingData,
        GetAllInstruments.instruments
      );
      let data = {
        CategoryID: categoryID,
        DiscountingSpreads: updatedDiscounts,
      };
      dispatch(SaveCategoryNonFEDiscountsAPI(navigate, data));
      setConfirmationModal(false);
      setModalState(0);
    } else if (modalState === 2) {
      setConfirmationModal(false);
      setModalState(0);
      let updatedData = NonFEDiscoutingData.map((entry) => {
        const newEntry = { ...entry };

        for (const key in newEntry) {
          if (key.startsWith("rate_")) {
            newEntry[key] = 0;
          }
        }
        return newEntry;
      });
      setNonFEDiscoutingData(updatedData);
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
        rows={NonFEDiscoutingData}
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

export default NonFEDiscountingTable;
