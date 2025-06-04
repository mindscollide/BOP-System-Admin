import React, { useCallback, useEffect, useState } from "react";
import style from "./SpreadManagement.module.css";
import { Button, Table } from "../../../../../components/elements";
import { useSelector } from "react-redux";
import { createColumns, generateData } from "./testCode";
import { Row, Col } from "react-bootstrap";
import { ConfirmationModalSystemAdmin } from "../../../../../store/actions/BOPSystemAdminModalsActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ActivateConfirmationModal from "../../../../../helpers/Modals/ActivateConfirmationModal/ActivateConfirmationModal";
import { SaveCategoryForwardsAPI } from "../../../../../store/actions/SpreadManagementActions";

const ForwardTable = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modalState, setModalState] = useState(0);
  //state for save and cancel button
  const showActivationModal = useSelector(
    (state) => state.BOPSystemAdminModal.confirmationModal
  );
  const [forwardData, setForwardData] = useState([]);
  const [forwardColumns, setForwardColumns] = useState([]);

  const GetTenorWiseForwardSpreadsForCategory = useSelector(
    (state) =>
      state.SpreadManagementReducer.GetTenorWiseForwardSpreadsForCategory
  );
  const GetAllInstruments = useSelector(
    (state) => state.BOPSystemAdminReducer.GetAllInstruments
  );
  console.log("GetAllInstrumentsGetAllInstruments", GetAllInstruments);
  const GetAllTenors = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetAllTenors
  );
  console.log(
    "GetTenorWiseForwardSpreadsForCategory",
    GetTenorWiseForwardSpreadsForCategory?.forwardSpreads
  );

  console.log("GetAllTenors", GetAllTenors?.tenors);
  // Function to handle input changes in Forward table
  const handleForwardInputChange = (index, field, value) => {
    let validateValue = value.replace(/[^0-9.]/g, "");
    const updatedData = [...forwardData];
    updatedData[index][field] = validateValue;
    setForwardData(updatedData);
  };

  const handleResetForward = () => {
    // setResetOrSaveComponent("resetForwardTable");
    dispatch(ConfirmationModalSystemAdmin(true));
  };
  useEffect(() => {
    if (
      GetAllInstruments !== null &&
      GetAllTenors !== null &&
      GetTenorWiseForwardSpreadsForCategory !== null
    ) {
      try {
        let tenors = GetAllTenors.tenors;
        let instruments = GetAllInstruments.instruments;
        let forwardSpreadsData =
          GetTenorWiseForwardSpreadsForCategory.forwardSpreads;

        let { forwardsRates } = generateData(
          4,
          tenors,
          instruments,
          forwardSpreadsData
        );
        const columnData = createColumns(forwardsRates, 2);
        setForwardColumns(columnData);
        setForwardData(forwardsRates);
      } catch (error) {}
    }
  }, [GetTenorWiseForwardSpreadsForCategory, GetAllInstruments, GetAllTenors]);
  //Forward Table
  const handleSave = () => {
    dispatch(ConfirmationModalSystemAdmin(true));
    setModalState(1);
  };
  const handleSaveYes = useCallback(() => {
    try {
      if (modalState === 1) {
        let data = {
          CategoryID: 5,
          ForwardSpreads: [
            { InstrumentID: 101, TenorID: 1, BidSpread: 0.05, AskSpread: 0.07 },
            { InstrumentID: 102, TenorID: 2, BidSpread: 0.06, AskSpread: 0.08 },
            { InstrumentID: 103, TenorID: 3, BidSpread: 0.07, AskSpread: 0.09 },
          ],
        };
        dispatch(SaveCategoryForwardsAPI(navigate, data));
        dispatch(ConfirmationModalSystemAdmin(false));
      } else if (modalState === 2) {
        dispatch(ConfirmationModalSystemAdmin(false));
        setModalState(0);
        // handleResetParityAndCrossYes();
      }
    } catch (error) {}
  }, [modalState]);

  return (
    <>
      <Table
        rows={forwardData}
        column={forwardColumns}
        bordered
        pagination={false}
        scroll={{ y: 200, x: "100%" }}
        prefixCls="groupTable"
        // className={"GrayHeader-table"}
        // className={"Forward-table"}
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
      {showActivationModal === true && (
        <ActivateConfirmationModal
          handleYesButton={handleSaveYes}
          // handleNoButton={handleNoButton}
        />
      )}
    </>
  );
};

export default ForwardTable;
