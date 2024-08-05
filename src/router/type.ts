// type RouteObject = {
//     path?: string;
//     element: React.CElement<any, React.Component<any, any, any>>;
//     // 添加 name 属性
//     name?: string; // 使用可选属性符号
// };
type RouteConfig = {
  path: string;
  name: string;
  element: any;
};

export type RouterObject = RouteConfig[];
