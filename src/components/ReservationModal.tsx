import React, { useState, useEffect } from 'react';
import { 
  X, Calendar, Clock, Users, MapPin, CheckCircle2, MessageSquare, Phone, 
  Sparkles, Copy, ExternalLink, ArrowRight, ArrowLeft, Info, Check, AlertCircle, Loader2 
} from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { ReservationFormData } from '../types';
import { createTableBooking } from '../lib/reservationsService';

interface ReservationModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialOccasion?: string;
}

export const ReservationModal: React.FC<ReservationModalProps> = ({
  isOpen,
  onClose,
  initialOccasion
}) => {
  const today = new Date().toISOString().split('T')[0];

  // Try retrieving saved guest details from previous sessions
  const getSavedGuest = () => {
    try {
      const saved = localStorage.getItem('kings_crown_guest_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {
      // ignore
    }
    return null;
  };

  const savedGuest = getSavedGuest();

  // Form State
  const [formData, setFormData] = useState<ReservationFormData>({
    name: savedGuest?.name || '',
    phone: savedGuest?.phone || '',
    email: savedGuest?.email || '',
    date: today,
    time: '8:00 PM',
    guests: 4,
    seatingArea: "Queen's Sky Deck (Rooftop)",
    occasion: (initialOccasion as any) || 'Family Gathering',
    specialRequests: ''
  });

  // UI Flow & Firebase Status States
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [reservationCode, setReservationCode] = useState('');
  const [copied, setCopied] = useState(false);

  // Sync initial occasion if passed from external triggers
  useEffect(() => {
    if (initialOccasion) {
      setFormData(prev => ({ ...prev, occasion: initialOccasion as any }));
    }
  }, [initialOccasion]);

  // Handle ESC key press to close modal
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const timeSlots = [
    '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM', '3:00 PM',
    '7:00 PM', '7:30 PM', '8:00 PM', '8:30 PM', '9:00 PM', '9:30 PM', '10:00 PM'
  ];

  const seatingOptions = [
    "Queen's Sky Deck (Rooftop)",
    "King's Imperial Lounge (AC Dining)",
    "Poolside / Starlight Corner",
    "Cocktail Bar & Tap Lounge",
    "Private Celebration Banquet Wing"
  ];

  const occasionsList: ('Casual Dining' | 'Date Night' | 'Family Gathering' | 'Birthday Celebration' | 'Anniversary' | 'Corporate Dinner')[] = [
    'Casual Dining',
    'Date Night',
    'Family Gathering',
    'Birthday Celebration',
    'Anniversary',
    'Corporate Dinner'
  ];

  const buildFormattedText = (code: string) => {
    return (
      `Hello King's Crown Bar & Restaurant,\n\n` +
      `I would like to reserve a table with the following details:\n\n` +
      `• *Guest Name:* ${formData.name.trim()}\n` +
      `• *Contact Number:* ${formData.phone.trim()}\n` +
      `• *Number of Guests:* ${formData.guests} Guests\n` +
      `• *Date:* ${formData.date}\n` +
      `• *Time Slot:* ${formData.time}\n` +
      `• *Seating Preference:* ${formData.seatingArea}\n` +
      `• *Occasion:* ${formData.occasion}\n` +
      (formData.specialRequests.trim() ? `• *Special Requests:* ${formData.specialRequests.trim()}\n` : '') +
      `\nThank you for booking with King's Crown. Your reservation request has been recorded. Our team will contact you shortly via call or WhatsApp to confirm your table.`
    );
  };

  const getWhatsAppUrl = (code: string) => {
    const text = encodeURIComponent(buildFormattedText(code));
    return `https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=${text}`;
  };

  /**
   * Handles Table Reservation Submission:
   * 1. Saves booking data to Firebase Firestore (collection: "TableBookings")
   * 2. Directly opens WhatsApp with the formatted booking message
   * 3. Displays the elegant confirmation ticket on the website
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim()) return;

    setIsSaving(true);
    setSaveError(null);

    // Generate unique reservation reference code (e.g. KC-7412)
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const code = `KC-${randomSuffix}`;

    try {
      // 1. Save guest profile locally for quick future autocomplete
      try {
        localStorage.setItem('kings_crown_guest_profile', JSON.stringify({
          name: formData.name.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim()
        }));
      } catch {
        // ignore local storage errors
      }

      // 2. Save table reservation to Firebase Firestore collection "TableBookings"
      await createTableBooking({
        fullName: formData.name.trim(),
        whatsappContact: formData.phone.trim(),
        numberOfGuests: formData.guests,
        reservationDate: formData.date,
        preferredTimeSlot: formData.time,
        seatingAreaPreference: formData.seatingArea,
        occasion: formData.occasion,
        specialRequests: formData.specialRequests.trim(),
        reservationCode: code
      });

      // 3. Set reservation code & proceed directly to the confirmation ticket screen (next page)
      setReservationCode(code);
      setIsSubmitted(true);
      setIsSaving(false);
    } catch (err: any) {
      console.error('Error saving reservation to Firebase Firestore:', err);
      setIsSaving(false);
      setSaveError(
        err?.message || 'Unable to connect to the booking server. Please check your connection and try again.'
      );
    }
  };

  const handleCopyBooking = () => {
    const text = buildFormattedText(reservationCode || 'KC-7721');
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div
      id="reservation-modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-3 sm:p-5 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-[#111111] border border-[#C5A059] max-w-xl w-full p-4 sm:p-7 shadow-2xl relative my-4 sm:my-8 text-[#F5F5F0]">
        
        {/* Prominent Top Navigation Bar: Back & Close Buttons */}
        <div className="flex items-center justify-between pb-3 mb-4 border-b border-[#C5A059]/30">
          <button
            type="button"
            onClick={onClose}
            id="back-to-restaurant-btn"
            className="inline-flex items-center gap-1.5 py-1.5 px-2.5 sm:px-3 bg-[#181818] hover:bg-[#222222] border border-[#F5F5F0]/20 hover:border-[#C5A059] text-[#F5F5F0]/90 hover:text-[#C5A059] text-xs font-semibold tracking-wider transition-colors min-h-[40px]"
            aria-label="Go back to restaurant website"
          >
            <ArrowLeft className="w-4 h-4 text-[#C5A059]" />
            <span>Back</span>
          </button>

          <div className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase hidden sm:block">
            King's Crown Reservation
          </div>

          <button
            type="button"
            onClick={onClose}
            id="close-reservation-modal-btn"
            className="inline-flex items-center gap-1.5 py-1.5 px-3 bg-[#1e1710] hover:bg-[#2a2015] border border-[#C5A059] text-[#C5A059] hover:text-[#E6CE94] text-xs font-bold tracking-wider uppercase transition-all shadow-md active:scale-95 min-h-[40px]"
            aria-label="Close table reservation"
          >
            <span>Close</span>
            <X className="w-4 h-4 text-[#C5A059]" />
          </button>
        </div>

        {!isSubmitted ? (
          <div>
            {/* Modal Header */}
            <div className="text-center mb-6">
              <div className="flex justify-center mb-2">
                <div className="w-10 h-10 p-1 bg-[#0A0A0A] border border-[#C5A059] flex items-center justify-center shadow-lg">
                  <KingsCrownLogo className="w-full h-full" />
                </div>
              </div>
              <div className="text-[10px] sm:text-xs font-bold tracking-[0.25em] text-[#C5A059] uppercase mb-1">
                KING'S & QUEEN'S CROWN • CHINSURAH
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0] uppercase tracking-[0.04em]">
                RESERVE YOUR TABLE
              </h3>
              <p className="text-xs text-[#F5F5F0]/70 font-light mt-1">
                Please provide your details below to place your table reservation
              </p>
            </div>

            {/* Error message alert if booking fails */}
            {saveError && (
              <div className="mb-4 p-3 bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-start gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                <div className="flex-1">
                  <span className="font-semibold block">Booking Submission Notice:</span>
                  <span>{saveError}</span>
                </div>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guests Selector */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                  Number of Guests
                </label>
                <div className="flex flex-wrap gap-2">
                  {[2, 4, 6, 8, 10, 15, 20].map((num) => (
                    <button
                      type="button"
                      key={num}
                      onClick={() => setFormData({ ...formData, guests: num })}
                      className={`py-1.5 px-3 text-xs font-bold transition-all ${
                        formData.guests === num
                          ? 'bg-[#C5A059] text-black shadow-md'
                          : 'bg-[#161616] text-[#F5F5F0]/80 border border-[#F5F5F0]/15 hover:border-[#C5A059]'
                      }`}
                    >
                      {num} {num === 20 ? '20+' : 'Guests'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Date & Time Slot Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                    Reservation Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                    className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                    Preferred Time Slot
                  </label>
                  <select
                    value={formData.time}
                    onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                    className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                  >
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Seating Area Preference */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                  Seating Area Preference
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {seatingOptions.map((area) => (
                    <button
                      type="button"
                      key={area}
                      onClick={() => setFormData({ ...formData, seatingArea: area })}
                      className={`py-2 px-3 text-xs font-semibold text-left transition-all border ${
                        formData.seatingArea === area
                          ? 'bg-[#C5A059]/20 border-[#C5A059] text-[#C5A059]'
                          : 'bg-[#161616] border-[#F5F5F0]/15 text-[#F5F5F0]/70 hover:border-[#C5A059]/40'
                      }`}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>

              {/* Occasion Selector */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1.5">
                  Occasion (Optional)
                </label>
                <select
                  value={formData.occasion}
                  onChange={(e) => setFormData({ ...formData, occasion: e.target.value as any })}
                  className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                >
                  {occasionsList.map((occ) => (
                    <option key={occ} value={occ}>
                      {occ}
                    </option>
                  ))}
                </select>
              </div>

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sourav Mukherjee"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1 flex items-center justify-between">
                    <span>WhatsApp / Contact *</span>
                    {savedGuest?.phone && (
                      <span className="text-[9px] text-[#C5A059] font-normal lowercase">auto-remembered</span>
                    )}
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. +91 98300 00000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              {/* Special Requests */}
              <div>
                <label className="block text-[11px] font-bold tracking-wider text-[#C5A059] uppercase mb-1">
                  Special Requests / Dietary Notes
                </label>
                <input
                  type="text"
                  placeholder="e.g. High chair for baby, quiet corner table, anniversary cake setup..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full bg-[#161616] border border-[#F5F5F0]/20 px-3 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C5A059]"
                />
              </div>

              {/* Submit CTA & Cancel Action */}
              <div className="pt-3 space-y-2">
                <button
                  type="submit"
                  disabled={isSaving}
                  id="confirm-table-reservation-btn"
                  className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] disabled:bg-[#C5A059]/60 text-black font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.99]"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-4 h-4 text-black animate-spin" />
                      <span>SAVING RESERVATION...</span>
                    </>
                  ) : (
                    <>
                      <span>CONFIRM & PROCEED</span>
                      <ArrowRight className="w-4 h-4 text-black" />
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={onClose}
                  id="cancel-reservation-btn"
                  className="w-full py-2.5 bg-transparent hover:bg-[#181818] border border-[#F5F5F0]/15 hover:border-[#F5F5F0]/30 text-[#F5F5F0]/70 hover:text-[#F5F5F0] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Cancel / Return to Website</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* Confirmation Screen */
          <div className="text-center py-4 space-y-6">
            <div className="w-14 h-14 bg-[#161616] border border-[#C5A059] text-[#C5A059] mx-auto flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-[#C5A059]" />
            </div>

            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#C5A059]/15 border border-[#C5A059]/40 mb-2">
                <Sparkles className="w-3 h-3 text-[#C5A059]" />
                <span className="text-[10px] font-bold tracking-[0.25em] text-[#C5A059] uppercase">
                  RESERVATION SUBMITTED
                </span>
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-[#F5F5F0] uppercase">
                THANK YOU FOR YOUR BOOKING
              </h3>
              <p className="text-xs text-[#F5F5F0]/80 mt-2 max-w-md mx-auto leading-relaxed font-light">
                Thank you, you have booked a table through our website. We have recorded your selected details below.
              </p>
            </div>

            {/* Summary Ticket */}
            <div className="bg-[#161616] border border-[#F5F5F0]/15 p-4 text-left text-xs space-y-2.5 max-w-md mx-auto">
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Booking Reference:</span>
                <span className="font-mono font-bold text-[#C5A059]">{reservationCode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Guest Name:</span>
                <span className="font-bold text-[#F5F5F0]">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Contact Number:</span>
                <span className="font-bold text-[#F5F5F0]">{formData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Party Size:</span>
                <span className="font-bold text-[#F5F5F0]">{formData.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Date & Time:</span>
                <span className="font-bold text-[#C5A059]">{formData.date} at {formData.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Seating Preference:</span>
                <span className="font-bold text-[#F5F5F0]">{formData.seatingArea}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#F5F5F0]/60">Occasion:</span>
                <span className="font-bold text-[#F5F5F0]">{formData.occasion}</span>
              </div>
              {formData.specialRequests && (
                <div className="flex justify-between pt-1 border-t border-[#F5F5F0]/10">
                  <span className="text-[#F5F5F0]/60">Special Requests:</span>
                  <span className="font-medium text-[#C5A059] max-w-[200px] text-right truncate">{formData.specialRequests}</span>
                </div>
              )}
            </div>

            {/* Reassurance Message */}
            <div className="bg-[#1c1811] border border-[#C5A059]/40 p-4 text-left max-w-md mx-auto">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <p className="text-xs text-[#F5F5F0]/90 leading-relaxed font-light">
                  <strong className="text-[#C5A059] font-semibold block mb-0.5">Booking Confirmation:</strong>
                  Your table booking request has been submitted. Our team will review availability and contact you shortly via call or message to confirm your table.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2.5 max-w-md mx-auto pt-1">
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                id="done-reservation-btn"
                className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] uppercase transition-all shadow-xl flex items-center justify-center gap-2 active:scale-[0.99]"
              >
                <Check className="w-4 h-4 text-black stroke-[3]" />
                <span>DONE</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  onClose();
                }}
                id="return-to-website-btn"
                className="w-full py-2.5 bg-transparent hover:bg-[#181818] border border-[#F5F5F0]/15 hover:border-[#F5F5F0]/30 text-[#F5F5F0]/70 hover:text-[#F5F5F0] text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>RETURN TO WEBSITE</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};


