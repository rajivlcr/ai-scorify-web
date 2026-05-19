import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function QuestionTypes() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const chapter = localStorage.getItem("chapter");

  const subject = localStorage.getItem("subject");

  const className = localStorage.getItem("className");

  const types = [
    {
      title: "MCQ Quiz",

      value: "mcq",

      emoji: "📘",

      gradient: "from-blue-500 via-cyan-500 to-sky-500",

      questions: "15 Questions",

      desc: "Practice AI-generated multiple choice questions from textbook concepts.",

      premium: false,
    },

    {
      title: "Board Pattern",

      value: "assertion",

      emoji: "🧠",

      gradient: "from-purple-500 via-violet-500 to-indigo-600",

      questions: "10 Questions",

      desc: "Assertion & reasoning questions designed for CBSE board preparation.",

      premium: true,
    },

    {
      title: "Case Study",

      value: "case_study",

      emoji: "📄",

      gradient: "from-orange-500 via-red-500 to-pink-500",

      questions: "2 Case Studies",

      desc: "Application-based AI case studies with real exam style questions.",

      premium: true,
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-5">
          🚀 AI Powered Practice
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Choose Quiz Type
        </h1>

        <p className="text-gray-500 text-lg mt-4 max-w-3xl mx-auto">
          {className?.toUpperCase()}
          {" • "}
          {subject}
          {" • "}
          {chapter}
        </p>
      </div>

      {/* 🚀 GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {types.map((type, index) => {
          const locked = type.premium && user?.plan !== "pro";

          return (
            <div
              key={type.value}
              onClick={() => {
                if (locked) {
                  navigate("/pricing");

                  return;
                }

                localStorage.setItem(
                  "quizType",

                  type.value,
                );

                navigate("/quiz");
              }}
              className={`group relative overflow-hidden rounded-[35px] transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl

                ${locked ? "cursor-pointer opacity-90" : "cursor-pointer"}`}
            >
              {/* 🚀 BG */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${type.gradient}`}
              />

              {/* 🚀 GLOW */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl"></div>

              {/* 🚀 CONTENT */}
              <div className="relative z-10 p-8 min-h-[350px] flex flex-col justify-between text-white">
                {/* 🚀 TOP */}
                <div className="flex items-start justify-between">
                  <div className="text-7xl">{type.emoji}</div>

                  <div className="flex flex-col items-end gap-2">
                    <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold">
                      {type.questions}
                    </div>

                    {locked && (
                      <div className="bg-yellow-400 text-black px-4 py-1 rounded-full text-xs font-bold">
                        PRO
                      </div>
                    )}
                  </div>
                </div>

                {/* 🚀 CENTER */}
                <div>
                  <p className="uppercase tracking-[4px] text-sm opacity-80">
                    AI Generated
                  </p>

                  <h2 className="text-4xl font-black mt-3">{type.title}</h2>

                  <p className="mt-5 text-white/90 text-lg leading-relaxed">
                    {type.desc}
                  </p>
                </div>

                {/* 🚀 FOOTER */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Smart Practice</p>

                    <p className="font-semibold text-lg mt-1">
                      {locked ? "Unlock PRO →" : "Start Quiz →"}
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl group-hover:translate-x-1 transition">
                    {locked ? "🔒" : "→"}
                  </div>
                </div>
              </div>

              {/* 🚀 BIG NUMBER */}
              <div className="absolute bottom-2 right-6 text-white/10 text-[140px] font-black leading-none">
                0{index + 1}
              </div>
            </div>
          );
        })}
      </div>

      {/* 🚀 INFO SECTION */}
      <div className="mt-14 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-4">⚡</div>

          <h3 className="text-xl font-bold">AI Generated Questions</h3>

          <p className="text-gray-500 mt-3">
            Fresh question pools generated dynamically from textbook content.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-4">🧠</div>

          <h3 className="text-xl font-bold">Board Pattern Focus</h3>

          <p className="text-gray-500 mt-3">
            Assertion and case study formats aligned with CBSE exams.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6 border border-gray-100">
          <div className="text-4xl mb-4">🏆</div>

          <h3 className="text-xl font-bold">XP & Leaderboard</h3>

          <p className="text-gray-500 mt-3">
            Earn XP, maintain streaks and compete with other students.
          </p>
        </div>
      </div>
    </div>
  );
}
