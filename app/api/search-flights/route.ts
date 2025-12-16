import { NextRequest, NextResponse } from 'next/server';
import { searchFlights, SearchParams } from '@/lib/searchFlights';

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

    const results = await searchFlights(searchParams);

    return NextResponse.json({
      success: true,
      results,
      count: results.length,
    });
  } catch (error) {
    console.error('Search flights API error:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    // Provide user-friendly error messages
    let userMessage = 'Unable to search for flights at this time.';
    if (errorMessage.includes('API credentials are not configured')) {
      userMessage = 'Flight search service is not configured. Please contact support.';
    } else if (errorMessage.includes('Failed to authenticate')) {
      userMessage = 'Flight search service authentication failed. Please try again later.';
    } else if (errorMessage.includes('API search failed')) {
      userMessage = 'No flights found for your search criteria. Try adjusting your budget or departure city.';
    }
    
    return NextResponse.json(
      {
        error: userMessage,
        details: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    );
  }
}

