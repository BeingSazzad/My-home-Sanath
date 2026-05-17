export interface Agent {
    name: string;
    company: string;
    phone: string;
    email: string;
    avatar: string;
}

export interface Enquiry {
    id: string;
    name: string;
    initials: string;
    email: string;
    phone: string;
    propertyTitle: string;
    propertyId: string;
    property: string;
    leadDetails: string;
    price: string;
    address: string;
    image: string;
    sentTo: string;
    message: string;
    timeAgo: string;
    sentOn: string;
    agent: Agent;
    status?: "new" | "completed";
}

export interface AgencyProfile {
    agencyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    website: string;
    companyRegNumber: string;
    addressLine1: string;
    city: string;
    postcode: string;
    description: string;
}
