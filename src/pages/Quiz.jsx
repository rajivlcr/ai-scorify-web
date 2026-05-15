import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [timeLeft, setTimeLeft] = useState(300);

  // ✅ NEW
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { user } = useAuth();

  const subject = localStorage.getItem("subject");

  const chapter = localStorage.getItem("chapter");

  // 🔥 FETCH NCERT-GROUNDED QUIZ
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        setLoading(true);

        const res = await api.post("/quiz/generate", {
          // ✅ IMPORTANT
          subject: subject?.toLowerCase().trim(),

          // ✅ IMPORTANT
          chapter: chapter?.toLowerCase().trim(),
        });

        setQuiz(res.data);
      } catch (err) {
        console.error("QUIZ FETCH ERROR:", err);

        alert(err?.response?.data?.msg || "Failed to load quiz");
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, []);

  // 🔥 TIMER
  useEffect(() => {
    if (timeLeft <= 0) {
      submitQuiz();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // 🔥 HANDLE ANSWER
  const handleAnswer = (i, val) => {
    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);
  };

  // 🔥 SUBMIT QUIZ
  const submitQuiz = async () => {
    try {
      const userId = user?.id || user?.email;

      const res = await api.post("/quiz/submit", {
        userId,

        subject: subject?.toLowerCase().trim(),

        chapter: chapter?.toLowerCase().trim(),

        quiz,
        answers,
      });

      localStorage.setItem("result", JSON.stringify(res.data));

      localStorage.setItem("quiz", JSON.stringify(quiz));

      localStorage.setItem("answers", JSON.stringify(answers));

      navigate("/result");
    } catch (err) {
      console.error(err);
    }
  };

  // 🔥 FORMAT TIME
  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);

    const sec = timeLeft % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // ✅ LOADING SCREEN
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <div className="w-14 h-14 border-4 border-purple-300 border-t-purple-600 rounded-full animate-spin mb-5" />

        <h2 className="text-2xl font-bold text-purple-700">AI-Scorify</h2>

        <p className="text-gray-500 mt-2">Generating NCERT-grounded quiz...</p>
      </div>
    );
  }

  return (
    <div>
      {/* ⏱ TIMER */}
      <div className="flex justify-between items-center bg-white p-3 rounded-xl shadow mb-4">
        <span className="font-medium">⏱️ Time Left</span>

        <span className="text-red-500 font-bold">{formatTime()}</span>
      </div>

      {/* 📊 PROGRESS */}
      <div className="mb-4">
        <div className="w-full bg-gray-200 h-2 rounded">
          <div
            className="bg-purple-600 h-2 rounded transition-all"
            style={{
              width: `${
                quiz.length ? (answers.length / quiz.length) * 100 : 0
              }%`,
            }}
          />
        </div>
      </div>

      {/* ❓ QUESTIONS */}
      {quiz.map((q, i) => (
        <div key={i} className="bg-white p-5 rounded-2xl shadow mb-4">
          <p className="text-sm text-gray-500 mb-1">Question {i + 1}</p>

          <p className="font-semibold text-lg">{q.question}</p>

          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(i, opt)}
              className={`w-full mt-3 p-3 rounded-xl border text-left transition-all

              ${
                answers[i] === opt
                  ? "bg-purple-600 text-white shadow-md scale-[1.02]"
                  : "bg-gray-50 hover:bg-gray-100"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      ))}

      {/* 🚀 SUBMIT */}
      <button
        onClick={submitQuiz}
        className="bg-green-500 text-white w-full p-3 rounded-xl shadow-md hover:scale-105 transition"
      >
        Submit Quiz
      </button>
    </div>
  );
}
