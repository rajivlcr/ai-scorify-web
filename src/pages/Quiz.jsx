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

  // 🚀 STORAGE
  const className = localStorage.getItem("className");

  const subject = localStorage.getItem("subject");

  const chapter = localStorage.getItem("chapter");

  const quizType = localStorage.getItem("quizType");

  // 🚀 QUIZ TITLE
  const quizTitles = {
    mcq: "📘 MCQ Quiz",

    assertion: "🧠 Board Pattern",

    case_study: "📄 Case Study",
  };

  // 🚀 FETCH QUIZ
  useEffect(() => {
    api
      .post(
        "/quiz/generate",

        {
          className,

          subject,

          chapter,

          type: quizType,
        },
      )

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
        console.log(err);

        if (err?.response?.data?.premiumRequired) {
          setShowUpgrade(true);

          return;
        }

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

      const res = await api.post(
        "/quiz/submit",

        {
          userId,

          subject,

          chapter,

          quiz,

          answers,
        },
      );

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

  // 🚀 LOADER
  if (loading) {
    return (
      <Loader
        title="Generating AI Quiz"
        subtitle="Preparing smart CBSE questions..."
      />
    );
  }

  // 🚀 PREMIUM
  if (showUpgrade) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="bg-white p-10 rounded-[35px] shadow-2xl text-center max-w-md">
          <div className="text-6xl mb-5">🔒</div>

          <h1 className="text-3xl font-black text-purple-600 mb-4">
            Upgrade to PRO
          </h1>

          <p className="text-gray-500 mb-8">
            Unlock board pattern and case study quizzes.
          </p>

          <button
            onClick={() => navigate("/pricing")}
            className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:scale-105 transition"
          >
            Upgrade Now 🚀
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* 🚀 HERO */}
      <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white p-6 md:p-8 shadow-2xl mb-10">
        {/* 🚀 GLOW */}
        <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

        {/* 🚀 CONTENT */}
        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-5">
              🚀 AI Powered Quiz
            </div>

            <h1 className="text-4xl md:text-5xl font-black">
              {quizTitles[quizType]}
            </h1>

            <p className="mt-4 text-white/90 text-lg capitalize">
              {className}
              {" • "}
              {subject}
              {" • "}
              {chapter}
            </p>
          </div>

          {/* 🚀 TIMER */}
          <div className="bg-white/20 backdrop-blur-xl rounded-[28px] p-5">
            <QuizTimer timeLeft={timeLeft} />
          </div>
        </div>
      </div>

      {/* 🚀 QUESTIONS */}
      <div className="space-y-8">
        {quiz.map((q, i) => (
          <div
            key={i}
            className="bg-white rounded-[35px] shadow-lg border border-gray-100 overflow-hidden"
          >
            {/* 🚀 TOP BAR */}
            <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4 flex items-center justify-between">
              <div className="text-white font-bold text-lg">
                Question {i + 1}
              </div>

              <div className="bg-white/20 text-white px-4 py-1 rounded-full text-sm">
                AI Generated
              </div>
            </div>

            {/* 🚀 BODY */}
            <div className="p-7">
              {/* 🚀 ASSERTION */}
              {q.type === "assertion_reason" ? (
                <div>
                  <div className="bg-purple-50 rounded-2xl p-5 mb-5">
                    <p className="font-bold text-purple-600 mb-2">
                      Assertion (A)
                    </p>

                    <p className="text-gray-700 leading-relaxed">
                      {q.assertion}
                    </p>
                  </div>

                  <div className="bg-indigo-50 rounded-2xl p-5">
                    <p className="font-bold text-indigo-600 mb-2">Reason (R)</p>

                    <p className="text-gray-700 leading-relaxed">{q.reason}</p>
                  </div>
                </div>
              ) : (
                <h2 className="text-2xl font-bold text-gray-800 leading-relaxed">
                  {q.question}
                </h2>
              )}

              {/* 🚀 OPTIONS */}
              <div className="mt-8 space-y-4">
                {q.options?.map((opt, idx) => (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(i, opt)}
                    className={`w-full p-5 rounded-2xl border-2 text-left transition-all duration-300 flex items-center gap-4

                        ${
                          answers[i] === opt
                            ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white border-transparent shadow-lg scale-[1.01]"
                            : "bg-gray-50 hover:bg-purple-50 border-gray-200 hover:border-purple-300"
                        }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold

                          ${
                            answers[i] === opt
                              ? "bg-white/20"
                              : "bg-white border"
                          }`}
                    >
                      {String.fromCharCode(65 + idx)}
                    </div>

                    <span className="text-lg leading-relaxed">{opt}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🚀 SUBMIT */}
      <div className="sticky bottom-5 mt-10">
        <button
          onClick={submitQuiz}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white py-5 rounded-[28px] text-xl font-black shadow-2xl hover:scale-[1.01] transition-all duration-300"
        >
          Submit Quiz 🚀
        </button>
      </div>
    </div>
  );
}
