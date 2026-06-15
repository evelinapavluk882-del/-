import { motion } from 'motion/react';
import { ShieldCheck, Flame, Trophy, ChevronRight } from 'lucide-react';

interface HeroProps {
  onCTAQuery: (targetId: string) => void;
}

export default function Hero({ onCTAQuery }: HeroProps) {
  const scrollTo = (id: string) => {
    onCTAQuery(id);
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
    <section id="hero" className="relative min-h-screen flex items-center justify-center bg-black pt-28 overflow-hidden border-b border-white/10">
      {/* Absolute background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(168,85,247,0.06),rgba(0,0,0,0))]" />
      
      {/* Decorative vertical scanlines for a technical, precise feel */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:100%_40px] pointer-events-none opacity-40" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full py-12 md:py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-stretch">
          
          {/* Text Content */}
          <div className="col-span-1 lg:col-span-7 flex flex-col justify-center space-y-8 text-center lg:text-left">
            
            {/* Status Pill Indicator */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center space-x-2.5 bg-zinc-950 border border-white/10 px-4 py-2 w-fit mx-auto lg:mx-0 shadow-lg"
            >
              <div className="w-2 h-2 bg-purple-500 rounded-none animate-pulse" />
              <span className="text-xs font-mono font-bold tracking-widest text-zinc-300 uppercase">
                Абсолютна стерильність &bull; Безпечний пірсинг
              </span>
            </motion.div>
 
            {/* Main Headline */}
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-4xl sm:text-6xl md:text-7xl lg:text-[85px] lg:leading-[0.85] font-sans font-black text-white tracking-tighter uppercase"
              >
                Твій стиль. <br />
                <span className="text-purple-500 font-black">
                  твоя безпечна
                </span> <br className="hidden sm:inline" />
                експресія.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="max-w-xl text-zinc-400 text-sm sm:text-base md:text-lg font-light leading-relaxed mx-auto lg:mx-0"
              >
                Студія професійного пірсингу в Києві. Тільки сертифіковані майстри з медичною освітою, титанові прикраси преміум-марки ASTM F-136 та 3-рівнева медична стерилізація автоклавом класу B.
              </motion.p>
            </div>

            {/* Interactive CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <button 
                onClick={() => scrollTo('booking-section')}
                className="w-full sm:w-auto bg-white text-black hover:bg-purple-600 hover:text-white font-black px-8 py-4 uppercase tracking-widest text-xs transition-all duration-200 transform active:scale-95 shadow-xl"
              >
                Забронювати сеанс
              </button>
              
              <button 
                onClick={() => scrollTo('services')}
                className="w-full sm:w-auto bg-zinc-950 hover:bg-zinc-900 border border-white/10 hover:border-purple-500 text-zinc-200 hover:text-purple-400 px-8 py-4 transition-all duration-300 flex items-center justify-center space-x-2 text-xs uppercase tracking-widest font-black"
              >
                <span>Переглянути ціни</span>
                <ChevronRight className="w-4 h-4 text-zinc-400" />
              </button>
            </motion.div>

            {/* Quick trust metrics */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="pt-8 border-t border-white/10 grid grid-cols-3 gap-4"
            >
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-purple-400 tracking-tighter">10K+</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">успішних проколів</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-white tracking-tighter">100%</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">імплантний титан</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-3xl font-black text-purple-400 tracking-tighter">B Class</div>
                <div className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold">стандарт автоклава</div>
              </div>
            </motion.div>

          </div>

          {/* Right Side Visual Grid */}
          <div className="col-span-1 lg:col-span-5 relative flex items-center justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative p-0 w-full"
            >
              {/* Main image container */}
              <div className="relative border border-white/10 bg-zinc-950 p-4 shadow-2xl">
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black to-transparent z-10" />
                
                <div className="h-[430px] w-full overflow-hidden relative">
                  <img 
                    src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600&h=800" 
                    alt="Pierced alternative master portrait" 
                    className="w-full h-full object-cover grayscale brightness-90 hover:grayscale-0 transition-all duration-700"
                    referrerPolicy="no-referrer"
                  />
                  
                  {/* Overlay clinical quality tag */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 bg-black border border-white/10 p-4 max-w-none">
                    <div className="flex items-center space-x-2 text-purple-400 mb-1">
                      <ShieldCheck className="w-4 h-4 text-purple-400" />
                      <span className="text-[10px] uppercase tracking-widest font-black text-purple-400 font-mono">Медичний контроль</span>
                    </div>
                    <p className="text-[11px] text-zinc-450 leading-relaxed font-light">
                      "Жодних пістолетів. Проколи виконуються виключно катетерними голками найвищої точності."
                    </p>
                  </div>
                </div>
              </div>

              {/* Decorative Floating Cards */}
              <div className="absolute -top-4 -right-4 bg-zinc-950 border border-white/10 p-3.5 shadow-xl hidden xl:flex items-center space-x-3 hover:border-purple-500 transition-colors cursor-default">
                <div className="p-2 bg-purple-500/10 text-purple-400">
                  <Flame className="w-5 h-5 animate-pulse" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">ASTM F-136 Titanium</div>
                  <div className="text-[9px] font-mono tracking-wide text-zinc-500 uppercase">Повна біосумісність</div>
                </div>
              </div>

              <div className="absolute -bottom-4 -left-4 bg-zinc-950 border border-white/10 p-3.5 shadow-xl hidden xl:flex items-center space-x-3 hover:border-purple-500 transition-colors cursor-default">
                <div className="p-2 bg-purple-500/10 text-purple-400">
                  <Trophy className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] font-black text-white uppercase tracking-wider">Гарантія загоєння</div>
                  <div className="text-[9px] font-mono tracking-wide text-zinc-500 uppercase">Безкоштовний огляд-консультація</div>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
