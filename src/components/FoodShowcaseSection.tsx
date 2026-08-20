import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MENU_ITEMS } from '../data/restaurantData';
import { CuisineCategory, MenuItem, MustTryItem } from '../types';
import { Bookmark, Check, ChevronLeft, ChevronRight, Utensils, Sparkles, Flame, Crown } from 'lucide-react';

interface FoodShowcaseProps {
  onOpenFullMenu: () => void;
  onToggleMustTry: (item: MenuItem) => void;
  mustTryItems: MustTryItem[];
}

interface DishCardProps {
  item: MenuItem;
  saved: boolean;
  onToggleMustTry: (item: MenuItem) => void;
}

const DishCard: React.FC<DishCardProps> = ({ item, saved, onToggleMustTry }) => {
  const [isHovered, setIsHovered] = useState(false);
  const isHighlighted = Boolean(
    item.isSignature ||
    item.isChefSpecial ||
    item.tags?.some(t => /signature|special|bestseller/i.test(t))
  );

  return (
    <div
      id={`dish-card-${item.id}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="w-72 sm:w-80 shrink-0 bg-[#111111] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:-translate-y-1.5 shadow-xl relative"
    >
      {/* Food Image & Badges */}
      <div className="relative h-48 sm:h-52 overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />

        {/* Veg / Non-Veg Indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/80 backdrop-blur-md px-2.5 py-1 border border-white/10 z-10">
          <span
            className={`w-2 h-2 ${
              item.isVeg ? 'bg-emerald-400' : 'bg-red-500'
            }`}
          />
          <span className="text-[9px] font-semibold tracking-wider text-white uppercase">
            {item.isVeg ? 'VEG' : 'NON-VEG'}
          </span>
        </div>

        {/* Tag Pill (Bestseller / Tag) */}
        {item.tags && item.tags[0] && (
          <div className="absolute top-3 right-3 bg-[#C5A059] text-black font-bold text-[9px] tracking-wider px-2 py-0.5 uppercase z-10">
            {item.tags[0]}
          </div>
        )}

        {/* Subtle Chef's Signature Gold Badge appearing on hover via Framer Motion */}
        {isHighlighted && (
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.95 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-x-3 top-12 z-20 flex items-center justify-center pointer-events-none"
              >
                <div className="flex items-center gap-1.5 px-3 py-1 bg-[#111111]/95 border border-[#C5A059] shadow-[0_4px_20px_rgba(197,160,89,0.45)] backdrop-blur-md">
                  <Crown className="w-3.5 h-3.5 text-[#C5A059]" />
                  <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase font-serif whitespace-nowrap">
                    CHEF'S SIGNATURE
                  </span>
                  <Sparkles className="w-3 h-3 text-[#C5A059]" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        )}

        {/* Spiciness Indicator */}
        {item.spiciness === 'spicy' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 text-red-400 text-[9px] font-bold bg-black/80 px-2 py-0.5 z-10">
            <Flame className="w-3 h-3" /> Spicy
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors leading-snug">
              {item.name}
            </h3>
            <span className="font-serif text-base font-bold text-[#C5A059] whitespace-nowrap">
              ₹{item.price}
            </span>
          </div>

          <p className="mt-2 text-xs text-[#F5F5F0]/70 leading-relaxed line-clamp-2 font-light">
            {item.description}
          </p>
        </div>

        {/* Add to Must-Try Button */}
        <div className="mt-5 pt-4 border-t border-[#F5F5F0]/10 flex items-center justify-between">
          <span className="text-[9px] uppercase tracking-[0.2em] text-[#F5F5F0]/40">
            {item.category}
          </span>

          <button
            onClick={() => onToggleMustTry(item)}
            id={`must-try-toggle-${item.id}`}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-[10px] font-semibold tracking-wider uppercase transition-all ${
              saved
                ? 'bg-[#C5A059] text-black'
                : 'bg-[#161616] text-[#C5A059] hover:bg-[#C5A059]/15 border border-[#C5A059]/30'
            }`}
          >
            {saved ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>SAVED</span>
              </>
            ) : (
              <>
                <Bookmark className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>MUST-TRY</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export const FoodShowcaseSection: React.FC<FoodShowcaseProps> = ({
  onOpenFullMenu,
  onToggleMustTry,
  mustTryItems
}) => {
  const [activeCategory, setActiveCategory] = useState<CuisineCategory>('ALL');
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const categories: { label: string; value: CuisineCategory }[] = [
    { label: 'ALL SELECTIONS', value: 'ALL' },
    { label: 'TANDOOR', value: 'TANDOOR' },
    { label: 'BIRYANI', value: 'BIRYANI' },
    { label: 'INDIAN', value: 'INDIAN' },
    { label: 'CHINESE', value: 'CHINESE' },
    { label: 'CONTINENTAL', value: 'CONTINENTAL' },
    { label: 'SIZZLERS', value: 'SIZZLERS' },
    { label: 'PASTA', value: 'PASTA' },
    { label: 'DESSERTS', value: 'DESSERTS' }
  ];

  const filteredItems = activeCategory === 'ALL'
    ? MENU_ITEMS
    : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const isItemSaved = (id: string) => mustTryItems.some((item) => item.id === id);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -340, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 340, behavior: 'smooth' });
    }
  };

  return (
    <section id="menu" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div>
            <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
              THE CULINARY REPERTOIRE
            </span>
            <h2
              id="food-showcase-heading"
              className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
            >
              CRAFTED FOR EVERY CRAVING.
            </h2>
            <div className="w-12 h-[1px] bg-[#C5A059] mt-4 mb-3" />
            <p className="text-sm text-[#F5F5F0]/75 font-light">
              From clay-tandoor roasts to sizzlers & slow-simmered dum biryanis.
            </p>
          </div>

          {/* Slider Arrows */}
          <div className="flex items-center gap-3">
            <button
              onClick={scrollLeft}
              id="menu-scroll-left-btn"
              className="p-3 bg-[#111111] border border-[#F5F5F0]/15 hover:border-[#C5A059] text-[#C5A059] hover:text-[#D4AF37] transition-all shadow-md"
              aria-label="Scroll dishes left"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={scrollRight}
              id="menu-scroll-right-btn"
              className="p-3 bg-[#111111] border border-[#F5F5F0]/15 hover:border-[#C5A059] text-[#C5A059] hover:text-[#D4AF37] transition-all shadow-md"
              aria-label="Scroll dishes right"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Category Pills Navigation */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              id={`cat-pill-${cat.value.toLowerCase()}`}
              className={`px-5 py-2.5 text-xs font-semibold tracking-[0.2em] uppercase whitespace-nowrap transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10 hover:border-[#C5A059]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Horizontal Scrolling Menu Grid Container */}
        <div
          ref={scrollContainerRef}
          className="flex gap-6 overflow-x-auto pb-6 pt-2 scroll-smooth no-scrollbar"
        >
          {filteredItems.map((item) => (
            <DishCard
              key={item.id}
              item={item}
              saved={isItemSaved(item.id)}
              onToggleMustTry={onToggleMustTry}
            />
          ))}
        </div>

        {/* Full Menu CTA Button */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenFullMenu}
            id="view-full-menu-cta"
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs sm:text-sm tracking-[0.2em] uppercase transition-all duration-300 shadow-lg hover:scale-[1.02]"
          >
            <Utensils className="w-4 h-4 text-black" />
            <span>VIEW FULL DIGITAL MENU (ALL DISHES & PRICES)</span>
          </button>
        </div>
      </div>
    </section>
  );
};
