import Link from 'next/link';
import DonateButton from './DonateButton';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <h3 className="text-xl font-bold text-white mb-4">SkyRoutesAI</h3>
            <p className="text-sm text-gray-400">
              Discover amazing destinations within your budget. Free AI-powered flight search.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/how-it-works" className="hover:text-white transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Legal</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="hover:text-white transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://developers.amadeus.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  Flight Data API
                </a>
              </li>
              <li>
                <Link href="/stats" className="hover:text-white transition-colors">
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Support Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div className="flex-1 text-center md:text-left">
                <p className="text-white font-semibold mb-2">
                  Built & maintained by one person, completely free
                </p>
                <p className="text-sm text-gray-400">
                  Your support helps keep SkyRoutesAI free and ad-supported. Every contribution is deeply appreciated! 🙏
                </p>
              </div>
              <DonateButton variant="footer" />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} SkyRoutesAI. All rights reserved.
            </p>
            <p className="text-sm text-gray-400">
              Free flight search powered by AI
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

