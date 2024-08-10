import { createBrowserRouter, redirect } from "react-router-dom";
import React from "react";
import { LayoutGuard } from "./utils/guard";
import { getToken } from "@/utils/storeages";
import UserLogin from "@/views/login/loginPage";
import routes from "./routes";

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
    meta: {},
    children: [...routes],
  },
]);

export default router;
