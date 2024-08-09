import React from "react";
import WithLoading from "@/components/withLoading";
import { Card } from "antd";
const TabDesignerPage: React.FC = (props) => {
  return (
    <>
      <Card loading={props.isLoading}>
        <div style={{ margin: "20px", textAlign: "center" }}>
          <h1> 我知道你很急，但是不要急，还在开发中....</h1>
        </div>
      </Card>
    </>
  );
};
export default WithLoading(TabDesignerPage);
