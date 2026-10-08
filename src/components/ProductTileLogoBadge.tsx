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
      {/* Outer subtle glow/ring - increased by 15% */}
      <div className="w-[65px] h-[65px] sm:w-[74px] sm:h-[74px] lg:w-[92px] lg:h-[92px] rounded-full p-1 bg-gradient-to-br from-[#EBDCCB] via-[#FFFFFF] to-[#C5A880]/50 border-2 border-[#C5A880]/60 shadow-sm transition-all duration-300 group-hover:shadow-md group-hover:scale-105 group-hover:border-[#A38053] flex items-center justify-center">
        <div className="w-full h-full rounded-full overflow-hidden bg-white flex items-center justify-center shadow-inner relative">
          {!imageError ? (
            <img
              src={logoSrc}
              alt={`${label} logo`}
              className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-110"
              onError={handleImageError}
            />
          ) : (
            /* Elegant Placeholder when user has not yet uploaded the logo */
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-[#FAF7F2] to-[#F5EFE6] text-[#8C7355] p-1 text-center select-none">
              {productKey === 'senear' ? (
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-[#A38053]" />
              ) : (
                <Smartphone className="w-6 h-6 sm:w-7 sm:h-7 text-[#A38053]" />
              )}
              <span className="text-[10px] sm:text-[11px] font-bold font-mono tracking-tighter uppercase text-[#5C5A56] mt-0.5 leading-none">
                {productKey}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
