"use client";
import { useState, useEffect } from "react";

import { Card, Col, Row, Select, Typography, Avatar, Button } from "antd";
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    ReferenceLine,
} from "recharts";
import { HomeOutlined, MessageOutlined, HeartOutlined, PlusOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

const { Title, Text } = Typography;
const { Option } = Select;

// ─── Data ────────────────────────────────────────────────────────────────────

const statCards = [
    { label: "Active Properties", value: "24", icon: <HomeOutlined />, bg: "#e6fffa", color: "#0d9488" },
    { label: "New Enquiries", value: "8", icon: <MessageOutlined />, bg: "#e6fffa", color: "#0d9488" },
    { label: "Total Saves", value: "156", icon: <HeartOutlined />, bg: "#fff1f2", color: "#f43f5e" },
];

const enquiriesData = [
    { month: "Jan", enquiries: 120 }, { month: "Feb", enquiries: 180 },
    { month: "Mar", enquiries: 160 }, { month: "Apr", enquiries: 220 },
    { month: "May", enquiries: 190 }, { month: "Jun", enquiries: 240 },
    { month: "Jul", enquiries: 180 }, { month: "Aug", enquiries: 210 },
    { month: "Sept", enquiries: 170 }, { month: "Oct", enquiries: 230 },
    { month: "Nov", enquiries: 200 }, { month: "Dec", enquiries: 190 },
];

const enquiries = [
    { initials: "TW", name: "Tom Walker", subject: "Stunning Victorian Townhouse", time: "2 hours ago", bg: "#e6fffa", color: "#0d9488" },
    { initials: "AJ", name: "Alice Johnson", subject: "Stunning Victorian Townhouse", time: "2 hours ago", bg: "#e6fffa", color: "#0d9488" },
    { initials: "MK", name: "Mark King", subject: "Stunning Victorian Townhouse", time: "2 hours ago", bg: "#e6fffa", color: "#0d9488" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChartHeader({ title }: { title: string }) {
    return (
        <div className="flex items-center justify-between">
            <span className="font-semibold text-gray-800">{title}</span>
            <Select defaultValue="2026" size="small" className="w-[90px]">
                <Option value="2024">2024</Option>
                <Option value="2025">2025</Option>
                <Option value="2026">2026</Option>
                <Option value="2027">2027</Option>
            </Select>
        </div>
    );
}

const tooltipStyle = {
    contentStyle: {
        background: "#1f2937",
        border: "none",
        borderRadius: 8,
        color: "#fff",
        fontSize: 12,
    },
};

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OverviewsPage() {
    const router = useRouter();
    const { user } = useSelector((state: any) => state.auth);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const userRole = user?.user?.role || "Agent";

    if (!mounted) return null;

    return (
        <div className="p-6 space-y-6">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="mb-2">
                    <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Agent Dashboard</h1>
                    <p className="text-gray-500 mt-1">Welcome back, {userRole}. Here&apos;s what&apos;s happening today.</p>
                </div>
            </div>

            {/* Quick Stat Cards */}
            <Row gutter={[16, 16]}>
                {statCards.map((card, i) => (
                    <Col xs={24} sm={8} key={i}>
                        <Card
                            className="rounded-xl border border-[#f0f0f0] shadow-sm hover:shadow-md transition-shadow"
                            styles={{ body: { padding: "24px 28px" } }}
                        >
                            <div className="flex items-center gap-5">
                                <div
                                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl"
                                    style={{ background: card.bg, color: card.color }}
                                >
                                    {card.icon}
                                </div>
                                <div>
                                    <Text className="text-[#6b7280] text-sm font-medium">{card.label}</Text>
                                    <div className="text-3xl font-extrabold text-[#1a1a1a] leading-tight mt-1">
                                        {card.value}
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>

            <Row gutter={[16, 16]}>
                {/* Total Enquiries Chart */}
                <Col xs={24} lg={14} xl={16}>
                    <Card
                        className="rounded-xl border border-[#f0f0f0] h-full shadow-sm"
                        title={<ChartHeader title="Total Enquiries Statistics" />}
                        styles={{ body: { padding: "24px", height: "calc(100% - 56px)" } }}
                    >
                        <div className="h-[320px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={enquiriesData}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
                                    <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} dy={10} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#9ca3af" }} domain={[50, 500]} dx={-10} />
                                    <Tooltip {...tooltipStyle} />
                                    <Area type="monotone" dataKey="enquiries" stroke="#0d9488" fill="#0d9488" fillOpacity={0.15} strokeWidth={3} />
                                    <ReferenceLine x="Jun" stroke="#374151" strokeDasharray="3 3" />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </Card>
                </Col>

                {/* Recent Enquiries */}
                <Col xs={24} lg={10} xl={8}>
                    <Card
                        className="rounded-xl border border-[#f0f0f0] h-full shadow-sm cursor-pointer hover:shadow-md transition-all duration-300"
                        styles={{ body: { padding: 0 } }}
                        onClick={() => router.push("/agent-enquiries")}
                        title={
                            <div className="flex items-center justify-between py-1">
                                <span className="font-semibold text-gray-800">Recent Enquiries</span>
                                <Button 
                                    type="link" 
                                    className="text-[#1a3c6e] font-semibold p-0 hover:opacity-80"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        router.push("/agent-enquiries");
                                    }}
                                >
                                    View All
                                </Button>
                            </div>
                        }
                    >
                        <div className="flex flex-col h-[320px] overflow-y-auto">
                            {enquiries.map((e, i) => (
                                <div
                                    key={i}
                                    className={`flex items-center justify-between px-6 py-5 cursor-pointer hover:bg-gray-50 transition-colors ${i !== 0 ? "border-t border-[#f5f5f5]" : ""}`}
                                >
                                    <div className="flex items-center gap-4">
                                        <Avatar
                                            size={46}
                                            className="font-bold text-sm shrink-0"
                                            style={{ background: e.bg, color: e.color }}
                                        >
                                            {e.initials}
                                        </Avatar>
                                        <div>
                                            <Text strong className="text-[15px] text-[#1a1a1a] block mb-0.5">{e.name}</Text>
                                            <Text className="text-xs text-[#6b7280] line-clamp-1">{e.subject}</Text>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 pl-2">
                                        <Text className="text-[11px] text-[#9ca3af] whitespace-nowrap">{e.time}</Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Card>
                </Col>
            </Row>
        </div>
    );
}
