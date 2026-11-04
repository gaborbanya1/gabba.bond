import { useEffect, useRef, useState } from 'react';
import { Grid3X3, Phone, RotateCcw, User } from 'lucide-react';
import type { SenearContent, SenearLang } from './senearContent';
import { FOCUS_RING, useInViewOnce, usePrefersReducedMotion } from './hooks';

/** 0 = admin 4-tile view, 1 = syncing across phones, 2 = photo & name arrived on purple tile */
type Phase = 0 | 1 | 2;

const TILE_COLORS = [
  { bg: '#43A84E', fg: '#FFFFFF', icon: '#43A84E' },
  { bg: '#1D88E5', fg: '#FFFFFF', icon: '#1D88E5' },
  { bg: '#F9BD14', fg: '#000000', icon: '#F9BD14' },
];
const NEW_TILE = { bg: '#9930B3', fg: '#FFFFFF', icon: '#9930B3' };

/** Real Caregiver Admin "Manage Contacts" screenshots extracted from the HU/EN/DE setup videos, plus 4th purple tile rect (%). */
const SETUP_SCREENS: Record<SenearLang, { src: string; w: number; h: number; tile: [number, number, number, number] }> = {
  hu: { src: '/screenshots/senear/setup-admin-hu.webp', w: 303, h: 662, tile: [51.8, 68.1, 38.9, 18.0] },
  en: { src: '/screenshots/senear/setup-admin-en.webp', w: 301, h: 657, tile: [51.8, 65.2, 38.9, 18.0] },
  de: { src: '/screenshots/senear/setup-admin-de.webp', w: 302, h: 657, tile: [52.0, 67.9, 38.7, 18.0] },
};

interface RemoteSetupStoryProps {
  copy: SenearContent['story'];
  lang: SenearLang;
}

/**
 * "You set it up – they already see it": a scroll-triggered two-phone scene showing the real
 * SENEAR Caregiver Admin "Manage Contacts" 4-tile screen on the left, while the photo and name
 * sync onto the already-present 4th purple tile on the parent's locked SENEAR home screen.
 */
export function RemoteSetupStory({ copy, lang }: RemoteSetupStoryProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.4);
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>(0);
  const [run, setRun] = useState(0);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    if (!inView) return;
    timers.current.forEach(clearTimeout);
    if (reduced) {
      setPhase(2);
      return;
    }
    setPhase(0);
    timers.current = [
      window.setTimeout(() => setPhase(1), 1400),
      window.setTimeout(() => setPhase(2), 2700),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [inView, reduced, run]);

  const screen = SETUP_SCREENS[lang];
  const [tl, tt, tw, th] = screen.tile;
  const dateBadge = lang === 'de' ? '22. Okt.' : lang === 'en' ? 'Oct 22' : 'Okt. 22.';
  const sceneLabel = `${copy.familyPhoneLabel}: ${copy.newTile.name} (${copy.newTile.rel}). ${copy.seniorPhoneLabel}: ${copy.steps[2]}.`;

  return (
    <div ref={ref}>
      <div
        role="img"
        aria-label={sceneLabel}
        className="mx-auto grid max-w-[700px] grid-cols-1 min-[380px]:grid-cols-[1fr_auto_1fr] items-center gap-3 min-[380px]:gap-2 sm:gap-5"
      >
        {/* ---------- Family member's phone (real Caregiver Admin 4-tile screen from video) ---------- */}
        <div className="min-w-0 flex flex-col items-center gap-2.5 min-[380px]:gap-3" aria-hidden="true">
          <div className="w-full max-w-[240px] min-[380px]:max-w-[255px] rounded-[2rem] min-[380px]:rounded-[1.85rem] sm:rounded-[2.4rem] bg-[#1C1A18] p-[6px] min-[380px]:p-[5px] sm:p-[8px] shadow-[0_28px_54px_-20px_rgba(31,36,33,0.52)] ring-1 ring-black/10">
            <div className="relative aspect-[9/19.5] overflow-hidden rounded-[1.6rem] min-[380px]:rounded-[1.5rem] sm:rounded-[1.9rem] bg-[#FAFAFA] pt-1.5 px-0.5">
              <img
                src={screen.src}
                alt=""
                width={screen.w}
                height={screen.h}
                loading="lazy"
                decoding="async"
                draggable={false}
                className="h-full w-full object-cover object-top select-none"
              />
              {/* Subtle highlight ring on the 4th purple tile while selecting / syncing */}
              <span
                className={`pointer-events-none absolute rounded-[11px] sm:rounded-[13px] border-[2.5px] border-white transition-all duration-500 ${
                  phase < 2
                    ? 'opacity-100 shadow-[0_0_0_3px_rgba(153,48,179,0.65),0_8px_18px_-4px_rgba(153,48,179,0.45)]'
                    : 'opacity-0 shadow-none'
                }`}
                style={{ left: `${tl}%`, top: `${tt}%`, width: `${tw}%`, height: `${th}%` }}
              />
            </div>
          </div>
          <span className="text-[13px] sm:text-[15px] font-bold text-[#1F2421]">{copy.familyPhoneLabel}</span>
        </div>

        {/* ---------- Connector (vertical below 380px, horizontal at >=380px) ---------- */}
        <div
          className="relative mx-auto h-6 w-0.5 min-[380px]:mx-0 min-[380px]:h-0.5 min-[380px]:w-6 sm:w-16 md:w-20 min-[380px]:-mt-8"
          aria-hidden="true"
        >
          <div className="absolute inset-0 bg-[repeating-linear-gradient(180deg,#C5A880_0_5px,transparent_5px_9px)] min-[380px]:bg-[repeating-linear-gradient(90deg,#C5A880_0_6px,transparent_6px_11px)]" />
          {phase === 1 && (
            <span
              key={`dot-${run}`}
              className="hidden min-[380px]:block sn-travel absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B7A4E] shadow-[0_0_0_5px_rgba(27,122,78,0.22)]"
            />
          )}
        </div>

        {/* ---------- Parent's phone (SENEAR locked home screen; purple 4th tile already present) ---------- */}
        <div className="min-w-0 flex flex-col items-center gap-2.5 min-[380px]:gap-3" aria-hidden="true">
          <div className="w-full max-w-[240px] min-[380px]:max-w-[255px] rounded-[2rem] min-[380px]:rounded-[1.85rem] sm:rounded-[2.4rem] bg-[#1C1A18] p-[6px] min-[380px]:p-[5px] sm:p-[8px] shadow-[0_28px_54px_-20px_rgba(31,36,33,0.52)] ring-1 ring-black/10">
            <div className="flex aspect-[9/19.5] flex-col overflow-hidden rounded-[1.6rem] min-[380px]:rounded-[1.5rem] sm:rounded-[1.9rem] bg-black px-1.5 pt-1.5 pb-1.5 min-[380px]:px-1 min-[380px]:pt-1 min-[380px]:pb-1 sm:px-1.5 sm:pt-1.5 sm:pb-1.5">
              {/* Top status bar matching SENEAR Hero phone */}
              <div className="flex items-center justify-between px-0.5">
                <span className="whitespace-nowrap rounded-[5px] sm:rounded-[6px] border-[1.5px] border-[#D5C3AA] px-1.5 min-[380px]:px-1 sm:px-1.5 py-0.5 text-[9.5px] min-[380px]:text-[8px] sm:text-[11.5px] font-bold leading-none text-white">
                  {dateBadge}
                </span>
                <span className="text-[22px] min-[380px]:text-[18px] sm:text-[30px] font-extrabold leading-none tracking-tight text-white tabular-nums">
                  10:24
                </span>
                <span className="whitespace-nowrap rounded-[5px] sm:rounded-[6px] bg-[#198754] px-1.5 min-[380px]:px-1 sm:px-1.5 py-0.5 text-[9.5px] min-[380px]:text-[8px] sm:text-[11.5px] font-extrabold leading-none text-white">
                  100%
                </span>
              </div>

              {/* 4 photo call tiles: purple 4th tile is always present; photo + name pop in at phase === 2 */}
              <div className="mt-1.5 min-[380px]:mt-1 sm:mt-1.5 grid flex-1 grid-cols-2 grid-rows-2 gap-1.5 min-[380px]:gap-1 sm:gap-1.5">
                {copy.tiles.map((tile, i) => (
                  <Tile key={tile.name} name={tile.name} rel={tile.rel} avatar={tile.avatar} color={TILE_COLORS[i]} populated />
                ))}
                <Tile
                  name={copy.newTile.name}
                  rel={copy.newTile.rel}
                  avatar={copy.newTile.avatar}
                  color={NEW_TILE}
                  populated={phase === 2}
                  popKey={`pop-${run}`}
                />
              </div>

              {/* Bottom SOS + keypad row matching SENEAR Hero phone */}
              <div className="mt-1.5 min-[380px]:mt-1 sm:mt-1.5 flex items-stretch gap-1.5 min-[380px]:gap-1 sm:gap-1.5">
                <div className="flex flex-1 items-center justify-center rounded-[10px] min-[380px]:rounded-[8px] sm:rounded-[12px] border-[1.5px] sm:border-2 border-[#D5C3AA] bg-[#CD2E2E] py-1.5 min-[380px]:py-1 sm:py-2 text-center text-[11.5px] min-[380px]:text-[10px] sm:text-[14px] font-extrabold tracking-wide text-white">
                  {copy.sosLabel}
                </div>
                <div className="flex w-[23%] shrink-0 items-center justify-center rounded-[10px] min-[380px]:rounded-[8px] sm:rounded-[12px] bg-[#8E7F68] text-white">
                  <Grid3X3 className="h-4 w-4 min-[380px]:h-3.5 min-[380px]:w-3.5 sm:h-5 sm:w-5" aria-hidden="true" focusable="false" />
                </div>
              </div>
            </div>
          </div>
          <span className="text-[13px] sm:text-[15px] font-bold text-[#1F2421]">{copy.seniorPhoneLabel}</span>
        </div>
      </div>

      {/* Compact live status indicator + replay button */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#4A4744]">
        <span className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1.5 font-semibold text-[#1F2421] ring-1 ring-[#E8DFD4]">
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1B7A4E] text-xs font-black text-white">
            {phase + 1}
          </span>
          <span>{copy.steps[phase]}</span>
        </span>
        <span>{copy.note}</span>
        {!reduced && (
          <button
            type="button"
            onClick={() => setRun((r) => r + 1)}
            className={`inline-flex min-h-11 items-center gap-1.5 rounded-full px-3 font-semibold text-[#1B7A4E] hover:bg-[#EAF5EE] cursor-pointer ${FOCUS_RING}`}
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" focusable="false" />
            {copy.replay}
          </button>
        )}
      </div>
    </div>
  );
}

function Tile({
  name,
  rel,
  avatar,
  color,
  populated = true,
  popKey,
}: {
  name: string;
  rel: string;
  avatar: string;
  color: { bg: string; fg: string; icon: string };
  populated?: boolean;
  popKey?: string;
}) {
  return (
    <div
      className="flex h-full w-full flex-col items-center justify-between rounded-[12px] min-[380px]:rounded-[11px] sm:rounded-[15px] px-0.5 pt-1.5 pb-1.5 sm:pt-2 sm:pb-2 text-center"
      style={{ background: color.bg, color: color.fg }}
    >
      {/* Avatar slot: empty silhouette circle before sync, real portrait pops in when populated */}
      <div className="relative flex w-[74%] min-[380px]:w-[76%] aspect-square shrink-0 items-center justify-center rounded-full bg-white/22">
        {populated ? (
          <img
            key={popKey ? `${popKey}-img` : undefined}
            src={avatar}
            alt=""
            width={120}
            height={120}
            loading="lazy"
            decoding="async"
            className={`h-full w-full rounded-full object-cover ${popKey ? 'sn-pop' : ''}`}
          />
        ) : (
          <User className="h-[52%] w-[52%] text-white/85" strokeWidth={2.2} aria-hidden="true" focusable="false" />
        )}
      </div>

      {/* Name + relation slot: empty placeholder before sync, pops in when populated */}
      <div className="min-w-0 w-full px-0.5 leading-none">
        {populated ? (
          <div key={popKey ? `${popKey}-txt` : undefined} className={popKey ? 'sn-pop' : ''}>
            <div className="truncate text-[16px] min-[380px]:text-[14px] sm:text-[22px] font-extrabold leading-none tracking-tight">
              {name}
            </div>
            <div className="mt-0.5 truncate text-[11px] min-[380px]:text-[10px] sm:text-[14.5px] font-normal leading-tight opacity-95">
              {rel}
            </div>
          </div>
        ) : (
          <div className="select-none opacity-45">
            <div className="mx-auto h-[16px] min-[380px]:h-[14px] sm:h-[22px] flex items-center justify-center text-[14px] sm:text-[18px] font-bold leading-none">
              —
            </div>
            <div className="mt-0.5 h-[13px] min-[380px]:h-[12px] sm:h-[18px]" />
          </div>
        )}
      </div>

      <span className="flex w-[46%] min-[380px]:w-[48%] aspect-square shrink-0 items-center justify-center rounded-full bg-white">
        <Phone className="h-[52%] w-[52%] fill-current" style={{ color: color.icon }} aria-hidden="true" focusable="false" />
      </span>
    </div>
  );
}
