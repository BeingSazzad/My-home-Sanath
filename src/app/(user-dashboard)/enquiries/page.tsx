import EnquiryList from "@/components/UserDashboard/Enquiries";
import { MOCK_USER_ENQUIRIES } from "@/Mockdata";

export default function MyEnquiriesPage() {
    return (
        <div className="max-w-7xl">
            <div className="mb-6">
                <h1 className="text-3xl font-extrabold text-[#1a3c6e] mb-1">My Enquiries</h1>
                <p className="text-gray-500 text-sm">Track and manage your property enquiries.</p>
            </div>
            <EnquiryList initialData={MOCK_USER_ENQUIRIES} />
        </div>
    );
}
