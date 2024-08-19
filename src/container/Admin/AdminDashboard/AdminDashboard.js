import React from "react";
import { Outlet } from "react-router-dom";
import Header2 from "../../../components/layout/Header2/Header2";

import Sidebar2 from "../../../components/layout/Sidebar2/Sidebar2";
import { Layout } from "antd";

const AdminDashboard = () => {
  const { Content, Sider } = Layout;
  return (
    <>
      <Layout>
        <Header2 />

        <Layout>
          <Sider width={270}>
            <Sidebar2 />
          </Sider>
          <Content className="w-100 overflow-auto">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </>
  );
};

export default AdminDashboard;
