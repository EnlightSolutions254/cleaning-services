import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, ShieldCheck } from 'lucide-react';

interface PageHeroProps {
  badgeText?: string;
  title: string;
  highlightText?: string;
  subtitle: string;
  backgroundImageUrl: string;
  primaryCta?: {
    text: string;
    onClick?: () => void;
    to?: string;
    icon?: React.ReactNode;
  };
  secondaryCta?: {
    text: string;
    onClick?: () => void;
    to?: string;
    icon?: React.ReactNode;
  };
  stats?: Array<{
    value: string;
    label: string;
  }>;
}

export const PageHero: React.FC<PageHeroProps> = ({
  badgeText,
  title,
  highlightText,
  subtitle,
  backgroundImageUrl,
  primaryCta,
  secondaryCta,
  stats,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="relative overflow-hidden rounded-[24px] bg-[#18181B] text-white shadow-xl mb-10 border border-zinc-800"
    >
      {/* Background Image with Dark Gradient Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={backgroundImageUrl}
          alt={title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-80 brightness-100 scale-105 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#18181B]/85 via-[#18181B]/55 to-[#18181B]/20" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 px-6 sm:px-10 pt-6 pb-10 sm:pt-8 sm:pb-12 lg:pt-10 lg:pb-14 max-w-5xl space-y-6">
        
        {/* Top Badge */}
        {badgeText && (
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-amber-400 text-xs font-semibold uppercase tracking-wider backdrop-blur-md"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>{badgeText}</span>
          </motion.div>
        )}

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-sans text-white leading-[1.12]"
        >
          {title}{' '}
          {highlightText && (
            <span className="text-emerald-400">
              {highlightText}
            </span>
          )}
        </motion.h1>

        {/* Subtitle Description */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-sm sm:text-base lg:text-lg text-zinc-300 font-normal leading-relaxed max-w-2xl"
        >
          {subtitle}
        </motion.p>

        {/* CTA Buttons */}
        {(primaryCta || secondaryCta) && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.5 }}
            className="flex flex-wrap items-center gap-3.5 pt-2"
          >
            {primaryCta && (
              primaryCta.to ? (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={primaryCta.to}
                    className="px-6 py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 group"
                  >
                    {primaryCta.icon}
                    <span>{primaryCta.text}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={primaryCta.onClick}
                  className="px-6 py-3.5 rounded-[12px] bg-[#059669] hover:bg-emerald-500 text-white font-semibold text-xs sm:text-sm shadow-md transition-colors flex items-center gap-2 group cursor-pointer"
                >
                  {primaryCta.icon}
                  <span>{primaryCta.text}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              )
            )}

            {secondaryCta && (
              secondaryCta.to ? (
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    to={secondaryCta.to}
                    className="px-6 py-3.5 rounded-[12px] bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors flex items-center gap-2"
                  >
                    {secondaryCta.icon}
                    <span>{secondaryCta.text}</span>
                  </Link>
                </motion.div>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={secondaryCta.onClick}
                  className="px-6 py-3.5 rounded-[12px] bg-zinc-800/80 hover:bg-zinc-700/80 border border-zinc-700 text-white font-semibold text-xs sm:text-sm backdrop-blur-md transition-colors flex items-center gap-2 cursor-pointer"
                >
                  {secondaryCta.icon}
                  <span>{secondaryCta.text}</span>
                </motion.button>
              )
            )}
          </motion.div>
        )}

        {/* Bottom Quick Stats or Trust Indicators */}
        {stats && stats.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="pt-6 border-t border-zinc-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4"
          >
            {stats.map((st, i) => (
              <div key={i} className="space-y-0.5">
                <p className="text-xl sm:text-2xl font-extrabold text-emerald-400">{st.value}</p>
                <p className="text-[11px] text-zinc-400 font-medium">{st.label}</p>
              </div>
            ))}
          </motion.div>
        )}

      </div>
    </motion.div>
  );
};

