import React, { useRef, useState, useEffect } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import "./index.less";
import SettingPage from "@/components/setting";
import isFullScreen from "@/utils/isFullScreen";
import { useDispatch, useSelector } from "react-redux";
import { setchangeLoadng } from "@/store/setting";

const { Content } = Layout;
const MainPage: React.FC = () => {
  const dispatch = useDispatch();
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
  const { changeLoadng } = useSelector((state: any) => state.settingSlice);
  const [reloadKey, setReloadKey] = useState(0);
  useEffect(() => {
    if (changeLoadng) {
      setReloadKey((prevKey) => prevKey + 1);
      dispatch(setchangeLoadng(false));
    }
  }, [changeLoadng]);
  return (
    <>
      <SettingPage />
      <Content
        className="custom-scrollbar"
        style={{
          height: isFullScreenState ? "100vh" : `calc(100vh - 64px)`,
          overflow: "auto",
          backgroundColor: "#eee",
        }}
      >
        <div
          style={{
            padding: 24,
            minHeight: 360,
            margin: "16px 8px",
            overflow: "auto",
          }}
        >
          <div key={reloadKey}>
            <Outlet />
          </div>
        </div>
      </Content>
    </>
  );
};

export default MainPage;
