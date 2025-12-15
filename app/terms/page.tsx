import Link from 'next/link';

export const metadata = {
  title: 'Terms of Service - SkyRoutesAI',
  description: 'SkyRoutesAI Terms of Service - Read our terms and conditions for using our flight search service.',
};

export default function TermsPage() {
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
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Terms of Service</h1>
            
            <div className="prose prose-lg max-w-none text-gray-700">
              <p className="text-sm text-gray-500 mb-6">Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Agreement to Terms</h2>
                <p className="mb-4">
                  By accessing and using SkyRoutesAI ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to these Terms of Service, please do not use the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Use License</h2>
                <p className="mb-4">
                  Permission is granted to temporarily use SkyRoutesAI for personal, non-commercial use only. This is the grant of a license, not a transfer of title, and under this license you may not:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Modify or copy the materials</li>
                  <li>Use the materials for any commercial purpose or for any public display</li>
                  <li>Attempt to reverse engineer any software contained on the Service</li>
                  <li>Remove any copyright or other proprietary notations from the materials</li>
                  <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Service Description</h2>
                <p className="mb-4">
                  SkyRoutesAI is a flight search tool that helps users discover destinations within their budget. We aggregate flight information from third-party providers and display it for informational purposes. SkyRoutesAI does not sell flights directly and is not a travel agency or airline.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Flight Information and Pricing</h2>
                <p className="mb-4">
                  While we strive to provide accurate flight information and pricing:
                </p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>Flight prices, availability, and schedules are subject to change without notice</li>
                  <li>Prices shown are base fares and may not include taxes, fees, or additional charges</li>
                  <li>Final pricing is determined by the airline or booking partner at the time of purchase</li>
                  <li>We are not responsible for pricing errors or discrepancies</li>
                  <li>All bookings are made directly with airlines or third-party booking partners</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Third-Party Links</h2>
                <p className="mb-4">
                  SkyRoutesAI provides links to third-party websites, including airlines and booking partners. We are not responsible for the content, privacy policies, or practices of these third-party sites. Your interactions with third-party sites are solely between you and the third party.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Disclaimer</h2>
                <p className="mb-4">
                  The materials on SkyRoutesAI are provided on an 'as is' basis. SkyRoutesAI makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
                </p>
                <p className="mb-4">
                  Further, SkyRoutesAI does not warrant or make any representations concerning the accuracy, likely results, or reliability of the use of the materials on its website or otherwise relating to such materials or on any sites linked to this site.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Limitations</h2>
                <p className="mb-4">
                  In no event shall SkyRoutesAI or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SkyRoutesAI, even if SkyRoutesAI or a SkyRoutesAI authorized representative has been notified orally or in writing of the possibility of such damage.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Accuracy of Materials</h2>
                <p className="mb-4">
                  The materials appearing on SkyRoutesAI could include technical, typographical, or photographic errors. SkyRoutesAI does not warrant that any of the materials on its website are accurate, complete, or current. SkyRoutesAI may make changes to the materials contained on its website at any time without notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Prohibited Uses</h2>
                <p className="mb-4">You agree not to use the Service:</p>
                <ul className="list-disc list-inside space-y-2 mb-4">
                  <li>For any unlawful purpose or to solicit others to perform unlawful acts</li>
                  <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                  <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                  <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                  <li>To submit false or misleading information</li>
                  <li>To upload or transmit viruses or any other type of malicious code</li>
                  <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
                  <li>For any obscene or immoral purpose</li>
                  <li>To interfere with or circumvent the security features of the Service</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Modifications</h2>
                <p className="mb-4">
                  SkyRoutesAI may revise these Terms of Service at any time without notice. By using this Service, you are agreeing to be bound by the then current version of these Terms of Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Governing Law</h2>
                <p className="mb-4">
                  These terms and conditions are governed by and construed in accordance with applicable laws. Any disputes relating to these terms and conditions will be subject to the exclusive jurisdiction of the courts in the applicable jurisdiction.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Contact Information</h2>
                <p className="mb-4">
                  If you have any questions about these Terms of Service, please contact us through our website or support channels.
                </p>
              </section>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

