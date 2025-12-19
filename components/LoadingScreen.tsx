'use client';

import { useEffect, useState, useRef } from 'react';
import AdSense from './AdSense';

interface LoadingScreenProps {
  onComplete: () => void;
  minDuration?: number; // Minimum duration in milliseconds (default 10s)
  maxDuration?: number; // Maximum duration in milliseconds (default 30s)
}

export default function LoadingScreen({
  onComplete,
  minDuration = 10000,
  maxDuration = 30000,
}: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const durationRef = useRef(
    Math.random() * (maxDuration - minDuration) + minDuration
  );
  const isLocalhost = typeof window !== 'undefined' && (
    window.location.hostname === 'localhost' || 
    window.location.hostname === '127.0.0.1' ||
    window.location.hostname === '[::1]'
  );

  // Main loading progress timer
  useEffect(() => {
    const duration = durationRef.current;
    const startTime = startTimeRef.current;
    const interval = 100; // Update every 100ms

    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        if (timerRef.current) {
          clearInterval(timerRef.current);
        }
        onComplete();
      }
    }, interval);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [minDuration, maxDuration, onComplete]);

  const handleSkip = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onComplete();
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      
      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
        <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto pointer-events-auto relative">
          {/* Skip button (localhost only) */}
          {isLocalhost && (
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 z-10 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg transition-all"
              title="Skip loading (development only)"
            >
              Skip (Dev)
            </button>
          )}
          <div className="p-6 md:p-8 space-y-6">
            {/* Loading indicator */}
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-purple-200 border-t-purple-600"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-8 h-8 text-purple-600 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                  </svg>
                </div>
              </div>
              <div className="text-center">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                  Searching flights...
                </h2>
                <p className="text-gray-600 text-base md:text-lg">
                  Discovering amazing destinations for you
                </p>
              </div>
            </div>

            {/* Progress bar */}
            <div className="space-y-2">
              <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                <div
                  className="bg-gradient-to-r from-purple-600 to-pink-600 h-3 rounded-full transition-all duration-100 ease-out shadow-md"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-center text-gray-600 text-sm font-medium">
                {Math.round(progress)}% complete
              </p>
            </div>

            {/* Ad Slot */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <div className="aspect-video bg-white rounded-lg flex items-center justify-center border-2 border-dashed border-purple-300 overflow-hidden min-h-[250px]">
                <AdSense 
                  adFormat="auto"
                  className="w-full h-full"
                  showPlaceholder={true}
                />
              </div>
              <p className="text-xs text-gray-500 text-center mt-4 font-medium">
                Ads help keep this service free.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

