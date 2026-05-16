"use client";

import Image from "next/image";
import { Listing, ListingStatus } from "@/types/listing";
import { Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Eye } from "lucide-react";

interface ListingsTableProps {
  listings: Listing[];
  onDelete: (id: string) => void;
  onDetails: (id: string) => void;
  onEdit: (id: string) => void;
}

const STATUS_CONFIG: Record<ListingStatus, { label: string; classes: string }> = {
  active: { label: "active", classes: "bg-green-50 text-green-700 border border-green-200" },
  draft: { label: "draft", classes: "bg-gray-100 text-gray-600 border border-gray-300" },
  closed: { label: "closed", classes: "bg-red-50 text-red-600 border border-red-200" },
  "let agreed": { label: "let agreed", classes: "bg-blue-50 text-blue-700 border border-blue-200" },
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

export default function ListingsTable({ listings, onDelete, onDetails, onEdit }: ListingsTableProps) {
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
      <div className="min-w-[800px] grid grid-cols-[2.5fr_1fr_1fr_1.5fr_250px] gap-6 px-6 py-4 bg-gray-50/50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase tracking-wider">
        <span>Property</span>
        <span className="text-right">Price</span>
        <span className="text-right">Views</span>
        <span className="text-center">Status</span>
        <span className="text-right">Actions</span>
      </div>

      {/* Rows */}
      <div className="divide-y divide-gray-100 min-w-[800px]">
        {listings.map((listing) => (
          <div
            key={listing.id}
            className="grid grid-cols-[2.5fr_1fr_1fr_1.5fr_250px] gap-6 px-6 py-5 items-center hover:bg-gray-50 transition-colors group"
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

            {/* Price */}
            <div className="text-right">
              <span className="text-[#1a3c6e] font-bold text-[15px]">{listing.price}</span>
            </div>

            {/* Views */}
            <div className="text-right font-semibold text-[14px] text-gray-600">
              {listing.views.toLocaleString()}
            </div>

            {/* Status */}
            <div className="flex justify-center">
              <StatusBadge status={listing.status} />
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
