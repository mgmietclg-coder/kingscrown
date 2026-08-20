import React from 'react';
import { Calendar, Phone, MessageSquare, Sparkles } from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface ReservationCTAProps {
  onOpenReservation: () => void;
}

export const ReservationCTASection: React.FC<ReservationCTAProps> = ({ onOpenReservation }) => {
  return (
    <section
      id="reservation-cta"
      className="relative py-24 sm:py-32 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 overflow-hidden text-center"
    >
      {/* Background Subtle Luxury Ambience Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1800&auto=format&fit=crop"
          alt="Atmosphere at King's Crown"
          className="w-full h-full object-cover object-center opacity-10 filter brightness-40 contrast-125"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/85 to-[#0A0A0A]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        {/* Official King's Crown Crest */}
        <div className="w-14 h-14 p-2 bg-[#111111] border border-[#C5A059] flex items-center justify-center mb-6 shadow-xl">
          <KingsCrownLogo className="w-full h-full" />
        </div>

        {/* Headline */}
        <h2
          id="reservation-cta-headline"
          className="font-serif text-3xl sm:text-5xl md:text-6xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase leading-tight max-w-3xl"
        >
          YOUR TABLE IS{' '}
          <span className="italic text-[#C5A059]">
            WAITING.
          </span>
        </h2>

        {/* Supporting Copy */}
        <p
          id="reservation-cta-copy"
          className="mt-4 sm:mt-6 text-base sm:text-xl text-[#F5F5F0]/80 font-light max-w-xl"
        >
          Make your next meal more memorable.
        </p>

        <p className="mt-2 text-xs sm:text-sm text-[#C5A059]/90 tracking-widest uppercase font-light">
          Rupali Arcade, Level 4 • Chinsurah R.S.
        </p>

        {/* 3 High-Visibility Action Buttons */}
        <div className="mt-10 sm:mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-2xl">
          {/* Primary: Reserve a Table */}
          <button
            onClick={onOpenReservation}
            id="cta-reserve-table-btn"
            className="w-full sm:flex-1 py-4 sm:py-5 px-8 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs sm:text-sm tracking-[0.22em] uppercase transition-all duration-300 shadow-2xl flex items-center justify-center gap-3"
          >
            <Calendar className="w-4 h-4 text-black" />
            <span>RESERVE A TABLE</span>
          </button>

          {/* Secondary: Call Us */}
          <a
            href={`tel:${RESTAURANT_INFO.phone}`}
            id="cta-call-us-btn"
            className="w-full sm:w-auto py-4 sm:py-5 px-7 bg-[#111111] hover:bg-[#C5A059] text-[#C5A059] hover:text-black border border-[#C5A059] font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap"
          >
            <Phone className="w-4 h-4 text-[#C5A059]" />
            <span>CALL US</span>
          </a>

          {/* Tertiary: WhatsApp Us */}
          <a
            href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Kings'%20Crown%20Chinsurah,%20I%20would%20like%20to%20reserve%20a%20table.`}
            target="_blank"
            rel="noopener noreferrer"
            id="cta-whatsapp-us-btn"
            className="w-full sm:w-auto py-4 sm:py-5 px-7 bg-[#141414] hover:bg-emerald-950 text-emerald-300 hover:text-emerald-100 border border-emerald-500/40 hover:border-emerald-400 font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 flex items-center justify-center gap-2.5 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4 text-emerald-400" />
            <span>WHATSAPP US</span>
          </a>
        </div>

        {/* Small Notice */}
        <div className="mt-8 text-xs text-[#F5F5F0]/50 tracking-wider font-light">
          For large celebrations, private birthday decks, or corporate dinners, call or WhatsApp directly.
        </div>
      </div>
    </section>
  );
};
