"use client";

import { useState } from "react";
import { Modal } from "antd";
import { Enquiry } from "@/types/enquiry";
import { toast, Toaster } from "sonner";
import EnquiryCard from "./Enquirycard";

const MOCK_ENQUIRIES: any[] = [
    {
        id: "1",
        name: "Tom Walker",
        initials: "TW",
        email: "tom.w@example.com",
        phone: "+44 7700 900111",
        propertyId: "1",
        property: "Stunning Victorian Townhouse",
        price: "£1,300,000",
        address: "42 Kensington Park Road, Notting Hill, W11",
        image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&h=80&fit=crop",
        leadDetails: "First-time buyer • No property to sell",
        message: "Hi, I saw Stunning Victorian Townhouse and would like to arrange a viewing for this weekend if possible.",
        timeAgo: "2 hours ago",
    },
    {
        id: "2",
        name: "Alice Johnson",
        initials: "AJ",
        email: "alice.j@example.com",
        phone: "+44 7700 900112",
        propertyId: "2",
        property: "Modern Riverside Penthouse",
        price: "£2,100,000",
        address: "1 Nine Elms Lane, Vauxhall, SW8",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=80&fit=crop",
        leadDetails: "Cash buyer • Property sold STC",
        message: "I am very interested in the Modern Riverside Penthouse. Could we schedule a viewing early next week?",
        timeAgo: "4 hours ago",
    },
    {
        id: "3",
        name: "Mark King",
        initials: "MK",
        email: "mark.k@example.com",
        phone: "+44 7700 900113",
        propertyId: "3",
        property: "Charming Cotswolds Cottage",
        price: "£675,000",
        address: "8 Church Lane, Bourton-on-the-Water",
        image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=80&fit=crop",
        leadDetails: "Mortgage in principle • No property",
        message: "The Charming Cotswolds Cottage looks perfect for us. Is there any flexibility on the asking price?",
        timeAgo: "6 hours ago",
    },
];

export default function EnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>(MOCK_ENQUIRIES);

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
