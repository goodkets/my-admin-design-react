import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import getPath from "./getPath";

function AuthGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.userSlice.token);
  const url = location.href;
  console.log(getPath);
  console.log(location.href)

  useEffect(() => {
    for(let i  of getPath) {
      if(url.includes(i)) {
        return navigate("/home");
      } else {
        navigate("/403");
      }
    }
    // if (token) {
    //   // 如果已经登录，则重定向到登录页面
    //   navigate("/home");
    // } else {
    //   navigate("/login");
    // }
  }, [navigate]);

  return <>{children}</>;
}

export default AuthGuard;
