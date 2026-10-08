import React from 'react';

export type LogoVariant = 'emblem' | 'squircle';

interface GabbaLogoProps {
  variant?: LogoVariant;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showWordmark?: boolean;
  className?: string;
  theme?: 'light' | 'dark' | 'auto';
}

export function GabbaLogo({
  variant = 'squircle',
  size = 'md',
  showWordmark = true,
  className = '',
}: GabbaLogoProps) {
  // Dimensions map
  const markDimensions = {
    sm: { width: 32, height: 32, textClass: 'text-lg', dotSize: 'w-1.5 h-1.5' },
    md: { width: 42, height: 42, textClass: 'text-2xl', dotSize: 'w-2 h-2' },
    lg: { width: 56, height: 56, textClass: 'text-3xl', dotSize: 'w-2.5 h-2.5' },
    xl: { width: 72, height: 72, textClass: 'text-4xl', dotSize: 'w-3 h-3' },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 select-none ${className}`}>
      {/* Version 1: Circular Badge / Emblem */}
      {variant === 'emblem' ? (
        <svg
          width={markDimensions.width}
          height={markDimensions.height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 hover:scale-105"
          aria-label="gabba circular emblem logo"
        >
          {/* Subtle Outer Shadow Ring */}
          <circle cx="50" cy="50" r="47" fill="#FBF8F4" />
          
          {/* Outer Gold Ring */}
          <circle
            cx="50"
            cy="50"
            r="46"
            stroke="url(#goldGradientEmblem)"
            strokeWidth="2.5"
          />

          {/* Inner Accent Hairline */}
          <circle
            cx="50"
            cy="50"
            r="41"
            stroke="#C5A880"
            strokeWidth="0.75"
            strokeOpacity="0.4"
            strokeDasharray="2 3"
          />

          {/* Inner Disc with subtle warm tint */}
          <circle cx="50" cy="50" r="39" fill="url(#discInnerGrad)" />

          {/* Geometric "g" Monogram for Emblem */}
          {/* Upper loop of 'g' */}
          <circle
            cx="48"
            cy="42"
            r="16"
            stroke="#2C2C2C"
            strokeWidth="6"
            strokeLinecap="round"
          />
          {/* Right vertical stem and curved lower bowl / hook */}
          <path
            d="M 64 36 V 56 C 64 68 54 75 40 75 C 32 75 26 71 24 67"
            stroke="#2C2C2C"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Luxury gold highlight node on the ear/apex */}
          <circle cx="64" cy="36" r="3.5" fill="#D4AF37" />
          <circle cx="26" cy="68" r="2.5" fill="#C5A880" />

          {/* Gradients */}
          <defs>
            <linearGradient id="goldGradientEmblem" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#DFCA9B" />
              <stop offset="50%" stopColor="#C5A880" />
              <stop offset="100%" stopColor="#9C7A4A" />
            </linearGradient>
            <radialGradient id="discInnerGrad" cx="50" cy="45" r="40" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="70%" stopColor="#F7F2EC" />
              <stop offset="100%" stopColor="#EDE3D5" />
            </radialGradient>
          </defs>
        </svg>
      ) : (
        /* Version 2: Modern Squircle Icon */
        <svg
          width={markDimensions.width}
          height={markDimensions.height}
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="shrink-0 transition-transform duration-300 hover:scale-105"
          aria-label="gabba squircle icon logo"
        >
          {/* Drop shadow / base glow */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="26"
            fill="url(#squircleBgGrad)"
          />

          {/* Polished Gold Hairline Border */}
          <rect
            x="4"
            y="4"
            width="92"
            height="92"
            rx="26"
            stroke="url(#squircleBorderGrad)"
            strokeWidth="2"
          />

          {/* Inner subtle glow ring */}
          <rect
            x="8"
            y="8"
            width="84"
            height="84"
            rx="22"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.7"
          />

          {/* Modern Minimal 'g' Lettermark */}
          {/* Top circular bowl */}
          <ellipse
            cx="48"
            cy="42"
            rx="15"
            ry="15"
            stroke="#2C2C2C"
            strokeWidth="6.5"
            strokeLinecap="round"
          />
          {/* Distinctive stem and terminal hook */}
          <path
            d="M 63 36 V 56 C 63 70 51 76 38 76 C 30 76 25 72 23 68"
            stroke="#2C2C2C"
            strokeWidth="6.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Gold accent bar / ear */}
          <circle cx="63" cy="36" r="3.75" fill="#C5A880" />
          <path
            d="M 45 42 L 53 42"
            stroke="#C5A880"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeOpacity="0.8"
          />

          {/* Gradients */}
          <defs>
            <linearGradient id="squircleBgGrad" x1="10" y1="10" x2="90" y2="90" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="60%" stopColor="#F8F3ED" />
              <stop offset="100%" stopColor="#EEE5DA" />
            </linearGradient>
            <linearGradient id="squircleBorderGrad" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#E2CFAC" />
              <stop offset="50%" stopColor="#C5A880" />
              <stop offset="100%" stopColor="#9C7949" />
            </linearGradient>
          </defs>
        </svg>
      )}

      {/* Typography: simply "gabba" in lowercase, modern geometric font */}
      {showWordmark && (
        <div className="flex items-center gap-1.5 leading-none">
          <span
            className={`font-heading font-extrabold tracking-tight text-[#2C2C2C] lowercase transition-colors ${markDimensions.textClass}`}
            style={{ letterSpacing: '-0.035em' }}
          >
            gabba
          </span>
          <span className={`${markDimensions.dotSize} rounded-full bg-[#C5A880] inline-block mb-1 shadow-2xs`} />
        </div>
      )}
    </div>
  );
}
