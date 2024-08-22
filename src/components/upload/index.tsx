import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import { Button, Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import AlertComponents from "../alert";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const beforeUpload = (file: FileType) => {
  if (!/\.(jpg|png|bmp|jpeg|webp)$/.test(file.name)) {
    message.warning("图片只支持.jpg, .png, .bmp, .jpeg, .webp格式!");
    return;
  }

  const isLimit1M = file.size! / 1024 / 1024 < 5;
  if (!isLimit1M) {
    message.warning("上传的图片大小不能超过5M!");
    return;
  }
};

const upload: React.FC = (props) => {
  const [alertStatus, setalertStatus] = useState("");
  const handleChange: UploadProps["onChange"] = (info) => {
    console.log("info", info);
    if (info.fileList.length > 0) {
      setalertStatus("success");
    } else {
      setalertStatus("error");
    }
    props.onMessage(info)
    // readImage(info.file.originFileObj); // 图片转换为地址
  };
  return (
    <>
      <Flex gap="middle" wrap>
        <Upload
          fileList={[]}
          onChange={handleChange}
          showUploadList={false}
          beforeUpload={beforeUpload}
        >
          <Button size="large" type="primary" icon={<UploadOutlined />}>
            Upload
          </Button>
        </Upload>
      </Flex>
      {alertStatus == "success" ? (
        <AlertComponents messages="success" txt="上传成功" />
      ) : (
        <AlertComponents messages="error" txt="上传失败" />
      )}
    </>
  );
};

export default upload;
