'use client';

import { useState, useRef } from 'react';
import SearchForm from '@/components/SearchForm';
import LoadingScreen from '@/components/LoadingScreen';
import FlightResults from '@/components/FlightResults';
import SavedSearches from '@/components/SavedSearches';
import { FlightResult } from '@/lib/searchFlights';
import { saveSearch, SavedSearch } from '@/lib/localStorage';
import { trackSearch } from '@/lib/analytics';
import { FaBullseye, FaSearch, FaCalendarAlt, FaGift, FaDollarSign, FaPlane, FaTicketAlt, FaGlobe, FaClock } from 'react-icons/fa';

// FAQ Accordion Component
function FAQAccordion({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 px-2 flex justify-between items-center hover:bg-gray-50 transition-colors"
        aria-expanded={isOpen}
      >
        <h3 className="text-lg font-semibold text-gray-900 pr-4">{question}</h3>
        <svg
          className={`w-5 h-5 text-gray-500 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isOpen && (
        <div className="px-2 pb-4 text-gray-700">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}

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

            {/* About Section - Compact Cards */}
            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 text-center">Why Use SkyRoutesAI?</h2>
              <p className="text-gray-700 mb-8 text-center max-w-2xl mx-auto px-4">
                Find flights by budget, not destination. Discover amazing places you can actually afford to visit.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border border-blue-200 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3 text-blue-600"><FaBullseye /></div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Budget-First</h3>
                  <p className="text-gray-700 text-sm">Tell us your budget. We show destinations within your range.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border border-purple-200 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3 text-purple-600"><FaSearch /></div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Comprehensive</h3>
                  <p className="text-gray-700 text-sm">Search multiple airlines and platforms simultaneously.</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-5 border border-pink-200 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3 text-pink-600"><FaCalendarAlt /></div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Flexible</h3>
                  <p className="text-gray-700 text-sm">Search up to 6 months ahead for the best deals.</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border border-green-200 hover:shadow-lg transition-shadow">
                  <div className="text-3xl mb-3 text-green-600"><FaGift /></div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Free</h3>
                  <p className="text-gray-700 text-sm">No account needed. No hidden fees. Always free.</p>
                </div>
              </div>
            </div>

            {/* How It Works Section - Mobile Optimized */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">How It Works</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">Three simple steps to find your perfect flight</p>
              <div className="grid sm:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 text-center border-2 border-blue-200">
                  <div className="w-14 h-14 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">1</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Enter Details</h3>
                  <p className="text-gray-700 text-sm">City, budget, and months ahead. We'll search thousands of flights.</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-6 text-center border-2 border-purple-200">
                  <div className="w-14 h-14 bg-purple-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">2</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">AI Search</h3>
                  <p className="text-gray-700 text-sm">We search multiple airlines and platforms to find the best deals.</p>
                </div>
                <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-xl p-6 text-center border-2 border-pink-200">
                  <div className="w-14 h-14 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <span className="text-2xl font-bold text-white">3</span>
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2 text-lg">Discover & Book</h3>
                  <p className="text-gray-700 text-sm">Browse destinations within your budget. Click to book directly.</p>
                </div>
              </div>
            </div>

            {/* Travel Tips Section - Card Grid */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Tips for Best Flight Deals</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">Simple strategies to save money on your next trip</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaCalendarAlt /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Flexible Dates</h3>
                  <p className="text-gray-700 text-sm">Mid-week flights (Tue-Thu) are often 20-30% cheaper. Use our 1-6 month search to compare prices.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaDollarSign /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Realistic Budget</h3>
                  <p className="text-gray-700 text-sm">Add 20-30% for taxes and fees. Budget airlines charge extra for bags and seats.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaPlane /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Nearby Airports</h3>
                  <p className="text-gray-700 text-sm">Compare multiple airports. Flying from JFK vs LGA can save $100+ on the same route.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaTicketAlt /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Skip Basic Economy</h3>
                  <p className="text-gray-700 text-sm">Use our filter to avoid restrictive fares. Basic economy often costs more after fees.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaGlobe /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Off-Season Travel</h3>
                  <p className="text-gray-700 text-sm">Europe is cheaper Oct-Dec and Jan-Mar. Caribbean deals are best May-September.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border-2 border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all">
                  <div className="text-2xl mb-2 text-blue-600"><FaClock /></div>
                  <h3 className="font-bold text-gray-900 mb-2">Book Early</h3>
                  <p className="text-gray-700 text-sm">Best prices: 1-3 months for domestic, 2-4 months for international flights.</p>
                </div>
              </div>
            </div>

            {/* Popular Destinations - Compact Cards */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Popular Budget Destinations</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">Great value destinations from major US cities</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl p-5 border-2 border-orange-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-orange-600" />
                    <h3 className="font-bold text-gray-900">Mexico City</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$200-400 round-trip</p>
                  <p className="text-sm text-gray-700 mb-2">Rich culture, amazing food, historic sites.</p>
                  <p className="text-xs text-gray-600">Best: Oct-Apr</p>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-5 border-2 border-blue-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-blue-600" />
                    <h3 className="font-bold text-gray-900">Lisbon</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$400-600 from East Coast</p>
                  <p className="text-sm text-gray-700 mb-2">Charming European capital, stunning architecture.</p>
                  <p className="text-xs text-gray-600">Best: Shoulder seasons</p>
                </div>
                <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-xl p-5 border-2 border-yellow-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-yellow-600" />
                    <h3 className="font-bold text-gray-900">Bogotá</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$300-500 from major hubs</p>
                  <p className="text-sm text-gray-700 mb-2">Vibrant city, great food and culture.</p>
                  <p className="text-xs text-gray-600">Best: Dec-Mar</p>
                </div>
                <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-5 border-2 border-red-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-red-600" />
                    <h3 className="font-bold text-gray-900">Istanbul</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$500-700</p>
                  <p className="text-sm text-gray-700 mb-2">Where Europe meets Asia, rich history.</p>
                  <p className="text-xs text-gray-600">Best: Spring & Fall</p>
                </div>
                <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-5 border-2 border-green-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-green-600" />
                    <h3 className="font-bold text-gray-900">Guatemala City</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$300-450</p>
                  <p className="text-sm text-gray-700 mb-2">Gateway to Mayan ruins, beautiful landscapes.</p>
                  <p className="text-xs text-gray-600">Best: Nov-Apr</p>
                </div>
                <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-5 border-2 border-purple-200 hover:shadow-xl transition-all">
                  <div className="flex items-center gap-2 mb-2">
                    <FaPlane className="text-2xl text-purple-600" />
                    <h3 className="font-bold text-gray-900">Lima</h3>
                  </div>
                  <p className="text-xs text-gray-600 mb-2 font-medium">$400-600</p>
                  <p className="text-sm text-gray-700 mb-2">World-class food, gateway to Machu Picchu.</p>
                  <p className="text-xs text-gray-600">Best: May-Sep</p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-6 text-center px-4">Prices vary by city, season, and availability. Search for current deals.</p>
            </div>

            {/* Understanding Flight Pricing - Simplified */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Understanding Flight Prices</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">What affects flight costs and what to expect</p>
              
              <div className="grid md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white rounded-xl p-6 border-2 border-gray-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Price Factors</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Demand</p>
                        <p className="text-gray-600 text-xs">Peak seasons = higher prices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Competition</p>
                        <p className="text-gray-600 text-xs">More airlines = lower prices</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Day & Time</p>
                        <p className="text-gray-600 text-xs">Tue/Wed/Sat cheapest; red-eyes cheaper</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <span className="text-blue-500 font-bold">•</span>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">Season</p>
                        <p className="text-gray-600 text-xs">Off-season saves 30-50%</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border-2 border-blue-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg">Base Fare vs. Total</h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">Base Fare</p>
                      <p className="text-gray-600 text-xs">Core ticket price</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">+ Taxes & Fees</p>
                      <p className="text-gray-600 text-xs">$50-150 for international</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-gray-200">
                      <p className="font-semibold text-gray-900 text-sm">+ Baggage</p>
                      <p className="text-gray-600 text-xs">$30-50 per checked bag</p>
                    </div>
                    <div className="bg-blue-100 rounded-lg p-3 border-2 border-blue-300">
                      <p className="font-bold text-gray-900 text-sm">= Total Cost</p>
                      <p className="text-gray-700 text-xs">What you actually pay</p>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 mt-4">SkyRoutesAI shows base fares. Check airline site for final price.</p>
                </div>
              </div>
            </div>

            {/* Best Times to Travel - Compact */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Best Times to Travel</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">When to book for the best deals</p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-50 to-blue-50 rounded-xl p-6 border-2 border-indigo-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                    <FaGlobe className="text-indigo-600" /> International
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Europe</p>
                      <p className="text-gray-600 text-xs">Best: Oct-Dec, Jan-Mar | Avoid: Jun-Aug</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Asia</p>
                      <p className="text-gray-600 text-xs">Best: May-Jun, Sep-Nov | Avoid: Dec-Feb, Jul-Aug</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Latin America</p>
                      <p className="text-gray-600 text-xs">Best: May-Jun, Sep-Nov | Avoid: Dec-Mar</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg flex items-center gap-2">
                    <FaPlane className="text-green-600" /> Domestic
                  </h3>
                  <div className="space-y-3">
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Coast-to-Coast</p>
                      <p className="text-gray-600 text-xs">Best: Jan-Feb, Sep-Oct | Avoid: Holidays, Summer</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Regional</p>
                      <p className="text-gray-600 text-xs">Best: Mid-week, early/late flights | Avoid: Fri-Sun</p>
                    </div>
                    <div className="bg-white rounded-lg p-3">
                      <p className="font-semibold text-gray-900 text-sm">Holidays</p>
                      <p className="text-gray-600 text-xs">Book 2-3 months ahead. Travel on holiday day for savings.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* FAQ Section - Accordion */}
            <div className="mt-12">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">Frequently Asked Questions</h2>
              <p className="text-gray-600 mb-8 text-center text-sm px-4">Quick answers to common questions</p>
              
              <div className="bg-white rounded-2xl shadow-lg border-2 border-gray-200 max-w-3xl mx-auto overflow-hidden">
                <FAQAccordion
                  question="How does SkyRoutesAI find flights?"
                  answer="SkyRoutesAI uses advanced flight search technology to search multiple airlines and booking platforms. We search for flights from your departure city within your specified budget over a 1-6 month period, helping you discover destinations you might not have considered."
                />
                <FAQAccordion
                  question="Where can I fly for $500 from New York?"
                  answer="With a $500 budget from New York, you can often find great deals to destinations across North America, the Caribbean, and even some European cities during off-peak seasons. Use our search tool with a $500 budget to see current available destinations."
                />
                <FAQAccordion
                  question="Are the prices shown final?"
                  answer="The prices shown are base fares. Final prices may include taxes, fees, and additional charges that vary by airline and destination. Always check the final price on the airline or booking site before purchasing."
                />
                <FAQAccordion
                  question="Do I need to create an account?"
                  answer="No account required! SkyRoutesAI is completely free to use. Your searches are saved locally in your browser for convenience, but you can use the service without any registration."
                />
                <FAQAccordion
                  question="What's the difference between basic economy and regular economy?"
                  answer="Basic economy fares are the cheapest option but come with restrictions like no seat selection, no carry-on bags (only personal items), and no ticket changes. Regular economy includes these amenities. Use our 'Exclude Basic Economy' filter if you prefer more flexibility."
                />
                <FAQAccordion
                  question="How far in advance should I book?"
                  answer="Generally, booking 1-3 months in advance offers the best balance of price and availability. However, prices vary by destination and season. Our tool searches up to 6 months ahead, giving you flexibility to find the best deals."
                />
                <FAQAccordion
                  question="Can I search for round-trip flights?"
                  answer="Currently, SkyRoutesAI focuses on one-way flights to help you discover destinations within your budget. Once you find a destination, you can use the booking links to search for round-trip options on airline or travel booking sites."
                />
                <FAQAccordion
                  question="What is the cheapest day to fly?"
                  answer="Generally, Tuesday, Wednesday, and Saturday are the cheapest days to fly. Friday and Sunday are typically the most expensive due to business and leisure travel demand. Red-eye flights (late night/early morning) are also often cheaper than daytime flights."
                />
                <FAQAccordion
                  question="How do I know if a flight price is a good deal?"
                  answer="Compare prices across multiple dates and airlines. If a price seems unusually low, check for restrictions like non-refundable tickets or long layovers. Use our search tool to see a range of prices over 1-6 months to identify when prices are lowest for your route."
                />
                <FAQAccordion
                  question="Are budget airlines worth it?"
                  answer="Budget airlines can offer significant savings, but be aware of additional fees for baggage, seat selection, and even printing your boarding pass. If you're traveling light and don't need flexibility, budget airlines can be great value. Use our 'Exclude Basic Economy' filter if you prefer more amenities."
                />
                <FAQAccordion
                  question="How do I avoid hidden fees?"
                  answer="Read the fare rules carefully before booking. Check what's included: baggage allowance, seat selection, changes, and cancellations. Budget for checked bags ($30-50 each way), seat selection ($10-50), and any other services you need. The final price on the airline's website will show all fees before you pay."
                />
                <FAQAccordion
                  question="What if my flight is cancelled or delayed?"
                  answer="Airlines are required to provide compensation or rebooking for significant delays or cancellations, especially for international flights. Check your airline's policy and consider travel insurance for expensive trips. Keep all documentation and contact the airline directly if issues arise."
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
