import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Breadcrumb, Layout, theme, Tooltip, Dropdown, Space } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined, GithubOutlined, FileTextOutlined,  FullscreenOutlined, FullscreenExitOutlined, PoweroffOutlined, LockFilled } from "@ant-design/icons";
import "./index.less";
import { useDispatch } from "react-redux";
import { setmenuStatus } from "@/store/setting";
import {  removeUserToken } from "@/store/user";
import type { MenuProps } from 'antd';
import userLogo from "@/assets/images/avatar.jpeg";
const { Header } = Layout;

const HeaderPage: React.FC = () => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const dispatch = useDispatch();
  const [isFullScreen, setIsFullScreen] = useState(false); // 新增状态跟踪全屏模式

  // 定义面包屑导航的项
  const breadcrumbItems = [{ title: "User" }, { title: "Bill" }];
  const changeStatus = () => {
    setCollapsed(!collapsed);
    dispatch(setmenuStatus(!collapsed));
  };
  /**
   * 全屏
   */
  const toggleFullScreen = () => {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      // 当前不在全屏模式
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
      setIsFullScreen(true);
    } else {
      // 当前处于全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
      setIsFullScreen(false);
    }
  };

  // 监听全屏变化
  const handleFullScreenChange = () => {
    if (!document.fullscreenElement && !document.webkitIsFullScreen && !document.mozFullScreen && !document.msFullscreenElement) {
      setIsFullScreen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullScreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullScreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullScreenChange);
    };
  }, []);
  const logoOut = () => {
    dispatch(removeUserToken('token'));
    navigate("/login");
    
  }
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <span>
          锁定屏幕
        </span>
      ),
      icon:<LockFilled />
    },
    {
      key: '2',
      label: (
        <span onClick={logoOut}>退出登录</span>
      ),
      icon:<PoweroffOutlined />
    },

  ]

  return (
    <>
      <Header style={{ padding: 0, background: colorBgContainer, height: "60px" }}>
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
            {/* <Breadcrumb items={breadcrumbItems} style={{ margin: "16px 0" }} /> */}
          </div>
          <div className="header-right">
            <div className="setting">
              <span className="setting-item" onClick={toggleFullScreen}>
              <Tooltip title={isFullScreen ? "退出全屏" : "全屏"}>
                {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
              </Tooltip>
              </span>
              <Tooltip className="setting-item" title="csdn" >
              <FileTextOutlined onClick={()=>{window.open('https://blog.csdn.net/qq_47040462?type=blog')}} />
              </Tooltip>
              <Tooltip className="setting-item" title="GitHub">
                <GithubOutlined onClick={()=>{window.open('https://github.com/goodkets/my-admin-design-react')}} />
              </Tooltip>
            </div>
            <span className="split">|</span>
            <div className="avatar">
              <Dropdown menu={{ items }} arrow={true}>
    <a>
      <Space>
        <img src={userLogo} alt="" />
      </Space>
    </a>
  </Dropdown>
            </div>
          </div>
        </div>
      </Header>
    </>
  );
};

export default HeaderPage;