import React, { useState, useEffect } from 'react';
import { Calculator, Check, Sparkles, MapPin, ArrowRight, Info, ShieldCheck } from 'lucide-react';
import { LOCATIONS_LIST, APEX_COMPANY_INFO } from '../data/cleaningData';
import { PageHero } from './PageHero';

interface PriceCalculatorProps {
  onBookWithEstimate: (calculatedData: {
    serviceType: string;
    totalKsh: number;
    bedrooms: number;
    bathrooms: number;
    sofaSeats: number;
    locationTown: string;
    addOns: string[];
  }) => void;
}

export const PriceCalculator: React.FC<PriceCalculatorProps> = ({ onBookWithEstimate }) => {
  const [serviceType, setServiceType] = useState('residential');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [sofaSeats, setSofaSeats] = useState(5);
  const [carpetSqft, setCarpetSqft] = useState(0);
  const [locationTown, setLocationTown] = useState('Nakuru CBD');
  const [needFumigation, setNeedFumigation] = useState(false);
  const [needWaterTank, setNeedWaterTank] = useState(false);
  const [needCurtains, setNeedCurtains] = useState(false);
  const [isPostConst, setIsPostConst] = useState(false);
  const [isExpress, setIsExpress] = useState(false);

  const [totalKsh, setTotalKsh] = useState(5000);
  const [estimatedHours, setEstimatedHours] = useState('3 Hours');

  useEffect(() => {
    let base = 3500;

    if (serviceType === 'residential') {
      base = 2500 + bedrooms * 1000 + bathrooms * 500;
    } else if (serviceType === 'office') {
      base = 6000 + bedrooms * 1500;
    } else if (serviceType === 'airbnb') {
      base = 2500 + (bedrooms - 1) * 800;
    } else if (serviceType === 'sofa') {
      base = Math.max(2500, sofaSeats * 800);
    } else if (serviceType === 'post_construction') {
      base = 12000 + bedrooms * 2000;
    }

    if (sofaSeats > 0 && serviceType !== 'sofa') {
      base += sofaSeats * 600;
    }
    if (carpetSqft > 0) {
      base += carpetSqft * 35;
    }
    if (needFumigation) {
      base += 3000;
    }
    if (needWaterTank) {
      base += 3500;
    }
    if (needCurtains) {
      base += 2400;
    }
    if (isPostConst && serviceType !== 'post_construction') {
      base += 4000;
    }
    if (isExpress) {
      base += 1000;
    }

    const isOuterCounty = ['Naivasha', 'Gilgil', 'Njoro', 'Subukia', 'Molo'].some((t) =>
      locationTown.includes(t)
    );
    if (isOuterCounty) {
      base += 800;
    }

    const roundedKsh = Math.round(base / 50) * 50;
    setTotalKsh(roundedKsh);

    const hours = Math.max(2, Math.min(8, Math.ceil(bedrooms * 1.2 + (sofaSeats > 0 ? 1 : 0))));
    setEstimatedHours(`${hours} - ${hours + 1} Hours`);
  }, [
    serviceType,
    bedrooms,
    bathrooms,
    sofaSeats,
    carpetSqft,
    locationTown,
    needFumigation,
    needWaterTank,
    needCurtains,
    isPostConst,
    isExpress,
  ]);

  const handleProceedBooking = () => {
    const addOnsList: string[] = [];
    if (needFumigation) addOnsList.push('Pest Control & Fumigation (KSh 3,000)');
    if (needWaterTank) addOnsList.push('Water Tank Sanitization (KSh 3,500)');
    if (needCurtains) addOnsList.push('Curtain Steaming (KSh 2,400)');
    if (isExpress) addOnsList.push('Same-Day Express Dispatch (KSh 1,000)');

    onBookWithEstimate({
      serviceType,
      totalKsh,
      bedrooms,
      bathrooms,
      sofaSeats,
      locationTown,
      addOns: addOnsList,
    });
  };

  return (
    <section id="calculator" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#18181B] text-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Hero Header */}
        <PageHero
          title="Calculate Your Cleaning Price in"
          highlightText="Nakuru"
          subtitle="Transparent, fixed pricing in Kenyan Shillings with zero hidden fees. Select your home or office details below."
          backgroundImageUrl="/images/calculator-hero.jpg"
          stats={[
            { value: "KES 1,500+", label: "Starting Price" },
            { value: "0 Hidden Fees", label: "Fixed Estimate" },
            { value: "M-Pesa Till", label: "Accepted" },
            { value: "100%", label: "Satisfaction Guaranteed" },
          ]}
        />

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Controls Column */}
          <div className="lg:col-span-7 bg-zinc-900/90 rounded-[24px] p-6 sm:p-8 border border-zinc-800 shadow-2xl space-y-6">
            
            {/* 1. Service Type Selector */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-3">
                1. Select Service Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'residential', label: 'Residential Deep Clean' },
                  { id: 'office', label: 'Office & Corporate' },
                  { id: 'airbnb', label: 'Airbnb Turnover' },
                  { id: 'sofa', label: 'Sofa & Upholstery' },
                  { id: 'post_construction', label: 'Post-Construction' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setServiceType(item.id)}
                    className={`py-3 px-3 rounded-[12px] text-xs font-semibold border transition-all text-left cursor-pointer ${
                      serviceType === item.id
                        ? 'bg-[#059669] text-white border-emerald-400 shadow-sm'
                        : 'bg-zinc-950/60 text-zinc-300 border-zinc-800 hover:bg-zinc-800/80'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Room & Property Configuration */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Bedrooms / Offices ({bedrooms})
                </label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-[12px] p-1">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBedrooms(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-[8px] transition-all cursor-pointer ${
                        bedrooms === num ? 'bg-[#059669] text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {num} {num === 5 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Bathrooms ({bathrooms})
                </label>
                <div className="flex items-center bg-zinc-950 border border-zinc-800 rounded-[12px] p-1">
                  {[1, 2, 3, 4].map((num) => (
                    <button
                      key={num}
                      onClick={() => setBathrooms(num)}
                      className={`flex-1 py-2 text-xs font-semibold rounded-[8px] transition-all cursor-pointer ${
                        bathrooms === num ? 'bg-[#059669] text-white' : 'text-zinc-400 hover:text-white'
                      }`}
                    >
                      {num} {num === 4 ? '+' : ''}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* 3. Upholstery & Carpet Sliders */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-zinc-800">
              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Sofa Seats ({sofaSeats} Seater)
                </label>
                <select
                  value={sofaSeats}
                  onChange={(e) => setSofaSeats(Number(e.target.value))}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-[12px] py-2.5 px-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                  <option value={0}>No Sofa Cleaning</option>
                  <option value={3}>3-Seater Couch (KSh 2,500)</option>
                  <option value={5}>5-Seater Living Room Set (KSh 3,500)</option>
                  <option value={7}>7-Seater L-Shape Lounge Set (KSh 4,500)</option>
                  <option value={10}>10+ Seater Large Sectional</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-400 mb-2">
                  Nakuru Location Area
                </label>
                <select
                  value={locationTown}
                  onChange={(e) => setLocationTown(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-[12px] py-2.5 px-3 text-xs font-semibold text-white focus:outline-none focus:ring-2 focus:ring-[#059669]"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc.id} value={loc.townName}>
                      {loc.townName} ({loc.subCounty})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* 4. Add-ons Checkboxes */}
            <div className="pt-2 border-t border-zinc-800 space-y-2.5">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-1">
                4. Select Optional Add-Ons
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <label className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  needFumigation ? 'bg-emerald-950/60 border-[#059669] text-white' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:bg-zinc-800/40'
                }`}>
                  <input
                    type="checkbox"
                    checked={needFumigation}
                    onChange={(e) => setNeedFumigation(e.target.checked)}
                    className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] bg-zinc-950 border-zinc-700"
                  />
                  <div className="text-xs">
                    <p className="font-semibold">Pest Control & Fumigation</p>
                    <p className="text-[10px] text-zinc-400">+ KSh 3,000 (Odorless 6-Mo Warranty)</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  needWaterTank ? 'bg-emerald-950/60 border-[#059669] text-white' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:bg-zinc-800/40'
                }`}>
                  <input
                    type="checkbox"
                    checked={needWaterTank}
                    onChange={(e) => setNeedWaterTank(e.target.checked)}
                    className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] bg-zinc-950 border-zinc-700"
                  />
                  <div className="text-xs">
                    <p className="font-semibold">Water Tank Scrubbing</p>
                    <p className="text-[10px] text-zinc-400">+ KSh 3,500 (Underground/Overhead)</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  needCurtains ? 'bg-emerald-950/60 border-[#059669] text-white' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:bg-zinc-800/40'
                }`}>
                  <input
                    type="checkbox"
                    checked={needCurtains}
                    onChange={(e) => setNeedCurtains(e.target.checked)}
                    className="w-4 h-4 rounded text-[#059669] focus:ring-[#059669] bg-zinc-950 border-zinc-700"
                  />
                  <div className="text-xs">
                    <p className="font-semibold">On-Hanging Curtain Steaming</p>
                    <p className="text-[10px] text-zinc-400">+ KSh 2,400 (Drapes & Sheers)</p>
                  </div>
                </label>

                <label className={`flex items-center gap-3 p-3 rounded-[12px] border cursor-pointer transition-all ${
                  isExpress ? 'bg-amber-950/60 border-amber-500/80 text-white' : 'bg-zinc-950/40 border-zinc-800 text-zinc-300 hover:bg-zinc-800/40'
                }`}>
                  <input
                    type="checkbox"
                    checked={isExpress}
                    onChange={(e) => setIsExpress(e.target.checked)}
                    className="w-4 h-4 rounded text-amber-500 focus:ring-amber-500 bg-zinc-950 border-zinc-700"
                  />
                  <div className="text-xs">
                    <p className="font-semibold text-amber-300">Same-Day Express Dispatch</p>
                    <p className="text-[10px] text-zinc-400">+ KSh 1,000 (30-Min Arrival)</p>
                  </div>
                </label>
              </div>
            </div>

          </div>

          {/* Price Summary Box Column */}
          <div className="lg:col-span-5 sticky top-28 space-y-4">
            <div className="bg-zinc-900 rounded-[24px] p-6 sm:p-8 border border-zinc-800 shadow-2xl relative overflow-hidden">
              
              <div className="absolute top-0 right-0 bg-[#059669] text-white font-bold text-[10px] px-3.5 py-1 rounded-bl-[14px] uppercase tracking-wider">
                Instant Guaranteed Rate
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold text-zinc-400 uppercase tracking-widest">
                  Estimated Total Quote
                </p>

                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-emerald-400">KSh</span>
                  <span className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight font-sans">
                    {totalKsh.toLocaleString()}
                  </span>
                </div>

                <p className="text-xs text-zinc-300 flex items-center gap-1.5 bg-zinc-950/80 py-2.5 px-3.5 rounded-[12px] border border-zinc-800">
                  <Info className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Estimated Time: <strong className="text-white font-bold">{estimatedHours}</strong> with full team dispatch.</span>
                </p>

                {/* Included Checklist */}
                <div className="space-y-2 pt-2 border-t border-zinc-800 text-xs text-zinc-300">
                  <p className="font-bold text-white text-xs uppercase tracking-wider">Quote Includes:</p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>Full labor, equipment & eco-friendly chemicals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>DCI background-checked uniformed staff</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>100% Sparkle Satisfaction Guarantee</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                      <span>M-Pesa payment accepted on-site or STK Push</span>
                    </li>
                  </ul>
                </div>

                <button
                  onClick={handleProceedBooking}
                  className="w-full mt-4 py-4 px-6 rounded-[14px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow-md active:scale-98 transition-all flex items-center justify-center gap-2 group cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>Lock Price & Book Online Now</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>

                <p className="text-[11px] text-zinc-400 text-center font-medium">
                  Zero deposit required to lock date. Pay via M-Pesa upon service inspection.
                </p>
              </div>

            </div>

            {/* M-Pesa Trust Banner */}
            <div className="bg-zinc-900/80 p-4 rounded-[16px] border border-zinc-800 flex items-center justify-between text-xs text-zinc-300">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[10px] bg-[#10B981] text-white flex items-center justify-center font-bold text-xs">
                  M
                </div>
                <div>
                  <p className="font-bold text-white">Official Safaricom M-Pesa Partner</p>
                  <p className="text-[10px] text-zinc-400">Paybill: {APEX_COMPANY_INFO.mpesaPaybill} | Account: {APEX_COMPANY_INFO.mpesaAccount}</p>
                </div>
              </div>
              <ShieldCheck className="w-5 h-5 text-emerald-400" />
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
