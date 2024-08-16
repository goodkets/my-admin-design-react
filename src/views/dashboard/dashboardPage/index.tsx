import React, { useState } from "react";
import WithLoading from "@/components/withLoading";
import { Loading } from "@jiaminghi/data-view-react";
import { asyncFunc } from "@/utils/asyncFunc";
import MainPage from "./main";
const DashboardPage: React.FC = () => {
  const [getLoading, setLoading] = useState(true);
  asyncFunc(() => {
    setLoading(false);
  }, 1000);
  return (
    <div>
      <div className="dashboardPage">
        {getLoading ? <Loading>Loading...</Loading> : <MainPage />}
      </div>
    </div>
  );
};
export default WithLoading(DashboardPage);
