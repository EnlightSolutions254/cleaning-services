import React, { useState } from 'react';
import { SERVICES_LIST } from '../data/cleaningData';
import { Service } from '../types';
import { PageHero } from './PageHero';
import {
  Sparkles,
  Search,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Home,
  Building2,
  Armchair,
  Layers,
  HardHat,
  Truck,
  Droplets,
  ShieldAlert,
  AppWindow,
  Zap,
  Shirt,
  Building,
  Bed,
  X,
} from 'lucide-react';

interface ServicesSectionProps {
  onSelectService: (serviceId: string) => void;
}

const ICON_MAP: Record<string, React.FC<{ className?: string }>> = {
  Home,
  Building2,
  Armchair,
  Layers,
  HardHat,
  Truck,
  Sparkles,
  Droplets,
  ShieldAlert,
  AppWindow,
  Zap,
  Shirt,
  Building,
  Bed,
};

export const ServicesSection: React.FC<ServicesSectionProps> = ({ onSelectService }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailModal, setActiveDetailModal] = useState<Service | null>(null);

  const categories = [
    { id: 'all', label: 'All Services (14+)' },
    { id: 'residential', label: 'Residential' },
    { id: 'commercial', label: 'Commercial & Office' },
    { id: 'specialized', label: 'Upholstery & Carpet' },
    { id: 'outdoor', label: 'Outdoor & Sanitation' },
  ];

  const filteredServices = SERVICES_LIST.filter((service) => {
    const matchesCategory = activeCategory === 'all' || service.category === activeCategory;
    const matchesSearch =
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.features.some((f) => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="services" className="pt-1 sm:pt-2 pb-16 sm:pb-20 bg-white border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Hero Header */}
        <PageHero
          title="Our Professional Services in"
          highlightText="Nakuru"
          subtitle="Equipped with industrial hot water steam extractors, rotary scrubbers, and eco-certified chemicals. Fixed KSh prices with zero hidden charges."
          backgroundImageUrl="/images/services/residential-deep.jpg"
          stats={[
            { value: "14+", label: "Specialized Services" },
            { value: "30 Mins", label: "Express Dispatch" },
            { value: "100%", label: "Eco Chemicals" },
            { value: "5.0 ★", label: "Google Rating" },
          ]}
        />

        {/* Filter Controls Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-10">
          
          {/* Category Tabs */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-4 py-2.5 rounded-[12px] text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-[#0F172A] text-white shadow-xs'
                    : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search service e.g. sofa, carpet..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-[12px] pl-9 pr-4 py-2 text-xs font-medium text-[#0F172A] focus:outline-none focus:ring-2 focus:ring-[#2563EB]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Sparkles;
            return (
              <div
                key={service.id}
                className="group rounded-[20px] bg-white border border-slate-200/80 hover:border-blue-300 transition-all duration-300 hover:shadow-xl overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Top Image Banner */}
                  <div className="relative h-48 overflow-hidden bg-slate-100">
                    <img
                      src={service.imageUrl}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A]/80 via-transparent to-transparent" />

                    {/* Popular Badge */}
                    {service.popular && (
                      <span className="absolute top-3 right-3 bg-[#2563EB] text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                        Most Popular
                      </span>
                    )}

                    {/* Starting Price Tag */}
                    <div className="absolute bottom-3 left-3 bg-[#0F172A]/90 backdrop-blur-md text-white border border-slate-700/80 px-3 py-1.5 rounded-[12px]">
                      <span className="text-[10px] text-slate-400 block font-medium">Starting From</span>
                      <p className="text-sm font-extrabold text-[#38BDF8]">
                        KSh {service.priceStartingKsh.toLocaleString()} <span className="text-[10px] font-normal text-slate-300">/ {service.priceUnit}</span>
                      </p>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="p-2.5 rounded-[12px] bg-blue-50 text-[#2563EB]">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-bold text-[#0F172A] font-sans group-hover:text-[#2563EB] transition-colors">
                        {service.title}
                      </h3>
                    </div>

                    <p className="text-xs text-[#64748B] leading-relaxed">
                      {service.description}
                    </p>

                    {/* Features checklist snippet */}
                    <ul className="space-y-1.5 pt-3 border-t border-slate-100 text-xs text-slate-700">
                      {service.features.slice(0, 3).map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                          <span className="line-clamp-1 text-slate-600">{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer Action Buttons */}
                <div className="p-6 pt-0 flex items-center gap-2">
                  <button
                    onClick={() => setActiveDetailModal(service)}
                    className="flex-1 py-2.5 px-3 rounded-[12px] border border-slate-200 hover:border-slate-300 text-slate-700 font-semibold text-xs transition-all text-center cursor-pointer"
                  >
                    View Details
                  </button>

                  <button
                    onClick={() => onSelectService(service.id)}
                    className="flex-1 py-2.5 px-3 rounded-[12px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5 shadow-2xs cursor-pointer"
                  >
                    <span>Book Now</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Modal Drawer for Service Full Details */}
        {activeDetailModal && (
          <div className="fixed inset-0 z-50 bg-[#0F172A]/75 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white rounded-[24px] max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 border border-slate-200 shadow-2xl relative animate-in fade-in zoom-in duration-200">
              
              <button
                onClick={() => setActiveDetailModal(null)}
                className="absolute top-5 right-5 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-3">
                <div className="p-3 rounded-[14px] bg-blue-50 text-[#2563EB]">
                  {React.createElement(ICON_MAP[activeDetailModal.iconName] || Sparkles, { className: 'w-6 h-6' })}
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#2563EB] tracking-wider">
                    {activeDetailModal.category} Service
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold text-[#0F172A] font-sans">
                    {activeDetailModal.title}
                  </h3>
                </div>
              </div>

              <img
                src={activeDetailModal.imageUrl}
                alt={activeDetailModal.title}
                className="w-full h-56 object-cover rounded-[16px] border border-slate-200"
              />

              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Service Overview</h4>
                <p className="text-sm text-slate-700 leading-relaxed">{activeDetailModal.longDescription}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 p-4 rounded-[16px] bg-slate-50 border border-slate-200">
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">Starting Price</p>
                  <p className="text-lg font-bold text-[#0F172A]">
                    KSh {activeDetailModal.priceStartingKsh.toLocaleString()} <span className="text-xs text-slate-500 font-normal">/ {activeDetailModal.priceUnit}</span>
                  </p>
                </div>
                <div>
                  <p className="text-[11px] font-semibold text-slate-500">Estimated Duration</p>
                  <p className="text-sm font-bold text-[#0F172A] flex items-center gap-1 mt-1">
                    <Clock className="w-4 h-4 text-[#2563EB]" />
                    <span>{activeDetailModal.estimatedTime}</span>
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase text-slate-400 tracking-wider">Included In Service Checklist</h4>
                <ul className="space-y-2 text-xs text-slate-700">
                  {activeDetailModal.features.map((feat, i) => (
                    <li key={i} className="flex items-start gap-2 bg-slate-50 p-2.5 rounded-[12px] border border-slate-200/60">
                      <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-2 flex items-center gap-3 border-t border-slate-100">
                <button
                  onClick={() => setActiveDetailModal(null)}
                  className="w-1/3 py-3 rounded-[14px] border border-slate-200 font-semibold text-xs text-slate-700 hover:bg-slate-100"
                >
                  Close
                </button>

                <button
                  onClick={() => {
                    const id = activeDetailModal.id;
                    setActiveDetailModal(null);
                    onSelectService(id);
                  }}
                  className="w-2/3 py-3 rounded-[14px] bg-[#0F172A] hover:bg-[#2563EB] text-white font-semibold text-xs shadow-md transition-all flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-sky-400" />
                  <span>Book {activeDetailModal.title}</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
