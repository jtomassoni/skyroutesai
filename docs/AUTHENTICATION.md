# Authentication System

## Overview

SkyRoutesAI now requires user authentication to access real-time flight data. Anonymous users see sample/mock data, while authenticated users get real API results.

## How It Works

### Anonymous Users (Not Logged In)
- Can browse the site and see **sample flight results**
- See prominent banners indicating they're viewing mock data
- Encouraged to sign up for free account
- **Zero API calls** are made (preserves API quota)

### Authenticated Users (Logged In)
- See **real-time flight data** from Amadeus API
- Full access to all features
- Saved searches persist
- API calls are made for their searches

## Authentication Flow

1. **Sign Up**: Users create a free account at `/signup`
2. **Login**: Existing users sign in at `/login`
3. **Session**: Auth token stored in HTTP-only cookie
4. **API Access**: Server checks auth cookie before making API calls

## Implementation Details

### Current Setup (MVP)
- **In-memory user storage** (resets on server restart)
- **Simple token-based auth** (not production-ready)
- **No password hashing** (NOT SECURE - needs improvement)

### Production Requirements
Before going to production, you should:

1. **Add Database**
   - Replace in-memory storage with database (PostgreSQL, MongoDB, etc.)
   - Store users, sessions, and tokens persistently

2. **Password Security**
   - Use `bcrypt` or `argon2` for password hashing
   - Never store plain text passwords
   - Implement password strength requirements

3. **Session Management**
   - Use proper JWT tokens with expiration
   - Implement token refresh
   - Add CSRF protection

4. **Security Best Practices**
   - Rate limiting on auth endpoints
   - Email verification
   - Password reset flow
   - Account lockout after failed attempts

## Files Created

- `/lib/auth.ts` - Auth utilities (user creation, login, token management)
- `/lib/authContext.tsx` - React context for client-side auth state
- `/app/api/auth/login/route.ts` - Login API endpoint
- `/app/api/auth/signup/route.ts` - Signup API endpoint
- `/app/api/auth/logout/route.ts` - Logout API endpoint
- `/app/api/auth/me/route.ts` - Get current user endpoint
- `/app/login/page.tsx` - Login page
- `/app/signup/page.tsx` - Signup page
- `/components/AuthProviderWrapper.tsx` - Auth provider wrapper

## UI Changes

### Mock Data Indicators
- **Top banner** on homepage (when not logged in)
- **Search form notice** indicating sample results
- **Results banner** prominently showing mock data status
- **Login prompts** throughout the UI

### User Menu
- Login button in top-right (when not logged in)
- User name and logout button (when logged in)

## Testing

### Test Anonymous Access
1. Clear cookies or use incognito mode
2. Visit homepage
3. Should see "Sample Results Preview" banner
4. Make a search
5. Should see mock data with prominent banner

### Test Authenticated Access
1. Sign up at `/signup`
2. Should be redirected to homepage
3. Should see your name in top-right
4. Make a search
5. Should see real API data (no mock banner)

## Next Steps

1. **Add Database Integration**
   - Choose database (PostgreSQL recommended)
   - Create user and session tables
   - Update auth functions to use database

2. **Implement Password Hashing**
   ```bash
   npm install bcrypt
   npm install --save-dev @types/bcrypt
   ```

3. **Add Email Verification** (optional)
   - Send verification email on signup
   - Require verification before full access

4. **Add Password Reset** (optional)
   - Forgot password flow
   - Email with reset link

5. **Consider NextAuth.js**
   - More robust auth solution
   - Built-in security features
   - Multiple providers (Google, GitHub, etc.)

## Environment Variables

No additional environment variables needed for basic auth. When you add a database, you'll need:

```bash
DATABASE_URL="postgresql://..."
# or
MONGODB_URI="mongodb://..."
```

## Security Notes

⚠️ **Current implementation is NOT production-ready:**
- Passwords are not hashed
- User data is in-memory (lost on restart)
- No rate limiting
- No CSRF protection
- No email verification

Use this as a starting point and add proper security before production deployment.

