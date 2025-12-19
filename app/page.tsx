'use client';

import DonateButton from '@/components/DonateButton';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-4 py-12">
        <div className="max-w-2xl w-full text-center space-y-8">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full blur-2xl opacity-50 animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-full p-6 shadow-2xl">
                <div className="w-16 h-16 flex items-center justify-center">
                  <span className="text-4xl">✨</span>
                </div>
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4">
            SkyRoutes<span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">AI</span>
          </h1>

          {/* Subtitle */}
          <p className="text-2xl md:text-3xl text-gray-700 font-semibold mb-6">
            Coming Soon
          </p>

          {/* Description */}
          <p className="text-lg md:text-xl text-gray-600 max-w-xl mx-auto leading-relaxed">
            Something new is on the way.
          </p>

          {/* Support Link */}
          <div className="pt-12 border-t border-gray-200 mt-12">
            <DonateButton />
          </div>
        </div>
      </div>
    </div>
  );
}
