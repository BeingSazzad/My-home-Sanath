"use client";

import { Form, Button, Checkbox, Input } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/feature/auth/authSlice";
import ChooseRoleForm from "./ChooseRoleForm";


export default function Signup() {
  const [form] = Form.useForm();
  const searchParams = useSearchParams();
  const role = searchParams.get("role");
  const isAgent = role === "agent";
  const router = useRouter();

  const dispatch = useDispatch();

  if (!role) {
    return <ChooseRoleForm />
  }

  const handleSubmit = async (payload: Record<string, any>) => {
    try {
      const selectedPlan = searchParams.get("plan");
      let mockSubscription = null;

      if (isAgent && selectedPlan) {
        let planName = "Free Trial";
        let price = "0";
        let cycle = "6 months";
        
        const lowerPlan = selectedPlan.toLowerCase();
        if (lowerPlan === "starter") {
          planName = "Starter";
          price = "49";
          cycle = "monthly";
        } else if (lowerPlan === "pro" || lowerPlan === "professional") {
          planName = "Professional";
          price = "99";
          cycle = "monthly";
        } else if (lowerPlan === "premium") {
          planName = "Premium";
          price = "199";
          cycle = "monthly";
        } else if (lowerPlan === "free" || lowerPlan === "trial") {
          planName = "Free Trial";
          price = "0";
          cycle = "6 months";
        }
        
        mockSubscription = {
          status: "active",
          planName: planName,
          price: price,
          cycle: cycle,
          renewalDate: new Date(Date.now() + (planName === "Free Trial" ? 180 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
          invoices: [
            { 
              id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
              date: new Date().toLocaleDateString(), 
              amount: price === "0" ? "Free" : `£${price}`, 
              status: "Paid" 
            }
          ]
        };
      }

      // Mock successful registration
      const mockUser = {
        user: {
          id: Math.random().toString(36).substring(7),
          email: payload.email,
          name: payload.name,
          role: isAgent ? "Agent" : "User",
          subscription: mockSubscription,
          iat: Date.now(),
          exp: Date.now() + 86400000,
        },
        token: "mock-jwt-token-signup-12345"
      };
      
      dispatch(setUser(mockUser));
      toast.success(isAgent ? `Agent account created with ${mockSubscription ? mockSubscription.planName : "Free Trial"} Plan!` : "Account created successfully!");
      
      // Redirect based on role
      if (isAgent) {
        router.push("/overview");
      } else {
        router.push("/");
      }
    } catch (err) {
      console.error("Signup error:", err);
      toast.error("Unexpected error occurred", { id: "register" });
    }
  };

  return (
    <div>
      <div className="text-center mb-7">
        <h2 className="text-2xl font-extrabold text-[#1a3c6e]">Create Account</h2>
        <p className="text-gray-500 mt-1 text-sm">
          {isAgent ? "Start listing properties and managing enquiries" : "Join MyHome and find your perfect property"}
        </p>
      </div>

      <Form
        form={form}
        layout="vertical"
        onFinish={handleSubmit}
        requiredMark={false}
      >
        <Form.Item name="name" label={<span className="text-sm font-medium text-gray-700">Full Name</span>} rules={[{ required: true, message: "Full Name is required" }]}>
          <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your full name" size="large" className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e]" />
        </Form.Item>
        
        {isAgent && (
          <Form.Item name="agencyName" label={<span className="text-sm font-medium text-gray-700">Agency / Company Name</span>} rules={[{ required: true, message: "Agency Name is required" }]}>
            <Input prefix={<UserOutlined className="text-gray-400" />} placeholder="Enter your agency name" size="large" className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e]" />
          </Form.Item>
        )}

        <Form.Item name="email" label={<span className="text-sm font-medium text-gray-700">Email Address</span>} rules={[{ required: true, message: "Email is required" }, { type: "email", message: "Enter a valid email" }]}>
          <Input prefix={<MailOutlined className="text-gray-400" />} placeholder="your.email@example.com" size="large" className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e]" />
        </Form.Item>

        <Form.Item name="password" label={<span className="text-sm font-medium text-gray-700">Password</span>} rules={[{ required: true, message: "Password is required" }, { min: 8, message: "Minimum 8 characters" }]}>
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Min 8 characters" size="large" className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e]" />
        </Form.Item>

        <Form.Item 
          name="confirmPassword" 
          label={<span className="text-sm font-medium text-gray-700">Confirm Password</span>} 
          dependencies={['password']}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Passwords do not match!'));
              },
            }),
          ]}
        >
          <Input.Password prefix={<LockOutlined className="text-gray-400" />} placeholder="Repeat Password" size="large" className="!rounded-lg !border-gray-200 hover:!border-[#1a3c6e] focus:!border-[#1a3c6e]" />
        </Form.Item>

        <Form.Item
          name="agree"
          valuePropName="checked"
          rules={[{ validator: (_, v) => v ? Promise.resolve() : Promise.reject("You must agree") }]}
        >
          <Checkbox className="text-sm text-gray-500">
            I agree to the{" "}
            <Link href="/terms-condition" className="text-[#1a3c6e] font-medium hover:underline">Terms & Conditions</Link>
            {" "}and{" "}
            <Link href="/privacy" className="text-[#1a3c6e] font-medium hover:underline">Privacy Policy</Link>
          </Checkbox>
        </Form.Item>

        <Button
          type="primary"
          htmlType="submit"
          block
          size="large"
          className="!bg-[#1a3c6e] !border-[#1a3c6e] !rounded-lg !font-semibold"
        >
          Continue
        </Button>
      </Form>

      <div className="flex items-center gap-3 my-5">
        <div className="flex-1 h-px bg-gray-200" />
        <span className="text-gray-400 text-sm font-medium">OR</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <Button
        size="large"
        block
        className="!rounded-lg !border-gray-200 !text-gray-700 !font-medium hover:!border-gray-400 flex items-center justify-center gap-2"
        icon={
          <svg viewBox="0 0 24 24" className="w-5 h-5" xmlns="http://www.w3.org/2000/svg">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
          </svg>
        }
      >
        Continue with Google
      </Button>

      <p className="text-center text-sm text-gray-500 mt-5">
        Already have an account?{" "}
        <Link href="/auth/login" className="text-[#1a3c6e] font-semibold hover:underline">
          Sign in here
        </Link>
      </p>
    </div>
  );
}