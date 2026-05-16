export type ListingStatus = "active" | "draft" | "closed" | "let agreed" | "sold";

export interface Listing {
    id: string;
    title: string;
    address: string;
    price: string;
    views: number;
    status: ListingStatus;
    image: string;
}

export interface ListingFormData {
    // Step 1
    listingType: "for-sale" | "to-rent";
    title: string;
    price: string;
    postcode: string;
    country: string;
    city: string;
    streetAddress: string;
    // Step 2
    photos: File[];
    videos: File[];
    floorPlan: File[];
    // Step 3
    propertyType: string;
    beds: string;
    baths: string;
    sqFt: string;
    tenure: string;
    councilTaxBand: string;
    epc: string;
    // Step 4
    features: string[];
    description: string;
    // Step 5
    publishStatus: string;
}

export interface ListingDetail {
    id: string;
    title: string;
    address: string;
    price: string;
    views: number;
    status: ListingStatus;
    images: string[];
    videos?: string[];
    floorPlans?: string[];
    listingType: "for-sale" | "to-rent";
    // Step 3
    propertyType: string;
    beds: number;
    baths: number;
    sqFt: number;
    tenure: string;
    councilTaxBand: string;
    epc: string;
    // Step 4
    features: string[];
    description: string;
    // Meta
    listedDate: string;
    agent: string;
}
