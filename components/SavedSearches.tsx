'use client';

import { useEffect, useState } from 'react';
import { getSavedSearches, deleteSavedSearch, SavedSearch } from '@/lib/localStorage';

interface SavedSearchesProps {
  onSelectSearch: (search: SavedSearch) => void;
}

export default function SavedSearches({ onSelectSearch }: SavedSearchesProps) {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const refreshSearches = () => {
    setSavedSearches(getSavedSearches());
  };

  useEffect(() => {
    // Prevent hydration mismatch by only loading after mount
    setMounted(true);
    refreshSearches();
    
    // Listen for custom event when searches are saved
    const handleStorageChange = () => {
      refreshSearches();
    };
    
    window.addEventListener('skyroutesai:searchSaved', handleStorageChange);
    
    return () => {
      window.removeEventListener('skyroutesai:searchSaved', handleStorageChange);
    };
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

  // Prevent hydration mismatch - don't render until mounted
  if (!mounted || savedSearches.length === 0) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-white/95 backdrop-blur-md border-2 border-white/50 hover:border-white/70 text-gray-800 text-sm font-semibold py-2 px-3 md:py-2.5 md:px-4 rounded-xl transition-all flex items-center gap-2 shadow-lg hover:shadow-xl"
        title="Saved Searches"
      >
        <svg className="w-4 h-4 md:w-5 md:h-5 text-purple-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
        </svg>
        <span className="hidden sm:inline text-gray-700">Saved</span>
        <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full text-xs font-bold min-w-[20px] text-center">
          {savedSearches.length}
        </span>
        <svg
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 flex-shrink-0 ${isOpen ? 'rotate-180' : ''}`}
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
        <div className="absolute top-full right-0 mt-2 w-80 md:w-96 max-w-[calc(100vw-2rem)] space-y-2.5 z-50">
          {savedSearches.map((search) => (
            <div
              key={search.id}
              className="group bg-white border-2 border-gray-200 rounded-xl p-4 md:p-5 hover:border-purple-300 hover:shadow-lg transition-all cursor-pointer"
              onClick={() => {
                onSelectSearch(search);
                setIsOpen(false);
              }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-baseline gap-2 md:gap-3 flex-wrap mb-2">
                    <span className="text-xl md:text-2xl font-bold text-gray-900">
                      {search.origin}
                    </span>
                    <span className="text-gray-300 text-lg">•</span>
                    <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                      ${search.budget}
                    </span>
                    <span className="text-gray-300 text-lg">•</span>
                    <span className="text-sm md:text-base text-gray-600 font-medium">
                      {search.monthsAhead}m ahead
                    </span>
                    {search.excludeBasicEconomy && (
                      <>
                        <span className="text-gray-300 text-lg">•</span>
                        <span className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-2.5 py-1 rounded-full text-xs font-bold border border-purple-200">
                          Premium
                        </span>
                      </>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5 mt-1">
                    <svg className="w-3 h-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-xs text-gray-500 font-medium">{formatDate(search.timestamp)}</p>
                  </div>
                </div>
                <button
                  onClick={(e) => handleDelete(search.id, e)}
                  className="opacity-60 group-hover:opacity-100 text-gray-400 hover:text-red-600 p-2 flex-shrink-0 rounded-lg hover:bg-red-50 transition-all"
                  aria-label="Delete saved search"
                >
                  <svg
                    className="w-4 h-4 md:w-5 md:h-5"
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

