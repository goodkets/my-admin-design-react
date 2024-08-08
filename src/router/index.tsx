import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import UserLogin from "@/views/login/loginPage";
import ModelPage from "@/views/model";
import HomePage from "@/views/home/homePage";
import DashboardPage from "@/views/dashboard/dashboardPage";
import React from "react";
import { LayoutGuard } from "./utils/guard";
import { getToken } from "@/utils/storeages";

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
    // element: <ModelPage />,
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
    ],
  },
]);

export default router;
