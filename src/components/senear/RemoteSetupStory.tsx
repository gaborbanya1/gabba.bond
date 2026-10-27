import { useEffect, useRef, useState } from 'react';
import { BatteryMedium, Check, MapPin, Phone, Plus, RotateCcw } from 'lucide-react';
import type { SenearContent } from './senearContent';
import { FOCUS_RING, useInViewOnce, usePrefersReducedMotion } from './hooks';

/** 0 = form filled, 1 = saving / travelling, 2 = arrived on the parent's phone */
type Phase = 0 | 1 | 2;

const TILE_COLORS = [
  { bg: '#2E7D32', fg: '#FFFFFF' },
  { bg: '#1565C0', fg: '#FFFFFF' },
  { bg: '#F2B705', fg: '#1F2421' },
];
const NEW_TILE = { bg: '#7B1FA2', fg: '#FFFFFF' };

interface RemoteSetupStoryProps {
  copy: SenearContent['story'];
}

/**
 * "You set it up – they already see it": a small, scroll-triggered scene in which a
 * new call button saved on the family member's phone pops up on the parent's
 * home screen. Pure CSS/React, no media files.
 */
export function RemoteSetupStory({ copy }: RemoteSetupStoryProps) {
  const [ref, inView] = useInViewOnce<HTMLDivElement>(0.45);
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
      window.setTimeout(() => setPhase(1), 900),
      window.setTimeout(() => setPhase(2), 2100),
    ];
    return () => timers.current.forEach(clearTimeout);
  }, [inView, reduced, run]);

  const sceneLabel = `${copy.familyPhoneLabel}: ${copy.formTitle} – ${copy.newTile.name} (${copy.newTile.rel}). ${copy.seniorPhoneLabel}: ${copy.steps[2]}.`;

  return (
    <div ref={ref}>
      <div
        role="img"
        aria-label={sceneLabel}
        className="mx-auto grid max-w-[640px] grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-4"
      >
        {/* ---------- Family member's phone ---------- */}
        <div className="flex flex-col items-center gap-3" aria-hidden="true">
          <div className="w-full max-w-[230px] rounded-[2rem] bg-[#1C1A18] p-[6px] shadow-[0_24px_44px_-20px_rgba(31,36,33,0.45)]">
            <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.6rem] bg-[#F6F3EE] p-2.5 sm:p-3.5">
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-[#1B7A4E] text-[11px] sm:text-sm font-bold text-white">
                  {copy.familyHeader.charAt(0)}
                </span>
                <span className="text-[12px] sm:text-[15px] font-bold text-[#1F2421]">{copy.familyHeader}</span>
              </div>
              <div className="mt-2 flex flex-wrap gap-1">
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold text-[#1F2421]">
                  <BatteryMedium className="h-3 w-3 text-[#1B7A4E]" />
                  {copy.familyStatus[0]}
                </span>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-white px-1.5 py-0.5 text-[9px] sm:text-[11px] font-semibold text-[#1F2421]">
                  <MapPin className="h-3 w-3 text-[#1B7A4E]" />
                  {copy.familyStatus[1]}
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 rounded-full bg-white px-1.5 py-0.5 text-[11px] font-semibold text-[#1F2421]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#1B7A4E]" />
                  {copy.familyStatus[2]}
                </span>
              </div>

              <div className="mt-2.5 flex-1 rounded-xl bg-white p-2 sm:p-3 shadow-[0_1px_0_rgba(0,0,0,0.04)]">
                <div className="text-[10px] sm:text-[13px] font-bold text-[#1F2421]">{copy.formTitle}</div>
                {[
                  [copy.nameLabel, copy.nameValue],
                  [copy.relationLabel, copy.relationValue],
                  [copy.numberLabel, copy.numberValue],
                ].map(([label, value]) => (
                  <div key={label} className="mt-1.5 sm:mt-2">
                    <div className="text-[8px] sm:text-[10px] font-semibold uppercase tracking-wide text-[#6B675F]">{label}</div>
                    <div className="mt-0.5 truncate rounded-md border border-[#E3DCD1] bg-[#FBF9F6] px-1.5 py-1 text-[10px] sm:text-[12px] font-semibold text-[#1F2421]">
                      {value}
                    </div>
                  </div>
                ))}
                <div
                  key={`btn-${run}-${phase}`}
                  className={`mt-2.5 flex items-center justify-center gap-1 rounded-lg py-1.5 text-[10px] sm:text-[12px] font-bold text-white transition-colors ${
                    phase === 2 ? 'bg-[#145E3B]' : 'bg-[#1B7A4E]'
                  } ${phase === 1 ? 'sn-press' : ''}`}
                >
                  {phase === 2 && <Check className="h-3 w-3" strokeWidth={3} />}
                  {phase === 1 ? copy.syncing : copy.saveBtn}
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
              className="sn-travel absolute top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#1B7A4E] shadow-[0_0_0_4px_rgba(27,122,78,0.2)]"
            />
          )}
        </div>

        {/* ---------- Parent's phone ---------- */}
        <div className="flex flex-col items-center gap-3" aria-hidden="true">
          <div className="w-full max-w-[230px] rounded-[2rem] bg-[#1C1A18] p-[6px] shadow-[0_24px_44px_-20px_rgba(31,36,33,0.45)]">
            <div className="flex aspect-[9/17] flex-col overflow-hidden rounded-[1.6rem] bg-black p-1.5 sm:p-2.5">
              <div className="text-center text-[17px] sm:text-[26px] font-extrabold leading-none text-white tabular-nums pt-1">10:24</div>
              <div className="mt-1.5 sm:mt-2.5 grid flex-1 grid-cols-2 gap-1 sm:gap-1.5">
                {copy.tiles.map((tile, i) => (
                  <Tile key={tile.name} name={tile.name} rel={tile.rel} color={TILE_COLORS[i]} />
                ))}
                {phase === 2 ? (
                  <div key={`new-${run}`} className="sn-pop">
                    <Tile name={copy.newTile.name} rel={copy.newTile.rel} color={NEW_TILE} />
                  </div>
                ) : (
                  <div className="flex items-center justify-center rounded-lg sm:rounded-xl border-2 border-dashed border-white/30">
                    <Plus className="h-4 w-4 sm:h-6 sm:w-6 text-white/50" />
                  </div>
                )}
              </div>
              <div className="mt-1 sm:mt-1.5 rounded-md sm:rounded-lg bg-[#D32F2F] py-1 sm:py-1.5 text-center text-[9px] sm:text-[12px] font-extrabold text-white">
                SOS
              </div>
            </div>
          </div>
          <span className="text-[13px] sm:text-[15px] font-bold text-[#1F2421]">{copy.seniorPhoneLabel}</span>
        </div>
      </div>

      {/* Step captions */}
      <ol className="mx-auto mt-8 grid max-w-3xl gap-3 sm:grid-cols-3">
        {copy.steps.map((step, i) => {
          const active = phase >= i;
          return (
            <li
              key={step}
              className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-base transition-colors duration-500 ${
                active ? 'bg-[#EAF5EE] text-[#0F4D31]' : 'bg-white/60 text-[#5C5A56]'
              }`}
            >
              <span
                className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black transition-colors duration-500 ${
                  active ? 'bg-[#1B7A4E] text-white' : 'bg-[#E9E2D8] text-[#5C5A56]'
                }`}
              >
                {i + 1}
              </span>
              <span className="font-semibold leading-snug">{step}</span>
            </li>
          );
        })}
      </ol>

      <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-sm text-[#5C5A56]">
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

function Tile({ name, rel, color }: { name: string; rel: string; color: { bg: string; fg: string } }) {
  return (
    <div
      className="flex h-full flex-col items-center justify-center rounded-lg sm:rounded-xl px-0.5 py-1 text-center"
      style={{ background: color.bg, color: color.fg }}
    >
      <span
        className="flex h-5 w-5 sm:h-8 sm:w-8 items-center justify-center rounded-full bg-white/25 text-[9px] sm:text-[13px] font-black"
      >
        {name.charAt(0)}
      </span>
      <span className="mt-0.5 text-[9px] sm:text-[13px] font-extrabold leading-tight">{name}</span>
      <span className="text-[7px] sm:text-[10px] font-semibold leading-tight truncate max-w-full">{rel}</span>
      <span className="mt-0.5 hidden sm:flex h-5 w-5 items-center justify-center rounded-full bg-white">
        <Phone className="h-3 w-3" style={{ color: color.bg === '#F2B705' ? '#B58900' : color.bg }} />
      </span>
    </div>
  );
}
