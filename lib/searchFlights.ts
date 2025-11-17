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
  source: 'amadeus' | 'mock';
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

// Main search function with fallback
export async function searchFlights(
  params: SearchParams
): Promise<FlightResult[]> {
  // Try Amadeus API first
  const results = await searchAmadeus(params);
  if (results && results.length > 0) {
    return results;
  }

  // Fallback to mock data if Amadeus fails
  console.warn('Amadeus API failed, using mock data');
  return generateMockData(params);
}

