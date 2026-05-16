"use client";

import { useState } from "react";
import { Button } from "antd";
import { Pencil, User, Mail, Phone, MapPin, Globe, X } from "lucide-react";

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

const InfoRow = ({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) => (
    <div className="flex items-start gap-4 py-4 border-b border-gray-50 last:border-0">
        <div className="w-9 h-9 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 mt-0.5">
            {icon}
        </div>
        <div>
            <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-0.5">{label}</p>
            <p className="text-sm font-bold text-gray-900">{value || "—"}</p>
        </div>
    </div>
);

export default function AccountSettingsPage() {
    const [profile, setProfile] = useState<ProfileFormData>(INITIAL);
    const [draft, setDraft] = useState<ProfileFormData>(INITIAL);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleChange = (field: string, value: string) => {
        setDraft((p) => ({ ...p, [field]: value }));
    };

    const handleEdit = () => {
        setDraft(profile);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setDraft(profile);
        setIsEditing(false);
    };

    const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await myFetch("/api/account/profile", {
                method: "PATCH",
                body: draft,
            });

            if (response?.success) {
                setProfile(draft);
                setIsEditing(false);
                toast.success(response?.message || "Profile updated successfully");
            } else {
                handleApiError(response, "account-settings");
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
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-[#1a3c6e]">Personal Information</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        {isEditing ? "Update your personal details below" : "Your profile details"}
                    </p>
                </div>
                {!isEditing && (
                    <button
                        onClick={handleEdit}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-[#0f2d5e] text-[#0f2d5e] font-bold text-sm hover:bg-[#0f2d5e] hover:text-white transition-all"
                    >
                        <Pencil size={15} />
                        Edit
                    </button>
                )}
            </div>

            {/* VIEW MODE */}
            {!isEditing && (
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-6">
                    {/* Avatar */}
                    <div className="flex items-center gap-5 pb-6 border-b border-gray-100">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-[#0f2d5e] to-[#255099] flex items-center justify-center text-white font-bold text-2xl shadow-md flex-shrink-0">
                            JS
                        </div>
                        <div>
                            <p className="text-lg font-bold text-gray-900">{profile.fullName}</p>
                            <p className="text-sm text-gray-500">{profile.email}</p>
                        </div>
                    </div>

                    {/* Personal Info */}
                    <div>
                        <h3 className="text-sm font-extrabold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                            Personal Information
                        </h3>
                        <InfoRow icon={<User size={16} className="text-[#1a3c6e]" />} label="Full Name" value={profile.fullName} />
                        <InfoRow icon={<Mail size={16} className="text-[#1a3c6e]" />} label="Email Address" value={profile.email} />
                        <InfoRow icon={<Phone size={16} className="text-[#1a3c6e]" />} label="Phone Number" value={profile.phone} />
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-sm font-extrabold text-gray-900 mb-2 pb-2 border-b border-gray-100">
                            Address
                        </h3>
                        <InfoRow icon={<MapPin size={16} className="text-[#1a3c6e]" />} label="Address Line" value={profile.addressLine} />
                        <InfoRow icon={<MapPin size={16} className="text-[#1a3c6e]" />} label="City / Town" value={profile.city} />
                        <InfoRow icon={<MapPin size={16} className="text-[#1a3c6e]" />} label="Postcode" value={profile.postcode} />
                        <InfoRow icon={<Globe size={16} className="text-[#1a3c6e]" />} label="Country" value={profile.country} />
                    </div>
                </div>
            )}

            {/* EDIT MODE */}
            {isEditing && (
                <form onSubmit={handleSave} className="w-full">
                    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 sm:p-8 space-y-8">
                        <ProfilePhotoUpload />
                        <PersonalInfoForm
                            data={{ fullName: draft.fullName, email: draft.email, phone: draft.phone }}
                            onChange={handleChange}
                        />
                        <AddressForm
                            data={{
                                addressLine: draft.addressLine,
                                city: draft.city,
                                postcode: draft.postcode,
                                country: draft.country,
                            }}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-gray-200 text-gray-600 font-bold text-sm hover:bg-gray-50 transition-all"
                        >
                            <X size={15} />
                            Cancel
                        </button>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            className="h-12 !rounded-xl !bg-[#0f2d5e] !border-[#0f2d5e] !text-white font-bold px-10 hover:!bg-[#0a1f42] transition-colors shadow-lg shadow-[#0f2d5e]/20 text-base"
                        >
                            Save Changes
                        </Button>
                    </div>
                </form>
            )}
        </div>
    );
}
