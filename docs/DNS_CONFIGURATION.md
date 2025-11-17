# DNS Configuration Guide for Vercel & Squarespace

This guide explains how to configure DNS settings to connect your domain (whether registered with Squarespace or elsewhere) to your Vercel deployment.

---

## Overview

- **Vercel**: Hosts your Next.js application (skyroutesai.com)
- **Squarespace**: May host your domain registration or you may want to point a Squarespace domain to Vercel

---

## Option 1: Domain Registered with Squarespace, Hosting on Vercel

### Step 1: Add Domain to Vercel

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Domains**
3. Click **Add Domain**
4. Enter your domain: `skyroutesai.com` (and `www.skyroutesai.com` if desired)
5. Vercel will show you DNS records to configure

### Step 2: Configure DNS in Squarespace

1. Log in to your Squarespace account
2. Go to **Settings** → **Domains**
3. Select your domain (`skyroutesai.com`)
4. Click **DNS Settings** or **Advanced DNS**

### Step 3: Add DNS Records

You'll need to add these records in Squarespace:

#### For Root Domain (skyroutesai.com)

**Option A: Using A Record (Recommended)**
```
Type: A
Name: @ (or leave blank for root domain)
Value: 76.76.21.21
TTL: 3600 (or Automatic)
```

**Option B: Using CNAME (Alternative)**
```
Type: CNAME
Name: @ (or leave blank)
Value: cname.vercel-dns.com
TTL: 3600 (or Automatic)
```

**Note:** Some registrars don't allow CNAME on root domain. If Squarespace doesn't support CNAME for root, use A record.

#### For WWW Subdomain (www.skyroutesai.com)

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
TTL: 3600 (or Automatic)
```

### Step 4: Verify in Vercel

1. Go back to Vercel dashboard
2. Wait for DNS propagation (can take up to 48 hours, usually 5-30 minutes)
3. Vercel will show "Valid Configuration" when DNS is correct

---

## Option 2: Domain Registered Elsewhere, Using Squarespace DNS

If your domain is registered elsewhere but you want to use Squarespace DNS:

1. **Get Nameservers from Squarespace**
   - Squarespace → Settings → Domains → DNS Settings
   - Note the nameservers (e.g., `ns1.squarespace.com`, `ns2.squarespace.com`)

2. **Update Nameservers at Your Registrar**
   - Go to your domain registrar (where you bought the domain)
   - Find DNS/Nameserver settings
   - Replace with Squarespace nameservers

3. **Configure DNS Records in Squarespace**
   - Follow Step 3 above to add Vercel DNS records

---

## Option 3: Domain Registered Elsewhere, Direct DNS Configuration

If your domain is registered elsewhere (not Squarespace), configure DNS directly:

### Common Registrars:

#### Namecheap
1. Go to Domain List → Manage → Advanced DNS
2. Add records as shown in Step 3 above

#### GoDaddy
1. Go to My Products → DNS
2. Add records as shown in Step 3 above

#### Google Domains
1. Go to DNS → Custom records
2. Add records as shown in Step 3 above

---

## Vercel DNS Records Reference

### For Root Domain (skyroutesai.com)

**A Record:**
```
Type: A
Name: @
Value: 76.76.21.21
```

**OR CNAME (if supported):**
```
Type: CNAME
Name: @
Value: cname.vercel-dns.com
```

### For WWW Subdomain

```
Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

### For Other Subdomains (e.g., api.skyroutesai.com)

```
Type: CNAME
Name: api (or your subdomain)
Value: cname.vercel-dns.com
```

---

## Important Notes

### DNS Propagation
- DNS changes can take **5 minutes to 48 hours** to propagate globally
- Usually takes **5-30 minutes** for most users
- Use tools like `dig` or [whatsmydns.net](https://www.whatsmydns.net) to check propagation

### SSL/HTTPS
- Vercel automatically provisions SSL certificates via Let's Encrypt
- SSL is enabled automatically once DNS is configured correctly
- No additional configuration needed

### Multiple Domains
- You can add multiple domains in Vercel
- Each domain needs its own DNS records
- Vercel will handle routing automatically

---

## Troubleshooting

### Domain Not Resolving

1. **Check DNS Records**
   ```bash
   # Check A record
   dig skyroutesai.com A
   
   # Check CNAME
   dig www.skyroutesai.com CNAME
   ```

2. **Verify in Vercel**
   - Go to Settings → Domains
   - Check if domain shows "Valid Configuration"
   - Look for any error messages

3. **Wait for Propagation**
   - DNS changes can take time
   - Clear your DNS cache: `sudo dscacheutil -flushcache` (macOS)

### Common Issues

**Issue: "Invalid Configuration" in Vercel**
- Solution: Double-check DNS records match exactly what Vercel shows
- Ensure no conflicting records exist

**Issue: Domain points to wrong location**
- Solution: Check for old DNS records and remove them
- Ensure TTL is set appropriately (3600 seconds recommended)

**Issue: WWW not working**
- Solution: Ensure CNAME record for `www` subdomain is set correctly

---

## Squarespace-Specific Notes

### Squarespace DNS Limitations
- Some Squarespace plans may have DNS limitations
- Check your Squarespace plan for DNS management capabilities
- Business/Commerce plans typically have full DNS access

### Squarespace Domain Transfer
- If you want to transfer domain FROM Squarespace to another registrar:
  1. Unlock domain in Squarespace
  2. Get authorization code
  3. Initiate transfer at new registrar
  4. Update DNS records at new registrar

### Squarespace Domain Pointing
- If you want to keep domain registered with Squarespace but host on Vercel:
  - Use DNS settings in Squarespace (as shown above)
  - No transfer needed

---

## Quick Reference: Vercel DNS Values

```
Root Domain A Record:
  76.76.21.21

Root Domain CNAME (if supported):
  cname.vercel-dns.com

WWW CNAME:
  cname.vercel-dns.com

Other Subdomains CNAME:
  cname.vercel-dns.com
```

**Note:** Vercel's IP addresses may change. Always check your Vercel dashboard for the most current DNS values.

---

## Step-by-Step Checklist

- [ ] Domain registered (Squarespace or elsewhere)
- [ ] Vercel project created and deployed
- [ ] Domain added to Vercel project
- [ ] DNS records obtained from Vercel dashboard
- [ ] DNS records added to domain registrar/Squarespace
- [ ] Wait for DNS propagation (5-30 minutes typically)
- [ ] Verify domain resolves correctly
- [ ] Check SSL certificate is active in Vercel
- [ ] Test both root domain and www subdomain

---

## Additional Resources

- [Vercel DNS Documentation](https://vercel.com/docs/concepts/projects/domains)
- [Squarespace DNS Help](https://support.squarespace.com/hc/en-us/articles/205812668)
- [DNS Propagation Checker](https://www.whatsmydns.net)
- [Vercel Domain Troubleshooting](https://vercel.com/docs/concepts/projects/domains/troubleshooting)

---

## For SkyRoutesAI Specifically

Once DNS is configured:

1. **Production URL**: `https://skyroutesai.com`
2. **WWW URL**: `https://www.skyroutesai.com` (if configured)
3. **Vercel Preview URLs**: Still work for preview deployments
4. **SSL**: Automatically enabled by Vercel

Update your `app/layout.tsx` metadata URLs once DNS is live:
```typescript
url: "https://skyroutesai.com",
openGraph: {
  url: "https://skyroutesai.com",
  // ...
}
```

