import React, { useState } from 'react';
import { LOCATION_STEPS } from '../data';
import { Navigation, MapPin, Key, DoorOpen, Compass, Copy, Check, Clock, Phone, ArrowRight, CornerDownRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function VisualLocationGuide() {
  const [activeStep, setActiveStep] = useState<number>(1);
  const [copiedAddress, setCopiedAddress] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);

  const stepsCount = LOCATION_STEPS.length;

  const handleCopyAddress = () => {
    navigator.clipboard.writeText('Київ, вул. Антоновича, 12');
    setCopiedAddress(true);
    setTimeout(() => setCopiedAddress(false), 2000);
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText('34К');
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  // Associate icons based on location steps
  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Navigation':
        return <Navigation className="w-5 h-5 text-purple-400" />;
      case 'MapPin':
        return <MapPin className="w-5 h-5 text-purple-400" />;
      case 'Key':
        return <Key className="w-5 h-5 text-purple-400" />;
      case 'DoorOpen':
        return <DoorOpen className="w-5 h-5 text-purple-400" />;
      default:
        return <Compass className="w-5 h-5 text-purple-400" />;
    }
  };

  const currentStepData = LOCATION_STEPS.find(s => s.id === activeStep) || LOCATION_STEPS[0];

  return (
    <section id="location-guide" className="py-24 bg-zinc-950 border-t border-white/10 relative overflow-hidden">
      
      {/* Absolute Decorative lines for a blueprint map effect */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            ЯК НАС ЗНАЙТИ
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black text-white mt-3 tracking-tighter uppercase leading-none">
            Інтерактивний путівник
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto mt-4" />
          <p className="text-zinc-400 mt-4 font-light text-sm leading-relaxed">
            Ми знаходимось у самому серці Києва. Пройдіть короткий фото-інструктаж нижче, щоб швидко дійти до нашої затишної стерильної студії.
          </p>
        </div>

        {/* Studio Quick Meta Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          
          {/* Address & Copying */}
          <div className="bg-black border border-white/10 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-purple-400 uppercase tracking-widest block mb-2">
                АДРЕСА СТУДІЇ
              </span>
              <p className="text-white font-bold text-sm leading-relaxed">
                м. Київ, вул. Антоновича, 12
              </p>
              <p className="text-xs text-zinc-500 mt-1 font-light">
                Історичний центр, 2 хв від ст. м. «Площа Українських Героїв» (Льва Толстого)
              </p>
            </div>
            <button
              onClick={handleCopyAddress}
              className="mt-4 flex items-center justify-between text-xs font-mono py-2 px-3 border border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>{copiedAddress ? 'Копіювання...' : 'Скопіювати адресу'}</span>
              </span>
              {copiedAddress ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Secure gate code details */}
          <div className="bg-black border border-white/10 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-purple-400 uppercase tracking-widest block mb-2">
                ВХІДНИЙ КОД (ХВІРТКА)
              </span>
              <p className="text-white font-bold text-sm leading-relaxed">
                Ворота на кодовому замку
              </p>
              <p className="text-xs text-zinc-500 mt-1 font-light">
                Код на хвіртці з вул. Антоновича — <strong className="text-white">34К</strong>. Або зателефонуйте майстру на наш номер.
              </p>
            </div>
            <button
              onClick={handleCopyCode}
              className="mt-4 flex items-center justify-between text-xs font-mono py-2 px-3 border border-white/10 bg-zinc-950 text-zinc-400 hover:text-white hover:border-white/25 transition-all cursor-pointer"
            >
              <span className="flex items-center space-x-2">
                <Key className="w-3.5 h-3.5" />
                <span>Код воріт: 34К</span>
              </span>
              {copiedCode ? <Check className="w-3.5 h-3.5 text-green-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>

          {/* Call support */}
          <div className="bg-black border border-white/10 p-5 flex flex-col justify-between">
            <div>
              <span className="text-[9px] font-mono font-black text-purple-400 uppercase tracking-widest block mb-2">
                ПРОБЛЕМА З НАВІГАЦІЄЮ?
              </span>
              <p className="text-white font-bold text-sm leading-relaxed">
                Ми зустрінемо або підкажемо
              </p>
              <p className="text-xs text-zinc-500 mt-1 font-light">
                Телефонуйте адміністратору, якщо заблукали. Ми проконсультуємо та вийдемо вас зустріти.
              </p>
            </div>
            <a
              href="tel:+380931234567"
              className="mt-4 flex items-center justify-center space-x-2 text-xs font-mono font-bold uppercase tracking-wider py-2 bg-purple-600/30 border border-purple-500/50 hover:bg-purple-600 text-white transition-all text-center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>+380 (93) 123-45-67</span>
            </a>
          </div>

        </div>

        {/* Interactive walkthrough layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          
          {/* Step Selector List on left */}
          <div className="lg:col-span-5 space-y-3 flex flex-col justify-between">
            <div className="space-y-2.5">
              {LOCATION_STEPS.map((step) => {
                const isActive = step.id === activeStep;
                return (
                  <button
                    key={step.id}
                    onClick={() => setActiveStep(step.id)}
                    className={`w-full text-left p-4 border transition-all duration-300 flex items-start space-x-4 cursor-pointer relative ${
                      isActive
                        ? 'bg-purple-950/20 border-purple-500 text-white'
                        : 'bg-black/40 border-white/5 text-zinc-400 hover:text-white hover:border-white/10'
                    }`}
                  >
                    {/* Left active glowing indicator */}
                    {isActive && (
                      <span className="absolute left-0 top-0 bottom-0 w-1 bg-purple-500" />
                    )}

                    <div className={`p-2 border shrink-0 ${
                      isActive ? 'bg-purple-600 border-purple-400 text-white' : 'bg-zinc-900 border-white/5 text-zinc-500'
                    }`}>
                      {getStepIcon(step.iconName)}
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-[9px] font-mono opacity-60">КРОК {step.id} з {stepsCount}</div>
                      <h4 className="font-bold text-sm uppercase tracking-wide text-white">
                        {step.title}
                      </h4>
                      <p className="text-zinc-500 text-[11px] line-clamp-1 font-light">
                        {step.description}
                      </p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between pt-4 border-t border-white/5 font-mono text-xs">
              <button
                disabled={activeStep === 1}
                onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                className="px-4 py-2 border border-white/10 bg-black disabled:opacity-30 disabled:pointer-events-none hover:text-white text-zinc-400 transition-colors cursor-pointer"
              >
                &larr; Назад
              </button>
              <span className="text-zinc-500">Крок {activeStep} / {stepsCount}</span>
              <button
                disabled={activeStep === stepsCount}
                onClick={() => setActiveStep(prev => Math.min(stepsCount, prev + 1))}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:opacity-30 disabled:pointer-events-none text-white font-bold transition-all cursor-pointer"
              >
                Далі &rarr;
              </button>
            </div>
          </div>

          {/* Visual Interactive Screen on right */}
          <div className="lg:col-span-7 bg-black border border-white/10 p-6 sm:p-8 flex flex-col justify-between relative min-h-[380px]">
            
            {/* Compass background watermark */}
            <div className="absolute top-4 right-4 text-zinc-900 pointer-events-none select-none">
              <Compass className="w-24 h-24 stroke-[0.5]" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeStep}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.25 }}
                className="space-y-6"
              >
                <div className="flex items-center space-x-3">
                  <span className="w-8 h-8 rounded-none bg-purple-900/40 border border-purple-500 flex items-center justify-center font-mono font-black text-xs text-purple-400">
                    0{currentStepData.id}
                  </span>
                  <span className="text-xs font-mono text-purple-400 uppercase tracking-widest">
                    АКТИВНИЙ КРОК МАРШРУТУ
                  </span>
                </div>

                <div className="space-y-3">
                  <h3 className="text-2xl font-black text-white font-sans uppercase tracking-tight">
                    {currentStepData.title}
                  </h3>
                  <p className="text-zinc-300 text-sm font-light leading-relaxed">
                    {currentStepData.description}
                  </p>
                </div>

                {/* Sub-direction guidance card */}
                <div className="p-4 bg-zinc-950 border border-purple-500/20 text-purple-400 shadow-sm flex items-start space-x-3">
                  <CornerDownRight className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <span className="text-[10px] font-mono uppercase block font-bold tracking-wider">Орієнтир / Порада:</span>
                    <p className="text-white text-xs font-light mt-0.5">{currentStepData.direction}</p>
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>

            {/* Simulated Schematic Radar/Map Layout */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-[10px] font-mono font-bold tracking-widest text-zinc-500 uppercase block mb-3">
                Хорда маршруту (Схематично Антоновича, 12)
              </span>

              {/* Styled horizontal route checkpoints */}
              <div className="grid grid-cols-4 gap-2 items-center text-center">
                {LOCATION_STEPS.map((s) => {
                  const isPassed = s.id <= activeStep;
                  const isCurrent = s.id === activeStep;
                  return (
                    <button
                      key={s.id}
                      onClick={() => setActiveStep(s.id)}
                      className={`py-2 px-1 relative border transition-all duration-300 text-left flex flex-col justify-between h-14 cursor-pointer ${
                        isCurrent
                          ? 'border-purple-500 bg-purple-950/20'
                          : isPassed
                            ? 'border-purple-900 text-purple-400/80'
                            : 'border-white/5 text-zinc-650'
                      }`}
                    >
                      {/* Interactive dot */}
                      <div className="flex justify-between items-center">
                        <span className={`text-[8px] font-mono leading-none ${isCurrent ? 'text-purple-400 font-bold' : isPassed ? 'text-zinc-400' : 'text-zinc-600'}`}>
                          0{s.id}
                        </span>
                        <div className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-purple-500 animate-ping' : isPassed ? 'bg-purple-800' : 'bg-zinc-800'}`} />
                      </div>
                      
                      <span className={`text-[8px] font-mono uppercase leading-none font-bold truncate ${isCurrent ? 'text-white' : 'text-zinc-500'}`}>
                        {s.title.split(' ')[0]}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
