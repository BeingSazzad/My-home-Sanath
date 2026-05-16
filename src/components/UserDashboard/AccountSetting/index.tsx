"use client";

import { useState } from "react";
import { Button } from "antd";

import ProfilePhotoUpload from "@/components/UserDashboard/ProfileInfo/ProfilePhotoUpload";
import PersonalInfoForm from "@/components/UserDashboard/ProfileInfo/PersonalInfoForm";
import AddressForm from "@/components/UserDashboard/ProfileInfo/AddressForm";
import type { ProfileFormData } from "@/types/account";
import { toast } from "sonner";
import { handleApiError } from "@/lib/handleApiError";

const INITIAL: ProfileFormData = {
    fullName: "John Smith",
    email: "sazzad.uiuxdesign@gmail.com",
    phone: "+44 7700 900123",
    addressLine: "123 Example Street",
    city: "London",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
    language: "English (UK)",
};

async function myFetch(url: string, options?: { method?: string; body?: unknown }) {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: "Profile updated successfully" };
}

export default function AccountSettingsPage() {
    const [profile, setProfile] = useState<ProfileFormData>(INITIAL);
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setProfile((p) => ({ ...p, [field]: value }));
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await myFetch("/api/account/profile", {
                method: "PATCH",
                body: profile,
            });

            if (response?.success) {
                toast.success(response?.message || "Profile updated successfully");
            } else {
                handleApiError(response, "account-settings")
            }
        } catch (err) {
            console.error("AccountSettingsPage error:", err);
            toast.error("Unexpected error occurred", { id: "account-settings" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="">
                <h2 className="text-2xl font-bold text-[#1a3c6e] mb-6">
                    Personal Information
                </h2>
                <form onSubmit={handleSave} className="w-full">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
                        {/* Photo */}
                        <ProfilePhotoUpload />


                        {/* Personal Info */}
                        <PersonalInfoForm
                            data={{ fullName: profile.fullName, email: profile.email, phone: profile.phone }}
                            onChange={handleChange}
                        />


                        {/* Address */}
                        <AddressForm
                            data={{
                                addressLine: profile.addressLine,
                                city: profile.city,
                                postcode: profile.postcode,
                                country: profile.country,
                            }}
                            onChange={handleChange}
                        />

                    </div>

                    <div className="flex justify-end mt-6">
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="h-12 !rounded-xl !bg-[#0f2d5e] !border-[#0f2d5e] !text-white font-bold px-10 hover:!bg-[#0a1f42] transition-colors shadow-lg shadow-[#0f2d5e]/20 text-base"
                        >
                            Save All Changes
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}