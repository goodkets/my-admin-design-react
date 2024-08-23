import { message } from "antd";
import React, { useState, useEffect } from "react";

const AlertComponents: React.FC<{ messages: string; txt: string }> = ({
  messages,
  txt,
}) => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (messages && txt) {
      setIsVisible(true);
      messageApi.open({
        type: messages,
        content: txt,
      });
    }
  }, [messages, txt, messageApi]);

  useEffect(() => {
    return () => {
      setIsVisible(false);
    };
  }, []);

  // 优化返回值，确保只有在需要展示消息时才展示 contextHolder
  return (
    <React.Fragment>
      {isVisible && contextHolder}
      {/* 其他组件 */}
    </React.Fragment>
  );
};

export default AlertComponents;
