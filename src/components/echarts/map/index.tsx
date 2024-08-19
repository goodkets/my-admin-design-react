import React, { useEffect, useRef } from "react"; // 导入React相关库
import * as echarts from "echarts"; // 导入ECharts库
import china from "@/json/map//map/json/china.json";
import { provienceData } from "./data";
echarts.registerMap("china", china); //注册地图
// 定义组件接收的属性类型
interface MapProps {
  id: string;
  option: echarts.EChartsOption; // 定义图表配置选项的类型
}

// 创建一个React函数组件
const MapComponent: React.FC<MapProps> = ({ id }) => {
  const chartRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 定义图表配置选项
  const option: echarts.EChartsOption = {
    tooltip: {
      // 工具提示配置
      trigger: "item", // 触发类型为item，即点击地图上的省份触发
    },
    visualMap: {
      // 视觉映射配置
      min: 0, // 最小值
      max: 10000, // 最大值
      text: ["高", "低"], // 显示的文字标签
      splitNumber: 0, // 分割数量，默认为0表示自动计算
      color: ["#0054bb", "#85ADDE"], // 色彩范围
      textStyle: {
        // 文字样式配置
        color: "#c3dbff", // 文字颜色
      },
      inverse: true, //颜色反转
      // left: "500vh",
    },
    series: [
      // 图表系列配置
      {
        name: "2011全国GDP分布", // 系列名称
        type: "map", // 系列类型为地图
        mapType: "china", // 地图类型为中国
        mapLocation: {
          // 地图位置配置
          x: "left", // 地图在容器中的水平位置
        },
        itemStyle: {
          // 地图项样式配置
          normal: {
            // 默认状态下的样式
            label: {
              // 标签配置
              show: true, // 是否显示标签
              color: "#fff", // 标签文字颜色
            },
            borderWidth: 0, // 边框宽度
          },
        },
        data: [
          // 数据数组
          // 地图数据项，包含省份名
          ...provienceData,
        ],
      },
    ],
  };

  // 使用useEffect hook来处理图表初始化和窗口大小变化时的重绘
  useEffect(() => {
    if (chartRef.current) {
      // 检查DOM元素是否存在
      const myChart = echarts.init(chartRef.current); // 初始化ECharts实例
      myChart.setOption(option); // 设置图表配置选项
      window.addEventListener("resize", () => {
        // 添加窗口大小变化监听器
        myChart.resize(); // 当窗口大小变化时，重新调整图表大小
      });
      return () => {
        // 清理函数，当组件卸载时移除监听器
        window.removeEventListener("resize", () => {
          // 移除窗口大小变化监听器
          myChart.resize(); // 不再需要调用resize方法
        });
      };
    }
  }, [option]); // 当option变化时重新执行useEffect

  // 返回一个div元素，用于渲染图表
  return (
    <div ref={chartRef} id={id} style={{ width: "100%", height: "100%" }} />
  );
};

export default MapComponent; // 导出组件
