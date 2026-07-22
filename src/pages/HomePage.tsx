import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { SERVICES_LIST, LOCATIONS_LIST } from '../data/cleaningData';
import { ArrowRight, Calculator, MapPin, Calendar } from 'lucide-react';

interface HomePageProps {
  onOpenBooking: (serviceId?: string, town?: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenBooking }) => {
  const navigate = useNavigate();

  return (
    <div className="space-y-16 pb-12">
      {/* 1. Hero Section */}
      <HeroSection
        onOpenBooking={() => onOpenBooking()}
        onOpenCalculator={() => navigate('/calculator')}
        onSelectLocation={(townSlug) => {
          navigate(`/locations?town=${townSlug}`);
        }}
      />

      {/* 2. Key Social Proof Metrics */}
      <StatsSection />

      {/* 3. Featured Services Overview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div className="space-y-2">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-sans tracking-tight">
              Top Cleaning Services in Nakuru
            </h2>
            <p className="text-slate-600 text-sm max-w-2xl">
              From residential deep cleans to corporate office maintenance & Airbnb turnovers.
            </p>
          </div>

          <Link
            to="/services"
            className="inline-flex items-center gap-2 font-bold text-sm text-emerald-600 hover:text-emerald-700 transition-colors group shrink-0"
          >
            <span>View All Services</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Services Showcase Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {SERVICES_LIST.slice(0, 3).map((service) => (
            <motion.div
              key={service.id}
              variants={{
                hidden: { opacity: 0, y: 30, scale: 0.98 },
                visible: {
                  opacity: 1,
                  y: 0,
                  scale: 1,
                  transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                },
              }}
              whileHover={{ y: -8, transition: { duration: 0.25 } }}
              className="bg-white rounded-3xl border border-slate-200 p-6 shadow-md hover:shadow-2xl transition-shadow flex flex-col justify-between group cursor-default"
            >
              <div className="space-y-4">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-slate-100">
                  <img
                    src={service.imageUrl}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out"
                  />
                  <span className="absolute top-3 left-3 bg-emerald-600 text-white font-extrabold text-[10px] px-2.5 py-1 rounded-full uppercase tracking-wider shadow-sm">
                    {service.category}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-500">{service.estimatedTime}</span>
                    <span className="text-emerald-700 font-black text-sm">
                      KSh {service.priceStartingKsh.toLocaleString()}+
                    </span>
                  </div>

                  <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-emerald-600 transition-colors">
                    {service.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>

              <div className="pt-6 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <Link
                  to="/services"
                  className="text-xs font-bold text-slate-700 hover:text-emerald-600 transition-colors"
                >
                  Learn More
                </Link>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => onOpenBooking(service.id)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold shadow-sm flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Book Now</span>
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* 4. Instant Price Estimator Teaser Banner */}
      <motion.section
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-slate-900 text-white rounded-3xl p-8 sm:p-10 border border-slate-800 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 group">
          <div className="space-y-3 text-center lg:text-left z-10">
            <span className="bg-emerald-500 text-slate-950 font-black text-[10px] px-3 py-1 rounded-full uppercase tracking-wider">
              Transparent KSh Pricing
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-sans">
              Calculate Your Custom Cleaning Estimate Online
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 max-w-xl">
              Get an immediate quote tailored to bedrooms, sofa seats, water tank sizes & Nakuru estate locations.
            </p>
          </div>

          <div className="z-10 shrink-0">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/calculator"
                className="px-8 py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-sm shadow-xl flex items-center gap-2 transition-colors"
              >
                <Calculator className="w-5 h-5" />
                <span>Launch Price Calculator</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* 5. Before & After Transformation Slider */}
      <BeforeAfterSlider />

      {/* 6. Service Areas Preview */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
      >
        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-extrabold text-slate-900 font-sans">
              Serving All Towns Across Nakuru County
            </h2>
            <p className="text-xs text-slate-600 max-w-lg mx-auto">
              Fast, same-day cleaning team dispatch with full equipment and certified Supervisors.
            </p>
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.05 },
              },
            }}
            className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3"
          >
            {LOCATIONS_LIST.slice(0, 8).map((loc) => (
              <motion.button
                key={loc.id}
                variants={{
                  hidden: { opacity: 0, y: 15 },
                  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
                }}
                whileHover={{ y: -4, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => navigate(`/locations?town=${loc.slug}`)}
                className="p-3 bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-2xl text-center space-y-1 transition-colors shadow-2xs group cursor-pointer"
              >
                <MapPin className="w-4 h-4 text-emerald-600 mx-auto group-hover:scale-110 transition-transform" />
                <p className="font-extrabold text-slate-900 text-xs">{loc.townName}</p>
                <p className="text-[10px] text-slate-500">{loc.deliveryTime}</p>
              </motion.button>
            ))}
          </motion.div>

          <div className="text-center pt-2">
            <Link
              to="/locations"
              className="inline-flex items-center gap-1.5 font-bold text-xs text-emerald-700 hover:underline"
            >
              <span>Explore All Nakuru Sub-Counties & Estates</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </motion.section>
    </div>
  );
};


