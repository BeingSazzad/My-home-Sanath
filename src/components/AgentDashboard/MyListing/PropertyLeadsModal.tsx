"use client";

import { useState, useEffect } from "react";
import { Modal, Skeleton, Button, Tag, Divider } from "antd";
import { PhoneOutlined, MailOutlined, CalendarOutlined, CheckCircleOutlined, UserOutlined } from "@ant-design/icons";
import { toast } from "sonner";

interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  leadDetails: string;
  timeAgo: string;
  date: string;
}

interface PropertyLeadsModalProps {
  open: boolean;
  onClose: () => void;
  propertyId: string | null;
  propertyTitle?: string;
}

// ─── Rich property-specific mock leads database ──────────────────────────────
const MOCK_PROPERTY_LEADS: Record<string, Lead[]> = {
  "1": [
    {
      id: "l1-1",
      name: "Tom Walker",
      email: "tom.w@example.com",
      phone: "+44 7700 900111",
      leadDetails: "First-time buyer • Mortgage approved",
      message: "Hi, I saw Stunning Victorian Townhouse and would like to arrange a viewing for this weekend if possible.",
      timeAgo: "2 hours ago",
      date: "17 May 2026",
    },
    {
      id: "l1-2",
      name: "Alice Johnson",
      email: "alice.j@example.com",
      phone: "+44 7700 900112",
      leadDetails: "Cash buyer • No chain",
      message: "Is there any room for negotiations on the asking price? I would love to schedule a private viewing.",
      timeAgo: "5 hours ago",
      date: "17 May 2026",
    },
    {
      id: "l1-3",
      name: "David Smith",
      email: "david.s@example.com",
      phone: "+44 7700 900115",
      leadDetails: "Property under offer • Ready to move",
      message: "Excellent looking Victorian townhouse. I would love to know what council tax band it falls under.",
      timeAgo: "1 day ago",
      date: "16 May 2026",
    },
  ],
  "2": [
    {
      id: "l2-1",
      name: "Mark King",
      email: "mark.k@example.com",
      phone: "+44 7700 900113",
      leadDetails: "Investment buyer • Cash",
      message: "Could you send over the lease terms, ground rent details and annual service charges for the Penthouse?",
      timeAgo: "4 hours ago",
      date: "17 May 2026",
    },
    {
      id: "l2-2",
      name: "Sophia Carter",
      email: "sophia.c@example.com",
      phone: "+44 7700 900118",
      leadDetails: "Upsizing • House sold",
      message: "The terrace views look phenomenal. Are pets allowed in this building?",
      timeAgo: "8 hours ago",
      date: "17 May 2026",
    },
    {
      id: "l2-3",
      name: "James Wilson",
      email: "james.w@example.com",
      phone: "+44 7700 900119",
      leadDetails: "Relocating from abroad",
      message: "I am arriving in London next week. Can we schedule an in-person viewing on Thursday morning?",
      timeAgo: "2 days ago",
      date: "15 May 2026",
    },
    {
      id: "l2-4",
      name: "Emma Davis",
      email: "emma.d@example.com",
      phone: "+44 7700 900120",
      leadDetails: "First-time buyer",
      message: "Beautiful modern design! Does the penthouse come fully furnished or is it unfurnished?",
      timeAgo: "3 days ago",
      date: "14 May 2026",
    },
  ],
  "3": [],
  "4": [
    {
      id: "l4-1",
      name: "Oliver Thompson",
      email: "oliver.t@example.com",
      phone: "+44 7700 900122",
      leadDetails: "Professional tenant • 12-month lease",
      message: "Hi, I am interested in renting this apartment. I work in the city center. Is parking included in the rent?",
      timeAgo: "6 hours ago",
      date: "17 May 2026",
    },
    {
      id: "l4-2",
      name: "Isabella Martinez",
      email: "isabella.m@example.com",
      phone: "+44 7700 900123",
      leadDetails: "Student at UoM • Guarantor ready",
      message: "When is the earliest move-in date available? I can deposit the holding fee today if selected.",
      timeAgo: "1 day ago",
      date: "16 May 2026",
    },
  ],
};

export default function PropertyLeadsModal({ open, onClose, propertyId, propertyTitle }: PropertyLeadsModalProps) {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!open || !propertyId) {
      setLeads([]);
      return;
    }

    setLoading(true);
    // Simulate loading delay for premium skeleton loader
    const timer = setTimeout(() => {
      const found = MOCK_PROPERTY_LEADS[propertyId] ?? [];
      setLeads(found);
      setLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [open, propertyId]);

  const handleContacted = (leadId: string, leadName: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    toast.success(`Marked ${leadName} as contacted!`, {
      description: "This lead has been processed and moved to archived.",
    });
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={600}
      centered
      destroyOnHidden
      title={
        <div className="pr-8">
          <h3 className="text-lg font-extrabold text-[#1a3c6e]">Property Leads & Enquiries</h3>
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mt-0.5">
            {propertyTitle || "Selected Listing"}
          </p>
        </div>
      }
      styles={{ body: { padding: "16px 24px 24px", maxHeight: "70vh", overflowY: "auto" } }}
    >
      {loading && (
        <div className="space-y-4 pt-2">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="border border-gray-150 rounded-xl p-4 bg-gray-50/50">
              <Skeleton active avatar paragraph={{ rows: 2 }} />
            </div>
          ))}
        </div>
      )}

      {!loading && leads.length === 0 && (
        <div className="text-center py-12 px-4">
          <div className="w-16 h-16 bg-gray-50 text-gray-300 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
            <UserOutlined className="text-2xl" />
          </div>
          <h4 className="text-base font-bold text-gray-800">No leads at the moment</h4>
          <p className="text-xs text-gray-400 mt-1 max-w-[280px] mx-auto">
            There are currently no active enquiries for this property listing.
          </p>
        </div>
      )}

      {!loading && leads.length > 0 && (
        <div className="space-y-4 pt-2">
          <div className="flex items-center justify-between text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">
            <span>Enquiry List</span>
            <span className="bg-blue-50 text-[#1a3c6e] border border-blue-100 px-2.5 py-0.5 rounded-full text-[10px]">
              {leads.length} Active Leads
            </span>
          </div>

          {leads.map((lead) => (
            <div 
              key={lead.id} 
              className="border border-gray-200 hover:border-[#1a3c6e]/40 transition-all rounded-xl p-5 bg-white shadow-sm hover:shadow-md flex flex-col gap-4 relative group"
            >
              {/* Lead Header */}
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#1a3c6e]/10 text-[#1a3c6e] rounded-xl flex items-center justify-center font-bold text-sm shrink-0">
                    {lead.name.split(" ").map(n => n[0]).join("")}
                  </div>
                  <div>
                    <h4 className="text-[15px] font-bold text-gray-900 leading-tight">{lead.name}</h4>
                    <p className="text-[11px] font-bold text-[#14b8a6] mt-0.5 uppercase tracking-wide">
                      {lead.leadDetails}
                    </p>
                  </div>
                </div>
                
                <span className="text-[11px] text-gray-400 font-semibold flex items-center gap-1">
                  <CalendarOutlined />
                  {lead.timeAgo}
                </span>
              </div>

              {/* Message */}
              <div className="bg-gray-50/70 border border-gray-100/50 rounded-xl p-3.5 text-sm text-gray-600 leading-relaxed italic">
                "{lead.message}"
              </div>

              {/* Contact Actions */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                <div className="flex items-center gap-2">
                  <Button 
                    size="small" 
                    icon={<PhoneOutlined />} 
                    className="!rounded-lg hover:!text-[#1a3c6e] hover:!border-[#1a3c6e]"
                    onClick={() => window.open(`tel:${lead.phone}`, "_self")}
                  >
                    Call
                  </Button>
                  <Button 
                    size="small" 
                    icon={<MailOutlined />} 
                    className="!rounded-lg hover:!text-[#1a3c6e] hover:!border-[#1a3c6e]"
                    onClick={() => window.open(`mailto:${lead.email}`, "_self")}
                  >
                    Email
                  </Button>
                </div>

                <Button
                  size="small"
                  type="primary"
                  icon={<CheckCircleOutlined />}
                  onClick={() => handleContacted(lead.id, lead.name)}
                  className="!bg-teal-600 hover:!bg-teal-700 !border-teal-600 !rounded-lg text-xs"
                >
                  Mark Contacted
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </Modal>
  );
}
