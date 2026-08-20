import React from 'react';
import { MapPin, Calendar, UtensilsCrossed, ChevronDown, Sparkles, Star, Wine, Image as ImageIcon, Crown } from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface HeroSectionProps {
  onOpenReservation: () => void;
  onExploreMenu: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onOpenReservation,
  onExploreMenu
}) => {
  return (
    <section
      id="home"
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden pt-24 pb-16 sm:pb-24"
    >
      {/* Background Image with Cinematic Darkness & Slow Ambient Zoom Effect */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2000&auto=format&fit=crop"
          alt="King's and Queen's Crown Luxury Rooftop Bar & Restaurant Chinsurah"
          className="w-full h-full object-cover object-center scale-105 animate-[pulse_14s_ease-in-out_infinite] opacity-35 brightness-75 contrast-110"
        />
        {/* Soft Luxury Dark Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/85" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#0A0A0A]/50 to-[#0A0A0A]" />
      </div>

      {/* Hero Content Container */}
      <div
        className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center flex flex-col items-center animate-fade-in"
      >
        
        {/* King's Crown Official Crest Emblem */}
        <div className="mb-6 flex flex-col items-center group">
          <div className="w-16 h-16 sm:w-20 sm:h-20 p-2 sm:p-2.5 bg-[#111111]/90 border border-[#C5A059] shadow-2xl backdrop-blur-md transition-transform duration-500 group-hover:scale-105 relative">
            <div className="absolute -inset-0.5 bg-[#C5A059]/20 blur-sm -z-10" />
            <KingsCrownLogo className="w-full h-full" />
          </div>
          <div className="mt-2 text-[10px] tracking-[0.35em] text-[#C5A059] uppercase font-semibold">
            KING'S & QUEEN'S CROWN
          </div>
        </div>

        {/* Spacious, Clear & Highly Readable Location Badge */}
        <div
          id="hero-location-badge"
          className="inline-flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 px-5 py-2.5 bg-[#141414]/95 border border-[#C5A059]/60 backdrop-blur-lg mb-7 sm:mb-9 shadow-xl hover:border-[#C5A059] transition-all"
        >
          <div className="flex items-center gap-1.5 text-[#C5A059]">
            <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#C5A059] uppercase">
              Rupali Arcade, Level 4
            </span>
          </div>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#C5A059]/70" />
          <span className="text-xs sm:text-sm font-medium tracking-[0.18em] text-[#F5F5F0]/90 uppercase">
            Chinsurah R.S., Hooghly
          </span>
        </div>

        {/* Main Headline */}
        <h1
          id="hero-headline"
          className="font-serif text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-[0.04em] text-[#F5F5F0] leading-[1.08] uppercase max-w-4xl"
        >
          WHERE EVERY EVENING{' '}
          <span className="block mt-1 sm:mt-2 italic text-[#C5A059]">
            BECOMES AN EXPERIENCE.
          </span>
        </h1>

        {/* Subheadline - Cuisines & Bar */}
        <div
          id="hero-cuisines-subheadline"
          className="mt-5 sm:mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-xs sm:text-sm tracking-[0.35em] font-medium text-[#C5A059] uppercase"
        >
          <span>Craft Bar</span>
          <span className="text-[#C5A059]/40">•</span>
          <span>Indian</span>
          <span className="text-[#C5A059]/40">•</span>
          <span>Chinese</span>
          <span className="text-[#C5A059]/40">•</span>
          <span>Continental</span>
          <span className="text-[#C5A059]/40">•</span>
          <span>Tandoor</span>
        </div>

        {/* Supporting Copy */}
        <p
          id="hero-supporting-copy"
          className="mt-5 sm:mt-6 text-sm sm:text-base md:text-lg text-[#F5F5F0]/75 max-w-2xl font-light leading-relaxed tracking-wide"
        >
          The premier rooftop and AC dining destination in Chinsurah. Offering a royal home experience, masterfully curated multi-cuisine dining, craft bar pours, and starry evening views.
        </p>

        {/* CTAs with Standout "BOOK A TABLE" Centerpiece */}
        <div
          id="hero-cta-group"
          className="mt-7 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full max-w-lg"
        >
          {/* Radiant Royal Centerpiece: Book A Table (Proportionately scaled & highly visible) */}
          <button
            onClick={onOpenReservation}
            id="hero-primary-reserve-cta"
            className="group relative overflow-hidden w-full sm:w-auto px-7 py-3.5 sm:px-8 sm:py-3.5 bg-gradient-to-r from-[#C5A059] via-[#F5E6BE] to-[#C5A059] hover:from-[#D4AF37] hover:via-[#FFF3CD] hover:to-[#C5A059] text-black font-extrabold text-xs sm:text-xs tracking-[0.2em] uppercase transition-all duration-300 shadow-[0_0_24px_rgba(197,160,89,0.5)] hover:shadow-[0_0_34px_rgba(197,160,89,0.75)] flex items-center justify-center gap-2.5 hover:scale-[1.03] active:scale-[0.98] border border-[#FFFDF0]/80"
          >
            {/* Shimmer Light Reflection */}
            <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
            
            <Crown className="w-4 h-4 text-black fill-black/30 shrink-0" />
            <span className="relative z-10">BOOK A TABLE</span>
            <Sparkles className="w-3.5 h-3.5 text-black shrink-0 animate-spin" style={{ animationDuration: '6s' }} />
          </button>

          <button
            onClick={onExploreMenu}
            id="hero-secondary-menu-cta"
            className="w-full sm:w-auto px-6 py-3.5 border border-[#C5A059]/70 text-[#C5A059] hover:bg-[#C5A059]/15 hover:border-[#C5A059] font-semibold text-xs tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 bg-[#111111]/70"
          >
            <UtensilsCrossed className="w-3.5 h-3.5" />
            <span>EXPLORE MENU</span>
          </button>

          <a
            href="#gallery"
            id="hero-gallery-shortcut"
            className="w-full sm:w-auto px-5 py-3.5 border border-[#F5F5F0]/20 text-[#F5F5F0]/80 hover:border-[#C5A059] hover:text-[#C5A059] font-medium text-xs tracking-[0.18em] uppercase transition-all duration-300 backdrop-blur-md flex items-center justify-center gap-2 bg-[#111111]/60"
          >
            <ImageIcon className="w-3.5 h-3.5" />
            <span>GALLERY</span>
          </a>
        </div>

        {/* Rating & Trust Indicators */}
        <div className="mt-12 pt-8 border-t border-[#F5F5F0]/10 w-full max-w-3xl grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="flex flex-col items-center">
            <div className="flex items-center gap-1 text-[#C5A059]">
              <Star className="w-3.5 h-3.5 fill-[#C5A059]" />
              <span className="font-serif font-bold text-sm sm:text-base text-[#F5F5F0]">
                4.7 / 5.0
              </span>
            </div>
            <span className="text-[10px] sm:text-xs text-[#F5F5F0]/50 tracking-[0.2em] uppercase mt-0.5">
              850+ Verified Reviews
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif font-bold text-sm sm:text-base text-[#F5F5F0]">
              King & Queen Lounges
            </span>
            <span className="text-[10px] sm:text-xs text-[#F5F5F0]/50 tracking-[0.2em] uppercase mt-0.5">
              Sky Deck & AC Dining
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif font-bold text-sm sm:text-base text-[#F5F5F0]">
              Bar & Restaurant
            </span>
            <span className="text-[10px] sm:text-xs text-[#F5F5F0]/50 tracking-[0.2em] uppercase mt-0.5">
              Cocktails & 4 Cuisines
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="font-serif font-bold text-sm sm:text-base text-[#F5F5F0]">
              12 PM – 11:30 PM
            </span>
            <span className="text-[10px] sm:text-xs text-[#F5F5F0]/50 tracking-[0.2em] uppercase mt-0.5">
              Chinsurah R.S. Level 4
            </span>
          </div>
        </div>

        {/* Scroll Indicator */}
        <a
          href="#brand-intro"
          id="hero-scroll-indicator"
          className="mt-10 sm:mt-14 inline-flex items-center gap-3 text-[#F5F5F0]/50 hover:text-[#C5A059] transition-colors group"
          aria-label="Scroll to discover more"
        >
          <div className="w-10 h-[1px] bg-[#C5A059]/60 group-hover:w-14 transition-all" />
          <span className="text-[9px] tracking-[0.3em] uppercase">DISCOVER THE EXPERIENCE</span>
          <ChevronDown className="w-4 h-4 text-[#C5A059] animate-bounce" />
        </a>
      </div>
    </section>
  );
};
