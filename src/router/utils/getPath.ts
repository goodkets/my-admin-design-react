import PermissionChecker from "../utils/permission";
const getPath = (routes) => {
  const pathArrays = (routeList) => {
    let resultList = [];
    routeList.forEach((route) => {
      if (route.children && route.children.length > 0) {
        resultList.push(...pathArrays(route.children));
      } else {
        resultList.push(route.path);
      }
    });
    return resultList;
  };
  return pathArrays(routes);
};

export default getPath(PermissionChecker());
