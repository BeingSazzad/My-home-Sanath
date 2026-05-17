"use client";

import Image from "next/image";
import Link from "next/link";
import { Listing, ListingStatus } from "@/types/listing";
import { Popconfirm, Dropdown } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Eye } from "lucide-react";

interface ListingsTableProps {
  listings: Listing[];
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
  onStatusChange?: (id: string, newStatus: ListingStatus) => void;
  onViewLeads?: (id: string) => void;
}

const STATUS_CONFIG: Record<ListingStatus, { label: string; classes: string }> = {
  active: { label: "active", classes: "bg-green-50 text-green-700 border border-green-200" },
  draft: { label: "draft", classes: "bg-gray-100 text-gray-600 border border-gray-300" },
  closed: { label: "closed", classes: "bg-red-50 text-red-600 border border-red-200" },
  sold: { label: "sold", classes: "bg-purple-50 text-purple-700 border border-purple-200" },
};

export function StatusBadge({ status }: { status: ListingStatus }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.draft;
  return (
    <span className={`px-3 py-1.5 rounded-md text-[11px] font-bold uppercase tracking-wider ${config.classes}`}>
      {config.label}
    </span>
  );
}

export default function ListingsTable({ listings, onDelete, onDetails, onEdit, onStatusChange, onViewLeads }: ListingsTableProps) {
  if (listings.length === 0) {
    return (
      <div className="text-center py-20 text-gray-400 bg-white">
        <p className="text-lg font-semibold">No listings found</p>
        <p className="text-sm mt-1">Add your first listing to get started</p>
      </div>
    );
  }

  return (
    <div className="w-full overflow-x-auto bg-white">
      {/* Table Header */}
      <div className="min-w-[850px] grid grid-cols-[2fr_0.8fr_1fr_0.8fr_0.8fr_1fr_220px] gap-6 px-6 py-4 bg-gray-50/50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
        <span>Property</span>
        <span className="text-center">Type</span>
        <span className="text-right">Price</span>
        <span className="text-right">Views</span>
        <span className="text-right">Leads</span>
        <span className="text-center">Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 min-w-[800px]">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="grid grid-cols-[2fr_0.8fr_1fr_0.8fr_0.8fr_1fr_220px] gap-6 px-6 py-5 items-center hover:bg-gray-50 transition-colors group"
          >
            {/* Property */}
            <div className="flex items-center gap-4 min-w-0 pr-4">
              <div className="relative w-20 h-14 rounded-lg overflow-hidden flex-shrink-0 border border-gray-100 shadow-sm">
                <Image src={listing.image} alt={listing.title} fill className="object-cover" unoptimized />
              </div>
              <div className="min-w-0">
                <p className="font-bold text-gray-900 text-[15px] truncate mb-0.5">{listing.title}</p>
                <p className="text-[13px] text-gray-500 truncate">{listing.address}</p>
              </div>
            </div>
            {/* Category/Type */}
            <div className="flex justify-center">
              <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-tight ${
                listing.listingType === "for-sale" 
                  ? "bg-amber-50 text-amber-700 border border-amber-100" 
                  : "bg-indigo-50 text-indigo-700 border border-indigo-100"
              }`}>
                {listing.listingType === "for-sale" ? "Sale" : "Rent"}
              </span>
            </div>
            {/* Price */}
            <div className="text-right">
              <span className="text-[#1a3c6e] font-bold text-[15px]">{listing.price}</span>
            </div>

            {/* Views */}
            <div className="text-right font-semibold text-[14px] text-gray-600">
              {listing.views.toLocaleString()}
            </div>

            {/* Leads */}
            <div className="text-right flex justify-end">
              <button
                onClick={() => onViewLeads?.(listing.id)}
                className="bg-transparent border-0 p-0 focus:outline-none cursor-pointer"
              >
                <span className={`px-3 py-1.5 rounded-md text-[12px] font-bold border transition-all inline-block hover:scale-105 active:scale-95 cursor-pointer ${
                  listing.leadsCount && listing.leadsCount > 0
                    ? "bg-blue-50 text-blue-700 border-blue-200 hover:bg-blue-100"
                    : "bg-gray-50 text-gray-400 border-gray-200 hover:bg-gray-100"
                }`}>
                  {listing.leadsCount ?? 0} leads
                </span>
              </button>
            </div>

            {/* Status */}
            <div className="flex justify-center">
              {onStatusChange ? (
                <Dropdown
                  menu={{
                    items: [
                      { key: "active", label: <span className="font-bold text-green-700">Active</span> },
                      { key: "sold", label: <span className="font-bold text-purple-700">Sold</span> },
                      { key: "draft", label: <span className="font-bold text-gray-600">Draft</span> },
                      { key: "closed", label: <span className="font-bold text-red-600">Closed</span> },
                    ],
                    onClick: ({ key }) => onStatusChange(listing.id, key as ListingStatus),
                  }}
                  trigger={["click"]}
                  placement="bottom"
                >
                  <button className="flex items-center gap-1 hover:scale-105 active:scale-95 transition-all cursor-pointer bg-transparent border-0 p-0 focus:outline-none">
                    <StatusBadge status={listing.status} />
                  </button>
                </Dropdown>
              ) : (
                <StatusBadge status={listing.status} />
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 text-sm opacity-90 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => onDetails(listing.id)}
                className="text-gray-600 font-semibold hover:text-[#1a3c6e] transition-colors flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-[#1a3c6e]/5"
              >
                <Eye size={16} />
                View
              </button>
              <button
                onClick={() => onEdit(listing.id)}
                className="text-[#1a3c6e] font-semibold hover:text-[#0f2d5e] transition-colors flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-[#1a3c6e]/5"
              >
                <EditOutlined className="text-[15px]" />
                Edit
              </button>
              <button
                onClick={() => onDelete(listing.id)}
                className="text-red-500 font-semibold hover:text-red-700 transition-colors flex items-center gap-1.5 px-3 py-2 rounded-md hover:bg-red-50"
              >
                <DeleteOutlined className="text-[15px]" />
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
