import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
function AuthGuard({ children }: { children: JSX.Element }) {
  const navigate = useNavigate();
  const token = useSelector((state: any) => state.userSlice.token);

  useEffect(() => {
    if (token) {
      // 如果已经登录，则重定向到登录页面
      navigate("/home");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <>{children}</>;
}

export default AuthGuard;
