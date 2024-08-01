import styles from "./index.module.less";
import loginIcon from "@/assets/images/logo_name.png";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input } from "antd";
import { useState } from "react";
const UserLogin = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = (values: any) => {
    setLoading(true);
    console.log("Received values of form: ", values);
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
          initialValues={{ remember: true }}
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
