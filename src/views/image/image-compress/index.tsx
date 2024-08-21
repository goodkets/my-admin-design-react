import { Row, Col, Card, Form, InputNumber, Space, Button, Select } from "antd";
import React, { useState } from "react";
import { COMPRESS_IMG_SRC } from "@/mockData/websiteSetting";
import UploadImage from "@/components/upload";
import SvgIcon from "@/components/svgIcon";

interface FormState {
  width: number;
  height: number;
  ratio: number;
  quality: number;
  mimeType: string;
}

interface ImageState {
  width: number;
  height: number;
  aspectRatio: number;
  imgSrc: string;
}

const defaultForm: FormState = {
  width: 1920,
  height: 1080,
  ratio: 100,
  quality: 1,
  mimeType: "image/png",
};

const defaultImage: ImageState = {
  width: 1920,
  height: 1080,
  aspectRatio: 1920 / 1080,
  imgSrc: COMPRESS_IMG_SRC,
};

const imageCompress: React.FC = () => {
  const [imageInfo, setImageInfo] = useState(defaultImage);
  const [imgSrc, setSrc] = useState("");
  const handleMessage = (message: string) => {
    // console.log("message", message);
    setSrc(message); //接受子组件的图片消息
  };
  const onFinish = (values: FormState) => {
    console.log("Success:", values);
  };

  return (
    <Row gutter={20} justify={"center"}>
      <Col span={16}>
        <Card title="图片区域" hoverable={true}>
          <div style={{ width: "100%", height: "63vh" }}>
            <img
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
              src={imgSrc || imageInfo.imgSrc}
            />
          </div>
        </Card>
      </Col>
      <Col span={8} flex={1}>
        <Card title="设置区域" hoverable={true}>
          <Form
            name="imageCompressForm"
            onFinish={onFinish}
            initialValues={defaultForm}
            style={{ width: "300px", height: "55vh", margin: "60px auto 0" }}
          >
            <Form.Item label="图片上传" name={"img"}>
              <UploadImage onMessage={handleMessage} />
            </Form.Item>
            <Form.Item
              name="width"
              label="图片尺寸"
              rules={[{ required: true, message: "请输入宽度" }]}
            >
              <Space>
                <Form.Item
                  name="width"
                  noStyle
                  rules={[{ required: true, message: "请输入宽度" }]}
                >
                  <InputNumber addonBefore="宽" />
                </Form.Item>
                <SvgIcon name="linking" />
                <Form.Item
                  name="height"
                  noStyle
                  rules={[{ required: true, message: "请输入高度" }]}
                >
                  <InputNumber addonBefore="高" />
                </Form.Item>
              </Space>
            </Form.Item>
            <Form.Item
              name="ratio"
              label="压缩比例"
              rules={[{ required: true, message: "请输入压缩比例" }]}
            >
              <InputNumber<number>
                defaultValue={100}
                min={0}
                max={100}
                formatter={(value) => `${value}%`}
                parser={(value) => value?.replace("%", "") as unknown as number}
              />
            </Form.Item>
            <Form.Item
              name="mimeTypes"
              label="图片质量"
              rules={[{ required: true, message: "请选择图片质量" }]}
            >
              <Select defaultValue={100}>
                <Select.Option value={100}>100</Select.Option>
                <Select.Option value={90}>90</Select.Option>
                <Select.Option value={80}>80</Select.Option>
                <Select.Option value={70}>70</Select.Option>
                <Select.Option value={60}>60</Select.Option>
                <Select.Option value={50}>50</Select.Option>
                <Select.Option value={40}>40</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="mimeType"
              label="图片格式"
              rules={[{ required: true, message: "请选择图片格式" }]}
            >
              <Select>
                <Select.Option value="image/png">PNG</Select.Option>
                <Select.Option value="image/jpeg">JPG</Select.Option>
                <Select.Option value="image/webp">BPM</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                style={{ width: "100%" }}
                type="primary"
              >
                压缩图片
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default imageCompress;
