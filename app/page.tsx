'use client';

import SearchForm from '@/components/SearchForm';

export default function Home() {
  const handleSearch = (params: {
    origin: string;
    maxBudget: number;
    monthsAhead: number;
    excludeBasicEconomy: boolean;
  }) => {
    console.log('Search params:', params);
    // TODO: Implement search in Phase 4
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      {/* Hero Section - Above the fold */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-4">
              SkyRoutes<span className="text-blue-600">AI</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Where can you fly from your departure city within your budget over the next 1–6 months?
            </p>
          </div>

          {/* Hero Image Placeholder */}
          <div className="mb-8 md:mb-12 rounded-lg overflow-hidden shadow-xl">
            <img
              src="https://picsum.photos/1200/400?random=1"
              alt="Airplane window view"
              className="w-full h-48 md:h-64 object-cover"
            />
          </div>

          {/* Search Form */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8">
            <SearchForm onSearch={handleSearch} />
          </div>
        </div>
      </div>
    </main>
  );
}
