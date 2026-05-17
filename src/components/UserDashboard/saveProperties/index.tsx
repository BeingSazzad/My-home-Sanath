import PropertyCard from '@/components/web-pages/HomePage/PropertyCard';
import React from 'react'

const SaveProperties = () => {
    const properties = [
        {
            id: "1",
            images: ["/cardImg.png", "/cardImg.png", "/cardImg.png"],
            price: 875000,
            featured: true,
            title: "4 bed House",
            address: "42 Morning Lane, London",
            agentLogo: "/images/customer.png",
            addedOn: "01/03/2026",
        },
        // Add more properties as needed (duplicate for demo)
    ].flatMap((p) => Array(6).fill(p)); // Creates 6 identical cards for demo

    return (
        <div className="max-w-7xl mx-auto">
            <div className="mb-6 flex justify-between items-center">
                <p className="text-gray-500 font-medium">{properties.length} properties found matching your criteria</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {properties.map((property, index) => (
                    <PropertyCard key={index} property={property} />
                ))}
            </div>
        </div>
    )
}

export default SaveProperties