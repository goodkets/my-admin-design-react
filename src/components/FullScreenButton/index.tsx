import React, { useState, useCallback, useEffect } from "react";
import { FullscreenOutlined, FullscreenExitOutlined } from "@ant-design/icons";
import { Tooltip } from "antd";
const FullScreenButton = ({ targetRef }) => {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const toggleFullScreen = useCallback(() => {
    const parentElement = targetRef.current?.parentElement;

    if (!parentElement) return;

    if (isFullScreen) {
      exitFullScreen();
    } else {
      enterFullScreen(parentElement);
    }

    setIsFullScreen(!isFullScreen);
  }, [isFullScreen, targetRef]);

  const enterFullScreen = (element) => {
    if (element.requestFullscreen) {
      element.requestFullscreen();
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  };

  const exitFullScreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  };

  useEffect(() => {
    const handleFullScreenChange = () => {
      const parentElement = targetRef.current?.parentElement;
      setIsFullScreen(document.fullscreenElement === parentElement);
    };

    document.addEventListener("fullscreenchange", handleFullScreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullScreenChange);
    document.addEventListener("mozfullscreenchange", handleFullScreenChange);
    document.addEventListener("MSFullscreenChange", handleFullScreenChange);

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
  }, [targetRef]);

  return (
    <span
      style={{ cursor: "pointer", fontSize: "16px" }}
      onClick={toggleFullScreen}
    >
      <Tooltip placement="bottom" title={isFullScreen ? "退出全屏" : "全屏"}>
        {isFullScreen ? <FullscreenExitOutlined /> : <FullscreenOutlined />}
      </Tooltip>
    </span>
  );
};

export default FullScreenButton;
