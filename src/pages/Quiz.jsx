import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import Loader from "../components/Loader";

import QuizTimer from "../components/QuizTimer";

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

  const quizType = localStorage.getItem("quizType");

  // 🚀 FETCH QUIZ
  useEffect(() => {
    api
      .post("/quiz/generate", {
        subject,

        chapter,

        type: quizType,
      })

      .then((res) => {
        setQuiz(res.data.questions);

        if (res.data.user) {
          localStorage.setItem(
            "user",

            JSON.stringify(res.data.user),
          );

          setUser(res.data.user);
        }

        setLoading(false);
      })

      .catch((err) => {
        if (err?.response?.data?.premiumRequired) {
          setShowUpgrade(true);

          return;
        }

        console.error(err);

        setLoading(false);
      });
  }, []);

  // 🚀 TIMER
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

  // 🚀 ANSWER
  const handleAnswer = (i, val) => {
    const updated = [...answers];

    updated[i] = val;

    setAnswers(updated);
  };

  // 🚀 SUBMIT
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
      console.log(err);
    }
  };

  // 🚀 LOADING
  if (loading) {
    return (
      <Loader
        title="Generating AI Quiz"
        subtitle="Preparing smart CBSE questions for you..."
      />
    );
  }

  // 🚀 PREMIUM
  if (showUpgrade) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-white p-8 rounded-3xl shadow-xl text-center max-w-md">
          <h1 className="text-2xl font-bold text-purple-600 mb-4">
            Upgrade to Pro 🚀
          </h1>

          <p className="text-gray-600 mb-6">
            This quiz type is available only for Pro users.
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
    <div className="max-w-5xl mx-auto">
      {/* 🚀 HEADER */}
      <div className="bg-white rounded-3xl shadow p-5 mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-purple-600">
            {quizType === "mcq"
              ? "📘 MCQ Quiz"
              : quizType === "assertion"
                ? "🧠 Assertion & Reason"
                : "📄 Case Study"}
          </h1>

          <p className="text-gray-500 mt-1">
            {subject}
            {" • "}
            {chapter}
          </p>
        </div>

        <QuizTimer timeLeft={timeLeft} />
      </div>

      {/* 🚀 QUESTIONS */}
      {quiz.map((q, i) => (
        <div key={i} className="bg-white p-6 rounded-3xl shadow mb-5">
          <p className="text-sm text-gray-500 mb-2">Question {i + 1}</p>

          {/* 🚀 ASSERTION */}
          {q.type === "assertion_reason" ? (
            <div>
              <p className="font-bold text-purple-600">Assertion (A):</p>

              <p className="mb-4">{q.assertion}</p>

              <p className="font-bold text-purple-600">Reason (R):</p>

              <p>{q.reason}</p>
            </div>
          ) : (
            <p className="font-semibold text-lg">{q.question}</p>
          )}

          {/* 🚀 OPTIONS */}
          <div className="mt-5 space-y-3">
            {q.options?.map((opt) => (
              <button
                key={opt}
                onClick={() => handleAnswer(i, opt)}
                className={`w-full p-4 rounded-2xl border text-left transition

                    ${
                      answers[i] === opt
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-gray-50 hover:bg-gray-100"
                    }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      ))}

      {/* 🚀 SUBMIT */}
      <button
        onClick={submitQuiz}
        className="bg-green-500 hover:bg-green-600 text-white w-full p-4 rounded-2xl font-bold text-lg transition"
      >
        Submit Quiz
      </button>
    </div>
  );
}
