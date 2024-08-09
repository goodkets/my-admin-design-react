import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import React from "react";
import { LayoutGuard } from "./utils/guard";
import { getToken } from "@/utils/storeages";
import UserLogin from "@/views/login/loginPage";
import HomePage from "@/views/home/homePage";
import DashboardPage from "@/views/dashboard/dashboardPage";
import BasignerPage from "@/views/form/basicPage";
import DesigneerPage from "@/views/form/designerPage";
import TabBasicPage from "@/views/table/basicPage";
import TabDesignerPage from "@/views/table/designerPage";

const router = createBrowserRouter([
  {
    path: "/login",
    name: "login",
    element: <UserLogin />,
    loader: () => {
      const token = getToken("token");
      if (token) {
        return redirect("/home");
      }
      return null;
    },
  },
  {
    path: "/",
    name: "model",
    element: <LayoutGuard />,
    children: [
      {
        path: "/home",
        name: "首页",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        name: "数据大屏",
        element: <DashboardPage />,
      },
      {
        path: "*",
        element: <Navigate to="/home" />,
      },
      {
        path: "/form",
        name: "表单",
        children: [
          {
            path: "/form/basic",
            name: "基础表单",
            element: <BasignerPage />,
          },
          {
            path: "/form/designer",
            name: "高级表单",
            element: <DesigneerPage />,
          },
        ],
      },
      {
        path: "/table",
        name: "表格",
        children: [
          {
            path: "/table/basic",
            name: "基础表格",
            element: <TabBasicPage />,
          },
          {
            path: "/table/designer",
            name: "高级表格",
            element: <TabDesignerPage />,
          },
        ],
      },
    ],
  },
]);

export default router;
