import { useState, useEffect } from 'react';
import { SERVICES, PIERCERS } from '../data';
import { Appointment } from '../types';
import { Calendar, User, Clock, CheckCircle, ArrowRight, ArrowLeft, ShieldAlert, BadgeInfo } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface BookingWizardProps {
  selectedServiceId: string;
  preselectedJewelry?: string;
  onBookingSuccess: () => void;
}

export default function BookingWizard({ selectedServiceId, preselectedJewelry, onBookingSuccess }: BookingWizardProps) {
  const [step, setStep] = useState<number>(1);
  const [targetService, setTargetService] = useState<string>(selectedServiceId || '');
  const [targetPiercer, setTargetPiercer] = useState<string>('');
  const [bookingDate, setBookingDate] = useState<string>('');
  const [bookingTime, setBookingTime] = useState<string>('');
  
  // Client personal details
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerEmail, setCustomerEmail] = useState<string>('');
  const [customerNotes, setCustomerNotes] = useState<string>('');
  const [agreedTerms, setAgreedTerms] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const [availableDates, setAvailableDates] = useState<{ value: string; label: string; weekday: string }[]>([]);

  // Update targetService if selectedServiceId props changes
  useEffect(() => {
    if (selectedServiceId) {
      setTargetService(selectedServiceId);
      setStep(2); // Automatically advance to Stage 2: Choose Piercer!
      
      // Auto-populate customer notes with selected jewelry type from simulator
      if (preselectedJewelry) {
        const jewelryNames: Record<string, string> = {
          stud: 'Лабрет (Stud / Накрутка / Пусета)',
          ring: 'Кільце (Ring / Клікер)',
          barbell: 'Штанга (Barbell / Циркуляр)'
        };
        const uajewelry = jewelryNames[preselectedJewelry] || preselectedJewelry;
        setCustomerNotes(`Бажана прикраса: ${uajewelry}. (обрано через інтерфейс симулятора проколу)`);
      } else {
        setCustomerNotes('');
      }
    }
  }, [selectedServiceId, preselectedJewelry]);

  // Generate next 12 available dates
  useEffect(() => {
    const days = [];
    const ukrainianWeekdays = ['Нд', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
    const baseDate = new Date();
    
    for (let i = 0; i < 12; i++) {
      const futureDate = new Date(baseDate);
      futureDate.setDate(baseDate.getDate() + i);
      
      const yyyy = futureDate.getFullYear();
      const mm = String(futureDate.getMonth() + 1).padStart(2, '0');
      const dd = String(futureDate.getDate()).padStart(2, '0');
      const formattedValue = `${yyyy}-${mm}-${dd}`;
      
      const weekdayName = ukrainianWeekdays[futureDate.getDay()];
      const label = `${futureDate.getDate()} черв`;
      
      days.push({
        value: formattedValue,
        label,
        weekday: weekdayName
      });
    }
    setAvailableDates(days);
    if (days.length > 0) {
      setBookingDate(days[0].value);
    }
  }, []);

  const timeSlots = [
    '10:00', '11:00', '12:00', '13:00', '14:30', '15:30', '16:35', '17:30', '18:30', '19:30'
  ];

  const currentServiceObj = SERVICES.find(s => s.id === targetService);
  const currentPiercerObj = PIERCERS.find(p => p.id === targetPiercer);

  const handleNextStep = () => {
    setErrorText('');
    if (step === 1) {
      if (!targetService) {
        setErrorText('Будь ласка, оберіть послугу пірсингу зі списку перед продовженням.');
        return;
      }
      setStep(2);
    } else if (step === 2) {
      if (!targetPiercer) {
        setErrorText('Будь ласка, оберіть майстра пірсингу, з яким бажаєте провести сеанс.');
        return;
      }
      setStep(3);
    } else if (step === 3) {
      if (!bookingDate || !bookingTime) {
        setErrorText('Будь ласка, виберіть зручний для вас день та час запису.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!customerName.trim()) {
        setErrorText('Будь ласка, вкажіть ваше ім’я.');
        return;
      }
      if (!customerPhone.trim() || customerPhone.length < 9) {
        setErrorText('Будь ласка, введіть коректний номер телефону (наприклад, +380931234567).');
        return;
      }
      if (!agreedTerms) {
        setErrorText('Для створення запису потрібно погодитися з правилами студії та підтвердити вік.');
        return;
      }
      
      saveAppointmentToStorage();
    }
  };

  const handlePrevStep = () => {
    setErrorText('');
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const saveAppointmentToStorage = () => {
    const newAppointmentObj = {
      id: 'apt_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
      customerName,
      customerPhone,
      customerEmail: customerEmail || 'не вказано',
      serviceId: targetService,
      piercerId: targetPiercer,
      date: bookingDate,
      timeSlot: bookingTime,
      notes: customerNotes,
      createdAt: new Date().toISOString(),
      status: 'confirmed'
    };

    const existing = localStorage.getItem('aura_piercing_appointments');
    const list = existing ? JSON.parse(existing) : [];
    list.unshift(newAppointmentObj);
    localStorage.setItem('aura_piercing_appointments', JSON.stringify(list));

    setStep(5);
    onBookingSuccess();
  };

  const resetForm = () => {
    setStep(1);
    setTargetService('');
    setTargetPiercer('');
    setBookingTime('');
    setCustomerName('');
    setCustomerPhone('');
    setCustomerEmail('');
    setCustomerNotes('');
    setAgreedTerms(false);
  };

  return (
    <section id="booking-section" className="py-24 bg-black border-t border-white/10 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.03),rgba(0,0,0,0))]" />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Title */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            ОНЛАЙН-РЕЄСТРАЦІЯ
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black text-white mt-1 tracking-tighter uppercase leading-none">
            Запис на процедуру
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mt-4" />
        </div>

        {/* Wizard Panel Box */}
        <div id="booking-wizard-card" className="bg-zinc-950 border border-white/10 rounded-none overflow-hidden shadow-2xl relative">
          
          {/* Progress Indicator Steps Header */}
          {step <= 4 && (
            <div className="bg-black/85 px-6 py-4.5 border-b border-white/10 flex items-center justify-between gap-2 overflow-x-auto rounded-none">
              {[
                { number: 1, label: 'Послуга' },
                { number: 2, label: 'Майстер' },
                { number: 3, label: 'Дата й Час' },
                { number: 4, label: 'Контакти' }
              ].map((stepMeta) => (
                <div key={stepMeta.number} className="flex items-center space-x-2 shrink-0">
                  <div className={`w-6 h-6 flex items-center justify-center font-mono text-[11px] font-black border transition-colors ${
                    step === stepMeta.number 
                      ? 'bg-purple-600 border-purple-600 text-white' 
                      : step > stepMeta.number
                        ? 'bg-white border-white text-black font-black'
                        : 'border-white/10 text-zinc-600'
                  }`}>
                    {step > stepMeta.number ? '✓' : stepMeta.number}
                  </div>
                  <span className={`text-xs font-black uppercase tracking-wider ${
                    step === stepMeta.number ? 'text-purple-400' : step > stepMeta.number ? 'text-white' : 'text-zinc-650'
                  }`}>
                    {stepMeta.label}
                  </span>
                  {stepMeta.number < 4 && <div className="w-4 h-[1px] bg-white/10 hidden sm:block" />}
                </div>
              ))}
            </div>
          )}

          {/* Selected Booking Info Summary Bar to show all pre-populated or chosen session parameters */}
          {step <= 4 && (targetService || targetPiercer || (bookingDate && bookingTime)) && (
            <div className="bg-zinc-900/60 border-b border-white/10 px-6 py-3.5 flex flex-wrap items-center gap-y-2 gap-x-4 text-[11px] font-mono">
              <span className="text-zinc-500 font-bold uppercase text-[9px] tracking-widest shrink-0">ВАШ СЕАНС:</span>
              
              {currentServiceObj && (
                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 text-white shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-500 animate-pulse shrink-0" />
                  <span className="text-zinc-400">Прокол:</span>
                  <span className="font-extrabold uppercase text-purple-300">{currentServiceObj.name}</span>
                  <span className="text-white font-black font-mono">({currentServiceObj.price} ₴)</span>
                </div>
              )}

              {currentPiercerObj && (
                <div className="flex items-center gap-1.5 bg-black/60 border border-white/10 px-2.5 py-1 text-white shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0" />
                  <span className="text-zinc-400">Майстер:</span>
                  <span className="font-extrabold uppercase">{currentPiercerObj.name}</span>
                </div>
              )}

              {bookingDate && bookingTime && (
                <div className="flex items-center gap-1.5 bg-black/60 border border-purple-500/20 px-2.5 py-1 text-white shrink-0">
                  <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shrink-0 animate-pulse" />
                  <span className="text-zinc-400">Час:</span>
                  <span className="font-extrabold text-purple-400">{bookingDate} &bull; {bookingTime}</span>
                </div>
              )}
            </div>
          )}

          {/* Core Content Area */}
          <div className="p-6 sm:p-8 min-h-[340px]">
            {errorText && (
              <div aria-live="polite" className="bg-red-950/20 text-red-500 border border-red-500/20 p-3 rounded-none text-xs flex items-center space-x-2.5 mb-6">
                <ShieldAlert className="w-4 h-4 shrink-0 text-red-500" />
                <span>{errorText}</span>
              </div>
            )}

            <AnimatePresence mode="wait">
              {/* STEP 1: CHOOSE SERVICE */}
              {step === 1 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                        <span>Оберіть бажаний пірсинг</span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Ми пропонуємо широкий вибір проколів з використанням повністю сумісного імплантаційного матеріалу.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 border border-white/5 whitespace-nowrap">КРОК 1 з 4</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {SERVICES.map((srv) => (
                      <div
                        key={srv.id}
                        onClick={() => setTargetService(srv.id)}
                        className={`p-4 rounded-none border text-left cursor-pointer transition-all ${
                          targetService === srv.id 
                            ? 'bg-black border-purple-500 shadow-md' 
                            : 'bg-zinc-950 border-white/10 hover:bg-black hover:border-white/20'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <strong className="text-sm text-white block font-black uppercase tracking-wide truncate">{srv.name}</strong>
                          <span className="text-sm font-black text-purple-400 font-mono tracking-wide shrink-0">{srv.price}₴</span>
                        </div>
                        <p className="text-[11px] text-zinc-450 mt-1.5 line-clamp-1 font-light leading-normal">{srv.description}</p>
                        
                        <div className="flex items-center justify-between mt-3 text-[10px] text-zinc-550 border-t border-white/5 pt-2">
                          <span>Загоєння: <strong className="text-zinc-300 font-bold">{srv.healingTime}</strong></span>
                          <span>Біль: <strong className="text-purple-400 font-bold">{srv.painLevel}/5</strong></span>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 2: CHOOSE PIERCER */}
              {step === 2 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                        <span>Оберіть майстра пірсингу</span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Усі наші майстри володіють сертифікаціями медичного контролю та ідеально проконсультують вас.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 border border-white/5 whitespace-nowrap">КРОК 2 з 4</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {PIERCERS.map((pt) => (
                      <div
                        key={pt.id}
                        onClick={() => setTargetPiercer(pt.id)}
                        className={`p-5 rounded-none border cursor-pointer transition-all flex flex-col justify-between ${
                          targetPiercer === pt.id 
                            ? 'bg-black border-purple-500 shadow-md' 
                            : 'bg-zinc-950 border-white/10 hover:bg-black hover:border-white/20'
                        }`}
                      >
                        <div>
                          <div className="flex items-center space-x-4">
                            <img 
                              src={pt.imageUrl} 
                              alt={pt.name} 
                              className="w-12 h-12 rounded-none object-cover border border-white/10 grayscale hover:grayscale-0 transition-all duration-300"
                              referrerPolicy="no-referrer"
                            />
                            <div>
                              <strong className="text-sm text-white block font-black uppercase tracking-wide leading-tight">{pt.name}</strong>
                              <span className="text-[11px] text-purple-400 font-mono mt-0.5 block font-bold">{pt.role} &bull; Досвід {pt.experience}</span>
                            </div>
                          </div>
                          
                          <p className="text-[11.5px] text-zinc-450 mt-3 font-light leading-relaxed">
                            {pt.bio}
                          </p>
                        </div>

                        <div className="mt-4 pt-3 border-t border-white/5">
                          <span className="text-[9px] font-mono font-black text-zinc-500 block uppercase tracking-widest">НАПРЯМКИ СПЕЦІАЛІЗАЦІЇ:</span>
                          <div className="flex flex-wrap gap-1 mt-1.5">
                            {pt.specialty.map((spec, i) => (
                              <span key={i} className="text-[9px] bg-black border border-white/10 text-zinc-400 px-2 py-0.5 rounded-none uppercase font-bold font-mono">
                                {spec}
                              </span>
                            ))}
                          </div>
                        </div>

                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* STEP 3: SELECT DATE AND TIME */}
              {step === 3 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                        <span>Оберіть гарний день та зручний час</span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Один сеанс проколу разом із консультацією та ювелірним моделюванням займає зазвичай 30-40 хвилин.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 border border-white/5 whitespace-nowrap">КРОК 3 з 4</span>
                  </div>

                  <div className="space-y-5">
                    {/* Horizontal Date Picker */}
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-400 block mb-2 uppercase tracking-wider">
                        Календар вільних днів червень 2026:
                      </span>
                      <div className="flex space-x-2.5 overflow-x-auto pb-3 scrollbar-thin scrollbar-thumb-zinc-800">
                        {availableDates.map((dateObj) => {
                          const isDateSelected = bookingDate === dateObj.value;
                          return (
                            <button
                              key={dateObj.value}
                              onClick={() => setBookingDate(dateObj.value)}
                              className={`p-3 rounded-none border text-center shrink-0 min-w-[76px] transition-all cursor-pointer ${
                                isDateSelected 
                                  ? 'bg-purple-600 border-purple-605 text-white font-black' 
                                  : 'bg-black border-white/10 text-zinc-300 hover:text-white hover:border-purple-500/30'
                              }`}
                            >
                              <span className="text-[10px] font-black block uppercase tracking-wide mb-0.5 opacity-80">
                                {dateObj.weekday}
                              </span>
                              <span className="text-sm font-black block font-sans">
                                {dateObj.label.split(' ')[0]}
                              </span>
                              <span className="text-[9px] block uppercase opacity-80 leading-3 font-mono font-bold">
                                черв
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Time Slot Picker Grid */}
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-400 block mb-2.5 uppercase tracking-wider">
                        Вільний час для проколу в кабінеті:
                      </span>
                      <div className="grid grid-cols-5 gap-2">
                        {timeSlots.map((time) => {
                          const isTimeSelected = bookingTime === time;
                          return (
                            <button
                              key={time}
                              onClick={() => setBookingTime(time)}
                              className={`p-2.5 text-xs text-center font-bold rounded-none border font-mono transition-colors cursor-pointer ${
                                isTimeSelected 
                                  ? 'bg-purple-600 border-purple-605 text-white font-black' 
                                  : 'bg-black border-white/10 text-zinc-300 hover:border-purple-500/30'
                              }`}
                            >
                              {time}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* STEP 4: CUSTOMER DETAILS REVIEW */}
              {step === 4 && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/5 pb-3">
                    <div>
                      <h3 className="text-lg font-black text-white flex items-center gap-2 uppercase tracking-wide">
                        <span>Вкажіть контакти та зауваження</span>
                      </h3>
                      <p className="text-xs text-zinc-400 mt-1">
                        Ми надішлемо вам автоматичне підтвердження та нагадування про візит у Telegram / Viber.
                      </p>
                    </div>
                    <span className="text-[10px] font-mono font-bold text-purple-400 uppercase tracking-widest bg-zinc-900 px-2.5 py-1 border border-white/5 whitespace-nowrap">КРОК 4 з 4</span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    
                    {/* Fields Form */}
                    <div className="md:col-span-7 space-y-4">
                      
                      <div>
                        <label htmlFor="customer-name-field" className="block text-xs font-mono font-black text-zinc-400 mb-1.5 uppercase tracking-wider">
                          Ваше Ім'я та Прізвище *
                        </label>
                        <input 
                          id="customer-name-field"
                          type="text" 
                          placeholder="Приклад: Олександр Коваль"
                          value={customerName}
                          onChange={(e) => setCustomerName(e.target.value)}
                          className="w-full bg-black border border-white/10 text-white rounded-none py-2.5 px-3.5 text-sm focus:outline-none focus:border-purple-500 placeholder-zinc-700 transition-colors font-mono"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono">
                        <div>
                          <label htmlFor="customer-phone-field" className="block text-xs font-mono font-black text-zinc-400 mb-1.5 uppercase tracking-wider">
                            Номер телефону *
                          </label>
                          <input 
                            id="customer-phone-field"
                            type="tel" 
                            placeholder="+380"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white rounded-none py-2.5 px-3.5 text-sm focus:outline-none focus:border-purple-500 placeholder-zinc-700"
                          />
                        </div>
                        <div>
                          <label htmlFor="customer-email-field" className="block text-xs font-mono font-black text-zinc-400 mb-1.5 uppercase tracking-wider">
                            Електронна скринька
                          </label>
                          <input 
                            id="customer-email-field"
                            type="email" 
                            placeholder="mail@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            className="w-full bg-black border border-white/10 text-white rounded-none py-2.5 px-3.5 text-sm focus:outline-none focus:border-purple-500 placeholder-zinc-700"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="customer-notes-field" className="block text-xs font-mono font-black text-zinc-400 mb-1.5 uppercase tracking-wider">
                          Примітки або медичні застереження
                        </label>
                        <textarea 
                          id="customer-notes-field"
                          rows={3}
                          placeholder="Наприклад: 'Перший прокол у житті', 'Маю алергію на нікель', або 'Бажаю обрати золотий топ замість базового титану'"
                          value={customerNotes}
                          onChange={(e) => setCustomerNotes(e.target.value)}
                          className="w-full bg-black border border-white/10 text-white rounded-none py-2.5 px-3.5 text-sm focus:outline-none focus:border-purple-500 placeholder-zinc-700 resize-none font-mono"
                        />
                      </div>

                      {/* Studio policy agreements checkbox */}
                      <div className="flex items-start space-x-3 bg-zinc-950 p-3 rounded-none border border-white/5">
                        <input
                          id="agree-rules-checkbox"
                          type="checkbox"
                          checked={agreedTerms}
                          onChange={(e) => setAgreedTerms(e.target.checked)}
                          className="w-4 h-4 text-black border-white/10 rounded-none focus:ring-purple-500 bg-black mt-0.5 cursor-pointer accent-purple-500"
                        />
                        <label htmlFor="agree-rules-checkbox" className="text-[11px] text-zinc-400 leading-normal select-none cursor-pointer">
                          Мені виповнилось 18 років (або прийду з батьками). Я обіцяю дотримуватись рекомендацій з післяпроцедурного догляду та погоджуюсь з юридичним положенням роботи кабінету. *
                        </label>
                      </div>

                    </div>

                    {/* Meta Review Panel */}
                    <div className="md:col-span-5 bg-zinc-900/40 p-5 rounded-none border border-white/10 space-y-4">
                      <h4 className="text-xs font-mono font-black text-white uppercase tracking-widest pb-2 border-b border-white/5 flex items-center justify-between">
                        <span>РЕЗЮМЕ ЗАПИСУ:</span>
                        <span className="text-[9px] bg-purple-600 text-white px-1.5 py-0.5 font-bold">ОПЛАТА НА МІСЦІ</span>
                      </h4>

                      <div className="space-y-3.5 text-xs text-zinc-300 font-mono">
                        <div className="flex justify-between items-start border-b border-white/5 pb-1.5">
                          <span className="text-zinc-550 uppercase text-[9px] tracking-wide">Прокол:</span>
                          <strong className="text-white font-black text-right max-w-[150px] truncate uppercase">{currentServiceObj?.name}</strong>
                        </div>
                        <div className="flex justify-between items-start border-b border-white/5 pb-1.5">
                          <span className="text-zinc-550 uppercase text-[9px] tracking-wide">Майстер:</span>
                          <strong className="text-white font-black uppercase">{currentPiercerObj?.name}</strong>
                        </div>
                        <div className="flex justify-between items-start border-b border-white/5 pb-1.5">
                          <span className="text-zinc-550 uppercase text-[9px] tracking-wide">Дата зустрічі:</span>
                          <strong className="text-purple-400 font-black">{bookingDate}</strong>
                        </div>
                        <div className="flex justify-between items-start border-b border-white/5 pb-1.5">
                          <span className="text-zinc-550 uppercase text-[9px] tracking-wide">Час:</span>
                          <strong className="text-purple-400 font-black">{bookingTime}</strong>
                        </div>
                        <div className="pt-2 flex justify-between items-center text-sm font-black text-white">
                          <span className="uppercase tracking-wider text-[11px]">До сплати:</span>
                          <span className="text-xl text-purple-400 font-mono font-black">{currentServiceObj?.price} ₴</span>
                        </div>
                      </div>

                      <div className="bg-purple-950/20 text-[10px] text-purple-400 leading-relaxed p-3 rounded-none border border-purple-900/20 flex items-start gap-2">
                        <BadgeInfo className="w-4 h-4 text-purple-400 shrink-0 mt-0.5" />
                        <span>Ми надаємо безкоштовні консультації протягом усього періоду загоєння.</span>
                      </div>
                    </div>

                  </div>
                </motion.div>
              )}

              {/* STEP 5: SUCCESS CONFIRMATION VOUCHER */}
              {step === 5 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-6 space-y-6 animate-none"
                >
                  <div className="mx-auto w-16 h-16 bg-white/5 border border-white/20 rounded-none flex items-center justify-center text-purple-400">
                    <CheckCircle className="w-10 h-10" />
                  </div>

                  <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white uppercase tracking-tighter">
                      Ваш запис створено та підтверджено!
                    </h3>
                    <p className="text-xs text-zinc-400 max-w-md mx-auto leading-relaxed">
                      Дякуємо, що обрали студію пірсингу AURA. Крафт-випуск вашого талону успішно збережено в пам'яті браузера. Прочитайте інструкції щодо підготовки нижче!
                    </p>
                  </div>

                  {/* Booking Receipt Voucher card rendering */}
                  <div className="max-w-md mx-auto bg-black p-6 rounded-none border-2 border-white text-left space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-purple-500/10 to-transparent rounded-bl-full pointer-events-none" />
                    
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <div className="text-[9px] uppercase font-mono tracking-widest text-zinc-500 font-black">Е-Квиток</div>
                        <div className="text-xs font-black text-white uppercase">Студія ПІРСИНГУ AURA</div>
                      </div>
                      <span className="text-[9px] bg-purple-600 text-white px-2 py-0.5 font-bold rounded-none font-mono border border-purple-500 uppercase tracking-widest">
                        КОНТРОЛЬ ПРОЙДЕНО
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-y-3.5 gap-x-2 text-xs font-mono">
                      <div>
                        <span className="text-zinc-550 block text-[9px] font-black uppercase tracking-wider font-bold">ПРОЦЕДУРА</span>
                        <strong className="text-white block text-xs mt-0.5 truncate uppercase">{currentServiceObj?.name}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-550 block text-[9px] font-black uppercase tracking-wider font-bold">МАЙСТЕР</span>
                        <strong className="text-white block text-xs mt-0.5 uppercase">{currentPiercerObj?.name}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-550 block text-[9px] font-black uppercase tracking-wider font-bold">ДАТА ТА ЧАС</span>
                        <strong className="text-purple-400 font-bold block text-xs mt-0.5">{bookingDate} &bull; {bookingTime}</strong>
                      </div>
                      <div>
                        <span className="text-zinc-550 block text-[9px] font-black uppercase tracking-wider font-bold">КЛІЄНТ</span>
                        <strong className="text-white block text-xs mt-0.5 truncate uppercase">{customerName}</strong>
                      </div>
                    </div>

                    <div className="bg-zinc-950 p-3 rounded-none border border-white/5 text-[10px] text-zinc-400 leading-normal">
                      <span className="text-purple-400 font-black block mb-1 uppercase tracking-wider font-mono">ПІДГОТОВКА ДО СЕАНСУ:</span>
                      1. Добре поїжте за 1.5-2 години до проколу (щоб запобігти перепадам тиску). <br />
                      2. Не вживайте алкоголь та кроворозріджуючі препарати, каву за 12 годин. <br />
                      3. Помийте волосся заздалегідь перед проколом вух.
                    </div>

                    {/* Pseudo barcode */}
                    <div className="pt-2 flex flex-col items-center">
                      <div className="h-6 w-full max-w-[210px] opacity-45 bg-[repeating-linear-gradient(90deg,transparent,transparent_2px,#8b5cf6_2px,#8b5cf6_6px)]" />
                      <span className="text-[9px] font-mono text-zinc-600 mt-1 uppercase">AURA-APT-SECURE-9Z2B</span>
                    </div>
                  </div>

                  <div className="flex justify-center gap-3">
                    <button
                      onClick={resetForm}
                      className="bg-zinc-950 hover:bg-black border border-white/20 text-white font-black px-6 py-2.5 rounded-none text-xs uppercase tracking-widest transition-all active:scale-95 cursor-pointer font-mono"
                    >
                      Створити інший запис
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Stepper Footer Controls */}
          {step <= 4 && (
            <div className="bg-black/95 px-6 py-4.5 border-t border-white/10 flex items-center justify-between">
              <button
                disabled={step === 1}
                onClick={handlePrevStep}
                className={`py-2.5 px-4 rounded-none text-xs font-black uppercase tracking-widest flex items-center space-x-1 border transition-all ${
                  step === 1 
                    ? 'border-white/5 text-zinc-800 cursor-not-allowed opacity-50' 
                    : 'border-white/10 text-zinc-350 hover:text-white hover:border-white/20 cursor-pointer active:scale-95'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>

              <button
                onClick={handleNextStep}
                className="bg-purple-600 hover:bg-purple-500 text-white font-black py-2.5 px-5 rounded-none text-xs uppercase tracking-widest flex items-center space-x-1.5 active:scale-95 cursor-pointer transition-all"
              >
                <span>{step === 4 ? 'Підтвердити запис' : 'Продовжити'}</span>
                {step < 4 && <ArrowRight className="w-4 h-4" />}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
}
