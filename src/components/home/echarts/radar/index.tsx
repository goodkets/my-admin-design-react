import { Radar } from "@ant-design/plots";
import React from "react";
import { Card } from "antd";

const data = [
  { name: "G2", star: 10371 },
  { name: "G6", star: 7380 },
  { name: "F2", star: 7414 },
  { name: "L7", star: 2140 },
  { name: "X6", star: 660 },
  { name: "AVA", star: 885 },
  { name: "G2Plot", star: 1626 },
];

const Demos = () => {
  const config = {
    data: data.map((d) => ({ ...d, star: Math.sqrt(d.star) })),
    xField: "name",
    yField: "star",
    height: 300,
    area: {
      style: {
        fillOpacity: 0.2,
      },
    },
    scale: {
      x: {
        padding: 0.5,
        align: 0,
      },
      y: {
        nice: true,
      },
    },
    axis: {
      x: {
        title: false,
        grid: true,
      },
      y: {
        gridAreaFill: "rgba(0, 0, 0, 0.04)",
        label: false,
        title: false,
      },
    },
  };
  return <Radar {...config} />;
};
const DemoRadar = (props) => (
  <Card hoverable={true} loading={props.loading}>
    <Demos />
  </Card>
);

export default DemoRadar;
