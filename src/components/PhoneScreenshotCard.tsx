import React, { useState, useEffect } from 'react';
import { 
  Maximize2, 
  Wifi, 
  Battery, 
  Signal, 
  Image as ImageIcon
} from 'lucide-react';
import { useLanguage } from '../i18n/LanguageContext';
import { SupportedLanguage } from '../i18n/types';

export interface PhonePhotoItem {
  id: number;
  baseName: string; // e.g. 'senear-1', 'senear-2', etc.
  folder: string;   // e.g. 'public/screenshots/senear/'
  webFolder: string;// e.g. '/screenshots/senear/'
  title: string;
  subtitle: string;
  badge: string;
  accentColor: string;
  icon: React.ComponentType<{ className?: string }>;
  theme: 'senear' | 'junear';
}

interface PhoneScreenshotCardProps {
  photo: PhonePhotoItem;
  index: number;
  onOpenZoom: (photo: PhonePhotoItem) => void;
}

export function PhoneScreenshotCard({ photo, index, onOpenZoom }: PhoneScreenshotCardProps) {
  const { language, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  // Active language filename (e.g., senear-3_hu.png, senear-3_en.png, senear-3_de.png)
  const currentLangFilename = `${photo.baseName}_${language}.png`;

  // Candidate sources with prioritized language-specific files, then fallback to non-suffixed files
  const candidateSources = [
    // 1. Language-specific files (_hu, _en, _de)
    `${photo.webFolder}${photo.baseName}_${language}.png`,
    `${photo.webFolder}${photo.baseName}_${language}.jpg`,
    `${photo.webFolder}${photo.baseName}_${language}.jpeg`,
    `${photo.webFolder}${photo.baseName}_${language}.webp`,
    // 2. Fallback to generic uploaded file without language suffix
    `${photo.webFolder}${photo.baseName}.png`,
    `${photo.webFolder}${photo.baseName}.jpg`,
    `${photo.webFolder}${photo.baseName}.jpeg`,
    `${photo.webFolder}${photo.baseName}.webp`,
  ];

  // Reset when photo or language changes
  useEffect(() => {
    setImageError(false);
    setCurrentSrcIndex(0);
  }, [photo.baseName, language]);

  const handleImageError = () => {
    if (currentSrcIndex < candidateSources.length - 1) {
      setCurrentSrcIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  const IconComp = photo.icon;

  return (
    <div 
      onClick={() => onOpenZoom(photo)}
      className="group flex flex-col items-center cursor-pointer select-none"
    >
      {/* ============================================================== */}
      {/* Realistic Smartphone Chassis Frame (Narrower & Taller)        */}
      {/* ============================================================== */}
      <div className="w-full max-w-[195px] sm:max-w-[215px] p-2 sm:p-2.5 rounded-[28px] sm:rounded-[32px] bg-[#1A1A1A] border-[2.5px] sm:border-[3px] border-[#383838] shadow-lg group-hover:shadow-2xl group-hover:border-[#C5A880] transition-all duration-300 transform group-hover:-translate-y-1 relative">
        
        {/* Subtle Phone Speaker & Camera Pinhole at Top Chassis */}
        <div className="w-full flex items-center justify-center gap-1.5 pb-1.5 pt-0.5">
          <div className="w-8 h-1 rounded-full bg-[#2C2C2C]" />
          <div className="w-1.5 h-1.5 rounded-full bg-[#111111] border border-[#333333]" />
        </div>

        {/* Screen Bezel (TALL VERTICAL 9:19.5 ASPECT RATIO matching real smartphones) */}
        <div className="w-full aspect-[9/19.5] rounded-[20px] sm:rounded-[22px] overflow-hidden bg-[#0A0A0A] relative border border-white/10 flex flex-col">
          
          {/* Screen Content: Real Screenshot OR Simulated High-Fidelity App UI */}
          {!imageError ? (
            <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
              <img
                src={candidateSources[currentSrcIndex]}
                alt={photo.title}
                onError={handleImageError}
                className="w-full h-full object-cover object-top transition-transform duration-300 group-hover:scale-102"
              />
            </div>
          ) : (
            /* Simulated High-Fidelity App UI Template */
            <div className="w-full h-full flex flex-col justify-between">
              {/* Smartphone Simulated Status Bar */}
              <div className="w-full px-2.5 pt-1.5 pb-1 flex items-center justify-between text-[8px] font-medium text-white/70 z-10 select-none">
                <span>09:41</span>
                <div className="flex items-center gap-1">
                  <Signal className="w-2.5 h-2.5" />
                  <Wifi className="w-2.5 h-2.5" />
                  <Battery className="w-2.5 h-2.5" />
                </div>
              </div>

              <div className={`flex-1 w-full bg-gradient-to-br ${photo.accentColor} p-2.5 flex flex-col justify-between relative`}>
                {/* Simulated App Top Bar */}
                <div className="flex items-center justify-between pb-1 border-b border-black/5">
                  <span className="text-[9px] font-bold tracking-tight text-[#2C2C2C]">
                    {photo.theme === 'senear' ? 'SENEAR' : 'JUNEAR'}
                  </span>
                  <span className="text-[7px] font-semibold px-1 py-0.5 rounded bg-white/80 text-[#8C7355] border border-[#C5A880]/30 shadow-2xs">
                    {photo.badge}
                  </span>
                </div>

                {/* Simulated Screen Body Graphic */}
                <div className="flex flex-col items-center justify-center my-auto py-2 text-center">
                  <div className="w-11 h-11 rounded-2xl bg-white/95 border border-[#C5A880]/40 flex items-center justify-center shadow-xs group-hover:scale-110 transition-transform">
                    <IconComp className="w-6 h-6 text-[#A38053]" />
                  </div>
                  <span className="mt-2 text-[10px] font-bold text-[#2C2C2C] leading-tight">
                    {photo.title}
                  </span>
                  <span className="text-[8px] text-[#6E6B65] mt-0.5 max-w-[130px] line-clamp-2 leading-tight">
                    {photo.subtitle}
                  </span>
                </div>

                {/* Upload Placeholder Guide Box */}
                <div className="bg-white/90 border border-dashed border-[#C5A880]/70 rounded-xl p-1.5 text-center shadow-2xs">
                  <div className="flex items-center justify-center gap-1 text-[8px] font-semibold text-[#8C7355]">
                    <ImageIcon className="w-2.5 h-2.5" />
                    <span>{t.nearSection.photoSlot} #{index + 1}</span>
                  </div>
                  <div className="mt-0.5 text-[7px] font-mono text-[#5C5A56] bg-black/5 px-1 py-0.5 rounded truncate">
                    {currentLangFilename}
                  </div>
                </div>
              </div>

              {/* Bottom Home Indicator Bar for Mockup */}
              <div className="w-full pb-1 pt-1 flex items-center justify-center z-10">
                <div className="w-12 h-0.5 rounded-full bg-white/40" />
              </div>
            </div>
          )}

          {/* Hover Expand Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1.5 text-white z-20 backdrop-blur-[1px]">
            <div className="bg-[#2C2C2C]/90 text-white text-[10px] font-medium px-2.5 py-1.5 rounded-full flex items-center gap-1.5 border border-[#C5A880]/40 shadow-md">
              <Maximize2 className="w-3 h-3 text-[#C5A880]" />
              <span>{t.nearSection.zoom}</span>
            </div>
          </div>

        </div>

      </div>

      {/* ============================================================== */}
      {/* Captions Below Phone                                           */}
      {/* ============================================================== */}
      <div className="w-full max-w-[195px] sm:max-w-[215px] pt-3 text-center space-y-1">
        <p className="font-heading font-bold text-xs sm:text-sm text-[#2C2C2C] leading-snug">
          {photo.title}
        </p>
        <p className="text-[11px] text-[#6E6B65] leading-snug line-clamp-2">
          {photo.subtitle}
        </p>
      </div>

    </div>
  );
}
