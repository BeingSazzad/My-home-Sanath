"use client";

import useBaseUrl from "@/hooks/useBaseUrl";
import {
  LeftOutlined,
  LogoutOutlined,
  RightOutlined
} from "@ant-design/icons";
import { Heart, Search, Send, Bell, User, Lock, LogOut } from "lucide-react";
import { Avatar, Button, Layout, Menu, Tag, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const { Sider } = Layout;
const { Text } = Typography;

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function DashboardSidebar({
  collapsed = false,
  onCollapse,
}: DashboardSidebarProps) {
  const [selectedKey, setSelectedKey] = useState("analytics");
  const router = useRouter();
  const pathname = usePathname();
  const baseUrl = useBaseUrl();

  useEffect(() => {
    setSelectedKey(pathname.split("/")[1] || "analytics");
  }, [pathname]);

  const menuItems = [
    { key: "saved", icon: <Heart size={18} />, label: "My Saved" },
    { key: "enquiries", icon: <Send size={18} />, label: "My Enquiries" },
    { key: "user-notifications", icon: <Bell size={18} />, label: "Alerts & Notifications" },
    { key: "profile", icon: <User size={18} />, label: "Personal Information" },
    { key: "password-security", icon: <Lock size={18} />, label: "Password & Security" },
  ];

  const handleSetQuery = (value: boolean) => {
    const params = new URLSearchParams(window.location.search);

    params.set("collapsed", String(value));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  const handleLogOut = () => {
    toast.warning("Are you sure you want to log out?", {
      duration: 5000,
      description: "You will be logged out and redirected to the login page.",
      action: {
        label: "Logout",
        onClick: async () => {
          try {
            await toast.promise(
              fetch(`${baseUrl}/api/auth/logout`, {
                method: "POST",
                credentials: "include",
              }).then(async (res) => {
                const data = await res.json();
                if (!res.ok) throw new Error(data.message || "Logout failed");
                return data.message;
              }),
              {
                loading: "Logging out...",
                success: (msg) => <b>{msg}</b>,
                error: (err) => err.message || "Logout failed",
              }
            );
            router.push("/auth/login");
          } catch (error) {
            console.error("Unexpected logout error:", error);
            toast.error("Something went wrong during logout");
          }
        },
      },
    });
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={handleSetQuery}
      width={260}
      collapsedWidth={72}
      trigger={null}
      className="bg-white! border-r border-[#f0f0f0] h-[90vh] relative left-0 bottom-0 z-10 flex flex-col overflow-y-auto"
    >
      {/* Sidebar Toggle Only */}
      <div className={`flex items-center ${collapsed ? "justify-center py-4" : "justify-end p-4"} border-b border-[#f0f0f0]`}>
        <Button
          type="text"
          icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
          onClick={() => onCollapse?.(!collapsed)}
          className="text-[#6b7280] text-base hover:bg-gray-50 rounded-lg h-9 w-9 flex items-center justify-center p-0"
        />
      </div>

      {/* Main Menu */}
      <div className="flex-1 overflow-y-auto flex flex-col h-[calc(90vh-160px)]">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          inlineIndent={16}
          className="border-none! text-sm font-medium py-2 "
          onClick={({ key }) => {
            router.push(`/${key}`);
          }}
        />

        {/* Logout Button */}
        <div className="mt-auto border-t border-[#f0f0f0]">
          <Button
            type="text"
            icon={<LogOut size={18} className="text-red-500" />}
            onClick={handleLogOut}
            className={`w-full h-12 flex items-center gap-2 text-red-500 hover:text-red-600 font-bold text-sm rounded-none ${collapsed ? "justify-center pl-0" : "justify-start pl-6"
              }`}
          >
            {!collapsed && "Sign Out"}
          </Button>
        </div>
      </div>
    </Sider>
  );
}