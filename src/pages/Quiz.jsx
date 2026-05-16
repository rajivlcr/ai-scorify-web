import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Quiz() {
  const [quiz, setQuiz] = useState([]);

  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(300);

  const [loading, setLoading] = useState(true);

  const [showUpgrade, setShowUpgrade] = useState(false);

  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  const subject = localStorage.getItem("subject");

  const chapter = localStorage.getItem("chapter");

  // 🔥 FETCH QUIZ
  useEffect(() => {
    api
      .post("/quiz/generate", {
        subject,
        chapter,
      })

      .then((res) => {
        // ✅ SET QUIZ
        setQuiz(res.data.questions);

        // ✅ UPDATE USER
        if (res.data.user) {
          localStorage.setItem(
            "user",

            JSON.stringify(res.data.user),
          );
        }

        // ✅ UPDATE AUTH STATE
        setUser(res.data.user);

        setLoading(false);
      })

      .catch((err) => {
        if (err?.response?.data?.premiumRequired) {
          setShowUpgrade(true);

          return;
        }

        console.error("QUIZ FETCH ERROR:", err);

        setLoading(false);
      });
  }, []);

  // ⏱ TIMER
  useEffect(() => {
    if (loading || showUpgrade) return;

    if (timeLeft <= 0) {
      submitQuiz();

      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, showUpgrade]);

  // ✅ ANSWERS
  const handleAnswer = (i, val) => {
    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);
  };

  // 🚀 SUBMIT QUIZ
  const submitQuiz = async () => {
    try {
      const userId = user?.id || user?.email;

      const res = await api.post("/quiz/submit", {
        userId,

        subject,

        chapter,

        quiz,

        answers,
      });

      // ✅ SAVE RESULT
      localStorage.setItem(
        "result",

        JSON.stringify(res.data),
      );

      localStorage.setItem(
        "quiz",

        JSON.stringify(quiz),
      );

      localStorage.setItem(
        "answers",

        JSON.stringify(answers),
      );

      navigate("/result");
    } catch (err) {
      console.error(err);
    }
  };

  // ⏱ FORMAT TIME
  const formatTime = () => {
    const min = Math.floor(timeLeft / 60);

    const sec = timeLeft % 60;

    return `${min}:${sec < 10 ? "0" : ""}${sec}`;
  };

  // 🚀 LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600 mx-auto mb-4"></div>

          <p className="text-gray-600">Generating AI Quiz...</p>
        </div>
      </div>
    );
  }

  // 🚀 PREMIUM POPUP
  if (showUpgrade) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">
            Upgrade to Pro 🚀
          </h1>

          <p className="text-gray-600 mb-6">
            You have reached your free daily quiz limit.
          </p>

          <button
            onClick={() => navigate("/pricing")}
            className="bg-purple-600 text-white px-6 py-3 rounded-xl"
          >
            View Plans
          </button>
        </div>
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
            className="bg-purple-600 h-2 rounded"
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

          <p className="font-semibold">{q.question}</p>

          {q.options.map((opt) => (
            <button
              key={opt}
              onClick={() => handleAnswer(i, opt)}
              className={`w-full mt-3 p-3 rounded-xl border text-left transition

                ${
                  answers[i] === opt
                    ? "bg-purple-600 text-white shadow-md"
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
