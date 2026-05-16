"use client";

import { Input, Select } from "antd";
import { ListingFormData } from "../../../../types/listing";

const { Option } = Select;

interface Step1Props {
    data: ListingFormData;
    onChange: (updates: Partial<ListingFormData>) => void;
}

export default function Step1Basics({ data, onChange }: Step1Props) {
    return (
        <div className="space-y-5">
            {/* Listing Type Toggle */}
            <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => onChange({ listingType: "for-sale" })}
                    className={`p-4 rounded border-2 text-left transition-all ${data.listingType === "for-sale"
                        ? "border-[#1a3c6e] bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                >
                    <div className="font-semibold text-gray-900">For Sale</div>
                    <div className="text-sm text-gray-500">Set asking price</div>
                </button>
                <button
                    type="button"
                    onClick={() => onChange({ listingType: "to-rent" })}
                    className={`p-4 rounded border-2 text-left transition-all ${data.listingType === "to-rent"
                        ? "border-[#1a3c6e] bg-blue-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                >
                    <div className="font-semibold text-gray-900">To Rent</div>
                    <div className="text-sm text-gray-500">Set monthly rent</div>
                </button>
            </div>

            {/* Property Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                <Input
                    size="large"
                    placeholder="e.g. Stunning 4-bed family home with double garage"
                    value={data.title}
                    onChange={(e) => onChange({ title: e.target.value })}
                />
            </div>

            {/* Asking Price */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    {data.listingType === "to-rent" ? "Monthly Rent" : "Asking Price"}
                </label>
                <Input
                    size="large"
                    prefix="£"
                    value={data.price}
                    onChange={(e) => onChange({ price: e.target.value })}
                />
            </div>

            {/* Address Fields */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Postcode</label>
                    <Input
                        size="large"
                        value={data.postcode}
                        onChange={(e) => onChange({ postcode: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Country</label>
                    <Input
                        size="large"
                        value={data.country}
                        onChange={(e) => onChange({ country: e.target.value })}
                    />
                </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                    <Input
                        size="large"
                        value={data.city}
                        onChange={(e) => onChange({ city: e.target.value })}
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Street Address</label>
                    <Input
                        size="large"
                        value={data.streetAddress}
                        onChange={(e) => onChange({ streetAddress: e.target.value })}
                    />
                </div>
            </div>

            {/* Location Preview */}
            <div className="border border-dashed border-gray-300 rounded p-3 text-sm text-gray-400 bg-gray-50">
                {data.city || data.postcode
                    ? `📍 ${data.streetAddress ? data.streetAddress + ", " : ""}${data.city}${data.postcode ? " " + data.postcode : ""}, ${data.country}`
                    : "Location Preview: Enter address to preview map location"}
            </div>
        </div>
    );
}