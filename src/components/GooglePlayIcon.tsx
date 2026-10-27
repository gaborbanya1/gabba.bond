import React from 'react';

interface GooglePlayIconProps {
  className?: string;
  size?: number;
  color?: 'multicolor' | 'white';
}

/**
 * Official Google Play brand triangle symbol (supports multi-color or monochrome white)
 */
export function GooglePlayIcon({ className = "w-5 h-5", size, color = 'white' }: GooglePlayIconProps) {
  if (color === 'white') {
    return (
      <svg
        viewBox="0 0 512 512"
        className={className}
        style={size ? { width: size, height: size } : undefined}
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
      >
        <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9.0.2z" fill="currentColor" />
        <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="currentColor" />
        <path d="M471.2 230.1l-85.8-49.3-60.1 59.9 60.1 59.9 86-49.4c14.6-8.4 23.3-21.7 23.3-37.4s-8.9-29-23.5-33.7z" fill="currentColor" />
        <path d="M104.6 499l280.8-161.2-60.1-59.9L104.6 499z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 512 512"
      className={className}
      style={size ? { width: size, height: size } : undefined}
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M325.3 234.3L104.6 13l280.8 161.2-60.1 59.9.0.2z" fill="#EA4335" />
      <path d="M47 0C34 6.8 25.3 19.2 25.3 35.3v441.3c0 16.1 8.7 28.5 21.7 35.3l256.6-256L47 0z" fill="#4285F4" />
      <path d="M471.2 230.1l-85.8-49.3-60.1 59.9 60.1 59.9 86-49.4c14.6-8.4 23.3-21.7 23.3-37.4s-8.9-29-23.5-33.7z" fill="#FBBC04" />
      <path d="M104.6 499l280.8-161.2-60.1-59.9L104.6 499z" fill="#34A853" />
    </svg>
  );
}
