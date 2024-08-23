import {
  Row,
  Col,
  Card,
  Form,
  Button,
  Input,
  Select,
  ColorPicker,
  Space,
  Dropdown,
} from "antd";
import type { ColorPickerProps, GetProp } from "antd";
import { FontColorsOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import UploadImage from "@/components/upload";
import { COMPRESS_IMG_SRC } from "@/mockData/websiteSetting";
import domtoimage from "dom-to-image";
import { downloadImgByUrl } from "@/utils/download";
import SvgIcon from "@/components/svgIcon";
import type { MenuProps } from "antd";
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
const alignItems: MenuProps["items"] = [
  {
    key: "left",
    label: "左对齐",
  },
  {
    key: "center",
    label: "居中",
  },
  {
    key: "right",
    label: "右对齐",
  },
];
type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;
const imageComposition: React.FC = () => {
  const [imageInfo, setImageInfo] = useState(COMPRESS_IMG_SRC);
  const [imgSrc, setSrc] = useState("");
  const [color, setColor] = useState<Color>("#000");
  const [color1, setColor1] = useState<Color>("#000");

  const bgColor = useMemo<string>(
    () => (typeof color === "string" ? color : color!.toHexString()),
    [color],
  );
  const bgColor1 = useMemo<string>(
    () => (typeof color1 === "string" ? color1 : color1!.toHexString()),
    [color1],
  );

  const btnStyle: React.CSSProperties = {
    color: bgColor,
  };
  const btnStyle1: React.CSSProperties = {
    backgroundColor: bgColor1,
    color: "#fff",
  };
  const onFinish = (values: FormState) => {
    domtoimage
      .toPng(document.querySelector(".imgChange") as HTMLElement)
      .then(function (dataUrl) {
        downloadImgByUrl(dataUrl, "test.png", "image/png"); //下载合成的图片
      })
      .catch(function (error) {
        console.error("oops, something went wrong!", error);
      });
  };
  return (
    <div>
      <Row gutter={15} justify={"center"}>
        <Col span={16}>
          <Card title="图片区域" bodyStyle={{ height: "660px" }}>
            <div className="imgChange">
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
                src={imgSrc || imageInfo}
              />
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="组合区域" bodyStyle={{ height: "660px" }}>
            <Form
              style={{ width: "300px", margin: "60px auto 0 " }}
              initialValues={defaultForm}
              onFinish={onFinish}
            >
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
              <Form.Item label="样式操作">
                <Space size={6}>
                  <ColorPicker value={color} onChange={setColor}>
                    <Button
                      icon={<FontColorsOutlined />}
                      style={btnStyle}
                    ></Button>
                  </ColorPicker>
                  <ColorPicker value={color1} onChange={setColor1}>
                    <Button
                      icon={<FontColorsOutlined style={btnStyle1} />}
                    ></Button>
                  </ColorPicker>
                  <Button
                    icon={<SvgIcon name="font-bold" size={20} />}
                    style={{ color: "#1890ff" }}
                  />
                  <Button
                    icon={<SvgIcon name="font-italic" size={20} />}
                    style={{ color: "#000" }}
                  />
                  <Button
                    icon={<SvgIcon name="font-shadow" size={20} />}
                    style={{ color: "#000" }}
                  />
                  <Dropdown
                    menu={{ items: alignItems }}
                    placement="bottomRight"
                    trigger={["click"]}
                  >
                    <Button icon={<SvgIcon name="font-align" size={20} />} />
                  </Dropdown>
                </Space>
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
