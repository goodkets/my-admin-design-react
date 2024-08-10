import { Navigate } from "react-router-dom";
import React from "react";
import HomePage from "@/views/home/homePage";
import DashboardPage from "@/views/dashboard/dashboardPage";
import BasignerPage from "@/views/form/basicPage";
import DesigneerPage from "@/views/form/designerPage";
import TabBasicPage from "@/views/table/basicPage";
import TabDesignerPage from "@/views/table/designerPage";

const routes: Routes = [
  {
    path: "/home",
    name: "首页",
    element: <HomePage />,
    meta: {
      title: "首页",
      icon: "",
      permission: ["home"],
    },
  },
  {
    path: "/dashboard",
    name: "数据大屏",
    element: <DashboardPage />,
    meta: {
      title: "数据大屏",
      icon: "",
      permission: ["dashboard"],
    },
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
  },
  {
    path: "/form",
    name: "表单",
    meta: {
      title: "表单",
      icon: "",
      permission: ["form"],
    },
    children: [
      {
        path: "/form/basic",
        name: "基础表单",
        element: <BasignerPage />,
        meta: {
          title: "基础表单",
          icon: "",
          permission: ["formBas"],
        },
      },
      {
        path: "/form/designer",
        name: "高级表单",
        element: <DesigneerPage />,
        meta: {
          title: "高级表单",
          icon: "",
          permission: ["formDes"],
        },
      },
    ],
  },
  {
    path: "/table",
    name: "表格",
    meta: {
      title: "表格",
      icon: "",
      permission: ["table"],
    },
    children: [
      {
        path: "/table/basic",
        name: "基础表格",
        element: <TabBasicPage />,
        meta: {
          title: "基础表格",
          icon: "",
          permission: ["tableBas"],
        },
      },
      {
        path: "/table/designer",
        name: "高级表格",
        element: <TabDesignerPage />,
        meta: {
          title: "高级表格",
          icon: "",
          permission: ["tableDes"],
        },
      },
    ],
  },
];
export default routes;
