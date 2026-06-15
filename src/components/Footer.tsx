import { ShieldCheck, Heart, Mail, Phone, MapPin, Clock } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-black border-t border-white/10 pt-16 pb-12 text-zinc-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          
          {/* Logo & About Card */}
          <div className="space-y-4 md:col-span-1">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 flex items-center justify-center rounded-none border-2 border-purple-500 bg-black">
                <span className="text-purple-400 font-serif font-black text-base italic">A</span>
              </div>
              <span className="text-base font-black tracking-widest text-white uppercase font-sans">
                AURA <span className="text-purple-500 font-serif font-light lowercase">piercing</span>
              </span>
            </div>
            
            <p className="text-xs font-light leading-relaxed text-zinc-500">
              Професійна студія пірсингу в центрі столиці. Досвідчені майстри з вищою медичною та біологічною освітою, найкращі титанові прикраси та суворий інфекційний контроль.
            </p>
          </div>

          {/* Quick Contact info */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-white">
              Контакти
            </h4>
            <div className="space-y-2.5 text-xs font-light">
              <a href="tel:+380931234567" className="flex items-center space-x-2.5 hover:text-purple-400 transition-colors">
                <Phone className="w-4 h-4 text-purple-400" />
                <span>+380 (93) 123-45-67</span>
              </a>
              <a href="mailto:info@aurapiercing.com.ua" className="flex items-center space-x-2.5 hover:text-purple-400 transition-colors">
                <Mail className="w-4 h-4 text-purple-400" />
                <span>info@aurapiercing.com.ua</span>
              </a>
              <div className="flex items-start space-x-2.5">
                <MapPin className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                <span>м. Київ, вул. Антоновича, 12 <br /><span className="text-[10.5px] text-zinc-500 font-mono italic">(ст. м. Площа Українських Героїв / Льва Толстого)</span></span>
              </div>
            </div>
          </div>

          {/* Opening times */}
          <div className="space-y-4">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-white">
              Графік роботи
            </h4>
            <div className="space-y-2 text-xs font-light">
              <div className="flex items-center space-x-2.5">
                <Clock className="w-4 h-4 text-purple-400" />
                <span>Працюємо щодня без вихідних</span>
              </div>
              <div className="pl-6.5">
                <div className="text-purple-400 font-mono font-bold">Пн - Нд: 10:00 - 20:00</div>
                <div className="text-[10.5px] text-zinc-500 font-normal mt-1 leading-relaxed">Прийом проводиться за попереднім онлайн-записом для дотримання ідеальних умов чистоти кабінету.</div>
              </div>
            </div>
          </div>

          {/* Health Guarantee checklist */}
          <div className="space-y-4 col-span-1">
            <h4 className="text-xs font-mono font-black uppercase tracking-widest text-white">
              Стандарти якості
            </h4>
            <div className="space-y-2 text-[11px] text-purple-400 font-mono">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>МЕДИЧНИЙ АВТОКЛАВ КЛАСУ В</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>БІОСУМІСНИЙ ТИТАН ASTM F-136</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>ОДНОРАЗОВІ СТЕРИЛЬНІ ГОЛКИ</span>
              </div>
            </div>
          </div>

        </div>

        {/* Legal and system meta copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-zinc-500 font-light gap-4">
          <div>
            &copy; {currentYear} Студія безпечного пірсингу "AURA". Всі права захищено.
          </div>
          <div className="flex items-center gap-1 font-mono text-[10px]">
            <span>Розроблено за медичними стандартами стерильності з</span>
            <Heart className="w-3.5 h-3.5 text-purple-500 fill-current mx-0.5 animate-pulse" />
          </div>
        </div>

      </div>
    </footer>
  );
}
