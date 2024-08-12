import { createBrowserRouter, redirect } from "react-router-dom";
import React from "react";
import { LayoutGuard } from "./utils/guard";
import UserLogin from "@/views/login/loginPage";
import routes from "./routes";
import PermissionChecker from "./utils/permission";
import { getItem } from "@/utils/storeages";

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
    path: "/",
    name: "model",
    element: <LayoutGuard />,
    meta: {},
    // children: [...routes],
    children: [...PermissionChecker()],
  },
]);

export default router;
