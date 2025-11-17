'use client';

import { useEffect, useState } from 'react';
import { getStats, clearAnalytics, AnalyticsData } from '@/lib/analytics';
import Link from 'next/link';

export default function StatsPage() {
  const [stats, setStats] = useState<AnalyticsData | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);

  useEffect(() => {
    setStats(getStats());
  }, []);

  const handleClear = () => {
    setShowConfirm(true);
  };

  const confirmClear = () => {
    clearAnalytics();
    setStats(getStats());
    setShowConfirm(false);
  };

  const cancelClear = () => {
    setShowConfirm(false);
  };

  if (!stats) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading stats...</p>
        </div>
      </main>
    );
  }

  const topDepartureCities = Object.entries(stats.departureCities)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Search
            </Link>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-3xl font-bold text-gray-900">
                Local Analytics (Dev/Debug)
              </h1>
              {!showConfirm ? (
                <button
                  onClick={handleClear}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                >
                  Clear All
                </button>
              ) : (
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-700">
                    Are you sure?
                  </span>
                  <button
                    onClick={confirmClear}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors text-sm"
                  >
                    Yes, Clear
                  </button>
                  <button
                    onClick={cancelClear}
                    className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors text-sm"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>

            <p className="text-sm text-gray-600 mb-8">
              These statistics are stored locally in your browser and are not
              shared with anyone.
            </p>

            {/* Total Searches */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Total Searches
              </h2>
              <div className="text-4xl font-bold text-blue-600">
                {stats.totalSearches}
              </div>
            </div>

            {/* Top Departure Cities */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Top Departure Cities
              </h2>
              {topDepartureCities.length === 0 ? (
                <p className="text-gray-500">No departure cities tracked yet.</p>
              ) : (
                <div className="space-y-2">
                  {topDepartureCities.map(([city, count]) => (
                    <div
                      key={city}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{city}</span>
                      <span className="text-blue-600 font-semibold">
                        {count} {count === 1 ? 'search' : 'searches'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Budget Ranges */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Budget Ranges
              </h2>
              <div className="space-y-2">
                {Object.entries(stats.budgetRanges).map(([range, count]) => (
                  <div
                    key={range}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <span className="font-medium text-gray-900">
                      ${range.replace('-', ' - $')}
                    </span>
                    <span className="text-blue-600 font-semibold">
                      {count} {count === 1 ? 'search' : 'searches'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Last Updated */}
            <div className="text-sm text-gray-500">
              Last updated:{' '}
              {new Date(stats.lastUpdated).toLocaleString()}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

