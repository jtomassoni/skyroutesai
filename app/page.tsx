'use client';

import { useState, useRef } from 'react';
import SearchForm from '@/components/SearchForm';
import LoadingScreen from '@/components/LoadingScreen';
import FlightResults from '@/components/FlightResults';
import { FlightResult } from '@/lib/searchFlights';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FlightResult[] | null>(null);
  const [searchOrigin, setSearchOrigin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const apiDataRef = useRef<{
    results: FlightResult[] | null;
    error: string | null;
  } | null>(null);

  const handleSearch = async (params: {
    origin: string;
    maxBudget: number;
    monthsAhead: number;
    excludeBasicEconomy: boolean;
  }) => {
    setError(null);
    setResults(null);
    setSearchOrigin(params.origin);
    setIsLoading(true);
    apiDataRef.current = null;

    // Start API call in parallel
    const apiCall = fetch('/api/search-flights', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(params),
    })
      .then(async (response) => {
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Failed to search flights');
        }
        return data.results || [];
      })
      .catch((err) => {
        return {
          error: err instanceof Error ? err.message : 'An error occurred while searching',
        };
      })
      .then((data) => {
        apiDataRef.current = Array.isArray(data)
          ? { results: data, error: null }
          : { results: null, error: data.error };
      });
  };

  const handleLoadingComplete = () => {
    setIsLoading(false);
    // Apply the API results after loading completes
    if (apiDataRef.current) {
      if (apiDataRef.current.error) {
        setError(apiDataRef.current.error);
      } else {
        setResults(apiDataRef.current.results);
      }
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      {/* Hero Section - Above the fold */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              SkyRoutes<span className="text-blue-600">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Where can you fly from your departure city within your budget over
              the next 1–6 months?
            </p>
          </div>

          {/* Hero Image Placeholder */}
          {!results && (
            <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://picsum.photos/1200/400?random=1"
                alt="Airplane window view"
                className="w-full h-48 md:h-64 object-cover"
              />
            </div>
          )}

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <SearchForm onSearch={handleSearch} />
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-8">
              <p className="font-semibold">Error</p>
              <p>{error}</p>
            </div>
          )}

          {/* Results */}
          {results && (
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
              <FlightResults results={results} origin={searchOrigin} />
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
