import { Menu, Layout } from "antd";

import React from "react";
import { useNavigate } from "react-router-dom";
import loginName from "@/assets/images/logo.png";
import nameWhite from "@/assets/images/name_white.png";
import "./index.less";
import { useSelector } from "react-redux";
import { MenuInfo } from "rc-menu/lib/interface";
import routePromissionMeta from "./utils/routePromission";
import PermissionChecker from "@/router/utils/permission";
const { Sider } = Layout;

const SiderPage: React.FC = () => {
  const routes = PermissionChecker();
  const items = [...routePromissionMeta(routes)];
  console.log(items);
  const navigate = useNavigate();
  const { menuStatus } = useSelector((state) => state.settingSlice);
  const clickSide = (e: MenuInfo) => {
    console.log(e);
    navigate(`/${e.key}`);
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
