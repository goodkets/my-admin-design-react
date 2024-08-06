import { Navigate, createBrowserRouter, redirect } from "react-router-dom";
import UserLogin from "@/views/login/loginPage";
import ModelPage from "@/views/model";
import HomePage from "@/views/home/homePage";
import DashboardPage from "@/views/Dashboard/DashboardPage";
import React from "react";
import { getToken } from "../utils/storeages";

//基本路由，权限路由后面再加
const router = createBrowserRouter([
  {
    path: "/login",
    name: "login",
    element: <UserLogin />,
    loader: () => {
      console.log(getToken("token"));
      if (getToken("token")) {
        return redirect("/home");
      } else {
        return redirect("/login");
      }
    },
  },
  {
    path: "/",
    name: "model",
    element: <ModelPage />,
    children: [
      {
        path: "/home",
        name: "home",
        element: <HomePage />,
      },
      {
        path: "/dashboard",
        name: "dashboard",
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
