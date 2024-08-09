import { Card } from "antd";
import React from "react";
import WithLoading from "@/components/withLoading";
const DesigneerPage: React.FC = (props) => {
  return (
    <div style={{ margin: "20px", textAlign: "center" }}>
      <Card loading={props.isLoading}>
        我知道你很急，但是不要急，还在开发中....
      </Card>
    </div>
  );
};
export default WithLoading(DesigneerPage);
