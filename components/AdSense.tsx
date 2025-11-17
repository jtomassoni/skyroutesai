'use client';

import { useEffect, useState } from 'react';

interface AdSenseProps {
  adSlot?: string;
  adFormat?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
  style?: React.CSSProperties;
  className?: string;
  showPlaceholder?: boolean;
}

const AD_CLIENT = 'ca-pub-3373780887120786';
const DEFAULT_AD_SLOT = '5796972379';

export default function AdSense({ 
  adSlot = DEFAULT_AD_SLOT, 
  adFormat = 'auto',
  style,
  className = '',
  showPlaceholder = true
}: AdSenseProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check if script already exists
    if (document.querySelector('script[src*="adsbygoogle"]')) {
      setIsLoaded(true);
      return;
    }

    // Load Google AdSense script
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => setIsLoaded(true);
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;

    try {
      // Initialize ad
      ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
    } catch (err) {
      console.error('AdSense error:', err);
    }
  }, [isLoaded, adSlot]);

  // Show placeholder if ads haven't loaded yet
  if (!isLoaded && showPlaceholder) {
    return (
      <div className={`flex items-center justify-center ${className}`} style={style}>
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-3 bg-gradient-to-br from-purple-500/80 to-pink-500/80 rounded-xl flex items-center justify-center shadow-lg">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
          </div>
          <p className="text-sm font-bold text-white/90">Advertisement</p>
          <p className="text-xs mt-1 text-white/70 font-medium">Sponsored Content</p>
        </div>
      </div>
    );
  }

  return (
    <ins
      className={`adsbygoogle ${className}`}
      style={{
        display: 'block',
        ...style,
      }}
      data-ad-client={AD_CLIENT}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive="true"
    />
  );
}

