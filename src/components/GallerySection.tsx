import React, { useState } from 'react';
import { GALLERY_ITEMS } from '../data/restaurantData';
import { GalleryCategory, GalleryItem } from '../types';
import { Maximize2, X, ChevronLeft, ChevronRight, Sparkles, Image as ImageIcon } from 'lucide-react';

export const GallerySection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('ALL');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState<number | null>(null);

  const categories: { label: string; value: GalleryCategory }[] = [
    { label: 'ALL MOMENTS', value: 'ALL' },
    { label: 'FOOD & DRINKS', value: 'FOOD' },
    { label: 'INTERIORS & AC', value: 'INTERIORS' },
    { label: 'ROOFTOP DECK', value: 'ROOFTOP' },
    { label: 'PEOPLE & TOASTS', value: 'PEOPLE' },
    { label: 'EVENING GLOW', value: 'EVENINGS' }
  ];

  const filteredGallery = activeCategory === 'ALL'
    ? GALLERY_ITEMS
    : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

  const openLightbox = (index: number) => {
    setActiveLightboxIndex(index);
  };

  const closeLightbox = () => {
    setActiveLightboxIndex(null);
  };

  const nextImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex((activeLightboxIndex + 1) % filteredGallery.length);
    }
  };

  const prevImage = () => {
    if (activeLightboxIndex !== null) {
      setActiveLightboxIndex(
        (activeLightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
      );
    }
  };

  return (
    <section id="gallery" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
            VISUAL CHRONICLES
          </span>
          <h2
            id="gallery-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            THE GALLERY OF MOMENTS
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light">
            Glimpses of handcrafted flavours, open-air twilight, and joyous celebrations at KINGS' CROWN.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat.value}
              onClick={() => setActiveCategory(cat.value)}
              id={`gallery-filter-${cat.value.toLowerCase()}`}
              className={`px-4 sm:px-5 py-2 text-xs font-semibold tracking-[0.16em] uppercase transition-all duration-300 ${
                activeCategory === cat.value
                  ? 'bg-[#C5A059] text-black shadow-md'
                  : 'bg-[#111111] text-[#F5F5F0]/70 hover:text-[#C5A059] border border-[#F5F5F0]/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredGallery.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => openLightbox(idx)}
              id={`gallery-item-${item.id}`}
              className="group relative h-64 sm:h-72 lg:h-80 overflow-hidden border border-[#F5F5F0]/10 hover:border-[#C5A059]/60 cursor-pointer shadow-lg transition-all duration-500 bg-[#111111]"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

              {/* Hover overlay content */}
              <div className="absolute inset-0 p-5 flex flex-col justify-between transition-opacity">
                <div className="flex justify-between items-start">
                  <span className="text-[9px] tracking-[0.2em] font-semibold text-[#C5A059] uppercase bg-black/80 backdrop-blur-sm px-2.5 py-1 border border-[#C5A059]/30">
                    {item.category}
                  </span>
                  <div className="w-8 h-8 bg-black/80 border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity">
                    <Maximize2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-[#F5F5F0]/75 font-light line-clamp-1 mt-1">
                    {item.caption}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fullscreen Interactive Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          id="gallery-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-200"
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between z-10">
            <div>
              <span className="text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                {filteredGallery[activeLightboxIndex].category} • {activeLightboxIndex + 1} / {filteredGallery.length}
              </span>
              <h4 className="font-serif text-lg sm:text-xl font-bold text-white">
                {filteredGallery[activeLightboxIndex].title}
              </h4>
            </div>

            <button
              onClick={closeLightbox}
              id="close-lightbox-btn"
              className="p-3 bg-[#111111] hover:bg-[#C5A059] text-white hover:text-black border border-[#F5F5F0]/10 transition-all"
              aria-label="Close Lightbox"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Center Image Container with Prev/Next Controls */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            <button
              onClick={prevImage}
              id="lightbox-prev-btn"
              className="absolute left-2 sm:left-6 z-10 p-3 bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/30 transition-all"
              aria-label="Previous Image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <img
              src={filteredGallery[activeLightboxIndex].image}
              alt={filteredGallery[activeLightboxIndex].title}
              className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl animate-in zoom-in-95 duration-300"
            />

            <button
              onClick={nextImage}
              id="lightbox-next-btn"
              className="absolute right-2 sm:right-6 z-10 p-3 bg-black/80 hover:bg-[#C5A059] text-white hover:text-black border border-[#C5A059]/30 transition-all"
              aria-label="Next Image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Caption Bar */}
          <div className="text-center max-w-2xl mx-auto z-10">
            <p className="text-sm text-[#F5F5F0]/90 font-light">
              {filteredGallery[activeLightboxIndex].caption}
            </p>
          </div>
        </div>
      )}
    </section>
  );
};
