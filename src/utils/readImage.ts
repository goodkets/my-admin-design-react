import { message } from "antd";

const setReadImage = (image) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const data = e.target && (e.target.result as any);
      // Convert Array Buffer to blob if it is base64
      const result =
        typeof data === "object"
          ? window.URL.createObjectURL(new Blob([data]))
          : data;
      resolve(result);

      //   props.onMessage(result); // 图片上传成功-传递url
    };
    // Convert to base64
    reader.readAsDataURL(image);
    // Convert to blob
    // reader.readAsArrayBuffer(image)
    reader.onerror = () => {
      message.error("图片读取出错!");
      reject("图片读取出错!");
    };
  });
};
const readImage = async (image: any) => {
  const result = await setReadImage(image);
  return result;
};

export default readImage;
