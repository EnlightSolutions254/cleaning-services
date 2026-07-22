import React, { useState } from 'react';
import { Phone, MessageSquare, MapPin, Mail, Clock, Send, CheckCircle2, ShieldCheck } from 'lucide-react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';
import { PageHero } from '../components/PageHero';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    estate: 'Milimani',
    service: 'Sofa Deep Cleaning',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleWhatsAppClick = () => {
    const text = encodeURIComponent('Jambo Jokulu Cleaning Services! I would like to make an inquiry.');
    window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="pt-2 pb-8 space-y-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header Hero */}
      <PageHero
        title="Contact Jokulu Cleaning Services"
        highlightText="Nakuru"
        subtitle="Reach our Nakuru dispatch center 7 days a week. We respond within 5 minutes on WhatsApp or phone."
        backgroundImageUrl="/images/about/team-office.jpg"
        primaryCta={{
          text: "WhatsApp Us Now",
          onClick: handleWhatsAppClick,
          icon: <MessageSquare className="w-4 h-4" />
        }}
        stats={[
          { value: "5 Mins", label: "WhatsApp Response" },
          { value: "7 Days", label: "Weekly Service" },
          { value: "Nakuru CBD", label: "Main Office" },
          { value: "24/7", label: "Emergency Line" }
        ]}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Information & Quick Actions */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-slate-900 text-white rounded-3xl p-8 space-y-6 border border-slate-800 shadow-xl">
            <h2 className="text-2xl font-extrabold font-sans text-emerald-400">
              Nakuru Headquarters
            </h2>

            <div className="space-y-4 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Physical Office Address</p>
                  <p className="text-slate-300">Kenyatta Avenue Plaza, 2nd Floor, Suite 204</p>
                  <p className="text-slate-400">Nakuru CBD, Kenya</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Hotline & Phone</p>
                  <p className="text-slate-300 font-bold">{APEX_COMPANY_INFO.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <MessageSquare className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Direct WhatsApp</p>
                  <button
                    onClick={handleWhatsAppClick}
                    className="text-emerald-400 font-bold hover:underline cursor-pointer"
                  >
                    +{APEX_COMPANY_INFO.whatsappNumber} (Instant Chat)
                  </button>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Email Address</p>
                  <p className="text-slate-300">{APEX_COMPANY_INFO.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold text-white">Working Hours</p>
                  <p className="text-slate-300">Monday - Sunday: 6:30 AM - 8:30 PM</p>
                  <p className="text-emerald-400 font-semibold">24/7 Emergency & Commercial Shift Available</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-xs text-slate-400 flex items-center justify-between">
              <span>M-Pesa Buy Goods Till:</span>
              <strong className="text-white text-sm bg-slate-800 px-3 py-1 rounded-lg border border-slate-700">
                {APEX_COMPANY_INFO.mpesaTill}
              </strong>
            </div>
          </div>
        </div>

        {/* Interactive Inquiry Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-slate-200 shadow-md">
          {submitted ? (
            <div className="text-center py-12 space-y-4">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-extrabold text-slate-900 font-sans">
                Inquiry Received!
              </h3>
              <p className="text-slate-600 text-sm max-w-md mx-auto">
                Thank you, <strong className="text-slate-900">{formData.name}</strong>. Our Nakuru supervisor will call you on <strong className="text-slate-900">{formData.phone}</strong> within 10 minutes.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="px-6 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h2 className="text-xl font-extrabold text-slate-900 font-sans">
                Send Us a Quick Message
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Jane Wanjiru"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (M-Pesa)</label>
                  <input
                    type="tel"
                    required
                    placeholder="07XX XXX XXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Your Estate / Location</label>
                  <select
                    value={formData.estate}
                    onChange={(e) => setFormData({ ...formData, estate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Milimani">Milimani</option>
                    <option value="Kiamunyi">Kiamunyi</option>
                    <option value="Section 58">Section 58</option>
                    <option value="Lanet">Lanet</option>
                    <option value="Naivasha">Naivasha</option>
                    <option value="Gilgil">Gilgil</option>
                    <option value="Njoro">Njoro</option>
                    <option value="Nakuru CBD">Nakuru CBD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Service Required</label>
                  <select
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
                  >
                    <option value="Sofa Deep Cleaning">Sofa Deep Cleaning</option>
                    <option value="Carpet & Rug Wash">Carpet & Rug Wash</option>
                    <option value="Residential Deep Clean">Residential Deep Clean</option>
                    <option value="Airbnb Turnover">Airbnb Turnover</option>
                    <option value="Water Tank Cleaning">Water Tank Cleaning</option>
                    <option value="Commercial Office">Commercial Office</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Details or Special Request</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about the number of seats, rooms, or urgency..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm shadow-md flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
