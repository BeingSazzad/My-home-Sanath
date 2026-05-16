"use client";

import useBaseUrl from "@/hooks/useBaseUrl";
import {
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Tag, Typography } from "antd";
import { 
    LayoutDashboard, 
    House, 
    Mail, 
    CreditCard, 
    UserCog, 
    ShieldCheck,
    LogOut 
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "@/redux/feature/auth/authSlice";

const { Sider } = Layout;
const { Text } = Typography;

interface AgentDashboardSidebarProps {
    collapsed?: boolean;
    onCollapse?: (collapsed: boolean) => void;
}

export default function AgentDashboardSidebar({
    collapsed = false,
    onCollapse,
}: AgentDashboardSidebarProps) {
    const [selectedKey, setSelectedKey] = useState("overview");
    const router = useRouter();
    const pathname = usePathname();
    const baseUrl = useBaseUrl();
    const dispatch = useDispatch();
    const { user } = useSelector((state: any) => state.auth);
    
    const userData = user?.user;
    const subscription = userData?.subscription;
    const planName = subscription?.status === "active" ? subscription.planName : "No Active Plan";
    const initials = userData?.name ? userData.name.split(" ").map((n: string) => n[0]).join("").toUpperCase() : "AG";

    useEffect(() => {
        // More robust path matching
        const segment = pathname.split("/").filter(Boolean).pop() || "overview";
        setSelectedKey(segment);
    }, [pathname]);

    const menuItems = [
        { key: "overview", icon: <LayoutDashboard size={18} />, label: "Overview" },
        { key: "my-listing", icon: <House size={18} />, label: "My Properties" },
        { key: "agent-enquiries", icon: <Mail size={18} />, label: "Enquiries" },
        { key: "subscription", icon: <CreditCard size={18} />, label: "Subscription & Billing" },
        { key: "agency-profile", icon: <UserCog size={18} />, label: "Agency Profile" },
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
            <div
                className={`flex items-center gap-3 transition-all duration-300 border-b border-slate-50 ${
                    collapsed ? "py-6 px-4 justify-center" : "py-7 px-6"
                }`}
            >
                <div className="flex items-center gap-3 overflow-hidden">
                    <Avatar
                        size={collapsed ? 40 : 48}
                        className="bg-[#1a3c6e]/5 text-[#1a3c6e] font-bold shrink-0 border border-[#1a3c6e]/10 shadow-sm"
                    >
                        {initials}
                    </Avatar>
                    {!collapsed && (
                        <div className="flex flex-col min-w-0">
                            <Text className="text-[10px] font-bold text-[#1a3c6e] uppercase tracking-wider mb-0.5">Agent Dashboard</Text>
                            <div className="mt-1.5">
                                <Tag className={`${subscription?.status === "active" ? "bg-[#1a3c6e]" : "bg-orange-500"} border-none text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0 rounded-md m-0 shadow-sm`}>
                                    {planName}
                                </Tag>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Main Menu */}
            <div className="flex-1 py-4 flex flex-col justify-between">
                <Menu
                    mode="inline"
                    selectedKeys={[selectedKey]}
                    items={menuItems}
                    inlineIndent={20}
                    className="!border-none text-[14px] font-medium"
                    onClick={({ key }) => {
                        router.push(`/${key}`);
                    }}
                />

            </div>

            {/* Collapse Toggle */}
            <button
                onClick={() => onCollapse?.(!collapsed)}
                className="absolute -right-3 top-20 bg-white border border-slate-100 rounded-full w-6 h-6 flex items-center justify-center shadow-md text-slate-400 hover:text-[#1a3c6e] transition-colors z-30"
            >
                {collapsed ? <RightOutlined style={{ fontSize: 10 }} /> : <LeftOutlined style={{ fontSize: 10 }} />}
            </button>
        </Sider>
    );
}
