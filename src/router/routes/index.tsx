import React, { Children } from "react";
import {
  PieChartOutlined,
  HomeOutlined,
  ContainerOutlined,
  FormOutlined,
  TableOutlined,
  UserOutlined,
  ProjectOutlined
} from "@ant-design/icons";
import BasignerPage from "@/views/form/basicPage";
import DesigneerPage from "@/views/form/designerPage";
import TabBasicPage from "@/views/projectMasage/basicPage";
import TabDesignerPage from "@/views/projectMasage/designerPage";
import ImageCropper from "@/views/image/image-cropper";
import ImageCompress from "@/views/image/image-compress";
import ImageComposition from "@/views/image/image-composition";
<<<<<<< HEAD
import UserPage from "@/views/permission/userMassage";
import ProjectPage from "@/views/permission/projectMassage";
import GroupMassage from "@/views/permission/groupMassage";
import FileManagement from "@/views/permission/FileManagement";
import HomePage from "@/views/home/homePage";

=======
import MapComponent from "@/views/map";
>>>>>>> 0c703355b73cd3e7aad5e478d91f89e4bec56ce8

const routes: Routes = [
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

  {
    path: "dashboard",
    name: "数据大屏",
    meta: {
      title: "数据大屏",
      icon: <PieChartOutlined />,
      permission: ["dashboard"],
    },
  },
  // {
  //   path: "form",
  //   name: "表单",
  //   meta: {
  //     title: "表单",
  //     icon: <FormOutlined />,
  //     permission: ["form"],
  //   },
  //   children: [
  //     {
  //       path: "/form/basic",
  //       name: "基础表单",
  //       meta: {
  //         title: "基础表单",
  //         icon: <FormOutlined />,
  //         permission: ["formBas"],
  //       },
  //       children: [
  //         {
  //           path: "/form/basic/basic",
  //           name: "操作表单",
  //           element: <BasignerPage />,
  //           meta: {
  //             title: "基础表单1",
  //             icon: <FormOutlined />,
  //             permission: ["formBas"],
  //           },
  //         },
  //       ],
  //     },
  //     {
  //       path: "/form/designer",
  //       name: "高级表单",
  //       element: <DesigneerPage />,
  //       meta: {
  //         title: "高级表单",
  //         icon: <FormOutlined />,
  //         permission: ["formDes"],
  //       },
  //     },
  //   ],
  // },
  {
    path: "table",
    name: "项目管理",
    meta: {
      title: "表格",
      icon: <ContainerOutlined />,
      permission: ["table"],
    },
    children: [
      {
        path: "/table/basic",
        name: "智慧养老平台",
        element: <TabBasicPage />,
        meta: {
          title: "智慧养老平台",
          icon: <TableOutlined />,
          permission: ["tableBas"],
        },
      },
      {
        path: "/table/designer",
        name: "社区健康服务系统",
        element: <TabDesignerPage />,
        meta: {
          title: "智慧养老平台",
          icon: <TableOutlined />,
          permission: ["tableDes"],
        },
      },
    ],
  },
  {
    path:'permission',
    name: "权限管理",
    meta: {
      title: "权限管理",
      icon: <ContainerOutlined />,
      permission: ["permission"],
    },
    children: [
      {
        path: "/permission/user",
        name: '用户管理',
        element: <UserPage />,
        meta: {
          title: "用户管理",
          icon: <UserOutlined />,
          permission: ["permissionBas"],
        },
      },
      {
        name:'项目管理',
        path: "/permission/project",
        element: <ProjectPage />,
        meta: {
          title: "项目管理",
          icon: <ProjectOutlined />,
          permission: ["permissionBas"],
        },
      },
      {
        name: "组管理",
        path: "/permission/group",
        element: <GroupMassage />,
        meta: {
          title: "组管理",
          icon: <ProjectOutlined />,
          permission: ["permissionDes"],
        },
      },
    ]
  },
<<<<<<< HEAD
  // {
  //   name: "档案管理",
  //   path: "/fileList",
  //   element: <FileManagement />,
  //   meta: {
  //     title: "档案管理",
  //     icon: <ProjectOutlined />,
  //     permission: ["permissionFile"],
  //   },
  // }
=======
  {
    path: "map",
    name: "地图",
    element: <MapComponent />,
    meta: {
      title: "地图",
      icon: <ContainerOutlined />,
      permission: ["map"],
    },
  },
>>>>>>> 0c703355b73cd3e7aad5e478d91f89e4bec56ce8
];
export default routes;
