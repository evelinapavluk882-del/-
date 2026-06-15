import React, { useState } from 'react';
import { PiercingService } from '../types';
import { SERVICES } from '../data';
import { X, Flame, Clock, ShieldCheck, HeartPulse, Sparkles, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PiercingDetailModalProps {
  serviceId: string | null;
  onClose: () => void;
  onSelectForBooking: (serviceId: string, jewelryType?: string) => void;
}

export default function PiercingDetailModal({ serviceId, onClose, onSelectForBooking }: PiercingDetailModalProps) {
  const [jewelryType, setJewelryType] = useState<'stud' | 'ring' | 'barbell'>('stud');
  const service = SERVICES.find((s) => s.id === serviceId);

  if (!service) return null;

  // Automatically adapt jewelry defaults based on piercing type
  const getAvailableJewelryOptions = (id: string) => {
    switch (id) {
      case 'septum':
        return [{ id: 'ring', name: 'Клікер / Кільце' }, { id: 'barbell', name: 'Циркуляр (Підкова)' }];
      case 'helix':
      case 'nostril':
      case 'conch':
      case 'lobe':
        return [{ id: 'stud', name: 'Лабрет (Накрутка)' }, { id: 'ring', name: 'Клікер (Кільце)' }];
      case 'tongue':
      case 'industrial':
      case 'bridge':
        return [{ id: 'barbell', name: 'Пряма Штанга' }];
      case 'vertical_labret':
      case 'navel':
      case 'eyebrow':
        return [{ id: 'barbell', name: 'Вигнутий Банан' }];
      case 'nipple':
        return [{ id: 'barbell', name: 'Штанга титанова' }, { id: 'ring', name: 'Кільце елітарне' }];
      case 'snake_bites':
        return [{ id: 'stud', name: 'Подвійні лабрети' }, { id: 'ring', name: 'Подвійні кільця' }];
      case 'labret':
      case 'medusa':
        return [{ id: 'stud', name: 'Лабрет з топом' }, { id: 'ring', name: 'Кільце (Загоєне)' }];
      case 'smiley':
        return [{ id: 'barbell', name: 'Мікроциркуляр (Підкова)' }, { id: 'stud', name: 'Мікробанан' }];
      default:
        return [{ id: 'stud', name: 'Лабрет' }];
    }
  };

  const jewelryOptions = getAvailableJewelryOptions(service.id);

  // Fallback to first option if current selected isn't relevant to this piercing
  const activeJewelry = jewelryOptions.some(opt => opt.id === jewelryType)
    ? jewelryType
    : (jewelryOptions[0]?.id as 'stud' | 'ring' | 'barbell' || 'stud');

  // SVG Anatomy Simulation Builder
  const renderAnatomySVG = () => {
    const strokeColor = "#be185d"; // rose-750 for main features
    const innerStrokeColor = "#52525b"; // zinc-600
    const organStrokeColor = "#fda4af"; // rose-300 for soft details
    const highlightColor = "#c084fc"; // purple-400 for glowing accents
    const accentColor = "#e9d5ff"; // purple-200 for subtext
    const baseJewelryColor = "#ffffff"; // high shine white for titanium
    const metalGradient = "url(#metal-gradient)";

    const skinFill = "rgba(168, 85, 247, 0.05)";
    const lipFillUpper = "rgba(225, 29, 72, 0.15)";
    const lipFillLower = "rgba(244, 63, 94, 0.22)";
    const tongueFill = "rgba(244, 3, 100, 0.25)";

    switch (service.category) {
      case 'ear':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
            <defs>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e4e4e7" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Ear Outer Shape filled with comfortable flesh-tone gradient */}
            <path
              d="M70,50 C110,10 160,25 160,65 C160,105 145,115 145,135 C145,155 125,175 95,175 C65,175 60,155 60,140 C60,115 70,110 70,100 C70,90 60,80 60,65 C60,50 65,52 70,50 Z"
              fill="rgba(168, 85, 247, 0.08)"
              stroke="#a855f7"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            {/* Ear Inner Ridges / Cartilage */}
            <path
              d="M90,75 C110,65 130,80 130,100 C130,120 115,130 115,145"
              fill="none"
              stroke="#c084fc"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <path
              d="M140,70 C140,85 130,120 100,145"
              fill="none"
              stroke="#52525b"
              strokeWidth="2"
              strokeDasharray="3 3"
            />
            {/* Tragus flap */}
            <path
              d="M70,100 C85,98 87,108 80,115 C75,122 70,120 70,120"
              fill="rgba(168, 85, 247, 0.15)"
              stroke="#a855f7"
              strokeWidth="3"
            />

            {/* Piercing Jewelry Overlays depending on service ID */}
            {service.id === 'lobe' && (
              <>
                {/* Lobe piercing */}
                <circle cx="95" cy="160" r="2" fill={highlightColor} className="animate-pulse" />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Ring going behind the earlobe (darker/back section) */}
                    <path d="M95,160 C101,160 106,165 101,171" fill="none" stroke="#27272a" strokeWidth="4" strokeLinecap="round" opacity="0.65" />
                    {/* Ring coming in front of the earlobe (brighter/front section) */}
                    <path d="M95,160 C87,163 87,173 101,171" fill="none" stroke={metalGradient} strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : (
                  <circle cx="95" cy="160" r="6" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                )}
                <text x="95" y="195" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ПРОКОЛ МОЧКИ</text>
              </>
            )}

            {service.id === 'helix' && (
              <>
                {/* Helix piercing at high-ear rim */}
                <circle cx="150" cy="50" r="2" fill={highlightColor} className="animate-pulse" />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Dark shadow back path of ring wrapping behind cartilage */}
                    <path d="M150,50 Q158,54 153,58" fill="none" stroke="#18181b" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
                    {/* Bright front metallic path wrapping over the cartilage fold */}
                    <path d="M150,50 Q142,42 153,58" fill="none" stroke={metalGradient} strokeWidth="3.5" strokeLinecap="round" />
                  </>
                ) : (
                  <circle cx="150" cy="50" r="5.5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                )}
                <text x="150" y="32" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ВЕРХНІЙ ХЕЛІКС</text>
              </>
            )}

            {service.id === 'tragus' && (
              <>
                {/* Tragus piercing */}
                <circle cx="81" cy="108" r="2" fill={highlightColor} className="animate-pulse" />
                <circle cx="81" cy="108" r="5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                <circle cx="75" cy="108" r="3.5" fill="#1e1b4b" stroke="#e9d5ff" strokeWidth="1" /> {/* Back disc decoration */}
                <text x="45" y="112" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="end" fontWeight="black" letterSpacing="0.05em">КОЗЕЛОК</text>
              </>
            )}

            {service.id === 'conch' && (
              <>
                {/* Conch centered in ear shell */}
                <circle cx="110" cy="105" r="2" fill={highlightColor} className="animate-pulse" />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Back shadow path wrapping behind the ear rim */}
                    <path d="M148,122 C135,128 110,128 110,128" fill="none" stroke="#18181b" strokeWidth="4" opacity="0.75" />
                    {/* Front bright path wrapping over the front of the inner ear and rim */}
                    <path d="M110,105 C132,105 148,112 148,122" fill="none" stroke={metalGradient} strokeWidth="4" strokeLinecap="round" />
                  </>
                ) : (
                  <circle cx="110" cy="105" r="7" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                )}
                <text x="110" y="88" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">КОНЧ (МУШЛЯ)</text>
              </>
            )}

            {service.id === 'industrial' && (
              <>
                {/* Industrial dual-helix barbell */}
                <circle cx="78" cy="45" r="2.5" fill={highlightColor} />
                <circle cx="152" cy="78" r="2.5" fill={highlightColor} />
                <line x1="72" y1="42" x2="158" y2="81" stroke={metalGradient} strokeWidth="5.5" strokeLinecap="round" />
                {/* End balls */}
                <circle cx="71" cy="41" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="159" cy="82" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <text x="115" y="28" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ІНДАСТРІАЛ</text>
              </>
            )}
          </svg>
        );

      case 'nose':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
            <defs>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e4e4e7" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {/* Soft pink/skin outline and translucent shadow of Nose ridge */}
            <path
              d="M100,20 L100,110 C100,122 88,135 68,135 C55,135 45,125 45,115"
              fill="none"
              stroke="#52525b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M100,110 C100,122 112,135 132,135 C145,135 155,125 155,115"
              fill="none"
              stroke="#52525b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path
              d="M100,45 C80,75 72,100 72,118 C72,132 82,138 100,138 C118,138 128,132 128,118 C128,100 120,75 100,45 Z"
              fill="rgba(168, 85, 247, 0.08)"
              stroke="#71717a"
              strokeWidth="2"
            />
            {/* Center Septum area */}
            <path
              d="M85,133 C90,138 100,140 101,140 C102,140 110,138 115,133"
              fill="none"
              stroke="#52525b"
              strokeWidth="5.5"
            />

            {/* Stylized Eyes to make Bridge and Nose instantly recognizable */}
            {(service.id === 'bridge' || service.id === 'septum' || service.id === 'nostril') && (
              <>
                {/* Left eye contour */}
                <path d="M30,55 C42,43 58,43 70,55 C58,67 42,67 30,55 Z" fill="rgba(82, 82, 91, 0.15)" stroke="#3f3f46" strokeWidth="1.5" />
                <circle cx="50" cy="55" r="4.5" fill="#a855f7" opacity="0.6" />
                {/* Right eye contour */}
                <path d="M130,55 C142,43 158,43 170,55 C158,67 142,67 130,55 Z" fill="rgba(82, 82, 91, 0.15)" stroke="#3f3f46" strokeWidth="1.5" />
                <circle cx="150" cy="55" r="4.5" fill="#a855f7" opacity="0.6" />
              </>
            )}

            {service.id === 'septum' && (
              <>
                <circle cx="100" cy="138" r="2" fill={highlightColor} className="animate-pulse" />
                <path
                  d="M86,143 A16,16 0 0,0 114,143"
                  fill="none"
                  stroke={metalGradient}
                  strokeWidth="4.5"
                  strokeLinecap="round"
                />
                <circle cx="85" cy="144" r="4" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <circle cx="115" cy="144" r="4" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <text x="100" y="178" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">СЕПТУМ</text>
              </>
            )}

            {service.id === 'nostril' && (
              <>
                <circle cx="127" cy="122" r="2" fill={highlightColor} className="animate-pulse" />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Back shadow path looping inside the nostril */}
                    <path d="M127,122 C118,122 116,128 126,134" fill="none" stroke="#18181b" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
                    {/* Front bright path looping over the nostril outer fold */}
                    <path d="M127,122 C135,121 140,127 126,134" fill="none" stroke={metalGradient} strokeWidth="3.5" strokeLinecap="round" />
                  </>
                ) : (
                  <circle cx="127" cy="122" r="5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                )}
                <text x="145" y="103" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="start" fontWeight="black" letterSpacing="0.05em">КРИЛО НОСА</text>
              </>
            )}

            {service.id === 'bridge' && (
              <>
                <circle cx="100" cy="55" r="2.5" fill={highlightColor} className="animate-pulse" />
                <line x1="76" y1="55" x2="124" y2="55" stroke={metalGradient} strokeWidth="5.5" strokeLinecap="round" />
                <circle cx="74" cy="55" r="6.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="126" cy="55" r="6.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <text x="100" y="32" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">БРІДЖ (ПЕРЕНІССЯ)</text>
              </>
            )}
          </svg>
        );

      case 'lip':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
            <defs>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e4e4e7" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>

            {/* Teeth silhouette */}
            <path d="M60,84 C60,84 80,72 100,75 C120,72 140,84 140,84 L140,104 C140,104 120,108 100,105 C80,108 60,104 60,104 Z" fill="#18181b" stroke="#3f3f46" strokeWidth="1.5" />
            <line x1="75" y1="76" x2="75" y2="104" stroke="#52525b" strokeWidth="1.5" />
            <line x1="90" y1="75" x2="90" y2="105" stroke="#52525b" strokeWidth="1.5" />
            <line x1="100" y1="75" x2="100" y2="105" stroke="#a855f7" strokeWidth="1.5" />
            <line x1="110" y1="75" x2="110" y2="105" stroke="#52525b" strokeWidth="1.5" />
            <line x1="125" y1="76" x2="125" y2="104" stroke="#52525b" strokeWidth="1.5" />

            {/* Upper Lip Shape with explicit rose filling */}
            <path
              d="M50,90 C50,90 70,72 88,78 C100,81 100,81 112,78 C130,72 150,90 150,90 C150,90 130,100 100,100 C70,100 50,90 50,90 Z"
              fill={lipFillUpper}
              stroke="#fb7185"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            {/* Lower Lip Shape with warm filling */}
            <path
              d="M50,90 C50,90 70,118 100,118 C130,118 150,90 150,90 C150,90 130,104 100,104 C70,104 50,90 50,90 Z"
              fill={lipFillLower}
              stroke="#f43f5e"
              strokeWidth="2.5"
              strokeLinecap="round"
            />

            {/* Interactive Overlay Jewelry */}
            {service.id === 'labret' && (
              <>
                <circle cx="100" cy="125" r="2" fill={highlightColor} className="animate-pulse" />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Dark back path going inside inner lip boundary */}
                    <path d="M100,103 C94,103 94,115 100,125" fill="none" stroke="#18181b" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
                    {/* Bright front metallic path wrapping nicely over lower lip edge */}
                    <path d="M100,125 C108,124 108,107 100,103" fill="none" stroke={metalGradient} strokeWidth="3.5" strokeLinecap="round" />
                  </>
                ) : (
                  <circle cx="100" cy="125" r="5.5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                )}
                <text x="100" y="148" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ЛАБРЕТ ЦЕНТР</text>
              </>
            )}

            {service.id === 'vertical_labret' && (
              <>
                <circle cx="100" cy="126" r="2" fill={highlightColor} className="animate-pulse" />
                <path d="M100,100 Q104,113 100,126" fill="none" stroke={metalGradient} strokeWidth="4.5" />
                <circle cx="100" cy="100" r="4.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <circle cx="100" cy="126" r="4.5" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <text x="100" y="148" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ВЕРТИКАЛЬНИЙ ЛАБРЕТ</text>
              </>
            )}

            {service.id === 'snake_bites' && (
              <>
                <circle cx="70" cy="116" r="2" fill={highlightColor} />
                <circle cx="130" cy="116" r="2" fill={highlightColor} />
                {activeJewelry === 'ring' ? (
                  <>
                    {/* Left shadow back path inside mouth */}
                    <path d="M71,102 C64,102 64,110 70,116" fill="none" stroke="#18181b" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
                    {/* Left bright front path on lip */}
                    <path d="M70,116 C62,112 62,104 71,102" fill="none" stroke={metalGradient} strokeWidth="3.5" strokeLinecap="round" />

                    {/* Right shadow back path inside mouth */}
                    <path d="M129,102 C136,102 136,110 130,116" fill="none" stroke="#18181b" strokeWidth="3.5" opacity="0.65" strokeLinecap="round" />
                    {/* Right bright front path on lip */}
                    <path d="M130,116 C138,112 138,104 129,102" fill="none" stroke={metalGradient} strokeWidth="3.5" strokeLinecap="round" />
                  </>
                ) : (
                  <>
                    <circle cx="70" cy="116" r="5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                    <circle cx="130" cy="116" r="5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                  </>
                )}
                <text x="100" y="148" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ЗМІЇНИЙ УКУС</text>
              </>
            )}

            {service.id === 'medusa' && (
              <>
                <circle cx="100" cy="67" r="2" fill={highlightColor} className="animate-pulse" />
                <circle cx="100" cy="67" r="5.5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
                <text x="100" y="52" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">МЕДУЗА</text>
              </>
            )}

            {service.id === 'smiley' && (
              <>
                <circle cx="100" cy="80" r="1.5" fill={highlightColor} className="animate-pulse" />
                <path
                  d="M91,83 A11,11 0 0,0 109,83"
                  fill="none"
                  stroke={metalGradient}
                  strokeWidth="4"
                  strokeLinecap="round"
                />
                <circle cx="90" cy="84" r="3.2" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <circle cx="110" cy="84" r="3.2" fill="#c084fc" stroke="#ffffff" strokeWidth="1" />
                <text x="100" y="148" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">СМАЙЛ (ПОСМІШКА)</text>
              </>
            )}
          </svg>
        );

      case 'face':
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
            <defs>
              <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="40%" stopColor="#e4e4e7" />
                <stop offset="70%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>
            </defs>
            {service.id === 'eyebrow' ? (
              <>
                {/* Visual Eye Sketch under the Eyebrow */}
                <path d="M50,110 C65,92 105,92 120,110 C105,128 65,128 50,110 Z" fill="rgba(82, 82, 91, 0.15)" stroke="#3f3f46" strokeWidth="1.5" />
                <circle cx="85" cy="110" r="12" fill="none" stroke="#71717a" strokeWidth="1.5" />
                <circle cx="85" cy="110" r="6" fill="#a855f7" />
                <circle cx="88" cy="107" r="2.2" fill="#ffffff" /> {/* Eye highlight */}

                {/* Eyebrow base back shape */}
                <path d="M40,75 C70,60 110,60 140,75" fill="none" stroke="#27272a" strokeWidth="11" strokeLinecap="round" opacity="0.4" />
                <path d="M40,75 Q90,60 140,73" fill="none" stroke="#18181b" strokeWidth="8" strokeLinecap="round" />
                <path d="M42,74 L38,80 M55,71 L51,77 M72,67 L68,74 M92,66 L89,73 M112,67 L109,73 M130,71 L127,77" stroke="#000000" strokeWidth="3" />

                {/* Curved Barbell piercing through the brow arch */}
                <circle cx="112" cy="51" r="2.5" fill={highlightColor} className="animate-pulse" />
                <path d="M112,51 Q117,67 112,83" fill="none" stroke={metalGradient} strokeWidth="5" />
                <circle cx="112" cy="51" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <circle cx="112" cy="83" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                <text x="95" y="145" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ПРОКОЛ БРОВИ</text>
              </>
            ) : (
              // Bridge fallback/render
              <>
                <path d="M30,110 C42,98 58,98 70,110 C58,122 42,122 30,110 Z" fill="none" stroke="#52525b" strokeWidth="2" />
                <path d="M130,110 C142,98 158,98 170,110 C158,122 142,122 130,110 Z" fill="none" stroke="#52525b" strokeWidth="2" />
                <line x1="72" y1="110" x2="128" y2="110" stroke={metalGradient} strokeWidth="5" />
                <circle cx="70" cy="110" r="6" fill={highlightColor} />
                <circle cx="130" cy="110" r="6" fill={highlightColor} />
              </>
            )}
          </svg>
        );

      case 'body':
        if (service.id === 'tongue') {
          return (
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
              <defs>
                <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e4e4e7" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              {/* Mouth Cavity */}
              <path d="M40,60 Q100,34 160,60 L160,118 Q100,135 40,118 Z" fill="#1b1212" stroke="#3f3f46" strokeWidth="3" />
              {/* Upper Teeth */}
              <path d="M48,58 Q100,45 152,58" fill="none" stroke="#f4f4f5" strokeWidth="8" strokeLinecap="round" />
              {/* Lower Teeth */}
              <path d="M48,118 Q100,131 152,118" fill="none" stroke="#f4f4f5" strokeWidth="6" strokeLinecap="round" />
              {/* Extended Tongue outline with rich rose filling */}
              <path
                d="M65,95 C65,60 135,60 135,95 C135,132 115,155 100,155 C85,155 65,132 65,95 Z"
                fill={tongueFill}
                stroke="#e11d48"
                strokeWidth="3.5"
                strokeLinecap="round"
              />
              {/* Tongue seam */}
              <path d="M100,75 V138" fill="none" stroke="#be123c" strokeWidth="2" strokeDasharray="3 3" />

              {/* Vertical barbell bead on tongue */}
              <circle cx="100" cy="102" r="2.5" fill={highlightColor} className="animate-pulse" />
              <circle cx="100" cy="102" r="7.5" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
              <circle cx="97" cy="99" r="2.5" fill="#ffffff" opacity="0.6" />
              <text x="100" y="178" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ВЕРТИКАЛЬНИЙ ЯЗИК</text>
            </svg>
          );
        }

        if (service.id === 'navel') {
          return (
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
              <defs>
                <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e4e4e7" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              {/* Abdomen background shape */}
              <path d="M30,30 Q100,42 170,30 L170,170 Q100,158 30,170 Z" fill="rgba(168, 85, 247, 0.04)" stroke="#52525b" strokeWidth="1.2" strokeDasharray="4 4" />
              {/* Belly contour lines */}
              <path d="M30,70 Q100,90 170,70" fill="none" stroke="#3f3f46" strokeWidth="2.5" strokeLinecap="round" />
              {/* Navel Cavity */}
              <ellipse cx="100" cy="115" rx="22" ry="14" fill="#0c0a09" stroke="#52525b" strokeWidth="3" />
              <path d="M88,115 C92,122 108,122 112,115" fill="none" stroke="#71717a" strokeWidth="2.5" />

              {/* Classic navel curved barbell (double bead) */}
              <circle cx="100" cy="101" r="2" fill={highlightColor} className="animate-pulse" />
              <path d="M100,75 Q106,88 100,101" fill="none" stroke={metalGradient} strokeWidth="5.5" />
              {/* Tiny top metal ball */}
              <circle cx="100" cy="75" r="5" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
              {/* Large bottom ball with sparkling crystal details */}
              <circle cx="100" cy="101" r="9" fill={metalGradient} stroke="#c084fc" strokeWidth="1.5" />
              <circle cx="100" cy="101" r="4.5" fill="#e9d5ff" />
              <circle cx="98" cy="99" r="2" fill="#ffffff" />
              <text x="100" y="150" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ПІРСИНГ ПУПКА</text>
            </svg>
          );
        }

        if (service.id === 'nipple') {
          return (
            <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
              <defs>
                <linearGradient id="metal-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#e4e4e7" />
                  <stop offset="70%" stopColor="#94a3b8" />
                  <stop offset="100%" stopColor="#475569" />
                </linearGradient>
              </defs>
              {/* Stylized high-fashion scientific abstract model */}
              <circle cx="100" cy="100" r="48" fill="rgba(168, 85, 247, 0.04)" stroke="#52525b" strokeWidth="2" strokeDasharray="4 4" />
              <circle cx="100" cy="100" r="24" fill="rgba(244, 63, 94, 0.08)" stroke="#fda4af" strokeWidth="3" />
              <circle cx="100" cy="100" r="10" fill="rgba(244, 63, 94, 0.15)" stroke="#fb7185" strokeWidth="2" />

              {/* Jewelry passing exactly through center */}
              <circle cx="100" cy="100" r="1.5" fill={highlightColor} className="animate-pulse" />
              {activeJewelry === 'ring' ? (
                <>
                  {/* Back shadow path of nipple ring */}
                  <path d="M100,100 A12,12 0 0,1 80,100" fill="none" stroke="#18181b" strokeWidth="4.5" strokeLinecap="round" opacity="0.65" />
                  {/* Front bright path of nipple ring */}
                  <path d="M100,100 A12,12 0 0,0 80,100" fill="none" stroke={metalGradient} strokeWidth="4.5" strokeLinecap="round" />
                </>
              ) : (
                <>
                  <line x1="68" y1="100" x2="132" y2="100" stroke={metalGradient} strokeWidth="5" />
                  <circle cx="67" cy="100" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                  <circle cx="133" cy="100" r="6" fill="#c084fc" stroke="#ffffff" strokeWidth="1.2" />
                </>
              )}
              <text x="100" y="165" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">ГОРИЗОНТАЛЬНИЙ СОСОК</text>
            </svg>
          );
        }

        // Catch-all fallbacks
        return (
          <svg viewBox="0 0 200 200" className="w-full h-full max-w-[260px] mx-auto overflow-visible select-none">
            <ellipse cx="100" cy="100" rx="60" ry="40" fill="rgba(168, 85, 247, 0.05)" stroke="#52525b" strokeWidth="3" />
            <circle cx="100" cy="100" r="2.5" fill={highlightColor} className="animate-pulse" />
            <line x1="60" y1="100" x2="140" y2="100" stroke={metalGradient} strokeWidth="5" />
            <circle cx="58" cy="100" r="6" fill="#c084fc" />
            <circle cx="142" cy="100" r="6" fill="#c084fc" />
            <text x="100" y="156" fill={accentColor} fontSize="10" fontFamily="sans-serif" textAnchor="middle" fontWeight="black" letterSpacing="0.05em">АНАТОМІЧНА МОДЕЛЬ</text>
          </svg>
        );

      default:
        return null;
    }
  };

  const painLevelComment = (level: number) => {
    switch (level) {
      case 1: return "Майже невідчутно. Швидка мочка вуха.";
      case 2: return "Помірний укольчик. Більшість клієнтів оцінюють як 2/10.";
      case 3: return "Терпимий тиск. Короткочасне поколювання хряща.";
      case 4: return "Відчутний прокол хряща або подвійний сетап.";
      default: return "Висока чутливість. Професійні дихальні техніки майстра допоможуть звести біль до мінімуму.";
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-6 overflow-y-auto"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, y: 20 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.95, y: 20 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-zinc-950 border border-white/10 w-full max-w-4xl rounded-none shadow-2xl relative flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-white/10 max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-hidden"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-40 p-2 bg-zinc-950 border border-white/10 text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" strokeWidth={2.5} />
          </button>

          {/* Left panel: Custom interactive model simulator */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between bg-black/40 min-h-[360px] md:min-h-[500px]">
            <div>
              <span className="text-[10px] font-mono font-black text-purple-400 uppercase tracking-widest block mb-1">
                СИМУЛЯТОР РОЗМІЩЕННЯ ТА ПРИКРАС
              </span>
              <h3 className="text-xl font-black text-white uppercase tracking-tight font-sans">
                {service.name} (Частина тіла)
              </h3>
              <p className="text-zinc-500 text-xs mt-1.5 font-light leading-relaxed">
                Погляньте на тривимірний векторний ескіз проколу {service.name.toLowerCase()} у розрізі даної зони. Ця схема показує ортогональний кут каналу та розташування титанової прикраси.
              </p>
            </div>

            {/* Simulated schematic active area */}
            <div className="py-8 my-auto relative">
              <div className="absolute inset-x-0 top-0 text-center font-mono text-[9px] text-zinc-650 flex items-center justify-center gap-1">
                <span className="w-1.5 h-1.5 bg-purple-500 rounded-full animate-ping" />
                <span>РЕЖИМ СЕКТОРНОГО МОДЕЛЮВАННЯ</span>
              </div>
              
              {renderAnatomySVG()}
            </div>

            {/* Interactive controls */}
            <div>
              <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">
                Змінити тип симульованої прикраси:
              </span>
              <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
                {jewelryOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setJewelryType(opt.id as any)}
                    className={`py-2 px-3 text-[10.5px] font-mono transition-all duration-200 uppercase tracking-wider border text-center cursor-pointer ${
                      activeJewelry === opt.id
                        ? 'bg-purple-600 border-purple-500 text-white font-bold'
                        : 'bg-zinc-950 border-white/5 text-zinc-400 hover:text-white hover:border-white/15'
                    }`}
                  >
                    {opt.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel: Extensive medical details and features */}
          <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
            <div className="space-y-6">
              {/* Badge cluster */}
              <div className="flex items-center space-x-2">
                <span className="bg-purple-900/40 border border-purple-500 text-purple-400 text-[9px] font-mono font-black px-2.5 py-1 uppercase tracking-widest">
                  {service.categoryUa}
                </span>
                <span className="text-xs text-zinc-500 font-mono">
                  ID: #{service.id}
                </span>
              </div>

              {/* Title & description */}
              <div className="space-y-3">
                <h4 className="text-2xl font-black text-white font-sans uppercase tracking-tight">
                  Культура та медицина проколу
                </h4>
                <p className="text-zinc-350 text-xs sm:text-sm font-light leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Anatomy details structure */}
              <div className="grid grid-cols-3 gap-2.5 py-4 border-t border-b border-white/10 text-xs font-mono">
                <div className="space-y-1">
                  <span className="text-zinc-550 block text-[9px] font-bold uppercase tracking-wide">ЗАГОЄННЯ</span>
                  <div className="text-white font-bold flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span className="truncate">{service.healingTime}</span>
                  </div>
                </div>
                
                <div className="space-y-1">
                  <span className="text-zinc-550 block text-[9px] font-bold uppercase tracking-wide">БІЛЬ</span>
                  <div className="text-white font-bold flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                    <span>{service.painLevel}/5</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-zinc-550 block text-[9px] font-bold uppercase tracking-wide">ВІК</span>
                  <div className="text-white font-bold flex items-center gap-1">
                    <span className="text-[10px] bg-purple-900/30 text-purple-400 px-1 rounded uppercase font-bold shrink-0">Age</span>
                    <span>{service.minAge || '16+ років'}</span>
                  </div>
                </div>
              </div>

              {/* Quick tip from doctors/biologists */}
              <div className="space-y-2.5">
                <div className="flex items-center space-x-2 text-[10.5px] font-mono font-bold text-white uppercase tracking-wider">
                  <HeartPulse className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Медичний коментар майстра:</span>
                </div>
                <p className="text-zinc-400 text-xs font-light leading-relaxed bg-black/60 p-3.5 border border-white/5 italic">
                  * «{painLevelComment(service.painLevel)} Рекомендований вік для цього проколу становить {service.minAge || '16+'}. Під час сеансу використовується виключно стерильна тригранна лазерна голка, яка робить ювелірний зріз хряща чи тканини в один дотик.»
                </p>
              </div>

              {/* Jewelry advice block */}
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-[10.5px] font-mono font-bold text-white uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-purple-400 shrink-0" />
                  <span>Рекомендований сплав та розмір:</span>
                </div>
                <div className="p-3.5 bg-purple-950/10 border border-purple-500/20 text-xs text-zinc-300 rounded-none leading-relaxed font-sans">
                  <strong>{service.recommendedJewelry}</strong> із сертифікованого німецького титану ASTM F-136. Тип зрізу та дзеркальне полірування забезпечують нульове тертя при первинному набряку тканин.
                </div>
              </div>

            </div>

            {/* Quick action button container mapping to scheduling */}
            <div className="mt-8 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] text-zinc-550 font-mono uppercase font-bold block">Фіксована Вартість (з сережкою)</span>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {service.price} <span className="text-base text-purple-400 font-semibold">₴</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                <button
                  onClick={onClose}
                  className="w-full sm:w-auto bg-zinc-900 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white text-xs font-mono font-semibold tracking-wider uppercase px-5 py-4 transition-colors text-center cursor-pointer"
                >
                  Повернутися на головну
                </button>

                <button
                  onClick={() => {
                    onSelectForBooking(service.id, activeJewelry);
                    onClose();
                    // Scroll to booking wizards
                    const element = document.getElementById('booking-section');
                    if (element) {
                      const offset = 80;
                      const bodyRect = document.body.getBoundingClientRect().top;
                      const elementRect = element.getBoundingClientRect().top;
                      const elementPosition = elementRect - bodyRect;
                      const offsetPosition = elementPosition - offset;
                      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
                    }
                  }}
                  className="w-full sm:w-auto bg-purple-600 hover:bg-purple-700 text-white text-xs font-mono font-black tracking-widest uppercase px-8 py-4 transition-colors text-center cursor-pointer"
                >
                  ЗАПИСАТИСЯ НА {service.name.toUpperCase()}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
