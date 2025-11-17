const ANALYTICS_KEY = 'skyroutesai_analytics';

export interface AnalyticsData {
  totalSearches: number;
  departureCities: Record<string, number>;
  budgetRanges: {
    '0-200': number;
    '201-500': number;
    '501-1000': number;
    '1001-2000': number;
    '2001+': number;
  };
  lastUpdated: number;
}

function getAnalytics(): AnalyticsData {
  if (typeof window === 'undefined') {
    return {
      totalSearches: 0,
      departureCities: {},
      budgetRanges: {
        '0-200': 0,
        '201-500': 0,
        '501-1000': 0,
        '1001-2000': 0,
        '2001+': 0,
      },
      lastUpdated: Date.now(),
    };
  }

  try {
    const stored = localStorage.getItem(ANALYTICS_KEY);
    if (!stored) {
      return {
        totalSearches: 0,
        departureCities: {},
        budgetRanges: {
          '0-200': 0,
          '201-500': 0,
          '501-1000': 0,
          '1001-2000': 0,
          '2001+': 0,
        },
        lastUpdated: Date.now(),
      };
    }
    return JSON.parse(stored) as AnalyticsData;
  } catch (error) {
    console.error('Error reading analytics:', error);
    return {
      totalSearches: 0,
      departureCities: {},
      budgetRanges: {
        '0-200': 0,
        '201-500': 0,
        '501-1000': 0,
        '1001-2000': 0,
        '2001+': 0,
      },
      lastUpdated: Date.now(),
    };
  }
}

function saveAnalytics(data: AnalyticsData): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.setItem(ANALYTICS_KEY, JSON.stringify(data));
  } catch (error) {
    console.error('Error saving analytics:', error);
  }
}

function getBudgetRange(budget: number): keyof AnalyticsData['budgetRanges'] {
  if (budget <= 200) return '0-200';
  if (budget <= 500) return '201-500';
  if (budget <= 1000) return '501-1000';
  if (budget <= 2000) return '1001-2000';
  return '2001+';
}

export function trackSearch(origin: string, budget: number): void {
  const analytics = getAnalytics();
  
  // Increment total searches
  analytics.totalSearches += 1;
  
  // Track departure city
  const normalizedOrigin = origin.trim().toUpperCase();
  analytics.departureCities[normalizedOrigin] =
    (analytics.departureCities[normalizedOrigin] || 0) + 1;
  
  // Track budget range
  const budgetRange = getBudgetRange(budget);
  analytics.budgetRanges[budgetRange] += 1;
  
  analytics.lastUpdated = Date.now();
  
  saveAnalytics(analytics);
}

export function getStats(): AnalyticsData {
  return getAnalytics();
}

export function clearAnalytics(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(ANALYTICS_KEY);
  } catch (error) {
    console.error('Error clearing analytics:', error);
  }
}

