"use client";

import { useState } from "react";
import { Button } from "antd";
import { PhoneOutlined, MailOutlined, DownOutlined, UpOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { Enquiry } from "@/types/enquiry";

interface Props {
    enquiry: Enquiry;
    onUpdateStatus: (id: string) => void;
}

export default function EnquiryCard({ enquiry, onUpdateStatus }: Props) {
    const { id, name, initials, email, phone, property, leadDetails, message, timeAgo } = enquiry;
    const [isExpanded, setIsExpanded] = useState(false);

    const handleCall = (e: React.MouseEvent) => {
        e.stopPropagation();
        toast.success(`Calling ${name}...`);
    };

    const handleEmail = (e: React.MouseEvent) => {
        e.stopPropagation();
        toast.success(`Opening email to ${email}`);
    };

    const handleUpdate = (e: React.MouseEvent) => {
        e.stopPropagation();
        onUpdateStatus(id);
    };

    return (
        <div 
            className={`border border-gray-200 rounded-xl bg-white mb-4 shadow-sm transition-all overflow-hidden cursor-pointer hover:border-[#1a3c6e]/30 ${isExpanded ? "ring-1 ring-[#1a3c6e]/20 border-[#1a3c6e]/20" : ""}`}
            onClick={() => setIsExpanded(!isExpanded)}
        >
            {/* Header (Always Visible) */}
            <div className={`p-4 sm:p-5 flex items-start justify-between ${isExpanded ? "border-b border-gray-100 bg-gray-50/50" : ""}`}>
                <div className="flex items-center gap-4 w-full">
                    <div className="w-12 h-12 rounded-full bg-[#1a3c6e]/5 text-[#1a3c6e] font-bold text-sm flex items-center justify-center flex-shrink-0 border border-[#1a3c6e]/10">
                        {initials}
                    </div>
                    <div className="flex-1 min-w-0 pr-4">
                        <div className="flex items-center justify-between mb-1">
                            <p className="font-bold text-gray-900 text-[16px]">{name}</p>
                            <span className="text-xs text-gray-400 whitespace-nowrap hidden sm:block font-medium bg-gray-100 px-2 py-0.5 rounded-md">{timeAgo}</span>
                        </div>
                        <p className={`text-[14px] text-gray-600 ${isExpanded ? "" : "truncate"}`}>
                            {message}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-3 pl-3 border-l border-gray-100 h-10 ml-2">
                    <span className="text-xs text-gray-400 whitespace-nowrap block sm:hidden font-medium">{timeAgo}</span>
                    <div className="text-gray-400 flex items-center justify-center w-6 h-6 rounded-full hover:bg-gray-100 transition-colors">
                        {isExpanded ? <UpOutlined className="text-[11px]" /> : <DownOutlined className="text-[11px]" />}
                    </div>
                </div>
            </div>

            {/* Expanded Details */}
            {isExpanded && (
                <div className="p-4 sm:p-6 bg-white animate-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between mb-5 pb-5 border-b border-gray-100 flex-wrap gap-4">
                        <div className="text-sm flex items-center gap-2">
                            <MailOutlined className="text-gray-400" />
                            <span className="font-medium text-gray-900">{email}</span>
                        </div>
                        <div className="text-sm flex items-center gap-2">
                            <PhoneOutlined className="text-gray-400" />
                            <span className="font-medium text-gray-900">{phone}</span>
                        </div>
                    </div>

                    {/* Property + Lead Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                        <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#1a3c6e]"></span>
                                Property
                            </p>
                            <p className="text-[14px] text-[#1a3c6e] font-semibold">{property}</p>
                        </div>
                        <div className="border border-gray-100 rounded-lg p-4 bg-gray-50/50 hover:bg-gray-50 transition-colors">
                            <p className="text-[11px] uppercase tracking-wider text-gray-500 font-bold mb-2 flex items-center gap-1.5">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#0d9488]"></span>
                                Lead Details
                            </p>
                            <p className="text-[14px] text-gray-800 font-medium">{leadDetails}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
                        <div className="flex items-center gap-3">
                            <Button
                                type="primary"
                                icon={<PhoneOutlined />}
                                onClick={handleCall}
                                className="!bg-[#1a3c6e] !border-[#1a3c6e] hover:!bg-[#0f2d5e] !rounded-md shadow-sm !h-10 !px-5 font-medium"
                            >
                                Call Lead
                            </Button>
                            <Button 
                                icon={<MailOutlined />} 
                                onClick={handleEmail}
                                className="!rounded-md !h-10 !px-5 font-medium"
                            >
                                Email Lead
                            </Button>
                        </div>
                        <Button 
                            onClick={handleUpdate}
                            className="!rounded-md border-gray-300 font-semibold !h-10 !px-5 hover:!border-[#1a3c6e] hover:!text-[#1a3c6e]"
                        >
                            Update Status
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}