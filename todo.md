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
- [ ] Build above-the-fold hero (desktop + mobile)
- [ ] Inputs: budget, departure, monthsAhead selector (1–6), excludeBasicEconomy toggle
- [ ] Add fee/tax disclaimer text
- [ ] Add placeholder hero imagery
- [ ] Create design/image-prompts.md

**Status:** Pending

---

## PHASE 3 – Flight Search Logic & API Layer
- [ ] Create docs/flight-apis.md with full API key instructions
- [ ] Implement lib/searchFlights.ts:
  - [ ] Accept { origin, maxBudget, monthsAhead, excludeBasicEconomy }
  - [ ] Call Amadeus → Kiwi → Skyscanner → mock fallback
  - [ ] Filter out basic economy fares
  - [ ] Show notes when fare class missing
- [ ] Create /api/search-flights route with error handling

**Status:** Pending

---

## PHASE 4 – Search UX + Ad Loading Experience
- [ ] Connect form → API
- [ ] Create 10–30s loading with:
  - [ ] Animation
  - [ ] Placeholder ads
  - [ ] Message about ads funding the service
- [ ] Show results list/grid
- [ ] CTA links to airline sites

**Status:** Pending

---

## PHASE 5 – Saved Searches via LocalStorage
- [ ] LocalStorage helpers
- [ ] Save search data (origin, budget, monthsAhead, excludeBasicEconomy)
- [ ] Saved Searches UI:
  - [ ] List
  - [ ] Re-run
  - [ ] Delete

**Status:** Pending

---

## PHASE 6 – Local Analytics
- [ ] Track local-only stats via localStorage
- [ ] Local-only "Stats" dev view

**Status:** Pending

---

## PHASE 7 – SEO Enhancements
- [ ] Meta tags, OG tags, JSON-LD if relevant
- [ ] Add FAQ block
- [ ] Document future SEO strategies

**Status:** Pending

---

## PHASE 8 – UX Polish & Overengineering Review
- [ ] Simplify components
- [ ] Remove unused code
- [ ] Final npm run build

**Status:** Pending

---

## Notes
- Weekly SEO review notes section for future phases
- Keep code simple, clean, and minimal
- Never commit broken builds
- Always update todo.md after each phase

