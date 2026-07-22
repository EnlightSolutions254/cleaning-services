import React from 'react';
import { motion } from 'motion/react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';
import { Home, Building, Star, Award } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: `${APEX_COMPANY_INFO.homesCleaned.toLocaleString()}+`,
      label: 'Nakuru Homes Cleaned',
      subtext: 'Residential & Serviced Apartments',
      icon: Home,
      color: 'text-[#2563EB] bg-blue-50 border-blue-100',
    },
    {
      value: `${APEX_COMPANY_INFO.commercialClients}+`,
      label: 'Commercial & Office Contracts',
      subtext: 'CBD Banks, Law Firms & Hotels',
      icon: Building,
      color: 'text-[#2563EB] bg-blue-50 border-blue-100',
    },
    {
      value: `${APEX_COMPANY_INFO.googleRating} ★`,
      label: 'Google Review Score',
      subtext: `Based on ${APEX_COMPANY_INFO.reviewCount} Verified Reviews`,
      icon: Star,
      color: 'text-amber-500 bg-amber-50 border-amber-200',
    },
    {
      value: APEX_COMPANY_INFO.satisfactionRate,
      label: 'Customer Retention Rate',
      subtext: 'Repeat Monthly & Weekly Clients',
      icon: Award,
      color: 'text-[#10B981] bg-emerald-50 border-emerald-100',
    },
  ];

  return (
    <section className="py-12 bg-white border-b border-slate-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.1 },
            },
          }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={idx}
                variants={{
                  hidden: { opacity: 0, y: 24, scale: 0.95 },
                  visible: {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                  },
                }}
                whileHover={{ y: -4, scale: 1.02 }}
                className="p-5 rounded-[16px] bg-slate-50/80 border border-slate-200/80 hover:border-blue-300 transition-shadow duration-300 hover:shadow-lg cursor-default"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-[12px] border ${stat.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <p className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight font-sans">
                    {stat.value}
                  </p>
                </div>
                <h3 className="text-xs sm:text-sm font-bold text-[#0F172A]">{stat.label}</h3>
                <p className="text-[11px] text-[#64748B] font-medium mt-0.5">{stat.subtext}</p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

