import { Navigate } from "react-router-dom";
import React from "react";
import HomePage from "@/views/home/homePage";
import DashboardPage from "@/views/dashboard/dashboardPage";
import BasignerPage from "@/views/form/basicPage";
import DesigneerPage from "@/views/form/designerPage";
import TabBasicPage from "@/views/table/basicPage";
import TabDesignerPage from "@/views/table/designerPage";
import {
  PieChartOutlined,
  HomeOutlined,
  ContainerOutlined,
  FormOutlined,
  TableOutlined,
} from "@ant-design/icons";

const routes: Routes = [
  {
    path: "home",
    name: "首页",
    element: <HomePage />,
    meta: {
      title: "首页",
      icon: <HomeOutlined />,
      permission: ["home"],
    },
  },
  {
    path: "dashboard",
    name: "数据大屏",
    element: <DashboardPage />,
    meta: {
      title: "数据大屏",
      icon: <PieChartOutlined />,
      permission: ["dashboard"],
    },
  },
  {
    path: "*",
    element: <Navigate to="/home" />,
    name: "",
    meta: {
      title: "首页",
      icon: <HomeOutlined />,
      permission: ["home"],
    },
  },
  {
    path: "form",
    name: "表单",
    meta: {
      title: "表单",
      icon:  <FormOutlined />,
      permission: ["form"],
    },
    children: [
      {
        path: "/form/basic",
        name: "基础表单",
        element: <BasignerPage />,
        meta: {
          title: "基础表单",
          icon:  <FormOutlined />,
          permission: ["formBas"],
        },
      },
      {
        path: "/form/designer",
        name: "高级表单",
        element: <DesigneerPage />,
        meta: {
          title: "高级表单",
          icon:  <FormOutlined />,
          permission: ["formDes"],
        },
      },
    ],
  },
  {
    path: "table",
    name: "表格",
    meta: {
      title: "表格",
      icon: <ContainerOutlined />,
      permission: ["table"],
    },
    children: [
      {
        path: "/table/basic",
        name: "基础表格",
        element: <TabBasicPage />,
        meta: {
          title: "基础表格",
          icon:  <TableOutlined />,
          permission: ["tableBas"],
        },
      },
      {
        path: "/table/designer",
        name: "高级表格",
        element: <TabDesignerPage />,
        meta: {
          title: "高级表格",
          icon:  <TableOutlined />,
          permission: ["tableDes"],
        },
      },
    ],
  },
];
export default routes;
