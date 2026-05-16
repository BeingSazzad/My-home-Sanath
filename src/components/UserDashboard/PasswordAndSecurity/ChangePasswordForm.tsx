"use client";

import { useState } from "react";
import { Input, Button } from "antd";
import { toast } from "sonner";
import { handleApiError } from "@/lib/handleApiError";

function getStrength(pw: string): number {
    if (pw.length === 0) return 0;
    if (pw.length < 6) return 1;
    if (pw.length < 8) return 2;
    const hasUpper = /[A-Z]/.test(pw);
    const hasNum = /\d/.test(pw);
    const hasSymbol = /[^a-zA-Z0-9]/.test(pw);
    const extras = [hasUpper, hasNum, hasSymbol].filter(Boolean).length;
    return extras >= 2 ? 4 : 3;
}

const strengthConfig = [
    { label: "", color: "bg-gray-200" },
    { label: "Weak", color: "bg-red-400" },
    { label: "Fair", color: "bg-orange-400" },
    { label: "Good", color: "bg-yellow-400" },
    { label: "Strong", color: "bg-[#14b8a6]" },
];

export default function ChangePasswordForm() {
    const [form, setForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
    const [loading, setLoading] = useState(false);
    const strength = getStrength(form.newPassword);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (form.newPassword.length < 8) {
            toast.error("Password must be at least 8 characters", { id: "change-password" });
            return;
        }
        if (form.newPassword !== form.confirmPassword) {
            toast.error("Passwords do not match", { id: "change-password" });
            return;
        }

        setLoading(true);
        try {
            const response = await myFetch("/api/account/change-password", {
                method: "PATCH",
                body: { currentPassword: form.currentPassword, newPassword: form.newPassword },
            });

            if (response?.success) {
                toast.success(response?.message || "Password updated successfully");
                setForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
            } else {

                handleApiError(response, "change-password")
            }
        } catch (err) {
            console.error("ChangePasswordForm error:", err);
            toast.error("Unexpected error occurred", { id: "change-password" });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl">
            <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-800">Security & Password</h2>
                <p className="text-slate-500 mt-1">Manage your account security and update your password.</p>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-[14px] font-semibold text-slate-700 mb-2">Current Password</label>
                        <Input.Password
                            value={form.currentPassword}
                            onChange={(e) => setForm((f) => ({ ...f, currentPassword: e.target.value }))}
                            placeholder="Enter current password"
                            className="!rounded-xl h-12"
                        />
                    </div>

                    <div>
                        <label className="block text-[14px] font-semibold text-slate-700 mb-2">New Password</label>
                        <Input.Password
                            value={form.newPassword}
                            onChange={(e) => setForm((f) => ({ ...f, newPassword: e.target.value }))}
                            placeholder="Enter new password"
                            className="!rounded-xl h-12"
                        />
                        {/* Strength bar */}
                        <div className="mt-3 flex gap-1.5">
                            {[1, 2, 3, 4].map((level) => (
                                <div
                                    key={level}
                                    className={`flex-1 h-1.5 rounded-full transition-all duration-300 ${
                                        strength >= level ? strengthConfig[strength].color : "bg-slate-100"
                                    }`}
                                />
                            ))}
                        </div>
                        <p className="text-[12px] text-slate-400 mt-2 font-medium">
                            {form.newPassword.length === 0
                                ? "Must be at least 8 characters"
                                : `Strength: ${strengthConfig[strength].label}`}
                        </p>
                    </div>

                    <div>
                        <label className="block text-[14px] font-semibold text-slate-700 mb-2">Confirm New Password</label>
                        <Input.Password
                            value={form.confirmPassword}
                            onChange={(e) => setForm((f) => ({ ...f, confirmPassword: e.target.value }))}
                            placeholder="Repeat new password"
                            className="!rounded-xl h-12"
                        />
                        {form.confirmPassword && form.newPassword !== form.confirmPassword && (
                            <p className="text-xs text-red-500 mt-1.5 font-medium">Passwords do not match</p>
                        )}
                    </div>

                    <div className="pt-2">
                        <Button
                            htmlType="submit"
                            type="primary"
                            loading={loading}
                            className="w-full !h-12 !rounded-xl !bg-[#1a3c6e] !border-[#1a3c6e] text-white font-bold text-base hover:!scale-[1.01] active:!scale-95 transition-all shadow-md shadow-[#1a3c6e]/20"
                        >
                            Update Password
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
}

async function myFetch(url: string, options?: { method?: string; body?: unknown }) {
    await new Promise((r) => setTimeout(r, 600));
    return { success: true, message: "Password updated successfully" };
}