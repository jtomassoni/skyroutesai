'use client';

import { FlightResult } from '@/lib/searchFlights';

interface FlightResultsProps {
  results: FlightResult[];
  origin: string;
}

export default function FlightResults({ results, origin }: FlightResultsProps) {
  if (results.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <svg
            className="w-16 h-16 mx-auto text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No flights found
        </h3>
        <p className="text-gray-600">
          Try adjusting your budget or search window.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Found {results.length} {results.length === 1 ? 'flight' : 'flights'}
        </h2>
        <p className="text-gray-600">
          Flights from {origin} within your budget
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {results.map((flight, index) => (
          <div
            key={`${flight.destinationCode || flight.destination || 'flight'}-${index}-${flight.price}`}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 border border-gray-200"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">
                  {flight.destination}
                </h3>
                <p className="text-sm text-gray-500">{flight.destinationCode}</p>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-blue-600">
                  ${flight.price}
                </div>
                <div className="text-xs text-gray-500">{flight.currency}</div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
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
                {flight.date}
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <svg
                  className="w-4 h-4 mr-2"
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
                {flight.airline}
              </div>
              {flight.fareClass && (
                <div className="flex items-center text-sm text-gray-600">
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {flight.fareClass}
                  </span>
                </div>
              )}
              {flight.fareClassNote && (
                <p className="text-xs text-amber-600 italic">
                  {flight.fareClassNote}
                </p>
              )}
            </div>

            <a
              href={flight.bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-center font-semibold py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Book on {flight.airline}
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

