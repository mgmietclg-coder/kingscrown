import React from 'react';
import { Calendar, Phone, MessageSquare, Bookmark, Crown } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MustTryItem } from '../types';

interface MobileStickyBarProps {
  onOpenReservation: () => void;
  onOpenMustTry: () => void;
  mustTryItems: MustTryItem[];
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  onOpenReservation,
  onOpenMustTry,
  mustTryItems
}) => {
  return (
    <div
      id="mobile-sticky-action-bar"
      className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0A0A0A]/95 backdrop-blur-lg border-t border-[#C5A059]/40 p-2.5 px-3 flex items-center justify-between gap-2 shadow-2xl"
    >
      {/* Call Button */}
      <a
        href={`tel:${RESTAURANT_INFO.phone}`}
        id="mobile-sticky-call-btn"
        className="flex-1 py-2.5 bg-[#111111] border border-[#C5A059]/30 text-[#C5A059] font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5"
      >
        <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
        <span>CALL</span>
      </a>

      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Kings'%20Crown%20Chinsurah`}
        target="_blank"
        rel="noopener noreferrer"
        id="mobile-sticky-whatsapp-btn"
        className="flex-1 py-2.5 bg-[#141414] border border-emerald-500/40 text-emerald-300 font-semibold text-[11px] tracking-wider uppercase flex items-center justify-center gap-1.5"
      >
        <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
        <span>WHATSAPP</span>
      </a>

      {/* Primary Table Booking Button */}
      <button
        onClick={onOpenReservation}
        id="mobile-sticky-reserve-btn"
        className="flex-[1.8] py-2.5 bg-gradient-to-r from-[#C5A059] via-[#F3E5AB] to-[#C5A059] text-black font-extrabold text-[11px] tracking-[0.18em] uppercase flex items-center justify-center gap-1.5 shadow-[0_0_16px_rgba(197,160,89,0.5)] border border-[#FFF8DC]/70 active:scale-95 transition-transform"
      >
        <Crown className="w-3.5 h-3.5 text-black fill-black/30" />
        <span>BOOK A TABLE</span>
      </button>
    </div>
  );
};
