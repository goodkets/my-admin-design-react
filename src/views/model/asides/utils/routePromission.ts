import PermissionChecker from "@/router/utils/permission";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>["items"][number];

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
const routes = PermissionChecker();

const routePromissionMeta = (routes:any[]) =>{
    let items: MenuItem[] = []
    
  routes.forEach((element) => {
    if (element.meta.permission && element.name) {
      let children: MenuItem[] = [];
      if (element.children && element.children.length > 0) {
        children = routePromissionMeta(element.children); // 递归处理子菜单
      }
      items.push(
        getItems(element.name, element.path, element.meta.icon, children),
      );
    }
  });
    // routes.forEach((element) => {
    //     if (element.meta.permission && element.name) {
    //       if (element.children && element.children.length > 0) {
    //         let children:MenuItem[] = []
    //         element.children.forEach((item) => {
    //           if (item.meta.permission && item.path) {
    //             children.push(getItems(item.name, item.path.substring(1), item.meta.icon));
    //           }
    //         });
    //         items.push(
    //           getItems(element.name, element.path, element.meta.icon, [...children]),
    //         );
    //       } else {
    //         items.push(getItems(element.name, element.path, element.meta.icon));
    //       }
    //     }
    //   });
      return items;
}
export default routePromissionMeta(routes)