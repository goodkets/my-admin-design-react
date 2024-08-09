import "./index.less";
import React, { useRef } from "react";
import FullScreenButton from "@/components/FullScreenButton";
import { Button, Row, Col, Dropdown, Space } from "antd";
import { RedoOutlined, CloseOutlined, RightOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { setchangeLoadng } from "@/store/setting";
import { useDispatch } from "react-redux";

const settingPage: React.FC = () => {
  const targenRef = useRef(null);
  const dispatch = useDispatch();
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: <span>操作1</span>,
      // icon: <LockFilled />,
    },
    {
      key: "2",
      // label: <span onClick={logoOut}>退出登录</span>,
      label: <span>操作2</span>,
      // icon: <PoweroffOutlined />,
    },
  ];
  return (
    <div ref={targenRef}>
      <div className="settings">
        <div className="bread">面包屑</div>
        <div className="settings-right">
          <Row gutter={3}>
            <Col flex={1}>
              <Button
                onClick={() => dispatch(setchangeLoadng(true))}
                icon={<RightOutlined />}
                disabled={true}
                size="small"
              />
            </Col>
            <Col flex={1}>
              <FullScreenButton targetRef={targenRef} />
            </Col>
            <Col flex={1}>
              <Button
                onClick={() => dispatch(setchangeLoadng(true))}
                icon={<RedoOutlined />}
                size="small"
              />
            </Col>
            <Col flex={1}>
              <Dropdown menu={{ items }} arrow={true}>
                <Space>
                  <Button icon={<CloseOutlined />} size="small" />
                </Space>
              </Dropdown>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default settingPage;
