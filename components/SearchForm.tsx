'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { searchAirports, validateAirport, type Airport } from '@/lib/airports';
import { useAuth } from '@/lib/authContext';
import { FaExclamationCircle } from 'react-icons/fa';

interface SearchFormProps {
  onSearch: (params: {
    origin: string;
    maxBudget: number;
    monthsAhead: number;
    excludeBasicEconomy: boolean;
  }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const { user, isLoading: authLoading } = useAuth();
  const [origin, setOrigin] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [monthsAhead, setMonthsAhead] = useState(3);
  const [excludeBasicEconomy, setExcludeBasicEconomy] = useState(false);
  const [suggestions, setSuggestions] = useState<Airport[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedAirport, setSelectedAirport] = useState<Airport | null>(null);
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleOriginChange = (value: string) => {
    setOrigin(value);
    setSelectedAirport(null);
    
    if (value.trim().length === 0) {
      setSuggestions([]);
      setShowSuggestions(false);
      setIsValid(true);
      return;
    }

    const validation = validateAirport(value);
    setIsValid(validation.valid || value.trim().length < 2);

    if (value.trim().length >= 2) {
      const results = searchAirports(value);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSelectAirport = (airport: Airport) => {
    setOrigin(`${airport.city} (${airport.code})`);
    setSelectedAirport(airport);
    setSuggestions([]);
    setShowSuggestions(false);
    setIsValid(true);
    inputRef.current?.blur();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(maxBudget);
    
    // Use selected airport code if available, otherwise validate the input
    let originCode = origin.trim();
    if (selectedAirport) {
      originCode = selectedAirport.code;
    } else {
      const validation = validateAirport(origin);
      if (!validation.valid || !validation.code) {
        setIsValid(false);
        return;
      }
      originCode = validation.code;
    }

    if (!originCode || isNaN(budget) || budget <= 0) {
      return;
    }

    setIsValid(true);
    onSearch({
      origin: originCode,
      maxBudget: budget,
      monthsAhead,
      excludeBasicEconomy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-4 md:space-y-5">
      {!authLoading && !user && (
        <div className="bg-blue-50 border-2 border-blue-300 rounded-xl p-3 md:p-4 mb-2">
          <div className="flex items-start gap-2">
            <FaExclamationCircle className="text-blue-600 text-sm md:text-base flex-shrink-0 mt-0.5" />
            <p className="text-xs md:text-sm text-blue-800">
              <strong>Note:</strong> You'll see sample results. <Link href="/signup" className="underline font-semibold hover:text-blue-900">Sign up free</Link> for real-time flight data.
            </p>
          </div>
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 lg:gap-6">
        <div className="space-y-2 md:space-y-3">
          <label htmlFor="origin" className="block text-sm font-semibold text-gray-800">
            From
          </label>
          <div className="relative">
            <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <input
              ref={inputRef}
              id="origin"
              type="text"
              value={origin}
              onChange={(e) => handleOriginChange(e.target.value)}
              onFocus={() => {
                if (suggestions.length > 0) {
                  setShowSuggestions(true);
                }
              }}
              placeholder="Departure city or airport"
              className={`w-full pl-10 md:pl-12 pr-3 md:pr-4 py-3 md:py-3.5 lg:py-4 text-base md:text-lg border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all ${!isValid ? 'border-red-400 bg-red-50' : 'border-gray-200 bg-white hover:border-gray-300'}`}
              required
            />
            {!isValid && origin.trim().length > 0 && (
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            )}
            {showSuggestions && suggestions.length > 0 && (
              <div
                ref={suggestionsRef}
                className="absolute z-50 w-full mt-2 bg-white border-2 border-gray-200 rounded-xl shadow-2xl max-h-64 overflow-y-auto"
              >
                {suggestions.map((airport, index) => (
                  <button
                    key={`${airport.code}-${index}`}
                    type="button"
                    onClick={() => handleSelectAirport(airport)}
                    className="w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors border-b border-gray-100 last:border-b-0 first:rounded-t-xl last:rounded-b-xl"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-base text-gray-900">{airport.code}</span>
                          <span className="text-sm text-gray-600">{airport.city}</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{airport.name}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
            {!isValid && origin.trim().length > 0 && (
              <p className="absolute -bottom-6 left-0 text-xs text-red-500 mt-1 font-medium">
                Please select a valid airport
              </p>
            )}
          </div>
        </div>

        <div className="space-y-2 md:space-y-3">
          <label htmlFor="budget" className="block text-sm font-semibold text-gray-800">
            Budget
          </label>
          <div className="relative">
            <div className="absolute left-3 md:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
              <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <input
              id="budget"
              type="number"
              min="1"
              step="1"
              value={maxBudget}
              onChange={(e) => setMaxBudget(e.target.value)}
              placeholder="500"
              className="w-full pl-10 md:pl-12 pr-14 md:pr-16 py-3 md:py-3.5 lg:py-4 text-base md:text-lg border-2 border-gray-200 rounded-xl bg-white hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all"
              required
            />
            <div className="absolute right-3 md:right-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium text-sm md:text-base">
              USD
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-3 bg-gray-50 rounded-xl p-3 md:p-4 border border-gray-200">
        <div className="flex items-center justify-between">
          <label htmlFor="monthsAhead" className="block text-sm font-semibold text-gray-800">
            Search Window
          </label>
          <span className="text-base md:text-lg font-bold text-purple-600">
            {monthsAhead} {monthsAhead === 1 ? 'month' : 'months'} ahead
          </span>
        </div>
        <input
          id="monthsAhead"
          type="range"
          min="1"
          max="6"
          value={monthsAhead}
          onChange={(e) => setMonthsAhead(parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-purple-600"
        />
        <div className="flex justify-between text-xs text-gray-600 font-medium">
          <span>1</span>
          <span>2</span>
          <span>3</span>
          <span>4</span>
          <span>5</span>
          <span>6</span>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 md:gap-4 pt-3 md:pt-4 border-t-2 border-gray-200">
        <label className="flex items-center gap-2 md:gap-3 cursor-pointer group">
          <input
            id="excludeBasicEconomy"
            type="checkbox"
            checked={excludeBasicEconomy}
            onChange={(e) => setExcludeBasicEconomy(e.target.checked)}
            className="w-4 h-4 md:w-5 md:h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2 cursor-pointer"
          />
          <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900">
            Exclude Basic Economy
          </span>
        </label>
        <button
          type="submit"
          className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 md:px-8 py-3 md:py-3.5 lg:py-4 rounded-xl hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 md:gap-3 font-semibold text-base md:text-lg"
        >
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          Let's Fly
        </button>
      </div>

      <p className="text-xs text-gray-500 text-center pt-2">
        Base fares shown. Final totals with taxes and fees may exceed your budget.
      </p>
    </form>
  );
}

