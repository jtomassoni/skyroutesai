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


// Amadeus API implementation
async function searchAmadeus(
  params: SearchParams
): Promise<FlightResult[]> {
  const apiKey = process.env.AMADEUS_API_KEY;
  const apiSecret = process.env.AMADEUS_API_SECRET;

  if (!apiKey || !apiSecret) {
    throw new Error(
      'Amadeus API credentials are not configured. Please set AMADEUS_API_KEY and AMADEUS_API_SECRET environment variables.'
    );
  }

  try {
    // Step 1: Get OAuth token
    const tokenResponse = await fetch(
      'https://api.amadeus.com/v1/security/oauth2/token',
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
      throw new Error(
        `Failed to authenticate with Amadeus API: ${tokenResponse.status} ${errorText}`
      );
    }

    const tokenData = await tokenResponse.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      throw new Error('Failed to obtain access token from Amadeus API');
    }

    // Step 2: Search flight destinations
    const today = new Date();
    const maxDate = new Date(today);
    maxDate.setMonth(today.getMonth() + params.monthsAhead);

    const searchUrl = new URL(
      'https://api.amadeus.com/v1/shopping/flight-destinations'
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
      const errorText = await searchResponse.text();
      throw new Error(
        `Amadeus API search failed: ${searchResponse.status} ${errorText}`
      );
    }

    const searchData = await searchResponse.json();
    const results: FlightResult[] = [];

    if (searchData.data && searchData.data.length > 0) {
      // Limit to first 20 destinations to avoid too many API calls
      for (const item of searchData.data.slice(0, 20)) {
        // Get detailed offers for each destination
        const offersUrl = new URL(
          'https://api.amadeus.com/v1/shopping/flight-offers'
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

    const filteredResults = filterBasicEconomy(results, params.excludeBasicEconomy);
    
    if (filteredResults.length === 0) {
      console.log('✅ Amadeus API search completed - no flights found within budget');
    } else {
      console.log(`✅ Amadeus API search completed - found ${filteredResults.length} flights`);
    }
    
    return filteredResults;
  } catch (error) {
    console.error('❌ Amadeus API error:', error);
    throw error;
  }
}

// Main search function - uses real Amadeus API only
export async function searchFlights(
  params: SearchParams
): Promise<FlightResult[]> {
  return await searchAmadeus(params);
}

