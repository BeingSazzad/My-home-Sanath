"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { Skeleton } from "antd";
import "swiper/css";
import "swiper/css/pagination";
import { myFetch } from "@/helpers/myFetch";

export interface Location {
    id: string;
    city: string;
    count: string;
    image: string;
}

const mockLocations: Location[] = [
    { id: "1", city: "London", count: "12,400+", image: "/cardImg.png" },
    { id: "2", city: "Manchester", count: "10,400+", image: "/cardImg.png" },
    { id: "3", city: "Oxford", count: "11,400+", image: "/cardImg.png" },
    { id: "4", city: "Leicester", count: "12,400+", image: "/cardImg.png" },
    { id: "5", city: "Birmingham", count: "9,800+", image: "/cardImg.png" },
    { id: "6", city: "Edinburgh", count: "8,200+", image: "/cardImg.png" },
];

function LocationCard({ location }: { location: Location }) {
    return (
        <Link
            href={`/find-properties?location=${encodeURIComponent(location.city)}`}
            className="flex flex-col items-center gap-2 group"
        >
            <div className="relative w-full h-40 sm:h-44 rounded-2xl overflow-hidden shadow-sm group-hover:shadow-md transition-shadow">
                <Image
                    src={location.image}
                    alt={location.city}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <p className="font-semibold text-gray-900 text-sm mt-1 group-hover:text-[#1a3c6e] transition-colors">
                {location.city}
            </p>
            <p className="text-gray-400 text-xs -mt-1">{location.count}</p>
        </Link>
    );
}

export default function PopularLocations() {
    const [locations, setLocations] = useState<Location[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLocations = async () => {
            try {
                const res = await myFetch("/locations/popular", { method: "GET" });
                if (res?.success && Array.isArray(res.data) && res.data.length > 0) {
                    setLocations(res.data);
                } else {
                    setLocations(mockLocations);
                }
            } catch {
                setLocations(mockLocations);
            } finally {
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);

    return (
        <section className="bg-white py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                {/* Header */}
                <div className="text-center mb-10">
                    <p className="text-[#14b8a6] text-xs font-bold uppercase tracking-widest mb-2">
                        Explore by Location
                    </p>
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-[#1a3c6e]">
                        Popular UK Locations
                    </h2>
                </div>

                {/* Skeleton */}
                {loading ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div key={i} className="flex flex-col items-center gap-2">
                                <Skeleton.Image active className="!w-full !h-40 !rounded-2xl" />
                                <Skeleton active paragraph={{ rows: 1 }} title={false} className="w-20" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <Swiper
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        autoplay={{ delay: 3500, disableOnInteraction: false }}
                        spaceBetween={6}
                        slidesPerView={2}
                        breakpoints={{
                            480: { slidesPerView: 2.5, spaceBetween: 16 },
                            640: { slidesPerView: 3, spaceBetween: 16 },
                            900: { slidesPerView: 4, spaceBetween: 20 },
                            1024: { slidesPerView: 5, spaceBetween: 20 },
                            1280: { slidesPerView: 6, spaceBetween: 24 },
                        }}
                        className="!pb-10"
                    >
                        {locations.map((loc) => (
                            <SwiperSlide key={loc.id}>
                                <LocationCard location={loc} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                )}
            </div>

            <style jsx global>{`
        .swiper-pagination-bullet {
          background: #cbd5e1;
          opacity: 1;
          width: 7px;
          height: 7px;
        }
        .swiper-pagination-bullet-active {
          background: #1a3c6e;
          width: 22px;
          border-radius: 4px;
        }
      `}</style>
        </section>
    );
}