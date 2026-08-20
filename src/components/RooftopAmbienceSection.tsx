import React, { useState } from 'react';
import { Wind, Moon, Sun, Sparkles, MapPin, Wine, Users, Calendar } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface RooftopAmbienceProps {
  onOpenReservation: () => void;
}

export const RooftopAmbienceSection: React.FC<RooftopAmbienceProps> = ({ onOpenReservation }) => {
  const [activeZone, setActiveZone] = useState<'rooftop' | 'acLounge' | 'bar' | 'poolside'>('rooftop');

  const zones = {
    rooftop: {
      title: "THE OPEN SKY ROOFTOP TERRACE",
      subtitle: "Breeze & Panoramic Views on Level 4",
      description: "As the sun sets over Chinsurah, our elevated rooftop transforms into an illuminated sanctuary. Soft ambient lighting, cool Hooghly river currents, and relaxed music craft an unforgettable evening under the stars.",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1400&auto=format&fit=crop",
      highlights: ["Open-sky starry panorama", "Gentle evening breeze", "Live music & weekend ambience"]
    },
    acLounge: {
      title: "THE AC FAMILY DINING SALONS",
      subtitle: "Climate Controlled Luxurious Comfort",
      description: "Designed for grand family dinners, celebratory feasts, and comfortable lunch meetings. Featuring plush upholstered booth seating, acoustic dampening, and elegant warm golden chandeliers.",
      image: "https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?q=80&w=1400&auto=format&fit=crop",
      highlights: ["100% chilled AC comfort", "Multi-generational family booths", "Discreet & attentive service"]
    },
    bar: {
      title: "THE SUNSET BAR & MOCKTAIL COUNTER",
      subtitle: "Artisanal Beverages & Evening Mixology",
      description: "A sleek backlit bar counter serving curated mocktails, chilled draught beers, fine spirits, and custom infused refreshments paired with sizzling appetisers.",
      image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?q=80&w=1400&auto=format&fit=crop",
      highlights: ["Custom crafted mocktails & cocktails", "Bar counter seating", "Live sports screenings"]
    },
    poolside: {
      title: "INTIMATE POOLSIDE & BALCONY CORNERS",
      subtitle: "Candlelit Romance & Quiet Conversations",
      description: "Secluded perimeter tables framed by subtle water reflections and skyline glow, tailored specifically for anniversary toasts and memorable date nights.",
      image: "https://images.unsplash.com/photo-1543007630-9710e4a00a20?q=80&w=1400&auto=format&fit=crop",
      highlights: ["Candlelit table arrangements", "Peaceful perimeter seating", "Complimentary chef dessert on booking"]
    }
  };

  const current = zones[activeZone];

  return (
    <section id="ambience" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
            ELEVATED ROOFTOP ATMOSPHERE
          </span>
          <h2
            id="rooftop-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            COME FOR THE FOOD.{' '}
            <span className="block italic text-[#C5A059]">
              STAY FOR THE ATMOSPHERE.
            </span>
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/80 font-light leading-relaxed">
            From intimate dinners to lively evenings with friends, KINGS' CROWN is designed to make every occasion feel a little more memorable.
          </p>
        </div>

        {/* Atmosphere Zone Selector Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3 mb-10 max-w-4xl mx-auto">
          <button
            onClick={() => setActiveZone('rooftop')}
            id="zone-btn-rooftop"
            className={`py-3 px-4 text-xs font-serif font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              activeZone === 'rooftop'
                ? 'bg-[#C5A059] text-black shadow-lg'
                : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10'
            }`}
          >
            <Wind className="w-3.5 h-3.5" />
            <span>Rooftop Deck</span>
          </button>

          <button
            onClick={() => setActiveZone('acLounge')}
            id="zone-btn-acLounge"
            className={`py-3 px-4 text-xs font-serif font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              activeZone === 'acLounge'
                ? 'bg-[#C5A059] text-black shadow-lg'
                : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>AC Family Lounge</span>
          </button>

          <button
            onClick={() => setActiveZone('bar')}
            id="zone-btn-bar"
            className={`py-3 px-4 text-xs font-serif font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              activeZone === 'bar'
                ? 'bg-[#C5A059] text-black shadow-lg'
                : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10'
            }`}
          >
            <Wine className="w-3.5 h-3.5" />
            <span>Sunset Bar</span>
          </button>

          <button
            onClick={() => setActiveZone('poolside')}
            id="zone-btn-poolside"
            className={`py-3 px-4 text-xs font-serif font-bold tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-2 ${
              activeZone === 'poolside'
                ? 'bg-[#C5A059] text-black shadow-lg'
                : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Poolside Balcony</span>
          </button>
        </div>

        {/* Cinematic Display Feature Grid */}
        <div className="bg-[#111111] border border-[#C5A059]/40 overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-12">
          {/* Main Visual */}
          <div className="lg:col-span-8 relative h-80 sm:h-96 lg:h-[460px] overflow-hidden group">
            <img
              src={current.image}
              alt={current.title}
              className="w-full h-full object-cover object-center transition-transform duration-1000 group-hover:scale-105 filter brightness-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            <div className="absolute bottom-6 left-6 right-6">
              <span className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase block mb-1">
                Level 4 Rupali Arcade
              </span>
              <h3 className="font-serif text-xl sm:text-2xl lg:text-3xl font-bold text-[#F5F5F0] uppercase">
                {current.title}
              </h3>
            </div>
          </div>

          {/* Right Info Box */}
          <div className="lg:col-span-4 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-[#111111] border-t lg:border-t-0 lg:border-l border-[#F5F5F0]/10">
            <div>
              <div className="text-[10px] font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-2">
                {current.subtitle}
              </div>

              <div className="w-10 h-[1px] bg-[#C5A059] my-3" />

              <p className="text-xs sm:text-sm text-[#F5F5F0]/85 font-light leading-relaxed mb-6">
                {current.description}
              </p>

              <div className="space-y-2.5 mb-8">
                <span className="text-[10px] tracking-[0.2em] font-semibold text-[#C5A059] uppercase block">
                  Space Amenities:
                </span>
                {current.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs text-[#F5F5F0]/80">
                    <span className="text-[#C5A059] font-bold">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-[#F5F5F0]/10">
              <button
                onClick={onOpenReservation}
                id="book-this-space-cta"
                className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-lg flex items-center justify-center gap-2"
              >
                <Calendar className="w-3.5 h-3.5 text-black" />
                <span>BOOK IN THIS ZONE</span>
              </button>

              <div className="text-center text-[10px] text-[#F5F5F0]/50 tracking-wider">
                Preference guaranteed on advance table reservation
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
