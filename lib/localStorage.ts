export interface SavedSearch {
  id: string;
  origin: string;
  budget: number;
  monthsAhead: number;
  excludeBasicEconomy: boolean;
  timestamp: number;
}

const STORAGE_KEY = 'skyroutesai_saved_searches';

export function getSavedSearches(): SavedSearch[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }
    return JSON.parse(stored) as SavedSearch[];
  } catch (error) {
    console.error('Error reading saved searches:', error);
    return [];
  }
}

export function saveSearch(search: Omit<SavedSearch, 'id' | 'timestamp'>): SavedSearch {
  if (typeof window === 'undefined') {
    throw new Error('localStorage is not available');
  }

  const savedSearches = getSavedSearches();

  // Remove any existing search with the same parameters to avoid duplicates
  const dedupedSearches = savedSearches.filter(
    (s) =>
      !(
        s.origin.toUpperCase() === search.origin.toUpperCase() &&
        s.budget === search.budget &&
        s.monthsAhead === search.monthsAhead &&
        s.excludeBasicEconomy === search.excludeBasicEconomy
      )
  );

  const newSearch: SavedSearch = {
    ...search,
    id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  // Add new search to the beginning, after de-duplication
  dedupedSearches.unshift(newSearch);

  // Keep only the last 20 searches
  const limitedSearches = dedupedSearches.slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedSearches));
    // Dispatch custom event to notify components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('skyroutesai:searchSaved'));
    }
    return newSearch;
  } catch (error) {
    console.error('Error saving search:', error);
    throw error;
  }
}

export function deleteSavedSearch(id: string): void {
  if (typeof window === 'undefined') {
    return;
  }

  const savedSearches = getSavedSearches();
  const filtered = savedSearches.filter((search) => search.id !== id);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    // Dispatch custom event to notify components
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new Event('skyroutesai:searchSaved'));
    }
  } catch (error) {
    console.error('Error deleting saved search:', error);
  }
}

