# SkyRoutesAI

Find flights within your budget from your departure city over the next 1-6 months.

## Features

- **No accounts required** - Start searching immediately
- **Budget-based search** - Find destinations within your price range
- **1-6 month search window** - Plan ahead for the best deals
- **Basic Economy filter** - Exclude basic economy fares
- **Saved searches** - Save and re-run searches (localStorage)
- **Ad-supported** - Free service supported by ads

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Copy `.env.local.example` to `.env.local` and add your API keys:
   ```bash
   cp .env.local.example .env.local
   ```

   See `docs/flight-apis.md` for instructions on obtaining API keys.

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## API Keys

This project uses multiple flight APIs with fallback support:
- Amadeus Self-Service API (recommended)
- Kiwi (Tequila) API
- Skyscanner via RapidAPI

See `docs/flight-apis.md` for detailed setup instructions.

## Tech Stack

- **Next.js 16** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **localStorage** - Client-side persistence (MVP)

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Project Structure

```
skyroutesai/
├── app/              # Next.js App Router pages
├── components/       # React components
├── lib/             # Utility functions and API clients
├── docs/            # Documentation
└── public/          # Static assets
```

## License

ISC

