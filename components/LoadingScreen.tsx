'use client';

import { useEffect, useState, useRef } from 'react';

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
    <div className="fixed inset-0 bg-gradient-to-br from-blue-50 via-white to-sky-50 z-50 flex flex-col items-center justify-center p-4">
      <div className="max-w-2xl w-full space-y-8">
        {/* Progress Animation */}
        <div className="space-y-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="text-lg font-semibold text-gray-700">
              Searching flights...
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        {/* Placeholder Ad Components */}
        <div className="space-y-4">
          <div className="bg-white rounded-lg shadow-md p-6 border-2 border-dashed border-gray-300">
            <div className="aspect-video bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center text-gray-400">
                <svg
                  className="w-16 h-16 mx-auto mb-2"
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
                <p className="text-sm">Advertisement</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 border-2 border-dashed border-gray-300">
            <div className="h-32 bg-gray-100 rounded flex items-center justify-center">
              <div className="text-center text-gray-400">
                <p className="text-xs">Sponsored Content</p>
              </div>
            </div>
          </div>
        </div>

        {/* Message about ads */}
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Ads help keep this service free.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Finding the best flights for you...
          </p>
        </div>
      </div>
    </div>
  );
}

