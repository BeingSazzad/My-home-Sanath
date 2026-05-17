"use client";

import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import { Skeleton } from "antd";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import PropertyCard, { type Property } from "./PropertyCard";
import { myFetch } from "@/helpers/myFetch";


/* ── static fallback ── */
const mockProperties: Property[] = Array.from({ length: 6 }, (_, i) => ({
    id: `prop-${i + 1}`,
    images: ["/cardImg.png", "/cardImg.png", "/cardImg.png"],
    price: 875000,
    featured: i % 3 === 0,
    title: "Modern 4 bed House",
    address: "42 Morning Lane, London",
    agentLogo: "/images/customer.png",
    addedOn: "01/03/2026",
}));

export default function PropertiesNearYou() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const res = await myFetch("/properties/near-you", { method: "GET" });
                if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
                    setProperties(res.data);
                } else {
                    setProperties(mockProperties);
                }
            } catch {
                setProperties(mockProperties);
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return (
        <section className="bg-white py-16 sm:py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Heading Area */}
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3">
                            Properties near you
                        </h2>
                        <p className="text-gray-500 text-sm sm:text-base leading-relaxed">Handpicked homes in your favorite neighborhoods</p>
                    </div>
                    
                    {/* Desktop Navigation Arrows */}
                    <div className="hidden md:flex gap-3">
                        <button className="prop-prev w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1a3c6e] hover:text-white hover:border-[#1a3c6e] transition-all shadow-sm">
                            <ChevronLeft size={20} />
                        </button>
                        <button className="prop-next w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-[#1a3c6e] hover:text-white hover:border-[#1a3c6e] transition-all shadow-sm">
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Loading skeletons */}
                {loading ? (
                    <div className="flex gap-6 overflow-hidden">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="min-w-[350px] rounded-2xl overflow-hidden border border-gray-100">
                                <Skeleton.Image active className="!w-full !h-60" />
                                <div className="p-4">
                                    <Skeleton active paragraph={{ rows: 2 }} />
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="relative -mx-4 px-4">
                        <Swiper
                            modules={[Pagination, Navigation]}
                            pagination={{ 
                                clickable: true,
                                dynamicBullets: true
                            }}
                            navigation={{
                                prevEl: '.prop-prev',
                                nextEl: '.prop-next',
                            }}
                            spaceBetween={24}
                            slidesPerView={1.2}
                            breakpoints={{
                                640: { slidesPerView: 2.2 },
                                1024: { slidesPerView: 3 },
                                1280: { slidesPerView: 3.2 },
                            }}
                            className="property-swiper !pb-14"
                        >
                            {properties.map((property) => (
                                <SwiperSlide key={property.id} className="h-auto">
                                    <PropertyCard property={property} />
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                )}
            </div>

            {/* Swiper custom styles */}
            <style jsx global>{`
                .property-swiper .swiper-pagination {
                    bottom: 0px !important;
                }
                .property-swiper .swiper-pagination-bullet {
                    background: #cbd5e1;
                    opacity: 1;
                    width: 6px;
                    height: 6px;
                    transition: all 0.3s ease;
                }
                .property-swiper .swiper-pagination-bullet-active {
                    background: #14b8a6;
                    width: 24px;
                    border-radius: 4px;
                }
                .swiper-button-disabled {
                    opacity: 0.3;
                    cursor: not-allowed !important;
                }
            `}</style>
        </section>
    );
}