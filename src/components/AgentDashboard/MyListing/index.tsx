"use client";

import { useState, useMemo } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Listing } from "@/types/listing";
import { MOCK_LISTINGS } from "@/Mockdata";
import ListingsFilters from "./ListingsFilters";
import ListingsTable from "./ListingsTable";
import ListingModal from "./add-listing/AddListingModal";
import ListingDetailModal from "./ListDetails/ListingDetailModal";


export default function MyListingsPage() {
  const [listings, setListings] = useState<Listing[]>(MOCK_LISTINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Add / Edit modal
  const [listingModalOpen, setListingModalOpen] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // Detail modal
  const [detailOpen, setDetailOpen] = useState(false);
  const [detailId, setDetailId] = useState<string | null>(null);

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [listingToDelete, setListingToDelete] = useState<string | null>(null);

  const filtered = useMemo(() => {
    return listings.filter((l) => {
      const matchSearch =
        !search ||
        l.title.toLowerCase().includes(search.toLowerCase()) ||
        l.address.toLowerCase().includes(search.toLowerCase());
      const matchStatus = statusFilter === "all" || l.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [listings, search, statusFilter]);

  const handleDeleteRequest = (id: string) => {
    setListingToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (listingToDelete) {
      setListings((prev) => prev.filter((l) => l.id !== listingToDelete));
      toast.success("Listing deleted successfully", {
        description: "The property listing has been removed from the platform."
      });
    }
    setDeleteModalOpen(false);
    setListingToDelete(null);
  };

  const handleDetails = (id: string) => {
    setDetailId(id);
    setDetailOpen(true);
  };

  const handleEdit = (id: string) => {
    setEditId(id);
    setListingModalOpen(true);
  };

  const handleStatusChange = (id: string, newStatus: Listing["status"]) => {
    setListings((prev) =>
      prev.map((listing) =>
        listing.id === id ? { ...listing, status: newStatus } : listing
      )
    );
    toast.success(`Status updated to ${newStatus.toUpperCase()}`, {
      description: "The property listing status has been updated successfully."
    });
  };

  const handleAddNew = () => {
    setEditId(null);
    setListingModalOpen(true);
  };

  const handleModalClose = () => {
    setListingModalOpen(false);
    setEditId(null);
  };

  const handleSuccess = () => {
    // In real app: refetch listings from API
    handleModalClose();
  };

  return (
    <>
      <div className="">
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-[#1a3c6e]">My Properties</h1>
            <p className="text-gray-500 mt-1">Manage and track all your property listings</p>
          </div>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            className="!bg-[#1a3c6e] !border-[#1a3c6e] !rounded-xl !h-11 shadow-lg shadow-[#1a3c6e]/20 hover:!scale-[1.02] active:!scale-95 transition-all font-bold"
          >
            Add Property
          </Button>
        </div>

        {/* Listings Table Card */}
        <div className="border border-gray-200 rounded-lg overflow-hidden shadow-sm">
          <ListingsFilters
            search={search}
            status={statusFilter}
            onSearchChange={setSearch}
            onStatusChange={setStatusFilter}
          />
          <ListingsTable
            listings={filtered}
            onDelete={handleDeleteRequest}
            onDetails={handleDetails}
            onEdit={handleEdit}
            onStatusChange={handleStatusChange}
          />
        </div>
      </div>

      {/* Add / Edit Listing Modal */}
      <ListingModal
        open={listingModalOpen}
        onClose={handleModalClose}
        onSuccess={handleSuccess}
        editId={editId}
      />

      {/* View Detail Modal */}
      <ListingDetailModal
        listingId={detailId}
        open={detailOpen}
        onClose={() => {
          setDetailOpen(false);
          setDetailId(null);
        }}
      />

      {/* Premium Delete Confirmation Modal */}
      <Modal
        open={deleteModalOpen}
        onCancel={() => setDeleteModalOpen(false)}
        footer={null}
        centered
        width={420}
        styles={{ body: { padding: "32px 24px" } }}
        className="premium-confirm-modal"
        closable={false}
      >
        <div className="text-center">
          <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm border border-red-100">
            <Trash2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Delete Listing?</h3>
          <p className="text-gray-500 mb-8 px-2 text-[15px] leading-relaxed">
            Are you sure you want to delete this listing? This action <span className="text-red-600 font-semibold">cannot be undone</span> and the property will be permanently removed.
          </p>
          <div className="flex gap-3">
            <Button 
              block 
              size="large" 
              onClick={() => setDeleteModalOpen(false)} 
              className="!h-12 !rounded-xl !font-semibold border-gray-200 text-gray-600 hover:!border-gray-300 hover:!text-gray-800 bg-gray-50/50"
            >
              Cancel
            </Button>
            <Button 
              block 
              size="large" 
              type="primary" 
              danger 
              onClick={handleConfirmDelete} 
              className="!h-12 !rounded-xl !font-bold !bg-red-500 !border-red-500 hover:!bg-red-600 shadow-lg shadow-red-100"
            >
              Yes, Delete
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

