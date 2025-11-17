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

5. **Restart Your Dev Server**
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

- **Ads not showing?** Check browser console for errors
- **Placeholder still showing?** Make sure `.env.local` is configured correctly
- **AdSense not approved yet?** The placeholder will show until approval

