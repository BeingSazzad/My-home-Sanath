"use client";

import { useEffect, useState } from "react";
import { Modal, Button, Progress, Skeleton } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { ListingDetail, ListingFormData } from "@/types/listing";

import Step1Basics from "./Step1Basics";
import Step2Media from "./Step2Media";
import Step3Details from "./Step3Details";
import Step4Features from "./Step4Features";
import Step5Review from "./Step5Review";
import { myFetch } from "@/helpers/myFetch";

const TOTAL_STEPS = 5;

const DEFAULT_FORM: any = {
  listingType: "for-sale",
  title: "",
  price: "",
  postcode: "",
  country: "United Kingdom",
  city: "",
  streetAddress: "",
  photos: [],
  videos: [],
  floorPlan: [],
  brochures: [],
  virtualTourLink: "",
  existingPhotos: [],
  existingVideos: [],
  existingFloorPlan: [],
  existingBrochures: [],
  propertyType: "",
  beds: "",
  baths: "",
  sqFt: "",
  tenure: "",
  councilTaxBand: "",
  epc: "",
  features: [],
  description: "",
  publishStatus: "Active",
};

/** Maps a ListingDetail (from API) → ListingFormData (for the form) */
function detailToFormData(detail: ListingDetail): any {
  // Parse address into parts (best-effort)
  const parts = detail.address.split(",").map((s) => s.trim());
  const streetAddress = parts[0] ?? "";
  const city = parts[1] ?? "";
  const postcodePart = parts[2] ?? "";

  return {
    listingType: detail.listingType,
    title: detail.title,
    price: detail.price.replace(/[^0-9.]/g, ""),
    postcode: postcodePart,
    country: "United Kingdom",
    city,
    streetAddress,
    // new files — empty; server images go into existing*
    photos: [],
    videos: [],
    floorPlan: [],
    brochures: [],
    virtualTourLink: detail.virtualTourLink ?? "",
    existingPhotos: detail.images ?? [],
    existingVideos: detail.videos ?? [],
    existingFloorPlan: detail.floorPlans ?? [],
    existingBrochures: detail.brochures ?? [],
    propertyType: detail.propertyType,
    beds: String(detail.beds),
    baths: String(detail.baths),
    sqFt: String(detail.sqFt),
    tenure: detail.tenure,
    councilTaxBand: detail.councilTaxBand,
    epc: detail.epc,
    features: detail.features ?? [],
    description: detail.description ?? "",
    publishStatus: detail.status === "draft" ? "Draft" : "Active",
  };
}

export interface ListingModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
  /** Pass a listingId to enter Edit mode; omit for Add mode */
  editId?: string | null;
}

export default function ListingModal({ open, onClose, onSuccess, editId }: ListingModalProps) {
  const isEditMode = !!editId;

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<ListingFormData>(DEFAULT_FORM);
  const [loadingDetail, setLoadingDetail] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ── Fetch existing data when opening in edit mode ──────────────────────────
  useEffect(() => {
    if (!open) return;

    if (!isEditMode) {
      setFormData(DEFAULT_FORM);
      setStep(1);
      return;
    }

    const fetchExisting = async () => {
      setLoadingDetail(true);
      try {
        // First try the API
        const response = await myFetch<ListingDetail>(`/api/listings/${editId}`, { method: "GET" });

        if (response?.success && response.data) {
          setFormData(detailToFormData(response.data));
          setStep(1);
        } else {
          // FALLBACK: If API fails, try to find in mock data
          // Note: In a real production app, you'd only rely on the API.
          // This is for demo/development stability.
          const { MOCK_LISTING_DETAILS } = await import("@/Mockdata");
          const mock = MOCK_LISTING_DETAILS.find(m => m.id === editId);
          
          if (mock) {
            setFormData(detailToFormData(mock));
            setStep(1);
          } else {
            toast.error("Could not find listing details", { id: "listing-edit-fetch" });
            onClose();
          }
        }
      } catch (err) {
        console.error("ListingModal fetchExisting error:", err);
        // Try mock fallback even on catch
        const { MOCK_LISTING_DETAILS } = await import("@/Mockdata");
        const mock = MOCK_LISTING_DETAILS.find(m => m.id === editId);
        if (mock) {
          setFormData(detailToFormData(mock));
          setStep(1);
        } else {
          toast.error("Unexpected error occurred", { id: "listing-edit-fetch" });
          onClose();
        }
      } finally {
        setLoadingDetail(false);
      }
    };

    fetchExisting();
  }, [open, editId]);

  const updateForm = (updates: Partial<ListingFormData>) => {
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  const handleClose = () => {
    setStep(1);
    setFormData(DEFAULT_FORM);
    onClose();
  };

  const handleBack = () => {
    if (step > 1) setStep((s) => s - 1);
    else handleClose();
  };

  const handleContinue = () => {
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };

  // ── Submit handlers ────────────────────────────────────────────────────────
  const handleSaveDraft = async () => {
    setSubmitting(true);
    try {
      // Simulate API call for saving draft
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success("Draft saved successfully!");
      handleClose();
      onSuccess();
    } catch (err) {
      console.error("ListingModal saveDraft error:", err);
      toast.error("Unexpected error occurred", { id: "listing-draft" });
    } finally {
      setSubmitting(false);
    }
  };

  const handlePublish = async () => {
    setSubmitting(true);
    try {
      // Simulate API call for publishing/updating
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(isEditMode ? "Listing updated!" : "Property published!");
      handleClose();
      onSuccess();
    } catch (err) {
      console.error("ListingModal publish error:", err);
      toast.error("Unexpected error occurred", { id: "listing-publish" });
    } finally {
      setSubmitting(false);
    }
  };

  // ── Render ─────────────────────────────────────────────────────────────────
  const progressPercent = Math.round((step / TOTAL_STEPS) * 100);

  const renderStep = () => {
    if (loadingDetail) {
      return (
        <div className="space-y-4 py-4">
          <Skeleton active paragraph={{ rows: 3 }} />
          <Skeleton active paragraph={{ rows: 3 }} />
        </div>
      );
    }
    switch (step) {
      case 1: return <Step1Basics data={formData} onChange={updateForm} />;
      case 2: return <Step2Media data={formData} onChange={updateForm} />;
      case 3: return <Step3Details data={formData} onChange={updateForm} />;
      case 4: return <Step4Features data={formData} onChange={updateForm} />;
      case 5: return <Step5Review data={formData} onChange={updateForm} />;
      default: return null;
    }
  };

  const renderFooter = () => {
    if (loadingDetail) return null;

    if (step === TOTAL_STEPS) {
      return (
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          <Button size="large" onClick={handleBack} disabled={submitting}>Back</Button>
          <div className="flex gap-2">
            <Button size="large" onClick={handleSaveDraft} loading={submitting}>
              Save Draft
            </Button>
            <Button
              size="large"
              type="primary"
              onClick={handlePublish}
              loading={submitting}
              style={{ backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
            >
              {isEditMode ? "Update Listing" : "Publish Property"}
            </Button>
          </div>
        </div>
      );
    }

    return (
      <div className="flex justify-between items-center pt-4 border-t border-gray-100">
        {step > 1
          ? <Button size="large" onClick={handleBack} disabled={submitting}>Back</Button>
          : <div />
        }
        <Button
          size="large"
          type="primary"
          onClick={handleContinue}
          disabled={loadingDetail}
          style={{ backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
        >
          Continue
        </Button>
      </div>
    );
  };

  return (
    <Modal
      open={open}
      onCancel={handleClose}
      footer={null}
      width={740}
      centered
      destroyOnHidden
      styles={{ body: { padding: "28px 32px 0" } }}
    >
      {/* Header */}
      <div className="mb-4">
        <button
          onClick={handleClose}
          className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-700 mb-3 transition-colors"
        >
          <ArrowLeftOutlined className="text-xs" />
          Back to Listings
        </button>

        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              {isEditMode ? "Edit Property" : "Add New Property"}
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {loadingDetail ? "Loading…" : `Step ${step} of ${TOTAL_STEPS}`}
            </p>
          </div>
          {isEditMode && (
            <span className="text-xs bg-amber-50 border border-amber-200 text-amber-600 px-3 py-1 rounded-full font-medium">
              Editing
            </span>
          )}
        </div>

        <div className="mt-3 mb-1">
          <Progress
            percent={loadingDetail ? 0 : progressPercent}
            showInfo={false}
            strokeColor="#1a3c6e"
            trailColor="#e5e7eb"
            size={6}
          />
        </div>
      </div>

      {/* Step Content */}
      <div className="min-h-[320px] pb-4">{renderStep()}</div>

      {/* Footer */}
      <div className="pb-4">{renderFooter()}</div>
    </Modal>
  );
}