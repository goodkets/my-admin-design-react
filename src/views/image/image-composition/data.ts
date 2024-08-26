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
  text: "请添加文本！！",
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
const fontOptions = [
  { value: "Arial", label: "黑体" },
  { value: "Times New Roman", label: "微软雅黑" },
  { value: "Courier New", label: "楷书" },
  { value: "Verdana", label: "隶书" },
  { value: "FangSong", label: "宋体" },
  { value: "huawen", label: "华文行楷" },
  { value: "FangZheng", label: "方正姚体" },
];
const sizeOptions = [12, 14, 16, 18, 20, 22, 24, 32, 48];

export { defaultForm, alignItems, fontOptions, sizeOptions };
