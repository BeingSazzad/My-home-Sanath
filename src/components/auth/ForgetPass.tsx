"use client";

import { useState } from "react";
import { Form, Button, Input } from "antd";
import { MailOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import Link from "next/link";
import { toast } from "sonner";
import { myFetch } from "@/helpers/myFetch";
import { useRouter } from "next/navigation";
import Image from "next/image";


export default function ForgotPasswordForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const router = useRouter()


  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: { email: string }
  ) => {
    e.preventDefault();
    setLoading(true);

    try {

      router.push(`/auth/verify-otp?email=${encodeURIComponent(payload?.email ?? "")}`);

      const response = await myFetch("/forgetpassword", {
        method: "POST",
        body: payload,
      });

      if (response?.success) {
        toast.success(response?.message || "Reset link sent!");
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) =>
            toast.error(err.message, { id: "forgot-password" })
          );
        } else {
          toast.error(response?.message || "Something went wrong!", {
            id: "forgot-password",
          });
        }
      }
    } catch (err) {
      console.error("ForgotPasswordForm error:", err);
      toast.error("Unexpected error occurred", { id: "forgot-password" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-20 h-20 rounded-2xl  flex items-center justify-center mx-auto mb-4">
          <Image height={100} width={100} src="/logo.png" alt="logo" />
        </div>
        <h2 className="text-2xl font-extrabold text-[#1a3c6e]">Forgot Password?</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-xs mx-auto">
          No worries! Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      {/* Form */}
      <div className="border border-blue-100 rounded-2xl p-7 shadow-sm">
        <Form
          form={form}
          layout="vertical"
          onFinish={(values) =>
            handleSubmit(
              new Event("submit") as unknown as React.FormEvent<HTMLFormElement>,
              values
            )
          }
          requiredMark={false}
        >
          <Form.Item
            name="email"
            label={
              <span className="text-sm font-medium text-gray-700">Email Address</span>
            }
            rules={[
              { required: true, message: "Email is required" },
              { type: "email", message: "Enter a valid email" },
            ]}
          >
            <Input
              prefix={<MailOutlined className="text-gray-400" />}
              placeholder="your.email@example.com"
              size="large"
              className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e] !bg-gray-50/50"
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            className="!bg-[#1a3c6e] !border-[#1a3c6e] !rounded-lg !font-semibold !mt-1"
          >
            Send Reset Link
          </Button>
        </Form>

        <Link
          href="/auth/login"
          className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1a3c6e] transition-colors font-medium mt-5"
        >
          <ArrowLeftOutlined className="text-xs" />
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}