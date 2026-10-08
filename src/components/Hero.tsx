import { ArrowRight, Sparkles, Smartphone, ShieldCheck, CheckCircle2, Lock, Radio } from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';

interface HeroProps {
  onViewProjects: () => void;
  onGetInTouch: () => void;
  onOpenNogondDemo: () => void;
}

export function Hero({
  onViewProjects,
  onGetInTouch,
  onOpenNogondDemo,
}: HeroProps) {
  const { t } = useLanguage();

  return (
    <section className="relative overflow-hidden pt-12 pb-16 sm:pt-20 sm:pb-24 lg:pt-24 lg:pb-32 bg-gradient-to-b from-[#FAFAFA] via-[#F8F5F1] to-[#F5F0EB] border-b border-[#C5A880]/20">
      {/* Subtle luxury geometric grid background pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `radial-gradient(#2C2C2C 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
        }}
      />

      {/* Decorative soft gold gradient glow in top corners */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-[#C5A880]/15 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -left-48 w-80 h-80 rounded-full bg-[#D4AF37]/10 blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Brand name "gabba", tagline, CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left space-y-7">
            {/* Main Brand Title */}
            <div className="space-y-4">
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#2C2C2C] leading-[1.12]">
                {t.hero.titlePrefix}{' '}
                <span className="relative inline-block text-[#2C2C2C]">
                  <span className="relative z-10">{t.hero.titleHighlight}</span>
                  <span className="absolute bottom-1.5 left-0 w-full h-3 bg-[#C5A880]/25 -z-10 rounded-xs" />
                </span>
              </h1>
            </div>

            {/* Action Buttons: Gold / Dark Contrast */}
            <div className="pt-2 flex flex-wrap items-center gap-4 w-full sm:w-auto">
              {/* Primary CTA: View Projects & Solutions */}
              <button
                onClick={onViewProjects}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-6 py-3.5 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] font-medium hover:bg-[#1A1A1A] active:scale-98 shadow-sm hover:shadow-md transition-all group border border-[#2C2C2C] cursor-pointer"
              >
                <span>{t.hero.viewProjects}</span>
                <ArrowRight className="w-4 h-4 text-[#C5A880] group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA: Get in Touch */}
              <button
                onClick={onGetInTouch}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFFFFF] text-[#2C2C2C] font-medium hover:bg-[#F5F0EB] active:scale-98 border border-[#C5A880]/50 hover:border-[#C5A880] shadow-xs transition-all cursor-pointer"
              >
                <span>{t.hero.getInTouch}</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
              </button>
            </div>

            {/* Trust / Core Pillars */}
            <div className="pt-4 grid grid-cols-1 sm:grid-cols-3 gap-3 w-full border-t border-[#C5A880]/20">
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A4744]">
                <CheckCircle2 className="w-4 h-4 text-[#A38053] shrink-0" />
                <span>{t.hero.zeroConfusion}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A4744]">
                <CheckCircle2 className="w-4 h-4 text-[#A38053] shrink-0" />
                <span>{t.hero.deviceOwner}</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-medium text-[#4A4744]">
                <CheckCircle2 className="w-4 h-4 text-[#A38053] shrink-0" />
                <span>{t.hero.offlineFirst}</span>
              </div>
            </div>

          </div>

          {/* Right Column: Architectural Showcase Card */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none space-y-4">
              
              {/* Main Architectural Card */}
              <div className="bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/40 shadow-sm p-6 sm:p-7 space-y-5">
                
                {/* Header */}
                <div className="flex items-center justify-between pb-3.5 border-b border-[#F0EAE1]">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-[#F5F0EB] border border-[#C5A880]/40 flex items-center justify-center">
                      <ShieldCheck className="w-5 h-5 text-[#A38053]" />
                    </div>
                    <div>
                      <h2 className="text-sm font-semibold font-heading text-[#2C2C2C]">{t.hero.flagshipBadge}</h2>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 text-[11px] font-semibold rounded-md bg-[#F5F0EB] text-[#8C7355] border border-[#C5A880]/30">
                    {t.hero.liveVerified}
                  </span>
                </div>

                {/* Flagship Card */}
                <div className="p-4.5 rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] border border-[#C5A880]/50 space-y-3 transition-all hover:border-[#C5A880]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Smartphone className="w-4 h-4 text-[#A38053]" />
                      <span className="text-xs font-bold uppercase tracking-wider text-[#A38053]">{t.hero.flagshipTag}</span>
                    </div>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#FFFFFF] border border-[#C5A880]/40 text-[#2C2C2C]">
                      {t.hero.dualTarget}
                    </span>
                  </div>
                  <h3 className="font-heading font-semibold text-lg text-[#2C2C2C]">
                    {t.hero.nearTitle}
                  </h3>
                  <p className="text-xs text-[#5C5A56] leading-relaxed">
                    {t.hero.nearDesc}
                  </p>
                  <button
                    onClick={onOpenNogondDemo}
                    className="w-full mt-1 py-2.5 px-3 rounded-lg bg-[#FFFFFF] hover:bg-[#F5F0EB] text-[#2C2C2C] text-xs font-semibold border border-[#C5A880]/50 flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{t.hero.trySimulator}</span>
                  </button>
                </div>

                {/* Kiosk Architecture Highlights */}
                <div className="grid grid-cols-2 gap-2.5">
                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E8DFD3] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2C]">
                      <Lock className="w-3.5 h-3.5 text-[#A38053]" />
                      <span>{t.hero.dpcLockdownTitle}</span>
                    </div>
                    <p className="text-[10px] text-[#6E6B65]">{t.hero.dpcLockdownDesc}</p>
                  </div>

                  <div className="p-3 rounded-xl bg-[#FAFAFA] border border-[#E8DFD3] space-y-1">
                    <div className="flex items-center gap-1.5 text-xs font-semibold text-[#2C2C2C]">
                      <Radio className="w-3.5 h-3.5 text-[#A38053]" />
                      <span>{t.hero.tactileCardsTitle}</span>
                    </div>
                    <p className="text-[10px] text-[#6E6B65]">{t.hero.tactileCardsDesc}</p>
                  </div>
                </div>

              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
