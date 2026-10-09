import React, { useEffect, useState } from 'react';
import { 
  X, 
  ChevronLeft, 
  ChevronRight, 
  Globe2
} from 'lucide-react';
import { PhonePhotoItem } from './PhoneScreenshotCard';
import { useLanguage } from '../i18n/LanguageContext';

interface PhoneScreenshotModalProps {
  photo: PhonePhotoItem | null;
  allPhotos: PhonePhotoItem[];
  onClose: () => void;
  onSelectPhoto: (photo: PhonePhotoItem) => void;
}

export function PhoneScreenshotModal({
  photo,
  allPhotos,
  onClose,
  onSelectPhoto,
}: PhoneScreenshotModalProps) {
  const { language, t } = useLanguage();
  const [imageError, setImageError] = useState(false);
  const [currentSrcIndex, setCurrentSrcIndex] = useState(0);

  useEffect(() => {
    setImageError(false);
    setCurrentSrcIndex(0);
  }, [photo, language]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (!photo) return;
      const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
      if (e.key === 'ArrowRight' && currentIndex < allPhotos.length - 1) {
        onSelectPhoto(allPhotos[currentIndex + 1]);
      } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
        onSelectPhoto(allPhotos[currentIndex - 1]);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [photo, allPhotos, onClose, onSelectPhoto]);

  if (!photo) return null;

  const currentLangFilename = `${photo.baseName}_${language}.png`;

  const currentIndex = allPhotos.findIndex((p) => p.id === photo.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < allPhotos.length - 1;

  const candidateSources = [
    `${photo.webFolder}${photo.baseName}_${language}.png`,
    `${photo.webFolder}${photo.baseName}_${language}.jpg`,
    `${photo.webFolder}${photo.baseName}_${language}.jpeg`,
    `${photo.webFolder}${photo.baseName}_${language}.webp`,
    // Fallback to non-suffixed file
    `${photo.webFolder}${photo.baseName}.png`,
    `${photo.webFolder}${photo.baseName}.jpg`,
    `${photo.webFolder}${photo.baseName}.jpeg`,
    `${photo.webFolder}${photo.baseName}.webp`,
  ];

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
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-3xl border border-[#C5A880]/50 shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label={t.modal.close}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 border border-[#C5A880]/40 flex items-center justify-center text-[#2C2C2C] hover:bg-white hover:scale-105 transition-all shadow-sm cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left Column: Enlarged Smartphone Device Viewport */}
        <div className="bg-[#181818] p-5 sm:p-8 flex items-center justify-center relative md:w-1/2 flex-shrink-0">
          
          {/* Navigation Arrows */}
          {hasPrev && (
            <button
              onClick={() => onSelectPhoto(allPhotos[currentIndex - 1])}
              className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
              title={t.modal.prev}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          )}

          {hasNext && (
            <button
              onClick={() => onSelectPhoto(allPhotos[currentIndex + 1])}
              className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition-colors border border-white/20"
              title={t.modal.next}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          )}

          {/* Smartphone Hardware Frame in Modal */}
          <div className="w-full max-w-[270px] sm:max-w-[290px] p-2.5 sm:p-3 rounded-[36px] sm:rounded-[40px] bg-[#222222] border-[3px] sm:border-[4px] border-[#444444] shadow-2xl relative">
            
            {/* Top Pinhole speaker */}
            <div className="w-full flex items-center justify-center gap-1.5 pb-2 pt-0.5">
              <div className="w-10 h-1.5 rounded-full bg-[#111111]" />
              <div className="w-2 h-2 rounded-full bg-[#0a0a0a] border border-[#2e2e2e]" />
            </div>

            {/* Screen Glass Area (9:19.5 Portrait Smartphone) */}
            <div className="w-full aspect-[9/19.5] rounded-[24px] sm:rounded-[26px] overflow-hidden bg-black relative border border-white/10 flex flex-col">
              
              {!imageError ? (
                <div className="relative w-full h-full overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={candidateSources[currentSrcIndex]}
                    alt={photo.title}
                    onError={handleImageError}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
              ) : (
                <div className={`w-full h-full bg-gradient-to-br ${photo.accentColor} p-4 flex flex-col justify-between`}>
                  <div className="flex items-center justify-between pb-2 border-b border-black/5">
                    <span className="text-xs font-bold text-[#2C2C2C]">
                      {photo.theme === 'senear' ? 'SENEAR' : 'JUNEAR'}
                    </span>
                    <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white/80 text-[#8C7355] border border-[#C5A880]/30">
                      {photo.badge}
                    </span>
                  </div>

                  <div className="flex flex-col items-center justify-center py-6 text-center">
                    <div className="w-14 h-14 rounded-2xl bg-white border border-[#C5A880]/40 flex items-center justify-center shadow-sm">
                      <IconComp className="w-7 h-7 text-[#A38053]" />
                    </div>
                    <span className="mt-3 text-sm font-bold text-[#2C2C2C]">
                      {photo.title}
                    </span>
                    <span className="text-xs text-[#6E6B65] mt-1 max-w-[200px]">
                      {photo.subtitle}
                    </span>
                  </div>

                  <div className="bg-white/95 border border-dashed border-[#C5A880] rounded-xl p-3 text-center shadow-xs">
                    <p className="text-[11px] font-bold text-[#8C7355]">
                      {t.nearSection.photoSlot} #{currentIndex + 1} ({language.toUpperCase()})
                    </p>
                    <p className="text-[10px] font-mono text-[#2C2C2C] mt-1 bg-black/5 py-1 px-1.5 rounded truncate">
                      {currentLangFilename}
                    </p>
                  </div>

                  <div className="w-full pb-1 pt-1 flex items-center justify-center">
                    <div className="w-16 h-1 rounded-full bg-black/20" />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Instructions, File Location, and Tech Details */}
        <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto md:w-1/2 space-y-6">
          <div className="space-y-4">
            
            {/* Header info */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md bg-[#2C2C2C] text-[#FAFAFA]">
                  {photo.theme === 'senear'
                    ? (language === 'hu' ? 'SENEAR (Idősek)' : language === 'de' ? 'SENEAR (Senioren)' : 'SENEAR (Seniors)')
                    : (language === 'hu' ? 'JUNEAR (Gyermekek)' : language === 'de' ? 'JUNEAR (Kinder)' : 'JUNEAR (Kids)')}
                </span>
                <span className="text-[10px] font-semibold text-[#8C7355] border border-[#C5A880]/40 px-2 py-0.5 rounded bg-white">
                  {currentIndex + 1} / {allPhotos.length}
                </span>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-[#A38053] bg-[#F5F0EB] px-2 py-0.5 rounded border border-[#C5A880]/30 ml-auto">
                  <Globe2 className="w-3 h-3" />
                  <span>{language.toUpperCase()}</span>
                </span>
              </div>
              <h3 className="font-heading font-bold text-xl sm:text-2xl text-[#2C2C2C]">
                {photo.title}
              </h3>
              <p className="text-sm text-[#5C5A56] mt-2 leading-relaxed">
                {photo.subtitle}
              </p>
              {photo.badge && (
                <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white border border-[#C5A880]/40 text-xs font-semibold text-[#8C7355] shadow-2xs">
                  <span>{photo.badge}</span>
                </div>
              )}
            </div>
          </div>

          {/* Quick thumbnails to jump between 4 photos */}
          <div className="pt-3 border-t border-[#E8DFD3] flex items-center justify-between gap-2">
            <span className="text-[11px] font-medium text-[#6E6B65]">
              {currentIndex + 1} / {allPhotos.length}
            </span>
            <div className="flex items-center gap-1.5">
              {allPhotos.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => onSelectPhoto(p)}
                  className={`w-7 h-7 rounded-lg text-xs font-semibold flex items-center justify-center transition-all cursor-pointer ${
                    p.id === photo.id 
                      ? 'bg-[#2C2C2C] text-white shadow-xs' 
                      : 'bg-white text-[#5C5A56] border border-[#C5A880]/40 hover:bg-[#F5F0EB]'
                  }`}
                >
                  {idx + 1}
                </button>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
