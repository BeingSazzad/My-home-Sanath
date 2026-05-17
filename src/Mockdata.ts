import { Listing, ListingDetail } from "@/types/listing";
import { Enquiry } from "@/types/enquiry";

// ─── Listings ─────────────────────────────────────────────────────────────────

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
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-44331-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-bright-suburban-house-exterior-with-lush-greenery-47864-large.mp4"
    ],
    virtualTourLink: "https://my.matterport.com/show/?m=JGPnGBy2snS",
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
    videos: [
      "https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-44331-large.mp4",
      "https://assets.mixkit.co/videos/preview/mixkit-bright-suburban-house-exterior-with-lush-greenery-47864-large.mp4"
    ],
    virtualTourLink: "https://my.matterport.com/show/?m=JGPnGBy2snS",
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
    videos: ["https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-44331-large.mp4"],
    virtualTourLink: "https://my.matterport.com/show/?m=JGPnGBy2snS",
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
    status: "closed",
    listingType: "to-rent",
    images: [
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=800&h=500&fit=crop",
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&h=500&fit=crop",
    ],
    videos: ["https://assets.mixkit.co/videos/preview/mixkit-modern-apartment-with-large-windows-and-city-views-44331-large.mp4"],
    virtualTourLink: "https://my.matterport.com/show/?m=JGPnGBy2snS",
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

// ─── Enquiries (User Dashboard — sent by user) ────────────────────────────────

export const MOCK_USER_ENQUIRIES: Enquiry[] = [
  {
    id: "1",
    name: "Sarah Mitchell",
    initials: "SM",
    email: "sarah@knightfrank.co.uk",
    phone: "+44 20 7861 1111",
    propertyTitle: "Stunning Victorian Townhouse",
    propertyId: "1",
    property: "Stunning Victorian Townhouse",
    leadDetails: "",
    price: "£1.3m",
    address: "42 Kensington Park Road",
    image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?w=400&q=80",
    sentTo: "Knight Frank",
    message: "I would like to arrange a viewing for this weekend if possible. Thanks!",
    timeAgo: "2 days ago",
    sentOn: "3/17/2026",
    agent: {
      name: "Sarah Mitchell",
      company: "Knight Frank",
      phone: "+44 20 7861 1111",
      email: "sarah@knightfrank.co.uk",
      avatar: "S",
    },
  },
];

// ─── Leads (Agent Dashboard — received enquiries) ─────────────────────────────

export const MOCK_AGENT_LEADS = [
  {
    id: "1",
    name: "Tom Walker",
    initials: "TW",
    email: "tom.w@example.com",
    phone: "+44 7700 900111",
    propertyId: "1",
    property: "Stunning Victorian Townhouse",
    price: "£1,300,000",
    address: "42 Kensington Park Road, Notting Hill, W11",
    image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=120&h=80&fit=crop",
    leadDetails: "First-time buyer • No property to sell",
    message: "Hi, I saw Stunning Victorian Townhouse and would like to arrange a viewing for this weekend if possible.",
    timeAgo: "2 hours ago",
  },
  {
    id: "2",
    name: "Alice Johnson",
    initials: "AJ",
    email: "alice.j@example.com",
    phone: "+44 7700 900112",
    propertyId: "2",
    property: "Modern Riverside Penthouse",
    price: "£2,100,000",
    address: "1 Nine Elms Lane, Vauxhall, SW8",
    image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=120&h=80&fit=crop",
    leadDetails: "Cash buyer • Property sold STC",
    message: "I am very interested in the Modern Riverside Penthouse. Could we schedule a viewing early next week?",
    timeAgo: "4 hours ago",
  },
  {
    id: "3",
    name: "Mark King",
    initials: "MK",
    email: "mark.k@example.com",
    phone: "+44 7700 900113",
    propertyId: "3",
    property: "Charming Cotswolds Cottage",
    price: "£675,000",
    address: "8 Church Lane, Bourton-on-the-Water",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=120&h=80&fit=crop",
    leadDetails: "Mortgage in principle • No property",
    message: "The Charming Cotswolds Cottage looks perfect for us. Is there any flexibility on the asking price?",
    timeAgo: "6 hours ago",
  },
];

// ─── Form / Filter Options ─────────────────────────────────────────────────────

export const FEATURES_LIST = [
  "Garden", "Parking", "New Build",
  "Chain Free", "Swimming Pool", "Gym",
  "Balcony", "Terrace", "Fitted Kitchen",
  "Underfloor Heating", "Solar Panels", "Alarm System",
];

export const PROPERTY_TYPES = ["Detached", "Semi-Detached", "Terraced", "Flat", "Bungalow", "Cottage", "Penthouse"];
export const TENURE_OPTIONS = ["Freehold", "Leasehold", "Shared Ownership"];
export const COUNCIL_TAX_BANDS = ["A", "B", "C", "D", "E", "F", "G", "H"];
export const EPC_RATINGS = ["A", "B", "C", "D", "E", "F", "G"];
