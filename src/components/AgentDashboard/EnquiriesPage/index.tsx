"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Enquiry } from "@/types/enquiry";
import { toast, Toaster } from "sonner";
import { MOCK_AGENT_LEADS } from "@/Mockdata";
import EnquiryCard from "./Enquirycard";
import { useSearchParams, useRouter } from "next/navigation";

export default function EnquiriesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const propertyIdFilter = searchParams.get("propertyId");

    const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_AGENT_LEADS as Enquiry[]);
    const [activeTab, setActiveTab] = useState<"all" | "new" | "completed">("all");
    const [searchQuery, setSearchQuery] = useState("");

    const handleMarkComplete = (id: string) => {
        setEnquiries((prev) =>
            prev.map((e) => (e.id === id ? { ...e, status: "completed" } : e))
        );
        toast.success("Enquiry marked as complete!", {
            description: "The lead status has been set to contacted.",
        });
    };

    const handleDelete = (id: string) => {
        Modal.confirm({
            title: "Delete Enquiry?",
            content: "Are you sure you want to permanently delete this lead? This action cannot be undone.",
            okText: "Yes, Delete",
            okButtonProps: { className: "!bg-red-600 !border-red-600" },
            okType: "danger",
            async onOk() {
                setEnquiries((prev) => prev.filter((e) => e.id !== id));
                toast.success("Enquiry deleted successfully!");
            },
        });
    };

    const filteredEnquiries = enquiries.filter((e) => {
        // 1. Property ID Filter
        if (propertyIdFilter && e.propertyId !== propertyIdFilter) {
            return false;
        }
        // 2. Tab Filter
        if (activeTab === "new" && e.status === "completed") {
            return false;
        }
        if (activeTab === "completed" && e.status !== "completed") {
            return false;
        }
        // 3. Search Query Filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            return (
                e.name.toLowerCase().includes(query) ||
                e.email.toLowerCase().includes(query) ||
                e.property.toLowerCase().includes(query)
            );
        }
        return true;
    });

    return (
        <>
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                {/* Header (Aesthetic-Usability Effect) */}
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#1a3c6e]">Enquiries Inbox</h1>
                        <p className="text-gray-500 mt-1">Review and manage your property leads</p>
                    </div>
                    <div className="rounded-lg border border-[#1a3c6e]/10 bg-white px-4 py-2 shadow-sm shrink-0">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            {propertyIdFilter ? "Filtered Leads" : "Total Active Leads"}
                        </p>
                        <p className="text-lg font-extrabold text-[#1a3c6e]">
                            {enquiries.filter(e => !propertyIdFilter || e.propertyId === propertyIdFilter).length}
                        </p>
                    </div>
                </div>

                {propertyIdFilter && (
                    <div className="mb-6 bg-[#1a3c6e]/5 border border-[#1a3c6e]/10 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm animate-fade-in">
                        <div className="flex items-center gap-3">
                            <span className="text-xl">🔍</span>
                            <div>
                                <h3 className="text-sm font-bold text-gray-900">Showing leads for specific property</h3>
                                <p className="text-xs text-gray-500 mt-0.5">
                                    You are viewing enquiries for: <span className="font-bold text-[#1a3c6e]">{filteredEnquiries[0]?.property || "Selected Property"}</span>
                                </p>
                            </div>
                        </div>
                        <button 
                            onClick={() => router.push("/agent-enquiries")}
                            className="bg-white hover:bg-gray-50 text-[#1a3c6e] border border-[#1a3c6e]/20 font-semibold px-4 py-2 rounded-lg text-xs transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            Show All Leads
                        </button>
                    </div>
                )}

                {/* Search & Filter Controls (Hick's Law & Jakob's Law) */}
                <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white p-4 rounded-xl border border-gray-200/80 shadow-sm">
                    {/* Tabs (Zeigarnik Effect / Hick's Law) */}
                    <div className="flex bg-gray-100 p-1 rounded-lg w-fit">
                        {(["all", "new", "completed"] as const).map((tab) => {
                            const count = enquiries.filter(e => {
                                if (propertyIdFilter && e.propertyId !== propertyIdFilter) return false;
                                if (tab === "new" && e.status === "completed") return false;
                                if (tab === "completed" && e.status !== "completed") return false;
                                return true;
                            }).length;

                            return (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-4 py-2 rounded-md text-xs font-bold transition-all ${
                                        activeTab === tab
                                            ? "bg-[#1a3c6e] text-white shadow-sm"
                                            : "text-gray-500 hover:text-gray-955"
                                    }`}
                                >
                                    <span className="capitalize">{tab} Leads</span>
                                    <span className={`ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] ${
                                        activeTab === tab
                                            ? "bg-white/20 text-white"
                                            : "bg-[#1a3c6e]/10 text-[#1a3c6e]"
                                    }`}>
                                        {count}
                                    </span>
                                </button>
                            );
                        })}
                    </div>

                    {/* Search Input (Jakob's Law) */}
                    <div className="relative w-full md:w-80">
                        <input
                            type="text"
                            placeholder="Search by name, email, or property..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-[#1a3c6e]/20 focus:border-[#1a3c6e] transition-all text-gray-700 font-medium"
                        />
                        <span className="absolute left-3 top-2 text-gray-400 text-sm">🔍</span>
                    </div>
                </div>

                {/* Leads List */}
                {filteredEnquiries.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100 text-xl">
                            {searchQuery ? "🔍" : activeTab === "completed" ? "📁" : "🎉"}
                        </div>
                        <p className="text-lg font-bold text-gray-900">
                            {searchQuery 
                                ? "No matching enquiries found" 
                                : activeTab === "completed" 
                                ? "No completed enquiries yet" 
                                : "Inbox Zero! You are all caught up"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {searchQuery 
                                ? "Try modifying your keywords or clearing the search box." 
                                : activeTab === "completed" 
                                ? "Enquiries that you mark as complete will be archived here." 
                                : "Outstanding property leads will appear here."}
                        </p>
                        {searchQuery && (
                            <button 
                                onClick={() => setSearchQuery("")}
                                className="mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-4 py-2 rounded-lg text-xs transition-all"
                            >
                                Clear Search
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEnquiries.map((enquiry) => (
                            <EnquiryCard 
                                key={enquiry.id} 
                                enquiry={enquiry} 
                                onMarkComplete={handleMarkComplete} 
                                onDelete={handleDelete} 
                            />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
