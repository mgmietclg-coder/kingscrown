import React, { useState } from 'react';
import { MENU_ITEMS, RESTAURANT_INFO } from '../data/restaurantData';
import { CuisineCategory, MenuItem, MustTryItem } from '../types';
import { X, Search, Bookmark, Check, Utensils, Flame, Sparkles, Filter, Printer } from 'lucide-react';

interface FullMenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  onToggleMustTry: (item: MenuItem) => void;
  mustTryItems: MustTryItem[];
}

export const FullMenuModal: React.FC<FullMenuModalProps> = ({
  isOpen,
  onClose,
  onToggleMustTry,
  mustTryItems
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<CuisineCategory>('ALL');
  const [dietFilter, setDietFilter] = useState<'ALL' | 'VEG' | 'NON_VEG'>('ALL');

  if (!isOpen) return null;

  const categories: { label: string; value: CuisineCategory }[] = [
    { label: 'ALL CATEGORIES', value: 'ALL' },
    { label: 'TANDOOR', value: 'TANDOOR' },
    { label: 'BIRYANI', value: 'BIRYANI' },
    { label: 'INDIAN', value: 'INDIAN' },
    { label: 'CHINESE', value: 'CHINESE' },
    { label: 'CONTINENTAL', value: 'CONTINENTAL' },
    { label: 'SIZZLERS', value: 'SIZZLERS' },
    { label: 'PASTA', value: 'PASTA' },
    { label: 'DESSERTS', value: 'DESSERTS' },
    { label: 'BEVERAGES', value: 'BEVERAGES' }
  ];

  const filteredItems = MENU_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'ALL' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDiet = dietFilter === 'ALL' ||
      (dietFilter === 'VEG' && item.isVeg) ||
      (dietFilter === 'NON_VEG' && !item.isVeg);

    return matchesCategory && matchesSearch && matchesDiet;
  });

  const isItemSaved = (id: string) => mustTryItems.some((item) => item.id === id);

  return (
    <div
      id="full-menu-modal-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-2 sm:p-6 overflow-hidden animate-in fade-in duration-200"
    >
      <div className="bg-[#0D0D0D] border border-[#C5A059] max-w-5xl w-full h-[90vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-[#141414] p-4 sm:p-6 border-b border-[#F5F5F0]/15 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
              KINGS' CROWN CHINSURAH • DIGITAL MENU
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#F5F5F0] uppercase tracking-[0.04em]">
              COMPLETE FOOD & BEVERAGE COMPENDIUM
            </h3>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => window.print()}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 bg-[#1C1C1C] border border-[#F5F5F0]/15 text-xs text-[#C5A059] hover:bg-[#C5A059] hover:text-black transition-colors"
              title="Print Menu"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print</span>
            </button>

            <button
              onClick={onClose}
              id="close-full-menu-btn"
              className="p-2 bg-[#1C1C1C] hover:bg-[#C5A059] text-white hover:text-black transition-colors"
              aria-label="Close full menu"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Search & Filter Bar */}
        <div className="p-4 bg-[#111111] border-b border-[#F5F5F0]/10 flex flex-col sm:flex-row gap-3 items-center justify-between">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-[#C5A059] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search dishes (e.g. Biryani, Chicken, Sizzler)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#161616] border border-[#F5F5F0]/20 pl-9 pr-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
            />
          </div>

          {/* Veg / Non-Veg Toggles */}
          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <button
              onClick={() => setDietFilter('ALL')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-all ${
                dietFilter === 'ALL'
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'bg-[#161616] text-[#F5F5F0]/70 border border-[#F5F5F0]/15'
              }`}
            >
              All Diet
            </button>

            <button
              onClick={() => setDietFilter('VEG')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase flex items-center gap-1 transition-all ${
                dietFilter === 'VEG'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-[#161616] text-emerald-400 border border-emerald-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              Veg
            </button>

            <button
              onClick={() => setDietFilter('NON_VEG')}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase flex items-center gap-1 transition-all ${
                dietFilter === 'NON_VEG'
                  ? 'bg-red-700 text-white font-bold'
                  : 'bg-[#161616] text-red-400 border border-red-500/30'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-red-400" />
              Non-Veg
            </button>
          </div>
        </div>

        {/* Category Horizontal Bar */}
        <div className="flex items-center gap-2 overflow-x-auto p-3 bg-[#0A0A0A] border-b border-[#F5F5F0]/10 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setSelectedCategory(cat.value)}
              className={`px-3.5 py-1.5 text-[11px] font-semibold tracking-wider uppercase whitespace-nowrap transition-all ${
                selectedCategory === cat.value
                  ? 'bg-[#C5A059] text-black font-bold'
                  : 'bg-[#141414] text-[#F5F5F0]/70 hover:text-white border border-[#F5F5F0]/15'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Menu Items List (Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#0D0D0D]">
          {filteredItems.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {filteredItems.map((item) => {
                const saved = isItemSaved(item.id);
                return (
                  <div
                    key={item.id}
                    className="p-4 bg-[#141414] border border-[#F5F5F0]/15 hover:border-[#C5A059] flex gap-4 transition-all duration-300 group"
                  >
                    {/* Thumbnail */}
                    <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden shrink-0 relative bg-black">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute top-1 left-1 bg-black/80 p-1">
                        <span
                          className={`block w-2 h-2 rounded-full ${
                            item.isVeg ? 'bg-emerald-400' : 'bg-red-500'
                          }`}
                        />
                      </div>
                    </div>

                    {/* Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-serif font-bold text-sm sm:text-base text-[#F5F5F0] group-hover:text-[#C5A059] leading-snug">
                            {item.name}
                          </h4>
                          <span className="font-serif font-bold text-sm sm:text-base text-[#C5A059] whitespace-nowrap">
                            ₹{item.price}
                          </span>
                        </div>

                        <p className="text-xs text-[#F5F5F0]/70 line-clamp-2 mt-1 font-light">
                          {item.description}
                        </p>
                      </div>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-[10px] tracking-wider uppercase text-[#C5A059]">
                          {item.category}
                        </span>

                        <button
                          onClick={() => onToggleMustTry(item)}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-all ${
                            saved
                              ? 'bg-[#C5A059] text-black'
                              : 'bg-[#1C1C1C] text-[#C5A059] hover:bg-[#C5A059]/20'
                          }`}
                        >
                          {saved ? <Check className="w-3 h-3" /> : <Bookmark className="w-3 h-3" />}
                          <span>{saved ? 'Saved' : 'Add to Wishlist'}</span>
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16 text-[#F5F5F0]/60">
              <Utensils className="w-8 h-8 text-[#C5A059] mx-auto mb-3 opacity-50" />
              <p className="text-sm">No dishes match your search or filter.</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('ALL');
                  setDietFilter('ALL');
                }}
                className="mt-3 text-xs text-[#C5A059] underline uppercase tracking-wider"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#141414] border-t border-[#F5F5F0]/15 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#F5F5F0]/70 font-light">
          <div>
            <span>📍 Rupali Arcade, Level 4, Chinsurah R.S.</span>
            <span className="hidden sm:inline mx-2">•</span>
            <span className="hidden sm:inline">Prices inclusive of standard kitchen preparation</span>
          </div>

          <div className="font-semibold text-[#C5A059]">
            {mustTryItems.length} items saved in your Must-Try list
          </div>
        </div>
      </div>
    </div>
  );
};
