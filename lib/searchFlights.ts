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
  source: 'amadeus' | 'kiwi' | 'skyscanner' | 'mock';
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

// Mock data generator for fallback
function generateMockData(params: SearchParams): FlightResult[] {
  const destinations = [
    { city: 'Paris', code: 'CDG', basePrice: 450 },
    { city: 'London', code: 'LHR', basePrice: 500 },
    { city: 'Tokyo', code: 'NRT', basePrice: 800 },
    { city: 'Barcelona', code: 'BCN', basePrice: 400 },
    { city: 'Rome', code: 'FCO', basePrice: 420 },
    { city: 'Amsterdam', code: 'AMS', basePrice: 480 },
    { city: 'Berlin', code: 'BER', basePrice: 460 },
    { city: 'Dubai', code: 'DXB', basePrice: 750 },
  ];

  const airlines = ['American Airlines', 'Delta', 'United', 'Lufthansa', 'British Airways'];
  const fareClasses = ['Economy', 'Premium Economy', 'Business', 'Basic Economy', 'E'];

  const results: FlightResult[] = [];
  const today = new Date();
  const maxDate = new Date(today);
  maxDate.setMonth(today.getMonth() + params.monthsAhead);

  destinations.forEach((dest) => {
    // Vary price within budget
    const priceVariation = Math.random() * 0.3; // ±30% variation
    const price = Math.min(
      dest.basePrice * (1 - priceVariation),
      params.maxBudget
    );

    if (price > params.maxBudget * 0.5) {
      // Only include if price is reasonable
      const randomDate = new Date(
        today.getTime() +
          Math.random() * (maxDate.getTime() - today.getTime())
      );
      const fareClass =
        fareClasses[Math.floor(Math.random() * fareClasses.length)];

      results.push({
        destination: dest.city,
        destinationCode: dest.code,
        price: Math.round(price),
        currency: 'USD',
        date: randomDate.toISOString().split('T')[0],
        airline: airlines[Math.floor(Math.random() * airlines.length)],
        fareClass,
        bookingUrl: `https://example.com/book/${dest.code}`,
        source: 'mock',
      });
    }
  });

  return filterBasicEconomy(results, params.excludeBasicEconomy);
}

// Amadeus API implementation
async function searchAmadeus(
  params: SearchParams
): Promise<FlightResult[] | null> {
  const apiKey = process.env.AMADEUS_API_KEY;
  const apiSecret = process.env.AMADEUS_API_SECRET;

  if (!apiKey || !apiSecret) {
    return null;
  }

  try {
    // Step 1: Get OAuth token
    const tokenResponse = await fetch(
      'https://test.api.amadeus.com/v1/security/oauth2/token',
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
      return null;
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    // Step 2: Search flight destinations
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + params.monthsAhead);

    const searchUrl = new URL(
      'https://test.api.amadeus.com/v1/shopping/flight-destinations'
    );
    searchUrl.searchParams.set('origin', params.origin.toUpperCase());
    searchUrl.searchParams.set('maxPrice', params.maxBudget.toString());
    searchUrl.searchParams.set(
      'departureDate',
      today.toISOString().split('T')[0]
    );

    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!searchResponse.ok) {
      return null;
    }

    const searchData = await searchResponse.json();
    const results: FlightResult[] = [];

    if (searchData.data) {
      for (const item of searchData.data.slice(0, 20)) {
        // Get detailed offers for each destination
        const offersUrl = new URL(
          'https://test.api.amadeus.com/v1/shopping/flight-offers'
        );
        offersUrl.searchParams.set('originLocationCode', params.origin.toUpperCase());
        offersUrl.searchParams.set('destinationLocationCode', item.destination);
        offersUrl.searchParams.set(
          'departureDate',
          today.toISOString().split('T')[0]
        );
        offersUrl.searchParams.set('maxPrice', params.maxBudget.toString());
        offersUrl.searchParams.set('adults', '1');

        const offersResponse = await fetch(offersUrl.toString(), {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        if (offersResponse.ok) {
          const offersData = await offersResponse.json();
          if (offersData.data && offersData.data.length > 0) {
            const offer = offersData.data[0];
            const fareClass =
              offer.travelerPricings?.[0]?.fareDetailsBySegment?.[0]
                ?.cabin || 'Economy';

            results.push({
              destination: item.destination || 'Unknown',
              destinationCode: item.destination,
              price: parseFloat(offer.price?.total || item.price?.total || '0'),
              currency: offer.price?.currency || 'USD',
              date: offer.itineraries?.[0]?.segments?.[0]?.departure?.at?.split('T')[0] || today.toISOString().split('T')[0],
              airline: offer.validatingAirlineCodes?.[0] || 'Unknown',
              fareClass,
              bookingUrl: `https://www.amadeus.com/flight-offers/${offer.id}`,
              source: 'amadeus',
            });
          }
        }
      }
    }

    return filterBasicEconomy(results, params.excludeBasicEconomy);
  } catch (error) {
    console.error('Amadeus API error:', error);
    return null;
  }
}

// Kiwi API implementation
async function searchKiwi(params: SearchParams): Promise<FlightResult[] | null> {
  const apiKey = process.env.KIWI_API_KEY;

  if (!apiKey) {
    return null;
  }

  try {
    // First, get location code for origin
    const locationUrl = new URL('https://api.tequila.kiwi.com/locations/query');
    locationUrl.searchParams.set('term', params.origin);
    locationUrl.searchParams.set('location_types', 'airport');

    const locationResponse = await fetch(locationUrl.toString(), {
      headers: {
        apikey: apiKey,
      },
    });

    if (!locationResponse.ok) {
      return null;
    }

    const locationData = await locationResponse.json();
    if (!locationData.locations || locationData.locations.length === 0) {
      return null;
    }

    const originCode = locationData.locations[0].code;
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + params.monthsAhead);

    // Search for flights
    const searchUrl = new URL('https://api.tequila.kiwi.com/v2/search');
    searchUrl.searchParams.set('fly_from', originCode);
    searchUrl.searchParams.set('date_from', today.toISOString().split('T')[0]);
    searchUrl.searchParams.set('date_to', maxDate.toISOString().split('T')[0]);
    searchUrl.searchParams.set('price_to', params.maxBudget.toString());
    searchUrl.searchParams.set('limit', '20');
    searchUrl.searchParams.set('curr', 'USD');

    const searchResponse = await fetch(searchUrl.toString(), {
      headers: {
        apikey: apiKey,
      },
    });

    if (!searchResponse.ok) {
      return null;
    }

    const searchData = await searchResponse.json();
    const results: FlightResult[] = [];

    if (searchData.data) {
      for (const flight of searchData.data) {
        results.push({
          destination: flight.cityTo || flight.flyTo,
          destinationCode: flight.flyTo,
          price: flight.price,
          currency: 'USD',
          date: flight.local_departure?.split('T')[0] || today.toISOString().split('T')[0],
          airline: flight.airlines?.[0] || 'Unknown',
          fareClass: flight.fare?.name || undefined,
          bookingUrl: flight.deep_link || `https://www.kiwi.com/deep?from=${originCode}&to=${flight.flyTo}`,
          source: 'kiwi',
        });
      }
    }

    return filterBasicEconomy(results, params.excludeBasicEconomy);
  } catch (error) {
    console.error('Kiwi API error:', error);
    return null;
  }
}

// Skyscanner API implementation (simplified)
async function searchSkyscanner(
  params: SearchParams
): Promise<FlightResult[] | null> {
  const apiKey = process.env.SKYSCANNER_API_KEY;

  if (!apiKey) {
    return null;
  }

  // Skyscanner API is more complex and requires additional setup
  // For MVP, we'll return null and fall back to mock data
  // This can be implemented in a future phase
  return null;
}

// Main search function with fallback chain
export async function searchFlights(
  params: SearchParams
): Promise<FlightResult[]> {
  // Try APIs in priority order
  let results = await searchAmadeus(params);
  if (results && results.length > 0) {
    return results;
  }

  results = await searchKiwi(params);
  if (results && results.length > 0) {
    return results;
  }

  results = await searchSkyscanner(params);
  if (results && results.length > 0) {
    return results;
  }

  // Fallback to mock data
  console.warn('All APIs failed, using mock data');
  return generateMockData(params);
}

