import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { APEX_COMPANY_INFO, LOCATIONS_LIST, SERVICES_LIST } from '../data/cleaningData';
import { useLogoUrl } from '../utils/logoManager';
import {
  Sparkles,
  MapPin,
  Phone,
  Mail,
  ShieldCheck,
  Calendar,
  CreditCard,
  Heart,
  UserCheck,
} from 'lucide-react';

interface FooterProps {
  onOpenBooking: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  const { logoUrl } = useLogoUrl();
  const [imageError, setImageError] = useState(false);
  // Schema.org LocalBusiness & CleaningService JSON-LD Structured Data
  const schemaJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CleaningService',
    name: APEX_COMPANY_INFO.name,
    description: APEX_COMPANY_INFO.tagline,
    url: 'https://apexcleannakuru.co.ke',
    telephone: APEX_COMPANY_INFO.phone,
    priceRange: 'KSh 2500 - KSh 25000',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Kenyatta Avenue, Opp. Nakuru Athletics Club',
      addressLocality: 'Nakuru',
      addressRegion: 'Nakuru County',
      addressCountry: 'KE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: -0.2833,
      longitude: 36.0667,
    },
    areaServed: LOCATIONS_LIST.map((loc) => ({
      '@type': 'AdministrativeArea',
      name: loc.townName,
    })),
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '348',
    },
    paymentAccepted: 'Cash, M-Pesa',
  };

  return (
    <footer className="bg-[#18181B] text-zinc-300 pt-16 pb-24 border-t border-zinc-800 relative text-xs">
      {/* Inject Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJsonLd) }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Top CTA Banner */}
        <div className="bg-zinc-900 rounded-[24px] p-8 border border-zinc-800 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl relative overflow-hidden">
          <div className="space-y-2 text-center md:text-left relative z-10">
            <span className="bg-[#059669] text-white font-bold text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              Ready for a Spotless Home or Office?
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-sans tracking-tight">
              Book Your Cleaning Team in Nakuru Today
            </h3>
            <p className="text-xs text-zinc-400">
              Same-day dispatch available in Milimani, Kiamunyi, Section 58, Naivasha & All County.
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-6 py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-sm shadow-md flex items-center gap-2 shrink-0 transition-all cursor-pointer relative z-10"
          >
            <Calendar className="w-4 h-4 text-white" />
            <span>Book Online (KSh Prices)</span>
          </button>
        </div>

        {/* 4 Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center md:text-left">
          
          {/* Col 1: Brand Info */}
          <div className="space-y-4">
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-white p-0.5 border border-zinc-700/80 shadow-md flex items-center justify-center overflow-hidden shrink-0">
                {!imageError ? (
                  <img
                    src={logoUrl}
                    alt={APEX_COMPANY_INFO.name}
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover rounded-[10px]"
                  />
                ) : (
                  <div className="w-full h-full bg-[#059669] rounded-[10px] flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-300" />
                  </div>
                )}
              </div>
              <span className="text-lg font-bold text-white tracking-tight font-sans">{APEX_COMPANY_INFO.name.toUpperCase()}</span>
            </div>

            <p className="text-zinc-400 leading-relaxed max-w-sm mx-auto md:mx-0">
              Nakuru County's top-rated residential, commercial, sofa, carpet & post-construction cleaning company.
            </p>

            <div className="space-y-2 text-zinc-300 pt-2 flex flex-col items-center md:items-start">
              <p className="flex items-start justify-center md:justify-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{APEX_COMPANY_INFO.address}</span>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <a href={`tel:${APEX_COMPANY_INFO.phone}`} className="hover:text-white font-semibold transition-colors">{APEX_COMPANY_INFO.phone}</a>
              </p>
              <p className="flex items-center justify-center md:justify-start gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{APEX_COMPANY_INFO.email}</span>
              </p>
            </div>
          </div>

          {/* Col 2: Services Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">
              Cleaning Services
            </h4>
            <ul className="space-y-2 text-zinc-400">
              {SERVICES_LIST.slice(0, 7).map((s) => (
                <li key={s.id}>
                  <Link to="/services" className="hover:text-emerald-400 transition-colors">
                    {s.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Local SEO Service Areas in Nakuru */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">
              Nakuru Service Areas
            </h4>
            <ul className="space-y-2 text-zinc-400">
              {LOCATIONS_LIST.slice(0, 8).map((loc) => (
                <li key={loc.id}>
                  <Link to={`/locations?town=${loc.slug}`} className="hover:text-emerald-400 transition-colors flex items-center justify-center md:justify-start gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#059669]" />
                    <span>{loc.townName}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: M-Pesa Trust & Compliance */}
          <div className="space-y-4">
            <h4 className="text-xs font-bold text-zinc-400 uppercase tracking-wider font-sans">
              Payment & Trust
            </h4>

            <div className="bg-zinc-900/80 p-4 rounded-[14px] border border-zinc-800 space-y-2 max-w-sm mx-auto md:mx-0">
              <div className="flex items-center justify-center md:justify-start gap-2 text-emerald-400 font-semibold">
                <CreditCard className="w-4 h-4" />
                <span>Safaricom M-Pesa Paybill</span>
              </div>
              <p className="text-[11px] text-zinc-300">
                Paybill Number: <strong className="text-white">{APEX_COMPANY_INFO.mpesaPaybill}</strong>
              </p>
              <p className="text-[11px] text-zinc-300">
                Till Number: <strong className="text-white">{APEX_COMPANY_INFO.mpesaTill}</strong>
              </p>
            </div>

            <div className="space-y-1 text-[11px] text-zinc-400 flex flex-col items-center md:items-start">
              <p className="flex items-center justify-center md:justify-start gap-1.5 text-[#10B981] font-semibold">
                <ShieldCheck className="w-4 h-4" />
                <span>100% Insured & DCI Vetted</span>
              </p>
              <p>NEMA Eco-Chemical Certified in Kenya.</p>
            </div>
          </div>

        </div>

        {/* Bottom Copyright and Geometric Balance Bar */}
        <div className="pt-8 border-t border-zinc-800/80 text-center text-zinc-500 text-[10px] uppercase font-medium tracking-wider flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} APEX PREMIER CLEAN NAKURU. ALL RIGHTS RESERVED.</p>
          <div className="flex items-center gap-6">
            <span className="text-amber-400 font-bold">NAKURU COUNTY, KENYA</span>
            <Link to="/services" className="hover:text-emerald-400 transition-colors">SERVICES</Link>
            <Link to="/calculator" className="hover:text-emerald-400 transition-colors">CALCULATOR</Link>
            <Link to="/faq" className="hover:text-emerald-400 transition-colors">FAQ</Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

