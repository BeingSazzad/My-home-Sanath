import Image from "next/image";
import Link from "next/link";

export default function AppBanner() {
    return (
        <section className="bg-[#F9FAFB] py-20 px-4 overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="flex flex-col lg:flex-row items-center gap-12">

                    {/* Left Content */}
                    <div className="flex-1 text-center lg:text-left order-2 lg:order-1">
                        <h2 className="text-3xl md:text-4xl font-extrabold text-[#1a3c6e] leading-snug mb-4">
                            Buy, Rent, or Explore Properties Anytime
                        </h2>
                        <p className="text-gray-500 text-base leading-relaxed mb-8 max-w-md mx-auto lg:mx-0">
                            Use the MyHome app to search properties, view high quality photos,
                            check locations, and contact agents directly. Everything you need
                            to find the right property is in one simple platform.
                        </p>

                        {/* Store Buttons */}
                        <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
                            {/* Google Play */}
                            <Link href="#" className="block hover:opacity-80 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg" alt="Get it on Google Play" className="h-[44px] w-auto object-contain" />
                            </Link>

                            {/* App Store */}
                            <Link href="#" className="block hover:opacity-80 transition-opacity">
                                <img src="https://upload.wikimedia.org/wikipedia/commons/3/3c/Download_on_the_App_Store_Badge.svg" alt="Download on App Store" className="h-[44px] w-auto object-contain" />
                            </Link>
                        </div>
                    </div>

                    {/* Right — Real Phone Mockup Images */}
                    <div className="flex-1 flex justify-center lg:justify-end order-1 lg:order-2">
                        <div className="relative w-[320px] h-[380px] md:w-[460px] md:h-[480px] ">

                            {/* Back phone (left, rotated left) */}
                            <div className="absolute left-10 md:left-20 bottom-0 w-[160px] md:w-[220px] -rotate-20 z-10 drop-shadow-2xl">
                                <Image
                                    src="/mobile1.png"
                                    alt="MyHome App - Splash Screen"
                                    width={220}
                                    height={440}
                                    className="w-full h-auto object-contain z-20"
                                    priority
                                />
                            </div>

                            {/* Front phone (right, rotated right) */}
                            <div className="absolute right-10 md:right-0 bottom-0 w-[160px] md:w-[220px] rotate-6 drop-shadow-2xl">
                                <Image
                                    src="/mobile2.png"
                                    alt="MyHome App - Home Screen"
                                    width={220}
                                    height={440}
                                    className="w-full h-auto object-contain"
                                    priority
                                />
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}