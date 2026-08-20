import React from 'react';
import { MapPin, Phone, Mail, Clock, MessageSquare, ExternalLink, Instagram, Facebook, ArrowUp, Lock, ShieldCheck } from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';

interface FooterProps {
  onOpenReservation: () => void;
  onOpenAdmin?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenReservation, onOpenAdmin }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050505] text-[#F5F5F0] border-t border-[#F5F5F0]/10 pt-16 pb-24 sm:pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-14 border-b border-[#F5F5F0]/10">
          {/* Brand & Manifesto Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 p-1.5 bg-[#111111] border border-[#C5A059] flex items-center justify-center shadow-lg shrink-0">
                <KingsCrownLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col leading-[0.92]">
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#F5F5F0] uppercase">
                    KINGS
                  </span>
                  <span className="font-serif text-xl sm:text-2xl font-bold tracking-[0.2em] text-[#C5A059] uppercase mt-0.5">
                    CROWN
                  </span>
                </div>
                <span className="block text-[9.5px] sm:text-[10px] tracking-[0.24em] text-[#F5F5F0]/80 uppercase font-medium mt-1 whitespace-nowrap">
                  BAR AND RESTAURANT
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-[#F5F5F0]/80 font-light leading-relaxed pt-2">
              Food. Atmosphere. Royal Moments.
            </p>

            <p className="text-xs text-[#F5F5F0]/60 leading-relaxed font-light">
              An elevated dining and rooftop landmark at Rupali Arcade, crafted for unforgettable evenings, multi-cuisine gastronomy, craft bar pours, and warm hospitality in Chinsurah, Hooghly.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#111111] border border-[#F5F5F0]/15 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] hover:text-[#F5F5F0] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#111111] border border-[#F5F5F0]/15 hover:border-[#C5A059] flex items-center justify-center text-[#C5A059] hover:text-[#F5F5F0] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 bg-[#111111] border border-[#F5F5F0]/15 hover:border-emerald-400 flex items-center justify-center text-emerald-400 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase block">
              EXPLORE
            </span>
            <ul className="space-y-2 text-xs text-[#F5F5F0]/70 font-light">
              <li>
                <a href="#home" className="hover:text-[#C5A059] transition-colors">Home</a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#C5A059] transition-colors">The Experience</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#C5A059] transition-colors">Food & Bar Menu</a>
              </li>
              <li>
                <a href="#signature" className="hover:text-[#C5A059] transition-colors">Signature Creations</a>
              </li>
              <li>
                <a href="#ambience" className="hover:text-[#C5A059] transition-colors">Rooftop Atmosphere</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-[#C5A059] transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#occasions" className="hover:text-[#C5A059] transition-colors">Occasions & Parties</a>
              </li>
              <li>
                <a href="#location" className="hover:text-[#C5A059] transition-colors">Location & Hours</a>
              </li>
            </ul>
          </div>

          {/* Cuisines Showcase */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase block">
              CUISINE REPERTOIRE
            </span>
            <ul className="space-y-1.5 text-xs text-[#F5F5F0]/70 font-light">
              <li>Authentic Clay Tandoor & Kebabs</li>
              <li>Royal Awadhi Dum Biryanis</li>
              <li>Classic North Indian Curries & Naans</li>
              <li>Wok-Tossed Indo-Chinese & Sizzlers</li>
              <li>Continental Chicken Steaks & Pastas</li>
              <li>Belgian Sizzling Brownies & Desserts</li>
              <li>Curated Mocktails & Bar Beverages</li>
            </ul>
          </div>

          {/* Contact Details & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <span className="text-xs font-bold tracking-[0.2em] text-[#C5A059] uppercase block">
              VISIT & CONNECT
            </span>
            <div className="space-y-2 text-xs text-[#F5F5F0]/75 font-light">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <span>Rupali Arcade, Level 4, Chinsurah R.S., Chinsurah, WB 712101</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C5A059] shrink-0" />
                <a href={`tel:${RESTAURANT_INFO.phone}`} className="hover:text-[#C5A059]">
                  {RESTAURANT_INFO.phone}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="w-4 h-4 text-[#C5A059] shrink-0 mt-0.5" />
                <div>
                  <div>Mon – Thu: 12:00 PM – 11:00 PM</div>
                  <div>Fri – Sun: 12:00 PM – 11:30 PM</div>
                </div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenReservation}
                className="w-full py-2.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-[11px] tracking-[0.2em] uppercase transition-all shadow-md"
              >
                BOOK A TABLE NOW
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar & Local SEO Keywords */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#F5F5F0]/50 font-light">
          <div>
            © {new Date().getFullYear()} KINGS' CROWN Bar & Restaurant. All Rights Reserved. Rupali Arcade, Chinsurah.
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6">
            {onOpenAdmin && (
              <button
                onClick={onOpenAdmin}
                id="footer-admin-portal-link"
                className="inline-flex items-center gap-1.5 text-[#C5A059]/70 hover:text-[#C5A059] transition-colors py-1 px-2 bg-[#111111] border border-[#C5A059]/30 text-[11px] font-medium tracking-wider"
                title="Client & Staff Admin Access"
              >
                <Lock className="w-3 h-3 text-[#C5A059]" />
                <span>Admin Portal</span>
              </button>
            )}
            <a href={RESTAURANT_INFO.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-[#C5A059]">
              Google Maps
            </a>
            <span className="hover:text-[#C5A059] cursor-pointer">
              Privacy Policy
            </span>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1 text-[#C5A059] hover:text-[#F5F5F0] transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
