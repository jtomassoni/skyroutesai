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
  const newSearch: SavedSearch = {
    ...search,
    id: `search_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
  };

  savedSearches.unshift(newSearch); // Add to beginning
  // Keep only the last 20 searches
  const limitedSearches = savedSearches.slice(0, 20);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(limitedSearches));
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
  } catch (error) {
    console.error('Error deleting saved search:', error);
  }
}

