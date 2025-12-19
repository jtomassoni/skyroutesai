export interface FlightResult {
  destination: string;
  destinationCode: string;
  price: number;
  currency: string;
  date: string;
  dateRange?: string;
  airline: string;
  fareClass?: string;
  bookingUrl: string;
  source: 'amadeus';
  fareClassNote?: string;
}

export interface SearchParams {
  origin: string;
  maxBudget: number;
  monthsAhead: number;
  excludeBasicEconomy: boolean;
}

// Basic economy fare class indicators
const BASIC_ECONOMY_INDICATORS = [
  'BASIC',
  'BASIC ECONOMY',
  'E',
  'LIGHT',
  'NO-FRILLS',
  'ECONOMY BASIC',
];

function isBasicEconomy(fareClass?: string): boolean {
  if (!fareClass) return false;
  const upper = fareClass.toUpperCase();
  return BASIC_ECONOMY_INDICATORS.some((indicator) =>
    upper.includes(indicator)
  );
}

function filterBasicEconomy(
  flights: FlightResult[],
  excludeBasicEconomy: boolean
): FlightResult[] {
  if (!excludeBasicEconomy) return flights;

  return flights.filter((flight) => {
    if (!flight.fareClass) {
      // Add note if fare class is missing
      flight.fareClassNote =
        'Fare class unavailable — may include basic economy.';
      return true; // Include it but with a note
    }
    return !isBasicEconomy(flight.fareClass);
  });
}

// Format date as YYYY-MM-DD
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

// Get a future date (at least 1 day from now, as Amadeus requires future dates)
function getFutureDate(daysAhead: number = 1): string {
  const date = new Date();
  date.setDate(date.getDate() + daysAhead);
  return formatDate(date);
}

// Amadeus API implementation
async function searchAmadeus(
  params: SearchParams
): Promise<FlightResult[]> {
  // Get and clean environment variables
  let apiKey = process.env.AMADEUS_API_KEY?.trim();
  let apiSecret = process.env.AMADEUS_API_SECRET?.trim();
  
  // Remove surrounding quotes if present
  if (apiKey && ((apiKey.startsWith('"') && apiKey.endsWith('"')) || (apiKey.startsWith("'") && apiKey.endsWith("'")))) {
    apiKey = apiKey.slice(1, -1);
  }
  if (apiSecret && ((apiSecret.startsWith('"') && apiSecret.endsWith('"')) || (apiSecret.startsWith("'") && apiSecret.endsWith("'")))) {
    apiSecret = apiSecret.slice(1, -1);
  }

  // Determine API environment
  const apiEnv = (process.env.AMADEUS_API_ENV || 'production').toLowerCase();
  const isTest = apiEnv === 'test';
  const baseUrl = isTest ? 'https://test.api.amadeus.com' : 'https://api.amadeus.com';

  // Validate credentials
  if (!apiKey || !apiSecret) {
    const missing = [];
    if (!apiKey) missing.push('AMADEUS_API_KEY');
    if (!apiSecret) missing.push('AMADEUS_API_SECRET');
    throw new Error(
      `Amadeus API credentials are not configured. Missing: ${missing.join(', ')}. Please set these environment variables.`
    );
  }

  // Validate and normalize origin (should be IATA code, 3 letters)
  const originCode = params.origin.trim().toUpperCase();
  if (originCode.length !== 3 || !/^[A-Z]{3}$/.test(originCode)) {
    throw new Error(
      `Invalid origin code: "${params.origin}". Please provide a valid 3-letter IATA airport code (e.g., "JFK", "LAX", "NYC").`
    );
  }

  try {
    // Step 1: Authenticate and get access token
    console.log('🔐 Authenticating with Amadeus API...');
    const tokenResponse = await fetch(
      `${baseUrl}/v1/security/oauth2/token`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: apiKey,
          client_secret: apiSecret,
        }),
      }
    );

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      let errorJson;
      try {
        errorJson = JSON.parse(errorText);
      } catch {
        // Not JSON
      }
      
      console.error(`❌ Amadeus Authentication Failed: ${tokenResponse.status}`);
      console.error(`   Response: ${errorText}`);
      
      if (tokenResponse.status === 401) {
        const errorDetail = errorJson?.error_description || errorJson?.description || errorText;
        throw new Error(
          `Invalid Amadeus API credentials. Please verify AMADEUS_API_KEY and AMADEUS_API_SECRET are correct. Details: ${errorDetail}`
        );
      } else if (tokenResponse.status === 403) {
        const errorDetail = errorJson?.error_description || errorJson?.description || errorText;
        throw new Error(
          `Amadeus API access forbidden. Your API keys may not have the required permissions or may be for a different environment (test vs production). Details: ${errorDetail}`
        );
      } else {
        throw new Error(
          `Failed to authenticate with Amadeus API: ${tokenResponse.status} ${errorText}`
        );
      }
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token from Amadeus API');
    }

    console.log('✅ Authentication successful');

    // Step 2: Generate search dates across the monthsAhead period
    // We'll use flight-destinations for a few key dates, then search offers across more dates
    const startDate = new Date();
    startDate.setDate(startDate.getDate() + 1); // Start tomorrow
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + params.monthsAhead);
    
    // Key dates for flight-destinations searches (spread across the period)
    const keyDates: string[] = [];
    const totalDays = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
    const dateInterval = Math.max(7, Math.floor(totalDays / 3)); // 3-4 key dates across the period
    
    let currentDate = new Date(startDate);
    while (currentDate <= endDate && keyDates.length < 4) {
      keyDates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + dateInterval);
    }
    
    // Generate more dates for flight-offers searches (weekly)
    const searchDates: string[] = [];
    currentDate = new Date(startDate);
    while (currentDate <= endDate && searchDates.length < 12) {
      searchDates.push(formatDate(currentDate));
      currentDate.setDate(currentDate.getDate() + 7);
    }
    
    console.log(`🔍 Searching from ${originCode} with max price $${params.maxBudget}`);
    console.log(`   Key dates for destination discovery: ${keyDates.length}`);
    console.log(`   Date range: ${searchDates[0]} to ${searchDates[searchDates.length - 1]} (${searchDates.length} dates for offers)`);
    
    // Popular destinations to try (fallback when flight-destinations endpoint fails)
    // Ordered roughly by traffic volume - major US hubs first
    const popularDestinations = [
      // Major US hubs (top 20 by passenger volume)
      'ATL', 'DFW', 'DEN', 'ORD', 'LAX', 'JFK', 'LAS', 'MIA', 'SEA', 'CLT',
      'PHX', 'EWR', 'MCO', 'MSP', 'DTW', 'PHL', 'SFO', 'IAH', 'BOS', 'LGA',
      'DCA',
      // International from US
      'MEX', 'CUN', 'YYZ', 'YVR', 'LHR', 'CDG', 'FRA', 'MAD', 'BCN', 'AMS',
      'FCO', 'IST', 'DXB', 'SIN', 'NRT', 'ICN', 'BKK', 'SYD', 'AKL'
    ];

    // Step 3: Discover destinations using flight-destinations across multiple key dates
    // This helps us find destinations that are consistently available
    const destinationMap = new Map<string, { count: number; name?: string }>();
    
    console.log(`🔎 Discovering destinations across ${keyDates.length} key dates...`);
    
    // Search flight-destinations for each key date
    for (const keyDate of keyDates) {
      try {
        const searchUrl = new URL(
          `${baseUrl}/v1/shopping/flight-destinations`
        );
        searchUrl.searchParams.set('origin', originCode);
        searchUrl.searchParams.set('maxPrice', params.maxBudget.toString());
        searchUrl.searchParams.set('departureDate', keyDate);

        const searchResponse = await fetch(searchUrl.toString(), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            Accept: 'application/vnd.amadeus+json',
          },
        });

        if (searchResponse.ok) {
          const searchData = await searchResponse.json();
          if (searchData.data && searchData.data.length > 0) {
            // Track which destinations appear across multiple dates
            searchData.data.forEach((item: any) => {
              const dest = item.destination;
              if (dest && dest !== originCode) {
                const existing = destinationMap.get(dest);
                destinationMap.set(dest, {
                  count: (existing?.count || 0) + 1,
                  name: item.destinationName || existing?.name,
                });
              }
            });
          }
        } else if (searchResponse.status === 500) {
          // If flight-destinations fails, continue to next date
          console.warn(`⚠️ flight-destinations failed for ${keyDate}, continuing...`);
        }
      } catch (error) {
        console.warn(`⚠️ Error searching destinations for ${keyDate}:`, error instanceof Error ? error.message.substring(0, 50) : String(error));
        continue;
      }
    }

    // Convert to array and prioritize destinations that appear in multiple searches
    let destinationsToProcess: Array<{ destination: string; destinationName?: string; priority: number }> = [];
    
    if (destinationMap.size > 0) {
      destinationsToProcess = Array.from(destinationMap.entries())
        .map(([dest, info]) => ({
          destination: dest,
          destinationName: info.name,
          priority: info.count, // Higher priority for destinations found in multiple dates
        }))
        .sort((a, b) => b.priority - a.priority) // Sort by priority (appearance count)
        .slice(0, 30); // Take top 30
      
      console.log(`✅ Found ${destinationsToProcess.length} unique destinations (${destinationsToProcess.filter(d => d.priority > 1).length} appear in multiple dates)`);
    } else {
      // Fallback: use popular destinations if flight-destinations completely fails
      console.warn(`⚠️ No destinations found via flight-destinations. Using fallback.`);
      destinationsToProcess = popularDestinations
        .filter(dest => dest !== originCode)
        .slice(0, 20)
        .map(dest => ({ destination: dest, priority: 1 }));
    }

    if (destinationsToProcess.length === 0) {
      console.log('ℹ️ No destinations to process');
      return [];
    }

    // Step 4: Search flight offers for each destination across multiple dates
    // Prioritize dates where destination appeared in flight-destinations
    const results: FlightResult[] = [];
    const resultsMap = new Map<string, FlightResult>(); // Use map to avoid duplicates

    console.log(`📋 Searching ${destinationsToProcess.length} destinations across ${searchDates.length} dates...`);

    // Process destinations - search multiple dates to find best prices
    for (let i = 0; i < destinationsToProcess.length; i++) {
      const item = destinationsToProcess[i];
      const destinationCode = item.destination;
      if (!destinationCode) continue;

      // Search across multiple dates to find the best price
      // For high-priority destinations (found in multiple flight-destinations searches),
      // search all dates. For others, search a good sample.
      const datesToSearch = item.priority > 1 
        ? searchDates // High priority: search all dates to find best deal
        : searchDates.filter((_, idx) => idx % 2 === 0 || idx < 6); // Lower priority: search every other date + first 6
      
      let bestOffer: FlightResult | null = null;
      let bestPrice = Infinity;
      
      for (const departureDate of datesToSearch) {
        try {
          const offersUrl = new URL(
            `${baseUrl}/v1/shopping/flight-offers`
          );
          offersUrl.searchParams.set('originLocationCode', originCode);
          offersUrl.searchParams.set('destinationLocationCode', destinationCode);
          offersUrl.searchParams.set('departureDate', departureDate);
          offersUrl.searchParams.set('adults', '1');
          offersUrl.searchParams.set('maxPrice', params.maxBudget.toString());
          offersUrl.searchParams.set('currencyCode', 'USD');
          offersUrl.searchParams.set('max', '10'); // Get more offers to find best price

          const offersResponse = await fetch(offersUrl.toString(), {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              Accept: 'application/vnd.amadeus+json',
            },
          });

          if (!offersResponse.ok) {
            if (offersResponse.status === 404) {
              // No flights for this date, continue to next date
              continue;
            }
            // For other errors, log but continue
            if (offersResponse.status !== 500) {
              const errorText = await offersResponse.text();
              console.warn(
                `⚠️ Error fetching offers for ${destinationCode} on ${departureDate}: ${offersResponse.status}`
              );
            }
            continue;
          }

          const offersData = await offersResponse.json();
          
          if (offersData.data && offersData.data.length > 0) {
            // Sort by price and find cheapest within budget
            const validOffers = offersData.data
              .filter((offer: any) => {
                const price = parseFloat(offer.price?.total || '0');
                return price > 0 && price <= params.maxBudget;
              })
              .sort((a: any, b: any) => {
                return parseFloat(a.price?.total || '0') - parseFloat(b.price?.total || '0');
              });

            if (validOffers.length > 0) {
              const offer = validOffers[0];
              const price = parseFloat(offer.price?.total || '0');
              
              // Track the best offer across all dates
              if (price < bestPrice) {
                const fareClass =
                  offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                    ?.cabin || 'ECONOMY';

                const destinationName = item.destinationName || 
                  offersData.dictionaries?.locations?.[destinationCode]?.detailedName ||
                  destinationCode;

                const flightDate = offer.itineraries?.[0]?.segments?.[0]?.departure?.at?.split('T')[0] || departureDate;

                bestOffer = {
                  destination: destinationName,
                  destinationCode: destinationCode,
                  price: price,
                  currency: offer.price?.currency || 'USD',
                  date: flightDate,
                  airline: offer.validatingAirlineCodes?.[0] || 'Unknown',
                  fareClass: fareClass.toUpperCase(),
                  bookingUrl: `https://www.amadeus.com/flight-offers/${offer.id}`,
                  source: 'amadeus',
                };
                bestPrice = price;
              }
            }
          }
        } catch (error) {
          // Log but continue
          console.warn(`⚠️ Error processing ${destinationCode} on ${departureDate}:`, error instanceof Error ? error.message.substring(0, 50) : String(error));
          continue;
        }
      }
      
      // Add the best offer found across all dates for this destination
      if (bestOffer) {
        const key = destinationCode;
        const existing = resultsMap.get(key);
        if (!existing || bestPrice < existing.price) {
          resultsMap.set(key, bestOffer);
        }
      }
    }

    // Convert map to array and sort by price
    const allResults = Array.from(resultsMap.values()).sort((a, b) => a.price - b.price);
    results.push(...allResults);

    // Filter basic economy if requested
    const filteredResults = filterBasicEconomy(results, params.excludeBasicEconomy);
    
    console.log(`✅ Search completed - found ${filteredResults.length} flights`);
    
    return filteredResults;
  } catch (error) {
    console.error('❌ Amadeus API error:', error);
    throw error;
  }
}

// Main search function
export async function searchFlights(
  params: SearchParams
): Promise<FlightResult[]> {
  return await searchAmadeus(params);
}
