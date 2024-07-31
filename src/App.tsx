import React from "react";
import { Button } from "antd";
import { reqLogin } from "@/api";
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
      <Button
        onClick={() => {
          getLogin();
        }}
      >
        Hello Vite + React!
      </Button>
    </div>
  );
};

export default App;
