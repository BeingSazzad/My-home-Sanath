"use client";

import { useState } from "react";
import { Button } from "antd";


import { AgencyProfile } from "@/types/enquiry";
import { toast } from "sonner";
import { myFetch } from "@/helpers/myFetch";
import AgencyLogoSection from "./AgencyLogoSection";
import CoreInfoForm from "./Coreinfoform";
import BusinessDetailsForm from "./Businessdetailsform";


const defaultProfile: AgencyProfile = {
    agencyName: "Henderson & Co",
    contactPerson: "Sarah Jenkins",
    email: "sazzad.uiuxdesign@gmail.com",
    phone: "+44 20 7946 0958",
    website: "https://henderson.co.uk",
    companyRegNumber: "12345678",
    addressLine1: "42 High Street",
    city: "London",
    postcode: "SW1A 1AA",
    description:
        "Henderson & Co is a leading independent estate agent specializing in prime central London properties.",
};

export default function AgencyProfilePage() {
    const [profile, setProfile] = useState<AgencyProfile>(defaultProfile);
    const [loading, setLoading] = useState(false);

    const handleChange = (key: keyof AgencyProfile, value: string) => {
        setProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await myFetch<{ success: boolean; message?: string; error?: { message: string }[] }>(
                "/api/agency-profile",
                { method: "PATCH", body: profile as unknown as Record<string, unknown> }
            );

            if (response?.success) {
                toast.success(response?.message || "Profile updated successfully!");
            } else {
                if (response?.error && Array.isArray(response.error)) {
                    response.error.forEach((err) => toast.error(err.message, { id: "agency-profile" }));
                } else {
                    toast.error(response?.message || "Something went wrong!", { id: "agency-profile" });
                }
            }
        } catch (err) {
            console.error("AgencyProfilePage error:", err);
            toast.error("Unexpected error occurred", { id: "agency-profile" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div className="max-w-3xl">
                <h1 className="text-2xl font-bold mb-6" style={{ color: "#1a3c6e" }}>Agency Profile</h1>

                <form onSubmit={handleSubmit}>
                    <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
                        <AgencyLogoSection initials="HE" />
                        <hr className="border-gray-100 mb-6" />
                        <CoreInfoForm data={profile} onChange={handleChange} />
                        <hr className="border-gray-100 mb-6" />
                        <BusinessDetailsForm data={profile} onChange={handleChange} />

                        <div className="mt-4">
                            <Button
                                htmlType="submit"
                                type="primary"
                                size="large"
                                loading={loading}
                                className="!bg-teal-600 !border-teal-600 hover:!bg-teal-700 !px-8"
                            >
                                Save All Changes
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    );
}