import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { OnlineBookingModal } from './components/OnlineBookingModal';
import { FloatingActionWidgets } from './components/FloatingActionWidgets';

import { HomePage } from './pages/HomePage';
import { ServicesPage } from './pages/ServicesPage';
import { CalculatorPage } from './pages/CalculatorPage';
import { TransformationsPage } from './pages/TransformationsPage';
import { LocationsPage } from './pages/LocationsPage';
import { IndustriesPage } from './pages/IndustriesPage';
import { AboutPage } from './pages/AboutPage';
import { ReviewsPage } from './pages/ReviewsPage';
import { BlogPage } from './pages/BlogPage';
import { FAQPage } from './pages/FAQPage';
import { ContactPage } from './pages/ContactPage';
import { BookingPage } from './pages/BookingPage';

// Helper component to scroll window to top on route navigation
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const [preselectedServiceId, setPreselectedServiceId] = useState<string | undefined>(undefined);
  const [prefilledTown, setPrefilledTown] = useState<string | undefined>(undefined);
  const [initialEstimateKsh, setInitialEstimateKsh] = useState<number | undefined>(undefined);

  const handleOpenBooking = (serviceId?: string, town?: string) => {
    if (serviceId) setPreselectedServiceId(serviceId);
    if (town) setPrefilledTown(town);
    setIsBookingOpen(true);
  };

  const handleBookWithEstimate = (calculatedData: {
    serviceType: string;
    totalKsh: number;
    bedrooms: number;
    bathrooms: number;
    sofaSeats: number;
    locationTown: string;
    addOns: string[];
  }) => {
    setInitialEstimateKsh(calculatedData.totalKsh);
    setPrefilledTown(calculatedData.locationTown);
    setIsBookingOpen(true);
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen flex flex-col bg-white text-slate-900 font-sans selection:bg-emerald-500 selection:text-slate-950">
        
        {/* Navigation Bar */}
        <Navbar
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Dedicated Multi-Page Routes */}
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage onOpenBooking={handleOpenBooking} />} />
            <Route path="/services" element={<ServicesPage onOpenBooking={handleOpenBooking} />} />
            <Route path="/calculator" element={<CalculatorPage onBookWithEstimate={handleBookWithEstimate} />} />
            <Route path="/transformations" element={<TransformationsPage onOpenBooking={() => handleOpenBooking()} />} />
            <Route path="/locations" element={<LocationsPage onBookInLocation={(town) => handleOpenBooking(undefined, town)} />} />
            <Route path="/industries" element={<IndustriesPage onSelectIndustryQuote={() => handleOpenBooking()} />} />
            <Route path="/about" element={<AboutPage onOpenBooking={() => handleOpenBooking()} />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/faq" element={<FAQPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/book" element={<BookingPage />} />
            <Route path="*" element={<HomePage onOpenBooking={handleOpenBooking} />} />
          </Routes>
        </main>

        {/* Footer */}
        <Footer
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* Interactive Online Booking Wizard Modal */}
        <OnlineBookingModal
          isOpen={isBookingOpen}
          onClose={() => {
            setIsBookingOpen(false);
            setPreselectedServiceId(undefined);
            setPrefilledTown(undefined);
            setInitialEstimateKsh(undefined);
          }}
          preselectedServiceId={preselectedServiceId}
          prefilledTown={prefilledTown}
          initialEstimateKsh={initialEstimateKsh}
        />

        {/* Sticky Call & Floating WhatsApp Action Widgets */}
        <FloatingActionWidgets />

      </div>
    </BrowserRouter>
  );
}

