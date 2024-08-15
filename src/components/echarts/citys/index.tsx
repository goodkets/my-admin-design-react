import React, { useEffect, useRef } from "react"; // 导入React必需的Hook
import * as echarts from "echarts"; // 导入ECharts库

// 定义组件接收的属性类型
interface PieChartProps {
  id: string; // 组件需要一个id属性，用于标识图表容器
}

// 创建一个React函数组件
const cityChartComponent: React.FC<PieChartProps> = ({ id }) => {
  const chartRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 定义图表配置选项
  const option: echarts.EChartsOption = {
    color: {
      type: "linear",
      x: 0,
      y: 0,
      x2: 1,
      y2: 0,
      colorStops: [
        {
          offset: 0,
          color: "#d000d0", // 0% 处的颜色
        },
        {
          offset: 1,
          color: "#7006d9", // 100% 处的颜色
        },
      ],
      globalCoord: false,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        // 坐标轴指示器，坐标轴触发有效
        type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
      },
    },
    grid: {
      left: "6%",
      right: "10%",
      bottom: "20%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "value",
        splitLine: {
          show: true,
          lineStyle: {
            color: ["#07234d"],
            width: 1,
          },
        },
        axisTick: {
          show: true,
          lineStyle: {
            color: ["#07234d"],
            width: 1,
          },
        },

        axisLabel: {
          show: true,
          textStyle: {
            color: "#c3dbff", //更改坐标轴文字颜色
            fontSize: 12, //更改坐标轴文字大小
          },
        },
      },
    ],
    yAxis: [
      {
        type: "category",
        data: ["科技", "母婴", "男士", "美妆", "珠宝", "宠物"],
        axisTick: {
          alignWithLabel: true,
        },
        axisLabel: {
          show: true,
          textStyle: {
            color: "#c3dbff", //更改坐标轴文字颜色
            fontSize: 10, //更改坐标轴文字大小
          },
        },
      },
    ],
    series: [
      {
        name: "直接访问",
        type: "bar",
        barWidth: "60%",
        data: [10, 52, 200, 334, 390, 330],
      },
    ],
  };

  // 使用useEffect hook来处理图表初始化和窗口大小变化时的重绘
  useEffect(() => {
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
        myChart.dispose(); // 释放图表实例
      });
    };
    // }
  }, [option]); // 当option变化时重新执行useEffect

  // 返回一个div元素，用于渲染图表
  return (
    <div
      ref={chartRef}
      id={id}
      style={{ width: "100%", height: "100%", margin: "0 10px" }}
    /> // 渲染图表容器
  );
};

export default cityChartComponent; // 导出组件
