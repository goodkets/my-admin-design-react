import React, { useEffect, useRef } from "react"; // 导入React必需的Hook
import * as echarts from "echarts"; // 导入ECharts库

// 定义组件接收的属性类型
interface PieChartProps {
  id: string; // 组件需要一个id属性，用于标识图表容器
}

// 创建一个React函数组件
const stackedtComponent: React.FC<PieChartProps> = ({ id }) => {
  const chartRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 定义图表配置选项
  const option: echarts.EChartsOption = {
    color: ["#ff832e", "#37cbff", "#b3e269"],
    legend: {
      top: 30,
      data: ["美妆", "理财", "教育", "母婴", "百货"],
      textStyle: {
        fontSize: 12,
        color: "#ffffff",
      },
      icon: "circle",
      itemWidth: 10, // 设置宽度

      itemHeight: 10, // 设置高度

      itemGap: 10, // 设置间距
    },
    grid: {
      left: "7%",
      right: "10%",
      bottom: "13%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
      splitLine: {
        show: true,
        lineStyle: {
          color: ["#07234d"],
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
    yAxis: {
      type: "category",
      data: ["上海", "广州", "杭州", "天津", "北京", "厦门", "合肥"],
      axisLabel: {
        show: true,
        textStyle: {
          color: "#c3dbff", //更改坐标轴文字颜色
          fontSize: 12, //更改坐标轴文字大小
        },
      },
    },
    series: [
      {
        name: "美妆",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [320, 302, 301, 334, 390, 330, 320],
      },
      {
        name: "理财",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [120, 132, 101, 134, 90, 230, 210],
      },
      {
        name: "教育",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [220, 182, 191, 234, 290, 330, 310],
      },
      {
        name: "母婴",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [150, 212, 201, 154, 190, 330, 410],
      },
      {
        name: "百货",
        type: "bar",
        stack: "总量",
        label: {
          show: false,
          position: "insideRight",
        },
        data: [820, 832, 901, 934, 1290, 1330, 1320],
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
    <div ref={chartRef} id={id} style={{ width: "100%", height: "100%" }} /> // 渲染图表容器
  );
};

export default stackedtComponent; // 导出组件
