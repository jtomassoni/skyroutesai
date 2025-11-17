import { NextRequest, NextResponse } from 'next/server';
import { searchFlights, SearchParams } from '@/lib/searchFlights';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
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
    return NextResponse.json(
      {
        error: 'An error occurred while searching for flights',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

