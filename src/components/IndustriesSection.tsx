import React from 'react';
import { INDUSTRY_SOLUTIONS } from '../data/cleaningData';
import { PageHero } from './PageHero';
import { Sparkles, CheckCircle2, ArrowRight, Hotel, Briefcase, Key, GraduationCap, Factory } from 'lucide-react';

interface IndustriesSectionProps {
  onSelectIndustryQuote: (industryTitle: string) => void;
}

const INDUSTRY_ICONS: Record<string, React.FC<{ className?: string }>> = {
  Hotel,
  Briefcase,
  Key,
  GraduationCap,
  Factory,
};

export const IndustriesSection: React.FC<IndustriesSectionProps> = ({ onSelectIndustryQuote }) => {
  return (
    <section id="industries" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#FAFAFA] border-b border-zinc-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Hero Header */}
        <PageHero
          title="Specialized Cleaning Solutions for Nakuru"
          highlightText="Industries"
          subtitle="From luxury resorts on Lake Naivasha to corporate head offices in Nakuru CBD and private schools in Kiamunyi."
          backgroundImageUrl="/images/industries/offices.jpg"
          stats={[
            { value: "500+", label: "Corporate Contracts" },
            { value: "100%", label: "OSHA Compliant" },
            { value: "Nightly", label: "Shift Cleaning" },
            { value: "5.0 ★", label: "Business Rating" },
          ]}
        />

        {/* Industry Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {INDUSTRY_SOLUTIONS.map((ind) => {
            const IconComp = INDUSTRY_ICONS[ind.iconName] || Sparkles;
            return (
              <div
                key={ind.id}
                className="bg-white rounded-[20px] border border-zinc-200/80 hover:border-emerald-300 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 bg-zinc-100 overflow-hidden">
                    <img
                      src={ind.imageUrl}
                      alt={ind.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#18181B]/75 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-md text-[#18181B] px-3 py-1.5 rounded-[12px] flex items-center gap-2 text-xs font-bold shadow-sm">
                      <IconComp className="w-4 h-4 text-[#059669]" />
                      <span>{ind.title}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <p className="text-xs text-[#71717A] leading-relaxed">
                      {ind.description}
                    </p>

                    <div className="space-y-2 pt-3 border-t border-zinc-100">
                      <p className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">Key Benefits:</p>
                      <ul className="space-y-1.5 text-xs text-zinc-700">
                        {ind.keyBenefits.map((b, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0 mt-0.5" />
                            <span className="text-zinc-600">{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => onSelectIndustryQuote(ind.title)}
                    className="w-full py-3 px-4 rounded-[12px] bg-[#18181B] hover:bg-[#059669] text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-2 shadow-2xs cursor-pointer"
                  >
                    <span>Request Corporate Proposal</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
