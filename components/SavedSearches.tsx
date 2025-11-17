'use client';

import { useEffect, useState } from 'react';
import { getSavedSearches, deleteSavedSearch, SavedSearch } from '@/lib/localStorage';

interface SavedSearchesProps {
  onSelectSearch: (search: SavedSearch) => void;
}

export default function SavedSearches({ onSelectSearch }: SavedSearchesProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setSavedSearches(getSavedSearches());
  }, []);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSavedSearch(id);
    setSavedSearches(getSavedSearches());
  };

  const formatDate = (timestamp: number) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'Just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date.toLocaleDateString();
  };

  if (savedSearches.length === 0) {
    return null;
  }

  return (
    <div className="mb-6">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-between"
      >
        <span>Saved Searches ({savedSearches.length})</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="mt-2 space-y-2">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => {
                onSelectSearch(search);
                setIsOpen(false);
              }}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900">
                      {search.origin}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm font-medium text-blue-600">
                      ${search.budget}
                    </span>
                    <span className="text-sm text-gray-500">•</span>
                    <span className="text-sm text-gray-600">
                      {search.monthsAhead} {search.monthsAhead === 1 ? 'month' : 'months'}
                    </span>
                    {search.excludeBasicEconomy && (
                      <>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                          No Basic Economy
                        </span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{formatDate(search.timestamp)}</p>
                </div>
                <button
                  onClick={(e) => handleDelete(search.id, e)}
                  className="ml-4 text-red-500 hover:text-red-700 p-1"
                  aria-label="Delete saved search"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

