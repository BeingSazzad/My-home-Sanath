"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Enquiry } from "@/types/enquiry";
import { toast, Toaster } from "sonner";
import { MOCK_AGENT_LEADS } from "@/Mockdata";
import EnquiryCard from "./Enquirycard";

export default function EnquiriesPage() {
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
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-400">Open leads</p>
                        <p className="text-lg font-extrabold text-[#1a3c6e]">{enquiries.length}</p>
                    </div>
                </div>

                {enquiries.length === 0 ? (
                    <div className="bg-white rounded-xl border border-gray-200 p-12 text-center shadow-sm">
                        <p className="text-lg font-bold text-gray-900">No enquiries at the moment</p>
                        <p className="mt-1 text-sm text-gray-500">New property leads will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {enquiries.map((enquiry) => (
                            <EnquiryCard key={enquiry.id} enquiry={enquiry} onUpdateStatus={handleUpdateStatus} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
