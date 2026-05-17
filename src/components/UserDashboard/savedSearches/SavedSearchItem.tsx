"use client";
import Link from "next/link";

import { Button } from "antd";
import { BellFilled, BellOutlined } from "@ant-design/icons";

export interface SavedSearch {
    id: string;
    title: string;
    description: string;
    alertOn: boolean;
}

export interface Props {
    item: SavedSearch;
    onToggleAlert: (id: string) => void;
    onRemove: (id: string) => void;
    isLast: boolean;
}

export default function SavedSearchItem({ item, onToggleAlert, onRemove, isLast }: Props) {
    return (
        <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-5 ${!isLast ? "border-b border-gray-100" : ""}`}>
            <Link 
                href={`/find-properties?q=${encodeURIComponent(item.title.split(',')[0])}`}
                className="flex-1 min-w-0 group cursor-pointer"
            >
                <h3 className="font-semibold text-gray-900 text-sm sm:text-base group-hover:text-[#14b8a6] group-hover:underline transition-colors">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm mt-0.5">{item.description}</p>
            </Link>

            <div className="flex items-center gap-3 shrink-0">
                <Button
                    onClick={() => onToggleAlert(item.id)}
                    icon={item.alertOn ? <BellFilled /> : <BellOutlined />}
                    className={`rounded-lg font-semibold text-sm px-4 h-9 border transition-all ${item.alertOn
                        ? "!bg-green-50 !border-green-200 !text-green-600 hover:!bg-green-100"
                        : "!bg-gray-50 !border-gray-200 !text-gray-500 hover:!bg-gray-100"
                        }`}
                >
                    {item.alertOn ? "Alert On" : "Alert Off"}
                </Button>

                <Button
                    type="link"
                    danger
                    onClick={() => onRemove(item.id)}
                    className="!p-0 !h-auto font-medium text-sm"
                >
                    Remove
                </Button>
            </div>
        </div>
    );
}