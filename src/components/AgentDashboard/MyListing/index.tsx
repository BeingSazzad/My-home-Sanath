"use client";

import { useState, useMemo } from "react";
import { Button, Modal } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { Toaster, toast } from "sonner";
import { Trash2 } from "lucide-react";
import { Listing, ListingDetail } from "@/types/listing";
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold mb-6" style={{ color: "#1a3c6e" }}>My Properties</h1>
          <Button
            type="primary"
            size="large"
            icon={<PlusOutlined />}
            onClick={handleAddNew}
            style={{ backgroundColor: "#1a3c6e", borderColor: "#1a3c6e" }}
            className="!rounded"
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

export const MOCK_LISTINGS: Listing[] = [
  {
    id: "1",
    title: "Stunning Victorian Townhouse",
    address: "42 Kensington Park Road",
    price: "£1.3m",
    views: 1245,
    status: "sold",
    listingType: "for-sale",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&h=80&fit=crop",
  },
  {
    id: "2",
    title: "Modern Riverside Penthouse",
    address: "1 Nine Elms Lane",
    price: "£2.1m",
    views: 912,
    status: "active",
    listingType: "for-sale",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=80&fit=crop",
  },
  {
    id: "3",
    title: "Charming Cotswolds Cottage",
    address: "8 Church Lane, Bourton-on-the-Water",
    price: "£675k",
    views: 675,
    status: "draft",
    listingType: "for-sale",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=80&fit=crop",
  },
  {
    id: "4",
    title: "Luxury Manchester Apartment",
    address: "15 Deansgate Square",
    price: "£2k",
    views: 389,
    status: "active",
    listingType: "to-rent",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=80&fit=crop",
  },
];


export const MOCK_LISTING_DETAILS: ListingDetail[] = [
  {
    id: "1",
    title: "Stunning Victorian Townhouse",
    address: "42 Kensington Park Road, Notting Hill, London W11 2ND",
    price: "£1,300,000",
    views: 1245,
    status: "active",
    listingType: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&h=500&fit=crop",
    ],
    videos: ["https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-44331-large.mp4"],
    floorPlans: ["https://images.unsplash.com/photo-1574362848149-11496d93a7c7?w=800&h=1000&fit=crop"],
    brochures: ["/sample-brochure.pdf"],
    propertyType: "Terraced",
    beds: 5,
    baths: 3,
    sqFt: 2850,
    tenure: "Freehold",
    councilTaxBand: "G",
    epc: "C",
    features: ["Garden", "Parking", "Chain Free", "Fitted Kitchen", "Alarm System", "Underfloor Heating"],
    description:
      "A truly spectacular Victorian townhouse set over five floors in the heart of Notting Hill. This exceptional home retains many original period features including ornate cornicing, sash windows, and original fireplaces, whilst benefiting from a sensitive contemporary refurbishment throughout.\n\nThe property offers spacious and versatile accommodation comprising a grand reception room, bespoke kitchen/dining room opening onto a beautifully landscaped rear garden, five double bedrooms, and three elegant bathrooms. The lower ground floor offers additional flexible living space.\n\nSituated moments from the world-famous Portobello Road and the vibrant shops, restaurants and cafés of Notting Hill Gate, this is a rare opportunity to acquire a magnificent family home in one of London's most sought-after neighbourhoods.",
    listedDate: "12 Mar 2025",
    agent: "Sarah Jenkins",
  },
  {
    id: "2",
    title: "Modern Riverside Penthouse",
    address: "1 Nine Elms Lane, Vauxhall, London SW8 5NQ",
    price: "£2,100,000",
    views: 912,
    status: "active",
    listingType: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1512918728672-1c87f3e5e7c4?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=500&fit=crop",
    ],
    propertyType: "Penthouse",
    beds: 3,
    baths: 2,
    sqFt: 1820,
    tenure: "Leasehold",
    councilTaxBand: "H",
    epc: "B",
    features: ["Balcony", "Terrace", "Gym", "Swimming Pool", "Parking", "Alarm System", "Fitted Kitchen"],
    description:
      "An outstanding penthouse apartment occupying the entire top floor of this award-winning riverside development, offering panoramic views across the Thames towards the City of London and beyond.\n\nThe interior has been finished to an exceptional standard with bespoke joinery, underfloor heating throughout, Miele appliances, and floor-to-ceiling glazing that floods every room with natural light. The wraparound terrace of over 600 sq ft is ideal for entertaining.\n\nResidents benefit from 24-hour concierge, a state-of-the-art gym, private cinema, and two allocated parking spaces. Moments from Vauxhall station providing swift access to the West End and City.",
    listedDate: "28 Jan 2025",
    agent: "Sarah Jenkins",
  },
  {
    id: "3",
    title: "Charming Cotswolds Cottage",
    address: "8 Church Lane, Bourton-on-the-Water, Gloucestershire GL54 2AP",
    price: "£675,000",
    views: 675,
    status: "draft",
    listingType: "for-sale",
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1523217582562-09d0def993a6?w=800&h=500&fit=crop",
    ],
    propertyType: "Cottage",
    beds: 3,
    baths: 2,
    sqFt: 1340,
    tenure: "Freehold",
    councilTaxBand: "D",
    epc: "E",
    features: ["Garden", "Chain Free", "Parking", "Fitted Kitchen", "Solar Panels"],
    description:
      "A delightful Cotswold stone cottage nestled in the picturesque village of Bourton-on-the-Water, often described as the 'Venice of the Cotswolds' due to its charming low bridges crossing the River Windrush.\n\nThis beautifully presented property blends original character features — exposed stone walls, beamed ceilings, and an inglenook fireplace — with thoughtfully updated modern comforts. The kitchen has been fully refitted with hand-painted cabinetry and granite worktops. French doors from the sitting room open onto a south-facing cottage garden bursting with colour.\n\nAn ideal retreat or permanent residence, within easy reach of Cheltenham and with excellent transport links to Oxford and London Paddington.",
    listedDate: "5 Apr 2025",
    agent: "Sarah Jenkins",
  },
  {
    id: "4",
    title: "Luxury Manchester Apartment",
    address: "15 Deansgate Square, Manchester M3 4LZ",
    price: "£2,000 pcm",
    views: 389,
    status: "let agreed",
    listingType: "to-rent",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=500&fit=crop",
    ],
    propertyType: "Flat",
    beds: 2,
    baths: 2,
    sqFt: 980,
    tenure: "Leasehold",
    councilTaxBand: "E",
    epc: "B",
    features: ["Balcony", "Gym", "Parking", "Fitted Kitchen", "Alarm System", "Underfloor Heating"],
    description:
      "A stunning two-bedroom, two-bathroom apartment situated within the iconic Deansgate Square development — one of Manchester's most prestigious residential addresses. Located on the 28th floor, the apartment enjoys breathtaking views across the city skyline and beyond.\n\nThe open-plan living and dining area is finished to an exacting standard with herringbone timber flooring, bespoke kitchen with integrated Siemens appliances, and a large south-facing balcony perfect for outdoor entertaining. Both bedrooms feature fitted wardrobes, with the principal bedroom benefitting from a luxurious en-suite bathroom.\n\nBuilding amenities include 24-hour concierge, a residents' gym, and secure underground parking. Minutes from Deansgate and Castlefield with superb transport links across Greater Manchester.",
    listedDate: "19 Feb 2025",
    agent: "Sarah Jenkins",
  },
];