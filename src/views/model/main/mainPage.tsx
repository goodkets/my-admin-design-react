import React, { useRef, useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./index.less";
import SettingPage from "@/components/setting";
import isFullScreen from "@/utils/isFullScreen";
const { Content } = Layout;
const MainPage: React.FC = () => {
  const targenRef = useRef(null);
  const [isFullScreenState, setIsFullScreenState] = useState(isFullScreen());
  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreenState(isFullScreen());
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

    // 清理函数
    return () => {
      document.removeEventListener("fullscreenchange", handleFullScreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullScreenChange,
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullScreenChange,
      );
    };
  }, []);
  return (
    <>
      <Content
        className="custom-scrollbar"
        style={{
          margin: "0 0 0 8px",
          height: isFullScreenState ? "100vh" : `calc(100vh - 64px)`,
          overflow: "auto",
          backgroundColor: "#eee",
        }}
      >
        <SettingPage />
        <div
          style={{
            padding: 24,
            minHeight: 360,
            margin: "16px 8px",
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
