import { useState, useRef, useEffect, MouseEvent } from 'react';
import { 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  X, 
  Smartphone, 
  PhoneCall, 
  Radio, 
  Clock, 
  Baby, 
  MapPin, 
  ShieldCheck, 
  Users, 
  Sparkles,
  Wifi,
  Battery,
  Shield,
  AlertTriangle,
  Heart,
  Volume2,
  Lock,
  CheckCircle2
} from 'lucide-react';

export interface PhotoItem {
  id: number;
  title: string;
  subtitle: string;
  badge: string;
  tag: string;
  accentGradient: string;
  screenType: 
    | 'senear_kiosk' 
    | 'senear_sos' 
    | 'senear_portal' 
    | 'senear_routine'
    | 'junear_kiosk' 
    | 'junear_gps' 
    | 'junear_parental' 
    | 'junear_contacts';
  description: string;
  technicalNote: string;
}

interface ProductPhotoCarouselProps {
  productName: 'SENEAR' | 'JUNEAR';
  title: string;
  photos: PhotoItem[];
}

export function ProductPhotoCarousel({ productName, title, photos }: ProductPhotoCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<PhotoItem | null>(null);

  // Drag-to-scroll state
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeftState, setScrollLeftState] = useState(0);
  const [hasDragged, setHasDragged] = useState(false);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);

    // Approximate active index based on scroll position
    const itemWidth = 320; // approximate card width + gap
    const index = Math.round(scrollLeft / itemWidth);
    setActiveIndex(Math.min(Math.max(index, 0), photos.length - 1));
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) {
      el.addEventListener('scroll', checkScroll, { passive: true });
      window.addEventListener('resize', checkScroll);
    }
    return () => {
      if (el) el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
    };
  }, [photos]);

  const scrollTo = (direction: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const cardWidth = 330;
    const delta = direction === 'left' ? -cardWidth : cardWidth;
    scrollRef.current.scrollBy({ left: delta, behavior: 'smooth' });
  };

  const scrollToIndex = (index: number) => {
    if (!scrollRef.current) return;
    const cardWidth = 330;
    scrollRef.current.scrollTo({ left: index * cardWidth, behavior: 'smooth' });
  };

  // Mouse drag handlers
  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setHasDragged(false);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeftState(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // scroll speed multiplier
    if (Math.abs(walk) > 5) {
      setHasDragged(true);
    }
    scrollRef.current.scrollLeft = scrollLeftState - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Render mock screen UI based on screenType
  const renderScreenMockup = (photo: PhotoItem, isLarge = false) => {
    switch (photo.screenType) {
      case 'senear_kiosk':
        return (
          <div className="w-full h-full bg-[#1C1A17] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[9px] text-[#A38053] pb-1.5 border-b border-[#38332B] font-mono">
              <span className="font-bold">10:45</span>
              <div className="flex items-center gap-1.5">
                <span>SENEAR KIOSK</span>
                <Wifi className="w-2.5 h-2.5" />
                <span className="text-emerald-400 font-bold">100%</span>
              </div>
            </div>

            {/* Senior Friendly High-Contrast Big Tiles (2x2) */}
            <div className="grid grid-cols-2 gap-2 mt-2 flex-1">
              <div className="bg-[#2D2820] border-2 border-[#C5A880] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-8 h-8 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#D4AF37] mb-1">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="text-[11px] font-bold tracking-wide">CSALÁD</span>
                <span className="text-[8px] text-[#A38053]">1 Érintés</span>
              </div>

              <div className="bg-[#8A2424] border-2 border-[#FF6B6B] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center text-white mb-1">
                  <AlertTriangle className="w-4 h-4 animate-pulse" />
                </div>
                <span className="text-[11px] font-extrabold tracking-wider text-white">VÉSZ SOS</span>
                <span className="text-[8px] text-red-200">GPS Hívás</span>
              </div>

              <div className="bg-[#262A24] border border-[#5E7A52] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#5E7A52]/20 flex items-center justify-center text-[#8EAF80] mb-1">
                  <Heart className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold">EGÉSZSÉG</span>
                <span className="text-[7.5px] text-[#9BA896]">Gyógyszerek</span>
              </div>

              <div className="bg-[#26242B] border border-[#6B5E87] rounded-xl p-2 flex flex-col items-center justify-center text-center shadow-xs">
                <div className="w-7 h-7 rounded-full bg-[#6B5E87]/20 flex items-center justify-center text-[#A695C7] mb-1">
                  <Volume2 className="w-3.5 h-3.5" />
                </div>
                <span className="text-[10px] font-bold">HANGOSÍTÁS</span>
                <span className="text-[7.5px] text-[#A39EB0]">Max Hangerő</span>
              </div>
            </div>

            {/* Bottom Kiosk Lock Indicator */}
            <div className="mt-2 py-1 bg-[#24211C] rounded-lg border border-[#3D372F] flex items-center justify-center gap-1.5 text-[8.5px] text-[#C5A880]">
              <Lock className="w-2.5 h-2.5" />
              <span>DPC Védett Főképernyő • Véletlen törlés kizárva</span>
            </div>
          </div>
        );

      case 'senear_sos':
        return (
          <div className="w-full h-full bg-[#201010] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-red-900/60">
            {/* SOS Active Header */}
            <div className="flex items-center justify-between text-[9px] text-red-400 pb-1.5 border-b border-red-900/40">
              <span className="flex items-center gap-1 font-bold">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping inline-block" />
                SOS VÉSZJELZÉS AKTÍV
              </span>
              <span className="font-mono text-[8px]">GPS FIX: 100%</span>
            </div>

            {/* Center SOS Pulse Radar */}
            <div className="flex-1 flex flex-col items-center justify-center my-2 text-center relative">
              <div className="w-16 h-16 rounded-full bg-red-600/20 border-2 border-red-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.4)] animate-pulse">
                <PhoneCall className="w-7 h-7 text-white" />
              </div>
              <span className="mt-2 text-xs font-black tracking-wider text-red-100 uppercase">
                Hívás: Anna (Lánya)
              </span>
              <span className="text-[9px] text-red-300 font-mono mt-0.5">
                47.4979° N, 19.0402° E
              </span>
            </div>

            {/* Status Footer */}
            <div className="bg-red-950/80 border border-red-800/80 rounded-xl p-2 text-center space-y-1">
              <p className="text-[9px] font-bold text-white flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-400" /> SMS & GPS elküldve 3 családtagnak
              </p>
              <p className="text-[8px] text-red-300">
                Hangos sziréna & automatikus kihangosítás bekapcsolva
              </p>
            </div>
          </div>
        );

      case 'senear_portal':
        return (
          <div className="w-full h-full bg-[#181E24] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-sky-950">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-sky-400 pb-1.5 border-b border-sky-900/50">
              <span className="font-bold flex items-center gap-1">
                <Radio className="w-3 h-3 text-sky-400 animate-pulse" /> TÁVGONDOZÓI VEZÉRLŐ
              </span>
              <span className="bg-emerald-950 text-emerald-300 text-[8px] px-1.5 py-0.5 rounded font-mono">
                ONLINE
              </span>
            </div>

            {/* Dashboard Items */}
            <div className="space-y-2 mt-2 flex-1">
              <div className="bg-[#212933] p-2 rounded-xl border border-sky-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[8.5px] text-sky-300/80 block">Akkumulátor állapot</span>
                  <span className="text-xs font-bold text-white">Nagyi telefonja: 88%</span>
                </div>
                <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-[10px]">
                  OK
                </div>
              </div>

              <div className="bg-[#212933] p-2 rounded-xl border border-sky-900/40">
                <div className="flex justify-between text-[8.5px] text-sky-300/80 mb-1">
                  <span>Távoli Csengőhang Hangerő</span>
                  <span className="font-bold text-white">100% (Biztonsági)</span>
                </div>
                <div className="w-full bg-[#141A21] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-sky-500 to-[#C5A880] h-full w-full" />
                </div>
              </div>

              <div className="bg-[#212933] p-1.5 rounded-xl border border-sky-900/40 flex items-center gap-2 text-[8.5px] text-[#D8E2EC]">
                <MapPin className="w-3 h-3 text-rose-400 shrink-0" />
                <span className="truncate">Otthon (Budapest, II. kerület) • Biztonságban</span>
              </div>
            </div>

            <div className="text-[8px] text-center text-sky-400/80 pt-1">
              Valós idejű titkosított szinkronizáció
            </div>
          </div>
        );

      case 'senear_routine':
        return (
          <div className="w-full h-full bg-[#1F211E] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-[#3E453B]">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-[#A6BD9C] pb-1.5 border-b border-[#353D32]">
              <span className="font-bold flex items-center gap-1">
                <Clock className="w-3 h-3" /> NAPIREND ÉS EMLÉKEZTETŐK
              </span>
              <span className="font-mono text-[8px]">MA, CSÜTÖRTÖK</span>
            </div>

            {/* Routine List */}
            <div className="space-y-1.5 mt-2 flex-1">
              <div className="bg-[#2B3029] p-2 rounded-xl border border-emerald-600/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-white block">08:00 Reggeli Gyógyszer</span>
                  <span className="text-[8px] text-emerald-300">Vérnyomáscsökkentő + Vitamin</span>
                </div>
                <span className="text-[9px] bg-emerald-900/80 text-emerald-300 px-1.5 py-0.5 rounded font-bold">
                  ✓ BEVÉVE
                </span>
              </div>

              <div className="bg-[#302D24] p-2 rounded-xl border border-[#C5A880]/50 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-[#F0E6D2] block">13:30 Ebéd utáni séta</span>
                  <span className="text-[8px] text-[#C5A880]">Lépésszám cél: 1,500</span>
                </div>
                <span className="text-[8.5px] bg-[#C5A880]/20 text-[#D4AF37] px-1.5 py-0.5 rounded font-bold">
                  KÖVETKEZŐ
                </span>
              </div>

              <div className="bg-[#262824] p-2 rounded-xl border border-stone-700/40 flex items-center justify-between opacity-80">
                <div>
                  <span className="text-[10px] font-bold text-stone-300 block">18:00 Esti gyógyszer</span>
                  <span className="text-[8px] text-stone-400">Automatikus hangos hangjelzés</span>
                </div>
                <span className="text-[8.5px] text-stone-400 font-mono">18:00</span>
              </div>
            </div>

            <div className="text-[8px] text-center text-[#A6BD9C] pt-1">
              Érintésre felolvassa a napi feladatokat
            </div>
          </div>
        );

      case 'junear_kiosk':
        return (
          <div className="w-full h-full bg-[#181D26] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-indigo-950">
            {/* Top Bar */}
            <div className="flex items-center justify-between text-[9px] text-indigo-300 pb-1.5 border-b border-indigo-900/50 font-mono">
              <span className="font-bold flex items-center gap-1">
                <Baby className="w-3 h-3 text-indigo-400" /> JUNEAR KIDS
              </span>
              <div className="flex items-center gap-1 text-emerald-400">
                <Shield className="w-2.5 h-2.5" />
                <span className="text-[8px]">BIZTONSÁGOS</span>
              </div>
            </div>

            {/* Approved Kid Friendly Apps */}
            <div className="grid grid-cols-2 gap-2 mt-2 flex-1">
              <div className="bg-gradient-to-br from-indigo-900/40 to-indigo-800/20 border-2 border-indigo-500/40 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-xl bg-indigo-500/30 flex items-center justify-center text-indigo-300 mb-1">
                  <PhoneCall className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white">ANYA & APA</span>
                <span className="text-[7.5px] text-indigo-300">Gyorshívó</span>
              </div>

              <div className="bg-gradient-to-br from-emerald-900/40 to-emerald-800/20 border-2 border-emerald-500/40 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                <div className="w-8 h-8 rounded-xl bg-emerald-500/30 flex items-center justify-center text-emerald-300 mb-1">
                  <Sparkles className="w-4 h-4" />
                </div>
                <span className="text-[10px] font-bold text-white">TANULÁS</span>
                <span className="text-[7.5px] text-emerald-300">Duolingo</span>
              </div>

              <div className="bg-gradient-to-br from-amber-900/40 to-amber-800/20 border border-amber-500/30 rounded-xl p-2 flex flex-col items-center justify-center text-center">
                <div className="w-7 h-7 rounded-xl bg-amber-500/30 flex items-center justify-center text-amber-300 mb-1">
                  <Clock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9.5px] font-bold text-white">ÓRAREND</span>
                <span className="text-[7px] text-amber-300">Iskolai naptár</span>
              </div>

              <div className="bg-stone-900/80 border border-stone-700/60 rounded-xl p-2 flex flex-col items-center justify-center text-center opacity-60">
                <div className="w-7 h-7 rounded-xl bg-stone-800 flex items-center justify-center text-stone-400 mb-1">
                  <Lock className="w-3.5 h-3.5" />
                </div>
                <span className="text-[9.5px] font-bold text-stone-300">JÁTÉKOK</span>
                <span className="text-[7px] text-rose-400">Időkorlát: Zárolva</span>
              </div>
            </div>

            <div className="mt-2 py-1 bg-indigo-950/80 rounded-lg border border-indigo-800/60 flex items-center justify-center gap-1.5 text-[8.5px] text-indigo-300">
              <Lock className="w-2.5 h-2.5" />
              <span>Play Store & Böngésző szülőileg letiltva</span>
            </div>
          </div>
        );

      case 'junear_gps':
        return (
          <div className="w-full h-full bg-[#15221E] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-emerald-950">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-emerald-300 pb-1.5 border-b border-emerald-900/50">
              <span className="font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-emerald-400" /> ÉLŐ GPS & GEO-FENCE
              </span>
              <span className="bg-emerald-900 text-emerald-300 text-[8px] px-1.5 py-0.5 rounded font-mono">
                PONTOS: 3M
              </span>
            </div>

            {/* Radar / Map Simulation */}
            <div className="flex-1 flex flex-col items-center justify-center my-1 relative bg-[#0D1815] rounded-xl border border-emerald-900/40 p-2 overflow-hidden">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.15)_0,transparent_70%)]" />
              
              {/* Radar Rings */}
              <div className="w-20 h-20 rounded-full border border-emerald-500/20 flex items-center justify-center relative">
                <div className="w-12 h-12 rounded-full border border-emerald-500/40 flex items-center justify-center">
                  <div className="w-5 h-5 rounded-full bg-emerald-500/30 flex items-center justify-center text-emerald-200">
                    <MapPin className="w-3.5 h-3.5 text-emerald-300 animate-bounce" />
                  </div>
                </div>
              </div>

              <div className="mt-2 text-center z-10">
                <span className="text-[10px] font-bold text-white block">
                  Általános Iskola (Biztonsági Zóna)
                </span>
                <span className="text-[8px] text-emerald-400 font-mono">
                  Érkezett: 07:50 • Nem hagyta el a zónát
                </span>
              </div>
            </div>

            {/* Auto Alert Pill */}
            <div className="bg-emerald-950/80 border border-emerald-800/80 rounded-xl p-1.5 text-center">
              <span className="text-[8.5px] font-medium text-emerald-200">
                Zónaelhagyás esetén azonnali push értesítés a szülőknek
              </span>
            </div>
          </div>
        );

      case 'junear_parental':
        return (
          <div className="w-full h-full bg-[#1B1926] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-purple-950">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-purple-300 pb-1.5 border-b border-purple-900/50">
              <span className="font-bold flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-purple-400" /> SZÜLŐI TÁVFELÜGYELET
              </span>
              <span className="text-[8px] text-purple-300 font-mono">PIN VÉDETT</span>
            </div>

            {/* Remote Sliders and Limits */}
            <div className="space-y-2 mt-2 flex-1">
              <div className="bg-[#242133] p-2 rounded-xl border border-purple-900/40">
                <div className="flex justify-between text-[8.5px] text-purple-300 mb-1">
                  <span>Napi Képernyőidő</span>
                  <span className="font-bold text-white">1 óra 15 perc / 2 óra</span>
                </div>
                <div className="w-full bg-[#13111C] h-2 rounded-full overflow-hidden">
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full w-[62%]" />
                </div>
              </div>

              <div className="bg-[#242133] p-2 rounded-xl border border-purple-900/40 flex items-center justify-between">
                <div>
                  <span className="text-[9px] font-bold text-white block">Alvás Mód (Éjszakai Zárás)</span>
                  <span className="text-[7.5px] text-purple-300">20:30-tól csak vészhelyzeti hívás él</span>
                </div>
                <span className="text-[9px] bg-purple-900/80 text-purple-300 px-2 py-0.5 rounded font-bold">
                  AKTÍV
                </span>
              </div>

              <div className="bg-[#242133] p-2 rounded-xl border border-purple-900/40 flex items-center justify-between text-[8.5px]">
                <span className="text-purple-200">Gyermek telefon akku:</span>
                <span className="font-bold text-emerald-400 flex items-center gap-1">
                  <Battery className="w-3 h-3" /> 74% (Kiváló)
                </span>
              </div>
            </div>

            <div className="text-[8px] text-center text-purple-300/80 pt-1">
              Bármikor feloldható a szülői telefonról
            </div>
          </div>
        );

      case 'junear_contacts':
        return (
          <div className="w-full h-full bg-[#192224] text-[#FAFAFA] flex flex-col p-3 rounded-[18px] select-none border border-teal-950">
            {/* Header */}
            <div className="flex items-center justify-between text-[9px] text-teal-300 pb-1.5 border-b border-teal-900/50">
              <span className="font-bold flex items-center gap-1">
                <Users className="w-3 h-3 text-teal-400" /> BIZTONSÁGOS KAPCSOLATOK
              </span>
              <span className="bg-teal-950 text-teal-300 text-[8px] px-1.5 py-0.5 rounded">
                FEHÉRLISTA
              </span>
            </div>

            {/* Whitelisted Contacts */}
            <div className="space-y-1.5 mt-2 flex-1">
              <div className="bg-[#212D30] p-2 rounded-xl border border-teal-700/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500/30 text-teal-200 flex items-center justify-center font-bold text-[10px]">
                    A
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white block">Anya (Kovács Judit)</span>
                    <span className="text-[8px] text-teal-300 font-mono">+36 30 111 2233</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <PhoneCall className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-[#212D30] p-2 rounded-xl border border-teal-700/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500/30 text-teal-200 flex items-center justify-center font-bold text-[10px]">
                    A
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white block">Apa (Kovács Péter)</span>
                    <span className="text-[8px] text-teal-300 font-mono">+36 20 444 5566</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <PhoneCall className="w-3 h-3" />
                </div>
              </div>

              <div className="bg-[#212D30] p-2 rounded-xl border border-teal-700/40 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-teal-500/30 text-teal-200 flex items-center justify-center font-bold text-[10px]">
                    N
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-white block">Nagyi</span>
                    <span className="text-[8px] text-teal-300 font-mono">+36 1 234 5678</span>
                  </div>
                </div>
                <div className="w-6 h-6 rounded-lg bg-teal-500/20 text-teal-300 flex items-center justify-center">
                  <PhoneCall className="w-3 h-3" />
                </div>
              </div>
            </div>

            <div className="text-[8px] text-center text-teal-300/80 pt-1">
              Idegen és kéretlen hívók automatikusan blokkolva
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-4 pt-2">
      {/* Gallery Header with Title, Count, Navigation Arrows, and Scroll Cue */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="w-6 h-6 rounded-lg bg-[#C5A880]/15 border border-[#C5A880]/40 flex items-center justify-center text-[#8C7355]">
            <Smartphone className="w-3.5 h-3.5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-[#2C2C2C]">
              {title}
            </h4>
            <span className="text-[11px] text-[#8C7355] block sm:inline sm:ml-2 font-medium">
              4 lapozható rendszerfotó & kezelőfelület
            </span>
          </div>
        </div>

        {/* Navigation Controls: Arrows, Hint, Dots */}
        <div className="flex items-center gap-3">
          {/* Scroll Cue Hint */}
          <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-medium text-[#7D766D] bg-[#FFFFFF]/90 px-2.5 py-1 rounded-full border border-[#C5A880]/30 shadow-2xs">
            <span className="inline-block animate-pulse text-[#C5A880]">← Görgess vízszintesen →</span>
          </span>

          {/* Left Arrow Button */}
          <button
            onClick={() => scrollTo('left')}
            disabled={!canScrollLeft}
            aria-label="Előző kép"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollLeft
                ? 'bg-[#FFFFFF] text-[#2C2C2C] border-[#C5A880] hover:bg-[#FAF7F2] shadow-xs hover:scale-105 active:scale-95'
                : 'bg-[#F5F0EB]/60 text-[#B8B4AE] border-[#E0D7CC]/60 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {/* Right Arrow Button */}
          <button
            onClick={() => scrollTo('right')}
            disabled={!canScrollRight}
            aria-label="Következő kép"
            className={`w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer ${
              canScrollRight
                ? 'bg-[#FFFFFF] text-[#2C2C2C] border-[#C5A880] hover:bg-[#FAF7F2] shadow-xs hover:scale-105 active:scale-95'
                : 'bg-[#F5F0EB]/60 text-[#B8B4AE] border-[#E0D7CC]/60 cursor-not-allowed opacity-40'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Horizontal Scroll Track */}
      <div className="relative group/carousel">
        {/* Left Fade Gradient when scrollable */}
        {canScrollLeft && (
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#FFFFFF] to-transparent pointer-events-none z-10 transition-opacity rounded-l-2xl" />
        )}
        {/* Right Fade Gradient when scrollable */}
        {canScrollRight && (
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FFFFFF] to-transparent pointer-events-none z-10 transition-opacity rounded-r-2xl" />
        )}

        <div
          ref={scrollRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          className={`flex gap-4 sm:gap-5 overflow-x-auto pb-4 pt-2 px-1 snap-x snap-mandatory hide-scrollbar select-none ${
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollBehavior: isDragging ? 'auto' : 'smooth' }}
        >
          {photos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => {
                if (!hasDragged) {
                  setSelectedPhoto(photo);
                }
              }}
              className="w-[280px] sm:w-[320px] shrink-0 snap-start group relative rounded-2xl border border-[#C5A880]/35 bg-[#FFFFFF] hover:border-[#C5A880] p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:ring-2 hover:ring-[#C5A880]/25 overflow-hidden"
            >
              {/* Shimmer / Sheen Reflection Sweep Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none z-20" />

              {/* Realistic Mobile Device Frame */}
              <div className="relative w-full aspect-[4/3] rounded-2xl bg-[#0F0E0D] border-2 border-[#33302B] p-2 shadow-inner overflow-hidden flex flex-col transition-transform duration-300 group-hover:scale-[1.02]">
                {/* Device Camera Punch Hole / Pill */}
                <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-8 h-1.5 bg-[#000000] rounded-full z-10 border border-[#33302B]/60" />

                {/* Simulated Screen Content */}
                <div className="w-full h-full rounded-[14px] overflow-hidden relative">
                  {renderScreenMockup(photo)}
                </div>

                {/* Floating Expand Icon on Hover */}
                <div className="absolute bottom-3 right-3 z-10 opacity-0 group-hover:opacity-100 transition-opacity bg-black/70 backdrop-blur-xs text-[#FAFAFA] text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1 border border-white/20 shadow-md">
                  <Maximize2 className="w-3 h-3 text-[#C5A880]" />
                  <span>Kattints a részletekért</span>
                </div>

                {/* Screen Badge Pill */}
                <span className="absolute top-3 left-3 z-10 text-[9px] font-bold px-2 py-0.5 rounded-full bg-black/70 backdrop-blur-xs text-[#FAFAFA] border border-[#C5A880]/40">
                  {photo.badge}
                </span>
              </div>

              {/* Caption & Metadata */}
              <div className="pt-3.5 space-y-1.5">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7355]">
                    Fotó {idx + 1} / {photos.length} • {photo.tag}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C5A880]" />
                </div>

                <h5 className="font-heading font-bold text-sm text-[#2C2C2C] group-hover:text-[#8C7355] transition-colors leading-snug">
                  {photo.title}
                </h5>

                <p className="text-xs text-[#5C5A56] leading-relaxed line-clamp-2">
                  {photo.subtitle}
                </p>
              </div>

              {/* Bottom Subtle Action Strip */}
              <div className="mt-3 pt-2.5 border-t border-[#F0E6D8] flex items-center justify-between text-[11px] font-semibold text-[#8C7355] group-hover:text-[#2C2C2C]">
                <span>Részletes felület megtekintése</span>
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Progress Dots / Clickable Slide Selectors */}
      <div className="flex items-center justify-center gap-2 pt-1 pb-2">
        {photos.map((_, dotIdx) => (
          <button
            key={dotIdx}
            onClick={() => scrollToIndex(dotIdx)}
            aria-label={`Ugrás a(z) ${dotIdx + 1}. fotóra`}
            className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
              activeIndex === dotIdx
                ? 'w-7 bg-[#8C7355]'
                : 'w-2 bg-[#D9CEC1] hover:bg-[#B8AA99]'
            }`}
          />
        ))}
      </div>

      {/* Lightbox / Expanded Detail Modal */}
      {selectedPhoto && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setSelectedPhoto(null)}
        >
          <div 
            className="bg-[#FFFFFF] border-2 border-[#C5A880] rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-5 bg-gradient-to-r from-[#FAF7F2] to-[#F5EFE6] border-b border-[#E8DFD3] flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#8C7355]">
                  {productName} Rendszerfotó • {selectedPhoto.badge}
                </span>
                <h3 className="font-heading text-lg font-bold text-[#2C2C2C]">
                  {selectedPhoto.title}
                </h3>
              </div>
              <button
                onClick={() => setSelectedPhoto(null)}
                className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#C5A880]/40 flex items-center justify-center text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
                aria-label="Bezárás"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Large Device Mockup */}
            <div className="p-5 sm:p-6 space-y-4">
              <div className="w-full h-64 sm:h-72 rounded-2xl bg-[#0F0E0D] border-2 border-[#33302B] p-2.5 shadow-xl flex flex-col relative">
                {/* Punch Hole */}
                <div className="absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1.5 bg-[#000000] rounded-full z-10 border border-[#33302B]/60" />
                <div className="w-full h-full rounded-[14px] overflow-hidden">
                  {renderScreenMockup(selectedPhoto, true)}
                </div>
              </div>

              {/* Explanatory text */}
              <div className="space-y-2 bg-[#FAF7F2] p-4 rounded-2xl border border-[#C5A880]/30">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
                  Felület leírása:
                </h4>
                <p className="text-xs text-[#5C5A56] leading-relaxed">
                  {selectedPhoto.description}
                </p>
                <div className="pt-2 border-t border-[#E8DFD3]/80 flex items-start gap-2">
                  <ShieldCheck className="w-4 h-4 text-[#2fbe56] shrink-0 mt-0.5" />
                  <span className="text-[11px] font-mono text-[#8C7355]">
                    {selectedPhoto.technicalNote}
                  </span>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#F5F0EB]/60 border-t border-[#E8DFD3] flex justify-end">
              <button
                onClick={() => setSelectedPhoto(null)}
                className="px-5 py-2 rounded-xl bg-[#2C2C2C] text-[#FAFAFA] text-xs font-semibold hover:bg-[#1A1A1A] transition-colors cursor-pointer"
              >
                Bezárás
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
