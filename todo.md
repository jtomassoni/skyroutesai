# SkyRoutesAI Development Todo

## Project Overview
SkyRoutesAI answers: "Where can I fly from my departure city within my budget over the next 1–6 months?"

**MVP Requirements:**
- No accounts, no database
- localStorage only for persistence
- Ad-supported 10–30 second loading experience
- Extremely simple, elegant, fast UI
- Above-the-fold usability on desktop
- Hyper-optimized mobile-first design
- No browser alerts/confirms/prompts

---

## PHASE 1 – Project Setup
- [x] Init Next.js (App Router, TypeScript, Tailwind)
- [x] Configure ESLint + Prettier
- [x] Init git
- [x] Add README.md
- [x] Create .env.local template (created .env.local.example)
- [x] Create .gitignore

**Status:** Complete

---

## PHASE 2 – Core Layout & Theming
- [x] Build above-the-fold hero (desktop + mobile)
- [x] Inputs: budget, departure, monthsAhead selector (1–6), excludeBasicEconomy toggle
- [x] Add fee/tax disclaimer text
- [x] Add placeholder hero imagery
- [x] Create design/image-prompts.md

**Status:** Complete

---

## PHASE 3 – Flight Search Logic & API Layer
- [x] Create docs/flight-apis.md with full API key instructions
- [x] Implement lib/searchFlights.ts:
  - [x] Accept { origin, maxBudget, monthsAhead, excludeBasicEconomy }
  - [x] Call Amadeus → mock fallback
  - [x] Filter out basic economy fares
  - [x] Show notes when fare class missing
- [x] Create /api/search-flights route with error handling

**Status:** Complete

---

## PHASE 4 – Search UX + Ad Loading Experience
- [x] Connect form → API
- [x] Create 10–30s loading with:
  - [x] Animation
  - [x] Placeholder ads
  - [x] Message about ads funding the service
- [x] Show results list/grid
- [x] CTA links to airline sites

**Status:** Complete

---

## PHASE 5 – Saved Searches via LocalStorage
- [x] LocalStorage helpers
- [x] Save search data (origin, budget, monthsAhead, excludeBasicEconomy)
- [x] Saved Searches UI:
  - [x] List
  - [x] Re-run
  - [x] Delete

**Status:** Complete

---

## PHASE 6 – Local Analytics
- [x] Track local-only stats via localStorage
- [x] Local-only "Stats" dev view

**Status:** Complete

---

## PHASE 7 – SEO Enhancements
- [x] Meta tags, OG tags, JSON-LD if relevant
- [x] Add FAQ block
- [x] Document future SEO strategies

**Status:** Complete

**SEO Implementation Notes:**
- Added comprehensive meta tags with keywords targeting "AI flight finder", "cheap flights", "budget flights", "where can I fly"
- Implemented Open Graph tags for social sharing (Facebook, LinkedIn, etc.)
- Added Twitter Card metadata
- Implemented JSON-LD structured data (Schema.org WebApplication) for better search engine understanding
- Added FAQ section with 8 questions targeting long-tail SEO queries
- FAQ includes natural language queries like "Where can I fly for $500 from New York?" and "cheap flights from any city"

**Future SEO Strategies (Weekly Review):**
1. **Content Expansion:**
   - Add blog/articles section with destination guides
   - Create city-specific landing pages (e.g., /flights-from-new-york, /flights-from-los-angeles)
   - Add seasonal content (summer deals, holiday travel, etc.)

2. **Technical SEO:**
   - Implement sitemap.xml generation
   - Add robots.txt optimization
   - Implement canonical URLs
   - Add hreflang tags if expanding to international markets

3. **Local SEO:**
   - Create pages for major airports/cities
   - Add location-specific structured data
   - Optimize for "flights from [city]" queries

4. **Performance SEO:**
   - Monitor Core Web Vitals (LCP, FID, CLS)
   - Optimize images (WebP format, lazy loading)
   - Implement service worker for offline capability

5. **Link Building:**
   - Reach out to travel blogs for backlinks
   - Create shareable content (flight deal alerts, destination guides)
   - Partner with travel influencers

6. **Keyword Research:**
   - Monitor search console for new keyword opportunities
   - Track competitor keywords
   - Expand FAQ based on user questions

7. **User-Generated Content:**
   - Add user reviews/testimonials (future phase)
   - Allow users to share their flight finds
   - Create "popular destinations" section based on search data

---

## PHASE 8 – UX Polish & Overengineering Review
- [x] Simplify components
- [x] Remove unused code
- [x] Final npm run build

**Status:** Complete

**Polish Notes:**
- Removed unused `clearAllSavedSearches` function from localStorage.ts
- Removed unused `initialValues` prop and `useEffect` from SearchForm component
- Simplified SearchForm by removing unnecessary prop handling
- All components are now minimal and focused
- Build passes successfully with no errors

---

## Notes
- Weekly SEO review notes section for future phases
- Keep code simple, clean, and minimal
- Never commit broken builds
- Always update todo.md after each phase

