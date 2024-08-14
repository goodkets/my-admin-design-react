import type { MenuProps } from "antd";

// 定义菜单项类型
type MenuItem = Required<MenuProps>["items"][number];

// 定义路由项类型
interface RouteItem {
  name: string;
  meta: {
    permission: string[];
    icon?: string;
  };
  path: string;
  children?: RouteItem[];
}

// 创建菜单项的函数
function getItems(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

// 处理路由并转换成菜单项
const routePromissionMeta = (routes: RouteItem[]): MenuItem[] => {
  const processRoutes = (
    routeList: RouteItem[],
    currentDepth = 0,
    maxDepth = 10,
  ): MenuItem[] => {
    if (currentDepth > maxDepth) return []; // 防止递归过深
    const result: MenuItem[] = [];
    for (const element of routeList) {
      if (element.meta.permission && element.name) {
        let keyPath = element.path;
        if (result.length == 0) {
          keyPath = element.path.substring(1);
        }
        if (element.children && element.children.length > 0) {
          const children = processRoutes(element.children, currentDepth + 1);
          result.push(
            getItems(element.name, keyPath, element.meta.icon, children),
          );
        } else {
          result.push(getItems(element.name, keyPath, element.meta.icon));
        }
      }
    }
    return result;
  };

  return processRoutes(routes);
};

// 导出处理后的菜单项
export default routePromissionMeta;
