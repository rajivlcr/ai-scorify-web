import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  const [result, setResult] = useState(null);

  const [quiz, setQuiz] = useState([]);

  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    const storedResult = localStorage.getItem("result");

    const storedQuiz = localStorage.getItem("quiz");

    const storedAnswers = localStorage.getItem("answers");

    if (storedResult) {
      setResult(JSON.parse(storedResult));
    }

    if (storedQuiz) {
      setQuiz(JSON.parse(storedQuiz));
    }

    if (storedAnswers) {
      setAnswers(JSON.parse(storedAnswers));
    }
  }, []);

  if (!result) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-5"></div>

          <p className="text-gray-600 text-lg">Loading Result...</p>
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
        {/* 🚀 GLOW */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

        {/* 🚀 CONTENT */}
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
              {result.total} questions correctly
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

      {/* 🚀 ANSWERS */}
      <div className="space-y-8">
        {quiz.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;

          return (
            <div
              key={i}
              className="bg-white rounded-[35px] shadow-lg border border-gray-100 overflow-hidden"
            >
              {/* 🚀 HEADER */}
              <div
                className={`px-6 py-4 flex items-center justify-between

                  ${isCorrect ? "bg-green-500" : "bg-red-500"}

                  text-white`}
              >
                <h2 className="font-bold text-lg">Question {i + 1}</h2>

                <div className="text-2xl">{isCorrect ? "✅" : "❌"}</div>
              </div>

              {/* 🚀 BODY */}
              <div className="p-7">
                {/* 🚀 QUESTION */}
                {q.type === "assertion_reason" ? (
                  <div>
                    <div className="bg-purple-50 rounded-2xl p-5 mb-5">
                      <p className="font-bold text-purple-600 mb-2">
                        Assertion (A)
                      </p>

                      <p className="text-gray-700">{q.assertion}</p>
                    </div>

                    <div className="bg-indigo-50 rounded-2xl p-5">
                      <p className="font-bold text-indigo-600 mb-2">
                        Reason (R)
                      </p>

                      <p className="text-gray-700">{q.reason}</p>
                    </div>
                  </div>
                ) : (
                  <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                    {q.question}
                  </h2>
                )}

                {/* 🚀 OPTIONS */}
                <div className="mt-8 space-y-4">
                  {q.options?.map((opt, idx) => {
                    const isUser = answers[i] === opt;

                    const isAnswer = q.correctAnswer === opt;

                    return (
                      <div
                        key={idx}
                        className={`p-5 rounded-2xl border-2 flex items-center gap-4

                            ${
                              isAnswer
                                ? "bg-green-50 border-green-500"
                                : isUser
                                  ? "bg-red-50 border-red-500"
                                  : "bg-gray-50 border-gray-200"
                            }`}
                      >
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold

                              ${
                                isAnswer
                                  ? "bg-green-500 text-white"
                                  : isUser
                                    ? "bg-red-500 text-white"
                                    : "bg-white border"
                              }`}
                        >
                          {String.fromCharCode(65 + idx)}
                        </div>

                        <div className="flex-1">
                          <p className="text-lg">{opt}</p>
                        </div>

                        {isAnswer && (
                          <div className="text-green-600 font-bold">
                            Correct
                          </div>
                        )}

                        {!isCorrect && isUser && (
                          <div className="text-red-600 font-bold">
                            Your Answer
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 BUTTONS */}
      <div className="grid md:grid-cols-2 gap-6 mt-12">
        <button
          onClick={() => navigate("/question-types")}
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
