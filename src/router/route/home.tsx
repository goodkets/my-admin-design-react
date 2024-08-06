import { RouteObject } from "@/router/types";
import HomePage from "@/views/home/homePage";
import React from "react";
const homeRoute: RouteObject = [
  {
    path: "/home",
    name: "home",
    element: <HomePage />,
    meta: {
      permises: ["home"],
      title: "首页",
      icon: "home",
      key: "home",
    },
    children: [],
  },
];

export default homeRoute;
