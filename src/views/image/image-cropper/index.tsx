import { Row, Col, Card, Button, Flex, Empty } from "antd";
import { ArrowDownOutlined } from "@ant-design/icons";
import React, { useState, useRef } from "react";
import Cropper, { type ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import UploadImage from "@/components/upload";
import { downloadImgByUrl } from "@/utils/download";
import readImage from "@/utils/readImage";
const iamgeCropper: React.FC = () => {
  const [imgSrc, setSrc] = useState("");
  const cropperRef = useRef<ReactCropperElement>(null);
  const handleMessage = async (msg) => {
    console.log("msg", msg);
    // setSrc(msg); //接受子组件的图片消息
    setSrc(await readImage(msg.file.originFileObj));
  };
  const downloadImage = () => {
    const imgUrl = cropperRef.current?.cropper.getCroppedCanvas().toDataURL();
    downloadImgByUrl(imgUrl, "download.png", "image/png");
  };
  return (
    <Row gutter={20}>
      <Col span={10}>
        <Card title="裁剪区域" bodyStyle={{ height: "460px" }}>
          {imgSrc == "" ? (
            <Empty description="请先上传图片" />
          ) : (
            <Cropper
              ref={cropperRef}
              src={imgSrc}
              initialAspectRatio={3 / 2}
              guides={false}
              autoCropArea={0.6}
              autoCrop={true}
              responsive={true}
              preview=".img-preview"
              style={{
                height: "100%",
                width: "100%",
              }}
            />
          )}
        </Card>
      </Col>
      <Col span={4}>
        <Card style={{ height: "516px" }} title="设置区域" hoverable={true}>
          <Flex
            align="center"
            justify="center"
            gap={"middle"}
            wrap
            style={{
              display: "flex",
              flexDirection: "column",
            }}
          >
            <span style={{ color: "red" }}>(裁剪之前上传需要裁剪的图片)</span>
            <UploadImage onMessage={handleMessage} />
            <Button
              size="middle"
              type="primary"
              icon={<ArrowDownOutlined />}
              onClick={downloadImage}
            >
              下载图片
            </Button>
          </Flex>
        </Card>
      </Col>
      <Col span={10}>
        <Card
          bordered={false}
          title="预览区域"
          hoverable={true}
          bodyStyle={{ height: "460px" }}
        >
          {imgSrc == "" ? (
            <Empty description="请先上传图片" />
          ) : (
            <div
              className="img-preview"
              style={{
                height: "460px",
                width: "100%",
                overflow: "hidden",
                margin: "0 auto",
              }}
            />
          )}
        </Card>
      </Col>
    </Row>
  );
};

export default iamgeCropper;
