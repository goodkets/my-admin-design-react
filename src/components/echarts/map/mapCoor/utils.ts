import { geoCoordMap, XAData, XNData, YCData, planePath } from "./list"; // 导入地理坐标映射和其他数据
let color = ["#fff", "#fff", "#fff"]; // 航线的颜色

// 将数据转换为ECharts可以识别的格式
const convertData = (data) => {
  var res = [];
  for (var i = 0; i < data.length; i++) {
    var dataItem = data[i];

    var fromCoord = geoCoordMap[dataItem[0].name]; // 获取起点的坐标
    var toCoord = geoCoordMap[dataItem[1].name]; // 获取终点的坐标
    if (fromCoord && toCoord) {
      res.push({
        fromName: dataItem[0].name, // 起点名称
        toName: dataItem[1].name, // 终点名称
        coords: [fromCoord, toCoord], // 起终点坐标
        value: dataItem[1].value, // 数据值
      });
    }
  }
  return res;
};

// 生成图表的系列数据
const getSeries = () => {
  let series = [];
  let line = [
    ["西安", XAData], // 西安的数据
    ["南宁", YCData], // 南宁的数据
    ["银川", XNData], // 银川的数据
  ];

  // 遍历每个城市的数据
  line.forEach((item, i) => {
    // 对每个城市添加三条不同的系列数据
    series.push(
      {
        name: item[0] + " Top3", // 系列名称
        type: "lines", // 类型为线条
        zlevel: 1, // 图层层级
        effect: {
          show: true, // 效果可见
          period: 6, // 动画周期
          trailLength: 0.7, // 尾迹长度
          color: "red", // 箭头的颜色
          symbolSize: 3, // 符号大小
        },
        lineStyle: {
          normal: {
            color: color[i], // 线条颜色
            width: 0, // 线宽
            curveness: 0.2, // 曲率
          },
        },
        mapLocation: {
          x: "left", // 地图位置
        },
        data: convertData(item[1]), // 数据
      },
      {
        name: item[0] + " Top3", // 系列名称
        type: "lines", // 类型为线条
        zlevel: 2, // 图层层级
        symbol: ["none", "arrow"], // 符号
        symbolSize: 10, // 符号大小
        effect: {
          show: true, // 效果可见
          period: 6, // 动画周期
          trailLength: 0, // 尾迹长度
          symbol: planePath, // 符号路径
          symbolSize: 15, // 符号大小
        },
        lineStyle: {
          normal: {
            color: color[i], // 线条颜色
            width: 1, // 线宽
            opacity: 0.6, // 透明度
            curveness: 0.2, // 曲率
          },
        },
        mapLocation: {
          x: "left", // 地图位置
        },
        data: convertData(item[1]), // 数据
      },
      {
        name: item[0] + " Top3", // 系列名称
        type: "effectScatter", // 类型为带有特效的散点图
        coordinateSystem: "geo", // 坐标系统
        zlevel: 2, // 图层层级
        rippleEffect: {
          brushType: "stroke", // 波纹效果
        },
        label: {
          normal: {
            show: true, // 标签可见
            position: "right", // 标签位置
            formatter: "{b}", // 标签内容
          },
        },
        symbolSize: function (val) {
          return val[2] / 8; // 符号大小
        },
        itemStyle: {
          normal: {
            color: color[i], // 项样式颜色
          },
          emphasis: {
            areaColor: "#2B91B7", // 高亮时的区域颜色
          },
        },
        mapLocation: {
          x: "left", // 地图位置
        },
        data: item[1].map(function (dataItem) {
          return {
            name: dataItem[1].name, // 名称
            value: geoCoordMap[dataItem[1].name].concat([dataItem[1].value]), // 坐标和值
          };
        }), // 数据
      },
    );
  });

  return series; // 返回系列数据
};

export { getSeries }; // 导出getSeries函数
