import React, { useState } from 'react';
import { OCCASIONS } from '../data/restaurantData';
import { OccasionItem } from '../types';
import { Sparkles, Users, Calendar, ArrowRight, Check } from 'lucide-react';

interface OccasionsSectionProps {
  onOpenReservationWithOccasion: (occasionTitle: string) => void;
}

export const OccasionsSection: React.FC<OccasionsSectionProps> = ({
  onOpenReservationWithOccasion
}) => {
  const [activeOccasion, setActiveOccasion] = useState<OccasionItem | null>(null);

  return (
    <section id="occasions" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
            GATHERINGS & MILESTONES
          </span>
          <h2
            id="occasions-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            MADE FOR YOUR MOMENTS.
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light">
            Whether an intimate candlelit celebration or a grand 50-guest banquet, we tailor every detail with royal care.
          </p>
        </div>

        {/* 6 Cinematic Occasion Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {OCCASIONS.map((occ) => (
            <div
              key={occ.id}
              id={`occasion-card-${occ.id}`}
              className="group relative bg-[#111111] border border-[#F5F5F0]/10 hover:border-[#C5A059]/60 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:-translate-y-1.5 shadow-xl"
            >
              {/* Image with subtle zoom */}
              <div className="relative h-52 sm:h-56 overflow-hidden">
                <img
                  src={occ.image}
                  alt={occ.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-85"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Capacity badge */}
                <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-[#C5A059]/30 px-3 py-1 text-[9px] font-semibold text-[#C5A059] uppercase tracking-wider flex items-center gap-1.5">
                  <Users className="w-3 h-3 text-[#C5A059]" />
                  <span>{occ.capacity}</span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase mb-1">
                    {occ.subtitle}
                  </div>

                  <h3 className="font-serif text-xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase group-hover:text-[#C5A059] transition-colors">
                    {occ.title}
                  </h3>

                  <p className="mt-3 text-xs text-[#F5F5F0]/75 leading-relaxed font-light">
                    {occ.description}
                  </p>

                  {/* Perks list */}
                  <div className="mt-4 pt-4 border-t border-[#F5F5F0]/10 space-y-1.5">
                    {occ.perks.map((perk, i) => (
                      <div key={i} className="flex items-center gap-2 text-xs text-[#F5F5F0]/70 font-light">
                        <Check className="w-3 h-3 text-[#C5A059] shrink-0" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Trigger */}
                <div className="mt-6 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                  <span className="text-[9px] text-[#C5A059] uppercase font-semibold tracking-wider">
                    {occ.recommendedSeating}
                  </span>

                  <button
                    onClick={() => onOpenReservationWithOccasion(occ.title)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-[#C5A059] hover:text-[#D4AF37] uppercase"
                  >
                    <span>BOOK THIS</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
