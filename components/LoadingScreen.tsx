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
  const durationRef = useRef(
    Math.random() * (maxDuration - minDuration) + minDuration
  );

  // Main loading progress timer
  useEffect(() => {
    const duration = durationRef.current;
    const startTime = startTimeRef.current;
    const interval = 100; // Update every 100ms

    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (elapsed >= duration) {
        clearInterval(timer);
        onComplete();
      }
    }, interval);

    return () => clearInterval(timer);
  }, [minDuration, maxDuration, onComplete]);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500 z-50 flex flex-col items-center justify-center p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute top-60 -left-40 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl"></div>
      </div>

      {/* Main loading content */}
      <div className="relative max-w-2xl w-full space-y-8">
        <div className="space-y-6">
          <div className="flex flex-col items-center space-y-4">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-white/20 border-t-white"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-8 h-8 text-white animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </div>
            </div>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-white mb-2">
                Searching flights...
              </h2>
              <p className="text-white/80 text-lg">
                Discovering amazing destinations for you
              </p>
            </div>
          </div>

          {/* Ad Slot */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border-2 border-dashed border-white/30">
            <div className="aspect-video bg-gradient-to-br from-purple-50/20 to-pink-50/20 rounded-xl flex items-center justify-center border-2 border-dashed border-white/40 overflow-hidden min-h-[250px]">
              <AdSense 
                adFormat="auto"
                className="w-full h-full"
                showPlaceholder={true}
              />
            </div>
            <p className="text-xs text-white/60 text-center mt-4 font-medium">
              Ads help keep this service free.
            </p>
          </div>

          <div className="w-full bg-white/20 rounded-full h-3 shadow-inner backdrop-blur-sm">
            <div
              className="bg-gradient-to-r from-yellow-300 via-white to-yellow-300 h-3 rounded-full transition-all duration-100 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p className="text-center text-white/70 text-sm font-medium">
            {Math.round(progress)}% complete
          </p>
        </div>
      </div>
    </div>
  );
}

