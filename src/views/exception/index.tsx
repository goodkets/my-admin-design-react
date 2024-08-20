import type { FC, ReactNode } from "react";
import { Result, Button } from "antd";
import { useNavigate, useLoaderData } from "react-router-dom";
import { ExceptionEnum } from "@/enums/exceptionEnum";

const subTitleMap = new Map([
  [ExceptionEnum.PAGE_NOT_ACCESS, "对不起，您没有权限访问此页面。"],
  [ExceptionEnum.PAGE_NOT_FOUND, "对不起，您访问的页面不存在。"],
  [ExceptionEnum.SERVER_ERROR, "对不起，服务器发生错误。"],
]);

const PageException: FC = () => {
  const navigate = useNavigate();
  const backHome = () => {
    navigate("/");
  };
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <Button type="primary" onClick={backHome}>
          Back Home
        </Button>
      }
    />
  );
};

export default PageException;
