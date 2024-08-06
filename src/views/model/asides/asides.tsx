import { Menu, Layout } from "antd";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import loginName from "@/assets/images/logo.png";
import nameWhite from "@/assets/images/name_white.png";
import "./index.less";

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
const items: MenuItem[] = [
  getItem("Home", "Home", <DesktopOutlined />),
  getItem("Dashboard", "Dashboard", <PieChartOutlined />),
  // getItem("User", "sub1", <UserOutlined />, [
  //   getItem("Tom", "3"),
  //   getItem("Bill", "4"),
  //   getItem("Alex", "5"),
  // ]),
  // getItem("Team", "sub2", <TeamOutlined />, [
  //   getItem("Team 1", "6"),
  //   getItem("Team 2", "8"),
  // ]),
  // getItem("Files", "9", <FileOutlined />),
];
const SiderPage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const clickSide = (e) => {
    console.log(e);
    if (e.key === "Dashboard") {
      navigate("/dashboard");
    } else if (e.key === "Home") {
      navigate("/home");
    }
  };
  return (
    <>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <div className="logo" >
          <img src={loginName} alt="" className="logo-img"/>
          <img src={nameWhite} alt="" className="logo-img-white"/>
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
