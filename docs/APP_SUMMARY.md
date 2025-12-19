# SkyRoutesAI - Application Summary

## Overview

SkyRoutesAI was a flight search application that helped users discover destinations they could fly to from their departure city within a specified budget over a 1-6 month period. The app used the Amadeus Self-Service API for real-time flight data and implemented a freemium model where anonymous users saw mock data and authenticated users received real API results.

## Core Features

1. **Budget-Based Flight Search**
   - Users input departure airport (IATA code), maximum budget, and search window (1-6 months)
   - Returns destinations with flight prices within budget
   - Results sorted by price (cheapest first)

2. **Smart Search Optimization**
   - Two-phase search strategy to minimize API calls
   - Phase 1: Destination discovery using flight-destinations endpoint
   - Phase 2: Price discovery across multiple dates for each destination
   - Optimized from 45+ API calls per search down to ~15-20 calls

3. **Basic Economy Filtering**
   - Optional filter to exclude basic economy fares
   - Detects fare classes: BASIC, BASIC ECONOMY, E, LIGHT, NO-FRILLS, ECONOMY BASIC

4. **Authentication Model**
   - Anonymous users: Mock data (unlimited, zero API calls)
   - Authenticated users: Real API data (limited by API quota)
   - Authentication via Bearer token, cookie, or API key header

5. **Saved Searches**
   - LocalStorage-based search history
   - Users could save and re-run previous searches

6. **Ad Integration**
   - Google AdSense display ads
   - Ads shown during loading screen (10-30 seconds) and at bottom of results

7. **Affiliate Links**
   - TravelPayouts integration for booking URLs
   - Commission tracking on flight bookings

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Icons**: React Icons (Font Awesome)
- **State Management**: React hooks (useState, useRef)
- **Storage**: localStorage (client-side)
- **API**: Amadeus Self-Service API

## Architecture

### Project Structure
```
skyroutesai/
├── app/
│   ├── api/
│   │   └── search-flights/route.ts    # API endpoint for flight searches
│   ├── page.tsx                        # Main homepage (now coming soon)
│   ├── layout.tsx                      # Root layout with metadata
│   ├── login/page.tsx                  # Login page
│   ├── signup/page.tsx                 # Signup page
│   └── [other pages]
├── components/
│   ├── SearchForm.tsx                  # Search input form
│   ├── FlightResults.tsx               # Results display component
│   ├── LoadingScreen.tsx              # Loading screen with ads
│   ├── SavedSearches.tsx               # Saved search history
│   ├── AdSense.tsx                     # Google AdSense component
│   └── [other components]
├── lib/
│   ├── searchFlights.ts                # Core search logic & Amadeus integration
│   ├── mockFlights.ts                  # Mock data generator
│   ├── auth.ts                          # Authentication utilities
│   ├── authContext.tsx                  # Auth context provider
│   ├── localStorage.ts                 # LocalStorage utilities
│   ├── affiliateLinks.ts               # Affiliate link wrapper
│   └── analytics.ts                    # Analytics tracking
└── docs/
    └── [documentation files]
```

### Data Flow

1. **User submits search** → `SearchForm` component
2. **POST request** → `/api/search-flights` endpoint
3. **Authentication check** → Determines if user gets real or mock data
4. **Search execution**:
   - Authenticated: `searchFlights()` → Amadeus API calls
   - Anonymous: `generateMockFlights()` → Mock data
5. **Results returned** → `FlightResults` component displays
6. **Loading screen** → Shows during search (10-30 seconds) with ads

## Amadeus API Integration

### Base URLs
- **Test Environment**: `https://test.api.amadeus.com`
- **Production Environment**: `https://api.amadeus.com`
- Controlled by `AMADEUS_API_ENV` environment variable

### Authentication
**Endpoint**: `POST /v1/security/oauth2/token`

**Request**:
```typescript
POST https://api.amadeus.com/v1/security/oauth2/token
Content-Type: application/x-www-form-urlencoded

grant_type=client_credentials
client_id={AMADEUS_API_KEY}
client_secret={AMADEUS_API_SECRET}
```

**Response**:
```json
{
  "access_token": "string",
  "token_type": "Bearer",
  "expires_in": 1799
}
```

**Notes**:
- Token expires after 30 minutes
- Uses OAuth 2.0 client credentials flow
- Token required for all subsequent API calls

---

### API Endpoints Used

#### 1. Flight Inspiration Search (Destination Discovery)
**Endpoint**: `GET /v1/shopping/flight-destinations`

**Purpose**: Discover destinations available from an origin within a budget on a specific date

**Request Parameters**:
- `origin` (required): IATA airport code (3 letters, e.g., "JFK", "LAX")
- `maxPrice` (required): Maximum price in USD (e.g., 500)
- `departureDate` (required): Date in YYYY-MM-DD format (must be future date)

**Example Request**:
```typescript
GET https://api.amadeus.com/v1/shopping/flight-destinations?origin=JFK&maxPrice=500&departureDate=2024-06-15
Headers:
  Authorization: Bearer {access_token}
  Accept: application/vnd.amadeus+json
```

**Response Structure**:
```json
{
  "data": [
    {
      "type": "flight-destination",
      "origin": "JFK",
      "destination": "LAX",
      "destinationName": "Los Angeles",
      "departureDate": "2024-06-15",
      "returnDate": "2024-06-22",
      "price": {
        "total": "450.00",
        "currency": "USD"
      }
    }
  ],
  "meta": {
    "count": 1
  }
}
```

**Usage in App**:
- Called 3-4 times across different key dates to find consistently available destinations
- Results aggregated to prioritize destinations that appear in multiple searches
- Used as Phase 1 of the two-phase search strategy

---

#### 2. Flight Offers Search (Price Discovery)
**Endpoint**: `GET /v1/shopping/flight-offers`

**Purpose**: Get detailed flight offers for a specific origin-destination pair on a specific date

**Request Parameters**:
- `originLocationCode` (required): IATA airport code (3 letters)
- `destinationLocationCode` (required): IATA airport code (3 letters)
- `departureDate` (required): Date in YYYY-MM-DD format
- `adults` (required): Number of adults (default: 1)
- `maxPrice` (optional): Maximum price filter
- `currencyCode` (optional): Currency code (default: USD)
- `max` (optional): Maximum number of results (default: 10)

**Example Request**:
```typescript
GET https://api.amadeus.com/v1/shopping/flight-offers?originLocationCode=JFK&destinationLocationCode=LAX&departureDate=2024-06-15&adults=1&maxPrice=500&currencyCode=USD&max=10
Headers:
  Authorization: Bearer {access_token}
  Accept: application/vnd.amadeus+json
```

**Response Structure**:
```json
{
  "data": [
    {
      "type": "flight-offer",
      "id": "string",
      "source": "GDS",
      "instantTicketingRequired": false,
      "nonHomogeneous": false,
      "oneWay": true,
      "lastTicketingDate": "2024-06-01",
      "numberOfBookableSeats": 9,
      "itineraries": [
        {
          "duration": "PT5H30M",
          "segments": [
            {
              "departure": {
                "iataCode": "JFK",
                "terminal": "4",
                "at": "2024-06-15T10:00:00"
              },
              "arrival": {
                "iataCode": "LAX",
                "terminal": "B",
                "at": "2024-06-15T15:30:00"
              },
              "carrierCode": "AA",
              "number": "100",
              "aircraft": {
                "code": "321"
              },
              "duration": "PT5H30M",
              "numberOfStops": 0,
              "blacklistedInEU": false
            }
          ]
        }
      ],
      "price": {
        "currency": "USD",
        "total": "450.00",
        "base": "400.00",
        "fees": [
          {
            "amount": "50.00",
            "type": "SUPPLIER"
          }
        ],
        "grandTotal": "450.00"
      },
      "pricingOptions": {
        "fareType": ["PUBLISHED"],
        "includedCheckedBagsOnly": true
      },
      "validatingAirlineCodes": ["AA"],
      "travelerPricings": [
        {
          "travelerId": "1",
          "fareOption": "STANDARD",
          "travelerType": "ADULT",
          "price": {
            "currency": "USD",
            "total": "450.00",
            "base": "400.00"
          },
          "fareDetailsBySegment": [
            {
              "segmentId": "1",
              "cabin": "ECONOMY",
              "fareBasis": "Y",
              "class": "Y",
              "includedCheckedBags": {
                "quantity": 1
              }
            }
          ]
        }
      ]
    }
  ],
  "dictionaries": {
    "locations": {
      "JFK": {
        "cityCode": "NYC",
        "countryCode": "US",
        "detailedName": "JOHN F KENNEDY INTL"
      },
      "LAX": {
        "cityCode": "LAX",
        "countryCode": "US",
        "detailedName": "LOS ANGELES INTL"
      }
    },
    "aircraft": {
      "321": "AIRBUS A321"
    },
    "currencies": {
      "USD": "US DOLLAR"
    },
    "carriers": {
      "AA": "AMERICAN AIRLINES"
    }
  },
  "meta": {
    "count": 1
  }
}
```

**Usage in App**:
- Called for each destination found in Phase 1
- Searched across multiple dates (weekly intervals) to find best price
- High-priority destinations: Search all dates
- Lower-priority destinations: Search every other date + first 6 dates
- Results filtered by budget and sorted by price
- Best price across all dates selected for each destination

---

### API Call Optimization Strategy

**Two-Phase Approach**:

**Phase 1: Destination Discovery (3-4 API calls)**
- Search `flight-destinations` across 3-4 key dates spread across search period
- Identifies destinations consistently available
- Prioritizes destinations appearing in multiple date searches

**Phase 2: Price Discovery (varies by destination)**
- For each destination found:
  - High-priority (found in multiple dates): Search ALL dates to find best price
  - Lower-priority: Search sample of dates (every other date + first 6)
- Tracks best price across all dates for each destination

**Total API Calls per Search**:
- Typical search: ~15-20 API calls (down from 45+)
- Destination discovery: 3-4 calls
- Price discovery: 12-16 calls (varies by number of destinations found)

**Fallback Strategy**:
- If `flight-destinations` fails, uses hardcoded list of popular destinations
- Popular destinations list includes major US hubs and international airports

---

### Error Handling

**Authentication Errors**:
- 401: Invalid credentials → Clear error message
- 403: Access forbidden → Check environment (test vs production)

**API Errors**:
- 404: No flights found → Continue to next date/destination
- 500: Server error → Log warning, continue with fallback
- Rate limiting: Not explicitly handled (would need retry logic)

**Validation**:
- Origin must be 3-letter IATA code
- Budget must be between 1 and 100,000
- Months ahead must be between 1 and 6
- Dates must be in the future

---

### Environment Variables

```bash
# Required
AMADEUS_API_KEY="your_api_key"
AMADEUS_API_SECRET="your_api_secret"
AMADEUS_API_ENV="test"  # or "production"

# Optional
NEXT_PUBLIC_AFFILIATE_MARKER="travelpayouts_marker"
NEXT_PUBLIC_AFFILIATE_SUB_ID="sub_id"
NEXT_PUBLIC_ADSENSE_CLIENT_ID="ca-pub-xxxxx"
NEXT_PUBLIC_ADSENSE_AD_SLOT_LOADING="slot_id"
```

---

### Rate Limits & Quotas

- **Free Tier**: ~2,000 API calls/month
- **Rate Limiting**: 10 requests/second
- **Token Expiration**: 30 minutes (auto-refresh needed)
- **Optimized Usage**: ~66-100 real searches/month (with 2,000 calls)
- **With 20-150 calls/month**: 1-10 real searches/month

---

## Key Components

### SearchForm
- Input fields: Origin (IATA code), Budget, Months Ahead, Basic Economy filter
- Form validation
- Submit handler

### FlightResults
- Displays flight results in card format
- Shows: Destination, Price, Date, Airline, Fare Class
- "Book" button with affiliate link
- AdSense ad at bottom

### LoadingScreen
- Modal overlay during search
- Progress bar (10-30 second duration)
- AdSense ad display
- Skip button (dev only)

### SavedSearches
- LocalStorage-based search history
- Re-run previous searches
- Delete saved searches

---

## Data Models

### FlightResult Interface
```typescript
interface FlightResult {
  destination: string;           // Full destination name
  destinationCode: string;        // IATA code
  price: number;                 // Price in USD
  currency: string;               // Currency code
  date: string;                  // Departure date (YYYY-MM-DD)
  dateRange?: string;            // Optional date range
  airline: string;               // Airline code/name
  fareClass?: string;            // Fare class (ECONOMY, BUSINESS, etc.)
  bookingUrl: string;            // Affiliate-wrapped booking URL
  source: 'amadeus';             // Data source
  fareClassNote?: string;        // Note about fare class
}
```

### SearchParams Interface
```typescript
interface SearchParams {
  origin: string;                // IATA airport code
  maxBudget: number;              // Maximum price in USD
  monthsAhead: number;           // Search window (1-6 months)
  excludeBasicEconomy: boolean;  // Filter basic economy
}
```

---

## Authentication Flow

1. User makes request to `/api/search-flights`
2. `isAuthenticated()` checks for:
   - `Authorization: Bearer <token>` header
   - `auth-token` cookie
   - `x-api-key` header (validated against whitelist)
   - `x-user-id` header (validated against whitelist)
3. If authenticated → Real API data
4. If anonymous → Mock data (no API calls)

---

## Mock Data System

- Generated for anonymous users
- Zero API calls
- Realistic pricing based on destination and budget
- Popular destinations from major airports
- Random dates within search window
- Variety of airlines and fare classes
- Banner indicates sample results

---

## Revenue Model (Attempted)

1. **Google AdSense**: Display ads during loading and results
   - Revenue: ~$0.001-$0.005 per impression
   - Not viable at low traffic

2. **Affiliate Commissions**: TravelPayouts integration
   - Commission: $4-$48 per booking
   - Requires significant traffic (rejected due to low traffic)

3. **Paid Tier**: Not implemented
   - Would charge $5-$10/month for real searches
   - Would cover API costs

**Viability**: Not viable with 20-150 free API calls/month and low traffic

---

## Key Learnings & Challenges

1. **API Cost vs Revenue**: Display ads generate pennies, not enough to cover costs
2. **Traffic Catch-22**: Need traffic for affiliate approval, need revenue for traffic
3. **API Quota Limits**: 20-150 calls/month severely limits real searches
4. **Optimization Success**: Reduced API calls from 45+ to 15-20 per search
5. **Mock Data Strategy**: Good for preserving API quota, but can't monetize anonymous users

---

## Files to Reference

- **Core Search Logic**: `lib/searchFlights.ts`
- **API Route**: `app/api/search-flights/route.ts`
- **Mock Data**: `lib/mockFlights.ts`
- **Authentication**: `lib/auth.ts`, `lib/authContext.tsx`
- **Components**: `components/SearchForm.tsx`, `components/FlightResults.tsx`
- **Documentation**: `docs/API_OPTIMIZATION.md`, `docs/flight-apis.md`

---

This summary provides a complete overview of the SkyRoutesAI application architecture, Amadeus API integration, and implementation details for reference or future development.

