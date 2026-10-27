import { Check, PhoneIncoming, PhoneOff } from 'lucide-react';
import type { SenearContent, SenearLang } from './senearContent';

/** Screenshot metadata per language (intrinsic size + position of the first "Anna" tile in %). */
const HERO_SCREENS: Record<SenearLang, { src: string; w: number; h: number; tile: [number, number, number, number] }> = {
  hu: { src: '/screenshots/senear/hero-hu.webp', w: 600, h: 1333, tile: [3.9, 9.8, 44.7, 38.5] },
  en: { src: '/screenshots/senear/hero-en.webp', w: 360, h: 757, tile: [5.3, 9.5, 43.6, 38.0] },
  de: { src: '/screenshots/senear/hero-de.webp', w: 357, h: 750, tile: [4.8, 8.4, 43.4, 38.4] },
};

interface CallFilterPhoneProps {
  lang: SenearLang;
  copy: SenearContent['hero'];
}

/**
 * Hero visual: the real SENEAR home screen inside a phone frame, plus a silent
 * 8-second loop that explains the core idea – an unknown number is blocked
 * (it never rings), then Anna's approved call comes through.
 * With prefers-reduced-motion the final state is shown statically (see senear.css).
 */
export function CallFilterPhone({ lang, copy }: CallFilterPhoneProps) {
  const screen = HERO_SCREENS[lang];
  const [l, t, w, h] = screen.tile;

  return (
    <figure className="relative mx-auto w-full max-w-[340px] sm:max-w-[380px] pt-6 pb-8">
      {/* Soft halo */}
      <div
        aria-hidden="true"
        className="absolute inset-x-6 top-10 bottom-10 rounded-full bg-[radial-gradient(circle,rgba(27,122,78,0.18)_0%,rgba(197,168,128,0.12)_45%,transparent_70%)] blur-2xl"
      />

      <div className="sn-float relative mx-auto w-[220px] sm:w-[250px] lg:w-[270px]">
        <div className="rounded-[2.6rem] bg-[#1C1A18] p-[9px] shadow-[0_34px_60px_-22px_rgba(31,36,33,0.55)] ring-1 ring-black/10">
          <div
            className="relative overflow-hidden rounded-[2.05rem] bg-black"
            style={{ aspectRatio: `${screen.w} / ${screen.h}` }}
          >
            <img
              src={screen.src}
              width={screen.w}
              height={screen.h}
              alt={copy.phoneAlt}
              fetchPriority="high"
              decoding="async"
              className="absolute inset-0 h-full w-full select-none"
              draggable={false}
            />
            {/* Pulsing ring on Anna's tile while her call comes through */}
            <span
              aria-hidden="true"
              className="sn-demo-ring absolute rounded-[11%] border-[3px] border-white/90"
              style={{ left: `${l}%`, top: `${t}%`, width: `${w}%`, height: `${h}%` }}
            />
          </div>
        </div>
      </div>

      {/* Chip 1 – unknown number gets blocked */}
      <div
        aria-hidden="true"
        className="sn-demo-a absolute left-0 top-[16%] w-[205px] rounded-2xl bg-white/97 p-3 shadow-[0_14px_34px_-12px_rgba(31,36,33,0.35)] ring-1 ring-black/5"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FDECEC] text-[#B42318]">
            <PhoneOff className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[#1F2421] leading-tight">{copy.demo.unknownTitle}</div>
            <div className="relative inline-block text-[13px] text-[#5C5A56] tabular-nums leading-tight">
              {copy.demo.unknownNumber}
              <span className="sn-demo-strike absolute left-0 right-0 top-1/2 h-[2px] bg-[#B42318]" />
            </div>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-2">
          <span className="sn-demo-blocked inline-flex items-center rounded-md border-2 border-[#B42318] px-2 py-0.5 text-[12px] font-extrabold uppercase tracking-wide text-[#B42318]">
            {copy.demo.blocked}
          </span>
          <span className="text-[12px] font-medium text-[#5C5A56]">{copy.demo.blockedHint}</span>
        </div>
      </div>

      {/* Chip 2 – Anna (approved) comes through */}
      <div
        aria-hidden="true"
        className="sn-demo-b absolute right-0 top-[52%] w-[190px] rounded-2xl bg-white/97 p-3 shadow-[0_14px_34px_-12px_rgba(31,36,33,0.35)] ring-1 ring-black/5"
      >
        <div className="flex items-center gap-2.5">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#EAF5EE] text-[#1B7A4E]">
            <PhoneIncoming className="h-4.5 w-4.5" />
          </span>
          <div className="min-w-0">
            <div className="text-[13px] font-bold text-[#1F2421] leading-tight">{copy.demo.annaTitle}</div>
            <div className="text-[12px] text-[#5C5A56] leading-tight">{copy.demo.annaSub}</div>
          </div>
        </div>
        <span className="sn-demo-allowed mt-2 inline-flex items-center gap-1 rounded-md bg-[#1B7A4E] px-2 py-0.5 text-[12px] font-extrabold uppercase tracking-wide text-white">
          <Check className="h-3.5 w-3.5" strokeWidth={3} />
          {copy.demo.allowed}
        </span>
      </div>

      <figcaption className="relative mt-5 text-center text-[15px] font-semibold text-[#3F3C38]">
        {copy.demoCaption}
      </figcaption>
    </figure>
  );
}
