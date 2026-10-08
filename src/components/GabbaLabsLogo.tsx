import React from 'react';

export interface GabbaLabsLogoProps {
  variant?: 'horizontal' | 'stacked' | 'horizontal-clean' | 'mark-only' | 'app-icon' | 'dark' | 'monochrome';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showTagline?: boolean;
}

/**
 * The official Gabba Labs vector emblem based on the official logo sheet.
 * Consists of an outer circular ring and an inner geometric 'G' counter.
 */
export function GabbaMark({
  size = 40,
  color = '#BA9356',
  className = '',
}: {
  size?: number;
  color?: string;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 ${className}`}
      aria-label="Gabba Labs Mark"
    >
      {/* Outer concentric circular ring */}
      <circle
        cx="50"
        cy="50"
        r="44"
        stroke={color}
        strokeWidth="9"
      />

      {/* Inner stylized geometric 'G' */}
      {/* 
        The G is an inner concentric arc with strokeWidth 9.
        Radius = 26 (leaving a uniform ~9px negative space gap between outer ring and G).
        Outer radius = 26 + 4.5 = 30.5
        Outer ring inner radius = 44 - 4.5 = 39.5
        Gap = 9px (uniform and balanced).
      */}
      <path
        d="M 67.5 35 
           A 26 26 0 1 0 76 50 
           L 50 50"
        stroke={color}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * GabbaLabsLogo component supporting all 6 official variants from the brand logo set:
 * 1. 'horizontal': Top-middle style (Gold Mark | GABBA / LABS with vertical gold divider)
 * 2. 'stacked': Top-left/right style (Gold Mark centered on top of GABBA / LABS)
 * 3. 'horizontal-clean': Bottom-left style (Gold Mark next to GABBA / LABS without divider)
 * 4. 'mark-only': Just the circular G emblem
 * 5. 'app-icon': Bottom-right style (Soft gold rounded-square button with white G emblem)
 * 6. 'dark': Bottom-left style with white text on dark background
 * 7. 'monochrome': Bottom-middle style with dark charcoal mark and text
 */
export function GabbaLabsLogo({
  variant = 'horizontal',
  size = 'md',
  className = '',
}: GabbaLabsLogoProps) {
  // Dimensions mapping
  const sizeMap = {
    sm: { markSize: 28, textGabba: 'text-sm', textLabs: 'text-[9px]', dividerH: 'h-6' },
    md: { markSize: 38, textGabba: 'text-xl', textLabs: 'text-[11px]', dividerH: 'h-8' },
    lg: { markSize: 48, textGabba: 'text-2xl', textLabs: 'text-xs', dividerH: 'h-10' },
    xl: { markSize: 64, textGabba: 'text-3xl', textLabs: 'text-sm', dividerH: 'h-14' },
  };

  const { markSize, textGabba, textLabs, dividerH } = sizeMap[size];

  // Colors
  const goldColor = '#BA9356';
  const charcoalColor = '#222222';
  const lightColor = '#FAFAFA';

  // Variant 1: Mark Only
  if (variant === 'mark-only') {
    return <GabbaMark size={markSize} color={goldColor} className={className} />;
  }

  // Variant 2: App Icon (rounded-square badge with white G emblem)
  if (variant === 'app-icon') {
    const iconContainerSize = size === 'sm' ? 'w-9 h-9 rounded-xl' : size === 'lg' ? 'w-16 h-16 rounded-2xl' : size === 'xl' ? 'w-20 h-20 rounded-3xl' : 'w-12 h-12 rounded-xl';
    const innerMarkSize = Math.round(markSize * 0.75);

    return (
      <div
        className={`flex items-center justify-center bg-[#BA9356] shadow-xs ${iconContainerSize} ${className}`}
      >
        <GabbaMark size={innerMarkSize} color="#FFFFFF" />
      </div>
    );
  }

  // Variant 3: Stacked Lockup (Top-Left / Top-Right / Bottom-Middle)
  if (variant === 'stacked') {
    return (
      <div className={`flex flex-col items-center text-center group select-none ${className}`}>
        <GabbaMark size={markSize * 1.15} color={goldColor} />
        
        <div className="mt-2.5 flex flex-col items-center">
          <span
            className={`font-heading font-extrabold tracking-[0.18em] text-[#222222] leading-none ${textGabba}`}
          >
            GABBA
          </span>
          <span
            className={`font-sans font-medium tracking-[0.42em] text-[#222222] mt-1 leading-none ${textLabs}`}
            style={{ paddingLeft: '0.42em' }} // optical center for tracked text
          >
            LABS
          </span>
        </div>
      </div>
    );
  }

  // Variant 4: Monochrome Stacked (Bottom-Middle in logo sheet)
  if (variant === 'monochrome') {
    return (
      <div className={`flex flex-col items-center text-center group select-none ${className}`}>
        <GabbaMark size={markSize * 1.15} color={charcoalColor} />
        
        <div className="mt-2.5 flex flex-col items-center">
          <span
            className={`font-heading font-extrabold tracking-[0.18em] text-[#222222] leading-none ${textGabba}`}
          >
            GABBA
          </span>
          <span
            className={`font-sans font-medium tracking-[0.42em] text-[#222222] mt-1 leading-none ${textLabs}`}
            style={{ paddingLeft: '0.42em' }}
          >
            LABS
          </span>
        </div>
      </div>
    );
  }

  // Variant 5: Dark Horizontal Lockup (Bottom-Left in logo sheet)
  if (variant === 'dark') {
    return (
      <div className={`flex items-center gap-3.5 group select-none ${className}`}>
        <GabbaMark size={markSize} color={goldColor} />

        <div className="flex flex-col justify-center">
          <span
            className={`font-heading font-extrabold tracking-[0.18em] text-[#FFFFFF] leading-none ${textGabba}`}
          >
            GABBA
          </span>
          <span
            className={`font-sans font-medium tracking-[0.42em] text-[#E0E0E0] mt-1 leading-none ${textLabs}`}
            style={{ paddingLeft: '0.42em' }}
          >
            LABS
          </span>
        </div>
      </div>
    );
  }

  // Variant 6: Clean Horizontal (no divider)
  if (variant === 'horizontal-clean') {
    return (
      <div className={`flex items-center gap-3.5 group select-none ${className}`}>
        <GabbaMark size={markSize} color={goldColor} />

        <div className="flex flex-col justify-center">
          <span
            className={`font-heading font-extrabold tracking-[0.18em] text-[#222222] leading-none ${textGabba}`}
          >
            GABBA
          </span>
          <span
            className={`font-sans font-medium tracking-[0.42em] text-[#4A4744] mt-1 leading-none ${textLabs}`}
            style={{ paddingLeft: '0.42em' }}
          >
            LABS
          </span>
        </div>
      </div>
    );
  }

  // Default: Variant 1 Top-Middle Official Lockup (Mark | GABBA / LABS with gold vertical line)
  return (
    <div className={`flex items-center gap-3 sm:gap-3.5 group select-none ${className}`}>
      <GabbaMark size={markSize} color={goldColor} />

      {/* Gold vertical divider line from official lockup */}
      <div className={`w-[1.5px] bg-[#BA9356] opacity-80 ${dividerH}`} />

      {/* Typographic lockup: GABBA bold + LABS tracked underneath */}
      <div className="flex flex-col justify-center">
        <span
          className={`font-heading font-extrabold tracking-[0.18em] text-[#222222] leading-none ${textGabba}`}
        >
          GABBA
        </span>
        <span
          className={`font-sans font-medium tracking-[0.42em] text-[#333333] mt-1 leading-none ${textLabs}`}
          style={{ paddingLeft: '0.42em' }}
        >
          LABS
        </span>
      </div>
    </div>
  );
}
