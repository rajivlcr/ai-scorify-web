import { useState } from "react";

export default function ReportBug() {
  const [submitted, setSubmitted] = useState(false);

  const [bug, setBug] = useState("");

  const submitBug = () => {
    console.log(bug);

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[35px] shadow-2xl p-10">
        <h1 className="text-5xl font-black text-red-500 mb-8">Report Bug 🐞</h1>

        {submitted ? (
          <div className="bg-green-50 text-green-600 p-6 rounded-2xl font-bold">
            Bug report submitted 🚀
          </div>
        ) : (
          <>
            <textarea
              rows={8}
              value={bug}
              onChange={(e) => setBug(e.target.value)}
              placeholder="Describe the issue..."
              className="w-full p-5 rounded-2xl border border-gray-200 focus:outline-none focus:ring-4 focus:ring-red-200"
            />

            <button
              onClick={submitBug}
              className="mt-6 bg-red-500 hover:bg-red-600 text-white px-8 py-4 rounded-2xl font-bold shadow-xl"
            >
              Submit Bug 🚀
            </button>
          </>
        )}
      </div>
    </div>
  );
}
