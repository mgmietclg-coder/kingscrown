import React, { useState, useEffect } from 'react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { BrandIntroSection } from './components/BrandIntroSection';
import { ExperienceSection } from './components/ExperienceSection';
import { FoodShowcaseSection } from './components/FoodShowcaseSection';
import { SignatureShowcaseSection } from './components/SignatureShowcaseSection';
import { RooftopAmbienceSection } from './components/RooftopAmbienceSection';
import { GallerySection } from './components/GallerySection';
import { OccasionsSection } from './components/OccasionsSection';
import { SocialProofSection } from './components/SocialProofSection';
import { LocationSection } from './components/LocationSection';
import { ReservationCTASection } from './components/ReservationCTASection';
import { Footer } from './components/Footer';
import { MobileStickyBar } from './components/MobileStickyBar';
import { ReservationModal } from './components/ReservationModal';
import { FullMenuModal } from './components/FullMenuModal';
import { MustTryDrawer } from './components/MustTryDrawer';
import { AdminDashboardModal } from './components/AdminDashboardModal';
import { MenuItem, SignatureDish, MustTryItem } from './types';
import { Check, Sparkles } from 'lucide-react';
import { CinematicReveal } from './components/CinematicReveal';

export default function App() {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isFullMenuOpen, setIsFullMenuOpen] = useState(false);
  const [isMustTryOpen, setIsMustTryOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedOccasion, setSelectedOccasion] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load bookmarked dishes from local storage
  const [mustTryItems, setMustTryItems] = useState<MustTryItem[]>(() => {
    try {
      const saved = localStorage.getItem('kings_crown_must_try');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('kings_crown_must_try', JSON.stringify(mustTryItems));
    } catch (e) {
      console.error(e);
    }
  }, [mustTryItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleToggleMustTry = (item: MenuItem | SignatureDish) => {
    const exists = mustTryItems.some((i) => i.id === item.id);
    if (exists) {
      setMustTryItems(mustTryItems.filter((i) => i.id !== item.id));
      showToast(`Removed "${item.name}" from your Must-Try list`);
    } else {
      const newItem: MustTryItem = {
        id: item.id,
        name: item.name,
        category: (item as any).category || (item as any).tag || 'Specialty',
        price: item.price,
        image: item.image,
        isVeg: item.isVeg
      };
      setMustTryItems([...mustTryItems, newItem]);
      showToast(`Added "${item.name}" to your Must-Try list`);
    }
  };

  const handleRemoveFromMustTry = (id: string) => {
    const item = mustTryItems.find((i) => i.id === id);
    setMustTryItems(mustTryItems.filter((i) => i.id !== id));
    if (item) {
      showToast(`Removed "${item.name}"`);
    }
  };

  const handleClearMustTry = () => {
    setMustTryItems([]);
    showToast('Tasting list cleared');
  };

  const handleOpenReservation = (occasion?: string) => {
    setSelectedOccasion(occasion);
    setIsReservationOpen(true);
  };

  const handleExploreMenu = () => {
    const menuEl = document.getElementById('menu');
    if (menuEl) {
      menuEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <SpeedInsights />
      <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] flex flex-col font-sans selection:bg-[#C5A059]/30 selection:text-[#F5F5F0]">
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed top-20 right-4 sm:right-8 z-50 bg-[#141414] border border-[#C5A059] text-[#F5F5F0] px-4 py-3 shadow-2xl backdrop-blur-md flex items-center gap-2.5 text-xs animate-in slide-in-from-top-4 duration-300">
            <Sparkles className="w-4 h-4 text-[#C5A059] shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

      {/* Main Transparent / Sticky Navigation */}
      <Navbar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMustTry={() => setIsMustTryOpen(true)}
        onOpenAdmin={() => setIsAdminOpen(true)}
        mustTryItems={mustTryItems}
      />

      {/* Full-Screen Hero Section */}
      <main className="flex-1">
        <HeroSection
          onOpenReservation={() => handleOpenReservation()}
          onExploreMenu={handleExploreMenu}
        />

        {/* Brand Editorial Intro Section */}
        <CinematicReveal>
          <BrandIntroSection />
        </CinematicReveal>

        {/* 4 Core Signature Experiences */}
        <CinematicReveal>
          <ExperienceSection
            onOpenReservation={() => handleOpenReservation()}
          />
        </CinematicReveal>

        {/* Food Categories & Horizontal Menu Showcase */}
        <CinematicReveal>
          <FoodShowcaseSection
            onOpenFullMenu={() => setIsFullMenuOpen(true)}
            onToggleMustTry={handleToggleMustTry}
            mustTryItems={mustTryItems}
          />
        </CinematicReveal>

        {/* Signature Dishes Spotlight */}
        <CinematicReveal>
          <SignatureShowcaseSection
            onToggleMustTry={handleToggleMustTry}
            mustTryItems={mustTryItems}
            onOpenReservation={() => handleOpenReservation()}
          />
        </CinematicReveal>

        {/* Rooftop Atmosphere & Ambience Section */}
        <CinematicReveal>
          <RooftopAmbienceSection
            onOpenReservation={() => handleOpenReservation()}
          />
        </CinematicReveal>

        {/* Visual Chronicles Gallery Section with Masonry & Lightbox */}
        <CinematicReveal>
          <GallerySection />
        </CinematicReveal>

        {/* Occasions & Party Celebrations */}
        <CinematicReveal>
          <OccasionsSection
            onOpenReservationWithOccasion={(occ) => handleOpenReservation(occ)}
          />
        </CinematicReveal>

        {/* Verified Social Proof & Customer Reviews */}
        <CinematicReveal>
          <SocialProofSection />
        </CinematicReveal>

        {/* Location, Accessibility & Operating Hours */}
        <CinematicReveal>
          <LocationSection />
        </CinematicReveal>

        {/* Dramatic Bottom Reservation Call to Action */}
        <CinematicReveal>
          <ReservationCTASection
            onOpenReservation={() => handleOpenReservation()}
          />
        </CinematicReveal>
      </main>

      {/* Editorial Luxury Minimal Footer */}
      <CinematicReveal>
        <Footer
          onOpenReservation={() => handleOpenReservation()}
          onOpenAdmin={() => setIsAdminOpen(true)}
        />
      </CinematicReveal>

      {/* Mobile Sticky Quick Action Bar */}
      <MobileStickyBar
        onOpenReservation={() => handleOpenReservation()}
        onOpenMustTry={() => setIsMustTryOpen(true)}
        mustTryItems={mustTryItems}
      />

      {/* Interactive Table Reservation Modal */}
      <ReservationModal
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        initialOccasion={selectedOccasion}
      />

      {/* Full Digital Menu Modal */}
      <FullMenuModal
        isOpen={isFullMenuOpen}
        onClose={() => setIsFullMenuOpen(false)}
        onToggleMustTry={handleToggleMustTry}
        mustTryItems={mustTryItems}
      />

      {/* Guest's Must-Try Tasting List Drawer */}
      <MustTryDrawer
        isOpen={isMustTryOpen}
        onClose={() => setIsMustTryOpen(false)}
        items={mustTryItems}
        onRemoveItem={handleRemoveFromMustTry}
        onClearAll={handleClearMustTry}
        onOpenReservation={() => handleOpenReservation()}
      />

      {/* Client / Staff Admin Management Portal */}
      <AdminDashboardModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
      />
      </div>
    </>
  );
}
