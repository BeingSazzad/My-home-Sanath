"use client";

import AgentDashboardSidebar from "@/components/layout/AgentDashboardSidebar";
import DashboardBackButton from "@/components/layout/DashboardBackButton";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Drawer } from "antd";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const SIDEBAR_WIDTH = 260;
const SIDEBAR_COLLAPSED_WIDTH = 72;

export default function AgentDashboardLayoutClient({
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
   * 🔄 Sync URL → state
   */
  useEffect(() => {
    if (searchParams?.collapsed !== undefined) {
      setCollapsed(searchParams.collapsed === "true");
    }
  }, [searchParams]);

  /**
   * 🔗 update query param
   */
  const handleSetQuery = (value: boolean) => {
    const params = new URLSearchParams(window.location.search);
    params.set("collapsed", String(value));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">

      {/* ── Desktop Sidebar ── */}
      <div
        className="hidden lg:block flex-shrink-0 transition-all duration-300"
        style={{
          width: collapsed
            ? SIDEBAR_COLLAPSED_WIDTH
            : SIDEBAR_WIDTH,
        }}
      >
        <AgentDashboardSidebar
          collapsed={collapsed}
          onCollapse={(val) => {
            setCollapsed(val);
            handleSetQuery(val);
          }}
        />
      </div>

      {/* ── Mobile Drawer ── */}
      <Drawer
        placement="left"
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        width={SIDEBAR_WIDTH}
        styles={{ body: { padding: 0 }, header: { display: "none" } }}
        className="lg:hidden"
      >
        <AgentDashboardSidebar
          collapsed={false}
          onCollapse={() => setMobileOpen(false)}
        />
      </Drawer>

      {/* ── Main Content ── */}
      <div className="flex-1 flex overflow-y-auto flex-col min-w-0">

        {/* Mobile Top Bar */}
        <div className="lg:hidden flex items-center gap-3 px-4 py-3 bg-white border-b border-gray-100 sticky top-0 z-50">
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 18 }} />}
            onClick={() => setMobileOpen(true)}
          />
          <span className="font-semibold text-gray-800 text-sm">
            Agent Dashboard
          </span>
        </div>

        {/* Page Content */}
        <main className="flex-1 px-4 py-8 md:px-8 md:py-10 lg:px-12 bg-[#F9FAFB]">
          <div className="max-w-7xl mx-auto">
            <DashboardBackButton fallbackHref="/overview" />
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
