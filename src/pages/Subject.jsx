import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Subject() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);

  const [loading, setLoading] = useState(true);

  const className = localStorage.getItem("className");

  // 🚀 SUBJECT CONFIG
  const subjectThemes = {
    science: {
      emoji: "🧪",

      gradient: "from-cyan-500 via-blue-500 to-indigo-600",

      badge: "AI Science",
    },

    maths: {
      emoji: "📘",

      gradient: "from-purple-500 via-violet-500 to-indigo-600",

      badge: "AI Maths",
    },

    social: {
      emoji: "🌍",

      gradient: "from-orange-500 via-red-500 to-pink-500",

      badge: "AI Social",
    },

    english: {
      emoji: "📖",

      gradient: "from-green-500 via-emerald-500 to-teal-500",

      badge: "AI English",
    },
  };

  const currentTheme = subjectThemes[name?.toLowerCase()] || {
    emoji: "📚",

    gradient: "from-purple-500 to-indigo-600",

    badge: "AI Subject",
  };

  // 🚀 FETCH CHAPTERS
  useEffect(() => {
    api
      .get(`/syllabus/${name}?className=${className}`)

      .then((res) => {
        setChapters(res.data.chapters || []);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [name]);

  // 🚀 LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-5"></div>

          <p className="text-gray-600 text-lg">Loading Chapters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div
        className={`relative overflow-hidden rounded-[32px] bg-gradient-to-br ${currentTheme.gradient} p-6 md:p-8 text-white shadow-2xl mb-14`}
      >
        {/* 🚀 GLOW */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>

        {/* 🚀 CONTENT */}
        <div className="relative z-10">
          <div className="flex items-center justify-between flex-wrap gap-5">
            <div>
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold mb-5">
                🚀 {currentTheme.badge}
              </div>

              <p className="uppercase tracking-[5px] text-sm opacity-80">
                {className}
              </p>

              <h1 className="text-4xl md:text-5xl font-black capitalize mt-4">
                {name}
              </h1>

              <p className="mt-6 text-lg text-white/90 max-w-2xl leading-relaxed">
                Practice chapter-wise AI generated quizzes, board pattern
                questions and smart learning analytics.
              </p>
            </div>

            {/* 🚀 ICON */}
            <div className="text-6xl md:text-7xl">{currentTheme.emoji}</div>
          </div>
        </div>
      </div>

      {/* 🚀 EMPTY */}
      {chapters.length === 0 && (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Chapters Found
          </h2>
        </div>
      )}

      {/* 🚀 CHAPTER GRID */}
      <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
        {chapters.map((chapter, index) => (
          <div
            key={index}
            onClick={() => {
              localStorage.setItem(
                "chapter",

                chapter.name,
              );

              navigate("/question-types");
            }}
            className="group relative overflow-hidden bg-white rounded-[35px] shadow-lg hover:shadow-2xl border border-gray-100 cursor-pointer transition-all duration-500 hover:-translate-y-3"
          >
            {/* 🚀 TOP BAR */}
            <div
              className={`h-2 bg-gradient-to-r ${currentTheme.gradient}`}
            ></div>

            {/* 🚀 CONTENT */}
            <div className="p-8">
              {/* 🚀 HEADER */}
              <div className="flex items-start justify-between mb-6">
                <div
                  className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${currentTheme.gradient} text-white flex items-center justify-center text-2xl font-bold shadow-lg`}
                >
                  {index + 1}
                </div>

                <div className="text-4xl opacity-20 group-hover:opacity-100 transition">
                  📘
                </div>
              </div>

              {/* 🚀 CHAPTER */}
              <h2 className="text-2xl font-black text-gray-800 capitalize leading-snug">
                {chapter.name}
              </h2>

              {/* 🚀 DESC */}
              <p className="text-gray-500 mt-4 leading-relaxed">
                AI-generated MCQs, board pattern questions and smart analytics
                for this chapter.
              </p>

              {/* 🚀 FOOTER */}
              <div className="mt-8 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Smart Practice</p>

                  <p className="font-semibold text-purple-600 mt-1">
                    Start Quiz →
                  </p>
                </div>

                <div
                  className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${currentTheme.gradient} text-white flex items-center justify-center text-2xl group-hover:translate-x-1 transition`}
                >
                  →
                </div>
              </div>
            </div>

            {/* 🚀 BG NUMBER */}
            <div className="absolute bottom-2 right-5 text-[120px] font-black text-gray-50 leading-none">
              0{index + 1}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
