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

  return isVisible ? contextHolder : null;
};

export default AlertComponents;
