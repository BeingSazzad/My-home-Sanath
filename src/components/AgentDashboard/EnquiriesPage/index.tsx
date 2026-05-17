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

    const handleUpdateStatus = (id: string) => {
        Modal.confirm({
            title: "Update Enquiry Status",
            content: "Mark this enquiry as contacted?",
            okText: "Yes, Update",
            okButtonProps: { className: "!bg-teal-600 !border-teal-600" },
            async onOk() {
                toast.success("Status updated!");
                setEnquiries((prev) => prev.filter((e) => e.id !== id));
            },
        });
    };

    const filteredEnquiries = propertyIdFilter 
        ? enquiries.filter((e) => e.propertyId === propertyIdFilter)
        : enquiries;

    return (
        <>
            <Toaster position="top-right" />
            <div className="max-w-7xl mx-auto">
                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-3xl font-extrabold tracking-tight text-[#1a3c6e]">Enquiries Inbox</h1>
                        <p className="text-gray-500 mt-1">Review and manage your property leads</p>
                    </div>
                    <div className="rounded-lg border border-[#1a3c6e]/10 bg-white px-4 py-2 shadow-sm">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                            {propertyIdFilter ? "Filtered leads" : "Open leads"}
                        </p>
                        <p className="text-lg font-extrabold text-[#1a3c6e]">{filteredEnquiries.length}</p>
                    </div>
                </div>

                {propertyIdFilter && (
                    <div className="mb-6 bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 flex items-center justify-between shadow-sm animate-fade-in">
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
                            className="bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 font-semibold px-4 py-2 rounded-lg text-xs transition-all hover:scale-105 active:scale-95 shadow-sm"
                        >
                            Show All Leads
                        </button>
                    </div>
                )}

                {filteredEnquiries.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                        <p className="text-lg font-bold text-gray-900">No enquiries at the moment</p>
                        <p className="mt-1 text-sm text-gray-500">New property leads will appear here.</p>
                        {propertyIdFilter && (
                            <button 
                                onClick={() => router.push("/agent-enquiries")}
                                className="mt-4 bg-[#1a3c6e] hover:bg-[#153058] text-white font-semibold px-4 py-2 rounded-lg text-xs transition-all hover:scale-105"
                            >
                                View All Enquiries
                            </button>
                        )}
                    </div>
                ) : (
                    <div className="space-y-4">
                        {filteredEnquiries.map((enquiry) => (
                            <EnquiryCard key={enquiry.id} enquiry={enquiry} onUpdateStatus={handleUpdateStatus} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
