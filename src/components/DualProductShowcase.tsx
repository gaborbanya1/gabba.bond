import { useEffect, useMemo, useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PhoneFrame, ScreenImage } from './PhoneFrame';
import { PRODUCT_ACCENT } from './ProductShowcase3D';
import { getProductPhotos, getScreenshotSources } from '../data/productPhotos';
import { ProductKey } from '../routing';

const CYCLE_MS = 3600;

interface DualProductShowcaseProps {
  onOpenProduct: (product: ProductKey) => void;
}

/**
 * Home hero visual: SENEAR and JUNEAR phones floating side by side.
 * Each phone softly cross-fades through its own screenshots. Sharp, native-scale rendering.
 */
export function DualProductShowcase({ onOpenProduct }: DualProductShowcaseProps) {
  const { language, t } = useLanguage();
  const [tick, setTick] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => setTick((v) => v + 1), CYCLE_MS);
    return () => window.clearInterval(id);
  }, [paused]);

  const items: { key: ProductKey; label: string; offsetClass: string; floatClass: string }[] = [
    { key: 'senear', label: t.nearSection.appSeniorLabel, offsetClass: 'sm:-translate-y-6', floatClass: 'dps-float-a' },
    { key: 'junear', label: t.nearSection.appJuniorLabel, offsetClass: 'sm:translate-y-8', floatClass: 'dps-float-b' },
  ];

  return (
    <div
      className="relative w-full flex items-center justify-center py-6"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Dual ambient aura: gold (SENEAR) + teal (JUNEAR) */}
      <div
        className="dps-aura absolute left-[8%] top-[10%] w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
        style={{ background: `radial-gradient(circle, rgba(${PRODUCT_ACCENT.senear.glow},0.28) 0%, transparent 68%)` }}
        aria-hidden="true"
      />
      <div
        className="dps-aura absolute right-[6%] bottom-[4%] w-72 h-72 sm:w-96 sm:h-96 rounded-full pointer-events-none"
        style={{
          background: `radial-gradient(circle, rgba(${PRODUCT_ACCENT.junear.glow},0.24) 0%, transparent 68%)`,
          animationDelay: '-3s',
        }}
        aria-hidden="true"
      />

      <div className="relative flex items-start justify-center gap-5 sm:gap-10">
        {items.map((item, idx) => (
          <ProductPhone
            key={item.key}
            product={item.key}
            label={item.label}
            activeIndex={(tick + idx * 2) % 4}
            language={language}
            className={`${item.offsetClass}`}
            floatClass={item.floatClass}
            onOpen={() => onOpenProduct(item.key)}
          />
        ))}
      </div>

      <style>{`
        .dps-aura { animation: dpsAura 6s ease-in-out infinite; }
        @keyframes dpsAura { 0%,100% { transform: scale(1); opacity: .8; } 50% { transform: scale(1.12); opacity: 1; } }
        .dps-float-a { animation: dpsFloat 5s ease-in-out infinite; }
        .dps-float-b { animation: dpsFloat 5.6s ease-in-out infinite; animation-delay: -2.4s; }
        @keyframes dpsFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
        @media (prefers-reduced-motion: reduce) { .dps-aura, .dps-float-a, .dps-float-b { animation: none !important; } }
      `}</style>
    </div>
  );
}

function ProductPhone({
  product,
  label,
  activeIndex,
  language,
  className,
  floatClass,
  onOpen,
}: {
  product: ProductKey;
  label: string;
  activeIndex: number;
  language: string;
  className: string;
  floatClass: string;
  onOpen: () => void;
}) {
  const { t } = useLanguage();
  const photos = useMemo(() => getProductPhotos(product, t), [product, t]);
  const accent = PRODUCT_ACCENT[product];
  const name = product.toUpperCase();

  return (
    <button
      type="button"
      onClick={onOpen}
      className={`group flex flex-col items-center gap-4 cursor-pointer focus:outline-none ${className}`}
      aria-label={name}
    >
      <div className={floatClass}>
        <div className="relative">
          <div className="absolute -bottom-6 left-6 right-6 h-6 rounded-full bg-black/35 blur-xl" />
          <PhoneFrame
            highlighted
            accent={accent.main}
            className="w-[150px] h-[310px] sm:w-[200px] sm:h-[414px] lg:w-[215px] lg:h-[446px] transition-transform duration-300 group-hover:-translate-y-1"
          >
            {photos.map((p, i) => (
              <div
                key={p.id}
                className="absolute inset-0 transition-opacity duration-[900ms] ease-in-out"
                style={{ opacity: i === activeIndex || i === 0 ? 1 : 0 }}
              >
                <ScreenImage sources={getScreenshotSources(product, p.baseName, language)} alt={p.title} />
              </div>
            ))}
          </PhoneFrame>
        </div>
      </div>

      <div
        className="flex items-center gap-2.5 bg-white/95 pl-2 pr-3.5 py-1.5 rounded-2xl border shadow-md transition-all group-hover:shadow-lg"
        style={{ borderColor: `${accent.main}99` }}
      >
        <img src={`/logos/${product}-logo.png`} alt="" className="w-8 h-8 object-contain" />
        <div className="text-left leading-tight">
          <div className="font-heading font-extrabold text-sm text-[#2C2C2C] tracking-tight">{name}</div>
          <div className="text-[11px] font-semibold text-[#8C7355]">{label}</div>
        </div>
        <ArrowRight className="w-4 h-4 ml-1 transition-transform group-hover:translate-x-1" style={{ color: accent.main }} />
      </div>
    </button>
  );
}
