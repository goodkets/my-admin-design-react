import React, { useEffect, useRef } from "react"; // 导入React必需的Hook
import * as echarts from "echarts"; // 导入ECharts库

// 定义组件接收的属性类型
interface PieChartProps {
  id: string; // 组件需要一个id属性，用于标识图表容器
}

// 创建一个React函数组件
const PieChartComponent: React.FC<PieChartProps> = ({ id }) => {
  const chartRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 定义图表配置选项
  const option: echarts.EChartsOption = {
    tooltip: {
      trigger: "item", // 设置提示框触发方式为'item'
    },
    legend: {
      // 图例配置
      orient: "vertical",
      top: 30,
      right: "10%",
      data: ["美妆", "百度", "教育", "理财", "母婴"],
      textStyle: {
        fontSize: 12,
        color: "#ffffff",
      },
      icon: "circle",
      itemWidth: 10, // 设置宽度

      itemHeight: 10, // 设置高度

      itemGap: 15, // 设置间距
    },
    series: [
      {
        name: "Access From", // 系列名称
        type: "pie", // 类型为饼图
        radius: ["50%", "70%"], // 内外半径百分比
        avoidLabelOverlap: true, // 是否避免标签重叠
        color: ["#9702fe", "#ff893b", "#37cbff", "#d90051", "#b2e269"],
        label: {
          show: true, // 标签是否显示
          position: "center", // 标签的位置
        },
        emphasis: {
          label: {
            show: true, // 高亮时标签是否显示
            fontSize: 30, // 字体大小
            fontWeight: "bold", // 字体加粗
          },
        },
        labelLine: {
          show: false, // 标签线是否显示
        },
        data: [
          { value: 335, name: "美妆" },
          { value: 310, name: "百度" },
          { value: 234, name: "教育" },
          { value: 135, name: "理财" },
          { value: 1548, name: "母婴" },
        ],
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

export default PieChartComponent; // 导出组件
