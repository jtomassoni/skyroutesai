/**
 * Affiliate Link Wrapper
 * 
 * Wraps booking URLs with affiliate tracking for commission revenue.
 * 
 * Setup Instructions:
 * 1. Sign up for TravelPayouts: https://www.travelpayouts.com/
 *    OR Expedia Affiliate Network: https://www.expedia.com/p/network-affiliate
 * 2. Get your affiliate marker/token
 * 3. Add to .env.local: NEXT_PUBLIC_AFFILIATE_MARKER=your_marker
 * 4. Update the wrapAffiliateLink function below with your chosen platform
 */

interface AffiliateParams {
  origin: string;
  destination: string;
  destinationCode: string;
  date: string;
  price: number;
  airline?: string;
}

/**
 * Wraps a booking URL with affiliate tracking
 * 
 * TravelPayouts Format:
 * - Use the link generator in TravelPayouts dashboard: Tools → Links
 * - Or use the format: https://www.travelpayouts.com/click?shmarker=BRAND_ID&url=ENCODED_URL
 * - Your shmarker is your brand/program ID from TravelPayouts
 */
export function wrapAffiliateLink(
  originalUrl: string,
  params: AffiliateParams
): string {
  const affiliateMarker = process.env.NEXT_PUBLIC_AFFILIATE_MARKER || '';
  const subId = process.env.NEXT_PUBLIC_AFFILIATE_SUB_ID || '';
  
  // If no affiliate marker configured, return original URL
  if (!affiliateMarker) {
    return originalUrl;
  }

  // TravelPayouts link format
  // Format: https://www.travelpayouts.com/click?shmarker=BRAND_ID&url=ENCODED_URL
  // Get your shmarker from TravelPayouts dashboard → Tools → Links → Your brand
  const travelPayoutsUrl = new URL('https://www.travelpayouts.com/click');
  travelPayoutsUrl.searchParams.set('shmarker', affiliateMarker);
  
  // Encode the destination URL
  travelPayoutsUrl.searchParams.set('url', encodeURIComponent(originalUrl));
  
  // Optional: Add sub ID for tracking (useful for A/B testing or campaign tracking)
  if (subId) {
    travelPayoutsUrl.searchParams.set('subid', subId);
  }
  
  return travelPayoutsUrl.toString();

  // Option 2: Expedia Affiliate Network (uncomment to use)
  // Sign up at: https://www.expedia.com/p/network-affiliate
  // const expediaUrl = new URL('https://www.expedia.com/Flights-Search');
  // expediaUrl.searchParams.set('flight-0', `from:${params.origin},to:${params.destinationCode},departure:${params.date}`);
  // expediaUrl.searchParams.set('mode', 'search');
  // expediaUrl.searchParams.set('leg1', `from:${params.origin},to:${params.destinationCode},departure:${params.date}`);
  // expediaUrl.searchParams.set('passengers', 'adults:1');
  // expediaUrl.searchParams.set('trip', 'oneway');
  // expediaUrl.searchParams.set('locale', 'en_US');
  // expediaUrl.searchParams.set('siteid', affiliateMarker);
  // return expediaUrl.toString();

  // Option 3: Skyscanner Affiliate (uncomment to use)
  // Sign up at: https://www.skyscanner.net/affiliates/
  // const skyscannerUrl = new URL('https://www.skyscanner.com/transport/flights');
  // skyscannerUrl.searchParams.set('from', params.origin);
  // skyscannerUrl.searchParams.set('to', params.destinationCode);
  // skyscannerUrl.searchParams.set('depart', params.date);
  // skyscannerUrl.searchParams.set('adults', '1');
  // skyscannerUrl.searchParams.set('preferdirects', 'false');
  // skyscannerUrl.searchParams.set('rtn', 'f');
  // skyscannerUrl.searchParams.set('cabinclass', 'economy');
  // skyscannerUrl.searchParams.set('preferflexible', 'false');
  // skyscannerUrl.searchParams.set('ref', affiliateMarker);
  // return skyscannerUrl.toString();
}

/**
 * Creates a flight search URL with affiliate tracking
 * This is useful when you want to send users to a search page instead of direct booking
 */
export function createAffiliateSearchUrl(params: AffiliateParams): string {
  const affiliateMarker = process.env.NEXT_PUBLIC_AFFILIATE_MARKER || '';
  
  if (!affiliateMarker) {
    // Fallback to Skyscanner without affiliate if not configured
    const url = new URL('https://www.skyscanner.com/transport/flights');
    url.searchParams.set('from', params.origin);
    url.searchParams.set('to', params.destinationCode);
    url.searchParams.set('depart', params.date);
    url.searchParams.set('adults', '1');
    return url.toString();
  }

  // TravelPayouts Skyscanner link
  const url = new URL('https://www.travelpayouts.com/click');
  url.searchParams.set('shmarker', affiliateMarker);
  
  const skyscannerUrl = new URL('https://www.skyscanner.com/transport/flights');
  skyscannerUrl.searchParams.set('from', params.origin);
  skyscannerUrl.searchParams.set('to', params.destinationCode);
  skyscannerUrl.searchParams.set('depart', params.date);
  skyscannerUrl.searchParams.set('adults', '1');
  
  url.searchParams.set('url', skyscannerUrl.toString());
  return url.toString();
}

