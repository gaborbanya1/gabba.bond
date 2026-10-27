import React, { useState } from 'react';

/**
 * Screenshot <img> with automatic fallback through a list of candidate URLs.
 * Rendered at native resolution (no CSS filters / blur) so it always stays crisp.
 */
export function ScreenImage({
  sources,
  alt,
  className = '',
  style,
}: {
  sources: string[];
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}) {
  const [idx, setIdx] = useState(0);
  return (
    <img
      src={sources[Math.min(idx, sources.length - 1)]}
      alt={alt}
      onError={() => setIdx((i) => (i < sources.length - 1 ? i + 1 : i))}
      className={`w-full h-full object-fill select-none pointer-events-none ${className}`}
      style={style}
      loading="eager"
      decoding="async"
      draggable={false}
    />
  );
}

/**
 * Realistic, unboxed smartphone body. The screen content is passed as children.
 * Size is controlled by the caller through `className` (width + height).
 */
export function PhoneFrame({
  children,
  className = '',
  highlighted = false,
  accent = '#C5A880',
}: {
  children: React.ReactNode;
  className?: string;
  highlighted?: boolean;
  accent?: string;
}) {
  return (
    <div
      className={`relative rounded-[38px] p-[7px] bg-[#1C1A18] border-2 ${className}`}
      style={{
        borderColor: highlighted ? accent : '#3D3A35',
        boxShadow: highlighted
          ? `0 34px 70px -18px rgba(0,0,0,0.45), 0 0 0 1px ${accent}66`
          : '0 22px 44px -18px rgba(0,0,0,0.38)',
      }}
    >
      <div className="absolute inset-0 rounded-[36px] ring-1 ring-white/15 pointer-events-none" />
      <div className="relative w-full h-full rounded-[31px] bg-black overflow-hidden flex flex-col">
        {/* Top bezel with camera island — kept above the screen so it never covers the screenshot (e.g. the clock) */}
        <div className="relative shrink-0 h-[22px] flex items-center justify-center">
          <div className="w-14 h-[14px] bg-black rounded-full border border-white/10 flex items-center justify-end pr-2">
            <div className="w-2 h-2 rounded-full bg-[#111] ring-1 ring-white/20" />
          </div>
        </div>
        <div className="relative flex-1 min-h-0 overflow-hidden">{children}</div>
      </div>
    </div>
  );
}
