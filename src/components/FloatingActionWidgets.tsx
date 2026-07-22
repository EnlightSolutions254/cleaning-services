import React from 'react';
import { Phone, MessageSquare } from 'lucide-react';
import { APEX_COMPANY_INFO } from '../data/cleaningData';

export const FloatingActionWidgets: React.FC = () => {
  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Jambo ${APEX_COMPANY_INFO.name}! I am interested in booking a cleaning service.`);
    window.open(`https://wa.me/${APEX_COMPANY_INFO.whatsappNumber}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed bottom-5 left-5 sm:left-6 z-40 flex items-center gap-2.5">
      {/* Floating WhatsApp Action */}
      <button
        onClick={handleWhatsApp}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#10B981] hover:bg-emerald-600 text-white font-semibold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 group border border-emerald-400/30 cursor-pointer"
        title="Chat with Nakuru Team on WhatsApp"
      >
        <div className="w-6 h-6 rounded-full bg-white text-[#10B981] flex items-center justify-center font-bold shadow-xs">
          <MessageSquare className="w-3.5 h-3.5 fill-[#10B981]" />
        </div>
        <span className="hidden sm:inline font-sans">WhatsApp Nakuru</span>
        <span className="sm:hidden font-sans">WhatsApp</span>
      </button>

      {/* Sticky Call Button */}
      <a
        href={`tel:${APEX_COMPANY_INFO.phone}`}
        className="flex items-center gap-2 px-4 py-3 rounded-full bg-[#18181B] hover:bg-zinc-800 text-white font-semibold text-xs shadow-lg transition-all hover:scale-105 active:scale-95 border border-zinc-700/80"
        title="Call Nakuru Hotline"
      >
        <Phone className="w-3.5 h-3.5 text-emerald-400" />
        <span className="hidden sm:inline font-sans">{APEX_COMPANY_INFO.phone}</span>
        <span className="sm:hidden font-sans">Call</span>
      </a>
    </div>
  );
};
