# Donation Setup Guide

SkyRoutesAI supports multiple donation methods to help monetize the site alongside AdSense. Choose the option that works best for you.

## Option 1: Stripe Payment Links (Recommended - You Already Have Stripe)

**Pros:**
- ✅ You already have a Stripe account
- ✅ Professional, customizable
- ✅ Low fees: 2.9% + $0.30 per transaction
- ✅ Supports one-time and recurring donations
- ✅ No backend code needed (Payment Links)

**Setup Steps:**

1. **Create a Payment Link in Stripe:**
   - Go to [Stripe Dashboard](https://dashboard.stripe.com)
   - Navigate to **Products** → **Payment Links**
   - Click **"Create payment link"**
   - Set up your donation product:
     - Name: "Support SkyRoutesAI"
     - Description: "Help keep SkyRoutesAI free and ad-supported"
     - Price: Set up multiple price points (e.g., $5, $10, $25, $50, Custom)
     - Enable "Allow customers to enter a custom amount"
   - Copy the payment link (looks like: `https://buy.stripe.com/xxxxx`)

2. **Add to Environment Variables:**
   - Open `.env.local` (create if it doesn't exist)
   - Add:
     ```
     NEXT_PUBLIC_STRIPE_DONATE_LINK=https://buy.stripe.com/your-link-here
     ```

3. **Update DonateButton Component:**
   - The component is already configured to use this environment variable
   - If you prefer to hardcode it, edit `components/DonateButton.tsx` and replace the `STRIPE_PAYMENT_LINK` value

4. **Test:**
   - Visit your site and click the "Support SkyRoutesAI" button
   - It should open your Stripe payment page

**Advanced: Recurring Donations**
- In Stripe Payment Links, you can enable "Recurring" to allow monthly donations
- This is great for building a sustainable revenue stream

---

## Option 2: Buy Me a Coffee (Easiest Setup)

**Pros:**
- ✅ Super easy setup (5 minutes)
- ✅ Beautiful, professional UI
- ✅ Low fees: 5% platform fee + payment processing (~2.9%)
- ✅ Supports one-time and monthly donations
- ✅ Built-in supporter wall/thank you page

**Setup Steps:**

1. **Sign up at [Buy Me a Coffee](https://www.buymeacoffee.com/)**
2. **Get your profile link** (e.g., `https://buymeacoffee.com/yourusername`)
3. **Update `components/DonateButton.tsx`:**
   ```tsx
   // Replace STRIPE_PAYMENT_LINK with:
   const BUY_ME_A_COFFEE_LINK = 'https://buymeacoffee.com/yourusername';
   // Then use BUY_ME_A_COFFEE_LINK in the href attributes
   ```

---

## Option 3: Ko-fi (0% Platform Fee)

**Pros:**
- ✅ 0% platform fee (only payment processing fees)
- ✅ Easy setup
- ✅ Supports one-time and monthly donations
- ✅ Can sell digital products too

**Setup Steps:**

1. **Sign up at [Ko-fi](https://ko-fi.com/)**
2. **Get your profile link** (e.g., `https://ko-fi.com/yourusername`)
3. **Update `components/DonateButton.tsx`** similar to Buy Me a Coffee

---

## Option 4: PayPal Donate Button

**Pros:**
- ✅ Trusted brand
- ✅ Very easy setup
- ✅ Low fees: 2.9% + $0.30

**Setup Steps:**

1. **Get PayPal Donate Button:**
   - Go to [PayPal Button Manager](https://www.paypal.com/buttons/)
   - Create a "Donate" button
   - Copy the HTML code
2. **Update `components/DonateButton.tsx`** to use PayPal's hosted button URL

---

## Recommendation

Since you already have Stripe, **Option 1 (Stripe Payment Links)** is the best choice:
- No additional signups needed
- Professional appearance
- Full control over the experience
- Can easily add recurring donations later
- Lower fees than Buy Me a Coffee

---

## Placement Options

The donate button is currently in the footer. You can also add it:

1. **In the header/navbar** - More visible but can be intrusive
2. **On the About page** - Good for explaining why donations help
3. **After search results** - When users see value, they're more likely to donate
4. **In the loading screen** - While they wait, show the donation option

To add it elsewhere, import and use:
```tsx
import DonateButton from '@/components/DonateButton';

// Use different variants:
<DonateButton variant="default" />  // Full button
<DonateButton variant="footer" />   // Footer style
<DonateButton variant="inline" />   // Compact inline style
```

---

## Best Practices

1. **Be Transparent:** Explain what donations support (e.g., "Help keep SkyRoutesAI free and ad-supported")
2. **Show Value:** Users are more likely to donate after they've used the service
3. **Multiple Options:** Consider offering preset amounts ($5, $10, $25) plus custom
4. **Thank Donors:** Consider a thank you page or message after donation
5. **Track Performance:** Monitor which placement gets the most clicks

---

## Testing

After setup, test:
- ✅ Button appears correctly
- ✅ Link opens in new tab
- ✅ Payment flow works end-to-end
- ✅ Mobile responsiveness
- ✅ Works with ad blockers (some may block donation buttons)

---

## Revenue Strategy

Combine donations with AdSense for dual monetization:
- **AdSense:** Passive revenue from all users
- **Donations:** Active support from engaged users
- **Affiliate Links:** Already set up for flight bookings

This triple approach maximizes revenue potential!

