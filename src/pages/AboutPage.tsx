import React from 'react';
import { ShieldCheck, Award, Users, CheckCircle2, MapPin, Sparkles, Phone, Calendar } from 'lucide-react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';
import { PageHero } from '../components/PageHero';
import { Link } from 'react-router-dom';

interface AboutPageProps {
  onOpenBooking: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-2 pb-8 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Hero */}
      <PageHero
        title="About Jokulu Cleaning Services"
        highlightText="Nakuru"
        subtitle="The most trusted name in professional residential, commercial, and industrial hygiene across Nakuru CBD, Milimani, Kiamunyi, Naivasha, and Gilgil."
        backgroundImageUrl="/images/about-hero.jpg"
        primaryCta={{
          text: "Book Appointment Now",
          onClick: onOpenBooking,
          icon: <Calendar className="w-4 h-4" />
        }}
        stats={[
          { value: "2018", label: "Established in Nakuru" },
          { value: "100%", label: "DCI Verified Staff" },
          { value: "4,200+", label: "Cleaned Properties" },
          { value: "5.0 ★", label: "Google Rating" }
        ]}
      />

      {/* Story & Mission Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center bg-slate-50 rounded-3xl p-8 border border-slate-200">
        <div className="space-y-4">
          <span className="text-emerald-700 font-extrabold text-xs uppercase tracking-wider">Our Story</span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-sans">
            Setting the Gold Standard for Sanitation in Rift Valley
          </h2>
          <p className="text-sm text-slate-600 leading-relaxed">
            Founded in Nakuru, Kenya, Jokulu Cleaning Services was built to solve a critical need: delivering hospital-grade, transparently priced cleaning services for Kenyan homes, corporate offices, and hospitality businesses.
          </p>
          <p className="text-sm text-slate-600 leading-relaxed">
            Every member of our crew undergoes mandatory DCI Certificate of Good Conduct background verification, intensive training on industrial steam extraction systems, and eco-certified sanitation chemistry.
          </p>

          <div className="pt-2 grid grid-cols-2 gap-4 text-xs font-bold text-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Guaranteed Re-clean</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>DCI Checked Cleaners</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>M-Pesa Till Payment</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Same-Day Rapid Dispatch</span>
            </div>
          </div>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-200">
          <img
            src="/images/about/team-office.jpg"
            alt="Apex Clean Nakuru Professional Team"
            className="w-full h-80 object-cover"
          />
          <div className="absolute bottom-4 left-4 bg-slate-900/90 text-white p-4 rounded-xl border border-slate-700 max-w-xs">
            <p className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Nakuru Head Office</p>
            <p className="text-xs text-slate-300">Kenyatta Avenue Plaza, Floor 2, Nakuru CBD</p>
          </div>
        </div>
      </div>

      {/* Core Values / Pillar Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Safety & Vetting</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Your home and family security are paramount. All cleaners present official company badges and DCI clearance certificates upon arrival.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Industrial Steam Machinery</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            We don't use household buckets. We deploy heavy-duty 180°C hot water injection extractors that kill 99.9% of dust mites and bacteria.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
            <Users className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-slate-900 text-lg">Local Community Focus</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Proudly employing 40+ trained technicians in Nakuru County with fair wages, healthcare coverage, and continuous skill development.
          </p>
        </div>
      </div>

      {/* CTA Box */}
      <div className="bg-slate-900 text-white rounded-3xl p-8 text-center space-y-4 shadow-xl">
        <h2 className="text-2xl font-extrabold font-sans">Ready for a Spotless Environment in Nakuru?</h2>
        <p className="text-xs sm:text-sm text-slate-300 max-w-xl mx-auto">
          Book online in under 60 seconds with instant KSh pricing calculation or talk directly with our Nakuru concierge team.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={onOpenBooking}
            className="px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shadow-md inline-flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Cleaning Online</span>
          </button>
          <a
            href={`tel:${APEX_COMPANY_INFO.phone}`}
            className="px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4 text-emerald-400" />
            <span>Call Hotline: {APEX_COMPANY_INFO.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
};
