import { useLocation, useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();
  const location = useLocation();

  const result = location.state;

  if (!result) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        {" "}
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          {" "}
          <h2 className="text-3xl font-black text-gray-800">
            No Result Found{" "}
          </h2>
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

  const isGuest = result?.guest === true;

  const percentage = Math.round((result.score / result.total) * 100);

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
      <div
        className={`relative overflow-hidden rounded-[35px] bg-gradient-to-r ${performance.color} text-white p-8 shadow-2xl mb-10`}
      >
        {" "}
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
              You scored {result.score} / {result.total}
            </p>
          </div>

          <div className="bg-white/20 backdrop-blur-xl rounded-[30px] p-8 text-center min-w-[220px]">
            <p className="text-sm uppercase tracking-[4px] opacity-80">
              Accuracy
            </p>

            <h2 className="text-6xl font-black mt-3">{percentage}%</h2>
          </div>
        </div>
      </div>

      {isGuest && (
        <div className="mb-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center shadow-xl">
          <h2 className="text-3xl font-black">🎉 Great Job!</h2>

          <p className="mt-4 text-white/90 text-lg">
            Register for free to save quiz history, earn XP, build streaks and
            compete on the leaderboard.
          </p>

          <button
            onClick={() => navigate("/register")}
            className="mt-6 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold"
          >
            Register Free
          </button>
        </div>
      )}

      <div className="bg-white rounded-3xl shadow-xl p-8 border border-gray-100">
        <h2 className="text-3xl font-black text-gray-800 mb-8">
          Answer Review 🚀
        </h2>

        <div className="space-y-8">
          {result.quiz?.map((q, index) => {
            const selected = result.answers?.[index];
            const correct = q.correctAnswer;
            const isCorrect = selected === correct;

            return (
              <div
                key={index}
                className="border border-gray-200 rounded-3xl p-6"
              >
                <h3 className="text-xl font-bold text-gray-800 leading-relaxed">
                  {index + 1}. {q.question}
                </h3>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    Your Answer
                  </p>

                  <div
                    className={`p-4 rounded-2xl font-semibold ${
                      isCorrect
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {selected || "Not Answered"}
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm font-semibold text-gray-500 mb-2">
                    Correct Answer
                  </p>

                  <div className="p-4 rounded-2xl bg-green-100 text-green-700 font-semibold">
                    {correct}
                  </div>
                </div>

                {q.learningObjective && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      🎯 Learning Objective
                    </p>

                    <div className="p-4 rounded-2xl bg-purple-50 text-purple-700">
                      {q.learningObjective}
                    </div>
                  </div>
                )}

                {q.explanation && (
                  <div className="mt-5">
                    <p className="text-sm font-semibold text-gray-500 mb-2">
                      💡 Explanation
                    </p>

                    <div className="p-4 rounded-2xl bg-blue-50 text-blue-800 leading-relaxed">
                      {q.explanation}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <button
          onClick={() => navigate("/classes")}
          className="bg-white border border-gray-200 shadow-lg py-5 rounded-[28px] text-xl font-black hover:shadow-2xl transition"
        >
          Practice Again 🚀
        </button>

        <button
          onClick={() => navigate(isGuest ? "/register" : "/dashboard")}
          className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-5 rounded-[28px] text-xl font-black shadow-2xl hover:scale-[1.01] transition"
        >
          {isGuest ? "Register & Save Progress 🚀" : "Back to Dashboard"}
        </button>
      </div>
    </div>
  );
}
