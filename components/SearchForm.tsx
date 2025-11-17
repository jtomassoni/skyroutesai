'use client';

import { useState } from 'react';

interface SearchFormProps {
  onSearch: (params: {
    origin: string;
    maxBudget: number;
    monthsAhead: number;
    excludeBasicEconomy: boolean;
  }) => void;
}

export default function SearchForm({ onSearch }: SearchFormProps) {
  const [origin, setOrigin] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [monthsAhead, setMonthsAhead] = useState(3);
  const [excludeBasicEconomy, setExcludeBasicEconomy] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const budget = parseFloat(maxBudget);
    if (!origin.trim() || isNaN(budget) || budget <= 0) {
      return;
    }
    onSearch({
      origin: origin.trim(),
      maxBudget: budget,
      monthsAhead,
      excludeBasicEconomy,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-2xl mx-auto space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="origin" className="block text-sm font-medium text-gray-700 mb-2">
            Departure City or Airport Code
          </label>
          <input
            id="origin"
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            placeholder="e.g., New York, JFK, or LAX"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="budget" className="block text-sm font-medium text-gray-700 mb-2">
            Budget (USD)
          </label>
          <input
            id="budget"
            type="number"
            min="1"
            step="1"
            value={maxBudget}
            onChange={(e) => setMaxBudget(e.target.value)}
            placeholder="e.g., 500"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            required
          />
        </div>

        <div>
          <label htmlFor="monthsAhead" className="block text-sm font-medium text-gray-700 mb-2">
            Search Window: {monthsAhead} {monthsAhead === 1 ? 'month' : 'months'} ahead
          </label>
          <input
            id="monthsAhead"
            type="range"
            min="1"
            max="6"
            value={monthsAhead}
            onChange={(e) => setMonthsAhead(parseInt(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>1</span>
            <span>2</span>
            <span>3</span>
            <span>4</span>
            <span>5</span>
            <span>6</span>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="excludeBasicEconomy"
            type="checkbox"
            checked={excludeBasicEconomy}
            onChange={(e) => setExcludeBasicEconomy(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="excludeBasicEconomy" className="ml-2 text-sm text-gray-700">
            Exclude Basic Economy fares
          </label>
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
      >
        Find Flights
      </button>

      <p className="text-xs text-gray-600 text-center leading-relaxed">
        Prices shown are base fares. Final totals with taxes and fees may exceed your budget. We're working on showing full cost breakdowns.
      </p>
    </form>
  );
}

