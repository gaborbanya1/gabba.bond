import React, { useState, useRef, useEffect } from 'react';
import { 
  Smartphone, 
  Maximize2
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { GooglePlayIcon } from './GooglePlayIcon';
import { PhoneScreenshotModal } from './PhoneScreenshotModal';
import { PhonePhotoItem } from './PhoneScreenshotCard';

interface Senear3DShowcaseTileProps {
  onOpenSimulator?: () => void;
  className?: string;
}

export function Senear3DShowcaseTile({
  onOpenSimulator,
  className = '',
}: Senear3DShowcaseTileProps) {
  const { language, t } = useLanguage();
  const [isHovered, setIsHovered] = useState(false);
  const tiltAngle = -18;
  const [selectedPhoto, setSelectedPhoto] = useState<PhonePhotoItem | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);

  // Metadata for the 4 SENEAR mobile screenshots
  const senearPhotos: PhonePhotoItem[] = [
    {
      id: 1,
      baseName: 'senear-1',
      folder: 'public/screenshots/senear/',
      webFolder: '/screenshots/senear/',
      title: t.senear.photos.title1,
      subtitle: t.senear.photos.sub1,
      badge: t.senear.photos.badge1,
      accentColor: 'from-[#FAF7F2] to-[#F5EFE6]',
      icon: Smartphone,
      theme: 'senear'
    },
    {
      id: 2,
      baseName: 'senear-2',
      folder: 'public/screenshots/senear/',
      webFolder: '/screenshots/senear/',
      title: t.senear.photos.title2,
      subtitle: t.senear.photos.sub2,
      badge: t.senear.photos.badge2,
      accentColor: 'from-[#FFF5F5] to-[#FDE8E8]',
      icon: Smartphone,
      theme: 'senear'
    },
    {
      id: 3,
      baseName: 'senear-3',
      folder: 'public/screenshots/senear/',
      webFolder: '/screenshots/senear/',
      title: t.senear.photos.title3,
      subtitle: t.senear.photos.sub3,
      badge: t.senear.photos.badge3,
      accentColor: 'from-[#F5F8FA] to-[#EBF2F7]',
      icon: Smartphone,
      theme: 'senear'
    },
    {
      id: 4,
      baseName: 'senear-4',
      folder: 'public/screenshots/senear/',
      webFolder: '/screenshots/senear/',
      title: t.senear.photos.title4,
      subtitle: t.senear.photos.sub4,
      badge: t.senear.photos.badge4,
      accentColor: 'from-[#FAF9F5] to-[#F5F2E9]',
      icon: Smartphone,
      theme: 'senear'
    },
  ];

  // Repeat sequence 3 times for completely seamless 3D infinity marquee loop
  const loopingPhotos = [...senearPhotos, ...senearPhotos, ...senearPhotos];

  // Helper for loading localized screenshot with fallbacks
  const getScreenshotSrcs = (baseName: string) => [
    `/screenshots/senear/${baseName}_${language}.png`,
    `/screenshots/senear/${baseName}_hu.png`,
    `/screenshots/senear/${baseName}.png`,
    `/screenshots/senear/${baseName}_en.png`,
    `/screenshots/senear/${baseName}_de.png`,
  ];

  return (
    <div 
      className={`relative rounded-xl bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] border border-[#C5A880]/50 p-4 sm:p-5 shadow-xs transition-all hover:border-[#C5A880] flex flex-col justify-between overflow-hidden ${className}`}
    >
      {/* Background ambient gold aura */}
      <div className="absolute -top-16 -right-16 w-44 h-44 rounded-full bg-[#C5A880]/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-16 -left-16 w-44 h-44 rounded-full bg-[#D4AF37]/10 blur-2xl pointer-events-none" />

      {/* Top Header: Logo on the left (58px), SENEAR on first line, Subtitle below, Description below that */}
      <div className="relative z-10 flex items-center gap-3.5 sm:gap-4 mb-2.5">
        {/* Left: Logo (20% bigger than w-12 / 48px -> 58px) */}
        <div className="shrink-0 flex items-center justify-center">
          <div className="w-[58px] h-[58px] flex items-center justify-center">
            <img 
              src="/logos/senear-logo.png" 
              alt="SENEAR logo" 
              className="w-full h-full object-contain drop-shadow-2xs"
            />
          </div>
        </div>

        {/* Right: SENEAR (1st row), Subtitle (2nd row), Description (3rd row) */}
        <div className="flex-1 min-w-0">
          <div className="font-heading font-bold text-base sm:text-lg text-[#2C2C2C] tracking-wide leading-tight">
            SENEAR
          </div>
          <h3 className="font-heading font-semibold text-xs sm:text-sm text-[#A38053] leading-snug mt-0.5">
            {t.hero.nearTitle}
          </h3>
          <p className="text-[11px] sm:text-xs text-[#6E6B65] line-clamp-2 mt-1 leading-normal">
            {t.senear.headline}
          </p>
        </div>
      </div>

      {/* 3D INFINITE SLIDING STAGE */}
      <div 
        className="relative my-2 w-full h-[245px] sm:h-[260px] rounded-xl overflow-hidden bg-gradient-to-b from-[#F2ECE1]/50 to-[#EAE0D3]/50 border border-[#C5A880]/30 select-none group cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        style={{
          perspective: '1100px',
          perspectiveOrigin: '25% 50%',
        }}
      >
        {/* Soft edge fade shadows to blend infinite slide seamlessly */}
        <div className="absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-[#FAF7F2]/90 to-transparent z-30 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-[#F5EFE6]/90 to-transparent z-30 pointer-events-none" />

        {/* 3D Tilted Perspective Canvas */}
        <div 
          className="w-full h-full flex items-center transition-transform duration-500 ease-out"
          style={{
            transformStyle: 'preserve-3d',
            transform: `rotateY(${tiltAngle}deg) rotateX(4deg) translateZ(0)`,
          }}
        >
          {/* Sliding Track (Continuous Right-to-Left loop) */}
          <div 
            className="flex items-center gap-3.5 sm:gap-4 shrink-0 will-change-transform"
            style={{
              animation: 'senear3dMarquee 20s linear infinite',
              animationPlayState: !isHovered ? 'running' : 'paused',
              transformStyle: 'preserve-3d',
            }}
          >
            {loopingPhotos.map((photo, idx) => (
              <Phone3DCardItem 
                key={`${photo.id}-${idx}`}
                photo={photo}
                sources={getScreenshotSrcs(photo.baseName)}
                onZoom={() => setSelectedPhoto(photo)}
                index={idx % 4}
              />
            ))}
          </div>
        </div>

        {/* Subtle hover hint badge */}
        <div className="absolute bottom-2 left-2 z-30 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity bg-[#2C2C2C]/80 backdrop-blur-xs text-[#FAFAFA] text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
          <Maximize2 className="w-2.5 h-2.5 text-[#C5A880]" />
          <span>Kattints a nagyításhoz • Hover to pause</span>
        </div>
      </div>

      {/* Action CTA Button: Google Play Download */}
      <div className="relative z-10 pt-2">
        <a
          href="https://play.google.com"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-3 px-4 rounded-xl bg-[#2C2C2C] hover:bg-[#1A1A1A] active:scale-98 text-[#FAFAFA] text-xs sm:text-sm font-semibold flex items-center justify-center gap-2.5 transition-all shadow-xs cursor-pointer border border-[#2C2C2C]"
        >
          <GooglePlayIcon color="white" className="w-4 h-4 shrink-0" />
          <span className="truncate">{t.senear.btnSimulator || 'Download from Google Play'}</span>
        </a>
      </div>

      {/* Fullscreen Zoom Modal if photo is clicked */}
      {selectedPhoto && (
        <PhoneScreenshotModal
          photo={selectedPhoto}
          allPhotos={senearPhotos}
          onClose={() => setSelectedPhoto(null)}
          onSelectPhoto={(p) => setSelectedPhoto(p)}
        />
      )}

      {/* Inline styles for 3D continuous loop keyframe animation */}
      <style>{`
        @keyframes senear3dMarquee {
          0% {
            transform: translate3d(0, 0, 0);
          }
          100% {
            transform: translate3d(-33.3333%, 0, 0);
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Individual 3D Phone Mockup Card
 */
interface Phone3DCardItemProps {
  photo: PhonePhotoItem;
  sources: string[];
  onZoom: () => void;
  index: number;
}

function Phone3DCardItem({
  photo,
  sources,
  onZoom,
  index,
}: Phone3DCardItemProps) {
  const [srcIndex, setSrcIndex] = useState(0);

  return (
    <div
      onClick={onZoom}
      className="relative shrink-0 w-[114px] sm:w-[124px] h-[225px] sm:h-[245px] cursor-pointer group/card transition-all duration-300"
      style={{
        transformStyle: 'preserve-3d',
      }}
    >
      {/* 3D Elevated Shadow cast onto floor */}
      <div className="absolute -bottom-3 left-2 right-2 h-4 bg-black/25 rounded-full blur-md group-hover/card:bg-black/35 group-hover/card:blur-lg transition-all" />

      {/* Realistic Smartphone Chassis */}
      <div 
        className="w-full h-full rounded-[22px] p-[5px] bg-[#1E1C1A] border-2 border-[#3D3A35] shadow-xl group-hover/card:border-[#C5A880] group-hover/card:scale-104 transition-all duration-300 flex flex-col relative overflow-hidden"
        style={{
          boxShadow: '0 18px 30px -10px rgba(0,0,0,0.35), 0 0 0 1px rgba(197, 168, 128, 0.25)',
        }}
      >
        {/* Subtle metallic edge highlight */}
        <div className="absolute inset-0 rounded-[20px] ring-1 ring-white/10 pointer-events-none" />

        {/* Screen Display Area */}
        <div className="w-full h-full rounded-[17px] bg-black overflow-hidden relative flex flex-col">
          {/* Dynamic Island / Top Camera Pill */}
          <div className="absolute top-1 left-1/2 -translate-x-1/2 z-20 w-8 h-2.5 bg-black rounded-full border border-white/10 flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#111] ring-1 ring-white/15" />
          </div>

          {/* Screenshot Image with multi-layer fallback */}
          <img
            src={sources[srcIndex]}
            alt={photo.title}
            onError={() => {
              if (srcIndex < sources.length - 1) {
                setSrcIndex(prev => prev + 1);
              }
            }}
            className="w-full h-full object-cover object-top select-none pointer-events-none"
            loading="eager"
            draggable={false}
          />

          {/* Glossy Glass Reflection Overlay */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/15 to-transparent pointer-events-none" />

          {/* Hover Overlay with Zoom Icon */}
          <div className="absolute inset-0 bg-[#2C2C2C]/40 backdrop-blur-[1px] opacity-0 group-hover/card:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-[#FFFFFF] text-[#2C2C2C] flex items-center justify-center shadow-lg">
              <Maximize2 className="w-3.5 h-3.5 text-[#A38053]" />
            </div>
          </div>
        </div>

        {/* Screen Tag Pill on bottom corner */}
        <div className="absolute bottom-2 left-2 z-10 px-1.5 py-0.5 rounded-md bg-[#2C2C2C]/90 text-[8px] font-bold text-[#FAFAFA] border border-[#C5A880]/30 shadow-xs">
          {index + 1}
        </div>
      </div>
    </div>
  );
}
