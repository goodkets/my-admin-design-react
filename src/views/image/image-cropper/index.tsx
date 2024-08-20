import { Row, Col, Card, Button, Flex } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import React from "react";
import UploadImage from "@/components/upload";
const iamgeCropper: React.FC = () => {
  return (
    <Row gutter={20}>
      <Col span={8}>
        <Card title="裁剪区域" hoverable={true}>
          123
        </Card>
      </Col>
      <Col span={8}>
        <Card title="设置区域" hoverable={true}>
          <Flex
            align="center"
            justify="center"
            gap={"middle"}
            wrap
            style={{
              height: "60vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <UploadImage />
            <Button size="middle" type="primary" icon={<ArrowDownOutlined />}>
              下载图片
            </Button>
          </Flex>
        </Card>
      </Col>
      <Col span={8}>
        <Card title="预览区域" hoverable={true}>
          asd
        </Card>
      </Col>
    </Row>
  );
};

export default iamgeCropper;
