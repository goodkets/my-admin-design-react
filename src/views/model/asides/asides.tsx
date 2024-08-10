import { Menu, Layout } from "antd";
import {
  PieChartOutlined,
  HomeOutlined,
  ContainerOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginName from "@/assets/images/logo.png";
import nameWhite from "@/assets/images/name_white.png";
import "./index.less";
import { useSelector } from "react-redux";
import { MenuInfo } from "rc-menu/lib/interface";
type MenuItem = Required<MenuProps>["items"][number];
function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}
const { Sider } = Layout;
/**
 * 侧边栏--可以通过权限控制
 */
const items: MenuItem[] = [
  getItem("首页", "home", <HomeOutlined />),
  getItem("可视化大屏", "Dashboard", <PieChartOutlined />),
  getItem("表单", "form", <ContainerOutlined />, [
    getItem("基础表单", "form/basic"),
    getItem("高级表单", "form/designer"),
  ]),
  getItem("表格", "Table", <ContainerOutlined />, [
    getItem("基础表格", "table/basic"),
    getItem("高级表格", "table/designer"),
  ]),
];
const SiderPage: React.FC = () => {
  const navigate = useNavigate();
  const { menuStatus } = useSelector((state) => state.settingSlice);
  const clickSide = (e: MenuInfo) => {
    console.log(e);
    navigate(`/${e.key}`);
    // if (e.key === "Dashboard") {
    //   navigate("/dashboard");
    // } else if (e.key === "Home") {
    //   navigate("/home");
    // }
  };
  return (
    <>
      <Sider collapsed={menuStatus}>
        <div className="demo-logo-vertical" />
        <div className="logo">
          <img src={loginName} alt="" className="logo-img" />
          {!menuStatus ? (
            <img src={nameWhite} alt="" className="logo-img-white" />
          ) : null}
        </div>
        <Menu
          theme="dark"
          defaultSelectedKeys={["Home"]}
          mode="inline"
          items={items}
          onClick={(e) => {
            clickSide(e);
          }}
        />
      </Sider>
    </>
  );
};

export default SiderPage;
