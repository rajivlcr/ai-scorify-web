export default function UpgradeModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-3xl w-[90%] max-w-md text-center">
        <h2 className="text-2xl font-bold mb-4">Upgrade to Pro ⭐</h2>

        <p className="text-gray-600 mb-6">
          You reached today’s free quiz limit.
        </p>

        <div className="space-y-3 text-left mb-6">
          <p>✅ Unlimited quizzes</p>

          <p>✅ Faster AI generation</p>

          <p>✅ Advanced analytics</p>

          <p>✅ AI explanations</p>
        </div>

        <button className="bg-purple-600 text-white w-full py-3 rounded-xl">
          Upgrade Now
        </button>

        <button onClick={onClose} className="mt-3 text-gray-500">
          Maybe Later
        </button>
      </div>
    </div>
  );
}
