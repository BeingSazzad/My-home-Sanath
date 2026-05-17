"use client";

import { useState } from "react";
import { Button, Tabs } from "antd";
import { User, Building2 } from "lucide-react";
import { AgencyProfile } from "@/types/enquiry";
import { toast } from "sonner";
import { myFetch } from "@/helpers/myFetch";
import AgencyLogoSection from "./AgencyLogoSection";
import CoreInfoForm from "./CoreInfoForm";
import BusinessDetailsForm from "./BusinessDetailsForm";
import PersonalInfoForm from "@/components/UserDashboard/ProfileInfo/PersonalInfoForm";
import AddressForm from "@/components/UserDashboard/ProfileInfo/AddressForm";

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
    description: "Henderson & Co is a leading independent estate agent specializing in prime central London properties.",
};

const defaultPersonal = {
    fullName: "Sarah Jenkins",
    email: "sarah.j@henderson.co.uk",
    phone: "+44 7700 900123",
    addressLine: "123 Example Street",
    city: "London",
    postcode: "SW1A 1AA",
    country: "United Kingdom",
};

export default function AgencyProfilePage() {
    const [agencyProfile, setAgencyProfile] = useState<AgencyProfile>(defaultProfile);
    const [personalProfile, setPersonalProfile] = useState(defaultPersonal);
    const [loading, setLoading] = useState(false);

    const handleAgencyChange = (key: keyof AgencyProfile, value: string) => {
        setAgencyProfile((prev) => ({ ...prev, [key]: value }));
    };

    const handlePersonalChange = (field: string, value: string) => {
        setPersonalProfile((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await myFetch<{ success: boolean; message?: string }>(
                "/api/profile/update",
                { method: "PATCH", body: { agency: agencyProfile, personal: personalProfile } }
            );

            if (response?.success) {
                toast.success(response?.message || "Settings updated successfully!");
            } else {
                toast.error(response?.message || "Something went wrong!");
            }
        } catch (err) {
            console.error("AgencyProfilePage error:", err);
            toast.error("Unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const tabItems = [
        {
            key: "personal",
            label: (
                <div className="flex items-center gap-2 px-1">
                    <User size={16} />
                    <span>Personal Profile</span>
                </div>
            ),
            children: (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <PersonalInfoForm
                        data={{
                            fullName: personalProfile.fullName,
                            email: personalProfile.email,
                            phone: personalProfile.phone,
                        }}
                        onChange={handlePersonalChange}
                    />
                    <hr className="border-gray-100" />
                    <AddressForm
                        data={{
                            addressLine: personalProfile.addressLine,
                            city: personalProfile.city,
                            postcode: personalProfile.postcode,
                            country: personalProfile.country,
                        }}
                        onChange={handlePersonalChange}
                    />
                </div>
            ),
        },
        {
            key: "agency",
            label: (
                <div className="flex items-center gap-2 px-1">
                    <Building2 size={16} />
                    <span>Agency Profile</span>
                </div>
            ),
            children: (
                <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                    <AgencyLogoSection initials="HE" />
                    <hr className="border-gray-100" />
                    <CoreInfoForm data={agencyProfile} onChange={handleAgencyChange} />
                </div>
            ),
        },
    ];

    return (
        <div className="max-w-4xl">
            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Profile Management</h1>
                <p className="text-gray-500 mt-1">Manage your personal and agency details.</p>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-2 sm:p-4">
                    <Tabs
                        defaultActiveKey="personal"
                        items={tabItems}
                        className="custom-agency-tabs"
                        size="large"
                        tabBarStyle={{ marginBottom: 24, paddingLeft: 16, paddingRight: 16 }}
                    />

                    <div className="p-4 sm:p-6 pt-0 flex justify-end">
                        <Button
                            htmlType="submit"
                            type="primary"
                            size="large"
                            loading={loading}
                            className="!bg-[#1a3c6e] !border-[#1a3c6e] !h-12 !rounded-xl !px-12 font-bold text-base shadow-lg shadow-[#1a3c6e]/20 hover:!scale-[1.02] active:!scale-95 transition-all"
                        >
                            Save All Changes
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    );
}