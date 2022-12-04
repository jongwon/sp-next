"use client";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Modal } from "antd";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {}

const LoginForm = ({}: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: any) {
    setLoading(true);

    const data = {
      username: event.username,
      password: event.password,
    };

    if (event.remember) {
      // 로그인 기억하기
      localStorage.setItem("username", event.username);
    } else {
      localStorage.setItem("username", "");
    }

    const result: any = await signIn("credentials", {
      redirect: false,
      type: "login",
      ...data,
    });
    setLoading(false);
    console.log(result);

    if (!result.error) {
      const nextUrl = result.url.replace(`${process.env.NEXTAUTH_URL}`, "");
      router.push(nextUrl && "/");
    } else {
      Modal.error({
        title: "로그인 실패",
        content: result.error,
        okText: "확인",
        centered: true,
        onOk: () => {
          // event.target.username.focus();
        },
      });
    }
  }

  return (
    <div className="bg-slate-200 pt-8 pb-4 px-6 rounded-md">
      <Form
        name="normal_login"
        initialValues={{
          remember: true,
          username: localStorage.getItem("username") || "",
        }}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "아이디를 입력해 주세요." }]}
        >
          <Input
            size="large"
            className="py-2"
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "비밀번호를 입력해 주세요!" }]}
        >
          <Input
            size="large"
            className="py-2"
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>

        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox> 로그인 기억하기 </Checkbox>
          </Form.Item>
        </Form.Item>

        <Form.Item>
          <Button
            size="large"
            type="primary"
            htmlType="submit"
            loading={loading}
            block
          >
            로그인 2
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginForm;
