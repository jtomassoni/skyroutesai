'use client';

import { useState, useRef } from 'react';
import SearchForm from '@/components/SearchForm';
import LoadingScreen from '@/components/LoadingScreen';
import FlightResults from '@/components/FlightResults';
import SavedSearches from '@/components/SavedSearches';
import { FlightResult } from '@/lib/searchFlights';
import { saveSearch, SavedSearch } from '@/lib/localStorage';
import { trackSearch } from '@/lib/analytics';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<FlightResult[] | null>(null);
  const [searchOrigin, setSearchOrigin] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [showTop10, setShowTop10] = useState(false);
  const [allowScroll, setAllowScroll] = useState(false);
  const apiDataRef = useRef<{
    results: FlightResult[] | null;
    error: string | null;
  } | null>(null);
  const searchParamsRef = useRef<{
    origin: string;
    maxBudget: number;
    monthsAhead: number;
    excludeBasicEconomy: boolean;
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
    setShowTop10(false);
    setAllowScroll(false);
    apiDataRef.current = null;
    searchParamsRef.current = params;

    // Start API call in parallel
    fetch('/api/search-flights', {
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
        setAllowScroll(true); // Allow scroll even on error
      } else {
        setResults(apiDataRef.current.results);
        // Show top 10 first, then allow scrolling
        setShowTop10(true);
        // Save search and track analytics if successful
        if (
          apiDataRef.current.results &&
          apiDataRef.current.results.length > 0 &&
          searchParamsRef.current
        ) {
          try {
            saveSearch({
              origin: searchParamsRef.current.origin,
              budget: searchParamsRef.current.maxBudget,
              monthsAhead: searchParamsRef.current.monthsAhead,
              excludeBasicEconomy: searchParamsRef.current.excludeBasicEconomy,
            });
            // Track analytics
            trackSearch(
              searchParamsRef.current.origin,
              searchParamsRef.current.maxBudget
            );
          } catch (error) {
            // Silently fail - saving search is not critical
            console.error('Failed to save search:', error);
          }
        }
      }
    }
  };

  const handleTop10Displayed = () => {
    // After top 10 is displayed, allow scrolling
    setTimeout(() => {
      setAllowScroll(true);
    }, 500); // Small delay to ensure animation is visible
  };

  const handleSelectSavedSearch = (savedSearch: SavedSearch) => {
    handleSearch({
      origin: savedSearch.origin,
      maxBudget: savedSearch.budget,
      monthsAhead: savedSearch.monthsAhead,
      excludeBasicEconomy: savedSearch.excludeBasicEconomy,
    });
  };

  return (
    <main 
      className="min-h-screen bg-gray-50"
    >
      {isLoading && <LoadingScreen onComplete={handleLoadingComplete} />}

      <div className="relative z-10">
        {/* Hero Section */}
        <div className="relative overflow-hidden min-h-screen flex items-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-500">
          {/* Hero Image Background */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: 'url(/hero.png)',
            }}
          >
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50"></div>
          </div>
          
          {/* Saved Searches - Top right corner */}
          <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
            <SavedSearches onSelectSearch={handleSelectSavedSearch} />
          </div>

          {/* Content */}
          <div className="relative z-10 container mx-auto px-4 py-8 md:py-12 w-full">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-4 md:mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-3 leading-tight drop-shadow-lg">
                  It's time to{' '}
                  <span className="text-yellow-300">Travel</span>
                </h1>
                <p className="text-base md:text-lg lg:text-xl text-white/95 max-w-2xl mx-auto px-2 drop-shadow-md">
                  Search for amazing flight deals. Discover extraordinary destinations within your budget.
                </p>
              </div>

              {/* Search Form Card */}
              <div className="glass-effect rounded-2xl shadow-2xl p-4 md:p-6 border border-white/30 max-w-2xl mx-auto backdrop-blur-md bg-white/95">
                <SearchForm onSearch={handleSearch} />
              </div>
            </div>
          </div>
        </div>

        {/* Results Section */}
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            {error && (
              <div className="bg-red-50 border-2 border-red-200 rounded-xl px-6 py-4 mb-6 shadow-sm">
                <div className="flex items-start gap-3">
                  <svg className="w-6 h-6 text-red-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <p className="font-semibold text-red-900 mb-1">Unable to search flights</p>
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              </div>
            )}

            {results && (
              <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
                <FlightResults 
                  results={results} 
                  origin={searchOrigin} 
                  showTop10={showTop10}
                  onTop10Displayed={handleTop10Displayed}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
