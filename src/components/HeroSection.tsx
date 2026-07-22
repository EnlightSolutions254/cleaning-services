import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ShieldCheck,
  CheckCircle2,
  Calendar,
  MessageSquare,
  Calculator,
  Star,
  Clock,
  ArrowRight,
  MapPin,
  Award,
  Users,
} from 'lucide-react';
import { APEX_COMPANY_INFO, LOCATIONS_LIST } from '../data/cleaningData';

interface HeroSectionProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
  onSelectLocation: (townSlug: string) => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenBooking,
  onOpenCalculator,
  onSelectLocation,
}) => {
  const [selectedTown, setSelectedTown] = useState('nakuru-cbd');

  const trustBadges = [
    'Fully Insured',
    'Background Checked Staff',
    'Eco-Friendly Chemicals',
    '100% Satisfaction Guarantee',
    'Same-Day Express Service',
  ];

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Jambo ${APEX_COMPANY_INFO.name}! I am located in ${LOCATIONS_LIST.find(l => l.slug === selectedTown)?.townName || 'Nakuru'} and would like an instant quote for my property.`);
    window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-[#18181B] text-white pt-2 sm:pt-4 lg:pt-6 pb-16 sm:pb-20 lg:pb-24 border-b border-zinc-800">
      {/* Background Hero Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/images/home/hero-banner.jpg"
          alt="Apex Clean Nakuru Home Hero"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-25 mix-blend-overlay"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#18181B] via-[#18181B]/95 to-[#18181B]/80" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column: Headline, Trust Badges, CTAs */}
          <div className="lg:col-span-7 space-y-7 text-center lg:text-left">
            
            {/* Main Headline */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-white leading-[1.08] tracking-tight font-sans"
            >
              Professional Cleaning Services in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
                Nakuru You Can Trust
              </span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              variants={itemVariants}
              className="text-base sm:text-lg text-zinc-300 font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed"
            >
              Residential, Commercial, Office, Airbnb & Post-Construction Hygiene Specialists serving Milimani, Lanet, Kiamunyi, and across Nakuru CBD.
            </motion.p>

            {/* Location Selector Bar for Localized Dispatch */}
            <motion.div
              variants={itemVariants}
              className="p-2.5 sm:p-3 rounded-[16px] bg-zinc-900/90 border border-zinc-800 max-w-xl mx-auto lg:mx-0 shadow-lg backdrop-blur-md"
            >
              <div className="flex flex-col sm:flex-row items-center gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 text-zinc-300 text-xs font-medium w-full sm:w-auto">
                  <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span className="shrink-0 font-bold uppercase tracking-wider text-[11px] text-white">Your Area:</span>
                </div>
                <select
                  value={selectedTown}
                  onChange={(e) => {
                    setSelectedTown(e.target.value);
                    onSelectLocation(e.target.value);
                  }}
                  className="w-full bg-zinc-800 border border-zinc-700 text-white rounded-[12px] text-xs font-semibold px-3 py-2.5 focus:ring-2 focus:ring-[#059669] focus:outline-none cursor-pointer"
                >
                  {LOCATIONS_LIST.map((loc) => (
                    <option key={loc.id} value={loc.slug}>
                      {loc.townName} ({loc.subCounty})
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => onSelectLocation(selectedTown)}
                  className="w-full sm:w-auto shrink-0 px-4 py-2.5 bg-[#059669] hover:bg-emerald-500 text-white rounded-[12px] text-xs font-semibold transition-all shadow-xs cursor-pointer"
                >
                  View Details
                </button>
              </div>
            </motion.div>

            {/* CTAs */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5 pt-1"
            >
              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenBooking}
                className="w-full sm:w-auto flex items-center justify-center bg-[#059669] text-white px-8 py-4 rounded-[14px] text-sm sm:text-base font-semibold shadow-lg hover:bg-emerald-500 transition-colors group cursor-pointer"
              >
                <Calendar className="w-4 h-4 mr-2 text-emerald-300" />
                <span>Get Instant Quote</span>
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleWhatsApp}
                className="w-full sm:w-auto flex items-center justify-center bg-zinc-800/80 border border-zinc-700 text-white px-7 py-4 rounded-[14px] text-sm sm:text-base font-semibold hover:bg-zinc-700 shadow-xs backdrop-blur-md transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4 mr-2 text-emerald-400" />
                <span>WhatsApp Now</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                onClick={onOpenCalculator}
                className="w-full sm:w-auto px-5 py-4 rounded-[14px] text-xs sm:text-sm font-semibold text-zinc-300 hover:text-white bg-zinc-800/50 hover:bg-zinc-800/80 border border-zinc-700/60 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-emerald-400" />
                <span>Calculator</span>
              </motion.button>
            </motion.div>

            {/* Trust Badges List */}
            <motion.div
              variants={itemVariants}
              className="pt-5 border-t border-zinc-800/80"
            >
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2.5 text-xs sm:text-sm font-medium text-zinc-300">
                {trustBadges.map((badge, idx) => (
                  <motion.span
                    key={idx}
                    whileHover={{ scale: 1.05 }}
                    className="flex items-center gap-2 cursor-default"
                  >
                    <CheckCircle2 className="w-4 h-4 text-[#10B981] shrink-0" />
                    <span>{badge}</span>
                  </motion.span>
                ))}
              </div>
            </motion.div>

          </div>

          {/* Right Column: Visual Feature Card & Real Proof Badge */}
          <motion.div
            variants={itemVariants}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Image Frame with Geometric Precision */}
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="relative rounded-[24px] overflow-hidden border border-zinc-700/80 shadow-2xl bg-zinc-900 p-2"
              >
                <img
                  src="/images/home/hero-cleaner.jpg"
                  alt="Apex Clean Nakuru Professional Team Cleaning Luxury Mansion"
                  referrerPolicy="no-referrer"
                  className="w-full h-[440px] object-cover rounded-[18px]"
                  loading="eager"
                />

                {/* Overlaid Live Dispatch Badge */}
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-6 left-6 bg-[#18181B]/90 backdrop-blur-xl border border-zinc-700 p-3 rounded-[16px] shadow-lg flex items-center gap-3"
                >
                  <div className="w-10 h-10 rounded-[12px] bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Clock className="w-5 h-5 animate-pulse" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold text-zinc-400 tracking-wider">Express Dispatch</p>
                    <p className="text-xs font-bold text-white">30 Mins Arrival in Nakuru</p>
                  </div>
                </motion.div>

                {/* Overlaid Rating Card */}
                <motion.div
                  animate={{ y: [0, 5, 0] }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute bottom-6 right-6 bg-[#18181B]/95 text-white backdrop-blur-xl border border-zinc-800 p-4 rounded-[16px] shadow-2xl max-w-xs space-y-2"
                >
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                    ))}
                    <span className="text-xs font-bold text-white ml-1">5.0 / 5.0</span>
                  </div>
                  <p className="text-[11px] text-zinc-300 italic leading-relaxed">
                    "Transformed our 4-bedroom villa in Milimani in 4 hours. Best service in Nakuru!"
                  </p>
                  <p className="text-[10px] font-semibold text-emerald-400">— Dr. Karanja, Milimani</p>
                </motion.div>
              </motion.div>

              {/* Floating Guarantee Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="absolute -bottom-6 -left-6 bg-[#18181B] text-white font-semibold px-4.5 py-3.5 rounded-[18px] shadow-xl border border-zinc-800 flex items-center gap-3"
              >
                <Award className="w-7 h-7 text-amber-400" />
                <div>
                  <p className="text-xs font-bold tracking-tight text-white">100% Quality Guarantee</p>
                  <p className="text-[11px] text-zinc-400 font-normal">Or We Re-Clean Free in 48 Hours</p>
                </div>
              </motion.div>

            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Bottom Feature / Pricing Grid in SaaS Bento Layout */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="mt-20 border-t border-zinc-800 bg-zinc-900/90 backdrop-blur-md grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
      >
        {[
          { title: 'KES 1,500+', subTitle: 'Residential Deep Clean', desc: 'Milimani & Section 58 premium home sanitization and dustproofing.', color: 'text-emerald-400' },
          { title: 'Concierge', subTitle: 'Office & Corporate', desc: 'Hospital-grade hygiene for Nakuru CBD headquarters & bank branches.', color: 'text-[#059669]' },
          { title: 'Turnover', subTitle: 'Airbnb Specialists', desc: 'Same-day linen change & turnover for Kiamunyi and Lanet hosts.', color: 'text-amber-400' },
          { title: '5.0 ★', subTitle: 'Google Reviews', desc: 'Based on 350+ verified local client testimonials across Nakuru.', color: 'text-emerald-400' },
        ].map((item, index) => (
          <motion.div
            key={index}
            whileHover={{ backgroundColor: 'rgba(39, 39, 42, 0.6)', y: -2 }}
            transition={{ duration: 0.2 }}
            className={`p-8 border-b sm:border-b-0 border-zinc-800 ${
              index < 3 ? 'sm:border-r' : ''
            } transition-colors cursor-default`}
          >
            <div className={`${item.color} font-extrabold mb-1.5 text-2xl tracking-tight uppercase`}>
              {item.title}
            </div>
            <h3 className="font-bold text-white text-xs uppercase tracking-wider mb-2 font-sans">
              {item.subTitle}
            </h3>
            <p className="text-xs text-zinc-300 leading-relaxed">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

