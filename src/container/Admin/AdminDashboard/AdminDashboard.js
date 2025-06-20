import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import Header2 from "../../../components/layout/Header2/Header2";

import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";
import { Layout } from "antd";
import ResponseMessage from "../../../utils/ResponseMessage";
import { useMqttClient } from "../../../commen/functions/mqttConnection";

const AdminDashboard = () => {
  const { Content, Sider } = Layout;
  const { connectToMqtt, isConnected } = useMqttClient({
    onMessageArrivedCallback: (data) => {
      console.log(data, "onMessageArrivedCallbackonMessageArrivedCallback");
    },
  });
  console.log(isConnected, "isConnectedisConnectedisConnected");
  const subscribeID = "BOP_SYSTEMADMIN";
  let userID = localStorage.getItem("userID");

  useEffect(() => {
    connectToMqtt({ subscribeID, userID });
  }, []);
  return (
    <>
      <Layout className="mainLayoutContent">
        <Header2 />
        <Layout>
          <Sider
            style={{ background: "none" }}
            // prefixCls="sideBarNew"
            width={260}
          >
            <Sidebar2 />
          </Sider>
          <Content className="w-100 overflow-auto">
            <Outlet />
          </Content>
        </Layout>
        <ResponseMessage />
      </Layout>
    </>
  );
};

export default AdminDashboard;
