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
import { isValidNumberUnder100 } from "../../../../../helpers/reusableMethods";

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

  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );

  const handleChangeDiscounting = (value, record, instrumentName) => {
    if (isValidNumberUnder100(value)) {
      const sanitizedValue = value === "" || value === "." ? "0" : value;
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
          const { feDiscountingSpreads } =
            GetTenorWiseFEDiscountingSpreadsForCategory;
          const { rowData, columnsData } = buildDiscountingTable(
            2,
            feDiscountingSpreads,
            GetAllTenors,
            GetAllInstruments,
            TextField,
            handleChangeDiscounting
          );
          setFEDiscoutingColumns(columnsData);
          setFEDiscoutingData(rowData);
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
          setFEDiscoutingData(rowData);
        } catch (error) {}
      }
    }
  }, [
    GetTenorWiseFEDiscountingSpreadsForCategory,
    GetAllInstruments,
    GetAllTenors,
  ]);

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
        FEDiscoutingData,
        GetAllInstruments.instruments
      );
      let data = {
        CategoryID: categoryID,
        DiscountingSpreads: updatedDiscounts,
      };
      dispatch(SaveCategoryFEDiscountsAPI(navigate, data));
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
