import React, { useState, useEffect } from 'react';
import { Crown, Phone, MessageSquare, Menu, X, Bookmark, Calendar, MapPin, Lock } from 'lucide-react';
import { KingsCrownLogo } from './KingsCrownLogo';
import { RESTAURANT_INFO } from '../data/restaurantData';
import { MustTryItem } from '../types';

interface NavbarProps {
  onOpenReservation: () => void;
  onOpenMustTry: () => void;
  onOpenAdmin?: () => void;
  mustTryItems: MustTryItem[];
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenReservation,
  onOpenMustTry,
  onOpenAdmin,
  mustTryItems
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#home' },
    { label: 'EXPERIENCE', href: '#experience' },
    { label: 'MENU', href: '#menu' },
    { label: 'ATMOSPHERE', href: '#ambience' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'OCCASIONS', href: '#occasions' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'LOCATION', href: '#location' }
  ];

  return (
    <>
      <header
        id="main-navigation-header"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-[#F5F5F0]/10 py-3.5 shadow-2xl'
            : 'bg-gradient-to-b from-[#0A0A0A]/90 via-[#0A0A0A]/40 to-transparent py-5 sm:py-6'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Official King's Crown Vector Crest */}
          <a
            href="#home"
            id="brand-logo-link"
            className="group flex items-center gap-3.5 text-left focus:outline-none shrink-0"
          >
            {/* Enlarged Crown Crest Logo */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 p-1.5 bg-[#111111] border border-[#C5A059] flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shadow-xl relative shrink-0">
              <div className="absolute -inset-0.5 bg-[#C5A059]/25 blur-xs -z-10 group-hover:bg-[#C5A059]/45 transition-colors" />
              <KingsCrownLogo className="w-full h-full" />
            </div>

            {/* Stacked KINGS and CROWN with Bar & Restaurant below */}
            <div className="flex flex-col justify-center">
              <div className="flex flex-col leading-[0.92]">
                <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-[#F5F5F0] group-hover:text-[#C5A059] transition-colors uppercase">
                  KINGS
                </span>
                <span className="font-serif text-lg sm:text-xl font-bold tracking-[0.2em] text-[#C5A059] uppercase mt-0.5">
                  CROWN
                </span>
              </div>
              <span className="block text-[8.5px] sm:text-[9.5px] tracking-[0.24em] text-[#F5F5F0]/80 uppercase font-medium mt-1 whitespace-nowrap">
                BAR AND RESTAURANT
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-4 xl:gap-6 2xl:gap-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                id={`nav-link-${link.label.toLowerCase()}`}
                className="text-[11px] xl:text-xs font-medium tracking-[0.14em] xl:tracking-[0.2em] text-[#F5F5F0]/70 hover:text-[#C5A059] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#C5A059] hover:after:w-full after:transition-all after:duration-300 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Actions on Desktop with Distinct Distance from LOCATION */}
          <div className="hidden sm:flex items-center gap-2.5 ml-5 lg:ml-6 xl:ml-8 pl-3.5 lg:pl-5 border-l border-[#F5F5F0]/15 shrink-0">
            {/* Compact Quick WhatsApp */}
            <a
              href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Kings'%20Crown%20Chinsurah,%20I%20would%20like%20to%20inquire%20about%20a%20table%20reservation.`}
              target="_blank"
              rel="noopener noreferrer"
              id="nav-quick-whatsapp"
              className="w-7 h-7 sm:w-8 sm:h-8 bg-[#141414] hover:bg-[#1f1f1f] border border-emerald-500/30 hover:border-emerald-400/70 text-emerald-400 transition-all flex items-center justify-center shadow-sm hover:scale-105"
              title="Chat on WhatsApp"
              aria-label="WhatsApp Chat"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-emerald-400/20" />
            </a>

            {/* Compact Menu Wishlist / Saved Items */}
            <button
              onClick={onOpenMustTry}
              id="must-try-wishlist-button"
              className="relative w-7 h-7 sm:w-8 sm:h-8 bg-[#141414] hover:bg-[#1f1f1f] border border-[#F5F5F0]/15 hover:border-[#C5A059] text-[#C5A059] transition-all flex items-center justify-center shadow-sm hover:scale-105"
              title="Saved Menu Dishes"
              aria-label="Must Try Wishlist"
            >
              <Bookmark className="w-3.5 h-3.5" />
              {mustTryItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-3.5 h-3.5 sm:w-4 sm:h-4 bg-[#C5A059] text-black font-bold text-[8px] sm:text-[9px] rounded-full flex items-center justify-center shadow-sm animate-pulse">
                  {mustTryItems.length}
                </span>
              )}
            </button>

            {/* Sleek, Noticeable & Compact "BOOK A TABLE" CTA */}
            <button
              onClick={onOpenReservation}
              id="nav-book-table-cta"
              className="relative group overflow-hidden px-3.5 py-1.5 sm:px-4 sm:py-2 bg-gradient-to-r from-[#C5A059] via-[#E6CE94] to-[#C5A059] hover:from-[#D4AF37] hover:via-[#F3E5AB] hover:to-[#C5A059] text-black font-bold text-[11px] sm:text-xs tracking-[0.16em] uppercase transition-all duration-300 shadow-[0_0_16px_rgba(197,160,89,0.4)] hover:shadow-[0_0_24px_rgba(197,160,89,0.65)] flex items-center gap-1.5 sm:gap-2 hover:scale-[1.03] active:scale-[0.98] border border-[#FFF8DC]/60"
            >
              {/* Shimmer Sheen Layer */}
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
              
              <Crown className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-black fill-black/30 shrink-0" />
              <span className="relative z-10 font-extrabold whitespace-nowrap">BOOK A TABLE</span>
              <span className="w-1.5 h-1.5 rounded-full bg-black/80 animate-ping shrink-0" />
            </button>
          </div>

          {/* Mobile Menu & Wishlist Trigger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenMustTry}
              id="mobile-must-try-button"
              className="relative p-2 bg-[#111111] border border-[#C5A059]/30 text-[#C5A059]"
              aria-label="Must Try Items"
            >
              <Bookmark className="w-4 h-4" />
              {mustTryItems.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#C5A059] text-black font-bold text-[9px] flex items-center justify-center">
                  {mustTryItems.length}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              id="mobile-hamburger-toggle"
              className="p-2 bg-[#111111] border border-[#C5A059]/30 text-[#F5F5F0] focus:outline-none"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#C5A059]" /> : <Menu className="w-5 h-5 text-[#C5A059]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Fullscreen Animated Menu Drawer */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="fixed inset-0 z-50 bg-[#0A0A0A]/98 backdrop-blur-xl flex flex-col justify-between p-6 overflow-y-auto sm:hidden animate-in fade-in duration-300"
        >
          {/* Top Bar inside Drawer */}
          <div className="flex items-center justify-between border-b border-[#F5F5F0]/10 pb-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 p-1 bg-[#111111] border border-[#C5A059] flex items-center justify-center shrink-0 shadow-md">
                <KingsCrownLogo className="w-full h-full" />
              </div>
              <div className="flex flex-col justify-center">
                <div className="flex flex-col leading-[0.92]">
                  <span className="font-serif text-base font-bold tracking-[0.2em] text-[#F5F5F0] uppercase">
                    KINGS
                  </span>
                  <span className="font-serif text-base font-bold tracking-[0.2em] text-[#C5A059] uppercase mt-0.5">
                    CROWN
                  </span>
                </div>
                <span className="text-[8.5px] tracking-[0.22em] text-[#F5F5F0]/75 uppercase font-medium mt-1 whitespace-nowrap">
                  BAR AND RESTAURANT
                </span>
              </div>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              id="mobile-drawer-close-button"
              className="p-2 bg-[#161616] border border-[#F5F5F0]/10 text-[#F5F5F0]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <div className="py-8 flex flex-col gap-5">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-serif text-xl tracking-[0.15em] text-[#F5F5F0] hover:text-[#C5A059] transition-colors flex items-center justify-between py-1 border-b border-[#F5F5F0]/5"
              >
                <span>{link.label}</span>
                <span className="text-xs text-[#C5A059]/60 font-sans tracking-widest">→</span>
              </a>
            ))}
          </div>

          {/* Location & Quick Action CTA */}
          <div className="space-y-4 pt-4 border-t border-[#F5F5F0]/10">
            <div className="flex items-center gap-2 text-xs text-[#F5F5F0]/70">
              <MapPin className="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>Rupali Arcade, Level 4, Chinsurah R.S.</span>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={`tel:${RESTAURANT_INFO.phone}`}
                className="flex items-center justify-center gap-2 py-3 bg-[#161616] border border-[#C5A059]/30 text-xs font-semibold tracking-wider text-[#C5A059]"
              >
                <Phone className="w-3.5 h-3.5" />
                CALL US
              </a>
              <a
                href={`https://wa.me/${RESTAURANT_INFO.whatsappNumber}?text=Hello%20Kings'%20Crown%20Chinsurah`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 py-3 bg-[#111c15] border border-emerald-500/30 text-xs font-semibold tracking-wider text-emerald-300"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                WHATSAPP
              </a>
            </div>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenReservation();
              }}
              id="mobile-drawer-reserve-cta"
              className="w-full py-3.5 bg-[#C5A059] hover:bg-[#D4AF37] text-black font-bold text-xs tracking-[0.2em] uppercase shadow-lg"
            >
              RESERVE A TABLE
            </button>

            {onOpenAdmin && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                id="mobile-drawer-admin-btn"
                className="w-full py-2.5 bg-[#141414] border border-[#C5A059]/30 text-[#C5A059] text-[11px] font-semibold tracking-wider uppercase flex items-center justify-center gap-1.5"
              >
                <Lock className="w-3.5 h-3.5" />
                <span>Manager / Admin Portal</span>
              </button>
            )}
          </div>
        </div>
      )}
    </>
  );
};
