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
    
    // Check if the logged-in user is an Agent
    const isAgent = user?.user?.role === "Agent";
    
    // In a real app, you would fetch this from /api/subscriptions or user object
    const activeSubscription = user?.user?.subscription;
    const hasSubscription = activeSubscription?.status === "active";

    const [isAnnual, setIsAnnual] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showPlans, setShowPlans] = useState(false);
    
    // Secure checkout state
    const [selectedPlan, setSelectedPlan] = useState<any>(null);
    const [paymentMethod, setPaymentMethod] = useState<"card" | "paypal" | "gpay">("card");
    const [cardNumber, setCardNumber] = useState("");
    const [cardExpiry, setCardExpiry] = useState("");
    const [cardCvc, setCardCvc] = useState("");

    // Open checkout modal instead of subscribing instantly
    const handleSubscribe = (plan: any) => {
        setSelectedPlan(plan);
    };

    // Process secure payment and save subscription
    const handleCompletePayment = () => {
        if (!selectedPlan) return;
        
        setIsLoading(true);
        // Simulate bank/PCI security check
        setTimeout(() => {
            let price = "0";
            if (selectedPlan.name === "Starter") price = isAnnual ? "490" : "49";
            else if (selectedPlan.name === "Professional") price = isAnnual ? "990" : "99";
            else if (selectedPlan.name === "Premium") price = isAnnual ? "1990" : "199";

            const mockSubscription = {
                status: "active",
                planName: selectedPlan.name,
                price: price,
                cycle: selectedPlan.name === "Free Trial" ? "6 months" : (isAnnual ? "yearly" : "monthly"),
                renewalDate: new Date(Date.now() + (selectedPlan.name === "Free Trial" ? 180 : (isAnnual ? 365 : 30)) * 24 * 60 * 60 * 1000).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
                invoices: [
                    { 
                        id: `INV-${new Date().getFullYear()}-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`, 
                        date: new Date().toLocaleDateString(), 
                        amount: price === "0" ? "Free" : `£${price}`, 
                        status: "Paid" 
                    }
                ]
            };
            
            dispatch(updateSubscription(mockSubscription));
            setIsLoading(false);
            setSelectedPlan(null);
            
            // Clear inputs
            setCardNumber("");
            setCardExpiry("");
            setCardCvc("");
            
            toast.success(`Secure checkout complete! You are now subscribed to ${selectedPlan.name}.`);
        }, 1800);
    };

    // If the logged in user is a regular customer (User role), restrict access
    if (!isAgent) {
        return (
            <div className="max-w-xl mx-auto my-16 text-center p-8 bg-white border border-gray-100 rounded-3xl shadow-md animate-in fade-in duration-500">
                <div className="w-16 h-16 bg-blue-50 text-[#1a3c6e] rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner text-xl">
                    ℹ️
                </div>
                <h2 className="text-2xl font-extrabold text-[#1a3c6e] mb-3">Agent Only Access</h2>
                <p className="text-gray-500 mb-8 leading-relaxed text-sm">
                    The subscription plans are exclusively for Real Estate Agents to list properties, manage staff accounts, and boost listings.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button 
                        type="primary" 
                        onClick={() => router.push("/home")}
                        className="!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e] !h-12 !px-8 !font-bold !rounded-xl shadow-sm"
                    >
                        Go back Home
                    </Button>
                    <Button 
                        onClick={() => router.push("/auth/choose-role")}
                        className="!h-12 !px-8 !font-bold !rounded-xl text-[#1a3c6e] border-gray-200 hover:border-[#1a3c6e]"
                    >
                        Register as Agent
                    </Button>
                </div>
            </div>
        );
    }

    const handleManageBilling = () => {
        toast.success("Redirecting to Stripe Customer Portal...");
    };

    const plans = [
        {
            name: "Free Trial",
            price: "£0",
            period: "/6 months",
            features: [
                "6 months free trial",
                "Unlimited listings",
                "Multiple staff accounts",
                "Advanced reporting",
                "API access",
                "XML/BLM feed support"
            ],
            restrictions: [
                "No featured listings",
                "No premium placement",
                "No homepage exposure"
            ],
            afterTrial: "Listings become inactive after trial unless upgraded",
            recommended: false,
        },
        {
            name: "Starter",
            price: isAnnual ? "£490" : "£49",
            period: isAnnual ? "/year" : "/month",
            features: [
                "Up to 50 listings",
                "Lead enquiry access",
                "Mobile app exposure",
                "Website exposure",
                "Basic analytics",
                "Agent profile page",
                "XML/BLM feed support"
            ],
            recommended: false,
        },
        {
            name: "Professional",
            price: isAnnual ? "£990" : "£99",
            period: isAnnual ? "/year" : "/month",
            features: [
                "Up to 250 listings",
                "Featured listings access",
                "Better search ranking",
                "XML/BLM feed support",
                "Lead management tools",
                "Advanced analytics",
                "Multiple staff accounts"
            ],
            recommended: true,
        },
        {
            name: "Premium",
            price: isAnnual ? "£1990" : "£199",
            period: isAnnual ? "/year" : "/month",
            features: [
                "Unlimited listings",
                "Homepage featured placement",
                "Premium verified badge",
                "Priority support",
                "Multiple staff accounts",
                "Advanced reporting",
                "API access",
                "XML/BLM feed support"
            ],
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
                                                <span className="font-bold text-gray-900">
                                                    24 / {activeSubscription.planName === "Starter" ? "50" : (activeSubscription.planName === "Professional" ? "250" : "Unlimited")}
                                                </span>
                                            </div>
                                            <div className="w-full bg-gray-100 rounded-full h-2">
                                                <div 
                                                    className="bg-teal-500 h-2 rounded-full transition-all duration-500" 
                                                    style={{ 
                                                        width: activeSubscription.planName === "Starter" 
                                                            ? "48%" 
                                                            : (activeSubscription.planName === "Professional" ? "9.6%" : "2.4%") 
                                                    }}
                                                ></div>
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

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
                                {plans.map((plan, index) => (
                                    <div 
                                        key={index} 
                                        className={`relative rounded-2xl border bg-white p-6 transition-all duration-300 hover:shadow-lg flex flex-col ${plan.recommended ? "border-[#1a3c6e] shadow-md transform lg:-translate-y-2 ring-1 ring-[#1a3c6e]/10" : "border-gray-200"}`}
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
                                                <span className="text-gray-500 font-medium mb-1 text-sm">{plan.period}</span>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-3 mb-6 flex-1">
                                            {/* Features */}
                                            {plan.features.map((feature, i) => (
                                                <div key={i} className="flex items-start gap-2.5">
                                                    <CheckCircleFilled className={`mt-0.5 ${plan.recommended ? "text-[#1a3c6e]" : "text-teal-500"}`} />
                                                    <span className="text-gray-600 text-sm leading-tight">{feature}</span>
                                                </div>
                                            ))}
                                            
                                            {/* Restrictions */}
                                            {plan.restrictions && (
                                                <div className="pt-4 border-t border-gray-100 mt-4 space-y-2.5">
                                                    <p className="text-[10px] font-bold text-red-500 uppercase tracking-widest mb-1.5">Restrictions</p>
                                                    {plan.restrictions.map((restriction, i) => (
                                                        <div key={i} className="flex items-start gap-2.5">
                                                            <span className="text-red-400 text-xs font-bold select-none mt-0.5">✕</span>
                                                            <span className="text-gray-400 text-xs leading-tight">{restriction}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}

                                            {/* After Trial warning */}
                                            {plan.afterTrial && (
                                                <div className="mt-4 bg-red-50 border border-red-100/50 rounded-xl p-3">
                                                    <p className="text-red-600 text-[11px] font-semibold leading-normal">{plan.afterTrial}</p>
                                                </div>
                                            )}
                                        </div>

                                        <Button 
                                            type={plan.recommended ? "primary" : "default"}
                                            block 
                                            onClick={() => handleSubscribe(plan)}
                                            loading={isLoading}
                                            className={`!h-11 !font-bold !text-sm !rounded-lg shadow-sm ${plan.recommended ? "!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e]" : "hover:!border-[#1a3c6e] hover:!text-[#1a3c6e]"}`}
                                        >
                                            {plan.name === "Free Trial" ? "Start Free Trial" : "Subscribe Now"}
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* ─── SECURE CHECKOUT MODAL ─── */}
            {selectedPlan && (
                <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
                    <div className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl border border-gray-100 flex flex-col max-h-[90vh] animate-in zoom-in-95 duration-200">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                            <div>
                                <h3 className="text-xl font-bold text-[#1a3c6e] m-0">Secure Checkout</h3>
                                <p className="text-xs text-gray-500 mt-0.5 m-0">PCI-DSS Compliant Encryption Enabled</p>
                            </div>
                            <button 
                                onClick={() => setSelectedPlan(null)}
                                className="text-gray-400 hover:text-gray-600 h-8 w-8 rounded-full hover:bg-gray-100 flex items-center justify-center text-lg font-bold border-none bg-transparent cursor-pointer"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Modal Body */}
                        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-left">
                            {/* Order Summary */}
                            <div className="bg-blue-50/50 border border-blue-100/50 rounded-2xl p-4 space-y-3">
                                <p className="text-xs font-bold text-[#1a3c6e] uppercase tracking-wider m-0">Order Summary</p>
                                <div className="flex justify-between items-center">
                                    <span className="font-semibold text-gray-800 text-sm">{selectedPlan.name} Plan ({selectedPlan.period.replace("/", "")})</span>
                                    <span className="font-bold text-gray-900 text-sm">{selectedPlan.price}</span>
                                </div>
                                {selectedPlan.name !== "Free Trial" && (
                                    <>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>Subtotal</span>
                                            <span>{selectedPlan.price}</span>
                                        </div>
                                        <div className="flex justify-between text-xs text-gray-500">
                                            <span>VAT (20%)</span>
                                            <span>
                                                £{(parseFloat(selectedPlan.price.replace("£", "")) * 0.2).toFixed(2)}
                                            </span>
                                        </div>
                                    </>
                                )}
                                <div className="h-[1px] bg-blue-100/30 my-2" />
                                <div className="flex justify-between items-center text-base font-bold text-gray-900">
                                    <span>Total Due</span>
                                    <span className="text-[#1a3c6e]">
                                        {selectedPlan.name === "Free Trial" 
                                            ? "£0.00" 
                                            : `£${(parseFloat(selectedPlan.price.replace("£", "")) * 1.2).toFixed(2)}`
                                        }
                                    </span>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="space-y-3">
                                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider m-0">Select Payment Method</p>
                                <div className="grid grid-cols-3 gap-3">
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("card")}
                                        className={`p-3 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "card" ? "border-[#1a3c6e] bg-[#1a3c6e]/5 text-[#1a3c6e]" : "border-gray-200 hover:bg-gray-50 text-gray-600 bg-white"}`}
                                    >
                                        <span className="text-xs font-bold">Credit Card</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("paypal")}
                                        className={`p-3 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "paypal" ? "border-[#1a3c6e] bg-[#1a3c6e]/5 text-[#1a3c6e]" : "border-gray-200 hover:bg-gray-50 text-gray-600 bg-white"}`}
                                    >
                                        <span className="text-xs font-bold">PayPal</span>
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => setPaymentMethod("gpay")}
                                        className={`p-3 border rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all cursor-pointer ${paymentMethod === "gpay" ? "border-[#1a3c6e] bg-[#1a3c6e]/5 text-[#1a3c6e]" : "border-gray-200 hover:bg-gray-50 text-gray-600 bg-white"}`}
                                    >
                                        <span className="text-xs font-bold">Google Pay</span>
                                    </button>
                                </div>
                            </div>

                            {/* Payment Inputs */}
                            {paymentMethod === "card" ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Card Number</label>
                                        <input
                                            type="text"
                                            placeholder="4242 4242 4242 4242"
                                            value={cardNumber}
                                            onChange={(e) => setCardNumber(e.target.value)}
                                            className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c6e] focus:border-[#1a3c6e] text-sm box-border"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                                            <input
                                                type="text"
                                                placeholder="MM/YY"
                                                value={cardExpiry}
                                                onChange={(e) => setCardExpiry(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c6e] focus:border-[#1a3c6e] text-sm text-center box-border"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CVC / CVV</label>
                                            <input
                                                type="password"
                                                placeholder="•••"
                                                maxLength={3}
                                                value={cardCvc}
                                                onChange={(e) => setCardCvc(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-[#1a3c6e] focus:border-[#1a3c6e] text-sm text-center box-border"
                                            />
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="p-8 border border-dashed border-gray-200 rounded-2xl text-center space-y-2">
                                    <p className="font-semibold text-gray-700 text-sm m-0">Standard checkout redirection</p>
                                    <p className="text-xs text-gray-400 m-0">You will be redirected securely to complete the payment authorization.</p>
                                </div>
                            )}

                            <div className="flex items-center gap-2.5 bg-gray-50 rounded-xl p-3 border border-gray-100">
                                <span className="text-gray-400 text-xs font-bold select-none">🛡️</span>
                                <p className="text-[11px] text-gray-500 leading-snug m-0">
                                    Your checkout session is encrypted with 256-bit SSL. Card credentials are never stored directly on our servers.
                                </p>
                            </div>
                        </div>

                        {/* Modal Footer */}
                        <div className="p-6 border-t border-gray-100 bg-gray-50/50 flex flex-col gap-2.5">
                            <Button
                                type="primary"
                                block
                                loading={isLoading}
                                onClick={handleCompletePayment}
                                className="!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e] !h-12 !font-bold !text-sm !rounded-xl shadow-md"
                            >
                                {isLoading ? "Processing Security Check..." : (selectedPlan.name === "Free Trial" ? "Activate Free Trial" : `Authorize Payment of £${selectedPlan.name === "Free Trial" ? "0.00" : (parseFloat(selectedPlan.price.replace("£", "")) * 1.2).toFixed(2)}`)}
                            </Button>
                            <p className="text-[10px] text-center text-gray-400 font-medium m-0">
                                By completing the checkout, you authorize automatic billing transitions under our standard policy.
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
