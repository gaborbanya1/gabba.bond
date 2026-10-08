import { useState } from 'react';
import { X, Check, Copy, Download, Sparkles, ShieldCheck } from 'lucide-react';
import { GabbaLabsLogo, GabbaMark } from './GabbaLabsLogo';

interface BrandIdentityModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function BrandIdentityModal({ isOpen, onClose }: BrandIdentityModalProps) {
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null);

  if (!isOpen) return null;

  const copySvgCode = (name: string, svgContent: string) => {
    navigator.clipboard.writeText(svgContent);
    setCopiedVariant(name);
    setTimeout(() => setCopiedVariant(null), 2500);
  };

  const markSvgString = `<svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="44" stroke="#BA9356" stroke-width="9" />
  <path d="M 67.5 35 A 26 26 0 1 0 76 50 L 50 50" stroke="#BA9356" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" />
</svg>`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-[#2C2C2C]/70 backdrop-blur-xs">
      <div 
        className="relative w-full max-w-4xl bg-[#FFFFFF] rounded-2xl border border-[#C5A880]/50 shadow-2xl overflow-hidden my-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="brand-modal-title"
      >
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-[#F5F0EB] border-b border-[#C5A880]/30">
          <div className="flex items-center gap-3">
            <GabbaMark size={28} color="#BA9356" />
            <div>
              <h3 id="brand-modal-title" className="font-heading font-bold text-lg text-[#2C2C2C]">
                Official Gabba Labs Brand Identity & Logo Suite
              </h3>
              <p className="text-xs text-[#5C5A56]">
                Vector-accurate system implemented from the official Gabba Labs identity guidelines
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-lg text-[#5C5A56] hover:text-[#2C2C2C] hover:bg-[#FAF7F2] transition-colors cursor-pointer"
            aria-label="Close brand suite"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content Grid displaying all 6 variations from the uploaded image */}
        <div className="p-6 sm:p-8 space-y-6 max-h-[75vh] overflow-y-auto">
          
          <div className="flex items-center justify-between">
            <p className="text-xs sm:text-sm text-[#5C5A56]">
              All 6 variations from your logo set are programmatically active across the application:
            </p>
            <button
              onClick={() => copySvgCode('Raw Mark', markSvgString)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#FAF7F2] border border-[#C5A880]/40 text-xs font-semibold text-[#2C2C2C] hover:bg-[#F5F0EB] transition-colors cursor-pointer"
            >
              {copiedVariant === 'Raw Mark' ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-emerald-700">Copied Mark SVG!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5 text-[#A38053]" />
                  <span>Copy Mark SVG</span>
                </>
              )}
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            
            {/* 1. Stacked Light (Top-Left in uploaded image) */}
            <div className="bg-[#FAF9F6] rounded-2xl border border-[#E8DFD3] p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8C7355] self-start">
                01 • Stacked Light
              </span>
              <div className="py-4">
                <GabbaLabsLogo variant="stacked" size="md" />
              </div>
              <span className="text-[11px] text-[#6E6B65]">Top-Left Variant</span>
            </div>

            {/* 2. Horizontal with Divider (Top-Middle in uploaded image) */}
            <div className="bg-[#F5F0EB] rounded-2xl border border-[#C5A880]/40 p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8C7355] self-start">
                02 • Primary Horizontal
              </span>
              <div className="py-6">
                <GabbaLabsLogo variant="horizontal" size="md" />
              </div>
              <span className="text-[11px] text-[#6E6B65]">Top-Middle Variant (Main Header)</span>
            </div>

            {/* 3. Stacked Pure White (Top-Right in uploaded image) */}
            <div className="bg-[#FFFFFF] rounded-2xl border border-[#E8DFD3] p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8C7355] self-start">
                03 • Clean Editorial
              </span>
              <div className="py-4">
                <GabbaLabsLogo variant="stacked" size="md" />
              </div>
              <span className="text-[11px] text-[#6E6B65]">Top-Right Variant</span>
            </div>

            {/* 4. Dark Horizontal (Bottom-Left in uploaded image) */}
            <div className="bg-[#242526] rounded-2xl border border-[#3A3B3C] p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#C5A880] self-start">
                04 • Dark Inverted
              </span>
              <div className="py-6">
                <GabbaLabsLogo variant="dark" size="md" />
              </div>
              <span className="text-[11px] text-[#A0A0A0]">Bottom-Left Variant</span>
            </div>

            {/* 5. Monochrome Charcoal (Bottom-Middle in uploaded image) */}
            <div className="bg-[#FAFAFA] rounded-2xl border border-[#E8DFD3] p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#5C5A56] self-start">
                05 • Monochrome Charcoal
              </span>
              <div className="py-4">
                <GabbaLabsLogo variant="monochrome" size="md" />
              </div>
              <span className="text-[11px] text-[#6E6B65]">Bottom-Middle Variant</span>
            </div>

            {/* 6. Rounded-Square App Icon (Bottom-Right in uploaded image) */}
            <div className="bg-[#F5F0EB] rounded-2xl border border-[#E8DFD3] p-8 flex flex-col items-center justify-between min-h-[220px] shadow-2xs">
              <span className="text-[10px] font-mono font-semibold uppercase tracking-wider text-[#8C7355] self-start">
                06 • App Icon & Badge
              </span>
              <div className="py-5">
                <GabbaLabsLogo variant="app-icon" size="lg" className="rounded-2xl shadow-sm" />
              </div>
              <span className="text-[11px] text-[#6E6B65]">Bottom-Right Variant</span>
            </div>

          </div>

          {/* Color Specifications */}
          <div className="p-4 rounded-xl bg-[#FAF7F2] border border-[#E8DFD3] space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C2C2C]">
              Brand Color Specifications
            </h4>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#BA9356] border border-black/10 shrink-0" />
                <div>
                  <span className="font-bold text-[#2C2C2C] block">Gold Accent</span>
                  <span className="font-mono text-[10px] text-[#6E6B65]">#BA9356</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#222222] border border-black/10 shrink-0" />
                <div>
                  <span className="font-bold text-[#2C2C2C] block">Charcoal Text</span>
                  <span className="font-mono text-[10px] text-[#6E6B65]">#222222</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#F5F0EB] border border-[#C5A880]/30 shrink-0" />
                <div>
                  <span className="font-bold text-[#2C2C2C] block">Soft Beige</span>
                  <span className="font-mono text-[10px] text-[#6E6B65]">#F5F0EB</span>
                </div>
              </div>

              <div className="p-2.5 rounded-lg bg-[#FFFFFF] border border-[#E8DFD3] flex items-center gap-2">
                <span className="w-5 h-5 rounded-md bg-[#FAFAFA] border border-[#E8DFD3] shrink-0" />
                <div>
                  <span className="font-bold text-[#2C2C2C] block">Warm White</span>
                  <span className="font-mono text-[10px] text-[#6E6B65]">#FAFAFA</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-[#F5F0EB] border-t border-[#C5A880]/30 flex items-center justify-between">
          <span className="text-xs text-[#6E6B65]">Gabba Labs • Vector Asset System</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#2C2C2C] hover:bg-[#1A1A1A] text-[#FAFAFA] text-xs font-semibold cursor-pointer"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
