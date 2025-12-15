import Link from 'next/link';

export const metadata = {
  title: 'How SkyRoutesAI Works - Flight Search Guide',
  description: 'Learn how SkyRoutesAI helps you find affordable flights and discover destinations within your budget.',
};

export default function HowItWorksPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-sky-50">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              ← Back to Search
            </Link>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border border-gray-100">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">How SkyRoutesAI Works</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-8">
                SkyRoutesAI makes finding affordable flights simple. Here's a step-by-step guide to using our flight search tool.
              </p>

              <div className="space-y-8">
                <div className="border-l-4 border-blue-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 1: Enter Your Search Criteria</h2>
                  <p className="text-gray-700 mb-3">
                    Start by providing three key pieces of information:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li><strong>Departure City:</strong> Enter your departure airport code (e.g., JFK, LAX, SFO) or city name</li>
                    <li><strong>Maximum Budget:</strong> Set your total budget for the flight (in USD)</li>
                    <li><strong>Months Ahead:</strong> Choose how far in advance you want to search (1-6 months)</li>
                  </ul>
                  <p className="text-gray-700">
                    You can also toggle "Exclude Basic Economy" to filter out restrictive fare classes that don't allow seat selection or carry-on bags.
                  </p>
                </div>

                <div className="border-l-4 border-purple-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 2: AI-Powered Search</h2>
                  <p className="text-gray-700 mb-3">
                    Once you click "Search Flights," SkyRoutesAI:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Connects to multiple airline databases and booking platforms</li>
                    <li>Searches for flights from your departure city across thousands of destinations</li>
                    <li>Filters results based on your budget and preferences</li>
                    <li>Analyzes pricing trends over your selected time period</li>
                  </ul>
                  <p className="text-gray-700">
                    This process typically takes 10-30 seconds as we search through extensive flight data to find the best matches for your criteria.
                  </p>
                </div>

                <div className="border-l-4 border-pink-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 3: Review Your Results</h2>
                  <p className="text-gray-700 mb-3">
                    SkyRoutesAI presents your results sorted by price, showing:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li><strong>Destination:</strong> The city and airport code</li>
                    <li><strong>Price:</strong> Base fare in your selected currency</li>
                    <li><strong>Date:</strong> Available departure dates</li>
                    <li><strong>Airline:</strong> Operating carrier</li>
                    <li><strong>Fare Class:</strong> Type of ticket (Economy, Premium Economy, etc.)</li>
                  </ul>
                  <p className="text-gray-700">
                    Results are displayed with the most affordable options first, helping you quickly identify destinations within your budget.
                  </p>
                </div>

                <div className="border-l-4 border-green-500 pl-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-3">Step 4: Book Your Flight</h2>
                  <p className="text-gray-700 mb-3">
                    When you find a destination you like:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
                    <li>Click the "Book Flight" button for your chosen destination</li>
                    <li>You'll be redirected to the airline or booking partner's website</li>
                    <li>Complete your booking directly with the airline or trusted partner</li>
                    <li>Review final pricing including taxes and fees before purchasing</li>
                  </ul>
                  <p className="text-gray-700">
                    SkyRoutesAI provides direct links to help you book quickly and securely.
                  </p>
                </div>
              </div>

              <div className="mt-12 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Tips for Best Results</h2>
                <ul className="list-disc list-inside text-gray-700 space-y-2">
                  <li><strong>Be Flexible:</strong> Searching across 1-6 months gives you more options and better prices</li>
                  <li><strong>Consider Nearby Airports:</strong> Try different departure cities if you have multiple airport options</li>
                  <li><strong>Check Multiple Dates:</strong> Prices can vary significantly by day of the week and time of year</li>
                  <li><strong>Book Early:</strong> While last-minute deals exist, booking 1-3 months in advance often offers the best prices</li>
                  <li><strong>Read Fare Rules:</strong> Pay attention to fare class restrictions before booking</li>
                </ul>
              </div>

              <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Important Note About Pricing</h3>
                <p className="text-gray-700">
                  The prices shown on SkyRoutesAI are base fares. Final prices may include additional charges such as taxes, airport fees, baggage fees, and seat selection costs. Always review the complete pricing breakdown on the airline or booking partner's website before making your purchase.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

