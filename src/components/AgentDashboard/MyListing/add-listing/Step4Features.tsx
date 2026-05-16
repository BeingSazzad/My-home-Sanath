"use client";

import { FEATURES_LIST } from "@/Mockdata";
import { ListingFormData } from "@/types/listing";
import { Input } from "antd";

const { TextArea } = Input;

interface Step4Props {
    data: ListingFormData;
    onChange: (updates: Partial<ListingFormData>) => void;
}

export default function Step4Features({ data, onChange }: Step4Props) {
    const toggleFeature = (feature: string) => {
        const current = data.features || [];
        const updated = current.includes(feature)
            ? current.filter((f) => f !== feature)
            : [...current, feature];
        onChange({ features: updated });
    };

    return (
        <div className="space-y-5">
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Features</label>
                <div className="grid grid-cols-3 gap-2">
                    {FEATURES_LIST.map((feature: any) => {
                        const isSelected = data.features?.includes(feature);
                        return (
                            <button
                                key={feature}
                                type="button"
                                onClick={() => toggleFeature(feature)}
                                className={`px-3 py-2 text-sm border rounded text-left transition-all ${isSelected
                                    ? "border-[#1a3c6e] bg-blue-50 text-[#1a3c6e] font-medium"
                                    : "border-gray-200 text-gray-700 hover:border-gray-300 bg-white"
                                    }`}
                            >
                                {isSelected && <span className="mr-1">✓</span>}
                                {feature}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <TextArea
                    rows={5}
                    placeholder="Describe the property in detail"
                    value={data.description}
                    onChange={(e) => onChange({ description: e.target.value })}
                    className="resize-none"
                />
            </div>
        </div>
    );
}