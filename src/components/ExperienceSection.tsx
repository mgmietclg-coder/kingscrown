import React, { useState } from 'react';
import { EXPERIENCES } from '../data/restaurantData';
import { ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { ExperienceItem } from '../types';

interface ExperienceSectionProps {
  onOpenReservation: () => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onOpenReservation }) => {
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  return (
    <section id="experience" className="py-20 sm:py-28 bg-[#0A0A0A] relative border-b border-[#F5F5F0]/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
            HOSPITALITY DEFINED
          </span>
          <h2
            id="experience-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            THE KINGS' CROWN EXPERIENCE
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light leading-relaxed">
            Every element from our culinary curation to rooftop breezes is engineered for memorable moments.
          </p>
        </div>

        {/* 4 Large Editorial Experience Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {EXPERIENCES.map((item) => (
            <div
              key={item.id}
              id={`experience-card-${item.id}`}
              className="group relative bg-[#111111] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 overflow-hidden transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-2xl flex flex-col justify-between"
            >
              {/* Background Ambient Image Overlay */}
              <div className="relative h-56 sm:h-64 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105 filter brightness-85 contrast-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-[#111111]/40 to-transparent" />

                {/* Big Editorial Number */}
                <div className="absolute top-4 left-6">
                  <span className="font-serif italic text-4xl sm:text-5xl font-bold text-[#C5A059] opacity-40 group-hover:opacity-100 transition-opacity tracking-tighter">
                    {item.number}
                  </span>
                </div>

                {/* Badge */}
                <div className="absolute top-4 right-4">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-[#F5F5F0] bg-black/80 backdrop-blur-md px-3 py-1 border border-[#C5A059]/30 uppercase">
                    {item.highlight}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-[10px] font-semibold tracking-[0.25em] text-[#C5A059] uppercase mb-1.5">
                    {item.subtitle}
                  </div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-xs sm:text-sm text-[#F5F5F0]/75 leading-relaxed font-light">
                    {item.description}
                  </p>
                </div>

                {/* Features List */}
                <div className="mt-6 pt-5 border-t border-[#F5F5F0]/10 space-y-2">
                  {item.features.slice(0, 2).map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F5F0]/70 font-light">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059] shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Action Link */}
                <div className="mt-6 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
                  <button
                    onClick={() => setSelectedExp(item)}
                    id={`exp-details-${item.id}`}
                    className="text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#C5A059] hover:text-[#D4AF37] uppercase flex items-center gap-1 group/btn"
                  >
                    <span>EXPLORE HIGHLIGHTS</span>
                    <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-1" />
                  </button>

                  <button
                    onClick={onOpenReservation}
                    className="text-[9px] tracking-[0.2em] text-[#F5F5F0]/50 hover:text-[#C5A059] uppercase transition-colors"
                  >
                    Book Experience
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Experience Details Modal */}
      {selectedExp && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#C5A059] max-w-lg w-full p-6 sm:p-8 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4 mb-5">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
                  EXPERIENCE {selectedExp.number}
                </span>
                <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F0] uppercase">
                  {selectedExp.title}
                </h4>
              </div>
              <button
                onClick={() => setSelectedExp(null)}
                className="p-1 text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
              >
                ✕
              </button>
            </div>

            <p className="text-sm text-[#F5F5F0]/80 leading-relaxed mb-6 font-light">
              {selectedExp.description}
            </p>

            <div className="space-y-3 mb-6">
              <span className="text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase block">
                Signature Attributes:
              </span>
              {selectedExp.features.map((f, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#F5F5F0]/90">
                  <span className="text-[#C5A059] font-bold">✦</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-3 pt-4 border-t border-[#F5F5F0]/10">
              <button
                onClick={() => {
                  setSelectedExp(null);
                  onOpenReservation();
                }}
                className="flex-1 py-3.5 bg-[#C5A059] text-black font-bold text-xs tracking-[0.2em] uppercase hover:bg-[#D4AF37] transition-all"
              >
                RESERVE FOR THIS EXPERIENCE
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
