import React, { useEffect } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import Header2 from "../../../components/layout/Header2/Header2";

import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";
import { Layout } from "antd";
import ResponseMessage from "../../../utils/ResponseMessage";
import { useMqttClient } from "../../../commen/functions/mqttConnection";
import { useDispatch } from "react-redux";
import {
  setBankUserCreated,
  setBankUserRoleStatusChange,
  setBankUserUpdated,
  setBlotterTransactionAccepted,
  setBlotterTransactionCancelled,
  setBranchCreated,
  setBranchStatusUpdated,
  setBranchTradeRightsUpdated,
  setBranchTradeStatusUpdated,
  setBranchUpdated,
  setCategoryAdded,
  setCategoryDeleted,
  setCategoryUpdated,
  setCorporateCreated,
  setCorporateStatusUpdated,
  setCorporateTradeRightsUpdated,
  setCorporateTradeStatusUpdated,
  setCorporateUpdated,
  setCorporateUserCreated,
  setCorporateUserRoleStatusChange,
  setCorporateUserUpdated,
  setCounterpartyBranchChanged,
  setCounterpartyChanged,
  setFEDiscountingSpreadUpdated,
  setForwardSpreadUpdated,
  setMarketTimingsUpdated,
  setNonFEDiscountingSpreadUpdated,
  setSpotCrossUpdated,
  setSpotSpreadUpdated,
} from "../../../store/actions/RealtimeActions";
import { Loader } from "../../../components/elements";
import {
  logOutApi,
  setHolidayAdded,
  setHolidayDeleted,
  setHolidayUpdated,
} from "../../../store/actions/Auth-Actions";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { Content, Sider } = Layout;
  const dispatch = useDispatch();
  const { connectToMqtt, isConnected } = useMqttClient({
    onMessageArrivedCallback: (data) => {
      console.log(data, "onMessageArrivedCallbackonMessageArrivedCallback");
      switch (data.payload.message) {
        case "BANK_USER_CREATED":
          console.log("Message arrived:", data);

          // When Security Admin Accepted a Bank User Request
          dispatch(setBankUserCreated(data.payload));
          // setBankUserCreated(data.payload);
          break;
        case "CORPORATE_USER_CREATED":
          console.log("Message arrived:", data);
          dispatch(setCorporateUserCreated(data.payload));

          // When Security Admin Accepted a Corporate User Request
          // setCorporateUserCreated(data.payload);
          break;

        case "CORP_USER_ROLE_STATUS_CHANGE":
          console.log("Message arrived:", data);
          dispatch(setCorporateUserRoleStatusChange(data.payload));

          // When Security Admin Change a Corporate User Role
          // setCorporateUserRoleStatusChange(data.payload);
          break;
        case "BANK_USER_ROLE_STATUS_CHANGE":
          let userID = localStorage.getItem("userID");
          console.log("Message arrived:", data);
          dispatch(setBankUserRoleStatusChange(data.payload));
          console.log(
            Number(data.payload.updatedUser.userID) === Number(userID),
            "setBankUserRoleStatusChange"
          );
          if (Number(data.payload.updatedUser.userID) === Number(userID)) {
            dispatch(logOutApi(navigate));
          }
          // When Security Admin Change a Bank User Role
          // setBankUserRoleStatusChange(data.payload);
          break;
        case "BRANCH_CREATED":
          console.log("Message arrived:", data);
          dispatch(setBranchCreated(data.payload));
          // When System  Admin Created a Branch
          // setBranchCreated(data.payload);
          break;
        case "BRANCH_UPDATED":
          console.log("Message arrived:", data);
          dispatch(setBranchUpdated(data.payload));
          // When System  Admin Updated a Branch
          // setBranchUpdated(data.payload);
          break;
        case "CORPORATE_CREATED":
          console.log("Message arrived:", data);
          dispatch(setCorporateCreated(data.payload));
          // When System  Admin Created a Corporate
          // setCorporateCreated(data.payload);
          break;
        case "CORPORATE_UPDATED":
          console.log("Message arrived:", data);
          dispatch(setCorporateUpdated(data.payload));
          // When System  Admin Updated a Corporate
          // setCorporateUpdated(data.payload);
          break;
        case "BANK_USER_UPDATED":
          console.log("Message arrived:", data);
          dispatch(setBankUserUpdated(data.payload));
          // When System  Admin Updated a Bank User
          break;
        case "CORPORATE_USER_UPDATED":
          console.log("Message arrived:", data);
          dispatch(setCorporateUserUpdated(data.payload));
          // When System  Admin Updated a Corporate User
          // setCorporateUserUpdated(data.payload);
          break;
        case "MARKET_TIME_UPDATED":
          dispatch(setMarketTimingsUpdated(data.payload));
          // setMarketTimingsUpdated(data.payload);
          break;
        // When Category is Added
        case "CATEGORY_ADDED":
          dispatch(setCategoryAdded(data.payload));
          // setCategoryAdded(data.payload);
          break;
        // When Category is Updated
        case "CATEGORY_UPDATED":
          dispatch(setCategoryUpdated(data.payload));
          // setCategoryUpdate(data.payload);
          break;
        // When Category is Deleted
        case "CATEGORY_DELETED":
          dispatch(setCategoryDeleted(data.payload));
          // setCategoryDeleted(data.payload);
          break;
        // When Counter party category is mapped
        case "CORPORATE_CATEGORY_CHANGED":
          dispatch(setCounterpartyChanged(data.payload));
          // setCounterpartyChnaged(data.payload);
          break;
        // When Counter party Branch is mapped
        case "BRANCH_CATEGORY_CHANGED":
          dispatch(setCounterpartyBranchChanged(data.payload));
          break;
        // When Corporate Status is Updated (Active / Trade)
        case "CORPORATE_STATUS_UPDATED":
          dispatch(setCorporateStatusUpdated(data.payload));
          // setCorporateStatusUpdated(data.payload);
          break;
        // When Branch Status is Updated (Active / Trade)
        case "BRANCH_STATUS_UPDATED":
          dispatch(setBranchStatusUpdated(data.payload));
          // setBranchStatusUpdated(data.payload);
          break;
        // When Corporate Trade Status is Updated (Active / Trade)
        case "CORPORATE_TRADE_STATUS_UPDATED":
          dispatch(setCorporateTradeStatusUpdated(data.payload));
          // setCorporateTradeStatusUpdated(data.payload);
          break;
        // When Branch Trade Status is Updated (Active / Trade)
        case "BRANCH_TRADE_STATUS_UPDATED":
          dispatch(setBranchTradeStatusUpdated(data.payload));
          // setBranchTradeStatusUpdated(data.payload);
          break;
        // When Corporate Trade Rights Updated
        case "CORPORATE_TRADE_RIGHTS_UPDATED":
          dispatch(setCorporateTradeRightsUpdated(data.payload));
          // setCorporateTradeRightsUpdated(data.payload);
          break;
        // When Branch Trade Rights Updated
        case "BRANCH_TRADE_RIGHTS_UPDATED":
          dispatch(setBranchTradeRightsUpdated(data.payload));
          // setBranchTradeRightsUpdated(data.payload);
          break;
        // When CATEGORY_PARITY_SPOT_SPREADS
        case "CATEGORY_PARITY_SPOT_SPREADS":
          dispatch(setSpotSpreadUpdated(data.payload));
          // setSpotSpreadUpdated(data.payload);
          break;
        case "CATEGORY_CROSS_RATE_SPREADS":
          dispatch(setSpotCrossUpdated(data.payload));
          // setCrossSpreadUpdated(data.payload);
          break;
        case "CATEGORY_FORWARDS_SPREADS":
          dispatch(setForwardSpreadUpdated(data.payload));
          // setForwardSpreadUpdated(data.payload);
          break;
        case "CATEGORY_FE_DISCOUNTING_SPREADS":
          dispatch(setFEDiscountingSpreadUpdated(data.payload));
          // setFEDiscoutingSpreadUpdated(data.payload);
          break;
        case "CATEGORY_NON_FE_DISCOUNTING_SPREADS":
          dispatch(setNonFEDiscountingSpreadUpdated(data.payload));
          // setNonFEDiscoutingSpreadUpdated(data.payload);
          break;
        case "BLOTTER_TRANSACTION_ACCEPTED":
          dispatch(setBlotterTransactionAccepted(data.payload));
          break;
        case "BLOTTER_TRANSACTION_CANCELLED":
          dispatch(setBlotterTransactionCancelled(data.payload));
          break;
        case "HOLIDAY_CREATED":
          dispatch(setHolidayAdded(data.payload));
          break;
        case "HOLIDAY_UPDATED":
          dispatch(setHolidayUpdated(data.payload));
          break;
        case "HOLIDAY_DELETED":
          dispatch(setHolidayDeleted(data.payload));
          break;
        case "LOGIN":
          console.log("LOGIN event received", data.payload);
          // Handle login event if necessary
          let token = localStorage.getItem("token");
          let userId = localStorage.getItem("userID");
          console.log(
            "LOGIN event received",
            token,
            userId,
            data.payload.loginDetials.token,
            data.payload.loginDetials.userID,
            token !== data.payload.loginDetials.token &&
              Number(userId) === Number(data.payload.loginDetials.userID)
          );

          if (
            token !== data.payload.loginDetials.token &&
            Number(userId) === Number(data.payload.loginDetials.userID)
          ) {
            console.log("LOGIN event received", data.payload);

            // localStorage.clear();
            dispatch(logOutApi(navigate));
          }
          break;
        default:
          break;
      }
    },
  });
  console.log(isConnected, "isConnectedisConnectedisConnected");

  useEffect(() => {
    const subscribeID = "BOP_SYSTEMADMIN";
    let userID = localStorage.getItem("userID");
    connectToMqtt({ subscribeID, userID });
  }, []);
  return (
    <>
      <Layout className="mainLayoutContent">
        <Header2 />
        <Layout>
          <Sider
            style={{ background: "none" }}
            width={284}
          >
            <Sidebar2 />
          </Sider>
          <Content className="w-100 mainContent">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
