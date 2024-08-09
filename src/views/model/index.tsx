import React from "react";
import { Layout } from "antd";
import SiderPage from "./asides/asides";
import HeaderPage from "./header/header";
import MainPage from "./main/mainPage";

const HomePage: React.FC = () => {
  return (
    <Layout style={{ height: "100vh" }}>
      {/* 侧边栏 */}
      <SiderPage />
      <Layout>
        {/* 头部 */}
        <HeaderPage />
        {/* 设置 */}
        {/* <SettingPage /> */}
        {/* 主体 */}
        <MainPage />
      </Layout>
    </Layout>
  );
};

export default HomePage;
