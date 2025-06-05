import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  GetBranchesWithStatusAPI,
  GetBranchTradeRightsAPI,
  UpdateBranchStatusAPI,
} from "../../../../../../../store/actions/SetupTradeAccessManagementActions";
import { useNavigate } from "react-router-dom";
import {
  Button,
  CustomSwitch,
  Table,
} from "../../../../../../../components/elements";
import { Col, Row } from "react-bootstrap";
import styles from "./BranchTrade.module.css";
import { useDispatch } from "react-redux";
import EditBranchTradeModal from "./EditBranchTradeModal/EditBranchTradeModal";

const BranchTrade = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  //Table for Branche data
  const [branchTableData, setBranchTableData] = useState([]);

  const [branchInfo, setBranchInfo] = useState(null);

  const GetBranchesWithStatus = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetBranchesWithStatus
  );

  // Add Bank  Use Modal Calling
  const EditTradeAccessManagementModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editModalTradeAccessManagement
  );

  // const GetBranchTradeRights = useSelector(
  //   (state) => state.SetupTradeAccessManagementReducer.GetBranchTradeRights
  // );

  // const handleEditTradeAccessManagementModal = (record) => {
  //   console.log("recordrecord", record);
  //   // let userID = record.counterPartyID;
  //   dispatch(editTradeAccessManagementModalSystemAdmin(true));
  // };

  const handleEditBranchTrade = (record) => {
    setBranchInfo({
      id: record.branchID,
      name: record.branchName,
    });
    let data = { BranchID: record.branchID };
    dispatch(GetBranchTradeRightsAPI(navigate, data));
  };

  const handleToggle = (e, record, columnName) => {
    if (columnName === "isActive") {
      let updatedActiveData = {
        BranchID: record.branchID,
        IsActive: !record.isActive,
        IsTradeActive: record.isTrade,
      };
      dispatch(UpdateBranchStatusAPI(navigate, updatedActiveData));
    } else if (columnName === "isTrade") {
      let updatedTradeData = {
        BranchID: record.branchID,
        IsActive: record.isActive,
        IsTradeActive: !record.isTrade,
      };
      dispatch(UpdateBranchStatusAPI(navigate, updatedTradeData));
    }
  };

  useEffect(() => {
    let data = {
      BranchName: "",
      sRow: 0,
      Length: 10,
    };
    dispatch(GetBranchesWithStatusAPI(navigate, data));
  }, []);

  useEffect(() => {
    if (GetBranchesWithStatus !== null) {
      try {
        const { branches } = GetBranchesWithStatus;
        if (branches.length > 0) {
          setBranchTableData(branches);
        }
      } catch (error) {}
    }
  }, [GetBranchesWithStatus]);

  // useEffect(() => {
  //   if (GetBranchTradeRights !== null) {
  //     setUserData(GetBranchTradeRights);
  //   }
  // }, [GetBranchTradeRights]);
  //Table columns for TradeAccess Management List
  const branchColumns = [
    {
      title: <label className="bottom-table-header">Counter Party Name</label>,
      dataIndex: "branchName",
      key: "branchName",
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
                  icon={<i className="icon-edit"></i>}
                  onClick={() => handleEditBranchTrade(record)}
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
            column={branchColumns}
            pagination={false}
            rows={branchTableData}
            className={"TradeAccessManagement"}
          />
        </Col>
      </Row>
      {EditTradeAccessManagementModalGobalState && (
        <EditBranchTradeModal info={branchInfo} />
      )}
    </>
  );
};

export default BranchTrade;
