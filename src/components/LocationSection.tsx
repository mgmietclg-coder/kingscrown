import React from 'react';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MapPin, Navigation, Phone, MessageSquare, Clock, ShieldCheck, Car, Building2, CheckCircle2 } from 'lucide-react';

export const LocationSection: React.FC = () => {
  return (
    <section id="location" className="py-20 sm:py-28 bg-[#0A0A0A] border-t border-[#F5F5F0]/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 sm:mb-18">
          <span className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#C5A059] uppercase block mb-3">
            VISIT & ACCESSIBILITY
          </span>
          <h2
            id="location-section-heading"
            className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.04em] text-[#F5F5F0] uppercase"
          >
            FIND YOUR WAY TO KINGS' CROWN.
          </h2>
          <div className="w-12 h-[1px] bg-[#C5A059] mx-auto mt-4 mb-4" />
          <p className="text-sm sm:text-base text-[#F5F5F0]/75 font-light">
            Conveniently located at Rupali Arcade near Chinsurah Railway Station, easily accessible across Hooghly.
          </p>
        </div>

        {/* Location Details + Map Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Address, Hours, Contact Card */}
          <div className="lg:col-span-5 bg-[#111111] border border-[#F5F5F0]/10 p-6 sm:p-8 flex flex-col justify-between shadow-2xl">
            <div className="space-y-6">
              {/* Address Block */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                  <MapPin className="w-4 h-4 text-[#C5A059]" />
                  <span>ADDRESS & LANDMARK</span>
                </div>
                <div className="text-sm sm:text-base text-[#F5F5F0] font-serif pl-6 leading-relaxed">
                  <strong className="block text-lg font-bold text-[#C5A059]">Rupali Arcade, Level 4</strong>
                  Chinsurah R.S., Chinsurah,<br />
                  West Bengal 712101, India
                </div>
                <div className="pl-6 text-xs text-[#F5F5F0]/60 font-light">
                  Near Chinsurah Railway Station & Grand Trunk Road connectivity.
                </div>
              </div>

              {/* Operating Hours */}
              <div className="pt-4 border-t border-[#F5F5F0]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                  <Clock className="w-4 h-4 text-[#C5A059]" />
                  <span>OPERATING HOURS</span>
                </div>
                <div className="pl-6 space-y-1.5 text-xs text-[#F5F5F0]/80">
                  {RESTAURANT_INFO.hours.map((h, i) => (
                    <div key={i} className="flex justify-between items-center py-1 border-b border-[#F5F5F0]/5">
                      <span className="font-medium text-[#F5F5F0]">{h.days}</span>
                      <span className="text-[#C5A059] font-semibold">{h.time}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Amenities & Parking */}
              <div className="pt-4 border-t border-[#F5F5F0]/10 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase">
                  <Building2 className="w-4 h-4 text-[#C5A059]" />
                  <span>VENUE AMENITIES</span>
                </div>
                <div className="pl-6 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#F5F5F0]/75">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>High-Speed Elevator</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Dedicated Parking</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>100% AC Dining Hall</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#C5A059]" />
                    <span>Open-Sky Rooftop Deck</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Action Buttons */}
            <div className="mt-8 pt-6 border-t border-[#F5F5F0]/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
              <a
                href={RESTAURANT_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                id="get-directions-btn"
                className="py-3 px-4 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.16em] uppercase transition-all shadow-md flex items-center justify-center gap-2 text-center"
              >
                <Navigation className="w-3.5 h-3.5 text-black" />
                <span>GET DIRECTIONS</span>
              </a>

              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                id="location-call-btn"
                className="py-3 px-4 bg-[#111111] border border-[#C5A059] hover:bg-[#C5A059] hover:text-black text-[#C5A059] font-bold text-xs tracking-[0.16em] uppercase transition-all flex items-center justify-center gap-2 text-center"
              >
                <Phone className="w-3.5 h-3.5 text-[#C5A059]" />
                <span>CALL RESTAURANT</span>
              </a>
            </div>
          </div>

          {/* Right Column: Google Maps Interactive Card & Visual Presentation */}
          <div className="lg:col-span-7 bg-[#111111] border border-[#F5F5F0]/10 overflow-hidden flex flex-col shadow-2xl relative">
            <div className="relative flex-1 min-h-[350px] w-full">
              {/* Google Map Embed */}
              <iframe
                title="Kings' Crown Restaurant Location Map Chinsurah"
                src="https://maps.google.com/maps?q=Rupali+Arcade+Chinsurah+RS+West+Bengal+712101&t=&z=16&ie=UTF8&iwloc=&output=embed"
                className="w-full h-full min-h-[360px] border-0 filter invert-[90%] hue-rotate-180 contrast-125"
                loading="lazy"
                allowFullScreen
              />

              {/* Map Floating Indicator Card */}
              <div className="absolute top-4 right-4 bg-black/90 backdrop-blur-md border border-[#C5A059]/40 p-3 shadow-xl max-w-xs text-left">
                <span className="text-[10px] font-bold tracking-[0.2em] text-[#C5A059] uppercase block">
                  KINGS' CROWN CHINSURAH
                </span>
                <span className="text-xs text-[#F5F5F0]/80 font-light block mt-0.5">
                  Rupali Arcade, Level 4 (Rooftop & AC)
                </span>
                <a
                  href={RESTAURANT_INFO.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 text-[10px] font-bold text-[#C5A059] hover:underline flex items-center gap-1"
                >
                  <span>Open in Google Maps App</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Bottom Info Banner */}
            <div className="bg-[#141414] p-4 sm:p-5 border-t border-[#F5F5F0]/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs text-[#F5F5F0]/80 font-medium">
                  We are accepting table reservations & walk-ins for lunch and dinner.
                </span>
              </div>

              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hi%20Kings'%20Crown,%20I%20am%20heading%20over%20and%20wanted%20to%20check%20table%20availability.`}
                target="_blank"
                rel="noopener noreferrer"
                id="whatsapp-location-quick-btn"
                className="px-4 py-2 bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold tracking-wider uppercase hover:bg-emerald-900 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <MessageSquare className="w-3.5 h-3.5 text-emerald-400" />
                <span>WhatsApp Live Desk</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
