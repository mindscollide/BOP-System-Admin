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
import {
  setBranchCreated,
  setBranchStatusUpdated,
  setBranchTradeStatusUpdated,
  setBranchUpdated,
} from "../../../../../../../store/actions/RealtimeActions";

const BranchTrade = ({
  hasReachedBottom,
  setHasReachedBottom,
  branchTableData,
  setBranchTableData,
  setSRow,
  setBranchRecordLength,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const branchCreated = useSelector(
    (state) => state.RealtimeActionReducer.branchCreated
  );
  const branchUpdated = useSelector(
    (state) => state.RealtimeActionReducer.branchUpdated
  );
  const branchStatusUpdated = useSelector(
    (state) => state.RealtimeActionReducer.branchStatusUpdated
  );
  const branchTradeStatusUpdated = useSelector(
    (state) => state.RealtimeActionReducer.branchTradeStatusUpdated
  );

  //Table for Branche data
  // const [branchTableData, setBranchTableData] = useState([]);

  const [branchInfo, setBranchInfo] = useState(null);

  const GetBranchesWithStatus = useSelector(
    (state) => state.SetupTradeAccessManagementReducer.GetBranchesWithStatus
  );

  // Add Bank  Use Modal Calling
  const EditTradeAccessManagementModalGobalState = useSelector(
    (state) => state.BOPSystemAdminModal.editModalTradeAccessManagement
  );

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
      Length: 25,
    };
    dispatch(GetBranchesWithStatusAPI(navigate, data));
  }, []);

  useEffect(() => {
    if (GetBranchesWithStatus !== null) {
      try {
        const { branches, totalRecords } = GetBranchesWithStatus;
        if (hasReachedBottom) {
          setHasReachedBottom(false);
          setBranchRecordLength(totalRecords);
          setBranchTableData([...branchTableData, ...branches]);
          setSRow(branchTableData.length + branches.length);
        } else {
          setHasReachedBottom(false);
          setBranchTableData(branches);
          setBranchRecordLength(totalRecords);
          setSRow(branches.length);
        }
      } catch (error) {}
    } else if (GetBranchesWithStatus === null) {
      if (!hasReachedBottom) {
        setHasReachedBottom(false);
        setBranchTableData([]);
        setBranchRecordLength(0);
        setSRow(0);
      }
    }
  }, [GetBranchesWithStatus]);
  useEffect(() => {
    if (branchCreated !== null) {
      try {
        const { branch } = branchCreated;
        let findIsExist = branchTableData.find(
          (tableRow, index) => tableRow.branchID === branch.branchID
        );
        if (findIsExist === undefined) {
          let newBranch = {
            branchName: branch.branchName,
            branchID: branch.branchID,
            isActive: false,
            isTrade: false,
          };
          setBranchTableData((prevState) => [newBranch, ...prevState]);
        }
        dispatch(setBranchCreated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [branchCreated]);

  useEffect(() => {
    if (branchUpdated !== null) {
      try {
        const { branch } = branchUpdated;
        const updatedBranch = branchTableData.map((item) => {
          if (item.branchID === branch.branchID) {
            return {
              ...item,
              branchName: branch.branchName,
            };
          }
          return item;
        });
        setBranchTableData(updatedBranch);
        dispatch(setBranchUpdated(null));
      } catch (error) {
        console.log(error);
      }
    }
  }, [branchUpdated]);

  useEffect(() => {
    if (branchStatusUpdated !== null) {
      try {
        const updatedTableData = branchTableData.map((branch) => {
          if (branch.branchID === branchStatusUpdated.branchID) {
            return {
              ...branch,
              isActive: branchStatusUpdated.isActive,
            };
          }
          return branch;
        });
        setBranchTableData(updatedTableData);
        dispatch(setBranchStatusUpdated(null));
      } catch (error) {}
    }
  }, [branchStatusUpdated]);

  useEffect(() => {
    if (branchTradeStatusUpdated !== null) {
      try {
        const updatedTableData = branchTableData.map((branch) => {
          if (branch.branchID === branchTradeStatusUpdated.branchID) {
            return {
              ...branch,
              isTrade: branchTradeStatusUpdated.isTrade,
            };
          }
          return branch;
        });
        setBranchTableData(updatedTableData);
        dispatch(setBranchTradeStatusUpdated(null));
      } catch (error) {}
    }
  }, [branchTradeStatusUpdated]);

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
            scroll={{ y: 400, x: "scroll" }}
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
