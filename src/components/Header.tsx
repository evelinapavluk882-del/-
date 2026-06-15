import { useState, useEffect } from 'react';
import { Menu, X, CalendarCheck } from 'lucide-react';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  bookingCount: number;
}

export default function Header({ activeTab, setActiveTab, bookingCount }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', name: 'Головна' },
    { id: 'services', name: 'Послуги та ціни' },
    { id: 'testimonials', name: 'Відгуки' },
    { id: 'care', name: 'Стерильність' },
    { id: 'location-guide', name: 'Як знайти' },
    { id: 'my-bookings', name: 'Мої записи' },
  ];

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
         top: offsetPosition,
         behavior: 'smooth'
      });
    }
  };

  return (
    <header 
      id="main-header"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/95 border-b border-purple-900/20 py-4 shadow-xl' 
          : 'bg-transparent py-6 border-b border-white/5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div 
            onClick={() => handleNavClick('hero')} 
            className="flex items-center space-x-2 cursor-pointer group"
          >
            <div className="text-2xl font-black tracking-tighter uppercase text-white group flex items-center gap-1.5 font-sans">
              AURA<span className="text-purple-500 font-black">.</span>PIERCING
              <span className="text-[9px] font-mono tracking-widest border border-purple-500/20 px-1.5 py-0.5 rounded ml-2 hidden sm:inline-block text-zinc-400 uppercase font-bold group-hover:text-purple-400 group-hover:border-purple-400/30 transition-all">KYIV</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav role="navigation" className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  id={`nav-btn-${item.id}`}
                  onClick={() => handleNavClick(item.id)}
                  className={`px-3 py-1.5 transition-all text-xs uppercase tracking-widest ${
                    isActive 
                      ? 'text-purple-400 font-extrabold font-black border-b-2 border-purple-500 rounded-none' 
                      : 'text-zinc-300 hover:text-white font-bold'
                  }`}
                >
                  <span className="relative z-10 flex items-center gap-1.5">
                    {item.name}
                    {item.id === 'my-bookings' && bookingCount > 0 && (
                      <span className="ml-1 bg-purple-600 text-white text-[9px] font-black px-1.5 py-0.5 rounded-none animate-pulse">
                        {bookingCount}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}

            {/* Action booking CTA */}
            <button
              id="cta-booking-btn"
              onClick={() => handleNavClick('booking-section')}
              className="ml-5 bg-white text-black hover:bg-purple-600 hover:text-white font-black px-5 py-2.5 transition-all duration-200 active:scale-95 text-xs uppercase tracking-widest flex items-center space-x-1.5"
            >
              <CalendarCheck className="w-3.5 h-3.5" />
              <span>Записатись</span>
            </button>
          </nav>

          {/* Hamburger Menu Mobile */}
          <div className="md:hidden flex items-center space-x-3">
            {bookingCount > 0 && (
              <button 
                onClick={() => handleNavClick('my-bookings')}
                className="bg-black border border-purple-500/20 p-2 text-purple-400 active:scale-95 relative"
              >
                <CalendarCheck className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-purple-600 text-white text-[9px] font-bold w-4 h-4 flex items-center justify-center">
                  {bookingCount}
                </span>
              </button>
            )}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white p-2 hover:text-purple-400 focus:outline-none transition-colors"
              aria-label="Toggle Menu"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden bg-zinc-950 border-b border-white/10 px-4 pt-2 pb-6 space-y-2 shadow-2xl transition-all duration-300">
          <div className="flex flex-col space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest font-bold transition-colors flex items-center justify-between ${
                    isActive 
                      ? 'text-purple-400 bg-zinc-900/50 border-l-2 border-purple-500' 
                      : 'text-zinc-300 hover:bg-zinc-900/30 hover:text-white'
                  }`}
                >
                  <span>{item.name}</span>
                  {item.id === 'my-bookings' && bookingCount > 0 && (
                    <span className="bg-purple-600 text-white text-[10px] font-black px-2 py-0.5">
                      {bookingCount}
                    </span>
                  )}
                </button>
              );
            })}
            <div className="pt-4 px-4">
              <button
                onClick={() => handleNavClick('booking-section')}
                className="w-full bg-white text-black hover:bg-purple-600 hover:text-white font-bold py-3 px-4 transition-all duration-200 flex items-center justify-center space-x-2 text-xs uppercase tracking-widest"
              >
                <CalendarCheck className="w-5 h-5" />
                <span>Записатись онлайн</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
