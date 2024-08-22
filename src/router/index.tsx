import { createBrowserRouter, redirect } from "react-router-dom";
import { PieChartOutlined } from "@ant-design/icons";
import React from "react";
import { getItem } from "@/utils/storeages";
import { LayoutGuard } from "./utils/guard";
import UserLogin from "@/views/login/loginPage";
import PermissionChecker from "./utils/permission";
import DashboardPage from "@/views/dashboard/dashboardPage";
import PageException from "@/views/exception";
import ModelPage from "@/views/model";

const router = createBrowserRouter([
  {
    path: "/login",
    name: "login",
    element: <UserLogin />,
    loader: () => {
      const token = getItem("token");
      if (token) {
        return redirect("/home");
      }
      return null;
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
    path: "/",
    name: "model",
    element: <ModelPage />,
    meta: {},
    children: [...PermissionChecker()],
    errorElement: <PageException />,
  },
]);

export default router;
