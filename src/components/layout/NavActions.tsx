"use client";

import { Button, Avatar, Dropdown, Badge } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, User, LogOut, LayoutDashboard } from "lucide-react";
import { logout } from "@/redux/feature/auth/authSlice";

export default function NavActions() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const { user } = useSelector((state: any) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const dashboardRoutes = [
        '/analytics', '/saved', '/profile', '/enquiries',
        '/user-notifications', '/notification-settings',
        '/password-security', '/overview', '/my-listing',
        '/agent-enquiries', '/subscription', '/agency-profile', '/security',
    ];
    const isDashboard = dashboardRoutes.some(route => pathname.includes(route));

    const handleLogout = () => {
        dispatch(logout());
    };

    const userMenuItems: MenuProps["items"] = [
        {
            key: "profile",
            icon: <User size={16} />,
            label: <Link href="/profile" className="font-medium">My Profile</Link>,
        },
        { type: "divider" as const },
        ...(!isDashboard ? [
            {
                key: "dashboard",
                icon: <LayoutDashboard size={16} className="text-[#1a3c6e]" />,
                label: (
                    <Link
                        href={user?.user?.role === "Agent" ? "/analytics" : "/saved"}
                        className="font-bold text-[#1a3c6e]"
                    >
                        {user?.user?.role === "Agent" ? "Agent Dashboard" : "User Dashboard"}
                    </Link>
                ),
            },
            { type: "divider" as const },
        ] : []),
        {
            key: "logout",
            icon: <LogOut size={16} />,
            label: <span onClick={handleLogout} className="cursor-pointer font-bold">Sign Out</span>,
            danger: true,
        },
    ];

    // Prevent SSR/client hydration mismatch — render placeholder until mounted
    if (!mounted) {
        return <div className="w-28 h-10" />;
    }

    const isLoggedIn = !!user;

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-3 sm:gap-6 animate-in fade-in duration-300">
                <Link href="/user-notifications">
                    <Badge count={3} size="small" offset={[-2, 2]} color="#14b8a6">
                        <div className="p-2 hover:bg-gray-50 rounded-full transition-all group">
                            <Bell className="text-gray-400 group-hover:text-[#1a3c6e] cursor-pointer" size={20} />
                        </div>
                    </Badge>
                </Link>

                <Dropdown menu={{ items: userMenuItems }} placement="bottomRight" arrow={{ pointAtCenter: true }}>
                    <div className="flex items-center gap-3 cursor-pointer group">
                        <div className="text-right hidden xl:block">
                            <p className="text-[14px] font-bold text-[#1a3c6e] leading-none mb-1">
                                {user?.user?.name || user?.user?.email?.split("@")[0] || "My Account"}
                            </p>
                            <div className="flex justify-end">
                                <span className="text-[10px] bg-[#1a3c6e]/5 text-[#1a3c6e] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
                                    {user?.user?.role || "User"}
                                </span>
                            </div>
                        </div>
                        <Avatar
                            size={44}
                            src="/images/customer.png"
                            className="border-2 border-white ring-2 ring-[#1a3c6e]/10 group-hover:ring-[#1a3c6e]/30 transition-all shadow-sm"
                        />
                    </div>
                </Dropdown>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2 sm:gap-4">
            <Button
                size="large"
                className="!border-[#1a3c6e] !text-[#1a3c6e] !font-bold !text-[14px] !rounded-xl min-w-[100px] sm:min-w-[110px] !h-10 sm:!h-11 hover:!bg-gray-50 transition-all"
                href="/auth/login"
            >
                Sign In
            </Button>
            <Button
                type="primary"
                size="large"
                className="hidden sm:inline-flex !bg-[#1a3c6e] !border-[#1a3c6e] !font-bold !text-[14px] !rounded-xl min-w-[100px] sm:min-w-[110px] !h-10 sm:!h-11 shadow-md shadow-[#1a3c6e]/20 hover:!scale-[1.02] active:!scale-95 transition-all"
                href="/auth/signup"
            >
                Register
            </Button>
        </div>
    );
}
