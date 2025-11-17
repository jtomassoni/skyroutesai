'use client';

import { useEffect, useRef } from 'react';
import { FlightResult } from '@/lib/searchFlights';
import AdSense from './AdSense';

interface FlightResultsProps {
  results: FlightResult[];
  origin: string;
  showTop10?: boolean;
  onTop10Displayed?: () => void;
}

export default function FlightResults({ results, origin, showTop10 = false, onTop10Displayed }: FlightResultsProps) {
  const top10Ref = useRef<HTMLDivElement>(null);
  const top10 = results.slice(0, 10);
  const remaining = results.slice(10);

  useEffect(() => {
    if (showTop10 && top10Ref.current && onTop10Displayed) {
      // Small delay to ensure animation starts
      const timer = setTimeout(() => {
        onTop10Displayed?.();
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [showTop10, onTop10Displayed]);

  if (results.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-purple-100 to-pink-100 rounded-full flex items-center justify-center mb-4">
            <svg
              className="w-12 h-12 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        <h3 className="text-3xl font-bold mb-3 text-gray-900">
          No flights found
        </h3>
        <p className="text-gray-600 text-lg max-w-md mx-auto">
          Try adjusting your budget or search window to discover more destinations.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center border-b-2 border-gray-200 pb-6">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          {results.length} {results.length === 1 ? 'Destination' : 'Destinations'} Found
        </h2>
        <p className="text-gray-600 text-lg">
          Flights from <span className="font-bold text-gray-900">{origin}</span> within your budget
        </p>
      </div>

      {showTop10 && top10.length > 0 && (
        <div ref={top10Ref} className="space-y-6">
          <div className="mb-8">
            <h3 className="text-3xl font-bold mb-2 text-gray-900">
              Top 10 Destinations
            </h3>
            <p className="text-base text-gray-600">Best deals we found for you</p>
          </div>

          {/* Ad after Top 10 header */}
          <div className="my-6">
            <AdSense adFormat="auto" className="w-full" showPlaceholder={false} />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {top10.map((flight, index) => (
              <div
                key={`top-${flight.destinationCode || flight.destination || 'flight'}-${index}-${flight.price}`}
                className="relative bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all transform hover:-translate-y-1"
              >
                {index < 3 && (
                  <div className="absolute -top-3 -right-3 z-10">
                    <div className={`px-4 py-2 rounded-full text-sm font-bold text-white shadow-lg ${
                      index === 0 ? 'bg-gradient-to-r from-yellow-400 to-yellow-500' :
                      index === 1 ? 'bg-gradient-to-r from-gray-400 to-gray-500' :
                      'bg-gradient-to-r from-orange-400 to-orange-500'
                    }`}>
                      #{index + 1}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-start mb-5">
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-1 text-gray-900">
                      {flight.destination}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{flight.destinationCode}</p>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-3xl font-bold mb-1 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${flight.price}
                    </div>
                    <div className="text-xs text-gray-500 font-medium">{flight.currency}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{flight.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span className="truncate font-medium">{flight.airline}</span>
                  </div>
                  {flight.fareClass && (
                    <div className="flex items-center pt-1">
                      <span className="text-xs bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full font-bold border border-yellow-200">
                        {flight.fareClass}
                      </span>
                    </div>
                  )}
                  {flight.fareClassNote && (
                    <p className="text-xs text-gray-600 italic pt-1">
                      {flight.fareClassNote}
                    </p>
                  )}
                </div>

                <a
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white block w-full text-center text-sm font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Book on {flight.airline}
                </a>
              </div>
            ))}
          </div>
        </div>
      )}

      {(!showTop10 || remaining.length > 0) && (
        <div className={`space-y-6 ${showTop10 ? 'mt-10 pt-10 border-t-2 border-gray-200' : ''}`}>
          {showTop10 && remaining.length > 0 && (
            <>
              <h3 className="text-2xl font-bold mb-6 text-gray-900">
                More Destinations ({remaining.length})
              </h3>
              {/* Ad before more destinations */}
              <div className="my-6">
                <AdSense adFormat="auto" className="w-full" showPlaceholder={false} />
              </div>
            </>
          )}
          <div className={`grid gap-6 md:grid-cols-2 lg:grid-cols-3 ${!showTop10 ? 'max-h-[60vh] overflow-y-auto' : ''}`}>
            {(showTop10 ? remaining : results).map((flight, index) => (
              <div
                key={`${flight.destinationCode || flight.destination || 'flight'}-${index}-${flight.price}`}
                className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-xl hover:border-purple-300 transition-all transform hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-5">
                  <div>
                    <h3 className="text-2xl font-bold mb-1 text-gray-900">
                      {flight.destination}
                    </h3>
                    <p className="text-sm text-gray-500 font-medium">{flight.destinationCode}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${flight.price}
                    </div>
                    <div className="text-xs text-gray-500 mt-0.5 font-medium">{flight.currency}</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="truncate font-medium">{flight.date}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg px-3 py-2">
                    <svg
                      className="w-5 h-5 mr-3 text-purple-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                      />
                    </svg>
                    <span className="truncate font-medium">{flight.airline}</span>
                  </div>
                  {flight.fareClass && (
                    <div className="flex items-center pt-1">
                      <span className="text-xs bg-gradient-to-r from-yellow-100 to-yellow-50 text-yellow-800 px-3 py-1.5 rounded-full font-bold border border-yellow-200">
                        {flight.fareClass}
                      </span>
                    </div>
                  )}
                  {flight.fareClassNote && (
                    <p className="text-xs text-gray-600 italic pt-1">
                      {flight.fareClassNote}
                    </p>
                  )}
                </div>

                <a
                  href={flight.bookingUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white block w-full text-center text-sm font-semibold py-3 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Book on {flight.airline}
                </a>
              </div>
            ))}
          </div>
          
          {/* Ad at bottom of results */}
          <div className="my-8 pt-6 border-t-2 border-gray-200">
            <AdSense adFormat="auto" className="w-full" showPlaceholder={false} />
          </div>
        </div>
      )}
    </div>
  );
}

