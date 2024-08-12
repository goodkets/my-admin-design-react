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
import PermissionChecker from "@/router/utils/permission";
type MenuItem = Required<MenuProps>["items"][number];
function getItems(
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
const routes = PermissionChecker();
console.log(routes);
let items: MenuItem[] = [];
routes.forEach(element => {
  if (element.meta.permission && element.name) {
    if (element.children) {
      let children: MenuItem[] = [];
      element.children.forEach(item => {
        if (item.meta.permission && item.path) {
          children.push(getItems(item.name, item.path));
        }
      });
      console.log(children,9999);
      items.push(getItems(element.name, element.path, undefined, [...children]));
    } else {
      items.push(getItems(element.name, element.path));
    }
  }
});
console.log(items,888);
/**
 * 侧边栏--可以通过权限控制
 */
// const items: MenuItem[] = [
//   getItems("首页", "home", <HomeOutlined />),
//   getItems("可视化大屏", "Dashboard", <PieChartOutlined />),
//   getItems("表单", "form", <ContainerOutlined />, [
//     getItems("基础表单", "form/basic"),
//     getItems("高级表单", "form/designer"),
//   ]),
//   getItems("表格", "Table", <ContainerOutlined />, [
//     getItems("基础表格", "table/basic"),
//     getItems("高级表格", "table/designer"),
//   ]),
// ];
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
