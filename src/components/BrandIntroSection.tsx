import React from 'react';
import { Crown, Sparkles, Compass, ShieldCheck, GlassWater, Utensils } from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';

export const BrandIntroSection: React.FC = () => {
  return (
    <section
      id="brand-intro"
      className="relative py-20 sm:py-28 bg-[#0A0A0A] border-t border-b border-[#F5F5F0]/10 overflow-hidden"
    >
      {/* Subtle Background Radial Accent */}
      <div className="absolute top-1/2 -left-48 w-96 h-96 bg-[#C5A059]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Asymmetrical Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column - Editorial Text */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-8">
            <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase">
              <div className="w-4 h-4">
                <KingsCrownLogo className="w-full h-full" />
              </div>
              <span>THE ROYAL IDENTITY OF KING'S & QUEEN'S CROWN</span>
            </div>

            <h2
              id="brand-intro-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] leading-[1.1] uppercase"
            >
              MORE THAN A MEAL.{' '}
              <span className="block italic text-[#C5A059]">
                AN UNFORGETTABLE EXPERIENCE.
              </span>
            </h2>

            <p
              id="brand-intro-copy"
              className="text-base sm:text-lg text-[#F5F5F0]/80 font-light leading-relaxed tracking-wide"
            >
              KING'S CROWN brings together royal hospitality, mastercraft culinary traditions, a full bar license, and the breezy comfort of Chinsurah's premier Level 4 rooftop. Built to celebrate both the King's imperial feasts and the Queen's refined open-sky elegance.
            </p>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#F5F5F0]/10">
              <div className="space-y-1 bg-[#111111] p-3.5 border border-[#F5F5F0]/10">
                <div className="text-xs tracking-[0.2em] text-[#C5A059] font-semibold uppercase flex items-center gap-2">
                  <Utensils className="w-3.5 h-3.5 text-[#C5A059]" />
                  King's Imperial Dining
                </div>
                <p className="text-xs text-[#F5F5F0]/70 leading-normal font-light">
                  Clay oven tandoor kebabs, slow-simmered Awadhi dum biryani, and rich Mughlai gravies served in opulent AC comfort.
                </p>
              </div>

              <div className="space-y-1 bg-[#111111] p-3.5 border border-[#F5F5F0]/10">
                <div className="text-xs tracking-[0.2em] text-[#C5A059] font-semibold uppercase flex items-center gap-2">
                  <GlassWater className="w-3.5 h-3.5 text-[#C5A059]" />
                  Queen's Sky Deck & Bar
                </div>
                <p className="text-xs text-[#F5F5F0]/70 leading-normal font-light">
                  Handcrafted cocktails, refreshing mocktails, sizzling Continental grills, and starlit breezes high above Chinsurah.
                </p>
              </div>
            </div>

            {/* Quote Badge */}
            <div className="p-4 bg-[#111111] border-l-2 border-[#C5A059] text-xs italic text-[#F5F5F0]/80 font-light">
              "Crafted in Chinsurah to give you the royal hospitality and culinary standards of a world-class bar and restaurant."
            </div>
          </div>

          {/* Right Column - Staggered Asymmetrical Imagery */}
          <div className="lg:col-span-6 relative">
            <div className="grid grid-cols-12 gap-4 items-center">
              {/* Primary Large Ambience Visual */}
              <div className="col-span-8 relative group overflow-hidden border border-[#F5F5F0]/15 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=900&auto=format&fit=crop"
                  alt="King's Crown Luxury Interior Dining Lounge Chinsurah"
                  className="w-full h-80 sm:h-96 object-cover object-center transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <span className="text-[9px] tracking-[0.25em] uppercase text-[#C5A059] font-semibold block">
                    Level 4 Imperial Salon
                  </span>
                  <span className="text-xs text-[#F5F5F0] font-serif">
                    Plush comfort & sophisticated warmth
                  </span>
                </div>
              </div>

              {/* Secondary Staggered Food / Rooftop Visual */}
              <div className="col-span-4 space-y-4">
                <div className="relative group overflow-hidden border border-[#F5F5F0]/15 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=600&auto=format&fit=crop"
                    alt="King's Crown Rooftop Terrace Deck"
                    className="w-full h-36 sm:h-44 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>

                <div className="relative group overflow-hidden border border-[#F5F5F0]/15 shadow-xl">
                  <img
                    src="https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?q=80&w=600&auto=format&fit=crop"
                    alt="Butter Garlic Pepper Chicken Specialty"
                    className="w-full h-36 sm:h-44 object-cover object-center transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />
                </div>
              </div>
            </div>

            {/* Floating Luxury Stamp */}
            <div className="absolute -bottom-6 -left-4 sm:bottom-4 sm:-left-6 bg-[#111111] border border-[#C5A059] p-3 sm:p-4 shadow-2xl backdrop-blur-md flex items-center gap-3">
              <div className="w-10 h-10 p-1 bg-[#0A0A0A] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <KingsCrownLogo className="w-full h-full" />
              </div>
              <div>
                <div className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                  Rupali Arcade • Level 4
                </div>
                <div className="text-xs text-[#F5F5F0]/90 font-serif">
                  King's & Queen's Crown • Chinsurah
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
