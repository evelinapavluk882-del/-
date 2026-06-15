import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import Testimonials from './components/Testimonials';
import BookingWizard from './components/BookingWizard';
import CareGuide from './components/CareGuide';
import VisualLocationGuide from './components/VisualLocationGuide';
import MyBookings from './components/MyBookings';
import Footer from './components/Footer';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [selectedServiceId, setSelectedServiceId] = useState<string>('');
  const [preselectedJewelry, setPreselectedJewelry] = useState<string>('');
  const [bookingCount, setBookingCount] = useState<number>(0);
  const [bookingChangeTrigger, setBookingChangeTrigger] = useState<number>(0);

  const updateBookingCount = () => {
    try {
      const existing = localStorage.getItem('aura_piercing_appointments');
      if (existing) {
        const parsed = JSON.parse(existing);
        // Only count active (not cancelled) appointments
        const active = parsed.filter((apt: any) => apt.status !== 'cancelled');
        setBookingCount(active.length);
      } else {
        setBookingCount(0);
      }
    } catch (e) {
      setBookingCount(0);
    }
  };

  useEffect(() => {
    updateBookingCount();
  }, [bookingChangeTrigger]);

  const handleSelectServiceForBooking = (serviceId: string, jewelryType?: string) => {
    setSelectedServiceId(serviceId);
    setPreselectedJewelry(jewelryType || '');
    setActiveTab('booking-section');
  };

  const handleBookingSuccess = () => {
    // Increment trigger to notify bookings list & update the header badge immediately
    setBookingChangeTrigger(prev => prev + 1);
  };

  const navigateToBookingSection = () => {
    setActiveTab('booking-section');
    const bSection = document.getElementById('booking-section');
    if (bSection) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = bSection.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-black min-h-screen text-slate-100 font-sans selection:bg-purple-600 selection:text-white">
      
      {/* Dynamic Navigation Header */}
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        bookingCount={bookingCount}
      />

      {/* Main Sections */}
      <main className="relative">
        <Hero onCTAQuery={setActiveTab} />
        
        <Services onSelectServiceForBooking={handleSelectServiceForBooking} />

        <Testimonials />
        
        <CareGuide />

        <VisualLocationGuide />

        {/* Modular interactive booking wizard with parent-child state synchronization */}
        <BookingWizard 
          selectedServiceId={selectedServiceId} 
          preselectedJewelry={preselectedJewelry}
          onBookingSuccess={handleBookingSuccess} 
        />
        
        {/* LocalStorage book manager panel */}
        <MyBookings 
          changeTrigger={bookingChangeTrigger} 
          onNavigateToBooking={navigateToBookingSection}
        />
      </main>

      {/* Standard Studio Coordinates Footer */}
      <Footer />

    </div>
  );
}
