import React from 'react';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { PageHero } from '../components/PageHero';
import { Sparkles, Calendar, ShieldCheck } from 'lucide-react';

interface TransformationsPageProps {
  onOpenBooking: () => void;
}

export const TransformationsPage: React.FC<TransformationsPageProps> = ({ onOpenBooking }) => {
  return (
    <div className="pt-2 pb-8 space-y-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Page Hero Header */}
      <PageHero
        title="Before & After"
        highlightText=""
        subtitle="See how our industrial steam extraction units and rotary deep scrubbers remove stubborn red clay soil, coffee spills, and dust from Nakuru homes."
        backgroundImageUrl="/images/transformations/sofa-after.jpg"
        primaryCta={{
          text: "Book Your Cleaning",
          onClick: onOpenBooking,
          icon: <Calendar className="w-4 h-4" />
        }}
        stats={[
          { value: "3,500+", label: "Homes Restored" },
          { value: "100%", label: "Stain Extraction" },
          { value: "30 Mins", label: "Dispatch Time" },
          { value: "5.0 ★", label: "Client Satisfaction" }
        ]}
      />

      <BeforeAfterSlider />

      <div className="max-w-4xl mx-auto text-center pt-4">
        <div className="p-8 rounded-[24px] bg-[#18181B] border border-zinc-800 text-white space-y-4 shadow-2xl">
          <h2 className="text-2xl font-extrabold font-sans">
            Want Your Furniture or House Restored Like This?
          </h2>
          <p className="text-xs sm:text-sm text-zinc-300">
            Same-day booking available in Milimani, Kiamunyi, Naivasha, Gilgil, Njoro, and all Estates.
          </p>
          <button
            onClick={onOpenBooking}
            className="px-8 py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-bold text-sm shadow-lg inline-flex items-center gap-2 cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Your Cleaning</span>
          </button>
        </div>
      </div>
    </div>
  );
};
