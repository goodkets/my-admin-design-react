import React from "react";
import { theme, Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./index.less";
const { Content } = Layout;
const MainPage: React.FC = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <>
      <Content
        className="custom-scrollbar"
        style={{
          margin: "0 0 0 8px",
          height: `calc(100vh - 64px)`,
          overflow: "auto",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            margin: "16px 8px",
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
            overflow: "auto",
          }}
        >
          <Outlet />
        </div>
      </Content>
    </>
  );
};

export default MainPage;
