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
    if (info.file.status === "uploading") {
      setalertStatus("uploading");
    } else if (info.file.status === "done") {
      setalertStatus("success");
    } else {
      setalertStatus("error");
    }
    readImage(info.file.originFileObj); // 图片转换为地址
  };
  const readImage = (image: any) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target && (e.target.result as any);
      // Convert Array Buffer to blob if it is base64
      const result =
        typeof data === "object"
          ? window.URL.createObjectURL(new Blob([data]))
          : data;
      // onSuccess(result)
      props.onMessage(result); // 图片上传成功-传递url
    };
    // Convert to base64
    reader.readAsDataURL(image);
    // Convert to blob
    // reader.readAsArrayBuffer(image)
    reader.onerror = () => {
      message.error("图片读取出错!");
    };
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
      {alertStatus == "uploading" ? (
        <AlertComponents messages="success" txt="上传成功" />
      ) : (
        <AlertComponents messages="error" txt="上传失败" />
      )}
    </>
  );
};

export default upload;
