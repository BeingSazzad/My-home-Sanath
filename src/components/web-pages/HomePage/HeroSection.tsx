"use client";

import { useState } from "react";
import Image from "next/image";
import { Input, Button } from "antd";
import { SearchOutlined, SettingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import FilterModal from "../FindProperties/FilterModal";
import { SlidersHorizontal } from "lucide-react";

type SearchTab = "buy" | "rent";

const tabConfig: Record<SearchTab, { label: string; placeholder: string; path: string }> = {
    buy: { label: "Buy", placeholder: "Search homes to buy", path: "/find-properties" },
    rent: { label: "Rent", placeholder: "Search homes for rent", path: "/find-properties" },
};

export default function HeroSection() {
    const [activeTab, setActiveTab] = useState<SearchTab>("buy");
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = () => {
        const trimmed = query.trim();
        router.push(trimmed ? `/find-properties?q=${encodeURIComponent(trimmed)}` : "/find-properties");
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") handleSearch();
    };

    return (
        <section className="relative w-full h-[520px] sm:h-[580px] md:h-[640px] flex items-center justify-center overflow-hidden rounded-[2rem] mt-6 sm:mt-8 shadow-sm">
            {/* Background image */}
            <Image
                src="/heroImg.jpg"
                alt="Beautiful property"
                fill
                className="object-cover object-center rounded-3xl"
                priority
            />

            {/* Subtle dark veil — keeps image vibrant but text legible */}
            <div className="absolute inset-0 bg-black/40 rounded-3xl" />

            {/* Content */}
            <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center gap-10">

                {/* Headline */}
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-extrabold text-center leading-tight tracking-tight drop-shadow-lg mb-2">
                    <span className="text-white">Property </span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 to-[#14b8a6] drop-shadow-sm">
                        Simplified
                    </span>
                </h1>

                {/* Search card */}
                <div className="w-full bg-[#0f2d5e]/80 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl border border-white/10">

                    {/* Tabs */}
                    <div className="flex border-b border-white/10">
                        {(Object.keys(tabConfig) as SearchTab[]).map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`
                   flex-1 py-4 text-sm font-semibold tracking-wide transition-all duration-300
                   ${activeTab === tab
                                        ? "text-white bg-white/5 border-b-2 border-[#14b8a6]"
                                        : "text-white/50 hover:text-white/80 hover:bg-white/5"
                                    }
                 `}
                            >
                                {tabConfig[tab].label}
                            </button>
                        ))}
                    </div>

                    {/* Search row */}
                    <div className="px-6 py-8 flex flex-col sm:flex-row gap-4 items-end">
                        {/* Search Container */}
                        <div className="w-full flex flex-col gap-3">
                            <span className="text-white/90 text-sm font-medium tracking-wide pl-1">
                                {tabConfig[activeTab as keyof typeof tabConfig]?.placeholder}
                            </span>

                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Input */}
                                <Input
                                    size="large"
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    onKeyDown={handleKeyDown}
                                    placeholder="Search by location, postcode or area..."
                                    prefix={<SearchOutlined className="text-gray-400 mr-3 text-lg" />}
                                    suffix={
                                        <button
                                            onClick={() => setIsFilterOpen(true)}
                                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400 hover:text-[#1a3c6e]"
                                            title="Open Filters"
                                        >
                                            <SlidersHorizontal size={18} />
                                        </button>
                                    }
                                    className="
                                        flex-1 !rounded-xl !border-0 !bg-white
                                        !text-gray-900 !placeholder-gray-400/80
                                        !h-[56px] !text-[15px] !font-medium shadow-xl !pl-6 !pr-2
                                    "
                                    allowClear
                                />

                                {/* CTA */}
                                <Button
                                    size="large"
                                    onClick={handleSearch}
                                    className="
                                        !h-[56px] !px-12 !rounded-xl !border-0
                                        !bg-[#14b8a6] hover:!bg-[#119e8e]
                                        !text-white !font-semibold !text-[15px]
                                        whitespace-nowrap shrink-0 transition-all active:scale-95 shadow-lg shadow-[#14b8a6]/20
                                    "
                                >
                                    Search Properties
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <FilterModal
                isOpen={isFilterOpen}
                onClose={() => setIsFilterOpen(false)}
            />
        </section>
    );
}
