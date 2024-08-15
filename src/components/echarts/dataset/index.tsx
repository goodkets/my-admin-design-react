import React, { useEffect, useRef } from 'react'; // 导入React相关库
import * as echarts from 'echarts/core'; // 导入ECharts核心模块
import {
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent
} from 'echarts/components'; // 导入ECharts的各个组件
import { BarChart } from 'echarts/charts'; // 导入柱状图组件
import { CanvasRenderer } from 'echarts/renderers'; // 导入Canvas渲染器

// 注册echarts的各个组件
echarts.use([
  DatasetComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  BarChart,
  CanvasRenderer
]);

// 定义组件接收的属性类型
interface ChartProps {
  id: string;
}

// 创建一个React函数组件
const BarChartComponent: React.FC<ChartProps> = ({ id,data }) => {
  const chartRef = useRef<HTMLDivElement>(null); // 创建一个React useRef hook，用于获取DOM元素的引用

  // 使用useEffect hook来处理图表初始化和窗口大小变化时的重绘
  useEffect(() => {
    if (chartRef.current) { // 检查DOM元素是否存在
      const chartDom = chartRef.current; // 获取DOM元素
      const myChart = echarts.init(chartDom); // 初始化ECharts实例

      // 定义图表配置选项
      const option = {
        title: { // 标题配置
          show: true, // 是否显示标题
          text: data.text, // 标题文本
          x: 'center', // 标题的水平位置
          textStyle: { // 标题文本样式
            fontSize: 14, // 字体大小
            fontStyle: 'normal', // 字体风格
            fontWeight: 'normal', // 字体粗细
            color: '#01c4f7' // 字体颜色
          }
        },
        tooltip: { // 提示框配置
          trigger: 'axis', // 触发方式为坐标轴触发
          axisPointer: { // 坐标轴指示器配置
            type: 'shadow' // 类型为阴影
          }
        },
        legend: { // 图例配置
          data: ['观看人数、次数（个）', '场均观看数（场）'], // 图例数据
          textStyle: { // 图例文本样式
            fontSize: 12, // 字体大小
            color: '#ffffff' // 字体颜色
          },
          top: 20, // 图例距离顶部的距离
          itemWidth: 20, // 图例项的宽度
          itemHeight: 12, // 图例项的高度
          itemGap: 10 // 图例项之间的间距
        },
        grid: { // 坐标系网格配置
          left: '3%', // 网格左侧距离
          right: '4%', // 网格右侧距离
          bottom: '3%', // 网格底部距离
          containLabel: true // 是否包含坐标轴标签
        },
        xAxis: { // X轴配置
          type: 'category', // 类型为分类轴
          data: data.xData, // X轴数据
          splitLine: { // 分隔线配置
            show: true, // 是否显示分隔线
            lineStyle: { // 分隔线样式
              color: ['#07234d'] // 分隔线颜色
            }
          },
          axisLabel: { // 坐标轴标签配置
            show: true, // 是否显示标签
            textStyle: { // 标签文本样式
              color: '#c3dbff', // 标签颜色
              fontSize: 12 // 标签字体大小
            }
          }
        },
        yAxis: { // Y轴配置
          type: 'value', // 类型为数值轴
          boundaryGap: [0, 0.01], // 边界间隔
          splitLine: { // 分隔线配置
            show: true, // 是否显示分隔线
            lineStyle: { // 分隔线样式
              color: ['#07234d'] // 分隔线颜色
            }
          },
          axisLabel: { // 坐标轴标签配置
            show: true, // 是否显示标签
            textStyle: { // 标签文本样式
              color: '#c3dbff', // 标签颜色
              fontSize: 12 // 标签字体大小
            }
          }
        },
        series: [ // 数据系列配置
          {
            name: '观看人数、次数（个）', // 系列名称
            type: 'bar', // 系列类型为柱状图
            data: data.seriesData1, // 数据
            itemStyle: { // 图形样式配置
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 线性渐变色
                { offset: 0, color: '#9408fc' }, // 渐变起始颜色
                { offset: 1, color: '#05aed3' } // 渐变更终颜色
              ])
            }
          },
          {
            name: '场均观看数（场）', // 系列名称
            type: 'bar', // 系列类型为柱状图
            data: data.seriesData2, // 数据
            itemStyle: { // 图形样式配置
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [ // 线性渐变色
                { offset: 0, color: '#13b985' }, // 渐变起始颜色
                { offset: 1, color: '#dc9b18' } // 渐变更终颜色
              ])
            }
          }
        ]
      };

      myChart.setOption(option); // 设置图表配置选项

      // 监听窗口大小变化
      window.addEventListener('resize', () => {
        myChart.resize(); // 当窗口大小变化时，重新调整图表大小
      });

      return () => { // 清理函数，当组件卸载时移除监听器
        // 清理工作
        window.removeEventListener('resize', () => { // 移除窗口大小变化监听器
          myChart.resize(); // 不再需要调用resize方法
        });
      };
    }
  }, []); // 当组件挂载时执行useEffect

  // 返回一个div元素，用于渲染图表
  return (
    <div ref={chartRef} id={id} style={{ width: '100%', height: '100%' }} />
  );

};

export default BarChartComponent; // 导出组件