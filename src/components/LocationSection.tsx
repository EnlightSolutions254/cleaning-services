import React, { useState } from 'react';
import { LOCATIONS_LIST } from '../data/cleaningData';
import { LocationArea } from '../types';
import { PageHero } from './PageHero';
import { MapPin, Clock, ArrowRight, ShieldCheck, CheckCircle2, Navigation, Sparkles, Building, X } from 'lucide-react';

interface LocationSectionProps {
  onBookInLocation: (townName: string) => void;
  selectedLocationSlug?: string;
}

export const LocationSection: React.FC<LocationSectionProps> = ({
  onBookInLocation,
  selectedLocationSlug,
}) => {
  const [activeTownModal, setActiveTownModal] = useState<LocationArea | null>(
    selectedLocationSlug
      ? LOCATIONS_LIST.find((l) => l.slug === selectedLocationSlug) || null
      : null
  );

  return (
    <section id="locations" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#18181B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Hero Header */}
        <PageHero
          title="Cleaning Services Across All Nakuru"
          highlightText="Sub-Counties"
          subtitle="Dedicated mobile units equipped for fast dispatch to your estate or town. Select your neighborhood below to view local delivery times & reviews."
          backgroundImageUrl="/images/locations/nakuru-cbd.jpg"
          stats={[
            { value: "10+", label: "Sub-Counties Covered" },
            { value: "30 Mins", label: "Average Dispatch" },
            { value: "100%", label: "Local Nakuru Crews" },
            { value: "5.0 ★", label: "Estate Rating" },
          ]}
        />

        {/* Town Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {LOCATIONS_LIST.map((loc) => (
            <div
              key={loc.id}
              className="bg-zinc-900/90 rounded-[20px] p-6 border border-zinc-800 hover:border-emerald-500/80 transition-all duration-300 hover:shadow-2xl flex flex-col justify-between group"
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                      {loc.subCounty}
                    </span>
                    <h3 className="text-xl font-bold text-white group-hover:text-emerald-400 transition-colors font-sans">
                      {loc.townName}
                    </h3>
                  </div>
                  <div className="p-2 rounded-[10px] bg-zinc-950 text-[#059669] border border-zinc-800">
                    <Navigation className="w-4 h-4 text-emerald-400" />
                  </div>
                </div>

                <p className="text-xs text-zinc-300 leading-relaxed line-clamp-2">
                  {loc.description}
                </p>

                {/* Delivery Time Badge */}
                <div className="flex items-center gap-2 text-xs font-semibold text-emerald-200 bg-zinc-950/90 py-2 px-3 rounded-[12px] border border-zinc-800">
                  <Clock className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dispatch Speed: <strong>{loc.deliveryTime}</strong></span>
                </div>

                {/* Key Estates Chips */}
                <div className="space-y-2">
                  <p className="text-[11px] font-bold uppercase tracking-wider text-zinc-400">Estates Covered:</p>
                  <div className="flex flex-wrap gap-1.5">
                    {loc.keyEstates.slice(0, 4).map((est, idx) => (
                      <span
                        key={idx}
                        className="text-[11px] font-medium bg-zinc-950 text-zinc-300 px-2.5 py-1 rounded-[8px] border border-zinc-800"
                      >
                        {est}
                      </span>
                    ))}
                    {loc.keyEstates.length > 4 && (
                      <span className="text-[10px] font-bold text-emerald-400 self-center">
                        +{loc.keyEstates.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="pt-6 border-t border-zinc-800 mt-4 flex items-center justify-between gap-3">
                <button
                  onClick={() => setActiveTownModal(loc)}
                  className="text-xs font-semibold text-zinc-400 hover:text-white underline underline-offset-4 cursor-pointer"
                >
                  View Landing Page
                </button>

                <button
                  onClick={() => onBookInLocation(loc.townName)}
                  className="py-2.5 px-4 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs transition-all flex items-center gap-1.5 shadow-sm cursor-pointer"
                >
                  <span>Book in {loc.townName.split(' ')[0]}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Town Local SEO Modal */}
        {activeTownModal && (
          <div className="fixed inset-0 z-50 bg-[#18181B]/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-zinc-900 text-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-zinc-800 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setActiveTownModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-zinc-800 hover:bg-zinc-700 text-zinc-300 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-[14px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-emerald-400 tracking-wider">
                    Nakuru Sub-County Hub ({activeTownModal.subCounty})
                  </span>
                  <h3 className="text-2xl font-bold text-white font-sans">
                    Cleaning Services in {activeTownModal.townName}
                  </h3>
                </div>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                {activeTownModal.description}
              </p>

              {/* Local Estates & Landmarks */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-[16px] bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <p className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Key Neighborhoods Covered:</p>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {activeTownModal.keyEstates.map((est, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
                        <span>{est}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-[16px] bg-zinc-950/80 border border-zinc-800 space-y-2">
                  <p className="text-xs font-bold uppercase text-emerald-400 tracking-wider">Local Landmarks:</p>
                  <ul className="space-y-1 text-xs text-zinc-300">
                    {activeTownModal.featuredLandmarks.map((lm, i) => (
                      <li key={i} className="flex items-center gap-1.5">
                        <Building className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{lm}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Dispatch speed & Guarantee */}
              <div className="p-4 rounded-[16px] bg-emerald-950/40 border border-emerald-500/30 text-xs text-emerald-200 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white">Guaranteed Mobile Unit Dispatch:</p>
                  <p className="text-zinc-300">{activeTownModal.deliveryTime}</p>
                </div>
                <ShieldCheck className="w-6 h-6 text-emerald-400" />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTownModal(null)}
                  className="w-1/3 py-3 rounded-[12px] border border-zinc-800 text-zinc-300 hover:bg-zinc-800 font-semibold text-xs cursor-pointer"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const townName = activeTownModal.townName;
                    setActiveTownModal(null);
                    onBookInLocation(townName);
                  }}
                  className="w-2/3 py-3 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs shadow-md flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-emerald-200" />
                  <span>Book Cleaning in {activeTownModal.townName}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
