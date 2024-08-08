import "./index.less";
import React, { useRef } from "react";
import FullScreenButton from "@/components/FullScreenButton";
const settingPage: React.FC = () => {
  const targenRef = useRef(null);
  return (
    <div ref={targenRef}>
      <div className="settings">
        <div className="bread">面包屑</div>
        <div className="settings-right">
          <FullScreenButton targetRef={targenRef} />
          {/* <span>导航+设置</span> */}
        </div>
      </div>
    </div>
  );
};

export default settingPage;
