"use client";

import useBaseUrl from "@/hooks/useBaseUrl";
import {
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { Heart, Send, User, Lock, Settings, LogOut } from "lucide-react";
import { Layout, Menu } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/feature/auth/authSlice";

const { Sider } = Layout;

interface DashboardSidebarProps {
  collapsed?: boolean;
  onCollapse?: (collapsed: boolean) => void;
}

export default function DashboardSidebar({
  collapsed = false,
  onCollapse,
}: DashboardSidebarProps) {
  const [selectedKey, setSelectedKey] = useState("saved");
  const router = useRouter();
  const pathname = usePathname();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);

  const userData = user?.user;
  const displayName = userData?.name || userData?.email?.split("@")[0] || "My Account";
  const initials = displayName.split(" ").map((n: string) => n[0]).join("").toUpperCase().slice(0, 2);

  useEffect(() => {
    const segment = pathname.split("/").filter(Boolean).pop() || "saved";
    setSelectedKey(segment);
  }, [pathname]);

  const menuItems = [
    { key: "saved", icon: <Heart size={18} />, label: "Saved" },
    { key: "enquiries", icon: <Send size={18} />, label: "My Enquiries" },
    { key: "profile", icon: <User size={18} />, label: "Personal Information" },
    { key: "notification-settings", icon: <Settings size={18} />, label: "Notification Settings" },
    { key: "password-security", icon: <Lock size={18} />, label: "Password & Security" },
    { type: "divider" as const },
    { key: "logout", icon: <LogOut size={18} />, label: "Log out", danger: true },
  ];

  const handleLogOut = () => {
    toast("Are you sure you want to log out?", {
        description: "You will need to sign in again to access your dashboard.",
        action: {
            label: "Logout",
            onClick: () => {
                dispatch(logout());
                router.push("/auth/login");
            },
        },
    });
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={280}
      collapsedWidth={80}
      trigger={null}
      theme="light"
      className="!bg-white border-r border-slate-100 h-screen sticky top-0 left-0 z-20 flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]"
    >
      {/* User Profile Header */}
      {!collapsed ? (
        <div className="px-5 py-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#0f2d5e] to-[#255099] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
              {initials}
            </div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-gray-900 truncate">{displayName}</p>
              <p className="text-[11px] text-[#1a3c6e] font-semibold uppercase tracking-wider">User Dashboard</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex justify-center py-4 border-b border-slate-100">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#0f2d5e] to-[#255099] flex items-center justify-center text-white font-bold text-xs">
            {initials}
          </div>
        </div>
      )}

      <div className="flex-1 py-4 flex flex-col justify-between">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          inlineIndent={20}
          className="!border-none text-[14px] font-medium"
          onClick={({ key }) => {
            if (key === "logout") {
              handleLogOut();
            } else {
              router.push(`/${key}`);
            }
          }}
        />
      </div>

      <button
        onClick={() => onCollapse?.(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-slate-100 rounded-full w-6 h-6 flex items-center justify-center shadow-md text-slate-400 hover:text-[#1a3c6e] transition-colors z-30"
      >
        {collapsed ? <RightOutlined style={{ fontSize: 10 }} /> : <LeftOutlined style={{ fontSize: 10 }} />}
      </button>
    </Sider>
  );
}