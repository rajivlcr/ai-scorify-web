export default function PrivacyPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-purple-600 mb-8">
        Privacy Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          AI Scorify collects basic user information such as name, email address
          and quiz activity to improve learning experience.
        </p>

        <p>
          Payment transactions are securely processed through Razorpay. We do
          not store card or banking details.
        </p>

        <p>
          Quiz analytics and scores are stored securely to provide progress
          tracking and leaderboard features.
        </p>

        <p>We do not sell user data to third parties.</p>

        <p>By using AI Scorify, you agree to this privacy policy.</p>
      </div>
    </div>
  );
}
