import { useState, useEffect } from 'react';
import { Appointment, PiercingService, Piercer } from '../types';
import { SERVICES, PIERCERS } from '../data';
import { Trash2, Calendar, ClipboardList, Clock, ShieldCheck, Heart, AlertCircle, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MyBookingsProps {
  changeTrigger: number;
  onNavigateToBooking: () => void;
}

export default function MyBookings({ changeTrigger, onNavigateToBooking }: MyBookingsProps) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const loadAppointments = () => {
    const existing = localStorage.getItem('aura_piercing_appointments');
    if (existing) {
      try {
        setAppointments(JSON.parse(existing));
      } catch (e) {
        setAppointments([]);
      }
    } else {
      setAppointments([]);
    }
  };

  useEffect(() => {
    loadAppointments();
  }, [changeTrigger]);

  const handleCancelAppointment = (id: string) => {
    const updated = appointments.map(apt => {
      if (apt.id === id) {
        return { ...apt, status: 'cancelled' as const };
      }
      return apt;
    });
    
    localStorage.setItem('aura_piercing_appointments', JSON.stringify(updated));
    setAppointments(updated);
  };

  const handleDeletePermanent = (id: string) => {
    const updated = appointments.filter(apt => apt.id !== id);
    localStorage.setItem('aura_piercing_appointments', JSON.stringify(updated));
    setAppointments(updated);
  };

  const getServiceData = (id: string): PiercingService | undefined => {
    return SERVICES.find(s => s.id === id);
  };

  const getPiercerData = (id: string): Piercer | undefined => {
    return PIERCERS.find(p => p.id === id);
  };

  return (
    <section id="my-bookings" className="py-24 bg-black relative border-t border-white/10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom,rgba(168,85,247,0.02),rgba(0,0,0,0))]" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            ТВОЯ ОСОБИСТА ПАНЕЛЬ
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black text-white mt-2 tracking-tighter uppercase leading-none">
            Заплановані візити
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mt-4" />
          <p className="text-zinc-400 mt-4 text-xs font-light max-w-sm mx-auto leading-relaxed">
            Тут виготовлені та збережені ваші талони на візит у кабінет. Ви можете в будь-який час змінити плани, скасувати запис або перевірити деталі.
          </p>
        </div>

        {/* List of bookings */}
        <AnimatePresence mode="popLayout">
          {appointments.length === 0 ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center p-12 bg-zinc-950 border border-white/10 rounded-none space-y-6 max-w-md mx-auto"
            >
              <div className="w-16 h-16 rounded-none bg-black border border-white/25 flex items-center justify-center text-zinc-500 mx-auto">
                <ClipboardList className="w-8 h-8" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-black text-white uppercase tracking-wider font-mono">У вас немає оформлених записів</h3>
                <p className="text-xs text-zinc-500 font-light max-w-xs leading-relaxed mx-auto">
                  Оберіть тип проколу в нашому меню та забронюйте візит. Процес займає менше хвилини.
                </p>
              </div>
              <button
                onClick={onNavigateToBooking}
                className="bg-purple-600 hover:bg-purple-500 text-white font-black px-6 py-2.5 rounded-none text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer font-mono"
              >
                Записатись на прокол
              </button>
            </motion.div>
          ) : (
            <div className="space-y-6">
              {appointments.map((apt) => {
                const srv = getServiceData(apt.serviceId);
                const piercer = getPiercerData(apt.piercerId);
                const isCancelled = apt.status === 'cancelled';
                
                return (
                  <motion.div
                    layout
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3 }}
                    key={apt.id}
                    className={`border rounded-none p-5 sm:p-6 transition-all relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6 ${
                      isCancelled 
                        ? 'bg-zinc-950/40 border-zinc-900 opacity-60' 
                        : 'bg-zinc-950 border-white/10 shadow-md hover:border-purple-500'
                    }`}
                  >
                    {/* Security stamp overlay when cancelled */}
                    {isCancelled && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12 border-2 border-red-500 text-red-500 font-mono text-[14px] px-4 py-1.5 rounded-none font-black select-none pointer-events-none uppercase tracking-widest bg-black z-20">
                        СКАСОВАНО КЛІЄНТОМ
                      </div>
                    )}

                    {/* Left: Metadata details */}
                    <div className="space-y-3 flex-1 font-mono">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-zinc-500 font-bold">КВИТОК ID: #{apt.id.replace('apt_', '').substring(0, 8).toUpperCase()}</span>
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-none uppercase tracking-wider border ${
                          isCancelled ? 'bg-zinc-900 border-white/5 text-zinc-500' : 'bg-purple-950/20 text-purple-400 border-purple-500/20'
                        }`}>
                          {isCancelled ? 'Анульовано' : 'Активний • Стерильний кабінет'}
                        </span>
                      </div>

                      <div className="space-y-1 font-sans">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">
                          {srv ? srv.name : 'Персональний прокол / Сетап'}
                        </h3>
                        <p className="text-xs text-zinc-400">
                          Майстер: <strong className="text-white font-mono uppercase font-black">{piercer ? piercer.name : 'Студія AURA'}</strong>
                        </p>
                      </div>

                      {/* Date details indicators */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs text-zinc-400 pt-1.5 border-t border-white/10">
                        <div className="flex items-center space-x-1 font-mono">
                          <Calendar className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-white font-bold">{apt.date}</span>
                        </div>
                        <div className="flex items-center space-x-1 font-mono">
                          <Clock className="w-3.5 h-3.5 text-purple-400" />
                          <span className="text-white font-bold">{apt.timeSlot}</span>
                        </div>
                        <div className="text-zinc-500 font-mono">
                          Сума сплати: <strong className="text-purple-400 font-bold">{srv ? srv.price : 450} ₴</strong>
                        </div>
                      </div>

                      {/* If any internal customer note */}
                      {apt.notes && (
                        <p className="text-[11px] text-zinc-550 leading-normal bg-black p-2 rounded-none border border-white/5 mt-2 font-mono">
                          Ваш коментар: "{apt.notes}"
                        </p>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="shrink-0 flex items-center space-x-3 w-full md:w-auto justify-end pt-3 md:pt-0 border-t border-white/5 md:border-transparent font-mono">
                      {!isCancelled ? (
                        <button
                          onClick={() => handleCancelAppointment(apt.id)}
                          className="bg-black hover:bg-red-950/10 text-red-500 font-black py-2 px-4 rounded-none text-xs uppercase tracking-widest transition-all border border-red-500 hover:border-red-400 cursor-pointer text-center flex-1 md:flex-initial"
                        >
                          Скасувати візит
                        </button>
                      ) : (
                        <button
                          onClick={() => handleDeletePermanent(apt.id)}
                          className="bg-zinc-900 hover:bg-black text-zinc-400 hover:text-red-500 p-2 rounded-none text-xs transition-colors cursor-pointer border border-white/5"
                          title="Видалити талон з історії браузера"
                        >
                          <Trash2 className="w-4.5 h-4.5" />
                        </button>
                      )}
                    </div>

                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
