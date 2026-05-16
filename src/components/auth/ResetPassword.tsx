"use client";

import { useState } from "react";
import { Form, Button, Input } from "antd";
import {
  LockOutlined,
  EyeOutlined,
  EyeInvisibleOutlined,
  CheckCircleOutlined,
  ArrowLeftOutlined,
} from "@ant-design/icons";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { myFetch } from "@/helpers/myFetch";
import Image from "next/image";



export default function ResetPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const [password, setPassword] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: { newPassword: string; confirmPassword: string }
  ) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await myFetch("/resetPassword", {
        method: "POST",
        body: { email, newPassword: payload.newPassword },
      });

      if (response?.success) {
        toast.success(response?.message || "Password reset successfully!");
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) =>
            toast.error(err.message, { id: "reset-password" })
          );
        } else {
          toast.error(response?.message || "Something went wrong!", {
            id: "reset-password",
          });
        }
      }
    } catch (err) {
      console.error("ResetPasswordForm error:", err);
      toast.error("Unexpected error occurred", { id: "reset-password" });
    } finally {
      setLoading(false);
    }
  };

  /* ── Form State ── */
  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-2xl  flex items-center justify-center mx-auto mb-4">
          <Image height={100} width={100} src="/logo.png" alt="logo" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#1a3c6e]">New Password</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
          Create a strong password you haven&apos;t used before.
        </p>
      </div>

      {/* Card */}
      <div className="border border-blue-100 rounded-2xl p-7 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          requiredMark={false}
          onFinish={(values) =>
            handleSubmit(
              new Event("submit") as unknown as React.FormEvent<HTMLFormElement>,
              values
            )
          }
        >
          {/* New Password */}
          <Form.Item
            name="newPassword"
            label={
              <span className="text-sm font-medium text-gray-700">
                New Password
              </span>
            }
            rules={[
              { required: true, message: "Password is required" },
              { min: 8, message: "Minimum 8 characters" },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Min 8 characters"
              size="large"
              onChange={(e) => setPassword(e.target.value)}
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined className="text-gray-400" />
                ) : (
                  <EyeInvisibleOutlined className="text-gray-400" />
                )
              }
              className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e] !bg-gray-50/50"
            />
          </Form.Item>

          {/* Confirm Password */}
          <Form.Item
            name="confirmPassword"
            label={
              <span className="text-sm font-medium text-gray-700">
                Confirm Password
              </span>
            }
            dependencies={["newPassword"]}
            rules={[
              { required: true, message: "Please confirm your password" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("newPassword") === value)
                    return Promise.resolve();
                  return Promise.reject(
                    new Error("Passwords do not match")
                  );
                },
              }),
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="Repeat your password"
              size="large"
              iconRender={(visible) =>
                visible ? (
                  <EyeOutlined className="text-gray-400" />
                ) : (
                  <EyeInvisibleOutlined className="text-gray-400" />
                )
              }
              className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e] !bg-gray-50/50"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="!bg-[#1a3c6e] !border-[#1a3c6e] !rounded-lg !font-semibold"
          >
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
}