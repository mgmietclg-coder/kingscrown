import React from 'react';
import { MustTryItem } from '../types';
import { X, Trash2, MessageSquare, Calendar, Bookmark, ArrowRight, Utensils } from 'lucide-react';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface MustTryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: MustTryItem[];
  onRemoveItem: (id: string) => void;
  onClearAll: () => void;
  onOpenReservation: () => void;
}

export const MustTryDrawer: React.FC<MustTryDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onRemoveItem,
  onClearAll,
  onOpenReservation
}) => {
  if (!isOpen) return null;

  const totalEstimate = items.reduce((sum, item) => sum + item.price, 0);

  const generateWhatsAppShare = () => {
    let msg = `👑 *MY KINGS' CROWN MUST-TRY DINING LIST* 👑%0A%0A`;
    items.forEach((item, idx) => {
      msg += `${idx + 1}. *${item.name}* (₹${item.price}) - ${item.category}%0A`;
    });
    msg += `%0A*Estimated Total:* ₹${totalEstimate}%0A%0A`;
    msg += `_Planning to visit Kings' Crown at Rupali Arcade Level 4, Chinsurah_`;
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${msg}`;
  };

  return (
    <div
      id="must-try-drawer-backdrop"
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex justify-end animate-in fade-in duration-200"
    >
      <div className="bg-[#0D0D0D] border-l border-[#C5A059] w-full max-w-md h-full flex flex-col justify-between p-6 shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="border-b border-[#F5F5F0]/15 pb-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bookmark className="w-5 h-5 text-[#C5A059]" />
              <h3 className="font-serif text-xl font-bold text-[#F5F5F0] uppercase tracking-[0.04em]">
                YOUR MUST-TRY LIST
              </h3>
            </div>
            <button
              onClick={onClose}
              id="close-must-try-drawer-btn"
              className="p-2 bg-[#161616] text-[#F5F5F0]/60 hover:text-[#C5A059] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-xs text-[#F5F5F0]/70 font-light mt-1">
            Curate dishes to show your server or share directly with dinner companions.
          </p>
        </div>

        {/* Item List */}
        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {items.length > 0 ? (
            items.map((item) => (
              <div
                key={item.id}
                className="p-3 bg-[#141414] border border-[#F5F5F0]/15 flex items-center justify-between gap-3 group hover:border-[#C5A059]/50 transition-colors"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 object-cover shrink-0 bg-black"
                />

                <div className="flex-1 min-w-0">
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-[#F5F5F0] truncate">
                    {item.name}
                  </h4>
                  <div className="text-[10px] text-[#C5A059] uppercase tracking-wider mt-0.5 font-light">
                    {item.category} • ₹{item.price}
                  </div>
                </div>

                <button
                  onClick={() => onRemoveItem(item.id)}
                  className="p-2 text-[#F5F5F0]/40 hover:text-red-400 transition-colors"
                  title="Remove from list"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))
          ) : (
            <div className="text-center py-20 text-[#F5F5F0]/60 space-y-3 font-light">
              <Utensils className="w-10 h-10 text-[#C5A059] mx-auto opacity-40" />
              <p className="text-sm">Your tasting list is currently empty.</p>
              <p className="text-xs text-[#F5F5F0]/40 max-w-xs mx-auto">
                Click "MUST-TRY" on any dish in the menu to build your personalized feast.
              </p>
            </div>
          )}
        </div>

        {/* Bottom Actions */}
        {items.length > 0 && (
          <div className="border-t border-[#F5F5F0]/15 pt-4 space-y-3">
            {/* Subtotal */}
            <div className="flex justify-between items-center bg-[#141414] p-3 border border-[#F5F5F0]/15">
              <span className="text-xs text-[#F5F5F0]/80 font-light">Estimated Total ({items.length} dishes):</span>
              <span className="font-serif text-lg font-bold text-[#C5A059]">₹{totalEstimate}</span>
            </div>

            {/* WhatsApp Share Button */}
            <a
              href={generateWhatsAppShare()}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs tracking-[0.16em] uppercase transition-all shadow-md flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" />
              <span>SHARE LIST VIA WHATSAPP</span>
            </a>

            {/* Table Booking */}
            <button
              onClick={() => {
                onClose();
                onOpenReservation();
              }}
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>RESERVE TABLE FOR THIS MENU</span>
            </button>

            <button
              onClick={onClearAll}
              className="w-full text-center text-[10px] text-[#F5F5F0]/40 hover:text-red-400 uppercase tracking-wider py-1"
            >
              Clear Entire List
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
