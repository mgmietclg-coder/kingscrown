import React, { useState } from 'react';
import { SIGNATURE_DISHES } from '../data/restaurantData';
import { SignatureDish, MustTryItem, MenuItem } from '../types';
import { Crown, Sparkles, Bookmark, Check, Clock, Wine, Flame, ChevronRight } from 'lucide-react';

interface SignatureShowcaseProps {
  onToggleMustTry: (item: MenuItem | SignatureDish) => void;
  mustTryItems: MustTryItem[];
  onOpenReservation: () => void;
}

export const SignatureShowcaseSection: React.FC<SignatureShowcaseProps> = ({
  onToggleMustTry,
  mustTryItems,
  onOpenReservation
}) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentDish = SIGNATURE_DISHES[activeIdx];
  const isSaved = mustTryItems.some((item) => item.id === currentDish.id);

  return (
    <section id="signature" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative overflow-hidden">
      {/* Background Subtle Luxury Glow */}
      <div className="absolute -top-24 right-0 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase mb-3">
            <Crown className="w-4 h-4" />
            <span>CULINARY MASTERPIECES</span>
          </div>
          <h2
            id="signature-dishes-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            SIGNATURE CREATIONS
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light">
            Celebrated by critics and adored by guests — the marquee dishes that define the KINGS' CROWN dining experience.
          </p>
        </div>

        {/* Tab Navigation for 4 Signatures */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {SIGNATURE_DISHES.map((dish, idx) => (
            <button
              key={dish.id}
              onClick={() => setActiveIdx(idx)}
              id={`sig-tab-${idx}`}
              className={`px-4 sm:px-6 py-2.5 sm:py-3 text-xs font-serif font-bold tracking-[0.1em] uppercase transition-all duration-300 ${
                activeIdx === idx
                  ? 'bg-[#C5A059] text-black shadow-lg'
                  : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40'
              }`}
            >
              {dish.name.split(' ')[0]} {dish.name.split(' ')[1] || ''}
            </button>
          ))}
        </div>

        {/* Cinematic Main Showcase Banner */}
        <div
          id="signature-spotlight-card"
          className="bg-[#111111] border border-[#C5A059]/40 overflow-hidden shadow-2xl transition-all duration-500 grid grid-cols-1 lg:grid-cols-12"
        >
          {/* Large Image Column */}
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-[480px] overflow-hidden group">
            <img
              src={currentDish.image}
              alt={currentDish.name}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-[#111111]" />

            {/* Floating Tag */}
            <div className="absolute top-4 left-4 bg-black/80 backdrop-blur-md border border-[#C5A059]/40 px-3 py-1.5">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#C5A059]" />
                {currentDish.tag}
              </span>
            </div>

            {/* Price Badge on Mobile/Image */}
            <div className="absolute bottom-4 left-4 bg-[#C5A059] text-black px-4 py-1.5 font-serif font-bold text-lg shadow-lg">
              ₹{currentDish.price}
            </div>
          </div>

          {/* Editorial Content Column */}
          <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase mb-2">
                MARQUEE FLAVOUR PROFILE
              </div>

              <h3 className="font-serif text-2xl sm:text-3xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase">
                {currentDish.name}
              </h3>

              <div className="w-12 h-[1px] bg-[#C5A059] my-4" />

              <p className="text-sm sm:text-base text-[#F5F5F0]/85 font-light leading-relaxed mb-4">
                {currentDish.description}
              </p>

              <p className="text-xs text-[#F5F5F0]/70 leading-relaxed italic bg-[#0A0A0A] p-3 border-l border-[#C5A059] mb-6">
                "{currentDish.detailedProfile}"
              </p>

              {/* Flavor tags */}
              <div className="space-y-3 mb-6">
                <span className="text-[10px] tracking-[0.2em] uppercase text-[#C5A059] font-semibold block">
                  Tasting Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentDish.flavorNotes.map((note, i) => (
                    <span
                      key={i}
                      className="text-xs px-2.5 py-1 bg-[#161616] border border-[#F5F5F0]/10 text-[#F5F5F0]/90 font-light"
                    >
                      ✦ {note}
                    </span>
                  ))}
                </div>
              </div>

              {/* Pairing Recommendation */}
              <div className="flex items-start gap-2.5 text-xs text-[#F5F5F0]/80 pt-2 border-t border-[#F5F5F0]/10">
                <Wine className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>
                  <strong className="text-[#C5A059]">Chef's Pairing:</strong> {currentDish.pairingNotes}
                </span>
              </div>
            </div>

            {/* Actions Bar */}
            <div className="mt-8 pt-6 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row items-center gap-3">
              <button
                onClick={() => onToggleMustTry(currentDish)}
                id="sig-add-must-try-btn"
                className={`w-full sm:flex-1 py-3.5 px-4 text-xs font-bold tracking-[0.2em] uppercase transition-all flex items-center justify-center gap-2 ${
                  isSaved
                    ? 'bg-[#C5A059] text-black'
                    : 'bg-[#161616] text-[#C5A059] hover:bg-[#C5A059] hover:text-black border border-[#C5A059]/40'
                }`}
              >
                {isSaved ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>ADDED TO MUST-TRY LIST</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-4 h-4 text-[#C5A059]" />
                    <span>ADD TO MUST-TRY LIST</span>
                  </>
                )}
              </button>

              <button
                onClick={onOpenReservation}
                id="sig-reserve-table-btn"
                className="w-full sm:w-auto py-3.5 px-6 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] uppercase transition-all whitespace-nowrap"
              >
                RESERVE A TABLE
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
