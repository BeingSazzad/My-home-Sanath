"use client";

import {
    LeftOutlined,
    RightOutlined
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import {
    LayoutDashboard,
    House,
    Mail,
    CreditCard,
    Settings,
    UserCog
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Sider = Layout.Sider;

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
    
    useEffect(() => {
        const segment = pathname.split("/").filter(Boolean).pop() || "overview";
        setSelectedKey(segment);
    }, [pathname]);

    const menuItems = [
        { key: "overview", icon: <LayoutDashboard size={18} />, label: "Agent Overview" },
        { key: "my-listing", icon: <House size={18} />, label: "My Properties" },
        { key: "agent-enquiries", icon: <Mail size={18} />, label: "Enquiries Inbox" },
        { key: "subscription", icon: <CreditCard size={18} />, label: "Subscription" },
        { key: "agent-notifications", icon: <Settings size={18} />, label: "Notification Settings" },
        { key: "agency-profile", icon: <UserCog size={18} />, label: "Profile" },
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
            <div className="flex-1 h-full py-4 flex flex-col overflow-hidden">
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
