"use client";


interface Props {
  properties: any[];
}

export default function PropertyMap({ properties }: Props) {
  // Centered on London (you can adjust q= parameter for better focus)
  // For multiple properties, the best free way is to use a custom My Maps link (see note below)
  const mapEmbedUrl =
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d158857.728!2d-0.2416815!3d51.5285262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47d8a00baf21de75%3A0x52963a5addd52a99!2sLondon%2C%20UK!5e0!3m2!1sen!2sbd!4v1744800000000";

  return (
    <div className="relative w-full rounded-2xl overflow-hidden border border-gray-200 shadow-sm bg-white">
      {/* Interactive Google Maps */}
      <div className="w-full h-[700px]">
        <iframe
          src={mapEmbedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Properties Map in London"
        />
      </div>

      {/* Property Info Popup (floating over the map) */}
      <div className="absolute bottom-6 left-6 bg-white rounded-xl shadow-2xl p-4 w-80 z-20 hidden lg:block">
        <div className="flex gap-3">
          <div className="w-24 h-20 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
            <img
              src="/cardImg.png"
              alt="Property"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <span className="font-extrabold text-xl text-[#14b8a6]">£875,000</span>
              <span className="text-[10px] bg-[#1a3c6e] text-white px-2 py-0.5 rounded font-bold uppercase tracking-wider">FEATURED</span>
            </div>
            <p className="font-bold text-gray-900 mt-1">4 bed House</p>
            <p className="text-sm text-gray-600 mt-0.5">42 Morning Lane, London</p>
            <p className="text-xs text-gray-500 mt-2 font-medium">Click on map pins for details</p>
          </div>
        </div>
      </div>

      {/* Note for better experience */}
      <div className="absolute bottom-4 right-4 bg-white/90 text-xs text-gray-500 px-3 py-1 rounded">
        Interactive Google Map • Zoom &amp; pan supported
      </div>
    </div>
  );
}