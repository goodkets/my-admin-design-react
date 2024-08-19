import React, { useEffect, useRef } from "react"; // 导入React相关库
import * as echarts from "echarts";
interface MapProps {
    id: string;
    option: echarts.EChartsOption; // 定义图表配置选项的类型
  }
const MapCoorComponents: React.FC<MapProps> = () => {
  return (<div>MapCoorComponents</div>);
};
export default MapCoorComponents;