import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { Sparkles, Phone, MessageSquare, Calendar, ShieldCheck, MapPin, UserCheck, Menu, X, ChevronRight } from 'lucide-react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';
import { useLogoUrl } from '../utils/logoManager';

interface NavbarProps {
  onOpenBooking: (serviceId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenBooking,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { logoUrl } = useLogoUrl();
  const navigate = useNavigate();

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'Calculator', path: '/calculator' },
    { label: 'Before & After', path: '/transformations', hideOnDesktop: true },
    { label: 'Locations', path: '/locations' },
    { label: 'Industries', path: '/industries', hideOnDesktop: true },
    { label: 'About', path: '/about' },
    { label: 'Reviews', path: '/reviews', hideOnDesktop: true },
    { label: 'Blog', path: '/blog' },
    { label: 'FAQ', path: '/faq', hideOnDesktop: true },
    { label: 'Contact', path: '/contact' },
  ];

  const desktopNavLinks = navLinks.filter((link) => !link.hideOnDesktop);

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent(`Jambo ${APEX_COMPANY_INFO.name}! I would like to inquire about cleaning services in Nakuru County.`);
    window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-white/85 border-b border-zinc-200/80 transition-all shadow-xs">
      {/* Top Bar for Nakuru Hotline & Trust Info */}
      <div className="hidden md:block bg-[#18181B] text-zinc-300 py-2 px-4 text-xs font-medium border-b border-zinc-800">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-emerald-400">
              <MapPin className="w-3.5 h-3.5 text-emerald-400" />
              <span className="text-zinc-300">Serving Nakuru CBD, Milimani, Kiamunyi, Section 58, Naivasha & All County</span>
            </span>
            <span className="flex items-center gap-1.5 text-zinc-300">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />
              <span>100% Insured & DCI Background Checked Staff</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-zinc-400">M-Pesa Till: <strong className="text-white font-semibold">{APEX_COMPANY_INFO.mpesaTill}</strong></span>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="w-11 h-11 bg-white rounded-[14px] p-0.5 flex items-center justify-center shadow-md shadow-zinc-900/10 group-hover:scale-105 transition-all duration-300 border border-zinc-200/80 overflow-hidden shrink-0">
            {!imageError ? (
              <img
                src={logoUrl}
                alt={APEX_COMPANY_INFO.name}
                onError={() => setImageError(true)}
                className="w-full h-full object-cover rounded-[12px]"
              />
            ) : (
              <div className="w-full h-full bg-[#18181B] rounded-[12px] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
              </div>
            )}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-[#18181B] font-sans">
                Jokulu<span className="text-[#059669]"> Cleaning</span>
              </span>
              <span className="bg-emerald-50 border border-emerald-100 text-[#059669] text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                NAKURU
              </span>
            </div>
            <p className="text-[10px] text-zinc-500 font-medium tracking-wide uppercase -mt-0.5 hidden sm:block">
              Professional Cleaning Services
            </p>
          </div>
        </Link>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
          {desktopNavLinks.map((link) => (
            <NavLink
              key={link.label}
              to={link.path}
              className={({ isActive }) =>
                `text-xs font-semibold transition-all py-2 px-2.5 xl:px-3 rounded-[12px] whitespace-nowrap ${
                  isActive
                    ? 'text-[#059669] bg-emerald-50/80 font-bold'
                    : 'text-zinc-600 hover:text-[#18181B] hover:bg-zinc-100/80'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="hidden sm:flex items-center gap-2.5">
          <span className="text-[#18181B] font-semibold text-xs hidden lg:block bg-zinc-100/80 border border-zinc-200/80 px-3.5 py-2 rounded-[14px]">
            {APEX_COMPANY_INFO.phone}
          </span>

          <button
            onClick={handleWhatsAppClick}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-[14px] text-xs font-semibold text-zinc-700 bg-white hover:bg-zinc-50 border border-zinc-200 shadow-2xs hover:shadow-xs transition-all duration-300 cursor-pointer"
            title="Chat with Nakuru Office on WhatsApp"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#059669]" />
            <span>WhatsApp</span>
          </button>

          <button
            onClick={() => onOpenBooking()}
            className="bg-[#18181B] text-white px-5 py-2 rounded-[14px] text-xs font-semibold shadow-sm hover:bg-[#059669] active:scale-98 transition-all duration-300 flex items-center gap-1.5 cursor-pointer"
          >
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>Book Online</span>
          </button>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2 rounded-[12px] text-zinc-700 hover:bg-zinc-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-zinc-200 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top duration-200 shadow-xl">
          <div className="flex flex-col gap-1 pb-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.label}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-3.5 py-2.5 rounded-[12px] font-semibold text-sm flex items-center justify-between transition-colors ${
                    isActive
                      ? 'bg-[#059669] text-white'
                      : 'text-zinc-800 hover:bg-zinc-100'
                  }`
                }
              >
                <span>{link.label}</span>
                <ChevronRight className="w-4 h-4 opacity-70" />
              </NavLink>
            ))}
          </div>

          <div className="pt-2 border-t border-zinc-100 space-y-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-[14px] font-semibold text-sm text-white bg-[#18181B] shadow-sm hover:bg-[#059669] transition-colors"
            >
              <Calendar className="w-4 h-4 text-emerald-400" />
              <span>Book Online (Instant Confirmation)</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleWhatsAppClick();
                }}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-[14px] font-semibold text-xs text-zinc-800 bg-white border border-zinc-200"
              >
                <MessageSquare className="w-4 h-4 text-[#059669]" />
                <span>WhatsApp</span>
              </button>
              <a
                href={`tel:${APEX_COMPANY_INFO.phone}`}
                className="flex items-center justify-center gap-1.5 py-2.5 rounded-[14px] font-semibold text-xs text-zinc-700 bg-zinc-100 border border-zinc-200"
              >
                <Phone className="w-4 h-4 text-zinc-600" />
                <span>Call Hotline</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

