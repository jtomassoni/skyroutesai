import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy - SkyRoutesAI',
  description: 'SkyRoutesAI Privacy Policy - Learn how we protect your privacy and handle your data.',
};

export default function PrivacyPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Privacy Policy</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Introduction</h2>
                <p className="mb-4">
                  SkyRoutesAI ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard information when you use our flight search service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Information We Collect</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Information You Provide</h3>
                <p className="mb-4">
                  SkyRoutesAI is designed to be used without requiring an account or personal information. When you use our search feature, you may provide:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Departure city or airport code</li>
                  <li>Budget preferences</li>
                  <li>Travel date preferences</li>
                  <li>Fare class preferences (e.g., excluding basic economy)</li>
                </ul>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Automatically Collected Information</h3>
                <p className="mb-4">
                  When you visit SkyRoutesAI, we may automatically collect certain information:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Browser type and version</li>
                  <li>Device information</li>
                  <li>IP address</li>
                  <li>Pages visited and time spent on pages</li>
                  <li>Search queries and results</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">How We Use Your Information</h2>
                <p className="mb-4">We use the information we collect to:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Provide flight search results based on your criteria</li>
                  <li>Improve our service and user experience</li>
                  <li>Store your search history locally in your browser for convenience</li>
                  <li>Analyze usage patterns to enhance our search algorithms</li>
                  <li>Display relevant advertisements (see Advertising section below)</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Local Storage</h2>
                <p className="mb-4">
                  SkyRoutesAI uses browser local storage to save your search history and preferences. This information is stored entirely on your device and is never transmitted to our servers. You can clear this data at any time through your browser settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Services</h2>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Flight Data Providers</h3>
                <p className="mb-4">
                  We use the Amadeus Self-Service API to provide flight search results. When you perform a search, your search criteria (departure city, budget, dates) may be transmitted to Amadeus to retrieve flight data. Please review <a href="https://developers.amadeus.com/self-service" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Amadeus's privacy policy</a> for information about how they handle data.
                </p>

                <h3 className="text-xl font-semibold text-gray-900 mb-3">Advertising</h3>
                <p className="mb-4">
                  SkyRoutesAI uses Google AdSense to display advertisements. Google may use cookies and other tracking technologies to show you relevant ads based on your browsing history and interests. You can learn more about how Google uses your information by visiting <a href="https://policies.google.com/privacy" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's Privacy Policy</a>.
                </p>
                <p className="mb-4">
                  You can opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" className="text-blue-600 hover:underline" target="_blank" rel="noopener noreferrer">Google's Ad Settings</a>.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Cookies</h2>
                <p className="mb-4">
                  SkyRoutesAI may use cookies and similar tracking technologies to enhance your experience, analyze usage, and support our advertising partners. You can control cookies through your browser settings, though disabling cookies may affect some functionality.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Data Security</h2>
                <p className="mb-4">
                  We implement reasonable security measures to protect your information. However, no method of transmission over the internet or electronic storage is 100% secure. While we strive to protect your data, we cannot guarantee absolute security.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Children's Privacy</h2>
                <p className="mb-4">
                  SkyRoutesAI is not intended for children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe we have collected information from a child under 13, please contact us immediately.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Rights</h2>
                <p className="mb-4">
                  You have the right to:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Access information we hold about you</li>
                  <li>Request correction of inaccurate information</li>
                  <li>Request deletion of your information</li>
                  <li>Opt out of certain data collection practices</li>
                  <li>Clear your local storage data through browser settings</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Changes to This Privacy Policy</h2>
                <p className="mb-4">
                  We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us through our website or support channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

