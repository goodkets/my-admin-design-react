import { Row, Col, Card, Form, Button, Input, Select } from "antd";
import React from "react";
import UploadImage from "@/components/upload";
interface FormState {
  width: number;
  height: number;
  bgImg: string;
  img: string;
  text: string;
  family: string;
  size: string;
}

const defaultForm: FormState = {
  width: 1920,
  height: 1080,
  bgImg: "",
  img: "",
  text: "",
  family: "Arial",
  size: "12",
};
const imageComposition: React.FC = () => {
  return (
    <div>
      <Row gutter={15} justify={"center"}>
        <Col span={16}>
          <Card title="图片区域" bodyStyle={{ height: "520px" }}>
            asd
          </Card>
        </Col>
        <Col span={8}>
          <Card title="组合区域" bodyStyle={{ height: "520px" }}>
            <Form style={{ width: "300px" }} initialValues={defaultForm}>
              <Form.Item name="bgImg" label="选择底图">
                <UploadImage />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="添加文本"
                name="添加文本"
              >
                <Button style={{ width: "100%" }}>添加文本</Button>
              </Form.Item>
              <Form.Item style={{ width: "100%" }} label="添加图片" name="img">
                <UploadImage />
              </Form.Item>
              <Form.Item style={{ width: "100%" }} label="添加文本" name="text">
                <Input placeholder="添加文本" />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="删除元素"
                name="delete"
              >
                <Button danger type="primary" style={{ width: "100%" }}>
                  删除元素
                </Button>
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="字体选择"
                name="family"
              >
                <Select>
                  <Select.Option value="Arial">黑体</Select.Option>
                  <Select.Option value="Times New Roman">
                    微软雅黑
                  </Select.Option>
                  <Select.Option value="Courier New">楷书</Select.Option>
                  <Select.Option value="Verdana">隶书</Select.Option>
                  <Select.Option value=" FangSong">宋体</Select.Option>
                  <Select.Option value=" huawen">华文行楷</Select.Option>
                  <Select.Option value=" FangSong">方正姚体</Select.Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ width: "100%" }} label="字号选择" name="size">
                <Select>
                  <Select.Option value="12" style={{ fontSize: "12px" }}>
                    12px
                  </Select.Option>
                  <Select.Option value="14" style={{ fontSize: "14px" }}>
                    14px
                  </Select.Option>
                  <Select.Option value="16" style={{ fontSize: "16px" }}>
                    16px
                  </Select.Option>
                  <Select.Option value="18" style={{ fontSize: "18px" }}>
                    18px
                  </Select.Option>
                  <Select.Option value="20" style={{ fontSize: "20px" }}>
                    20px
                  </Select.Option>
                  <Select.Option value="22" style={{ fontSize: "22px" }}>
                    22px
                  </Select.Option>
                  <Select.Option value="24" style={{ fontSize: "24px" }}>
                    24px
                  </Select.Option>
                  <Select.Option value="32" style={{ fontSize: "32px" }}>
                    32px
                  </Select.Option>
                  <Select.Option value="48" style={{ fontSize: "48px" }}>
                    48px
                  </Select.Option>
                </Select>
              </Form.Item>
              <Form.Item>
                <Button
                  htmlType="submit"
                  type="primary"
                  style={{ width: "100%" }}
                >
                  合成图片
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default imageComposition;
