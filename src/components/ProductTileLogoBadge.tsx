import React, { useState } from 'react';
import { Smartphone, Sparkles, Image as ImageIcon } from 'lucide-react';

interface ProductTileLogoBadgeProps {
  productKey: 'senear' | 'junear';
  label: string;
}

export function ProductTileLogoBadge({ productKey, label }: ProductTileLogoBadgeProps) {
  const [imageError, setImageError] = useState(false);
  const [currentExtensionIndex, setCurrentExtensionIndex] = useState(0);

  const extensions = ['png', 'svg', 'jpg', 'jpeg', 'webp'];
  const currentExt = extensions[currentExtensionIndex] || 'png';
  const logoSrc = `/logos/${productKey}-logo.${currentExt}`;
  const uploadPath = `public/logos/${productKey}-logo.png`;

  const handleImageError = () => {
    if (currentExtensionIndex < extensions.length - 1) {
      setCurrentExtensionIndex(prev => prev + 1);
    } else {
      setImageError(true);
    }
  };

  return (
    <div className="relative group shrink-0" title={`Logo: ${uploadPath}`}>
      {/* Outer subtle glow/ring */}
      <div className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 rounded-full p-1 bg-gradient-to-br from-[#EBDCCB] via-[#FFFFFF] to-[#C5A880]/50 border-2 border-[#C5A880]/60 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:border-[#A38053] flex items-center justify-center">
        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center shadow-inner relative">
          {!imageError ? (
            <img
              src={logoSrc}
              alt={`${label} logo`}
              className="w-full h-full object-contain p-1.5 transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            /* Elegant Placeholder when user has not yet uploaded the logo */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] text-[#8C7355] p-1 text-center select-none">
              {productKey === 'senear' ? (
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-[#A38053]" />
              ) : (
                <Smartphone className="w-5 h-5 sm:w-6 sm:h-6 text-[#A38053]" />
              )}
              <span className="text-[9px] sm:text-[10px] font-bold font-mono tracking-tighter uppercase text-[#5C5A56] mt-0.5 leading-none">
                {productKey}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Floating Mini Badge Indicator */}
      <div className="absolute -bottom-1 -right-1 px-1.5 py-0.5 bg-[#2C2C2C] text-[#FAFAFA] text-[9px] font-bold rounded-full border border-white/80 shadow-xs uppercase tracking-wider scale-90 sm:scale-100">
        Logo
      </div>
    </div>
  );
}
