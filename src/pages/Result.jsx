import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  const location = useLocation();

  const result = location.state;

  // 🚀 NO RESULT
  if (!result) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-3xl font-black text-gray-800">No Result Found</h2>

          <p className="text-gray-500 mt-4">Please attempt a quiz first.</p>

          <button
            onClick={() => navigate("/classes")}
            className="mt-8 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold"
          >
            Start Quiz 🚀
          </button>
        </div>
      </div>
    );
  }

  const percentage = Math.round((result.score / result.total) * 100);

  // 🚀 PERFORMANCE
  const performance =
    percentage >= 80
      ? {
          label: "Excellent",

          emoji: "🏆",

          color: "from-green-500 to-emerald-600",
        }
      : percentage >= 60
        ? {
            label: "Good",

            emoji: "🚀",

            color: "from-blue-500 to-indigo-600",
          }
        : {
            label: "Keep Practicing",

            emoji: "📘",

            color: "from-orange-500 to-red-500",
          };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 🚀 HERO */}
      <div
        className={`relative overflow-hidden rounded-[35px] bg-gradient-to-r ${performance.color} text-white p-8 shadow-2xl mb-10`}
      >
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-5">
              🚀 Quiz Completed
            </div>

            <h1 className="text-5xl font-black">
              {performance.emoji} {performance.label}
            </h1>

            <p className="mt-4 text-white/90 text-lg">
              You scored {result.score}
              {" / "}
              {result.total}
            </p>
          </div>

          {/* 🚀 SCORE */}
          <div className="bg-white/20 backdrop-blur-xl rounded-[30px] p-8 text-center min-w-[220px]">
            <p className="text-sm uppercase tracking-[4px] opacity-80">
              Accuracy
            </p>

            <h2 className="text-6xl font-black mt-3">{percentage}%</h2>
          </div>
        </div>
      </div>

      {/* 🚀 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-3">✅</div>

          <p className="text-gray-500">Correct Answers</p>

          <h2 className="text-4xl font-black text-green-600 mt-2">
            {result.score}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-3">❌</div>

          <p className="text-gray-500">Wrong Answers</p>

          <h2 className="text-4xl font-black text-red-500 mt-2">
            {result.total - result.score}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-3">⚡</div>

          <p className="text-gray-500">XP Earned</p>

          <h2 className="text-4xl font-black text-purple-600 mt-2">
            +{result.earnedXP || 10}
          </h2>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-3">🔥</div>

          <p className="text-gray-500">Current Streak</p>

          <h2 className="text-4xl font-black text-orange-500 mt-2">
            {result.streak || 1}
          </h2>
        </div>
      </div>

      {/* 🚀 BUTTONS */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <button
          onClick={() => navigate("/classes")}
          className="bg-white border border-gray-200 shadow-lg py-5 rounded-[28px] text-xl font-black hover:shadow-2xl transition"
        >
          Practice Again 🚀
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-[28px] text-xl font-black shadow-2xl hover:scale-[1.01] transition"
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
}
