import { useNavigate } from "react-router-dom";

export default function Result() {
  const navigate = useNavigate();

  const result = JSON.parse(localStorage.getItem("result"));
  const quiz = JSON.parse(localStorage.getItem("quiz"));
  const answers = JSON.parse(localStorage.getItem("answers"));

  if (!result || !quiz) return <p>No result</p>;

  return (
    <div className="space-y-6">
      {/* Score */}
      <div className="bg-white p-6 rounded-2xl shadow text-center">
        <h1 className="text-lg font-semibold">🎉 Your Score</h1>
        <p className="text-4xl text-purple-600 font-bold mt-2">
          {result.score}/{result.total}
        </p>
      </div>

      {/* Review */}
      <div>
        <h2 className="text-lg font-bold mb-2">Review Answers</h2>

        {quiz.map((q, i) => {
          const isCorrect = answers[i] === q.correctAnswer;

          return (
            <div
              key={i}
              className={`p-4 rounded-xl mb-3 shadow 
              ${isCorrect ? "bg-green-50" : "bg-red-50"}`}
            >
              <p className="font-medium">{q.question}</p>

              <p className="text-sm mt-2">
                Your Answer:{" "}
                <span className={isCorrect ? "text-green-600" : "text-red-600"}>
                  {answers[i] || "Not answered"}
                </span>
              </p>

              {!isCorrect && (
                <p className="text-sm text-green-700">
                  Correct Answer: {q.correctAnswer}
                </p>
              )}
            </div>
          );
        })}
      </div>

      <button
        onClick={() => navigate("/")}
        className="bg-purple-600 text-white w-full p-3 rounded-xl"
      >
        Try Another Quiz
      </button>
    </div>
  );
}
