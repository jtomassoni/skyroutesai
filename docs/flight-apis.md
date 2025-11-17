# Flight APIs Integration Guide

SkyRoutesAI uses the Amadeus Self-Service API for real flight data, with mock data as a fallback. This document provides instructions for obtaining API keys and configuring the provider.

## API Setup

1. **Amadeus Self-Service API** (Primary)
2. **Mock Data** (Fallback if API fails or keys are missing)

---

## Amadeus Self-Service API

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

## Mock Data Fallback

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
- API keys are missing
- API calls fail
- Rate limits exceeded
- Network errors

---

## Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
# Amadeus Self-Service API
AMADEUS_API_KEY=""
AMADEUS_API_SECRET=""
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## Rate Limit Considerations

### Best Practices:
1. **Monitor usage** - Check API dashboard regularly (2,000 calls/month free tier)
2. **Cache results** - Implement client-side caching for repeated searches
3. **Implement exponential backoff** - For rate limit errors
4. **Use mock data in development** - Save API calls for production testing

### Handling Rate Limits:
- Log rate limit errors for monitoring
- Show user-friendly message if rate-limited
- Fallback to mock data if rate limit exceeded
- Consider implementing request queuing for high-traffic scenarios

---

## How It Works

The search function (`lib/searchFlights.ts`) implements a simple fallback:

1. Try Amadeus API
2. If fails, return mock data

This ensures the application remains functional even if the API is unavailable.

### Error Handling:
- Network errors: Fallback to mock data
- Authentication errors: Log and fallback to mock data
- Rate limit errors: Fallback to mock data
- Invalid responses: Fallback to mock data

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
- [Next.js Environment Variables](https://nextjs.org/docs/basic-features/environment-variables)

