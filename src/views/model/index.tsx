import React from "react";
import { Layout } from "antd";
import SiderPage from "./asides/asides";
import HeaderPage from "./header/header";
import MainPage from "./main/mainPage";

const { Footer } = Layout;

const HomePage: React.FC = () => {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* 侧边栏 */}
      <SiderPage />
      <Layout>
        {/* 头部 */}
        <HeaderPage />
        {/* 主体 */}
        <MainPage />
        {/* 底部 */}
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default HomePage;
