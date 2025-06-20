import React, { useCallback, useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import { Button, Table, TextField } from "../../../../../components/elements";
import { useSelector } from "react-redux";
import { Row, Col } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActivateConfirmationModal from "../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { SaveCategoryForwardsAPI } from "../../../../../store/actions/SpreadManagementActions";
import {
  buildForwardsTable,
  convertToForwardSpreads,
} from "../../../../../helpers/generateColumnsData";
import { isValidNumberUnderMax } from "../../../../../helpers/reusableMethods";
import { setForwardSpreadUpdated } from "../../../../../store/actions/RealtimeActions";

const ForwardTable = ({ categoryID }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [modalState, setModalState] = useState(0);
  const [forwardData, setForwardData] = useState([]);
  const [forwardColumns, setForwardColumns] = useState([]);
  const forwardSpreadUpdated = useSelector(
    (state) => state.RealtimeActionReducer.forwardSpreadUpdated
  );

  const GetTenorWiseForwardSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseForwardSpreadsForCategory
  );
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );

  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (GetTenorWiseForwardSpreadsForCategory !== null) {
        try {
          const { forwardSpreads } = GetTenorWiseForwardSpreadsForCategory;

          const { rowData, columnsData } = buildForwardsTable(
            2,
            forwardSpreads,
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeForwards
          );
          if (rowData.length > 0) {
            setForwardData(rowData);
            setForwardColumns(columnsData);
          }
        } catch (error) {
          console.log(error, "Error while building discounting table");
        }
      } else {
        try {
          const { rowData, columnsData } = buildForwardsTable(
            2,
            [],
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeForwards
          );
          if (rowData.length > 0) {
            setForwardData(rowData);
            setForwardColumns(columnsData);
          }
        } catch (error) {}
      }
    }
  }, [GetTenorWiseForwardSpreadsForCategory, GetAllInstruments, GetAllTenors]);

  //Forward Spread Updated
  useEffect(() => {
    if (GetAllInstruments !== null && GetAllTenors !== null) {
      if (forwardSpreadUpdated !== null) {
        try {
          const { categorySpreads } = forwardSpreadUpdated;

          const { rowData, columnsData } = buildForwardsTable(
            2,
            categorySpreads.forwardSpreads,
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeForwards
          );
          if (rowData.length > 0) {
            setForwardData(rowData);
            setForwardColumns(columnsData);
          }
          dispatch(setForwardSpreadUpdated(null));
        } catch (error) {
          console.log(error, "Error while building discounting table");
        }
      }
    }
    dispatch(setForwardSpreadUpdated(null));
  }, [forwardSpreadUpdated, GetAllInstruments, GetAllTenors]);

  const handleChangeForwards = (value, record, columnName, instrumentName) => {
    if (isValidNumberUnderMax(value, "", 1000)) {
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
      setForwardData((prevState) =>
        prevState.map((stateData) => {
          // Match by tenorID
          if (stateData.tenorID !== record.tenorID) return stateData;

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
              [`${columnName}_${instrumentName}`]: sanitizedValue,
            };
          }

          return stateData; // No match
        })
      );
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

  const handleResetForward = () => {
    setConfirmationModal(true);
    setModalState(2);
  };
  const handleSave = () => {
    setConfirmationModal(true);
    setModalState(1);
  };
  const handleConfirmationYes = useCallback(() => {
    try {
      if (modalState === 1) {
        let forWardsData = convertToForwardSpreads(forwardData);
        let data = {
          CategoryID: categoryID,
          ForwardSpreads: forWardsData,
        };
        dispatch(SaveCategoryForwardsAPI(navigate, data));
        setModalState(0);
        setConfirmationModal(false);
      } else if (modalState === 2) {
        setConfirmationModal(false);
        setModalState(0);
        let updatedData = forwardData.map((entry) => {
          const newEntry = { ...entry };

          for (const key in newEntry) {
            if (key.startsWith("bid_") || key.startsWith("ask_")) {
              newEntry[key] = 0;
            }
          }

          return newEntry;
        });
        setForwardData(updatedData);
        // handleResetParityAndCrossYes();
      }
    } catch (error) {}
  }, [forwardData, modalState]);

  return (
    <>
      <Row>
        <Table
          rows={forwardData}
          column={forwardColumns}
          bordered
          pagination={false}
          scroll={{ y: 350, x: "scroll" }}
          prefixCls="groupTable1"
          // className={"GrayHeader-table"}
          // className={"Forward-table"}
        />
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

export default ForwardTable;
