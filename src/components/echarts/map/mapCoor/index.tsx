import React, { useEffect, useRef } from "react"; // 导入React相关的库
import * as echarts from "echarts"; // 导入ECharts库
import china from "@/json/map//map/json/china.json"; // 导入中国地图的GeoJSON数据
import { getSeries } from "./utils"; // 导入获取系列数据的函数
echarts.registerMap("china", china); // 注册地图数据到ECharts

// 定义组件的属性接口
interface MapProps {
  id: string; // 组件的唯一标识符
  option: echarts.EChartsOption; // 定义图表配置选项的类型
}

// 定义React函数组件
const MapCoorComponents: React.FC<MapProps> = ({ id }) => {
  const mapRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 定义ECharts的配置选项
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item", // 设置提示框触发方式
      formatter: function (params) {
        // 自定义提示框的内容
        if (params.seriesType === "effectScatter") {
          return `路线：${params.data.name} ${params.data.value[2]}`;
        } else {
          return `${params.data.fromName}>${params.data.toName}<br/>${params.data.value}`;
        }
      },
    },
    geo: {
      map: "china", // 设置地图名称
      label: {
        emphasis: {
          show: true, // 设置高亮时标签是否显示
          color: "#fff", // 设置高亮时标签的颜色
        },
      },
      // mapLocation: { // 这部分被注释掉了，用于控制地图在容器中的位置
      //   x: "left", // 地图在容器中的水平位置
      //   y: "center", // 地图在容器中的垂直位置
      //   width: "100%", // 地图的宽度
      //   height: "100%", // 地图的高度
      // },
      roam: false, // 设置是否开启缩放和平移漫游
      zoom: 1, // 设置初始缩放级别
      itemStyle: {
        normal: {
          areaColor: "rgba(43,196,243,0.42)", // 设置正常状态下的区域颜色
          borderColor: "rgba(43,196,243,0.42)", // 设置正常状态下的边框颜色
          borderWidth: 1, // 设置正常状态下的边框宽度
        },
        emphasis: {
          areaColor: "#2B91B7", // 设置高亮状态下的区域颜色
        },
      },
    },
    series: getSeries(), // 设置图表的系列数据
  };

  // 使用useEffect hook来处理图表初始化和窗口大小变化时的重绘
  useEffect(() => {
    if (mapRef.current) {
      // 检查DOM元素是否存在
      const myChart = echarts.init(mapRef.current); // 初始化ECharts实例
      myChart.setOption(option); // 设置图表配置选项
      window.addEventListener("resize", () => {
        // 添加窗口大小变化监听器
        myChart.resize(); // 当窗口大小变化时，重新调整图表大小
      });

      // 清理函数，当组件卸载时移除监听器
      return () => {
        window.removeEventListener("resize", () => {
          // 移除窗口大小变化监听器
          // 注意：这里不需要调用myChart.resize()
        });
      };
    }
  }, [option]); // 当option变化时重新执行useEffect

  // 返回包含地图的DOM元素
  return (
    <div
      ref={mapRef}
      style={{ width: "25%", height: "100%" }} // 设置地图容器的尺寸
      id={id}
    />
  );
};

export default MapCoorComponents; // 导出组件
