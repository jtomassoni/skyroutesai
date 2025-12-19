import { NextRequest, NextResponse } from 'next/server';
import { searchFlights, SearchParams } from '@/lib/searchFlights';
import { generateMockFlights } from '@/lib/mockFlights';
import { getCurrentUser } from '@/lib/auth';

// Check if user is authenticated using our auth system
async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const user = await getCurrentUser(request);
  return user !== null;
}

export async function POST(request: NextRequest) {
  try {
    let body;
    try {
      body = await request.json();
    } catch (jsonError) {
      return NextResponse.json(
        { error: 'Invalid JSON in request body' },
        { status: 400 }
      );
    }
    
    const { origin, maxBudget, monthsAhead, excludeBasicEconomy } = body;

    // Validate input
    if (!origin || typeof origin !== 'string' || origin.trim().length === 0) {
      return NextResponse.json(
        { error: 'Origin is required' },
        { status: 400 }
      );
    }

    if (
      !maxBudget ||
      typeof maxBudget !== 'number' ||
      maxBudget <= 0 ||
      maxBudget > 100000
    ) {
      return NextResponse.json(
        { error: 'Valid budget between 1 and 100000 is required' },
        { status: 400 }
      );
    }

    if (
      !monthsAhead ||
      typeof monthsAhead !== 'number' ||
      monthsAhead < 1 ||
      monthsAhead > 6
    ) {
      return NextResponse.json(
        { error: 'Months ahead must be between 1 and 6' },
        { status: 400 }
      );
    }

    const searchParams: SearchParams = {
      origin: origin.trim(),
      maxBudget,
      monthsAhead,
      excludeBasicEconomy: Boolean(excludeBasicEconomy),
    };

    // Check authentication - anonymous users get mock data, authenticated get real API
    const authenticated = await isAuthenticated(request);
    
    let results;
    if (authenticated) {
      // Authenticated users get real API data
      console.log('✅ Authenticated user - using real Amadeus API');
      results = await searchFlights(searchParams);
    } else {
      // Anonymous users get mock data (no API calls)
      console.log('ℹ️ Anonymous user - using mock flight data (no API calls)');
      results = generateMockFlights(searchParams);
    }

    return NextResponse.json({
      success: true,
      results,
      count: results.length,
      mock: !authenticated, // Indicate if this is mock data
    });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Log full error details for debugging (especially important in production)
    console.error('❌ Search flights API error:', errorMessage);
    if (error instanceof Error && error.stack) {
      console.error('Stack trace:', error.stack);
    }
    
    // Provide user-friendly error messages
    let userMessage = 'Unable to search for flights at this time.';
    let errorType = 'unknown';
    let technicalDetails = errorMessage;
    
    if (errorMessage.includes('API credentials are not configured') || errorMessage.includes('Missing:')) {
      userMessage = 'Flight search service is not configured. Please contact support.';
      errorType = 'configuration';
    } else if (errorMessage.includes('Invalid Amadeus API credentials')) {
      userMessage = 'Flight search service authentication failed. The API credentials may be incorrect.';
      errorType = 'authentication';
    } else if (errorMessage.includes('access forbidden') || errorMessage.includes('permissions')) {
      userMessage = 'Flight search service authentication failed. API keys may not have the required permissions.';
      errorType = 'authorization';
    } else if (errorMessage.includes('Failed to authenticate')) {
      userMessage = 'Flight search service authentication failed. Please try again later.';
      errorType = 'authentication';
      // Extract more details from the error message
      const detailsMatch = errorMessage.match(/Details: (.+)/);
      if (detailsMatch) {
        technicalDetails = detailsMatch[1];
      }
    } else if (errorMessage.includes('API search failed')) {
      // Check if it's a system error that suggests API unavailability
      if (errorMessage.includes('system error') || errorMessage.includes('temporarily unavailable') || errorMessage.includes('after all retry attempts')) {
        userMessage = 'The flight search service is temporarily unavailable. This may be due to high demand or maintenance. Please try again in a few moments, or try different search parameters (different departure city or budget range).';
        errorType = 'service_unavailable';
      } else {
        userMessage = 'No flights found for your search criteria. Try adjusting your budget or departure city.';
        errorType = 'search';
      }
    }
    
    return NextResponse.json(
      {
        error: userMessage,
        // Include detailed error information for UI debugging (even in production)
        errorDetails: {
          type: errorType,
          message: technicalDetails,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 500 }
    );
  }
}

