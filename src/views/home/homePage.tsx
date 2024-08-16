import React from "react";
import { Col, Row, Space } from "antd";
import CountUpCard from "@/components/home/countUpCard";
import { CountUpList } from "@/mockData/homeList";
import DemoPie from "@/components/home/echarts/pie";
import DemRadar from "@/components/home/echarts/radar";
import DemoRadialBar from "@/components/home/echarts/radialBar";
import DemoStock from "@/components/home/echarts/fetch";
import DemoColumn from "@/components/home/echarts/column";
import WithLoading from "@/components/withLoading";
const HomePage: React.FC = (props) => {
  return (
    <>
      <Space direction="vertical" size={12} style={{ display: "flex" }}>
        {/* 数量展示 */}
        <Row gutter={20}>
          {CountUpList.map((item) => {
            return (
              <Col flex={1} key={item.title}>
                <CountUpCard
                  loading={props.isLoading}
                  title={item.title}
                  color={item.color}
                  icon={item.icon}
                  count={item.count}
                />
              </Col>
            );
          })}
        </Row>
        {/* 表展示 */}
        <Row gutter={20}>
          <Col span={8}>
            <DemoPie loading={props.isLoading} />
          </Col>
          <Col span={8}>
            <DemRadar loading={props.isLoading} />
          </Col>
          <Col span={8}>
            <DemoRadialBar loading={props.isLoading} />
          </Col>
        </Row>
        {/* 图展示 */}
        <Row gutter={20}>
          <Col span={12}>
            <DemoColumn loading={props.isLoading} />
          </Col>
          <Col span={12}>
            <DemoStock loading={props.isLoading} />
          </Col>
        </Row>
      </Space>
    </>
  );
};
export default WithLoading(HomePage);
