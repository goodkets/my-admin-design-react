import routes from "../routes";
import { getItem } from "@/utils/storeages";

export default function PermissionChecker() {
  const userPermission: any = getItem("permission") || []; //这里是本地存储的数据，拿取权限
  let newRoutes: any = [];
  // 检查并过滤路由
  const filterRoutes = (routes: any[]) => {
    return routes.filter((route) => {
      if (route.meta && route.meta.permission) {
        const permission = route.meta.permission;
        if (permission.some((item: any) => userPermission.includes(item))) {
          // 如果当前路由有子路由，递归地过滤子路由
          if (route.children) {
            route.children = filterRoutes(route.children);
          }
          return true; // 符合条件，保留此路由
        }
      }
      return false; // 不符合条件，移除此路由
    });
  };

  // 使用 filterRoutes 函数处理所有路由
  newRoutes = filterRoutes(routes);

  return newRoutes;
}
