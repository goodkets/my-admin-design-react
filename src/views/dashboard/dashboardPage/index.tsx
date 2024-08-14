import React from "react";
import WithLoading from "@/components/withLoading";
import "./index.less";
import { Button, Col, Row } from "antd";
const DashboardPage: React.FC = () => {
  return (
    <div className="dashboardPage">
      <div className="header-main">
        <div className="left_bg"></div>
        <div className="right_bg"></div>
        <h3>大数据平台</h3>
      </div>
      <div className="wrapper">
        <Row>
          <Col span={6}>
            <Button>1</Button>
          </Col>
          <Col span={12}>
            <Button>2</Button>
          </Col>
          <Col span={6}>
            <Button>3</Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};
export default WithLoading(DashboardPage);
