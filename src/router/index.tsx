import { createBrowserRouter, redirect } from "react-router-dom";
import React from "react";
import { LayoutGuard } from "./utils/guard";
import UserLogin from "@/views/login/loginPage";
import PermissionChecker from "./utils/permission";
import { getItem } from "@/utils/storeages";
import DashboardPage from "@/views/dashboard/dashboardPage";
import { PieChartOutlined } from "@ant-design/icons";

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
    element: <LayoutGuard />,
    meta: {},
    // children: [...routes],
    children: [...PermissionChecker()],
  },
]);

export default router;
