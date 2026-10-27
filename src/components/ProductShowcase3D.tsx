import React, { useCallback, useMemo, useRef, useState } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Sparkles,
  Smartphone,
  ShieldCheck,
  Radio,
  Clock,
  HeartHandshake,
  MapPin,
  Users,
  Baby,
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { translations } from '../i18n/translations';
import { PhonePhotoItem } from './PhoneScreenshotCard';
import { PhoneScreenshotModal } from './PhoneScreenshotModal';
import { PhoneFrame, ScreenImage } from './PhoneFrame';
import { getProductPhotos, getScreenshotSources } from '../data/productPhotos';
import { ProductKey } from '../routing';

const SLIDE_DURATION_MS = 4200;

export const PRODUCT_ACCENT: Record<ProductKey, { main: string; soft: string; glow: string }> = {
  senear: { main: '#C5A880', soft: '#E8D5B0', glow: '212, 175, 55' },
  junear: { main: '#3BA99C', soft: '#BFE6E0', glow: '59, 169, 156' },
};

type Lang = 'hu' | 'en' | 'de';
const L = (lang: string, hu: string, en: string, de: string) =>
  lang === 'hu' ? hu : lang === 'de' ? de : en;

interface Callout {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}

function getCallouts(product: ProductKey, lang: Lang): { left: Callout; right: Callout }[] {
  if (product === 'senear') {
    return [
      {
        left: { icon: Smartphone, label: L(lang, '4 nagy csempe', '4 large tiles', '4 große Kacheln') },
        right: { icon: ShieldCheck, label: L(lang, 'Elállíthatatlan kioszk', 'Fail-safe kiosk', 'Sicherer Kiosk') },
      },
      {
        left: { icon: Radio, label: L(lang, 'Azonnali SOS', 'Instant SOS', 'Sofort-Notruf') },
        right: { icon: MapPin, label: L(lang, 'GPS koordináta SMS-ben', 'GPS location by SMS', 'GPS-Standort per SMS') },
      },
      {
        left: { icon: HeartHandshake, label: L(lang, 'Távgondozói portál', 'Caregiver portal', 'Betreuer-Portal') },
        right: { icon: Radio, label: L(lang, 'Élő akku & státusz', 'Live battery & status', 'Live-Akku & Status') },
      },
      {
        left: { icon: Clock, label: L(lang, 'Azonnali értesítések', 'Instant alerts', 'Sofort-Benachrichtigungen') },
        right: { icon: ShieldCheck, label: L(lang, 'Riasztási napló', 'Alert history', 'Alarm-Protokoll') },
      },
    ];
  }
  return [
    {
      left: { icon: Baby, label: L(lang, 'Gyerekbarát felület', 'Kid-friendly launcher', 'Kinderfreundlich') },
      right: { icon: ShieldCheck, label: L(lang, 'Kioszk zár', 'Kiosk lock', 'Kiosk-Sperre') },
    },
    {
      left: { icon: MapPin, label: L(lang, 'Élő GPS', 'Live GPS', 'Live-GPS') },
      right: { icon: Radio, label: L(lang, 'Biztonsági zónák', 'Safe zones', 'Sicherheitszonen') },
    },
    {
      left: { icon: HeartHandshake, label: L(lang, 'Szülői konzol', 'Parent console', 'Eltern-Konsole') },
      right: { icon: Clock, label: L(lang, 'Akku & hívásnapló', 'Battery & call log', 'Akku & Anrufliste') },
    },
    {
      left: { icon: Users, label: L(lang, 'Családi hívó', 'Family dialer', 'Familien-Telefon') },
      right: { icon: ShieldCheck, label: L(lang, 'Csak engedélyezett hívók', 'Whitelisted callers only', 'Nur erlaubte Anrufer') },
    },
  ];
}

interface ProductShowcase3DProps {
  product: ProductKey;
  /** Optional element rendered under the caption (e.g. CTA button). */
  footer?: React.ReactNode;
  className?: string;
}

/**
 * Unboxed, floating 3D "Spotlight Stage" for one product.
 * All screenshots are rendered without CSS blur filters and the active phone sits at
 * its native scale (translateZ(0)), so the images stay perfectly crisp.
 */
export function ProductShowcase3D({ product, footer, className = '' }: ProductShowcase3DProps) {
  const { language } = useLanguage();
  const lang = (['hu', 'en', 'de'].includes(language) ? language : 'en') as Lang;
  const localizedT = translations[lang] ?? translations.en;
  const accent = PRODUCT_ACCENT[product];

  const photos = useMemo(() => getProductPhotos(product, localizedT), [product, localizedT]);
  const callouts = useMemo(() => getCallouts(product, lang), [product, lang]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<1 | -1>(1);
  const [zoomPhoto, setZoomPhoto] = useState<PhonePhotoItem | null>(null);
  const pointerStartX = useRef<number | null>(null);
  const didSwipe = useRef(false);

  const count = photos.length;
  const active = photos[activeIndex];
  const callout = callouts[activeIndex] || callouts[0];

  const goTo = useCallback(
    (next: number, dir: 1 | -1) => {
      setDirection(dir);
      setActiveIndex(((next % count) + count) % count);
    },
    [count]
  );
  const goNext = () => goTo(activeIndex + 1, 1);
  const goPrev = () => goTo(activeIndex - 1, -1);

  return (
    <div
      className={`relative w-full flex flex-col items-center select-none ${className}`}
    >
      {/* STAGE */}
      <div
        className="relative w-full h-[480px] sm:h-[540px] lg:h-[580px] flex items-center justify-center cursor-grab active:cursor-grabbing touch-pan-y"
        onPointerDown={(e) => {
          pointerStartX.current = e.clientX;
          didSwipe.current = false;
        }}
        onPointerUp={(e) => {
          if (pointerStartX.current === null) return;
          const delta = e.clientX - pointerStartX.current;
          pointerStartX.current = null;
          if (Math.abs(delta) > 40) {
            didSwipe.current = true;
            if (delta < 0) goNext();
            else goPrev();
          }
        }}
        style={{ perspective: '1200px' }}
      >
        {/* Ambient aura */}
        <div
          className="ps3d-glow absolute w-[340px] sm:w-[440px] lg:w-[500px] h-[340px] sm:h-[440px] lg:h-[500px] rounded-full pointer-events-none"
          style={{
            background: `radial-gradient(circle, rgba(${accent.glow},0.26) 0%, rgba(${accent.glow},0.10) 45%, transparent 70%)`,
          }}
          aria-hidden="true"
        />

        {/* Rising sparkles */}
        {[...Array(12)].map((_, i) => (
          <span
            key={i}
            className="ps3d-particle absolute rounded-full pointer-events-none"
            style={{
              left: `${12 + ((i * 31) % 76)}%`,
              bottom: `${10 + ((i * 23) % 40)}%`,
              width: `${2.5 + (i % 3)}px`,
              height: `${2.5 + (i % 3)}px`,
              background: accent.soft,
              boxShadow: `0 0 8px 1px rgba(${accent.glow},0.7)`,
              animationDelay: `${-i * 0.7}s`,
              animationDuration: `${5.5 + (i % 4)}s`,
            }}
            aria-hidden="true"
          />
        ))}

        {/* Feature callouts */}
        <div
          key={`l-${activeIndex}`}
          className="hidden sm:flex absolute left-0 lg:-left-4 top-[30%] z-30 ps3d-float items-center gap-2 bg-white/95 px-3.5 py-2 rounded-2xl border shadow-lg text-[#2C2C2C] text-xs font-bold"
          style={{ borderColor: `${accent.main}80` }}
        >
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center text-white"
            style={{ background: accent.main }}
          >
            {React.createElement(callout.left.icon, { className: 'w-4 h-4' })}
          </div>
          <span className="whitespace-nowrap">{callout.left.label}</span>
        </div>
        <div
          key={`r-${activeIndex}`}
          className="hidden sm:flex absolute right-0 lg:-right-4 top-[64%] z-30 ps3d-float-rev items-center gap-2 bg-white/95 px-3.5 py-2 rounded-2xl border shadow-lg text-[#2C2C2C] text-xs font-bold"
          style={{ borderColor: `${accent.main}80` }}
        >
          <div className="w-7 h-7 rounded-lg bg-[#2C2C2C] flex items-center justify-center" style={{ color: accent.soft }}>
            {React.createElement(callout.right.icon, { className: 'w-4 h-4' })}
          </div>
          <span className="whitespace-nowrap">{callout.right.label}</span>
        </div>

        {/* Devices */}
        <div className="absolute inset-0 flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          {photos.map((photo, i) => {
            let offset = i - activeIndex;
            if (offset > count / 2) offset -= count;
            if (offset < -count / 2) offset += count;
            const isActive = offset === 0;
            const isHidden = Math.abs(offset) > 1;

            // Active phone: native scale, no Z translation => pixel-perfect sharp image.
            const transform = isActive
              ? 'translateX(0) translateZ(0) rotateY(0deg)'
              : isHidden
              ? 'translateX(0) translateZ(-360px) rotateY(0deg)'
              : `translateX(${offset * 64}%) translateZ(-170px) rotateY(${-offset * 26}deg)`;

            return (
              <div
                key={photo.id}
                className="absolute transition-[transform,opacity] duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  transform,
                  opacity: isHidden ? 0 : 1,
                  zIndex: isActive ? 20 : isHidden ? 0 : 10,
                  transformStyle: 'preserve-3d',
                  pointerEvents: isHidden ? 'none' : 'auto',
                }}
              >
                <div
                  onClick={() => {
                    if (didSwipe.current) return;
                    if (isActive) setZoomPhoto(photo);
                    else goTo(i, offset > 0 ? 1 : -1);
                  }}
                  className={`relative cursor-pointer group/device ${isActive ? 'ps3d-hover' : ''}`}
                >
                  {/* Floor shadow */}
                  <div
                    className={`absolute -bottom-7 left-8 right-8 h-6 rounded-full blur-xl ${
                      isActive ? 'bg-black/40' : 'bg-black/20'
                    }`}
                  />
                  <PhoneFrame
                    highlighted={isActive}
                    accent={accent.main}
                    className="w-[220px] h-[456px] sm:w-[250px] sm:h-[518px] lg:w-[270px] lg:h-[560px]"
                  >
                    <ScreenImage sources={getScreenshotSources(product, photo.baseName, language)} alt={photo.title} />
                    {/* Side phones: subtle dark tint for depth (no blur) */}
                    {!isActive && <div className="absolute inset-0 bg-[#1C1A18]/35 transition-opacity" />}
                    {isActive && <div className="ps3d-sweep absolute inset-0 pointer-events-none" aria-hidden="true" />}
                    {isActive && (
                      <div className="absolute inset-0 bg-black/0 group-hover/device:bg-black/20 transition-colors flex items-center justify-center">
                        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-xl opacity-0 group-hover/device:opacity-100 transition-opacity">
                          <Maximize2 className="w-5 h-5" style={{ color: accent.main }} />
                        </div>
                      </div>
                    )}
                  </PhoneFrame>
                </div>
              </div>
            );
          })}
        </div>

        {/* Arrows */}
        <button
          type="button"
          onClick={goPrev}
          aria-label="Previous screenshot"
          className="absolute left-1 sm:left-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[#C5A880]/50 text-[#2C2C2C] flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          type="button"
          onClick={goNext}
          aria-label="Next screenshot"
          className="absolute right-1 sm:right-3 top-1/2 -translate-y-1/2 z-30 w-11 h-11 rounded-full bg-white/90 hover:bg-white border border-[#C5A880]/50 text-[#2C2C2C] flex items-center justify-center shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* CAPTION */}
      <div className="w-full max-w-lg mt-4 px-2 flex flex-col items-center text-center space-y-3">
        <div className="min-h-[68px] w-full flex flex-col items-center justify-center overflow-hidden">
          <div key={`${activeIndex}-${language}`} className={direction === 1 ? 'ps3d-cap-r' : 'ps3d-cap-l'}>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span
                className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#2C2C2C] text-[11px] font-bold uppercase tracking-wider"
                style={{ color: accent.soft }}
              >
                <Sparkles className="w-3 h-3" />
                {active.badge}
              </span>
              <h4 className="font-heading font-extrabold text-base sm:text-lg text-[#2C2C2C]">{active.title}</h4>
            </div>
            <p className="text-sm text-[#5C5A56] mt-1.5 leading-relaxed">{active.subtitle}</p>
          </div>
        </div>

        <div className="w-full max-w-xs flex items-center gap-2 pt-1">
          {photos.map((photo, i) => (
            <button
              key={photo.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i, i > activeIndex ? 1 : -1)}
              className="relative flex-1 h-1.5 rounded-full bg-[#C5A880]/30 hover:bg-[#C5A880]/50 overflow-hidden cursor-pointer"
            >
              {i <= activeIndex && <span className="absolute inset-0 rounded-full" style={{ background: accent.main }} />}
            </button>
          ))}
        </div>

        {footer && <div className="pt-2 w-full flex justify-center">{footer}</div>}
      </div>

      {zoomPhoto && (
        <PhoneScreenshotModal
          photo={zoomPhoto}
          allPhotos={photos}
          onClose={() => setZoomPhoto(null)}
          onSelectPhoto={(p) => setZoomPhoto(p)}
        />
      )}

      <style>{`
        .ps3d-glow { animation: ps3dAura 6s ease-in-out infinite; }
        @keyframes ps3dAura { 0%,100% { transform: scale(1); opacity: .75; } 50% { transform: scale(1.15); opacity: 1; } }
        .ps3d-particle { opacity: 0; animation-name: ps3dRise; animation-timing-function: linear; animation-iteration-count: infinite; }
        @keyframes ps3dRise { 0% { transform: translateY(0); opacity: 0; } 20% { opacity: .9; } 80% { opacity: .7; } 100% { transform: translateY(-380px) translateX(20px); opacity: 0; } }
        .ps3d-float { animation: ps3dFloat 4.5s ease-in-out infinite, ps3dPop .5s cubic-bezier(.22,1,.36,1) both; }
        .ps3d-float-rev { animation: ps3dFloatRev 5s ease-in-out infinite, ps3dPop .5s cubic-bezier(.22,1,.36,1) both; }
        @keyframes ps3dFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
        @keyframes ps3dFloatRev { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }
        @keyframes ps3dPop { from { opacity: 0; } to { opacity: 1; } }
        .ps3d-hover { animation: ps3dHover 4.2s ease-in-out infinite; }
        @keyframes ps3dHover { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
        .ps3d-sweep { background: linear-gradient(115deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%); animation: ps3dSweep 4.5s ease-in-out infinite; }
        @keyframes ps3dSweep { 0% { transform: translateX(-130%); } 40%,100% { transform: translateX(130%); } }
        .ps3d-cap-r { animation: ps3dCapR .5s cubic-bezier(.22,1,.36,1) both; }
        .ps3d-cap-l { animation: ps3dCapL .5s cubic-bezier(.22,1,.36,1) both; }
        @keyframes ps3dCapR { from { opacity: 0; transform: translateX(28px); } to { opacity: 1; transform: none; } }
        @keyframes ps3dCapL { from { opacity: 0; transform: translateX(-28px); } to { opacity: 1; transform: none; } }
        .ps3d-bar { width: 0; animation-name: ps3dBar; animation-timing-function: linear; animation-fill-mode: forwards; }
        @keyframes ps3dBar { from { width: 0; } to { width: 100%; } }
        @media (prefers-reduced-motion: reduce) {
          .ps3d-glow, .ps3d-particle, .ps3d-float, .ps3d-float-rev, .ps3d-hover, .ps3d-sweep, .ps3d-cap-r, .ps3d-cap-l { animation: none !important; }
          .ps3d-particle { display: none; }
        }
      `}</style>
    </div>
  );
}
