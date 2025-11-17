# Flight APIs Integration Guide

SkyRoutesAI uses multiple flight APIs with fallback support to ensure reliability. This document provides instructions for obtaining API keys and configuring each provider.

## API Priority Order

1. **Amadeus Self-Service API** (Recommended - Primary)
2. **Kiwi (Tequila) API** (Fallback 1)
3. **Skyscanner via RapidAPI** (Fallback 2)
4. **Mock Data** (Final fallback if all APIs fail)

---

## 1. Amadeus Self-Service API

### Overview
- **Free Tier:** ~2,000 calls/month
- **Best for:** Production use, reliable, good coverage
- **Documentation:** https://developers.amadeus.com

### Getting Started

1. **Create Account:**
   - Go to https://developers.amadeus.com
   - Click "Sign Up" and create a free account
   - Verify your email address

2. **Create Application:**
   - Log in to the Amadeus Developer Portal
   - Navigate to "My Self-Service" → "Create New App"
   - Fill in application details:
     - App Name: SkyRoutesAI
     - Description: Flight search application
     - Category: Travel
   - Accept terms and create

3. **Get API Credentials:**
   - After creating the app, you'll see:
     - **API Key** (Client ID)
     - **API Secret** (Client Secret)
   - Copy these values

4. **Set Environment Variables:**
   ```bash
   AMADEUS_API_KEY="your_api_key_here"
   AMADEUS_API_SECRET="your_api_secret_here"
   ```

### API Endpoints Used
- **Flight Inspiration Search:** `/v1/shopping/flight-destinations`
- **Flight Offers Search:** `/v1/shopping/flight-offers`

### Rate Limits
- Free tier: ~2,000 calls/month
- Rate limiting: 10 requests/second
- Monitor usage in the developer dashboard

### Notes
- Requires OAuth 2.0 token authentication
- Token expires after 30 minutes (auto-refresh implemented)
- Best coverage for international flights

---

## 2. Kiwi (Tequila) API

### Overview
- **Free Tier:** ~50-100 daily calls
- **Best for:** Backup option, good for European flights
- **Documentation:** https://tequila.kiwi.com/portal/getting-started

### Getting Started

1. **Create Account:**
   - Go to https://tequila.kiwi.com/portal
   - Click "Sign Up" for free account
   - Complete registration

2. **Get API Key:**
   - After logging in, navigate to "API Keys"
   - Generate a new API key
   - Copy the key (starts with `your_api_key_`)

3. **Set Environment Variable:**
   ```bash
   KIWI_API_KEY="your_api_key_here"
   ```

### API Endpoints Used
- **Locations:** `/locations/query`
- **Search:** `/v2/search`

### Rate Limits
- Free tier: ~50-100 calls/day
- Rate limiting: Varies by endpoint
- Check dashboard for current limits

### Notes
- Simple API key authentication (no OAuth)
- Good for European and budget airline coverage
- Requires location code conversion

---

## 3. Skyscanner via RapidAPI

### Overview
- **Free Tier:** Limited (varies by plan)
- **Best for:** Additional fallback, good coverage
- **Documentation:** https://rapidapi.com/skyscanner/api/skyscanner-flight-search

### Getting Started

1. **Create RapidAPI Account:**
   - Go to https://rapidapi.com
   - Sign up for a free account
   - Verify your email

2. **Subscribe to Skyscanner API:**
   - Search for "Skyscanner Flight Search" in RapidAPI marketplace
   - Click "Subscribe to Test" (free tier)
   - Review pricing tiers

3. **Get API Key:**
   - After subscribing, go to your dashboard
   - Find "Skyscanner Flight Search" in "My Apps"
   - Copy your RapidAPI key (X-RapidAPI-Key)

4. **Set Environment Variable:**
   ```bash
   SKYSCANNER_API_KEY="your_rapidapi_key_here"
   ```

### API Endpoints Used
- **Places:** `/browsequotes/v1.0/{country}/{currency}/{locale}/{originPlace}/{destinationPlace}/{outboundPartialDate}`
- **Browse Quotes:** Various endpoints based on search type

### Rate Limits
- Free tier: Limited (check RapidAPI dashboard)
- Rate limiting: Varies by subscription
- Monitor usage in RapidAPI dashboard

### Notes
- Requires RapidAPI key in headers
- Good global coverage
- May require additional setup for production use

---

## 4. Mock Data Fallback

If all APIs fail, the system falls back to mock data with realistic structure. This ensures the application remains functional during development and API outages.

### Mock Data Structure
```typescript
{
  destination: string;
  price: number;
  currency: string;
  date: string;
  dateRange?: string;
  airline: string;
  fareClass?: string;
  bookingUrl: string;
}
```

### When Mock Data is Used
- All API keys are missing
- All API calls fail
- Rate limits exceeded
- Network errors

---

## Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
# Amadeus Self-Service API (Recommended)
AMADEUS_API_KEY=""
AMADEUS_API_SECRET=""

# Kiwi (Tequila) API
KIWI_API_KEY=""

# Skyscanner via RapidAPI
SKYSCANNER_API_KEY=""
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## Rate Limit Considerations

### Best Practices:
1. **Start with Amadeus** - Best free tier and reliability
2. **Cache results** - Implement client-side caching for repeated searches
3. **Monitor usage** - Check API dashboards regularly
4. **Implement exponential backoff** - For rate limit errors
5. **Use mock data in development** - Save API calls for production testing

### Handling Rate Limits:
- If primary API hits rate limit, automatically try next API
- Log rate limit errors for monitoring
- Show user-friendly message if all APIs are rate-limited
- Consider implementing request queuing for high-traffic scenarios

---

## Supporting Multiple Providers

The search function (`lib/searchFlights.ts`) implements a fallback chain:

1. Try Amadeus API
2. If fails, try Kiwi API
3. If fails, try Skyscanner API
4. If all fail, return mock data

This ensures maximum reliability and uptime.

### Error Handling:
- Network errors: Try next API
- Authentication errors: Log and try next API
- Rate limit errors: Try next API
- Invalid responses: Try next API
- All APIs fail: Return mock data with warning

---

## Testing API Keys

To test if your API keys are working:

1. Set up `.env.local` with your keys
2. Run the development server: `npm run dev`
3. Perform a test search
4. Check browser console and server logs for API responses
5. Verify results are coming from the expected API

---

## Future Enhancements

- Implement request caching to reduce API calls
- Add API usage analytics
- Support for additional flight APIs
- Implement API health monitoring
- Add API response time tracking

---

## Troubleshooting

### Common Issues:

1. **"API key not found"**
   - Ensure `.env.local` exists and contains the keys
   - Restart the development server after adding keys
   - Check for typos in environment variable names

2. **"Authentication failed"**
   - Verify API keys are correct
   - Check if API keys have expired
   - Ensure you're using the correct authentication method

3. **"Rate limit exceeded"**
   - Check your API usage in the provider dashboard
   - Wait for rate limit to reset
   - Consider upgrading to a paid tier if needed

4. **"No results returned"**
   - Verify search parameters are valid
   - Check if API supports the route
   - Try a different departure city

---

## Additional Resources

- [Amadeus API Documentation](https://developers.amadeus.com/self-service)
- [Kiwi API Documentation](https://tequila.kiwi.com/portal/docs/tequila_api)
- [RapidAPI Skyscanner](https://rapidapi.com/skyscanner/api/skyscanner-flight-search)
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

