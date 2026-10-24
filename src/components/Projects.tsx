import { ArrowRight, Check, HeartHandshake, ShieldCheck } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { PhoneFrame, ScreenImage } from './PhoneFrame';
import { PRODUCT_ACCENT } from './ProductShowcase3D';
import { getScreenshotSources } from '../data/productPhotos';
import { ProductKey } from '../routing';

interface ProjectsProps {
  onOpenProduct: (product: ProductKey) => void;
}

const DETAILS_LABEL: Record<string, string> = {
  hu: 'Részletek megtekintése',
  en: 'Explore the details',
  de: 'Details ansehen',
};

/**
 * Home page "NEAR ecosystem" section: two compact, simplified product tiles.
 * Each tile only teases the product and links to its dedicated subpage (/senear, /junear).
 */
export function Projects({ onOpenProduct }: ProjectsProps) {
  const { language, t } = useLanguage();
  const detailsLabel = DETAILS_LABEL[language] || DETAILS_LABEL.en;

  const tiles: {
    key: ProductKey;
    label: string;
    pill: string;
    pillIcon: typeof HeartHandshake;
    description: string;
    bullets: string[];
  }[] = [
    {
      key: 'senear',
      label: t.nearSection.appSeniorLabel,
      pill: t.senear.tagPill,
      pillIcon: HeartHandshake,
      description: t.senear.description,
      bullets: [t.senear.feature1Title, t.senear.feature2Title, t.senear.feature3Title],
    },
    {
      key: 'junear',
      label: t.nearSection.appJuniorLabel,
      pill: t.junear.tagPill,
      pillIcon: ShieldCheck,
      description: t.junear.description,
      bullets: [t.junear.feature1Title, t.junear.feature2Title, t.junear.feature3Title],
    },
  ];

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F5F0EB]/50 border-b border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-14 space-y-5">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            {t.nearSection.title}
          </h2>
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C5A880]/40 text-xs sm:text-sm font-bold text-[#8C7355] uppercase tracking-wider shadow-2xs">
              {t.nearSection.subtitlePill}
            </span>
          </div>
          <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed">
            {t.nearSection.description}
            <span className="block mt-3 text-sm sm:text-base font-medium text-[#8C7355] italic">
              {t.nearSection.quote}
            </span>
          </p>
        </div>

        {/* Two simplified product tiles */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {tiles.map((tile) => {
            const accent = PRODUCT_ACCENT[tile.key];
            const name = tile.key.toUpperCase();
            return (
              <div
                key={tile.key}
                role="link"
                tabIndex={0}
                onClick={() => onOpenProduct(tile.key)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onOpenProduct(tile.key);
                  }
                }}
                className="group relative overflow-hidden rounded-3xl border-2 bg-gradient-to-br from-white via-[#FAF7F2] to-[#F5EFE6] p-7 sm:p-9 shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 cursor-pointer min-h-[420px] flex"
                style={{ borderColor: accent.main }}
              >
                {/* Accent glow */}
                <div
                  className="absolute -right-24 -bottom-24 w-80 h-80 rounded-full pointer-events-none opacity-70 group-hover:opacity-100 transition-opacity"
                  style={{ background: `radial-gradient(circle, rgba(${accent.glow},0.25) 0%, transparent 70%)` }}
                />

                {/* Text content */}
                <div className="relative z-10 flex flex-col w-full sm:w-[62%] space-y-5">
                  <div className="flex items-center gap-3">
                    <img src={`/logos/${tile.key}-logo.png`} alt={`${name} logo`} className="w-14 h-14 object-contain" />
                    <div>
                      <div className="font-heading text-2xl sm:text-3xl font-extrabold text-[#2C2C2C] tracking-tight leading-none">
                        {name}
                      </div>
                      <div className="text-sm font-semibold text-[#8C7355] mt-1">{tile.label}</div>
                    </div>
                  </div>

                  <span className="self-start inline-flex items-center gap-2 text-xs font-semibold text-[#5C5A56] bg-white/90 px-3 py-1.5 rounded-full border border-[#C5A880]/30">
                    <tile.pillIcon className="w-3.5 h-3.5" style={{ color: accent.main }} />
                    {tile.pill}
                  </span>

                  <p className="text-sm sm:text-base text-[#5C5A56] leading-relaxed line-clamp-3">{tile.description}</p>

                  <ul className="space-y-2">
                    {tile.bullets.map((b) => (
                      <li key={b} className="flex items-center gap-2.5 text-sm font-semibold text-[#2C2C2C]">
                        <span
                          className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-white"
                          style={{ background: accent.main }}
                        >
                          <Check className="w-3 h-3" strokeWidth={3} />
                        </span>
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="pt-2 mt-auto">
                    <span className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#2C2C2C] text-white text-sm font-semibold shadow-sm group-hover:bg-black transition-colors">
                      {detailsLabel}
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" style={{ color: accent.soft }} />
                    </span>
                  </div>
                </div>

                {/* Peeking phone preview */}
                <div className="hidden sm:block absolute right-6 -bottom-16 z-0 transition-transform duration-500 group-hover:-translate-y-3">
                  <PhoneFrame highlighted accent={accent.main} className="w-[180px] h-[372px]">
                    <ScreenImage sources={getScreenshotSources(tile.key, `${tile.key}-1`, language)} alt={name} />
                  </PhoneFrame>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
