import { createBrowserRouter } from "react-router-dom";
import UserLogin from "@/views/login/loginPage";
import HomePage from "@/views/home/homePage";
import React from "react";
const router = createBrowserRouter([
  {
    path: "/login",
    name: "login",
    element: React.createElement(UserLogin),
  },
  {
    path: "/",
    name: "home",
    element: React.createElement(HomePage),
  },
]);

export default router;
