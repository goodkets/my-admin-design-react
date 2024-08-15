import React, { useState, useEffect } from "react";
import WithLoading from "@/components/withLoading";
import "./index.less";
import { Button, Col, Row } from "antd";
import {
  BorderBox13,
  Decoration5,
  ScrollRankingBoard,
  ScrollBoard,
  DigitalFlop,
  Decoration1,
  BorderBox8,
  BorderBox1,
} from "@jiaminghi/data-view-react";
import {
  ScrollRankingBoardList,
  ScrollBoardList,
  DigitalFlopList,
} from "./list";
import MapComponent from "@/components/echarts/map";
import BarChartComponent from "@/components/echarts/dataset";
import PieChartComponent from "@/components/echarts/chart";
import CityChartComponent from "@/components/echarts/citys";
import StackedtComponent from "@/components/echarts/stacked";

const mainPage: React.FC = () => {
  const [DigNumber, setDigNumber] = useState(7653112);

  const [currentDigitalFlopList, setCurrentDigitalFlopList] = useState(
    DigitalFlopList(0),
  );

  useEffect(() => {
    setCurrentDigitalFlopList(DigitalFlopList(DigNumber));
  }, [DigNumber]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDigNumber(DigNumber + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, [DigNumber]);
  useEffect(() => {
    toggleFullScreen();
  }, []);

  // dataset第一个数据
  const dataset1 = {
    text: "近6个月主播活跃趋势",
    xData: ["1月", "2月", "3月", "4月", "五月", "6月"],
    seriesData1: [140, 170, 90, 180, 90, 90],
    seriesData2: [120, 150, 80, 130, 80, 80],
  };

  // dataset第二个数据
  const dataset2 = {
    text: "近6个月观众活跃趋势",
    xData: ["1月", "2月", "3月", "4月", "五月", "6月"],
    seriesData1: [130, 150, 190, 130, 100, 20],
    seriesData2: [80, 70, 90, 130, 180, 130],
  };

  /**
   * 全屏
   */
  const toggleFullScreen = () => {
    if (
      !document.fullscreenElement &&
      !document.webkitIsFullScreen &&
      !document.mozFullScreen &&
      !document.msFullscreenElement
    ) {
      // 当前不在全屏模式
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(
          Element.ALLOW_KEYBOARD_INPUT,
        );
      }
    } else {
      // 当前处于全屏模式
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };
  return (
    <div>
      <div className="dashboardPage">
        <div>
          <div className="header-main">
            <div className="left_bg"></div>
            <div className="right_bg"></div>
            <h3>大数据平台</h3>
            <div style={{ marginTop: "-40px" }}>
              <Decoration5
                style={{ width: "300px", height: "40px", margin: "0 auto" }}
              />
            </div>
          </div>
          <div className="wrapper">
            <Row gutter={20}>
              <Col span={6}>
                <div>
                  <BorderBox13 style={{ padding: "10px" }}>
                    <ScrollRankingBoard
                      config={ScrollRankingBoardList}
                      style={{
                        width: "auto",
                        height: "48vh",
                        margin: "0px 30px 10px",
                      }}
                    />
                  </BorderBox13>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <BorderBox13 style={{ padding: "10px" }}>
                    <ScrollBoard
                      config={ScrollBoardList}
                      style={{
                        width: "auto",
                        height: "29vh",
                        margin: "10px 10px 10px",
                      }}
                    />
                  </BorderBox13>
                </div>
              </Col>
              <Col span={12}>
                <div className="title">
                  <DigitalFlop
                    config={currentDigitalFlopList}
                    style={{ height: "60px", width: "100%" }}
                  />
                  <Decoration1
                    style={{
                      width: "200px",
                      height: "50px",
                      position: "absolute",
                      right: 0,
                    }}
                  />
                </div>
                <div className="map">
                  <div className="map_bg"></div>
                  <div className="jt"></div>
                  <div className="lbx"></div>
                  <div className="map-list">
                    <MapComponent id="mainMap3" />
                  </div>
                </div>
                <div className="bar">
                  <Row gutter={10}>
                    <Col span={12}>
                      <BorderBox8
                        style={{ height: "34vh", padding: "10px 0 0 0" }}
                      >
                        <BarChartComponent id="mainBar" data={dataset1} />
                      </BorderBox8>
                    </Col>
                    <Col span={12}>
                      <BorderBox8>
                        <BarChartComponent id="mainBar" data={dataset2} />
                      </BorderBox8>
                    </Col>
                  </Row>
                </div>
              </Col>
              <Col span={6}>
                <BorderBox1 title="主播类占比" style={{ height: "28vh" }}>
                  <div style={{ textAlign: "center", color: "#01c4f7" }}>
                    主播类型占比
                  </div>
                  <PieChartComponent />
                </BorderBox1>
                <br />
                <BorderBox1 title="直播类占比" style={{ height: "27vh" }}>
                  <div
                    style={{
                      textAlign: "center",
                      color: "#01c4f7",
                    }}
                  >
                    重点品类占比
                  </div>
                  <CityChartComponent />
                </BorderBox1>
                <br />
                <BorderBox1 title="直播类占比" style={{ height: "28vh" }}>
                  <div style={{ textAlign: "center", color: "#01c4f7" }}>
                    Top10城市各类占比
                  </div>
                  <StackedtComponent />
                </BorderBox1>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithLoading(mainPage);
