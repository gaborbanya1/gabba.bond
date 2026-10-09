import { useState } from 'react';
import { 
  Smartphone, 
  ArrowUpRight, 
  Sparkles, 
  Check, 
  ShieldCheck,
  MapPin,
  HeartHandshake,
  Baby,
  Users,
  Camera,
  PhoneCall,
  Radio,
  Clock,
  FolderOpen,
  QrCode
} from 'lucide-react';
import { PROJECTS } from '../data/portfolioData';
import { ProjectItem } from '../types';
import { PhoneScreenshotCard, PhonePhotoItem } from './PhoneScreenshotCard';
import { PhoneScreenshotModal } from './PhoneScreenshotModal';
import { useLanguage } from '../i18n/LanguageContext';
import { GooglePlayIcon } from './GooglePlayIcon';

interface ProjectsProps {
  onSelectProject: (project: ProjectItem) => void;
  onOpenNogondDemo: () => void;
  onOpenInstallGuide?: () => void;
}

export function Projects({ onSelectProject, onOpenNogondDemo, onOpenInstallGuide }: ProjectsProps) {
  const { language, t } = useLanguage();
  const [zoomPhoto, setZoomPhoto] = useState<PhonePhotoItem | null>(null);
  const [modalPhotosList, setModalPhotosList] = useState<PhonePhotoItem[]>([]);

  const scrollToContact = () => {
    const contactEl = document.querySelector('#contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 4 Mobile Screenshots for SENEAR (portrait smartphone screenshots)
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
      icon: PhoneCall,
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
      icon: Radio,
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
      icon: Clock,
      theme: 'senear'
    },
  ];

  // 4 Mobile Screenshots for JUNEAR (portrait smartphone screenshots)
  const junearPhotos: PhonePhotoItem[] = [
    {
      id: 1,
      baseName: 'junear-1',
      folder: 'public/screenshots/junear/',
      webFolder: '/screenshots/junear/',
      title: t.junear.photos.title1,
      subtitle: t.junear.photos.sub1,
      badge: t.junear.photos.badge1,
      accentColor: 'from-[#F4F9F8] to-[#E6F3F1]',
      icon: Baby,
      theme: 'junear'
    },
    {
      id: 2,
      baseName: 'junear-2',
      folder: 'public/screenshots/junear/',
      webFolder: '/screenshots/junear/',
      title: t.junear.photos.title2,
      subtitle: t.junear.photos.sub2,
      badge: t.junear.photos.badge2,
      accentColor: 'from-[#FAF8F5] to-[#F3EFEA]',
      icon: MapPin,
      theme: 'junear'
    },
    {
      id: 3,
      baseName: 'junear-3',
      folder: 'public/screenshots/junear/',
      webFolder: '/screenshots/junear/',
      title: t.junear.photos.title3,
      subtitle: t.junear.photos.sub3,
      badge: t.junear.photos.badge3,
      accentColor: 'from-[#F6F5FA] to-[#EAE9F5]',
      icon: ShieldCheck,
      theme: 'junear'
    },
    {
      id: 4,
      baseName: 'junear-4',
      folder: 'public/screenshots/junear/',
      webFolder: '/screenshots/junear/',
      title: t.junear.photos.title4,
      subtitle: t.junear.photos.sub4,
      badge: t.junear.photos.badge4,
      accentColor: 'from-[#FAF7F2] to-[#EFEAE2]',
      icon: Users,
      theme: 'junear'
    },
  ];

  const handleOpenZoom = (photo: PhonePhotoItem, allList: PhonePhotoItem[]) => {
    setZoomPhoto(photo);
    setModalPhotosList(allList);
  };

  return (
    <section id="projects" className="py-20 sm:py-28 bg-[#F5F0EB]/50 border-b border-[#C5A880]/20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-14 space-y-6">
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2C2C2C] tracking-tight">
            {t.nearSection.title}
          </h2>

          {/* Subtitle Pill */}
          <div className="flex justify-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#C5A880]/40 text-xs sm:text-sm font-bold text-[#8C7355] uppercase tracking-wider shadow-2xs">
              {t.nearSection.subtitlePill}
            </span>
          </div>

          {/* 2-Column Split Row: Left = SENEAR Text & Logo (right aligned) | Right = JUNEAR Logo & Text (left aligned) */}
          <div className="grid grid-cols-2 items-center py-2 max-w-2xl mx-auto">
            {/* Left Column: SENEAR text and SENEAR logo right-aligned */}
            <div className="flex items-center justify-end gap-3 sm:gap-4 pr-4 sm:pr-8 border-r-2 border-[#C5A880]/60">
              <div className="text-right">
                <span className="block font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C2C2C] tracking-tight leading-none">
                  SENEAR
                </span>
                <span className="block text-xs sm:text-sm font-semibold text-[#8C7355] mt-1">
                  {t.nearSection.appSeniorLabel}
                </span>
              </div>
              <img
                src="/logos/senear-logo.png"
                alt="SENEAR logo"
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain shrink-0"
              />
            </div>

            {/* Right Column: JUNEAR logo and JUNEAR text left-aligned */}
            <div className="flex items-center justify-start gap-3 sm:gap-4 pl-4 sm:pl-8">
              <img
                src="/logos/junear-logo.png"
                alt="JUNEAR logo"
                className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 object-contain shrink-0"
              />
              <div className="text-left">
                <span className="block font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C2C2C] tracking-tight leading-none">
                  JUNEAR
                </span>
                <span className="block text-xs sm:text-sm font-semibold text-[#8C7355] mt-1">
                  {t.nearSection.appJuniorLabel}
                </span>
              </div>
            </div>
          </div>

          {/* Description Paragraph */}
          <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-3xl mx-auto text-center">
            {t.nearSection.description}
            <span className="block mt-3 text-sm sm:text-base font-medium text-[#8C7355] italic">
              {t.nearSection.quote}
            </span>
          </p>
        </div>

        {/* Stacked Product Offerings: Two Distinct Tiles (SENEAR & JUNEAR) */}
        <div className="space-y-12 sm:space-y-16">
          
          {/* ================================================================ */}
          {/* TILE 1: SENEAR (For Seniors)                                     */}
          {/* ================================================================ */}
          <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF7F2] to-[#F5EFE6] rounded-3xl border-2 border-[#C5A880] p-6 sm:p-9 lg:p-12 shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            
            {/* Top Category Title/Logo & Pill */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBDCCB]">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src="/logos/senear-logo.png"
                  alt="SENEAR logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain shrink-0"
                />
                <div className="text-left">
                  <span className="block font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C2C2C] tracking-tight leading-none">
                    SENEAR
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#8C7355] mt-1">
                    {t.nearSection.appSeniorLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#5C5A56] bg-[#FFFFFF]/80 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 shadow-2xs shrink-0">
                <HeartHandshake className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.senear.tagPill}</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="space-y-8">
              
              {/* Headline & Description */}
              <div className="space-y-3">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C] tracking-tight">
                  {t.senear.headline}
                </h3>
                <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-4xl">
                  {t.senear.description}
                </p>
              </div>

              {/* 4 Core Features Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                  {t.senear.featuresTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.senear.feature1Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.senear.feature1Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.senear.feature2Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.senear.feature2Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.senear.feature3Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.senear.feature3Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.senear.feature4Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.senear.feature4Desc}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4 Photos / Screen Gallery Section (PORTRAIT MOBILE SCREENS) */}
              <div className="space-y-4 pt-3 border-t border-[#EBDCCB]/80">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#A38053]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                    {t.senear.galleryTitle}
                  </h4>
                </div>

                {/* 4 Narrower & Vertically Taller Mobile Phone Frames */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto pt-2">
                  {senearPhotos.map((photo, idx) => (
                    <PhoneScreenshotCard
                      key={photo.id}
                      photo={photo}
                      index={idx}
                      onOpenZoom={(item) => handleOpenZoom(item, senearPhotos)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons for Tile 1 */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={onOpenNogondDemo}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-sm font-semibold hover:bg-[#1A1A1A] active:scale-98 transition-all cursor-pointer shadow-sm hover:shadow-md border border-[#2C2C2C] group"
                >
                  <GooglePlayIcon className="w-4 h-4 shrink-0 transition-transform group-hover:scale-110" />
                  <span>{t.senear.btnSimulator}</span>
                </button>

                {onOpenInstallGuide && (
                  <button
                    onClick={onOpenInstallGuide}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#FFFFFF] text-[#2C2C2C] text-sm font-semibold hover:bg-[#F5F0EB] active:scale-98 transition-all cursor-pointer shadow-2xs hover:shadow-xs border border-[#C5A880]/50 group"
                  >
                    <QrCode className="w-4 h-4 text-[#8C7355] shrink-0 transition-transform group-hover:scale-110" />
                    <span>{t.senear.btnInstallGuide}</span>
                  </button>
                )}
              </div>

            </div>
          </div>


          {/* ================================================================ */}
          {/* TILE 2: JUNEAR (For Kids)                                        */}
          {/* ================================================================ */}
          <div className="bg-gradient-to-br from-[#FFFFFF] via-[#FAF8F5] to-[#F3EFEA] rounded-3xl border-2 border-[#C5A880] p-6 sm:p-9 lg:p-12 shadow-md relative overflow-hidden transition-all duration-300 hover:shadow-xl">
            
            {/* Top Category Title/Logo & Pill */}
            <div className="flex flex-wrap sm:flex-nowrap items-center justify-between gap-4 mb-8 pb-6 border-b border-[#EBDCCB]">
              <div className="flex items-center gap-3 sm:gap-4">
                <img
                  src="/logos/junear-logo.png"
                  alt="JUNEAR logo"
                  className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 object-contain shrink-0"
                />
                <div className="text-left">
                  <span className="block font-heading text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2C2C2C] tracking-tight leading-none">
                    JUNEAR
                  </span>
                  <span className="block text-xs sm:text-sm font-semibold text-[#8C7355] mt-1">
                    {t.nearSection.appJuniorLabel}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs font-medium text-[#5C5A56] bg-[#FFFFFF]/80 px-3.5 py-1.5 rounded-full border border-[#C5A880]/30 shadow-2xs shrink-0">
                <ShieldCheck className="w-3.5 h-3.5 text-[#C5A880]" />
                <span>{t.junear.tagPill}</span>
              </div>
            </div>

            {/* Main Content Layout */}
            <div className="space-y-8">
              
              {/* Headline & Description */}
              <div className="space-y-3">
                <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-[#2C2C2C] tracking-tight">
                  {t.junear.headline}
                </h3>
                <p className="text-base sm:text-lg text-[#5C5A56] leading-relaxed max-w-4xl">
                  {t.junear.description}
                </p>
              </div>

              {/* 4 Core Features Grid */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                  {t.junear.featuresTitle}
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  
                  {/* Feature 1 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.junear.feature1Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.junear.feature1Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 2 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.junear.feature2Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.junear.feature2Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 3 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.junear.feature3Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.junear.feature3Desc}
                      </p>
                    </div>
                  </div>

                  {/* Feature 4 */}
                  <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#FFFFFF] border border-[#C5A880]/35 shadow-2xs">
                    <div className="shrink-0 mt-0.5 w-6 h-6 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                      <Check className="w-3.5 h-3.5 text-[#2fbe56]" strokeWidth={2.5} />
                    </div>
                    <div>
                      <h5 className="font-heading font-bold text-sm text-[#2C2C2C]">
                        {t.junear.feature4Title}
                      </h5>
                      <p className="text-xs text-[#5C5A56] leading-relaxed mt-1">
                        {t.junear.feature4Desc}
                      </p>
                    </div>
                  </div>

                </div>
              </div>

              {/* 4 Photos / Screen Gallery Section (PORTRAIT MOBILE SCREENS) */}
              <div className="space-y-4 pt-3 border-t border-[#EBDCCB]/80">
                <div className="flex items-center gap-2">
                  <Camera className="w-4 h-4 text-[#A38053]" />
                  <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                    {t.junear.galleryTitle}
                  </h4>
                </div>

                {/* 4 Narrower & Vertically Taller Mobile Phone Frames */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto pt-2">
                  {junearPhotos.map((photo, idx) => (
                    <PhoneScreenshotCard
                      key={photo.id}
                      photo={photo}
                      index={idx}
                      onOpenZoom={(item) => handleOpenZoom(item, junearPhotos)}
                    />
                  ))}
                </div>
              </div>

              {/* Action Buttons for Tile 2 */}
              <div className="pt-4 flex flex-wrap items-center gap-4">
                <button
                  onClick={scrollToContact}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-sm font-semibold hover:bg-[#1A1A1A] active:scale-98 transition-all cursor-pointer shadow-sm hover:shadow-md border border-[#2C2C2C]"
                >
                  <span>{t.junear.btnMoreInfo}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#C5A880]" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Enlarged Screenshot Modal */}
      <PhoneScreenshotModal
        photo={zoomPhoto}
        allPhotos={modalPhotosList}
        onClose={() => setZoomPhoto(null)}
        onSelectPhoto={(photo) => setZoomPhoto(photo)}
      />
    </section>
  );
}
