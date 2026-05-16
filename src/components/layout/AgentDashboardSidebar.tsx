"use client";

import useBaseUrl from "@/hooks/useBaseUrl";
import {
    LeftOutlined,
    LogoutOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Avatar, Button, Layout, Menu, Tag, Typography } from "antd";
import { Box, House, Lock, MessageSquare, Settings, Wallet } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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
    const [selectedKey, setSelectedKey] = useState("analytics");
    const router = useRouter();
    const pathname = usePathname();
    const baseUrl = useBaseUrl();

    useEffect(() => {
        setSelectedKey(pathname.split("/")[1] || "analytics");
    }, [pathname]);

    const menuItems = [
        { key: "overview", icon: <Box />, label: "Overview" },
        { key: "my-listing", icon: <House />, label: "My Listings" },
        { key: "agent-enquiries", icon: <MessageSquare />, label: "Enquiries" },
        { key: "subscription", icon: <Wallet />, label: "Subscription & Billing" },
        { key: "agency-profile", icon: <Settings />, label: "Agency Profile" },
        { key: "security", icon: <Lock />, label: "Security" },
    ];

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
            onCollapse={onCollapse}
            width={260}
            collapsedWidth={72}
            trigger={null}
            className="bg-white! border-r border-[#f0f0f0] h-[90vh] relative left-0 bottom-0 z-10 flex flex-col overflow-y-auto"
        >
            {/* User Profile Header */}
            <div
                className={`border-b border-[#f0f0f0] flex items-center justify-between gap-3 transition-all duration-200 ${collapsed ? "py-4 px-3" : "py-5 px-4"
                    }`}
            >
                <div>
                    <Avatar
                        size={collapsed ? 36 : 44}
                        className={`bg-[#0d9488]! font-bold shrink-0 ${collapsed ? "text-sm" : "text-base"}`}
                    >
                        WF
                    </Avatar>
                    {!collapsed && (
                        <div className="overflow-hidden">
                            <Text strong className="text-sm block whitespace-nowrap text-[#1a1a1a]">
                                Westfert Admin
                            </Text>
                            <Text className="text-xs text-[#6b7280]">Administrator</Text>
                            <div className="mt-1">
                                <Tag className="bg-primary! border-primary! text-white! text-[10px] leading-4 px-1.5 rounded m-0">
                                    Premium Plan
                                </Tag>
                            </div>
                        </div>
                    )}
                </div>
                <Button
                    type="text"
                    icon={collapsed ? <RightOutlined /> : <LeftOutlined />}
                    onClick={() => onCollapse?.(!collapsed)}
                    className="text-[#6b7280] text-base"
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

            </div>
        </Sider>
    );
}