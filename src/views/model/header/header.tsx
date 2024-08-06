import React, { useState } from "react";
import { Breadcrumb, Layout, theme } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import "./index.less";
import { useDispatch } from "react-redux";
import { setmenuStatus } from "@/store/setting";
const { Header } = Layout;

const HeaderPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();

  // 定义面包屑导航的项
  const breadcrumbItems = [{ title: "User" }, { title: "Bill" }];
  const changeStatus = () => {
    setCollapsed(!collapsed);
    dispatch(setmenuStatus(!collapsed));
  };

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer }}>
        <div className="header">
          <div className="header-left">
            <div
              className="change"
              onClick={() => {
                changeStatus();
              }}
            >
              {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            </div>
            <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} />
          </div>
          <div className="header-right">
            <div className="avatar">123</div>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderPage;
