import React, { useState, useEffect } from "react";
import WithLoading from "@/components/withLoading";
import "./index.less";
import { Button, Col, Row } from "antd";
import { BorderBox13, Decoration5, ScrollRankingBoard, ScrollBoard, DigitalFlop, Decoration1, BorderBox8 } from "@jiaminghi/data-view-react";
import { ScrollRankingBoardList, ScrollBoardList, DigitalFlopList } from "./list";
import MapComponent from "@/components/echarts/map";
import BarChartComponent from "@/components/echarts/dataset";
const mainPage: React.FC = () => {

  const [DigNumber, setDigNumber] = useState(7653112);

  const [currentDigitalFlopList, setCurrentDigitalFlopList] = useState(DigitalFlopList(0));

  useEffect(() => {
    setCurrentDigitalFlopList(DigitalFlopList(DigNumber));
  }, [DigNumber]);

  useEffect(() => {
    const timer = setInterval(() => {
      setDigNumber(DigNumber + 1);
    }, 1500);
    return () => clearInterval(timer);
  }, [DigNumber]);

// dataset第一个数据
const  dataset1 = {
    text:'近6个月主播活跃趋势',
    xData:['1月', '2月', '3月', '4月', '五月', '6月'],
    seriesData1:[140, 170, 90, 180, 90, 90],
    seriesData2:[120, 150, 80, 130, 80, 80]
}

// dataset第二个数据
const  dataset2 = {
    text:'近6个月观众活跃趋势',
    xData:['1月', '2月', '3月', '4月', '五月', '6月'],
    seriesData1:[130, 150, 190, 130, 100, 20],
    seriesData2:[80, 70, 90, 130, 180, 130]
}

  return (
    <div>
      <div className="dashboardPage">
        <div>
          <div className="header-main">
            <div className="left_bg"></div>
            <div className="right_bg"></div>
            <h3>大数据平台</h3>
            <div style={{ marginTop: "-40px" }}><Decoration5 style={{ width: '300px', height: '40px', margin: '0 auto' }} /></div>
          </div>
          <div className="wrapper">
            <Row gutter={5}>
              <Col span={6}>
                <div>
                  <BorderBox13 style={{ padding: '10px' }}><ScrollRankingBoard config={ScrollRankingBoardList} style={{ width: 'auto', height: '40vh', margin: '0px 30px 10px' }} /></BorderBox13>
                </div>
                <div style={{ marginTop: "10px" }}>
                  <BorderBox13 style={{ padding: '10px' }}>
                    <ScrollBoard config={ScrollBoardList} style={{ width: 'auto', height: '40vh', margin: '10px 10px 10px' }} />
                  </BorderBox13>
                </div>
              </Col>
              <Col span={12}>
                <div className="title">
                  <DigitalFlop config={currentDigitalFlopList} style={{  height: '60px',width:'100%' }} />
                  <Decoration1 style={{width: '200px', height: '50px',position:'absolute',right:0}} />
                </div>
                <div className="map">
                    <div className="map_bg"></div>
                    <div className="jt">
                    </div>
                    <div className="lbx">
                    </div>
                    <div className="map-list">
                    <MapComponent id="mainMap3"  />
                    </div>
                </div>
                <div className="bar">
                <Row gutter={10}>
                    <Col span={12}>
                    <BorderBox8 style={{ height:'38vh',padding:'10px 0 0 0' }}>
                        <BarChartComponent id="mainBar" data={dataset1} />
                    </BorderBox8>
                    </Col>
                    <Col span={12}>
                    <BorderBox8 >
                    <BarChartComponent id="mainBar" data={dataset2} />
                    </BorderBox8>
                    </Col>
                </Row>
                </div>
              </Col>
              <Col span={6}>
                <Button>3</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WithLoading(mainPage);