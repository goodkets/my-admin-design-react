import TablePage from "@/views/table/tablePage";
import { RouteObject } from "@/router/types";
import React from "react";
const tableRoute: RouteObject = [
  {
    path: "/table",
    name: "table",
    element: <TablePage />,
    meta: {
      permises: ["table"],
      title: "表格",
      icon: "table",
      key: "table",
    },
    children: [],
  },
];

export default tableRoute;
