import { createBrowserRouter, redirect } from "react-router-dom";
import { PieChartOutlined, HomeOutlined } from "@ant-design/icons";
import React from "react";
import { getItem } from "@/utils/storeages";
import { LayoutGuard } from "./utils/guard";
import UserLogin from "@/views/login/loginPage";
import PermissionChecker from "./utils/permission";
import DashboardPage from "@/views/dashboard/dashboardPage";
import PageException from "@/views/exception";
import ModelPage from "@/views/model";
import { Navigate, Routes } from "react-router-dom";
import HomePage from "@/views/home/homePage";

const routes = [
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
    children: [...PermissionChecker(),
      {
        path: "",
        element: <Navigate to="/home" />,
        name: "",
        meta: {
          title: "首页",
          icon: <HomeOutlined />,
          permission: ["home"],
        },
      },
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
    ],
    errorElement: <PageException />,
  },
]

const router = createBrowserRouter(routes);



export default router;
