import React from "react";
import { theme, Layout } from "antd";
import { Outlet } from "react-router-dom";
const { Content } = Layout;
const MainPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Content style={{ margin: "0 16px" }}>
        <div
          style={{
            padding: 24,
            minHeight: 360,
            height: "100vh",
            margin: "16px 0",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </div>
      </Content>
    </>
  );
};

export default MainPage;
