"use client";


import { ArrowLeftOutlined, MailOutlined, SafetyCertificateOutlined } from "@ant-design/icons";
import { Button } from "antd";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import OtpCountdown from "./OtpCountdown";
import { myFetch } from "@/helpers/myFetch";
import Image from "next/image";

const OTP_LENGTH = 6;

export default function VerifyOtpForm() {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [expired, setExpired] = useState(false);
  const [resetKey, setResetKey] = useState(0); // forces OtpCountdown remount on resend

  const searchParams = useSearchParams();
  const router = useRouter();
  const email = searchParams.get("email");

  /* ─── OTP input handlers ─── */
  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return; // digits only
    const updated = [...otp];
    updated[index] = value.slice(-1); // take last char
    setOtp(updated);

    // Auto-focus next
    if (value && index < OTP_LENGTH - 1) {
      const next = document.getElementById(`otp-${index + 1}`);
      (next as HTMLInputElement)?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      (prev as HTMLInputElement)?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    const updated = Array(OTP_LENGTH).fill("");
    pasted.split("").forEach((char, i) => (updated[i] = char));
    setOtp(updated);
    // Focus last filled or next empty
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    document.getElementById(`otp-${focusIndex}`)?.focus();
  };

  /* ─── Submit ─── */
  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    payload: { email: string; otp: string }
  ) => {
    e.preventDefault();
    if (payload.otp.length < OTP_LENGTH) {
      toast.error("Please enter the complete 6-digit OTP", { id: "verify-otp" });
      return;
    }
    setLoading(true);

    router.push(`/auth/set-password?email=${encodeURIComponent(email ?? "")}`);

    try {
      const response = await myFetch("/auth/verify-otp", {
        method: "POST",
        body: payload,
      });

      if (response?.success) {
        toast.success(response?.message || "OTP verified!");
        router.push(`/auth/reset-password?email=${encodeURIComponent(email ?? "")}`);
      } else {
        if (response?.error && Array.isArray(response.error)) {
          response.error.forEach((err: { message: string }) =>
            toast.error(err.message, { id: "verify-otp" })
          );
        } else {
          toast.error(response?.message || "Invalid OTP. Please try again.", {
            id: "verify-otp",
          });
        }
      }
    } catch (err) {
      console.error("VerifyOtpForm error:", err);
      toast.error("Unexpected error occurred", { id: "verify-otp" });
    } finally {
      setLoading(false);
    }
  };

  const otpValue = otp.join("");
  const isComplete = otpValue.length === OTP_LENGTH && !otp.includes("");

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-8">
        <div className="w-16 h-16 bg-[#0f2d5e] rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-sm">
          <SafetyCertificateOutlined className="!text-white text-3xl" style={{ color: 'white' }} />
        </div>
        <h2 className="text-2xl font-extrabold text-[#0f2d5e]">Verify OTP</h2>
        <p className="text-gray-500 mt-2 text-sm leading-relaxed max-w-sm mx-auto">
          Enter the {OTP_LENGTH}-digit code we've sent to your email
          <br />
          <span className="text-gray-700 font-medium">{email || "yourname@example.com"}</span>
        </p>
      </div>

      {/* Card */}
      <div className="border border-blue-100 rounded-2xl p-7 shadow-sm">
        <form
          onSubmit={(e) =>
            handleSubmit(e, { email: email ?? "", otp: otpValue })
          }
        >
          {/* OTP Boxes */}
          <div className="mb-2">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Enter OTP Code
            </label>
            <div className="flex gap-2 sm:gap-3 justify-between">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  id={`otp-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  disabled={expired}
                  className={`
                    w-11 h-12 sm:w-12 sm:h-13 text-center text-lg font-bold rounded-xl border-2 outline-none
                    transition-all duration-200 bg-gray-50
                    ${digit ? "border-[#1a3c6e] bg-gray-50 text-[#1a3c6e]" : "border-gray-200 text-gray-800"}
                    focus:border-[#1a3c6e] focus:bg-gray-50 focus:ring-2 focus:ring-gray-100
                    disabled:opacity-40 disabled:cursor-not-allowed
                  `}
                />
              ))}
            </div>
          </div>

          {/* Countdown + Resend */}
          <OtpCountdown
            key={resetKey}
            email={email}
            onExpire={() => setExpired(true)}
            onResendSuccess={() => {
              setExpired(false);
              setOtp(Array(OTP_LENGTH).fill(""));
              setResetKey((k) => k + 1); // remount countdown
              document.getElementById("otp-0")?.focus();
            }}
          />

          {/* Expired notice */}
          {expired && (
            <p className="text-red-400 text-xs text-center mt-3">
              Your OTP has expired. Please resend to get a new code.
            </p>
          )}

          {/* Submit */}
          <Button
            type="primary"
            htmlType="submit"
            block
            size="large"
            loading={loading}
            disabled={!isComplete || expired}
            className="!bg-[#1a3c6e] !border-[#1a3c6e] !rounded-lg !font-semibold !mt-5"
          >
            Verify OTP
          </Button>
        </form>

        {/* Back */}
        <Link
          href="/auth/forget-password"
          className="flex items-center justify-center gap-2 text-sm text-gray-500 hover:text-[#1a3c6e] transition-colors font-medium mt-5"
        >
          <ArrowLeftOutlined className="text-xs" />
          Back to Forget Password
        </Link>
      </div>
    </div>
  );
}