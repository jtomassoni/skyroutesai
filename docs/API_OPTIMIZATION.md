# API Optimization & Mock Data Guide

## Overview

To preserve our 2,000 free API calls per month, we've implemented:
1. **Mock data for anonymous users** - No API calls used
2. **Optimized real API searches** - Reduced from ~45+ calls to ~15-20 calls per search
3. **Account requirement for real data** - Ensures legitimate usage

## How It Works

### Anonymous Users (Mock Data)
- Anonymous users see **realistic sample flight data**
- **Zero API calls** are made
- Mock data is generated based on search parameters
- Users see a banner indicating these are sample results
- Users are prompted to create an account for real data

### Authenticated Users (Real API)
- Authenticated users get **real-time flight data** from Amadeus API
- Optimized to use **~15-20 API calls per search** (down from 45+)
- Only searches 1 date per destination (instead of 3)
- Limits to 15 destinations max (instead of 30+)
- Uses flight-destinations endpoint when available, falls back to popular destinations

## API Call Optimization

### Smart Multi-Date Search Strategy

The optimized approach uses a two-phase strategy:

**Phase 1: Destination Discovery (3-4 API calls)**
- Search `flight-destinations` across 3-4 key dates spread across the search period
- Identifies destinations that are consistently available
- Prioritizes destinations that appear in multiple date searches

**Phase 2: Price Discovery (varies by destination)**
- **High-priority destinations** (found in multiple dates): Search ALL dates to find best price
- **Lower-priority destinations**: Search a good sample of dates (every other date + first 6)
- Tracks best price across all dates for each destination

### API Call Estimates

**Typical search (3 months, 30 destinations found):**
- Destination discovery: ~4 calls (flight-destinations)
- Price discovery: ~15-25 calls (flight-offers)
- **Total: ~20-30 API calls per search**

**With optimization:**
- Can handle **~66-100 searches per month** with real API
- Plus unlimited anonymous searches using mock data (0 API calls)

### Why This Works Better

1. **Comprehensive**: Still searches multiple dates to find best prices
2. **Efficient**: Prioritizes destinations likely to have availability
3. **Smart**: High-priority destinations get full date range, others get good sample
4. **Scalable**: Mock data for anonymous users preserves quota for authenticated users

## Configuration

### Environment Variables

```bash
# Amadeus API credentials (required for authenticated users)
AMADEUS_API_KEY="your_key"
AMADEUS_API_SECRET="your_secret"
AMADEUS_API_ENV="test"  # or "production"

# Optional: Whitelist authenticated users (comma-separated)
AUTHENTICATED_USER_IDS="user123,user456,user789"
AUTHENTICATED_API_KEYS="key1,key2,key3"
```

### Authentication

The system automatically uses:
- **Anonymous users** → Mock data (no API calls)
- **Authenticated users** → Real API data

**Authentication methods supported:**
1. `Authorization: Bearer <token>` header
2. `auth-token` cookie
3. `x-api-key` header (validated against `AUTHENTICATED_API_KEYS` if set)
4. `x-user-id` header (validated against `AUTHENTICATED_USER_IDS` if set)

**To implement proper authentication:**
1. Set up NextAuth, Clerk, or your preferred auth solution
2. Update `isAuthenticated()` function in `/app/api/search-flights/route.ts` to check your auth system
3. Add login/signup pages
4. Set `AUTHENTICATED_USER_IDS` or `AUTHENTICATED_API_KEYS` for whitelisting (optional)

## Mock Data Features

- **Realistic pricing** based on destination and budget
- **Popular destinations** from major airports
- **Random dates** within the search window
- **Variety of airlines** and fare classes
- **Proper formatting** matching real API responses

## Next Steps

1. **Implement Authentication**
   - Add NextAuth or Clerk
   - Create signup/login pages
   - Update auth check in API route

2. **Monitor API Usage**
   - Track calls in Amadeus dashboard
   - Set up alerts at 80% usage
   - Consider upgrading if needed

3. **Optimize Further** (if needed)
   - Cache popular searches
   - Batch requests
   - Use flight-destinations more efficiently

## Testing

### Test Mock Data (Anonymous)
1. Make a search without any authentication headers/cookies
2. Should see mock data with yellow banner
3. Zero API calls made

### Test Real API (Authenticated)
1. Add authentication to your request:
   - `Authorization: Bearer <token>` header, OR
   - `auth-token` cookie, OR
   - `x-api-key: <key>` header (if using API key auth)
2. Make a search
3. Should see real API data
4. Check server logs for API call count

## Cost Management

- **Free tier**: 2,000 calls/month
- **Optimized usage**: ~15 calls/search = 133 searches/month
- **With mock data**: Unlimited anonymous searches
- **Revenue**: AdSense + affiliate links should cover API costs once traffic grows

