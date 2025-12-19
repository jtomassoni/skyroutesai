# Flight APIs Integration Guide

SkyRoutesAI uses the **Amadeus Self-Service API** for real flight data. **Mock data has been removed** - the application requires valid API credentials to function.

## API Setup

**Amadeus Self-Service API** (Required - no fallback)

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
   AMADEUS_API_ENV="test"  # Use "test" for test credentials, "production" for production (default: "production")
   ```
   
   **Important:** 
   - Use `AMADEUS_API_ENV="test"` when using test credentials from the Amadeus developer portal
   - Use `AMADEUS_API_ENV="production"` (or omit) when using production credentials
   - Test credentials use `test.api.amadeus.com`, production uses `api.amadeus.com`

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
- **API endpoints:** 
  - Test: `test.api.amadeus.com` (use with test credentials)
  - Production: `api.amadeus.com` (use with production credentials)
- Set `AMADEUS_API_ENV="test"` to use test environment, or `"production"` (default) for production
- **API credentials are required** - the application will not function without them

---

## Environment Variables Setup

Create a `.env.local` file in the project root:

```bash
# Amadeus Self-Service API
AMADEUS_API_KEY=""
AMADEUS_API_SECRET=""
AMADEUS_API_ENV="test"  # or "production" for production credentials
```

**Important:** Never commit `.env.local` to version control. It's already in `.gitignore`.

---

## Rate Limit Considerations

### Best Practices:
1. **Monitor usage** - Check API dashboard regularly (2,000 calls/month free tier)
2. **Cache results** - Implement client-side caching for repeated searches
3. **Implement exponential backoff** - For rate limit errors
4. **Keep API keys secure** - Never commit keys to version control

### Handling Rate Limits:
- Log rate limit errors for monitoring
- Show user-friendly message if rate-limited
- Fallback to mock data if rate limit exceeded
- Consider implementing request queuing for high-traffic scenarios

---

## How It Works

The search function (`lib/searchFlights.ts`) uses the Amadeus API exclusively:

1. Validates API credentials are configured
2. Authenticates with Amadeus API
3. Searches for flight destinations within budget
4. Retrieves detailed flight offers for each destination
5. Returns real flight data

### Error Handling:
- **Missing API keys**: Returns clear error message
- **Authentication failures**: Returns user-friendly error
- **API errors**: Returns descriptive error with details (in development)
- **No results**: Returns empty array (not an error)

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

