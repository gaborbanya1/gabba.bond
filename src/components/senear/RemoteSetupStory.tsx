import { useEffect, useRef, useState } from 'react';
import { BatteryMedium, Camera, Check, Grid3X3, MapPin, Phone, Plus, RotateCcw } from 'lucide-react';
import type { SenearContent } from './senearContent';
import { FOCUS_RING, useInViewOnce, usePrefersReducedMotion } from './hooks';

/** 0 = form filled, 1 = saving / travelling, 2 = arrived on the parent's phone */
type Phase = 0 | 1 | 2;

const TILE_COLORS = [
  { bg: '#389E48', fg: '#FFFFFF', icon: '#2E7D32' },
  { bg: '#2185E5', fg: '#FFFFFF', icon: '#1565C0' },
  { bg: '#F7BE16', fg: '#111111', icon: '#E0A800' },
];
const NEW_TILE = { bg: '#9B30B6', fg: '#FFFFFF', icon: '#7B1FA2' };

interface RemoteSetupStoryProps {
  copy: SenearContent['story'];
}

/**
 * "You set it up – they already see it": a scroll-triggered two-phone scene in which a
 * photo call button saved on the family member's phone pops up on the parent's
 * locked SENEAR home screen using real contact portraits.
 */
export function RemoteSetupStory({ copy }: RemoteSetupStoryProps) {
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
      window.setTimeout(() => setPhase(1), 950),
      window.setTimeout(() => setPhase(2), 2150),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [inView, reduced, run]);

  const sceneLabel = `${copy.familyPhoneLabel}: ${copy.formTitle} – ${copy.newTile.name} (${copy.newTile.rel}). ${copy.seniorPhoneLabel}: ${copy.steps[2]}.`;

  return (
    <div ref={ref}>
      <div
        role="img"
        aria-label={sceneLabel}
        className="mx-auto grid max-w-[680px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-5"
      >
        {/* ---------- Family member's phone ---------- */}
        <div className="min-w-0 flex flex-col items-center gap-3" aria-hidden="true">
          <div className="w-full max-w-[245px] rounded-[1.75rem] sm:rounded-[2.1rem] bg-[#1C1A18] p-[5px] sm:p-[6px] shadow-[0_24px_48px_-20px_rgba(31,36,33,0.48)] ring-1 ring-black/10">
            <div className="flex aspect-[9/17.5] flex-col overflow-hidden rounded-[1.4rem] sm:rounded-[1.7rem] bg-[#F6F3EE] p-1.5 sm:p-3.5">
              {/* Senior profile header with real portrait */}
              <div className="flex items-center gap-1.5 sm:gap-2 rounded-xl bg-white/90 p-1 sm:p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04)]">
                <img
                  src={copy.familyAvatar}
                  alt=""
                  width={40}
                  height={40}
                  loading="lazy"
                  decoding="async"
                  className="h-6 w-6 sm:h-9 sm:w-9 shrink-0 rounded-full object-cover ring-2 ring-[#1B7A4E]/35"
                />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-[10px] sm:text-[14px] font-extrabold leading-tight text-[#1F2421]">
                    {copy.familyHeader}
                  </div>
                  <div className="flex items-center gap-1 whitespace-nowrap">
                    <span className="inline-flex items-center gap-0.5 text-[7px] sm:text-[10px] font-semibold text-[#1B7A4E]">
                      <BatteryMedium className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
                      {copy.familyStatus[0]}
                    </span>
                    <span className="text-[7px] sm:text-[10px] text-[#8C857B]">·</span>
                    <span className="inline-flex items-center gap-0.5 text-[7px] sm:text-[10px] font-semibold text-[#4A4744]">
                      <MapPin className="h-2 w-2 sm:h-3 sm:w-3 text-[#1B7A4E]" />
                      {copy.familyStatus[1]}
                    </span>
                  </div>
                </div>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-[#EAF5EE] px-1.5 py-0.5 text-[9px] font-bold text-[#0F4D31]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B7A4E]" />
                  {copy.familyStatus[2]}
                </span>
              </div>

              {/* Contact editor card with real contact photo */}
              <div className="mt-1.5 sm:mt-2 flex flex-1 flex-col justify-between rounded-xl bg-white p-1.5 sm:p-3 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
                <div>
                  <div className="truncate text-[8px] sm:text-[11px] font-extrabold uppercase tracking-wide text-[#7A5A2E]">
                    {copy.formTitle}
                  </div>

                  {/* Photo preview row */}
                  <div className="mt-1 sm:mt-1.5 flex items-center gap-1.5 sm:gap-2 rounded-lg bg-[#F7F1E9] p-1 sm:p-2">
                    <div className="relative shrink-0">
                      <img
                        src={copy.newTile.avatar}
                        alt=""
                        width={48}
                        height={48}
                        loading="lazy"
                        decoding="async"
                        className="h-7 w-7 sm:h-11 sm:w-11 rounded-full object-cover ring-2 ring-[#9B30B6]"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 sm:h-4 sm:w-4 items-center justify-center rounded-full bg-[#9B30B6] text-white">
                        <Camera className="h-1.5 w-1.5 sm:h-2.5 sm:w-2.5" />
                      </span>
                    </div>
                    <div className="min-w-0">
                      <div className="truncate text-[9px] sm:text-[13px] font-extrabold text-[#1F2421]">
                        {copy.nameValue}
                      </div>
                      <div className="truncate text-[7px] sm:text-[10px] font-semibold text-[#1B7A4E]">
                        ✓ {copy.photoLabel}
                      </div>
                    </div>
                  </div>

                  {/* Form fields */}
                  {[
                    [copy.nameLabel, copy.nameValue, false],
                    [copy.relationLabel, copy.relationValue, false],
                    [copy.numberLabel, copy.numberValue, true],
                  ].map(([label, value, hideOnMobile]) => (
                    <div key={String(label)} className={`mt-1 sm:mt-1.5 ${hideOnMobile ? 'hidden sm:block' : ''}`}>
                      <div className="text-[6.5px] sm:text-[9px] font-semibold uppercase tracking-wide text-[#6B675F] leading-none">
                        {label}
                      </div>
                      <div className="mt-0.5 truncate rounded border border-[#E3DCD1] bg-[#FBF9F6] px-1.5 py-0.5 sm:py-1 text-[8.5px] sm:text-[11px] font-semibold text-[#1F2421] leading-tight">
                        {value}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  key={`btn-${run}-${phase}`}
                  className={`mt-1.5 sm:mt-2 flex items-center justify-center gap-1 rounded-md sm:rounded-lg py-1 sm:py-1.5 text-[9px] sm:text-[12px] font-bold text-white transition-colors ${
                    phase === 2 ? 'bg-[#145E3B]' : 'bg-[#1B7A4E]'
                  } ${phase === 1 ? 'sn-press' : ''}`}
                >
                  {phase === 2 && <Check className="h-2.5 w-2.5 sm:h-3 sm:w-3" strokeWidth={3} />}
                  {phase === 1 ? copy.syncing : phase === 2 ? copy.savedBtn : copy.saveBtn}
                </div>
              </div>
            </div>
          </div>
          <span className="text-[13px] sm:text-[15px] font-bold text-[#1F2421]">{copy.familyPhoneLabel}</span>
        </div>

        {/* ---------- Connector ---------- */}
        <div className="relative h-0.5 w-6 sm:w-16 md:w-24 -mt-8" aria-hidden="true">
          <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,#C5A880_0_6px,transparent_6px_11px)]" />
          {phase === 1 && (
            <span
              key={`dot-${run}`}
              className="sn-travel absolute top-1/2 h-3.5 w-3.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B7A4E] shadow-[0_0_0_5px_rgba(27,122,78,0.22)]"
            />
          )}
        </div>

        {/* ---------- Parent's phone (SENEAR locked home screen with real portraits) ---------- */}
        <div className="min-w-0 flex flex-col items-center gap-3" aria-hidden="true">
          <div className="w-full max-w-[245px] rounded-[1.75rem] sm:rounded-[2.1rem] bg-[#1C1A18] p-[5px] sm:p-[6px] shadow-[0_24px_48px_-20px_rgba(31,36,33,0.48)] ring-1 ring-black/10">
            <div className="flex aspect-[9/17.5] flex-col overflow-hidden rounded-[1.4rem] sm:rounded-[1.7rem] bg-black p-1.5 sm:p-2.5">
              {/* Top status bar matching SENEAR Kiosk */}
              <div className="flex items-center justify-between px-0.5 pt-0.5">
                <span className="whitespace-nowrap rounded border border-[#F7BE16]/80 px-1 py-0.5 text-[6.5px] sm:text-[9px] font-bold text-white">
                  Okt. 22.
                </span>
                <span className="text-[13px] sm:text-[21px] font-extrabold leading-none text-white tabular-nums">
                  10:24
                </span>
                <span className="whitespace-nowrap rounded bg-[#1B8A5A] px-1 py-0.5 text-[6.5px] sm:text-[9px] font-extrabold text-white">
                  100%
                </span>
              </div>

              {/* 4 photo call tiles */}
              <div className="mt-1.5 sm:mt-2 grid flex-1 grid-cols-2 gap-1 sm:gap-1.5">
                {copy.tiles.map((tile, i) => (
                  <Tile key={tile.name} name={tile.name} rel={tile.rel} avatar={tile.avatar} color={TILE_COLORS[i]} />
                ))}
                {phase === 2 ? (
                  <div key={`new-${run}`} className="sn-pop h-full">
                    <Tile
                      name={copy.newTile.name}
                      rel={copy.newTile.rel}
                      avatar={copy.newTile.avatar}
                      color={NEW_TILE}
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center gap-1 rounded-lg sm:rounded-xl border-2 border-dashed border-white/30 bg-white/5">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6 text-white/55" />
                  </div>
                )}
              </div>

              {/* Bottom SOS + keypad row matching SENEAR Kiosk */}
              <div className="mt-1 sm:mt-1.5 flex items-center gap-1 sm:gap-1.5">
                <div className="flex-1 rounded-md sm:rounded-lg border border-[#F7BE16] bg-[#D32F2F] py-1 sm:py-1.5 text-center text-[8px] sm:text-[11px] font-extrabold tracking-wide text-white">
                  {copy.sosLabel}
                </div>
                <div className="flex h-5 w-6 sm:h-7 sm:w-8 shrink-0 items-center justify-center rounded-md sm:rounded-lg bg-[#8E7F68] text-white">
                  <Grid3X3 className="h-3 w-3 sm:h-4 sm:w-4" />
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
            <RotateCcw className="h-4 w-4" />
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
}: {
  name: string;
  rel: string;
  avatar: string;
  color: { bg: string; fg: string; icon: string };
}) {
  return (
    <div
      className="flex h-full flex-col items-center justify-between rounded-lg sm:rounded-xl px-1 py-1 sm:py-2 text-center"
      style={{ background: color.bg, color: color.fg }}
    >
      <img
        src={avatar}
        alt=""
        width={64}
        height={64}
        loading="lazy"
        decoding="async"
        className="h-8 w-8 sm:h-12 sm:w-12 rounded-full object-cover shadow-[0_2px_6px_rgba(0,0,0,0.22)]"
      />
      <div className="min-w-0 max-w-full leading-tight">
        <div className="truncate text-[9px] sm:text-[13px] font-extrabold">{name}</div>
        <div className="truncate text-[7px] sm:text-[9px] font-semibold opacity-90">{rel}</div>
      </div>
      <span className="flex h-4 w-4 sm:h-6 sm:w-6 items-center justify-center rounded-full bg-white shadow-sm">
        <Phone className="h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 fill-current" style={{ color: color.icon }} />
      </span>
    </div>
  );
}
