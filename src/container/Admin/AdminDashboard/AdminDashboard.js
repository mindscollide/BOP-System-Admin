import React from "react";
import { Outlet } from "react-router-dom";
import Header2 from "../../../components/layout/Header2/Header2";

import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";
import { Layout } from "antd";
import ResponseMessage from "../../../utils/ResponseMessage";

const AdminDashboard = () => {
  const { Content, Sider } = Layout;
  return (
    <>
      <Layout className="mainLayoutContent">
        <Header2 />
        <Layout>
          <Sider width={260}>
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
