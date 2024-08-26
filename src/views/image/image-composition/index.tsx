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
  message,
} from "antd";
import type { ColorPickerProps, GetProp } from "antd";
import { FontColorsOutlined } from "@ant-design/icons";
import React, { useMemo, useState } from "react";
import UploadImage from "@/components/upload";
import { COMPRESS_IMG_SRC } from "@/mockData/websiteSetting";
import domtoimage from "dom-to-image";
import { downloadImgByUrl } from "@/utils/download";
import SvgIcon from "@/components/svgIcon";
import DraggableResizableBox from "@/components/DndNode";
import { defaultForm, alignItems, fontOptions, sizeOptions } from "./data";
interface FormState {
  width: number;
  height: number;
  bgImg: string;
  img: string;
  text: string;
  family: string;
  size: string;
}

type Color = Extract<
  GetProp<ColorPickerProps, "value">,
  string | { cleared: any }
>;
const imageComposition: React.FC = () => {
  const [imageInfo, setImageInfo] = useState(COMPRESS_IMG_SRC);
  const [imgSrc, setSrc] = useState("");
  const [color, setColor] = useState<Color>("#000");
  const [color1, setColor1] = useState<Color>("#000");
  const [ElementIndex, setElementIndex] = useState([]);
  const [formData, setFormData] = useState({ ...defaultForm });
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
  const addText = () => {
    if (ElementIndex.length >= 5) {
      message.error("最多添加5个元素");
    }
    setElementIndex([
      ...ElementIndex,
      ElementIndex[ElementIndex.length - 1] + 1,
    ]);
  };
  const handChangeValue = (e) => {
    //获取文本内容--子传父
    setFormData({ ...formData, text: e.innerText });
  };
  const changeText = (e) => {
    setFormData({ ...formData, text: e.target.value });
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
            <div
              className="imgChange"
              style={{
                width: "100%",
                height: "100%",
                backgroundImage: `url(${imgSrc || imageInfo})`,
              }}
            >
              {ElementIndex.map((item, index) => {
                return (
                  <DraggableResizableBox
                    key={index}
                    index={index}
                    RndIndex={index}
                    onChangeValue={handChangeValue}
                    text={formData.text}
                  />
                );
              })}
            </div>
          </Card>
        </Col>
        <Col span={8}>
          <Card title="组合区域" bodyStyle={{ height: "660px" }}>
            <Form
              style={{ width: "300px", margin: "60px auto 0 " }}
              initialValues={formData}
              onFinish={onFinish}
            >
              <Form.Item name="bgImg" label="选择底图">
                <UploadImage />
              </Form.Item>
              <Form.Item style={{ width: "100%" }} label="添加图片" name="img">
                <UploadImage />
              </Form.Item>
              <Form.Item
                style={{ width: "100%" }}
                label="添加文本"
                name="添加文本"
              >
                <Button onClick={addText} style={{ width: "100%" }}>
                  添加文本
                </Button>
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
              {ElementIndex.length > 0 ? (
                <div>
                  {" "}
                  <Form.Item
                    style={{ width: "100%" }}
                    label="文本编辑"
                    // name="text"
                  >
                    <Input
                      value={formData.text}
                      onChange={changeText}
                      placeholder="请输入文本"
                    />
                  </Form.Item>
                  <Form.Item
                    style={{ width: "100%" }}
                    label="字体选择"
                    name="family"
                  >
                    <Select>
                      {fontOptions.map((option) => (
                        <Select.Option key={option.value} value={option.value}>
                          {option.label}
                        </Select.Option>
                      ))}
                    </Select>
                  </Form.Item>
                  <Form.Item
                    style={{ width: "100%" }}
                    label="字号选择"
                    name="size"
                  >
                    <Select>
                      {sizeOptions.map((size) => (
                        <Select.Option
                          key={size}
                          value={size}
                          style={{ fontSize: `${size}px` }}
                        >
                          {`${size}px`}
                        </Select.Option>
                      ))}
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
                        <Button
                          icon={<SvgIcon name="font-align" size={20} />}
                        />
                      </Dropdown>
                    </Space>
                  </Form.Item>
                </div>
              ) : (
                <></>
              )}
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
