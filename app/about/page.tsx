import Link from 'next/link';

export const metadata = {
  title: 'About SkyRoutesAI - AI-Powered Flight Finder',
  description: 'Learn about SkyRoutesAI, the free AI-powered flight search tool that helps you discover amazing destinations within your budget.',
};

export default function AboutPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">About SkyRoutesAI</h1>
            
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 mb-6">
                SkyRoutesAI is a free, AI-powered flight search tool designed to help travelers discover amazing destinations within their budget. We believe that travel should be accessible to everyone, and finding affordable flights shouldn't be complicated.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
              <p className="text-gray-700 mb-6">
                Our mission is to simplify flight search and make travel planning more accessible. We understand that finding flights within a specific budget can be time-consuming and frustrating. SkyRoutesAI solves this by searching thousands of flight options across multiple airlines and presenting you with destinations you can actually afford to visit.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How We're Different</h2>
              <ul className="list-disc list-inside text-gray-700 space-y-3 mb-6">
                <li><strong>Budget-First Approach:</strong> Instead of searching for specific destinations, we help you discover where you can go within your budget.</li>
                <li><strong>No Account Required:</strong> Start searching immediately without creating an account or providing personal information.</li>
                <li><strong>Flexible Planning:</strong> Search up to 6 months ahead to find the best deals and plan your trips in advance.</li>
                <li><strong>Transparent Pricing:</strong> We show you base fares clearly and help you filter out restrictive basic economy options.</li>
                <li><strong>Free to Use:</strong> SkyRoutesAI is completely free, supported by ads to keep the service accessible to everyone.</li>
              </ul>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">How It Works</h2>
              <p className="text-gray-700 mb-4">
                SkyRoutesAI uses advanced flight search technology to:
              </p>
              <ol className="list-decimal list-inside text-gray-700 space-y-3 mb-6">
                <li>Search multiple airlines and booking platforms simultaneously</li>
                <li>Filter results based on your departure city, budget, and travel preferences</li>
                <li>Present destinations sorted by price and value</li>
                <li>Provide direct links to book flights with airlines or trusted booking partners</li>
              </ol>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Technology</h2>
              <p className="text-gray-700 mb-6">
                SkyRoutesAI leverages the Amadeus Self-Service API, one of the world's leading travel technology platforms, to provide real-time flight data. Our search algorithms analyze thousands of flight options to find the best deals within your specified parameters.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Privacy & Data</h2>
              <p className="text-gray-700 mb-6">
                We respect your privacy. SkyRoutesAI doesn't require accounts or collect personal information. Search history is stored locally in your browser for your convenience and is never shared with third parties. See our <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link> for more details.
              </p>

              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">A Solo Project, Built for Free</h2>
              <p className="text-gray-700 mb-6">
                SkyRoutesAI is built and maintained by one person as a completely free service. There are no subscriptions, no hidden fees, and no accounts required. The service is supported by ads and generous donations from users who find value in the tool.
              </p>
              <p className="text-gray-700 mb-6">
                Whether you're planning a weekend getaway, a family vacation, or a solo adventure, SkyRoutesAI helps you discover destinations you might not have considered. We're here to make travel more accessible and help you explore the world within your budget.
              </p>

              <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                <h3 className="text-xl font-bold text-gray-900 mb-3">Support This Free Project</h3>
                <p className="text-gray-700 mb-4">
                  If SkyRoutesAI has helped you find great flights, consider supporting the project! Your contributions help cover hosting costs, API fees, and development time. Every bit of support is deeply appreciated and helps keep this service free for everyone.
                </p>
                <p className="text-sm text-gray-600 italic">
                  Thank you for using SkyRoutesAI! 🙏
                </p>
              </div>

              <div className="mt-6 p-6 bg-blue-50 rounded-xl border border-blue-100">
                <p className="text-gray-700">
                  <strong>Questions or feedback?</strong> We're always working to improve SkyRoutesAI. If you have suggestions or encounter any issues, please reach out through our contact channels.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

