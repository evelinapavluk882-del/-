import { useState } from 'react';
import { AFTERCARE_INFOS, FAQS, STERILIZATION_STEPS } from '../data';
import { 
  ChevronDown, 
  ChevronUp, 
  ThumbsUp, 
  ThumbsDown, 
  CheckSquare, 
  Square, 
  ShieldCheck, 
  Droplet, 
  Sparkles, 
  Eye, 
  ShieldAlert, 
  BadgeInfo 
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function CareGuide() {
  const [activeSegment, setActiveSegment] = useState<'aftercare' | 'sterilization'>('aftercare');
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [sterilizationStep, setSterilizationStep] = useState<number>(1);
  const [indicatorTested, setIndicatorTested] = useState<boolean>(false);
  
  // Interactive routine constructor state
  const [checklist, setChecklist] = useState<Record<number, boolean>>({
    0: false,
    1: false,
    2: false,
    3: false,
  });

  const toggleChecklist = (idx: number) => {
    setChecklist(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  const dailyTasks = [
    'Вранці промити прокол фізрозчином і прибрати розм’якшені шкоринки ватною паличкою',
    'Протягом дня не торкатися прикраси брудними руками і не притискати телефоном чи навушниками',
    'Увечері прийняти душ та промити ділянку теплою чистою водою, наприкінці нанести фізрозчин',
    'Якщо це прокол вуха — лягти спати на протилежний бік або скористатись дорожнім рогаликом'
  ];

  const getSterilizationIcon = (name: string, className: string) => {
    switch (name) {
      case 'Droplet': return <Droplet className={className} />;
      case 'Sparkles': return <Sparkles className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'Eye': return <Eye className={className} />;
      default: return <ShieldCheck className={className} />;
    }
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const completedCount = Object.values(checklist).filter(Boolean).length;
  const currentStepData = STERILIZATION_STEPS.find(s => s.id === sterilizationStep) || STERILIZATION_STEPS[0];

  return (
    <section id="care" className="py-24 bg-black border-t border-white/10 relative overflow-hidden">
      {/* Ambient backgrounds */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(147,51,234,0.03),rgba(0,0,0,0))] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.02),rgba(0,0,0,0))] pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-16">
        
        {/* Main Combined Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-xs font-mono font-bold tracking-widest text-purple-400 uppercase">
            БЕЗПЕКА ТА РЕГЕНЕРАЦІЯ
          </span>
          <h2 className="text-4xl sm:text-5xl font-sans font-black text-white tracking-tighter uppercase leading-none">
            Безпека та догляд
          </h2>
          <div className="w-16 h-1 bg-purple-600 mx-auto" />
          <p className="text-zinc-400 text-sm sm:text-base font-light leading-relaxed">
            Здоров'я вашого проколу залежить від двох найважливіших речей: стерильності під час процедури та правильного догляду вдома. Ми поєднали ці інструкції разом.
          </p>
        </div>

        {/* Dynamic Inner Tab Switcher */}
        <div className="flex justify-center border-b border-white/10 max-w-lg mx-auto">
          <button
            onClick={() => setActiveSegment('aftercare')}
            className={`flex-1 pb-4 text-xs font-semibold uppercase tracking-widest transition-all ${
              activeSegment === 'aftercare'
                ? 'text-purple-400 border-b-2 border-purple-500 font-extrabold font-black'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Правила догляду
          </button>
          <button
            onClick={() => setActiveSegment('sterilization')}
            className={`flex-1 pb-4 text-xs font-semibold uppercase tracking-widest transition-all ${
              activeSegment === 'sterilization'
                ? 'text-purple-400 border-b-2 border-purple-500 font-extrabold font-black'
                : 'text-zinc-500 hover:text-zinc-300'
            }`}
          >
            Стандарти стерилізації
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeSegment === 'aftercare' ? (
            <motion.div
              key="aftercare-segment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
                {/* Left side: Do / Don't columns */}
                <div className="lg:col-span-7 space-y-6 flex flex-col justify-between">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Do List */}
                    <div className="bg-zinc-950 border border-white/5 p-5">
                      <div className="flex items-center space-x-2 text-white mb-4 pb-2 border-b border-white/10">
                        <ThumbsUp className="w-4 h-4 shrink-0 text-purple-400" />
                        <strong className="text-xs font-mono uppercase tracking-wider font-black">Робити ОБОВ'ЯЗКОВО:</strong>
                      </div>
                      <ul className="space-y-3">
                        {AFTERCARE_INFOS.rules.filter(r => r.type === 'do').map((item, id) => (
                          <li key={id} className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed font-light">
                            <span className="w-1.5 h-1.5 bg-purple-500 mt-1.5 shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Don't List */}
                    <div className="bg-zinc-950 border border-white/5 p-5">
                      <div className="flex items-center space-x-2 text-white mb-4 pb-2 border-b border-white/10">
                        <ThumbsDown className="w-4 h-4 shrink-0 text-red-500" />
                        <strong className="text-xs font-mono uppercase tracking-wider font-black">Категорично ЗАБОРОНЕНО:</strong>
                      </div>
                      <ul className="space-y-3">
                        {AFTERCARE_INFOS.rules.filter(r => r.type === 'dont').map((item, id) => (
                          <li key={id} className="flex items-start space-x-2 text-xs text-zinc-300 leading-relaxed font-light">
                            <span className="w-1.5 h-1.5 bg-red-500 mt-1.5 shrink-0" />
                            <span>{item.text}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Healing stages */}
                  <div className="bg-zinc-950 border border-white/5 p-5">
                    <strong className="text-xs font-mono text-zinc-400 uppercase tracking-widest block mb-4 font-black">
                      Три головні етапи регенерації тканин:
                    </strong>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-mono">
                      {AFTERCARE_INFOS.phases.map((phase, idx) => (
                        <div key={idx} className="bg-black p-3 rounded-none border border-white/5 flex flex-col justify-between">
                          <div>
                            <span className="text-purple-400 text-[10px] font-black block mb-1 font-mono uppercase">ЕТАП {idx + 1}</span>
                            <h4 className="text-white font-black mb-1 uppercase leading-tight">{phase.title}</h4>
                            <p className="text-zinc-400 font-light text-[10.5px] leading-relaxed">{phase.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right side: Routine Checker */}
                <div className="lg:col-span-5 bg-zinc-950 border border-white/5 p-6 rounded-none flex flex-col justify-between">
                  <div className="space-y-5 flex-1">
                    <div className="flex items-center justify-between border-b border-white/10 pb-3">
                      <div>
                        <h3 className="text-sm font-black text-white uppercase tracking-wider">Щоденна рутина догляду</h3>
                        <p className="text-[11px] text-zinc-400 font-light mt-0.5 font-mono uppercase">Встановіть звичку та відзначайте виконане сьогодні:</p>
                      </div>
                      <span className="text-[10px] font-mono bg-purple-600 text-white font-black px-2 py-1 rounded-none uppercase shrink-0">
                        {completedCount} / 4 виконано
                      </span>
                    </div>

                    <div className="space-y-3">
                      {dailyTasks.map((task, i) => {
                        const isChecked = !!checklist[i];
                        return (
                          <div
                            key={i}
                            onClick={() => toggleChecklist(i)}
                            className={`p-3 rounded-none border cursor-pointer transition-all flex items-start space-x-3 select-none ${
                              isChecked 
                                ? 'bg-purple-950/20 border-purple-500 text-white font-semibold' 
                                : 'bg-black border-white/10 text-zinc-400 hover:border-white/20'
                            }`}
                          >
                            <div className="mt-0.5 shrink-0 text-purple-400">
                              {isChecked ? <CheckSquare className="w-4 h-4 text-purple-400" /> : <Square className="w-4 h-4 text-zinc-700" />}
                            </div>
                            <span className="text-xs leading-normal font-light">{task}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-white/10">
                    {completedCount === 4 ? (
                      <div className="bg-purple-950/30 border border-purple-500 p-3 text-purple-400 text-xs text-center flex items-center justify-center gap-1.5 font-black uppercase tracking-wider">
                        <span>Чудова робота! Твій пірсинг у безпеці!</span>
                      </div>
                    ) : (
                      <div className="text-[11px] text-zinc-500 italic text-center font-mono">
                        "Ретельний щоденний догляд знижує набряк вже на другу добу."
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="sterilization-segment"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="space-y-12"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* 4 Steps stepper selection list */}
                <div className="lg:col-span-5 space-y-3">
                  <p className="text-xs font-mono text-zinc-550 uppercase tracking-widest mb-1 px-1 font-bold">
                    4 кроки захисту інструментів:
                  </p>
                  {STERILIZATION_STEPS.map((step) => {
                    const isSelected = step.id === sterilizationStep;
                    return (
                      <button
                        key={step.id}
                        onClick={() => setSterilizationStep(step.id)}
                        className={`w-full text-left p-3.5 rounded-none border transition-all duration-200 flex items-center space-x-3.5 cursor-pointer group ${
                          isSelected 
                            ? 'bg-zinc-950 border-purple-500 shadow-md' 
                            : 'bg-zinc-950/20 border-white/5 hover:border-white/15'
                        }`}
                      >
                        <div className={`w-8 h-8 flex items-center justify-center shrink-0 font-mono font-black text-xs border transition-colors ${
                          isSelected 
                            ? 'bg-purple-600 text-white border-purple-600' 
                            : 'bg-black text-zinc-500 border-white/10'
                        }`}>
                          0{step.id}
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className={`text-xs font-black uppercase tracking-wider truncate transition-colors ${
                            isSelected ? 'text-purple-400' : 'text-zinc-200 group-hover:text-white'
                          }`}>
                            {step.title}
                          </h3>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Step Panel */}
                <div className="lg:col-span-7 bg-zinc-950 border border-white/5 p-6 sm:p-8 min-h-[350px] flex flex-col justify-between relative">
                  <div className="absolute top-4 right-4 font-mono font-black text-8xl text-zinc-900/20 select-none pointer-events-none">
                    0{currentStepData.id}
                  </div>

                  <div className="space-y-5 relative">
                    <div className="flex items-center space-x-3">
                      <div className="p-2.5 bg-white/5 text-purple-400">
                        {getSterilizationIcon(currentStepData.iconName, 'w-5 h-5')}
                      </div>
                      <div>
                        <span className="text-[9px] font-mono font-black text-purple-400 uppercase tracking-widest">
                          ЕТАП 0{currentStepData.id}
                        </span>
                        <h3 className="text-base font-black text-white uppercase tracking-tight">
                          {currentStepData.title}
                        </h3>
                      </div>
                    </div>

                    <p className="text-xs text-zinc-350 font-light leading-relaxed">
                      {currentStepData.description}
                    </p>

                    <div className="space-y-2">
                      <h4 className="text-[10px] font-mono font-bold text-zinc-400 uppercase tracking-widest">
                        Як саме це працює:
                      </h4>
                      <div className="grid grid-cols-1 gap-2">
                        {currentStepData.details.map((detail, idx) => (
                          <div key={idx} className="flex items-start space-x-2">
                            <div className="w-1 h-1 bg-purple-500 mt-2 shrink-0" />
                            <span className="text-xs text-zinc-400 leading-normal">{detail}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Autoclave mechanical test area */}
                  <div className="mt-8 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-black/60 p-3.5 border border-white/5">
                    <div className="space-y-0.5">
                      <div className="text-[11.5px] font-black uppercase tracking-wider text-zinc-200">
                        Контроль інструментів
                      </div>
                      <p className="text-[10px] text-zinc-500 max-w-sm font-light leading-snug">
                        Кожен крафт-пакет містить термоіндикатор. Перевірте працездатність автоклава:
                      </p>
                    </div>

                    <div className="shrink-0 flex items-center space-x-3 bg-zinc-950 border border-white/5 p-2">
                      <div className="text-center font-mono text-[9px] text-zinc-500">
                        <div>Пакет #021</div>
                        <span className="text-[8px] font-black uppercase block text-purple-400 mt-0.5">Класс B</span>
                      </div>
                      
                      <div className="flex flex-col items-center">
                        <div 
                          className={`w-8 h-8 border transition-all duration-500 flex items-center justify-center font-mono font-black text-xs ${
                            indicatorTested 
                              ? 'bg-zinc-900 border-purple-500 text-purple-400 shadow-lg' 
                              : 'bg-indigo-350 border-indigo-500 text-black'
                          }`}
                        >
                          {indicatorTested ? 'OK' : 'B'}
                        </div>
                        <span className="text-[8px] font-mono text-zinc-500 mt-1 uppercase font-bold">
                          {indicatorTested ? 'Стерильно' : 'Готовий'}
                        </span>
                      </div>

                      <button
                        onClick={() => setIndicatorTested(!indicatorTested)}
                        className="bg-black hover:bg-zinc-900 text-[10px] text-purple-400 border border-white/10 font-bold tracking-wider uppercase py-1 px-2.5 transition-all active:scale-95 cursor-pointer"
                      >
                        {indicatorTested ? 'Скинути' : 'Пуск'}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Warnings and Info Badge merged nicely at the bottom */}
              <div aria-live="polite" className="bg-red-950/10 border border-red-500/20 p-5 flex items-start space-x-3">
                <ShieldAlert className="w-5 h-5 text-red-500 mt-0.5 shrink-0" />
                <div>
                  <h4 className="text-xs font-black text-red-400 uppercase tracking-wider">Чому ми не використовуємо пірсинг-пістолети?</h4>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">
                    Пістолети неможливо повністю стерилізувати (пластик плавиться в автоклаві), що створює ризики зараження крові. Крім того, пістолет б'є тупою прикрасою за принципом розриву тканин, що суттєво уповільнює загоєння та пошкоджує структуру хрящів. Наша робота відбувається винятково за допомогою високоякісних лазерних голок з потрійною заточкою.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FAQs Collapsible list */}
        <div className="pt-8 border-t border-white/5">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h3 className="text-2xl sm:text-3xl font-sans font-black text-white uppercase tracking-tighter">
              Популярні запитання (FAQ)
            </h3>
            <div className="w-12 h-1 bg-purple-600 mx-auto mt-2" />
          </div>

          <div className="max-w-3xl mx-auto space-y-2.5">
            {FAQS.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              return (
                <div
                  key={index}
                  className="bg-zinc-950 border border-white/5 hover:border-white/10 rounded-none overflow-hidden transition-all duration-200"
                >
                  <button
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-4 py-3.5 flex items-center justify-between text-white hover:text-purple-400 font-bold text-xs uppercase tracking-wider bg-zinc-950 select-none cursor-pointer"
                  >
                    <span>{faq.question}</span>
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-purple-400 shrink-0" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-zinc-500 shrink-0" />
                    )}
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <div className="px-4 pb-4 pt-1 text-xs text-zinc-400 leading-relaxed font-light border-t border-white/5 bg-black/40">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
