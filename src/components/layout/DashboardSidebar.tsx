"use client";

import {
  LeftOutlined,
  RightOutlined
} from "@ant-design/icons";
import { Heart, Send, User, Lock, Settings, LogOut } from "lucide-react";
import { Layout, Menu, Avatar, Dropdown } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
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

  useEffect(() => {
    const segment = pathname.split("/").filter(Boolean).pop() || "saved";
    setSelectedKey(segment);
  }, [pathname]);

  const menuItems = [
    { key: "saved", icon: <Heart size={18} />, label: "Saved" },
    { key: "enquiries", icon: <Send size={18} />, label: "My Enquiries" },
    { key: "profile", icon: <User size={18} />, label: "Profile" },
    { key: "user-notifications", icon: <Settings size={18} />, label: "Notification Settings" },
    { key: "password-security", icon: <Lock size={18} />, label: "Password & Security" },
  ];

  const handleLogOut = () => {
    dispatch(logout());
    router.push("/auth/login");
  };

  const displayName = user?.user?.name || "User Name";
  const displayRole = user?.user?.role || "User";

  const logoutMenuItems = [
    {
      key: "profile",
      icon: <User size={16} />,
      label: <span className="font-medium">View Profile</span>,
      onClick: () => router.push(displayRole === "Agent" ? "/agency-profile" : "/profile")
    },
    { type: "divider" as const },
    {
      key: "logout",
      icon: <LogOut size={16} />,
      label: <span className="font-bold text-red-600">Log out</span>,
      danger: true,
      onClick: handleLogOut
    }
  ];

  return (
    <>
      <style jsx global>{`
        .ant-layout-sider-children {
          display: flex;
          flex-direction: column;
          height: 100%;
        }
      `}</style>
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapse}
      width={280}
      collapsedWidth={80}
      trigger={null}
      theme="light"
      className="!bg-white border-r border-slate-100 h-full flex flex-col shadow-[1px_0_10px_rgba(0,0,0,0.02)]"
    >
      <div className="flex-1 h-full py-4 flex flex-col justify-between overflow-hidden">
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          inlineIndent={20}
          className="!border-none text-[14px] font-medium flex-1 overflow-y-auto overflow-x-hidden"
          onClick={({ key }) => {
            router.push(`/${key}`);
          }}
        />
        <div className="border-t border-gray-100 p-4">
          <Dropdown 
            menu={{ items: logoutMenuItems }} 
            trigger={['click']} 
            placement="topRight"
            overlayClassName="min-w-[200px]"
          >
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-gray-50 cursor-pointer transition-all border border-transparent hover:border-gray-100 animate-in fade-in duration-300">
              <Avatar 
                size={40} 
                src="/images/customer.png" 
                className="border border-gray-200 shadow-sm shrink-0"
              />
              {!collapsed && (
                <div className="flex-1 min-w-0 text-left">
                  <p className="text-sm font-bold text-gray-800 truncate m-0 leading-tight">
                    {displayName}
                  </p>
                  <p className="text-xs text-gray-500 truncate m-0 mt-1.5 font-medium">
                    {displayRole}
                  </p>
                </div>
              )}
            </div>
          </Dropdown>
        </div>
      </div>

      <button
        onClick={() => onCollapse?.(!collapsed)}
        className="absolute -right-3 top-20 bg-white border border-slate-100 rounded-full w-6 h-6 flex items-center justify-center shadow-md text-slate-400 hover:text-[#1a3c6e] transition-colors z-30"
      >
        {collapsed ? <RightOutlined style={{ fontSize: 10 }} /> : <LeftOutlined style={{ fontSize: 10 }} />}
      </button>
    </Sider>
    </>
  );
}
