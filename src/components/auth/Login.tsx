"use client";

import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { Button, Form, Input, Segmented } from "antd";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/feature/auth/authSlice";
import { useState } from "react";
import { User, ShieldCheck } from "lucide-react";


export default function LoginForm() {
  const [form] = Form.useForm();
  const [role, setRole] = useState<string>("user");
  const router = useRouter();
  const dispatch = useDispatch();

  const handleSubmit = async (payload: Record<string, string>) => {
    try {
      // Mock successful login
      const mockUser = {
        user: {
          id: "1",
          email: payload.email || "user@example.com",
          role: role === "agent" ? "Agent" : "User",
          iat: Date.now(),
          exp: Date.now() + 86400000,
        },
        token: "mock-jwt-token-12345"
      };
      
      dispatch(setUser(mockUser));
      toast.success(`Signed in as ${role === "agent" ? "Agent" : "User"} successfully`);
      
      // Redirect based on role
      if (role === "agent") {
        router.push("/analytics");
      } else {
        router.push("/saved");
      }
    } catch (err) {
      console.error("LoginForm error:", err);
      toast.error("Unexpected error occurred", { id: "login" });
    }
  };

  return (
    <div className="max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-[#1a3c6e]">Welcome Back</h2>
        <p className="text-gray-500 mt-2 text-[15px]">Select your account type to continue</p>
      </div>

      <div className="bg-white border border-gray-100 rounded-[2rem] p-8 shadow-xl shadow-blue-900/5">
        {/* Role Selection */}
        <div className="mb-8 p-1.5 bg-gray-50 rounded-2xl border border-gray-100">
          <Segmented
            block
            size="large"
            value={role}
            onChange={(val) => setRole(val as string)}
            options={[
              {
                label: (
                  <div className={`flex items-center justify-center gap-2 py-1 transition-all ${role === 'user' ? 'text-[#1a3c6e]' : 'text-gray-500'}`}>
                    <User size={18} />
                    <span className="font-bold">User</span>
                  </div>
                ),
                value: 'user',
              },
              {
                label: (
                  <div className={`flex items-center justify-center gap-2 py-1 transition-all ${role === 'agent' ? 'text-[#1a3c6e]' : 'text-gray-500'}`}>
                    <ShieldCheck size={18} />
                    <span className="font-bold">Agent</span>
                  </div>
                ),
                value: 'agent',
              },
            ]}
            className="role-segmented !rounded-xl"
          />
        </div>

        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          requiredMark={false}
          className="space-y-4"
        >
          <Form.Item 
            name="email" 
            label={<span className="text-sm font-bold text-[#1a3c6e]">Email Address</span>} 
            rules={[{ required: true, message: "Email is required" }]}
          >
            <Input 
              prefix={<MailOutlined className="text-gray-400 mr-2" />} 
              placeholder="name@example.com" 
              size="large" 
              className="!rounded-xl !border-gray-100 !bg-gray-50/50 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e] !h-12" 
            />
          </Form.Item>

          <Form.Item 
            name="password" 
            label={
              <div className="flex justify-between items-center w-full">
                <span className="text-sm font-bold text-[#1a3c6e]">Password</span>
                <Link href="/auth/forget-password" className="text-xs text-gray-400 hover:text-[#1a3c6e] font-medium transition-colors">
                  Forgot password?
                </Link>
              </div>
            } 
            rules={[{ required: true, message: "Password is required" }]}
          >
            <Input.Password 
              prefix={<LockOutlined className="text-gray-400 mr-2" />} 
              placeholder="••••••••" 
              size="large" 
              className="!rounded-xl !border-gray-100 !bg-gray-50/50 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e] !h-12" 
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            className="!bg-[#1a3c6e] !border-[#1a3c6e] !h-14 !rounded-xl !font-bold !text-[16px] !mt-6 shadow-lg shadow-[#1a3c6e]/20 hover:!scale-[1.01] active:!scale-95 transition-all"
          >
            Sign In as {role === 'agent' ? 'Agent' : 'User'}
          </Button>
        </Form>

        <div className="flex items-center gap-4 my-8">
          <div className="flex-1 h-[1px] bg-gray-100" />
          <span className="text-gray-300 text-xs font-bold uppercase tracking-widest">Secure Login</span>
          <div className="flex-1 h-[1px] bg-gray-100" />
        </div>

        <p className="text-center text-[15px] text-gray-500">
          New here?{" "}
          <Link href="/auth/signup" className="text-[#1a3c6e] font-bold hover:underline">
            Create an account
          </Link>
        </p>
      </div>

      <style jsx global>{`
        .role-segmented.ant-segmented {
          background: transparent !important;
        }
        .role-segmented .ant-segmented-item-selected {
          background: white !important;
          box-shadow: 0 4px 12px rgba(26, 60, 110, 0.08) !important;
          border-radius: 10px !important;
        }
        .role-segmented .ant-segmented-thumb {
          background: white !important;
          box-shadow: 0 4px 12px rgba(26, 60, 110, 0.08) !important;
          border-radius: 10px !important;
        }
        /* Full width labels for right alignment */
        .ant-form-item-label {
          width: 100% !important;
          padding: 0 !important;
        }
        .ant-form-item-label > label {
          width: 100% !important;
          display: block !important;
        }
      `}</style>
    </div>
  );
}