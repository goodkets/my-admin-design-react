import React, { useState } from "react";
import {
  LoadingOutlined,
  PlusOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { Alert, Button, Flex, message, Upload } from "antd";
import type { GetProp, UploadProps } from "antd";
import AlertComponents from "../alert";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];
const beforeUpload = (file: FileType) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const upload: React.FC = () => {
  const [alertStatus, setalertStatus] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const handleChange: UploadProps["onChange"] = (info) => {
    console.log(info, 9999);
    if (info.file.status === "uploading") {
      setalertStatus("uploading");
    } else if (info.file.status === "done") {
      setalertStatus("success");
    } else {
      setalertStatus("error");
    }
  };
  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);

      return false;
    },
    fileList,
  };
  return (
    <>
      <Flex gap="middle" wrap>
        <Upload {...props} onChange={handleChange} showUploadList={false}>
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
