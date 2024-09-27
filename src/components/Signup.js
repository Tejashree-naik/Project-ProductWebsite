import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form, Input } from "antd";
import "./Signup.css"; // Ensure you import your CSS file

const Signup = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.log("Received values of form: ", values);
    localStorage.setItem("userData", JSON.stringify(values)); // Store user data in localStorage
    navigate("/"); // Navigate to login page after registration
  };

  return (
    <div className="signup-container">
      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        initialValues={{ prefix: "86" }}
        style={{ maxWidth: 400 }} // Ensure the form width is controlled here
        scrollToFirstError
      >
        <h2 className="signup-heading">Sign Up</h2>{" "}
        {/* Add heading inside the form */}
        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Please input your password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="confirm"
          label="Confirm Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Please confirm your password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error("The passwords do not match!"));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          name="name"
          label="Name"
          tooltip="What do you want others to call you?"
          rules={[
            {
              required: true,
              message: "Please input your name!",
              whitespace: true,
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Signup;
