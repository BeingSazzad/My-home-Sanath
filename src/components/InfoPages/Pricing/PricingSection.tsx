"use client";

import { useState, useEffect } from "react";
import { Segmented, Skeleton, Alert } from "antd";


import { myFetch } from "@/helpers/myFetch";
import PricingCard, { Plan } from "./PricingCard";

export default function PricingSection() {
    const [isAnnual, setIsAnnual] = useState(true);
    const [plans, setPlans] = useState<Plan[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchPlans = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await myFetch("/package/id", { method: "GET" });
                if (response?.success && Array.isArray(response.data)) {
                    setPlans(response.data);
                } else {
                    // Fallback static plans if API not ready
                    setPlans(staticPlans);
                }
            } catch (err) {
                console.error("PricingSection error:", err);
                setError("Failed to load pricing plans.");
                setPlans(staticPlans);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    return (
        <section className="bg-white py-16 px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-10">
                <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                    Simple, Transparent Pricing
                </h2>
                <p className="text-gray-500 text-base mb-8">
                    No hidden fees. No setup costs. Cancel anytime.
                </p>

                {/* Toggle */}
                <Segmented
                    value={isAnnual ? "Annual" : "Monthly"}
                    onChange={(val) => setIsAnnual(val === "Annual")}
                    options={[
                        { label: "Monthly", value: "Monthly" },
                        {
                            label: (
                                <span className="flex items-center gap-1.5">
                                    Annual
                                    <span className="bg-emerald-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none">
                                        Save 20%
                                    </span>
                                </span>
                            ),
                            value: "Annual",
                        },
                    ]}
                    className="!bg-gray-100 !rounded-xl !p-1 [&_.ant-segmented-item-selected]:!bg-[#1a3c6e] [&_.ant-segmented-item-selected]:!text-white [&_.ant-segmented-item-selected]:!rounded-lg"
                />
            </div>

            {/* Error */}
            {error && (
                <Alert
                    type="warning"
                    message={error}
                    className="max-w-md mx-auto mb-8"
                    showIcon
                />
            )}

            {/* Cards */}
            {loading ? (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map((i) => (
                        <Skeleton key={i} active paragraph={{ rows: 10 }} className="p-6 border border-gray-100 rounded-2xl" />
                    ))}
                </div>
            ) : (
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
                    {plans.map((plan) => (
                        <PricingCard key={plan.id} plan={plan} isAnnual={isAnnual} />
                    ))}
                </div>
            )}
        </section>
    );
}

/* ── Static fallback (replace with real API data) ── */
const staticPlans: Plan[] = [
    {
        id: "free",
        tier: "Free Trial",
        monthlyPrice: 0,
        annualPrice: 0,
        description: "Perfect to test our services.",
        listingCount: "Unlimited listings",
        cta: "Start Free Trial",
        popular: false,
        features: [
            { label: "6 months free trial", included: true },
            { label: "Unlimited listings", included: true },
            { label: "Multiple staff accounts", included: true },
            { label: "Advanced reporting", included: true },
            { label: "API access", included: true },
            { label: "XML/BLM feed support", included: true },
            { label: "Featured listings", included: false },
            { label: "Premium placement", included: false },
            { label: "Homepage exposure", included: false },
        ],
    },
    {
        id: "starter",
        tier: "Starter",
        monthlyPrice: 49,
        annualPrice: 49,
        description: "Perfect for starting agents.",
        listingCount: "Up to 50 listings",
        cta: "Subscribe Now",
        popular: false,
        features: [
            { label: "Up to 50 listings", included: true },
            { label: "Lead enquiry access", included: true },
            { label: "Mobile app exposure", included: true },
            { label: "Website exposure", included: true },
            { label: "Basic analytics", included: true },
            { label: "Agent profile page", included: true },
            { label: "XML/BLM feed support", included: true },
            { label: "Featured listings", included: false },
            { label: "Homepage exposure", included: false },
        ],
    },
    {
        id: "pro",
        tier: "Professional",
        monthlyPrice: 99,
        annualPrice: 99,
        description: "For growing agencies.",
        listingCount: "Up to 250 listings",
        cta: "Subscribe Now",
        popular: true,
        features: [
            { label: "Up to 250 listings", included: true },
            { label: "Featured listings access", included: true },
            { label: "Better search ranking", included: true },
            { label: "Lead management tools", included: true },
            { label: "Advanced analytics", included: true },
            { label: "Multiple staff accounts", included: true },
            { label: "XML/BLM feed support", included: true },
            { label: "API access", included: false },
            { label: "Homepage exposure", included: false },
        ],
    },
    {
        id: "premium",
        tier: "Premium",
        monthlyPrice: 199,
        annualPrice: 199,
        description: "Ultimate listing coverage.",
        listingCount: "Unlimited listings",
        cta: "Subscribe Now",
        popular: false,
        features: [
            { label: "Unlimited listings", included: true },
            { label: "Homepage featured placement", included: true },
            { label: "Premium verified badge", included: true },
            { label: "Priority support", included: true },
            { label: "Multiple staff accounts", included: true },
            { label: "Advanced reporting", included: true },
            { label: "API access", included: true },
            { label: "XML/BLM feed support", included: true },
        ],
    },
];