import { FlightResult, SearchParams } from './searchFlights';

// Generate realistic mock flight data based on search parameters
export function generateMockFlights(params: SearchParams): FlightResult[] {
  const { origin, maxBudget, monthsAhead } = params;
  
  // Popular destinations with realistic price ranges from major US airports
  const destinationData: Array<{
    code: string;
    name: string;
    basePrice: number; // Base price multiplier (0.3 to 0.9 of maxBudget)
    priceVariation: number; // ± percentage
  }> = [
    // Domestic
    { code: 'LAX', name: 'Los Angeles', basePrice: 0.4, priceVariation: 0.2 },
    { code: 'JFK', name: 'New York', basePrice: 0.5, priceVariation: 0.25 },
    { code: 'SFO', name: 'San Francisco', basePrice: 0.45, priceVariation: 0.2 },
    { code: 'MIA', name: 'Miami', basePrice: 0.35, priceVariation: 0.3 },
    { code: 'LAS', name: 'Las Vegas', basePrice: 0.3, priceVariation: 0.25 },
    { code: 'SEA', name: 'Seattle', basePrice: 0.4, priceVariation: 0.2 },
    { code: 'ORD', name: 'Chicago', basePrice: 0.35, priceVariation: 0.25 },
    { code: 'DFW', name: 'Dallas', basePrice: 0.3, priceVariation: 0.2 },
    { code: 'ATL', name: 'Atlanta', basePrice: 0.35, priceVariation: 0.25 },
    { code: 'PHX', name: 'Phoenix', basePrice: 0.3, priceVariation: 0.2 },
    { code: 'BOS', name: 'Boston', basePrice: 0.45, priceVariation: 0.25 },
    { code: 'MCO', name: 'Orlando', basePrice: 0.35, priceVariation: 0.3 },
    // International
    { code: 'MEX', name: 'Mexico City', basePrice: 0.4, priceVariation: 0.3 },
    { code: 'CUN', name: 'Cancún', basePrice: 0.35, priceVariation: 0.3 },
    { code: 'YYZ', name: 'Toronto', basePrice: 0.4, priceVariation: 0.25 },
    { code: 'YVR', name: 'Vancouver', basePrice: 0.45, priceVariation: 0.25 },
    { code: 'LHR', name: 'London', basePrice: 0.7, priceVariation: 0.2 },
    { code: 'CDG', name: 'Paris', basePrice: 0.75, priceVariation: 0.2 },
    { code: 'FRA', name: 'Frankfurt', basePrice: 0.7, priceVariation: 0.2 },
    { code: 'MAD', name: 'Madrid', basePrice: 0.65, priceVariation: 0.25 },
    { code: 'BCN', name: 'Barcelona', basePrice: 0.65, priceVariation: 0.25 },
    { code: 'AMS', name: 'Amsterdam', basePrice: 0.7, priceVariation: 0.2 },
    { code: 'FCO', name: 'Rome', basePrice: 0.7, priceVariation: 0.25 },
    { code: 'IST', name: 'Istanbul', basePrice: 0.6, priceVariation: 0.3 },
  ];

  // Filter out origin city
  const availableDestinations = destinationData.filter(
    dest => dest.code !== origin.toUpperCase()
  );

  // Generate flights - take destinations that fit within budget
  const results: FlightResult[] = [];
  const airlines = ['United Airlines', 'American Airlines', 'Delta Air Lines', 'Southwest Airlines', 'JetBlue Airways', 'Alaska Airlines', 'Frontier Airlines', 'Spirit Airlines'];
  const fareClasses = ['ECONOMY', 'PREMIUM ECONOMY', 'BUSINESS'];

  // Generate date range
  const today = new Date();
  const startDate = new Date(today);
  startDate.setDate(startDate.getDate() + 7); // Start 1 week from now
  const endDate = new Date(today);
  endDate.setMonth(endDate.getMonth() + monthsAhead);

  availableDestinations.forEach((dest, index) => {
    // Calculate price with variation
    const basePrice = maxBudget * dest.basePrice;
    const variation = basePrice * dest.priceVariation;
    const price = Math.round(basePrice + (Math.random() * 2 - 1) * variation);
    
    // Only include if within budget
    if (price > 0 && price <= maxBudget) {
      // Generate a random date within the range
      const daysDiff = Math.floor((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
      const randomDays = Math.floor(Math.random() * daysDiff);
      const flightDate = new Date(startDate);
      flightDate.setDate(flightDate.getDate() + randomDays);
      
      // Format date as YYYY-MM-DD
      const dateStr = flightDate.toISOString().split('T')[0];
      
      // Random airline
      const airline = airlines[Math.floor(Math.random() * airlines.length)];
      
      // Random fare class (weighted toward economy)
      const fareClass = Math.random() > 0.8 
        ? fareClasses[Math.floor(Math.random() * fareClasses.length)]
        : 'ECONOMY';

      results.push({
        destination: dest.name,
        destinationCode: dest.code,
        price: price,
        currency: 'USD',
        date: dateStr,
        airline: airline,
        fareClass: fareClass,
        bookingUrl: `https://www.google.com/travel/flights?q=Flights%20${origin.toUpperCase()}%20to%20${dest.code}`,
        source: 'amadeus',
      });
    }
  });

  // Sort by price and limit to top 30
  return results
    .sort((a, b) => a.price - b.price)
    .slice(0, 30);
}

