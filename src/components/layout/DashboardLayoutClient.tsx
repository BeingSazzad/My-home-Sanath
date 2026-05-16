"use client";


import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import DashboardSidebar from "./dashboard-sidebar";
import DashboardBackButton from "./DashboardBackButton";

const SIDEBAR_WIDTH = 300;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function DashboardLayoutClient({
    children,
    searchParams,
}: {
    children: ReactNode;
    searchParams: Record<string, string | string[]>;
}) {
    const router = useRouter();

    const [collapsed, setCollapsed] = useState(
        searchParams?.collapsed === "true"
    );
    const [mobileOpen, setMobileOpen] = useState(false);

    /**
     * 🔥 Sync query → state (on first load / change)
     */
    useEffect(() => {
        if (searchParams?.collapsed !== undefined) {
            setCollapsed(searchParams.collapsed === "true");
        }
    }, [searchParams]);

    /**
     * 🔥 Update query
     */
    const handleSetQuery = (value: boolean) => {
        const params = new URLSearchParams(window.location.search);
        params.set("collapsed", String(value));

        router.replace(`?${params.toString()}`, { scroll: false });
    };

    return (
        <div className="flex bg-[#ddd] h-[90vh]">
            {/* Desktop Sidebar */}
            <div
                className="hidden lg:block flex-shrink-0 transition-all duration-300"
                style={{
                    width: collapsed
                        ? SIDEBAR_COLLAPSED_WIDTH
                        : SIDEBAR_WIDTH,
                }}
            >
                <DashboardSidebar
                    collapsed={collapsed}
                    onCollapse={(val) => {
                        setCollapsed(val);
                        handleSetQuery(val);
                    }}
                />
            </div>

            {/* Mobile Drawer */}
            <Drawer
                placement="left"
                open={mobileOpen}
                onClose={() => setMobileOpen(false)}
                width={300}
                styles={{ body: { padding: 0 }, header: { display: "none" } }}
                className="lg:hidden"
            >
                <DashboardSidebar
                    collapsed={false}
                    onCollapse={() => setMobileOpen(false)}
                />
            </Drawer>

            {/* Main Content */}
            <div className="flex-1 flex overflow-y-auto flex-col min-w-0">
                {/* Mobile Top Bar */}
                <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b sticky top-0 z-50">
                    <Button
                        type="text"
                        icon={<MenuOutlined style={{ fontSize: 18 }} />}
                        onClick={() => setMobileOpen(true)}
                    />
                    <span className="font-semibold text-gray-800 text-sm">
                        Westfert
                    </span>
                </div>

                <main className="flex-1 px-4 py-5 md:px-6 md:py-6 bg-[#F9FAFB]">
                    <DashboardBackButton fallbackHref="/saved" />
                    {children}
                </main>
            </div>
        </div>
    );
}
