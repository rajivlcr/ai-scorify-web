import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid md:grid-cols-3 gap-10">
          {/* 🚀 BRAND */}
          <div>
            <h2 className="text-2xl font-black text-purple-600">
              AI Scorify 🚀
            </h2>

            <p className="text-gray-500 mt-4 leading-relaxed">
              AI-powered CBSE quiz platform helping students practice smarter
              with MCQs, Assertion & Reasoning and Case Study questions.
            </p>
          </div>

          {/* 🚀 LINKS */}
          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>

            <div className="flex flex-col gap-3 text-gray-600">
              <Link to="/privacy-policy" className="hover:text-purple-600">
                Privacy Policy
              </Link>

              <Link to="/terms" className="hover:text-purple-600">
                Terms & Conditions
              </Link>

              <Link to="/refund-policy" className="hover:text-purple-600">
                Refund Policy
              </Link>

              <Link to="/cancellation-policy" className="hover:text-purple-600">
                Cancellation Policy
              </Link>

              <Link to="/contact" className="hover:text-purple-600">
                Contact Us
              </Link>
            </div>
          </div>

          {/* 🚀 DISCLAIMER */}
          <div>
            <h3 className="font-bold text-lg mb-4">Disclaimer</h3>
            <p className="text-gray-500 leading-relaxed mt-4">
              AI Scorify is an independent educational platform and is not
              affiliated with CBSE or any government educational board.
            </p>
            <p className="text-gray-500 leading-relaxed">
              AI-generated questions are for educational practice purposes only
              and may not exactly reflect official CBSE examination papers.
            </p>
          </div>
        </div>

        {/* 🚀 BOTTOM */}
        <div className="border-t border-gray-200 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 AI Scorify • Made for CBSE Students 🚀
        </div>
      </div>
    </footer>
  );
}
