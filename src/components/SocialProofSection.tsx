import React, { useState } from 'react';
import { REVIEWS, RESTAURANT_INFO } from '../data/restaurantData';
import { Star, CheckCircle, Quote, MessageSquare, ExternalLink, ChevronLeft, ChevronRight } from 'lucide-react';

export const SocialProofSection: React.FC = () => {
  const [showAllReviewsModal, setShowAllReviewsModal] = useState(false);

  return (
    <section id="reviews" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Verified Rating Badge */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#111111] border border-[#C5A059]/40 text-[10px] sm:text-xs font-semibold tracking-[0.2em] text-[#C5A059] uppercase mb-4">
            <Star className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
            <span>GOOGLE VERIFIED • {RESTAURANT_INFO.googleRating} / 5.0 ({RESTAURANT_INFO.totalReviewsCount} REVIEWS)</span>
          </div>

          <h2
            id="reviews-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            HEARD FROM OUR GUESTS.
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light">
            Genuine experiences from families, couples, and food lovers who made KINGS' CROWN their evening destination.
          </p>
        </div>

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.slice(0, 3).map((item) => (
            <div
              key={item.id}
              id={`review-card-${item.id}`}
              className="bg-[#111111] border border-[#F5F5F0]/10 hover:border-[#C5A059]/50 p-6 sm:p-8 flex flex-col justify-between shadow-xl transition-all duration-300 relative group"
            >
              <div>
                {/* Top Row: Stars + Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-[#C5A059]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C5A059] text-[#C5A059]" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#F5F5F0]/50 tracking-wider">
                    {item.date}
                  </span>
                </div>

                {/* Review Text */}
                <p className="text-xs sm:text-sm text-[#F5F5F0]/85 leading-relaxed font-light italic mb-6">
                  "{item.review}"
                </p>
              </div>

              {/* Author & Dish Tag */}
              <div className="pt-4 border-t border-[#F5F5F0]/10 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-bold text-sm text-[#F5F5F0]">
                      {item.name}
                    </span>
                    {item.verified && (
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-400" title="Verified Google Diner" />
                    )}
                  </div>
                  <span className="text-[9px] tracking-wider uppercase text-[#C5A059] bg-[#161616] px-2 py-0.5 border border-[#C5A059]/20">
                    {item.occasionTag}
                  </span>
                </div>

                {item.dishMentioned && (
                  <div className="text-[11px] text-[#F5F5F0]/60">
                    <span className="text-[#C5A059]">Favorite:</span> {item.dishMentioned}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Review Actions */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
          <button
            onClick={() => setShowAllReviewsModal(true)}
            id="read-more-reviews-btn"
            className="px-6 py-3 bg-[#111111] border border-[#C5A059] hover:bg-[#C5A059] hover:text-black text-[#C5A059] text-xs font-semibold tracking-[0.2em] uppercase transition-all shadow-md"
          >
            READ MORE REVIEWS ({REVIEWS.length})
          </button>

          <a
            href={RESTAURANT_INFO.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            id="google-review-external-link"
            className="inline-flex items-center gap-2 text-xs tracking-wider text-[#F5F5F0]/70 hover:text-[#C5A059] transition-colors py-2"
          >
            <span>Review Us on Google Maps</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* All Reviews Modal */}
      {showAllReviewsModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#111111] border border-[#C5A059] max-w-2xl w-full max-h-[85vh] flex flex-col shadow-2xl p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4 mb-6">
              <div>
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase block">
                  PATRON TESTIMONIALS
                </span>
                <h4 className="font-serif text-2xl font-bold text-[#F5F5F0] uppercase">
                  VERIFIED GUEST EXPERIENCES
                </h4>
              </div>
              <button
                onClick={() => setShowAllReviewsModal(false)}
                className="p-2 text-[#F5F5F0]/60 hover:text-[#C5A059]"
              >
                ✕
              </button>
            </div>

            <div className="overflow-y-auto space-y-4 pr-2 flex-1">
              {REVIEWS.map((rev) => (
                <div
                  key={rev.id}
                  className="p-4 bg-[#161616] border border-[#F5F5F0]/10 space-y-3"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-[#C5A059]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3.5 h-3.5 fill-[#C5A059] text-[#C5A059]" />
                      ))}
                    </div>
                    <span className="text-[10px] text-[#F5F5F0]/50">{rev.date}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#F5F5F0]/90 italic font-light">
                    "{rev.review}"
                  </p>

                  <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                    <span className="font-bold text-[#F5F5F0]">{rev.name}</span>
                    <span className="text-[#C5A059] text-[10px] uppercase font-semibold">
                      {rev.occasionTag}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#F5F5F0]/10 text-center">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bold tracking-wider text-[#C5A059] uppercase hover:text-[#D4AF37]"
              >
                <span>Write your review on Google</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
