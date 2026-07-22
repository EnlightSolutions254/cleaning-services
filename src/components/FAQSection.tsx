import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/cleaningData';
import { PageHero } from './PageHero';
import { HelpCircle, ChevronDown, Sparkles } from 'lucide-react';

export const FAQSection: React.FC = () => {
  const [openId, setOpenId] = useState<string | null>(FAQ_ITEMS[0].id);

  return (
    <section id="faq" className="pt-2 pb-16 sm:pt-3 sm:pb-20 bg-[#FAFAFA] border-b border-zinc-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Hero Header */}
        <PageHero
          title="Frequently Asked"
          highlightText="Questions"
          subtitle="Everything you need to know about our cleaning process, staff vetting, and M-Pesa payments in Nakuru County."
          backgroundImageUrl="/images/about/about-hero.jpg"
          stats={[
            { value: "100%", label: "DCI Vetted Staff" },
            { value: "M-Pesa", label: "Instant Payment" },
            { value: "30 Mins", label: "Express Response" },
            { value: "48 Hrs", label: "Free Re-Clean" },
          ]}
        />

        {/* Accordion List */}
        <div className="space-y-3">
          {FAQ_ITEMS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`rounded-[16px] border transition-all duration-300 overflow-hidden ${
                  isOpen ? 'bg-white border-emerald-300 shadow-sm' : 'bg-white/70 border-zinc-200/80 hover:border-zinc-300'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full text-left p-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                >
                  <span className="font-bold text-sm sm:text-base text-[#18181B] font-sans">
                    {faq.question}
                  </span>
                  <div className={`p-1.5 rounded-full transition-transform duration-300 ${isOpen ? 'rotate-180 bg-emerald-50 text-[#059669]' : 'bg-zinc-100 text-zinc-500'}`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-xs sm:text-sm text-[#71717A] leading-relaxed border-t border-zinc-100 mt-1">
                    <p className="pt-3">{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
