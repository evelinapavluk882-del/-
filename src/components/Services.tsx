import { useState } from 'react';
import { SERVICES } from '../data';
import { ShieldCheck, Flame, Clock, BadgePercent, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import PiercingDetailModal from './PiercingDetailModal';

interface ServicesProps {
  onSelectServiceForBooking: (serviceId: string) => void;
}

export default function Services({ onSelectServiceForBooking }: ServicesProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedModalServiceId, setSelectedModalServiceId] = useState<string | null>(null);

  const categories = [
    { id: 'all', name: 'Всі проколи' },
    { id: 'ear', name: 'Вухо' },
    { id: 'nose', name: 'Ніс' },
    { id: 'lip', name: 'Губа' },
    { id: 'face', name: 'Обличчя' },
    { id: 'body', name: 'Тіло / Інше' }
  ];

  const filteredServices = selectedCategory === 'all' 
    ? SERVICES 
    : SERVICES.filter(service => service.category === selectedCategory);

  const renderPainLevelDots = (level: number) => {
    return (
      <div className="flex items-center space-x-1" title={`Рівень болю: ${level}/5`}>
        {[1, 2, 3, 4, 5].map((dot) => (
          <div 
            key={dot} 
            className={`w-2.5 h-2.5 ${
              dot <= level 
                ? 'bg-purple-500' 
                : 'bg-zinc-800'
            }`} 
          />
        ))}
      </div>
    );
  };

  const handleBookClick = (serviceId: string) => {
    onSelectServiceForBooking(serviceId);
    const element = document.getElementById('booking-section');
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
    <section id="services" className="py-24 bg-black relative border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            ПРАЙС-ЛИСТ ТА ПОСЛУГИ
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black text-white mt-3 tracking-tighter uppercase leading-none">
            Каталог наших проколів
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mt-4" />
          <p className="text-zinc-400 mt-4 font-light text-sm sm:text-base leading-relaxed">
            Усі ціни включають безпосередньо послугу проколу, первинну сертифіковану прикрасу з титану ASTM F-136, повну стерилізацію та супровід до загоєння.
          </p>
        </div>

        {/* Categories Tab Selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-5 py-2.5 text-xs font-black uppercase tracking-widest transition-all duration-200 border ${
                selectedCategory === cat.id 
                  ? 'bg-purple-600 text-white border-purple-600' 
                  : 'bg-zinc-950 text-zinc-400 hover:text-white border-white/10 hover:border-purple-500/30'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>

        {/* Services Grid with Framer Motion AnimatePresence */}
        <motion.div 
          layout 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service) => (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                key={service.id}
                className="bg-zinc-950 border border-white/10 hover:border-purple-500 p-6 transition-all duration-300 shadow-md flex flex-col justify-between group relative"
              >
                {/* Visual Accent Badge */}
                <span className="absolute top-4 right-4 bg-black text-zinc-450 text-[9px] font-mono tracking-widest px-2.5 py-1 rounded-none uppercase border border-white/10 font-bold">
                  {service.categoryUa}
                </span>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-purple-400 uppercase tracking-tight transition-colors">
                      {service.name}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-3 mt-2 font-light leading-relaxed">
                      {service.description}
                    </p>
                  </div>

                  {/* Core parameters */}
                  <div className="pt-4 border-t border-white/10 space-y-2.5 text-xs text-zinc-300">
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-550 flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider">
                        <Flame className="w-3.5 h-3.5 text-purple-400" /> Рівень болю:
                      </span>
                      {renderPainLevelDots(service.painLevel)}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-zinc-550 flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider">
                        <Clock className="w-3.5 h-3.5 text-zinc-400" /> Загоєння:
                      </span>
                      <span className="font-black text-zinc-200">{service.healingTime}</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-550 flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider">
                        <ShieldCheck className="w-3.5 h-3.5 text-purple-400" /> Базова прикраса:
                      </span>
                      <span className="text-zinc-200 font-bold">Титановий лабрет/штанга</span>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="text-zinc-550 flex items-center gap-1.5 font-bold uppercase text-[10px] tracking-wider">
                        <span className="text-purple-400 font-black text-[9px] border border-purple-500/20 px-1 rounded">Age</span> Рекомендований вік:
                      </span>
                      <span className="font-extrabold text-zinc-100">{service.minAge || '16+ років'}</span>
                    </div>

                    <div className="pt-2 text-[10px] text-zinc-400 bg-black/55 p-2.5 border border-white/10 leading-snug">
                      <span className="text-purple-400 font-black block mb-0.5 uppercase tracking-wide">Рекомендовано:</span>
                      {service.recommendedJewelry}
                    </div>
                  </div>
                </div>

                {/* Interactive actions */}
                <div className="mt-5 pt-3 border-t border-white/10 flex flex-col gap-2.5">
                  <button
                    onClick={() => setSelectedModalServiceId(service.id)}
                    className="w-full bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 font-mono text-[10.5px] font-bold tracking-widest uppercase py-2 cursor-pointer transition-all flex items-center justify-center gap-1.5"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
                    <span>Анатомія & Симуляція</span>
                  </button>

                  <div className="flex items-center justify-between gap-2 pt-1 border-t border-white/5">
                    <div>
                      <div className="text-[9px] text-zinc-550 uppercase tracking-widest font-mono font-bold">З прикрасою</div>
                      <div className="text-xl font-black text-white font-sans tracking-tight leading-none mt-0.5">
                        {service.price} <span className="text-sm font-semibold text-purple-400">₴</span>
                      </div>
                    </div>
                    
                    <button
                      onClick={() => handleBookClick(service.id)}
                      className="bg-white hover:bg-purple-600 hover:text-white text-black font-black px-4 py-2 text-xs uppercase tracking-widest transition-all duration-200 cursor-pointer"
                    >
                      Вибрати
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Custom studio statement cards on medical grade quality */}
        <div className="mt-16 bg-zinc-950 border border-white/10 p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-lg">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-white/5 text-purple-400 shrink-0">
              <BadgePercent className="w-7 h-7" />
            </div>
            <div>
              <h4 className="text-lg font-black text-white uppercase tracking-wider">Знижка 15% на сетап-проколи!</h4>
              <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed max-w-xl">
                Плануєте скомпонувати красу в одному вусі? При замовленні 3 або більше проколів одночасно (наприклад, потрійний Хелікс), ми надаємо знижку 15% на всю загальну вартість замовлення.
              </p>
            </div>
          </div>
          <button 
            onClick={() => handleBookClick('custom-setup')}
            className="w-full md:w-auto bg-white hover:bg-purple-600 hover:text-white text-black font-black px-8 py-3.5 transition-colors whitespace-nowrap text-xs uppercase tracking-widest"
          >
            Створити свій сетап
          </button>
        </div>

        {/* Interactive layout modal panel for body simulations */}
        <PiercingDetailModal
          serviceId={selectedModalServiceId}
          onClose={() => setSelectedModalServiceId(null)}
          onSelectForBooking={onSelectServiceForBooking}
        />

      </div>
    </section>
  );
}
