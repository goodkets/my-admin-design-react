import React from "react";
import "./index.less";
import { Card } from "antd";
import CountUp from "react-countup";
import SvgIcon from "@/components/svgIcon";
const CountUpCard: React.FC = (props) => {
  return (
    <>
      <Card
        bordered={false}
        bodyStyle={{ padding: 0 }}
        loading={props.loading}
        hoverable={true}
      >
        <div className="card">
          <div className="card-icon" style={{ backgroundColor: props.color }}>
            <div>
              <SvgIcon name={props.icon} size={40} style={{ color: "#fff" }} />
            </div>
          </div>
          <div className="card-text">
            <div className="num">
              <CountUp
                start={0}
                end={props.count}
                duration={3}
                style={{
                  fontSize: "32px",
                  color: "#515a6e",
                }}
              />
            </div>
            <div className="txt">{props.title}</div>
          </div>
        </div>
      </Card>
    </>
  );
};

export default CountUpCard;
