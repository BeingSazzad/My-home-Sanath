"use client";

import { useState } from "react";
import { Button } from "antd";
import { toast } from "sonner";
import ProfilePhotoUpload from "@/components/UserDashboard/ProfileInfo/ProfilePhotoUpload";
import PersonalInfoForm from "@/components/UserDashboard/ProfileInfo/PersonalInfoForm";
import AddressForm from "@/components/UserDashboard/ProfileInfo/AddressForm";
import type { ProfileFormData } from "@/types/account";

const INITIAL: ProfileFormData = {
    fullName: "John Smith",
    email: "sazzad.uiuxdesign@gmail.com",
    phone: "+44 7700 900123",
    addressLine: "123 Example Street",
    city: "London",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
};

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
            // Mocking API call
            await new Promise((r) => setTimeout(r, 800));
            toast.success("Profile updated successfully");
        } catch (err) {
            console.error("AccountSettingsPage error:", err);
            toast.error("Unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Profile</h1>
                <p className="text-gray-500 mt-1">Manage your personal details and account information.</p>
            </div>

            <form onSubmit={handleSave}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8 space-y-8 animate-in fade-in duration-500">
                    <ProfilePhotoUpload />
                    <PersonalInfoForm
                        data={{ fullName: profile.fullName, email: profile.email, phone: profile.phone }}
                        onChange={handleChange}
                    />
                    <hr className="border-gray-100" />
                    <AddressForm
                        data={{
                            addressLine: profile.addressLine,
                            city: profile.city,
                            postcode: profile.postcode,
                            country: profile.country,
                        }}
                        onChange={handleChange}
                    />

                    <div className="pt-4 flex justify-end">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={loading}
                            className="!bg-[#1a3c6e] !border-[#1a3c6e] !h-12 !rounded-xl !px-12 font-bold text-base shadow-lg shadow-[#1a3c6e]/20 hover:!scale-[1.02] active:!scale-95 transition-all"
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}
