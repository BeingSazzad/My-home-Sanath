"use client";

import { Button, Avatar, Dropdown, Badge, Popover } from "antd";
import type { MenuProps } from "antd";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Bell, User, LogOut, LayoutDashboard, Settings } from "lucide-react";
import { logout } from "@/redux/feature/auth/authSlice";

export default function NavActions() {
    const dispatch = useDispatch();
    const pathname = usePathname();
    const router = useRouter();
    const { user } = useSelector((state: any) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleLogout = () => {
        dispatch(logout());
        router.push("/auth/login");
    };

    const isAgent = user?.user?.role === "Agent";

    const userMenuItems: MenuProps["items"] = [
        {
            key: "dashboard",
            icon: <LayoutDashboard size={16} className="text-[#1a3c6e]" />,
            label: (
                <Link
                    href={isAgent ? "/overview" : "/saved"}
                    className="font-bold text-[#1a3c6e]"
                >
                    {isAgent ? "Agent Dashboard" : "User Dashboard"}
                </Link>
            ),
        },
        { type: "divider" as const },
        {
            key: "logout",
            icon: <LogOut size={16} />,
            label: <span onClick={handleLogout} className="cursor-pointer font-bold">Sign Out</span>,
            danger: true,
        },
    ];

    if (!mounted) {
        return <div className="w-10 h-10" />;
    }

    const isLoggedIn = !!user;

    if (isLoggedIn) {
        return (
            <div className="flex items-center gap-4 sm:gap-6 animate-in fade-in duration-300">
                <Popover
                    content={
                        <div className="w-80 -m-3">
                            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50 rounded-t-lg">
                                <h4 className="font-bold text-[#1a3c6e] m-0">Notifications</h4>
                                <span className="text-[10px] font-bold bg-[#14b8a6] text-white px-2 py-0.5 rounded-full uppercase tracking-wide">3 New</span>
                            </div>
                            <div className="max-h-[300px] overflow-y-auto">
                                <div className="p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <p className="text-sm text-gray-800 font-semibold m-0 leading-tight">New property match found!</p>
                                    <p className="text-xs text-gray-500 m-0 mt-1.5">2 mins ago</p>
                                </div>
                                <div className="p-4 border-b border-gray-50 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <p className="text-sm text-gray-800 font-semibold m-0 leading-tight">Price drop on Saved Property</p>
                                    <p className="text-xs text-gray-500 m-0 mt-1.5">1 hour ago</p>
                                </div>
                                <div className="p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                                    <p className="text-sm text-gray-800 font-semibold m-0 leading-tight">Welcome to MyHome!</p>
                                    <p className="text-xs text-gray-500 m-0 mt-1.5">1 day ago</p>
                                </div>
                            </div>
                            <div className="p-3 border-t border-gray-100 text-center bg-gray-50 rounded-b-lg">
                                <Link href="/notification" className="text-[#14b8a6] text-sm font-bold hover:underline block">
                                    View All
                                </Link>
                            </div>
                        </div>
                    }
                    trigger="click"
                    placement="bottomRight"
                >
                    <Badge count={3} size="small" offset={[-2, 2]} color="#14b8a6">
                        <div className="p-2 hover:bg-gray-50 rounded-full transition-all group cursor-pointer">
                            <Bell className="text-gray-400 group-hover:text-[#1a3c6e]" size={20} />
                        </div>
                    </Badge>
                </Popover>

                <Dropdown menu={{ items: userMenuItems }} trigger={["click"]} placement="bottomRight">
                    <div className="flex items-center cursor-pointer group">
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
