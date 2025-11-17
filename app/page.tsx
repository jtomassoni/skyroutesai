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
      } else {
        setResults(apiDataRef.current.results);
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

  const handleSelectSavedSearch = (savedSearch: SavedSearch) => {
    handleSearch({
      origin: savedSearch.origin,
      maxBudget: savedSearch.budget,
      monthsAhead: savedSearch.monthsAhead,
      excludeBasicEconomy: savedSearch.excludeBasicEconomy,
    });
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

          {/* Saved Searches */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
            <SavedSearches onSelectSearch={handleSelectSavedSearch} />
          </div>

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
            <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-8">
              <FlightResults results={results} origin={searchOrigin} />
            </div>
          )}

          {/* FAQ Section */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
              Frequently Asked Questions
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  How does SkyRoutesAI find flights?
                </h3>
                <p className="text-gray-600">
                  SkyRoutesAI searches multiple flight APIs including Amadeus, Kiwi, and Skyscanner to find flights that match your budget and departure city. We show you destinations you can reach within your budget over the next 1-6 months.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Where can I fly for $500 from New York?
                </h3>
                <p className="text-gray-600">
                  Simply enter your departure city (or airport code like "JFK" or "NYC"), set your budget to $500, choose your search window (1-6 months), and click search. We'll show you all destinations within your budget.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Are the prices shown final?
                </h3>
                <p className="text-gray-600">
                  Prices shown are base fares. Final totals with taxes and fees may exceed your budget. We're working on showing full cost breakdowns. Always check the airline's website for the final price before booking.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  What does "Exclude Basic Economy" mean?
                </h3>
                <p className="text-gray-600">
                  Basic Economy fares often have restrictions like no seat selection, no carry-on bags, and no changes or refunds. When enabled, this option filters out basic economy fares to show only standard economy and above.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Do I need to create an account?
                </h3>
                <p className="text-gray-600">
                  No account required! SkyRoutesAI works entirely in your browser. Your saved searches are stored locally on your device using localStorage.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  How do I book a flight?
                </h3>
                <p className="text-gray-600">
                  Click the "Book on airline" link for any flight result. This will take you directly to the airline's website where you can complete your booking. We don't handle bookings or payments.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Why do I see ads during the search?
                </h3>
                <p className="text-gray-600">
                  SkyRoutesAI is free to use and ad-supported. The 10-30 second loading screen helps keep the service free for everyone. You'll see your results after the loading completes.
                </p>
              </div>
              <div>
                <h3 className="text-lg md:text-xl font-semibold text-gray-800 mb-2">
                  Can I search for cheap flights from any city?
                </h3>
                <p className="text-gray-600">
                  Yes! Enter any departure city or airport code (like "LAX", "LHR", "CDG") and we'll search for flights from that location. The service works worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
