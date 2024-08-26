import React, { useRef, useState } from "react";
import { Rnd as RndComponent, RndProps } from "react-rnd"; // 使用命名导入

function DraggableResizableBox(props) {
  console;
  const editRef = useRef(null);
  const [position, setPosition] = useState<RndProps>({
    x: 100,
    y: 100,
    width: 300,
    height: 200,
  });

  const onDragStop = (e, d) => {
    setPosition({ ...d });
  };
  const handleContentChange = () => {
    props.onChangeValue(editRef.current);
  };
  const styles = {
    background: "#fff",
    width: "100%",
    height: "100%",
    maxWidth: "300px",
    maxHeight: "300px",
    outline: "none", // 移除编辑时的边框
    padding: "10px", // 添加内边距以便编辑
    boxSizing: "border-box", // 保证内容编辑时宽度高度不变
  };
  return (
    <RndComponent
      position={position}
      onDragStop={onDragStop}
      enable={{ drag: true, resize: false }} // 关闭 resize 功能
      bounds="parent"
    >
      <div
        ref={editRef}
        suppressContentEditableWarning={true} // 忽略警告
        contentEditable={true} // 使 div 可编辑
        style={{ ...styles }}
        onInput={handleContentChange}
      >
        {props.text}
      </div>
    </RndComponent>
  );
}

export default DraggableResizableBox;
