"use client";

import React, { useState } from 'react';
import { Drawer, Slider, Select, Checkbox } from 'antd';
import { 
  X,
  Home,
  Building2,
  Warehouse,
  MapPin,
  Palmtree,
  Car,
  BedDouble,
  PoundSterling,
  Search
} from 'lucide-react';

interface FilterModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const FilterModal = ({ isOpen, onClose }: FilterModalProps) => {
  const [addedDate, setAddedDate] = useState<string>("Any");
  const [radius, setRadius] = useState<number>(5);
  const [activeType, setActiveType] = useState<string>("Detached");
  const [beds, setBeds] = useState<string>("2");
  const [baths, setBaths] = useState<string>("1");

  const propertyTypes = [
    { id: 'Detached', icon: <Home size={22} />, desc: 'Stand-alone' },
    { id: 'Semi', icon: <Building2 size={22} />, desc: 'Semi-detached' },
    { id: 'Terraced', icon: <Warehouse size={22} />, desc: 'Row housing' },
    { id: 'Bungalow', icon: <Palmtree size={22} />, desc: 'Single story' },
    { id: 'Flat', icon: <Building2 size={22} />, desc: 'Apartment' },
    { id: 'Park Home', icon: <Warehouse size={22} />, desc: 'Mobile/Modular' }
  ];

  const dateOptions = [
    { label: 'Any', value: 'Any' },
    { label: 'Last 24h', value: '24h' },
    { label: '3 days', value: '3d' },
    { label: '7 days', value: '7d' },
    { label: '14 days', value: '14d' }
  ];

  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      placement="right"
      width={500}
      closable={false}
      styles={{
        body: { padding: 0 },
        mask: { backdropFilter: 'blur(4px)', backgroundColor: 'rgba(26, 60, 110, 0.2)' }
      }}
      className="premium-filter-drawer"
    >
      {/* Drawer Content */}
      <div className="flex flex-col h-full bg-white">
        
        {/* Sticky Header */}
        <div className="bg-[#1a3c6e] p-6 text-white sticky top-0 z-10">
          <div className="flex justify-between items-center mb-1">
            <h3 className="text-xl font-semibold tracking-tight">Search Filters</h3>
            <button 
                onClick={onClose}
                className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
            >
                <X size={18} className="text-white" />
            </button>
          </div>
          <p className="text-white/60 text-[13px]">Fine-tune your property matches</p>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8 custom-scrollbar">
          
          {/* Section: Type */}
          <section>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-6 rounded-lg bg-[#1a3c6e]/5 flex items-center justify-center text-[#1a3c6e]">
                  <Home size={14} />
              </div>
              <h4 className="text-sm font-semibold text-gray-900">Property Style</h4>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {propertyTypes.map((type) => (
                <button 
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={`flex flex-col items-start p-4 border-2 rounded-xl transition-all gap-1.5 text-left relative group ${
                    activeType === type.id 
                      ? 'border-[#1a3c6e] bg-[#1a3c6e] text-white shadow-lg shadow-[#1a3c6e]/10' 
                      : 'border-gray-50 bg-gray-50/50 hover:border-gray-200'
                  }`}
                >
                  <div className={`${activeType === type.id ? 'text-white' : 'text-[#1a3c6e]'}`}>
                      {type.icon}
                  </div>
                  <div>
                      <div className={`text-sm font-semibold ${activeType === type.id ? 'text-white' : 'text-gray-900'}`}>{type.id}</div>
                      <div className={`text-[11px] ${activeType === type.id ? 'text-white/70' : 'text-gray-500'}`}>{type.desc}</div>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Section: Financials */}
          <section>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#1a3c6e]/5 flex items-center justify-center text-[#1a3c6e]">
                      <PoundSterling size={14} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Budget</h4>
              </div>
              <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500 ml-1">Min Price</label>
                      <Select className="w-full h-11" defaultValue="0" options={[
                          { value: '0', label: 'No Min' },
                          { value: '50000', label: '£50k' },
                          { value: '100000', label: '£100k' },
                          { value: '150000', label: '£150k' },
                          { value: '200000', label: '£200k' },
                          { value: '250000', label: '£250k' },
                          { value: '300000', label: '£300k' },
                          { value: '400000', label: '£400k' },
                          { value: '500000', label: '£500k' },
                          { value: '750000', label: '£750k' },
                          { value: '1000000', label: '£1M' },
                          { value: '1500000', label: '£1.5M' },
                          { value: '2000000', label: '£2M' },
                          { value: '5000000', label: '£5M' },
                      ]} />
                  </div>
                  <div className="space-y-1.5">
                      <label className="text-xs font-medium text-gray-500 ml-1">Max Price</label>
                      <Select className="w-full h-11" defaultValue="any" options={[
                          { value: 'any', label: 'No Max' },
                          { value: '50000', label: '£50k' },
                          { value: '100000', label: '£100k' },
                          { value: '150000', label: '£150k' },
                          { value: '200000', label: '£200k' },
                          { value: '250000', label: '£250k' },
                          { value: '300000', label: '£300k' },
                          { value: '400000', label: '£400k' },
                          { value: '500000', label: '£500k' },
                          { value: '750000', label: '£750k' },
                          { value: '1000000', label: '£1M' },
                          { value: '1500000', label: '£1.5M' },
                          { value: '2000000', label: '£2M' },
                          { value: '5000000', label: '£5M' },
                      ]} />
                  </div>
              </div>
          </section>

          {/* Section: Radius */}
          <section>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#1a3c6e]/5 flex items-center justify-center text-[#1a3c6e]">
                      <MapPin size={14} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Search Radius</h4>
              </div>
              <div className="px-2 pt-2">
                  <Slider 
                      min={0} 
                      max={20} 
                      value={radius} 
                      onChange={setRadius}
                      marks={{
                          0: { style: { fontSize: '10px', fontWeight: 600 }, label: 'Exact' },
                          5: { style: { fontSize: '10px', fontWeight: 600 }, label: '5mi' },
                          10: { style: { fontSize: '10px', fontWeight: 600 }, label: '10mi' },
                          15: { style: { fontSize: '10px', fontWeight: 600 }, label: '15mi' },
                          20: { style: { fontSize: '10px', fontWeight: 600 }, label: '20mi' }
                      }}
                      tooltip={{ 
                          formatter: (val) => val === 0 ? 'Exact match' : `Within ${val} miles`,
                          open: true 
                      }}
                      className="premium-slider"
                  />
              </div>
          </section>

          {/* Section: Rooms */}
          <section>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#1a3c6e]/5 flex items-center justify-center text-[#1a3c6e]">
                      <BedDouble size={14} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Rooms</h4>
              </div>
              <div className="space-y-4">
                  <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-600 ml-1">Bedrooms</label>
                      <div className="flex gap-1 p-1 bg-gray-50 rounded-lg border border-gray-100">
                          {['Any', '1', '2', '3', '4+'].map((num) => (
                              <button key={num} onClick={() => setBeds(num)} className={`flex-1 h-9 rounded-md font-semibold text-[11px] transition-all ${beds === num ? 'bg-white text-[#1a3c6e] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{num}</button>
                          ))}
                      </div>
                  </div>
                  <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-600 ml-1">Bathrooms</label>
                      <div className="flex gap-1 p-1 bg-gray-50 rounded-lg border border-gray-100">
                          {['Any', '1', '2', '3', '4+'].map((num) => (
                              <button key={num} onClick={() => setBaths(num)} className={`flex-1 h-9 rounded-md font-semibold text-[11px] transition-all ${baths === num ? 'bg-white text-[#1a3c6e] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}>{num}</button>
                          ))}
                      </div>
                  </div>
              </div>
          </section>

          {/* Section: Advanced */}
          <section>
              <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-lg bg-[#1a3c6e]/5 flex items-center justify-center text-[#1a3c6e]">
                      <Warehouse size={14} />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900">Advanced Filters</h4>
              </div>
              <div className="space-y-5">
                  <div className="flex flex-col gap-2">
                      <label className="text-xs font-semibold text-gray-600 ml-1">Listed since</label>
                      <div className="flex flex-wrap gap-1.5 p-1 bg-gray-50 rounded-lg border border-gray-100">
                          {dateOptions.map((opt) => (
                              <button 
                                key={opt.value} 
                                onClick={() => setAddedDate(opt.value)} 
                                className={`flex-1 min-w-[70px] h-9 rounded-md font-semibold text-[11px] transition-all ${addedDate === opt.value ? 'bg-white text-[#1a3c6e] shadow-sm' : 'text-gray-400 hover:text-gray-600'}`}
                              >
                                {opt.label}
                              </button>
                          ))}
                      </div>
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <Checkbox className="premium-checkbox" />
                          <span className="text-xs font-medium text-gray-600">Garden</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <Checkbox className="premium-checkbox" />
                          <span className="text-xs font-medium text-gray-600">Parking</span>
                      </div>
                      <div className="flex items-center gap-2 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                          <Checkbox className="premium-checkbox" />
                          <span className="text-xs font-medium text-gray-600">Freehold</span>
                      </div>
                  </div>
              </div>
          </section>

        </div>

        {/* Footer */}
        <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex gap-3">
                <button 
                    onClick={() => { setRadius(5); setBeds("2"); }}
                    className="flex-1 h-11 rounded-lg font-semibold text-gray-500 hover:bg-gray-50 transition-all text-xs"
                >
                    Reset
                </button>
                <button 
                    onClick={onClose}
                    className="flex-[2] h-11 rounded-lg font-semibold bg-[#14b8a6] text-white hover:opacity-90 transition-all text-sm flex items-center justify-center gap-2 shadow-md shadow-[#14b8a6]/10"
                >
                    <Search size={16} />
                    <span>Search Properties</span>
                </button>
            </div>
        </div>

      </div>
    </Drawer>
  );
};

export default FilterModal;
