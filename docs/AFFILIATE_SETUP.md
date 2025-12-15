# Affiliate Program Setup Guide

## Quick Start - TravelPayouts (Recommended)

**Why TravelPayouts?**
- Easy signup (usually approved in 1-2 days)
- Aggregates multiple travel sites (Skyscanner, Aviasales, etc.)
- Good commission rates (2-8% on bookings)
- Works with flight searches
- No minimum traffic requirements

### Setup Steps:

1. **Sign Up**
   - Go to https://www.travelpayouts.com/
   - Click "Sign Up" and create an account
   - Verify your email

2. **Get Your Brand/Marker (shmarker)**
   - After login, go to "Tools" → "Links" (or "Generate links")
   - Select your brand (e.g., "Skyroutesai" if you added it)
   - The shmarker is your brand/program identifier
   - You can also find it in the generated link format: `?shmarker=YOUR_ID`
   - It looks like: `123456` or `abc123def456`

3. **Configure Environment Variable**
   - Create/update `.env.local`:
   ```
   NEXT_PUBLIC_AFFILIATE_MARKER=your_shmarker_here
   NEXT_PUBLIC_AFFILIATE_SUB_ID=optional_sub_id_for_tracking
   ```

4. **How It Works**
   - The code automatically wraps all booking URLs with TravelPayouts tracking
   - Format: `https://www.travelpayouts.com/click?shmarker=YOUR_ID&url=ENCODED_BOOKING_URL`
   - You can also manually generate links in TravelPayouts dashboard and use those directly

5. **Restart Dev Server**
   ```bash
   npm run dev
   ```

6. **Test**
   - Click any "Book on [Airline]" button
   - The URL should redirect through TravelPayouts
   - Check the URL - it should contain `travelpayouts.com/click?shmarker=`
   - You'll earn commission on any bookings

---

## Alternative Options

### Expedia Affiliate Network
- Sign up: https://www.expedia.com/p/network-affiliate
- Good for: Direct bookings, hotel + flight packages
- Commission: 2-4% on flights
- Update `lib/affiliateLinks.ts` to use Expedia option (uncomment Expedia code)

### Skyscanner Affiliate
- Sign up: https://www.skyscanner.net/affiliates/
- Good for: Flight searches, comparison shopping
- Commission: Pay-per-click model
- Update `lib/affiliateLinks.ts` to use Skyscanner option

### Kayak Affiliate
- Sign up: https://www.kayak.com/affiliates
- Good for: Flight searches, travel planning
- Commission: Revenue share model

---

## How It Works

1. User clicks "Book on [Airline]" button
2. URL is wrapped with your affiliate marker
3. User is redirected through affiliate network
4. If they book, you earn commission
5. Commission is tracked automatically by the affiliate network

## Revenue Tips

- **More clicks = more opportunities**: Every button click is a potential commission
- **Multiple placements**: Consider adding affiliate links in multiple places
- **Track performance**: Check your affiliate dashboard regularly
- **Optimize**: Test different button text/placement to improve click-through rates

## Troubleshooting

- **Links not working?** Check that `NEXT_PUBLIC_AFFILIATE_MARKER` is set correctly
- **No commission tracking?** Make sure you're using the correct marker format
- **Want to test?** Click links and check the URL - it should include your marker

