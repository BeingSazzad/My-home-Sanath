"use client";

import { useState } from "react";
import { Button, Card, Col, Row, Tag, Table } from "antd";
import { CheckCircleFilled, DownloadOutlined, StarFilled } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { updateSubscription } from "@/redux/feature/auth/authSlice";

export default function SubscriptionPage() {
    const router = useRouter();
    const dispatch = useDispatch();
    // Simulate reading from auth state
    const { user } = useSelector((state: any) => state.auth);
    
    // In a real app, you would fetch this from /api/subscriptions or user object
    const activeSubscription = user?.user?.subscription;
    const hasSubscription = activeSubscription?.status === "active";

    const [isAnnual, setIsAnnual] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPlans, setShowPlans] = useState(false);

    const handleSubscribe = (planName: string) => {
        setIsLoading(true);
        // Simulate checkout and state update
        setTimeout(() => {
            const price = planName === "Pro Agent" ? (isAnnual ? "790" : "79") : (planName === "Elite Agency" ? (isAnnual ? "1490" : "149") : (isAnnual ? "290" : "29"));
            
            const mockSubscription = {
                status: "active",
                planName: planName,
                price: price,
                cycle: isAnnual ? "yearly" : "monthly",
                renewalDate: new Date(Date.now() + (isAnnual ? 365 : 30) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                invoices: [
                    { 
                        id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
                        date: new Date().toLocaleDateString(), 
                        amount: `£${price}`, 
                        status: "Paid" 
                    }
                ]
            };
            
            dispatch(updateSubscription(mockSubscription));
            setIsLoading(false);
            toast.success(`Success! You are now subscribed to ${planName}.`);
        }, 1200);
    };

    const handleManageBilling = () => {
        toast.success("Redirecting to Stripe Customer Portal...");
    };

    const plans = [
        {
            name: "Basic Agent",
            price: isAnnual ? "£290" : "£29",
            period: isAnnual ? "/year" : "/month",
            features: ["Up to 10 Active Listings", "Basic Analytics", "Email Support", "Standard Visibility"],
            recommended: false,
        },
        {
            name: "Pro Agent",
            price: isAnnual ? "£790" : "£79",
            period: isAnnual ? "/year" : "/month",
            features: ["Up to 50 Active Listings", "Advanced Analytics & Reports", "Priority 24/7 Support", "Featured Listing Placements", "Lead Management CRM"],
            recommended: true,
        },
        {
            name: "Elite Agency",
            price: isAnnual ? "£1490" : "£149",
            period: isAnnual ? "/year" : "/month",
            features: ["Unlimited Listings", "White-label Reports", "Dedicated Account Manager", "Top Tier Placements", "API Access"],
            recommended: false,
        },
    ];

    const invoices = activeSubscription?.invoices || [];

    const invoiceColumns = [
        { title: "Invoice ID", dataIndex: "id", key: "id", className: "font-medium" },
        { title: "Date", dataIndex: "date", key: "date", className: "text-gray-500" },
        { title: "Amount", dataIndex: "amount", key: "amount", className: "font-semibold text-gray-900" },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (status: string) => (
                <Tag color={status === "Paid" ? "green" : "orange"} className="rounded-full px-3">
                    {status}
                </Tag>
            ),
        },
        {
            title: "Action",
            key: "action",
            render: () => (
                <Button type="link" icon={<DownloadOutlined />} className="text-[#1a3c6e] font-medium">
                    Download
                </Button>
            ),
        },
    ];

    return (
        <div className="max-w-7xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Billing & Subscription</h1>
                <p className="text-gray-500 mt-1">Manage your plan, billing details, and view invoices.</p>
            </div>

            {hasSubscription ? (
                /* ─── ACTIVE SUBSCRIPTION VIEW ─── */
                <div className="space-y-8 animate-in fade-in duration-500">
                    <Row gutter={[24, 24]}>
                        <Col xs={24} lg={16}>
                            <Card className="rounded-2xl border-gray-200 shadow-sm overflow-hidden" styles={{ body: { padding: 0 } }}>
                                <div className="bg-[#1a3c6e] p-8 text-white">
                                    <div className="flex justify-between items-start flex-wrap gap-4">
                                        <div>
                                            <div className="flex items-center gap-3 mb-2">
                                                <h2 className="text-2xl font-bold m-0">{activeSubscription.planName || "Pro Agent"}</h2>
                                                <Tag color={activeSubscription.status === "active" ? "green" : "orange"} className="border-none bg-green-500/20 text-green-100 uppercase tracking-wider font-bold rounded-full px-3 m-0">
                                                    {activeSubscription.status || "Active"}
                                                </Tag>
                                            </div>
                                            <p className="text-blue-100 opacity-90 max-w-md m-0">
                                                Your subscription is currently active and billing on a {activeSubscription.cycle || "monthly"} cycle.
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-extrabold m-0">£{activeSubscription.price || "79"}<span className="text-lg font-normal text-blue-100">/{activeSubscription.cycle === "yearly" ? "yr" : "mo"}</span></p>
                                            <p className="text-sm text-blue-100 mt-1 m-0">Renews on {activeSubscription.renewalDate || "June 01, 2026"}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-6 bg-white">
                                    <h3 className="font-semibold text-gray-900 mb-4">Current Usage</h3>
                                    <div className="space-y-5">
                                        <div>
                                            <div className="flex justify-between text-sm mb-2">
                                                <span className="text-gray-600 font-medium">Active Listings</span>
                                                <span className="font-bold text-gray-900">24 / 50</span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div className="bg-teal-500 h-2 rounded-full" style={{ width: "48%" }}></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-8 flex flex-wrap gap-3">
                                        <Button type="primary" className="!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e] !h-10 !px-6 !font-semibold !rounded-md shadow-sm">
                                            Upgrade Plan
                                        </Button>
                                        <Button 
                                            onClick={() => dispatch(updateSubscription(null))}
                                            className="!h-10 !px-6 !font-semibold !rounded-md"
                                        >
                                            Cancel Subscription
                                        </Button>
                                    </div>
                                </div>
                            </Card>
                        </Col>
                        
                        <Col xs={24} lg={8}>
                            <Card className="rounded-2xl border-gray-200 shadow-sm h-full" title={<span className="font-bold text-gray-800">Payment Method</span>}>
                                <div className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl bg-gray-50 mb-6">
                                    <div className="w-12 h-8 bg-white border border-gray-200 rounded flex items-center justify-center font-bold text-blue-800 italic shadow-sm">
                                        VISA
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900">•••• •••• •••• 4242</p>
                                        <p className="text-xs text-gray-500">Expires 12/28</p>
                                    </div>
                                </div>
                                <Button onClick={handleManageBilling} block className="!h-10 !font-semibold !rounded-md text-[#1a3c6e] border-[#1a3c6e]">
                                    Update Payment Method
                                </Button>
                            </Card>
                        </Col>
                    </Row>

                    {/* Billing History */}
                    {invoices.length > 0 && (
                        <Card className="rounded-2xl border-gray-200 shadow-sm mt-6" title={<span className="font-bold text-gray-800">Billing History</span>}>
                            <Table
                                dataSource={invoices}
                                columns={invoiceColumns}
                                pagination={false}
                                rowKey="id"
                                className="border border-gray-100 rounded-xl overflow-hidden"
                            />
                        </Card>
                    )}
                </div>
            ) : (
                /* ─── NO SUBSCRIPTION VIEW (EMPTY STATE + PLANS) ─── */
                <div className="animate-in fade-in duration-500">
                    <div className="bg-blue-50 border border-blue-100 text-[#1a3c6e] px-6 py-6 rounded-2xl mb-10 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-sm">
                        <div className="text-center sm:text-left">
                            <h3 className="font-bold text-xl mb-1">You don&apos;t have an active subscription yet.</h3>
                            <p className="text-[#1a3c6e]/70 text-sm">Choose a plan below to unlock premium agent tools, listings, and featured placements.</p>
                        </div>
                        {!showPlans && (
                            <Button 
                                type="primary" 
                                onClick={() => setShowPlans(true)}
                                className="!bg-[#14b8a6] !border-[#14b8a6] hover:!bg-[#119e8e] !h-12 !px-10 !font-bold !rounded-xl shadow-lg shadow-[#14b8a6]/30 transition-all hover:scale-105 active:scale-95"
                            >
                                Get Subscription Now
                            </Button>
                        )}
                    </div>

                    {showPlans && (
                        <div className="animate-in slide-in-from-top-4 fade-in duration-700">
                            <div className="text-center max-w-2xl mx-auto mb-10">
                                <h2 className="text-2xl font-bold text-gray-900 mb-3">Choose the perfect plan for your business</h2>
                                <p className="text-gray-500 mb-6">Upgrade to unlock more listings, featured placements, and advanced tools to grow your real estate reach.</p>
                                
                                <div className="inline-flex items-center bg-gray-100 p-1 rounded-lg">
                                    <button 
                                        onClick={() => setIsAnnual(false)}
                                        className={`px-5 py-2 rounded-md text-sm font-semibold transition-all ${!isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Monthly
                                    </button>
                                    <button 
                                        onClick={() => setIsAnnual(true)}
                                        className={`px-5 py-2 rounded-md text-sm font-semibold transition-all flex items-center gap-2 ${isAnnual ? "bg-white text-gray-900 shadow-sm" : "text-gray-500 hover:text-gray-700"}`}
                                    >
                                        Annually <span className="text-[10px] bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full uppercase tracking-wider font-bold">Save 20%</span>
                                    </button>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                                {plans.map((plan, index) => (
                                    <div 
                                        key={index} 
                                        className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg flex flex-col ${plan.recommended ? "border-[#1a3c6e] shadow-md transform md:-translate-y-2 ring-1 ring-[#1a3c6e]/10" : "border-gray-200"}`}
                                    >
                                        {plan.recommended && (
                                            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1a3c6e] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
                                                Most Popular
                                            </div>
                                        )}
                                        
                                        <div className="mb-6">
                                            <h3 className="text-xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                                            <div className="flex items-end gap-1">
                                                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                                                <span className="text-gray-500 font-medium mb-1">{plan.period}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 mb-8 flex-1">
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-3">
                                                    <CheckCircleFilled className={`mt-0.5 ${plan.recommended ? "text-[#1a3c6e]" : "text-gray-400"}`} />
                                                    <span className="text-gray-600 text-sm">{feature}</span>
                                                </div>
                                            ))}
                                        </div>

                                        <Button 
                                            type={plan.recommended ? "primary" : "default"}
                                            block 
                                            onClick={() => handleSubscribe(plan.name)}
                                            loading={isLoading}
                                            className={`!h-12 !font-bold !text-base !rounded-lg shadow-sm ${plan.recommended ? "!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e]" : "hover:!border-[#1a3c6e] hover:!text-[#1a3c6e]"}`}
                                        >
                                            Subscribe Now
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
