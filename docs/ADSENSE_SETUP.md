# Google AdSense Setup Guide

## Quick Setup Steps

1. **Sign up for Google AdSense**
   - Go to https://www.google.com/adsense/
   - Sign in with your Google account
   - Add your website (skyroutesai.com)
   - Wait for approval (usually 1-2 weeks)

2. **Get Your AdSense Publisher ID**
   - Once approved, go to AdSense dashboard
   - Navigate to "Ads" → "By ad unit"
   - Create a new ad unit (choose "Display ads" → "Responsive")
   - Copy your Publisher ID (starts with `ca-pub-`)
   - Copy your Ad Slot ID (the number for the ad unit)

3. **Configure Environment Variables**
   - Create a `.env.local` file in the root directory
   - Add your AdSense credentials:
   ```
   NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXX
   NEXT_PUBLIC_ADSENSE_AD_SLOT_LOADING=1234567890
   ```

4. **Update Ad Slot IDs**
   - Open `components/LoadingScreen.tsx`
   - Replace `YOUR_AD_SLOT_ID` with your actual ad slot ID
   - Or use the environment variable: `process.env.NEXT_PUBLIC_ADSENSE_AD_SLOT_LOADING`

5. **Create ads.txt File (REQUIRED)**
   - The `ads.txt` file has been created in `/public/ads.txt`
   - This file authorizes Google AdSense to serve ads on your site
   - It contains: `google.com, pub-3373780887120786, DIRECT, f08c47fec0942fa0`
   - After deploying, verify it's accessible at: `https://skyroutesai.com/ads.txt`
   - AdSense will automatically crawl this file (may take 24-48 hours)

6. **Restart Your Dev Server**
   ```bash
   npm run dev
   ```

## How It Works

- **Before Approval**: Shows a placeholder ad slot
- **After Approval**: Automatically loads real Google AdSense ads
- **Passive Revenue**: Ads display automatically, you get paid per click/impression

## Tips for Better Revenue

1. **Ad Placement**: The loading screen is a great spot - users see it every search
2. **More Ad Slots**: Consider adding ads in:
   - Between flight results
   - Sidebar (if you add one)
   - Footer
3. **Content**: More content = more ad opportunities
4. **Traffic**: More users = more revenue

## Troubleshooting

### Ads Not Showing in Local Development
**This is expected behavior!** Google AdSense does **not** serve ads on localhost (localhost, 127.0.0.1, or [::1]). This is a security feature by Google.

**To verify ads are working:**
1. Deploy to production (skyroutesai.com)
2. Visit your production site
3. Ads should display automatically once AdSense is approved

The component will show a helpful message in local development indicating ads won't display locally.

### Other Issues

- **Ads not showing in production?** 
  - Check browser console for errors
  - Verify AdSense account is approved
  - Ensure `ads.txt` is accessible at `https://skyroutesai.com/ads.txt`
  - Check AdSense dashboard for any policy violations

- **Placeholder still showing?** 
  - Make sure `.env.local` is configured correctly (though hardcoded values are used)
  - Check that the AdSense script is loading (check Network tab)

- **AdSense not approved yet?** 
  - The placeholder will show until approval
  - Approval typically takes 1-2 weeks

- **ads.txt not found?** 
  - Verify the file exists at `/public/ads.txt` in your project
  - After deploying, check that `https://skyroutesai.com/ads.txt` is accessible
  - AdSense crawls ads.txt every 24-48 hours, so changes may take time to reflect
  - In AdSense dashboard, go to "Sites" → "ads.txt" to check status

### Verification Checklist

✅ AdSense account approved  
✅ `ads.txt` file deployed and accessible at `https://skyroutesai.com/ads.txt`  
✅ AdSense script loaded in `app/layout.tsx`  
✅ Ad component properly initialized  
✅ Testing on production domain (not localhost)

