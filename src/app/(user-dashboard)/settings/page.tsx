import ChangePasswordForm from "@/components/UserDashboard/PasswordAndSecurity/ChangePasswordForm";
import DeleteAccountSection from "@/components/UserDashboard/PasswordAndSecurity/DeleteAccountSection";

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-8 py-8 sm:py-12">
      <div className="max-w-xl mx-auto space-y-6">
        <h1 className="text-3xl font-extrabold text-[#1a3c6e]">Password & Security</h1>
        <ChangePasswordForm />
        <DeleteAccountSection />
      </div>
    </div>
  );
}