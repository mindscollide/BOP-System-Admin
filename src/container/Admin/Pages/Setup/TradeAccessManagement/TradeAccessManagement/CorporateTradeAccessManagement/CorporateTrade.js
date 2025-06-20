import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  GetCorporatesWithStatusAPI,
  GetCorporateTradeRightsAPI,
  UpdateCorporateStatusAPI,
} from "../../../../../../../store/actions/SetupTradeAccessManagementActions";
import {
  Button,
  CustomSwitch,
  Table,
} from "../../../../../../../components/elements";

import styles from "./CorporateTrade.module.css";
import { Col, Row } from "react-bootstrap";
import EditCorporateTradeModal from "./EditCorporateTradeModal/EditCorporateTradeModal";
import {
  setCorporateCreated,
  setCorporateStatusUpdated,
  setCorporateTradeStatusUpdated,
  setCorporateUpdated,
} from "../../../../../../../store/actions/RealtimeActions";

const CorporateTrade = ({
  hasReachedBottom,
  setHasReachedBottom,
  corporateTableData,
  setCorporateTableData,
  setSRow,
  setCorporateRecordLength,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const corporateCreated = useSelector(
    (state) => state.RealtimeActionReducer.corporateCreated
  );
  const corporateUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateUpdated
  );
  const corporateStatusUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateStatusUpdated
  );
  const corporateTradeStatusUpdated = useSelector(
    (state) => state.RealtimeActionReducer.corporateTradeStatusUpdated
  );

  //table for corporate
  // const [corporateTableData, setCorporateTableData] = useState([]);
  const GetCorporatesWithStatus = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetCorporatesWithStatus
  );

  const [corporateInfo, setCorporateInfo] = useState(null);

  const handleEditCorporateTrade = (record) => {
    setCorporateInfo({
      id: record.corporateID,
      name: record.corporateName,
    });
    let data = {
      CorporateID: record.corporateID,
    };
    dispatch(GetCorporateTradeRightsAPI(navigate, data));
  };
  //Add Bank  Use Modal Calling
  const EditTradeAccessManagementModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editModalTradeAccessManagement
  );

  const handleToggle = (e, record, columnName) => {
    console.log(
      { columnName, isActive: record.isActive, isTrade: record.isTrade },
      "columnName"
    );
    if (columnName === "isActive") {
      let updatedActiveData = {
        CorporateID: record.corporateID,
        IsActive: !record.isActive,
        IsTradeActive: record.isTrade,
      };
      dispatch(UpdateCorporateStatusAPI(navigate, updatedActiveData));
    } else if (columnName === "isTrade") {
      let updatedTradeData = {
        CorporateID: record.corporateID,
        IsActive: record.isActive,
        IsTradeActive: !record.isTrade,
      };
      dispatch(UpdateCorporateStatusAPI(navigate, updatedTradeData));
    }
  };

  useEffect(() => {
    let data = {
      CorporateName: "",
      sRow: 0,
      Length: 25,
    };
    dispatch(GetCorporatesWithStatusAPI(navigate, data));
  }, []);

  useEffect(() => {
    if (GetCorporatesWithStatus !== null) {
      try {
        const { corporates, totalRecords } = GetCorporatesWithStatus;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setCorporateRecordLength(totalRecords);
          setCorporateTableData([...corporateTableData, ...corporates]);
          setSRow(corporateTableData.length + corporates.length);
        } else {
          setHasReachedBottom(false);
          setCorporateTableData(corporates);
          setCorporateRecordLength(totalRecords);
          setSRow(corporates.length);
        }
      } catch (error) {}
    } else if (GetCorporatesWithStatus === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setCorporateTableData([]);
        setCorporateRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetCorporatesWithStatus]);

  useEffect(() => {
    if (corporateCreated !== null) {
      try {
        const { corporate } = corporateCreated;
        let findIsExist = corporateTableData.find(
          (tableRow, index) => tableRow.corporateID === corporate.corporateID
        );
        if (findIsExist === undefined) {
          let newCorporate = {
            corporateName: corporate.corporateName,
            corporateID: corporate.corporateID,
          };
          setCorporateTableData((prevState) => [newCorporate, ...prevState]);
        }
        dispatch(setCorporateCreated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateCreated]);

  useEffect(() => {
    if (corporateUpdated !== null) {
      const updatedTableData = corporateTableData.map((corporate) => {
        if (corporate.corporateID === corporateUpdated.corporate.corporateID) {
          return {
            ...corporate,
            corporateName: corporateUpdated.corporate.corporateName,
          };
        }
        return corporate;
      });
      setCorporateTableData(updatedTableData);
      dispatch(setCorporateUpdated(null));
    }
  }, [corporateUpdated]);

  useEffect(() => {
    if (corporateStatusUpdated !== null) {
      try {
        const updatedTableData = corporateTableData.map((corporate) => {
          if (corporate.corporateID === corporateStatusUpdated.corporateID) {
            return {
              ...corporate,
              isActive: corporateStatusUpdated.isActive,
            };
          }
          return corporate;
        });
        setCorporateTableData(updatedTableData);
        dispatch(setCorporateStatusUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateStatusUpdated]);

  useEffect(() => {
    if (corporateTradeStatusUpdated !== null) {
      try {
        const updatedTableData = corporateTableData.map((corporate) => {
          if (
            corporate.corporateID === corporateTradeStatusUpdated.corporateID
          ) {
            return {
              ...corporate,
              isTrade: corporateTradeStatusUpdated.isTrade,
            };
          }
          return corporate;
        });
        setCorporateTableData(updatedTableData);
        dispatch(setCorporateTradeStatusUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [corporateTradeStatusUpdated]);

  //Table columns for TradeAccess Management List
  const corporateColumns = [
    {
      title: <label className="bottom-table-header">Counter Party Name</label>,
      dataIndex: "corporateName",
      key: "corporateName",
      width: "190px",
      ellipsis: true,
      align: "left",
    },
    {
      title: <label className="bottom-table-header">Edit</label>,
      dataIndex: "Edit",
      key: "Edit",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <Row>
              <Col
                lg={12}
                md={12}
                sm={12}
                className="d-flex gap-2 justify-content-center align-items-center"
              >
                <Button
                  className={styles["edit-icon"]}
                  icon={<i className="icon-edit color-blue"></i>}
                  onClick={() => handleEditCorporateTrade(record)}
                />
              </Col>
            </Row>
          </>
        );
      },
    },

    {
      title: <label className="bottom-table-header">Active</label>,
      dataIndex: "isActive",
      key: "isActive",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <CustomSwitch
              size="large"
              checked={record.isActive}
              onChange={(e) => handleToggle(e, record, "isActive")}
            />
          </>
        );
      },
    },

    {
      title: <label className="bottom-table-header">Trade</label>,
      dataIndex: "isTrade",
      key: "isTrade",
      width: "100px",
      ellipsis: true,
      align: "center",
      render: (text, record) => {
        return (
          <>
            <CustomSwitch
              size="large"
              checked={record.isTrade}
              onChange={(e) => handleToggle(e, record, "isTrade")}
            />
          </>
        );
      },
    },
  ];

  return (
    <>
      <Row className="mt-1">
        <Col lg={12} md={12} sm={12}>
          <Table
            column={corporateColumns}
            pagination={false}
            rows={corporateTableData}
            className={"TradeAccessManagement"}
            scroll={{ y: 400, x: "scroll" }}
          />
        </Col>
      </Row>
      {EditTradeAccessManagementModalGobalState && (
        <EditCorporateTradeModal info={corporateInfo} />
      )}
    </>
  );
};

export default CorporateTrade;
