import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem("result") || "{}");

  const quiz = JSON.parse(localStorage.getItem("quiz") || "[]");

  const answers = JSON.parse(localStorage.getItem("answers") || "[]");

  // 🚀 FIXED
  if (result.score === undefined) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">No Result Found</h1>
      </div>
    );
  }

  const accuracy = ((result.score / result.total) * 100).toFixed(1);

  return (
    <div className="max-w-5xl mx-auto">
      {/* 🚀 SCORE CARD */}
      <div className="bg-white rounded-3xl shadow p-8 mb-6 text-center">
        <h1 className="text-4xl font-bold text-purple-600">Quiz Result 🎉</h1>

        <p className="text-6xl font-bold mt-4">
          {result.score}/{result.total}
        </p>

        <p className="text-gray-500 mt-2">Accuracy: {accuracy}%</p>

        {/* 🚀 XP */}
        <div className="flex justify-center gap-6 mt-6">
          <div className="bg-purple-100 px-5 py-3 rounded-2xl">
            ⚡ XP: <span className="font-bold">{result.totalXP || 0}</span>
          </div>

          <div className="bg-orange-100 px-5 py-3 rounded-2xl">
            🔥 Streak: <span className="font-bold">{result.streak || 1}</span>
          </div>
        </div>
      </div>

      {/* 🚀 QUESTIONS */}
      <div className="space-y-4">
        {quiz.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;

          return (
            <div key={i} className="bg-white p-5 rounded-2xl shadow">
              <h2 className="font-bold mb-3">Question {i + 1}</h2>

              {/* 🚀 ASSERTION */}
              {q.type === "assertion_reason" ? (
                <div>
                  <p className="font-bold text-purple-600">Assertion (A):</p>

                  <p className="mb-3">{q.assertion}</p>

                  <p className="font-bold text-purple-600">Reason (R):</p>

                  <p>{q.reason}</p>
                </div>
              ) : (
                <p className="mb-3">{q.question}</p>
              )}

              {/* 🚀 OPTIONS */}
              <div className="mt-4 space-y-2">
                {q.options?.map((opt, idx) => {
                  const isSelected = answers[i] === opt;

                  const isAnswer = q.correctAnswer === opt;

                  return (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border

                          ${
                            isAnswer
                              ? "bg-green-100 border-green-400"
                              : isSelected
                                ? "bg-red-100 border-red-400"
                                : "bg-gray-50"
                          }`}
                    >
                      {opt}
                    </div>
                  );
                })}
              </div>

              {/* 🚀 USER ANSWER */}
              <p
                className={`font-medium mt-4

                  ${isCorrect ? "text-green-600" : "text-red-500"}`}
              >
                Your Answer: {answers[i] || "Not Answered"}
              </p>

              {/* 🚀 CORRECT ANSWER */}
              <p className="text-green-600 font-medium mt-2">
                Correct Answer: {q.correctAnswer}
              </p>
            </div>
          );
        })}
      </div>

      {/* 🚀 ACTIONS */}
      <div className="flex gap-4 mt-8">
        <button
          onClick={() => navigate("/subjects")}
          className="bg-purple-600 text-white px-6 py-3 rounded-2xl"
        >
          New Quiz
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          className="bg-gray-200 px-6 py-3 rounded-2xl"
        >
          Dashboard
        </button>
      </div>
    </div>
  );
}
