import React from "react";
import { useNavigate } from "react-router-dom";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, message } from "antd";
import "./Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);

    // Retrieve stored user data from localStorage
    const storedData = JSON.parse(localStorage.getItem("userData"));

    // Check if the input matches the stored user data
    if (
      storedData &&
      storedData.email === values.email &&
      storedData.password === values.password
    ) {
      // Navigate to the product page if login is successful
      navigate("/products");
    } else {
      message.error("Invalid email or password!"); // Show error message
    }
  };

  return (
    <div className="login-container">
      <Form
        form={form}
        name="login"
        initialValues={{
          remember: true,
        }}
        style={{
          maxWidth: 360,
          margin: "auto", // Center the form horizontally
        }}
        onFinish={onFinish}
      >
        <h2 className="login-heading">Login</h2>{" "}
        {/* Add heading inside the form */}
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input prefix={<UserOutlined />} placeholder="E-mail" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: "Please input your Password!",
            },
          ]}
        >
          <Input
            prefix={<LockOutlined />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
          </div>
        </Form.Item>
        <Form.Item>
          <Button block type="primary" htmlType="submit">
            Log in
          </Button>
          or{" "}
          <Button
            type="link"
            onClick={(e) => {
              e.preventDefault();
              navigate("/signup"); // Navigate to the signup page
            }}
          >
            Register now!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
