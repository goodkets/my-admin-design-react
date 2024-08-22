import { Row, Col, Card, Form, InputNumber, Space, Button, Select, message } from "antd";
import React, { useState } from "react";
import { COMPRESS_IMG_SRC } from "@/mockData/websiteSetting";
import UploadImage from "@/components/upload";
import SvgIcon from "@/components/svgIcon";
import Compressor from 'compressorjs';
import readImage from "@/utils/readImage";
import { downloadByUrl } from "@/utils/download";

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
  quality: 0.6,
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
  const [info, setInfo] = useState<any>();
  const [imgSrc, setSrc] = useState("");
  const handleMessage = async (info: string) => {
    setInfo(info);
    setSrc(await readImage(info.file.originFileObj)); //接受子组件的图片消息
  };
  const onFinish = (values: FormState) => {
    console.log("Success:", values);
    try {
      if (!info) return message.error("请先上传图片,示例图片无法压缩");
      new Compressor(info.file.originFileObj, {
        quality: values.quality,//质量
        width: values.width,//宽度
        height: values.height,//高度
        mimeType: values.mimeType,//图片格式
        success: (result) => {
          setSrc(URL.createObjectURL(result));
          downloadByUrl({
            url: URL.createObjectURL(result),
            fileName: "压缩图片",
            bom: true,
          });
          message.success("图片压缩成功");
        },
        error: (err) => {
          console.log(err);
        },
      });
    } catch (error) {
      console.log(error);
    }
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
            style={{ width: "300px", height: "57vh", margin: "60px auto 0" }}
          >
            <Form.Item label="图片上传" name={"img"}>
              <UploadImage onMessage={handleMessage} />
            </Form.Item>
            <Form.Item
              // name="size"
              label="图片尺寸"
              rules={[{ required: true, message: "请输入宽度" }]}
            >
              <Space>
                <Form.Item
                  name="width"
                  noStyle
                  rules={[{ required: true, message: "请输入宽度" }]}
                >
                  <InputNumber name="width" addonBefore="宽" />
                </Form.Item>
                <SvgIcon name="linking" />
                <Form.Item
                  name="height"
                  noStyle
                  rules={[{ required: true, message: "请输入高度" }]}
                >
                  <InputNumber name="height" addonBefore="高" />
                </Form.Item>
              </Space>
            </Form.Item>
            {/* <Form.Item
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
            </Form.Item> */}
            <Form.Item
              name="quality"
              label="图片质量"
              rules={[{ required: true, message: "请选择图片质量" }]}
            >
              <Select defaultValue={0.6}>
                <Select.Option value={0}>0(压缩比:94.72％)</Select.Option>
                <Select.Option value={0.2}>0.2(压缩比：83.90％)</Select.Option>
                <Select.Option value={0.4}>0.4（压缩比：76.18％）</Select.Option>
                <Select.Option value={0.6}>0.6（压缩比：67.99％--推荐）</Select.Option>
                <Select.Option value={0.8}>0.8（压缩比：46.41％--推荐）</Select.Option>
                <Select.Option value={1}>1（压缩比：0--不推荐）</Select.Option>
              </Select>
            </Form.Item>
            <Form.Item
              name="mimeType"
              label="图片格式"
              rules={[{ required: true, message: "请选择图片格式" }]}
            >
              <Select defaultValue="image/png">
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
