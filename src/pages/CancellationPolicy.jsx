export default function CancellationPolicy() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-black text-purple-600 mb-8">
        Cancellation Policy
      </h1>

      <div className="space-y-6 text-gray-700 leading-relaxed">
        <p>
          AI Scorify currently does not support automatic recurring billing.
        </p>

        <p>PRO access remains active until the subscription expiry date.</p>

        <p>
          Users can choose whether to renew their subscription manually after
          expiry.
        </p>
      </div>
    </div>
  );
}
