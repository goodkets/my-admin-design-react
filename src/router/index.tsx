import { Navigate, createBrowserRouter } from "react-router-dom";
import UserLogin from "@/views/login/loginPage";
import ModelPage from "@/views/model";
import HomePage from "@/views/home/homePage";
import DashboardPage  from "@/views/Dashboard/DashboardPage";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/login",
    name: "login",
    element: <UserLogin />,
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
