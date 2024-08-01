import React from "react";
import { Button } from "antd";
import { reqLogin } from "@/api";
import UserLogin from "./views/login";
const App: React.FC = () => {
  const getLogin = async () => {
    const res = await reqLogin({
      username: "admin",
      password: "111111",
    });
    console.log(res);
  };
  return (
    <div>
      <UserLogin />
    </div>
  );
};

export default App;
