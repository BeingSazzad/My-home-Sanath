import React from 'react'
import HeroSection from './HeroSecton'
import PropertiesNearYou from './PropertiesNearYou'
import MarketplaceSection from './MarketplaceSection'
import PopularLocations from './PopularLocations'
import WhyMyHome from './WhyMyHome'
import Testimonials from './Testimonials'
import AppBanner from './AppBanner'

const HomePage = () => {
    return (
        <div className='w-full'>
            <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
                <HeroSection />
                <PropertiesNearYou />
                <MarketplaceSection />
                <PopularLocations />

                <WhyMyHome />
                <Testimonials />
            </div>
            
            <AppBanner />
        </div>
    )
}

export default HomePage