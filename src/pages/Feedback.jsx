import { useState } from "react";

export default function Feedback() {
  const [submitted, setSubmitted] = useState(false);

  const [feedback, setFeedback] = useState("");

  const submitFeedback = () => {
    console.log(feedback);

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[35px] shadow-2xl p-10">
        <h1 className="text-5xl font-black text-yellow-500 mb-8">
          Feedback ⭐
        </h1>

        {submitted ? (
          <div className="bg-green-50 text-green-600 p-6 rounded-2xl font-bold">
            Thank you for your feedback 🚀
          </div>
        ) : (
          <>
            <textarea
              rows={8}
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Tell us your feedback..."
              className="w-full p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-yellow-200"
            />

            <button
              onClick={submitFeedback}
              className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
            >
              Submit Feedback 🚀
            </button>
          </>
        )}
      </div>
    </div>
  );
}
