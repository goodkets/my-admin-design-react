import styles from "./index.module.less";
import loginIcon from "@/assets/images/logo_name.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
import { reqLogin } from "@/api/user";
import { asyncFunc } from "../../utils/asyncFunc";
import { message } from "antd";
import React from "react";
import {  useDispatch } from "react-redux";
import { setUserToken } from "../../store/user";
import { useNavigate } from "react-router-dom";
const UserLogin: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onFinish = async (values: any) => {
    try {
      setLoading(true);
      asyncFunc(async () => {
        const res = await reqLogin({
          username: values.username,
          password: values.password,
        });
        console.log(res);
        if (res.token) {
          setLoading(false);
          dispatch(setUserToken(res.token));
          message.success("登录成功");
          navigate("/");

        }
      }, 2000);
    } catch (error) {
      setLoading(false);
      message.error("登录失败");
    }
  };
  return (
    <div className={styles["login-wrapper"]}>
      <div className={styles["login-content"]}>
        <div className={styles["login-content-title"]}>
          <img src={loginIcon} alt="" />
          <h3>账号登录</h3>
        </div>
        <Form
          name="normal_login"
          className={styles["login-content-form"]}
          initialValues={{
            username: "admin",
            password: "111111",
            remember: true,
          }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0, 0, 0, 0.25)" }}
                  className="site-form-item-icon"
                />
              }
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              type="password"
              placeholder="Password"
              prefix={
                <LockOutlined
                  style={{ color: "rgba(0, 0, 0, 0.25)" }}
                  rev={undefined}
                />
              }
            />
          </Form.Item>
          <Form.Item>
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={styles["login-content-btn"]}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default UserLogin;
