//统一管理咱们项目用户相关的接口

import request from "@/utils/axios";

import type {
  loginFormData,
  loginResponseData,
  userInfoReponseData,
} from "./type";

//项目用户相关的请求地址

enum API {
  LOGIN_URL = "/user/login",

  USERINFO_URL = "/user/info",
  PERMISSION_URL = "/user/permission",

  LOGOUT_URL = "/user/logout",
}
//登录接口
const reqLogin = (data: loginFormData) =>
  request.post<any, loginResponseData>(API.LOGIN_URL, data);

//获取用户信息
const reqUserInfo = () =>
  request.get<any, userInfoReponseData>(API.USERINFO_URL);

//获取权限
const reqPermission = () => request.get<any, any>(API.PERMISSION_URL);

export { reqLogin, reqUserInfo, reqPermission };
