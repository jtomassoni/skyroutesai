'use client';

import { useEffect, useState, useRef } from 'react';

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
  const [isInitialized, setIsInitialized] = useState(false);
  const initializedRef = useRef(false);
  const adElementId = useRef(`adsense-${Math.random().toString(36).substr(2, 9)}`);
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]'
  );

  useEffect(() => {
    // Check if script already exists (loaded in layout.tsx)
    const existingScript = document.querySelector('script[src*="adsbygoogle"]');
    if (existingScript) {
      setIsLoaded(true);
      return;
    }

    // Fallback: Load script if not already loaded
    const script = document.createElement('script');
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${AD_CLIENT}`;
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.onload = () => setIsLoaded(true);
    script.onerror = () => {
      console.warn('AdSense script failed to load');
    };
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    // Wait for script to load and element to be in DOM
    if (!isLoaded || initializedRef.current) return;

    // Use setTimeout to ensure DOM is ready
    const timer = setTimeout(() => {
      const adElement = document.getElementById(adElementId.current);
      if (!adElement) {
        console.warn('AdSense element not found in DOM');
        return;
      }

      try {
        // Initialize ad - this must happen after the <ins> element is rendered
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
        initializedRef.current = true;
        setIsInitialized(true);
        
        if (isLocalhost) {
          console.log('AdSense initialized. Note: Ads do not display on localhost. They will work on production (skyroutesai.com).');
        }
      } catch (err) {
        console.error('AdSense initialization error:', err);
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [isLoaded, adSlot, isLocalhost]);

  // Show placeholder if script hasn't loaded yet
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
    <>
      <ins
        id={adElementId.current}
        className={`adsbygoogle ${className}`}
        style={{
          display: 'block',
          minHeight: '250px',
          ...style,
        }}
        data-ad-client={AD_CLIENT}
        data-ad-slot={adSlot}
        data-ad-format={adFormat}
        data-full-width-responsive="true"
      />
      {isLocalhost && isInitialized && (
        <div className="text-xs text-white/50 text-center mt-2 italic">
          (Ads don't display on localhost - will work on production)
        </div>
      )}
    </>
  );
}

