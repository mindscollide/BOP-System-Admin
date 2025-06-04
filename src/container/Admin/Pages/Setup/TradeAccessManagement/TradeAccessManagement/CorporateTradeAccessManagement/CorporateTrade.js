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

const CorporateTrade = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  //table for corporate
  const [corporateTableData, setCorporateTableData] = useState([]);
  const GetCorporatesWithStatus = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetCorporatesWithStatus
  );

  const Loading = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.Loading
  );
  console.log("Loading", Loading);

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
    console.log(e, record, columnName, "handleTogglehandleToggle");
    if (columnName === "isActive") {
      let updatedActiveData = {
        CorporateID: record.corporateID,
        IsActive: !record.isActive,
        IsTradeActive: record.isTrade,
      };
      console.log("updatedActiveData", updatedActiveData);
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
      Length: 10,
    };
    dispatch(GetCorporatesWithStatusAPI(navigate, data));
  }, []);

  useEffect(() => {
    if (GetCorporatesWithStatus !== null) {
      console.log("GetCorporatesWithStatus", GetCorporatesWithStatus);
      try {
        const { corporates } = GetCorporatesWithStatus;
        if (corporates.length > 0) {
          setCorporateTableData(corporates);
        }
      } catch (error) {}
    }
  }, [GetCorporatesWithStatus]);

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
            // scroll={{ y: 300, x: "scroll" }}
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
