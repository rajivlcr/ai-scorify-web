import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";

export default function Subjects() {
  const navigate = useNavigate();

  const { className } = useParams();

  const [subjects, setSubjects] = useState([]);

  const [loading, setLoading] = useState(true);

  // 🚀 SUBJECT CONFIG
  const subjectConfig = {
    science: {
      emoji: "🧪",

      color: "from-blue-500 via-cyan-500 to-sky-500",

      desc: "Explore physics, chemistry and biology concepts with AI-powered quizzes.",
    },

    maths: {
      emoji: "📘",

      color: "from-purple-500 via-violet-500 to-indigo-500",

      desc: "Master formulas, equations and problem solving techniques.",
    },

    social: {
      emoji: "🌍",

      color: "from-orange-500 via-red-500 to-pink-500",

      desc: "Learn history, geography, civics and economics interactively.",
    },

    english: {
      emoji: "📖",

      color: "from-green-500 via-emerald-500 to-teal-500",

      desc: "Improve grammar, comprehension and literature skills.",
    },
  };

  // 🚀 FETCH SUBJECTS
  useEffect(() => {
    api

      .get(`/syllabus/subjects/${className}`)

      .then((res) => {
        setSubjects(res.data || []);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [className]);

  // 🚀 LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mx-auto mb-5"></div>

          <p className="text-gray-600 text-lg">Loading Subjects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 AI Powered Learning
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {className?.toUpperCase()}
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Choose a subject and start practicing AI-generated CBSE questions.
        </p>
      </div>

      {/* 🚀 EMPTY */}
      {subjects.length === 0 && (
        <div className="bg-white p-10 rounded-3xl shadow-xl text-center">
          <h2 className="text-2xl font-bold text-gray-700">
            No Subjects Found
          </h2>
        </div>
      )}

      {/* 🚀 GRID */}
      <div className="grid md:grid-cols-2 gap-10">
        {subjects.map((subject, index) => {
          const config = subjectConfig[subject.toLowerCase()] || {
            emoji: "📚",

            color: "from-purple-500 to-indigo-500",

            desc: "AI powered subject learning.",
          };

          return (
            <div
              key={subject}
              onClick={() => {
                navigate(`/subject/${className}/${subject}`);
              }}
              className="group relative overflow-hidden rounded-[40px] cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
            >
              {/* 🚀 BG */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${config.color}`}
              />

              {/* 🚀 GLOW */}
              <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

              {/* 🚀 CONTENT */}
              <div className="relative z-10 p-10 min-h-[320px] flex flex-col justify-between text-white">
                {/* 🚀 TOP */}
                <div className="flex items-start justify-between">
                  <div className="text-7xl">{config.emoji}</div>

                  <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold">
                    AI Subject
                  </div>
                </div>

                {/* 🚀 CENTER */}
                <div>
                  <p className="uppercase tracking-[4px] text-sm opacity-80">
                    CBSE Curriculum
                  </p>

                  <h2 className="text-5xl font-black mt-3 capitalize">
                    {subject}
                  </h2>

                  <p className="mt-5 text-white/90 text-lg leading-relaxed max-w-md">
                    {config.desc}
                  </p>
                </div>

                {/* 🚀 FOOTER */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm opacity-80">Smart Practice</p>

                    <p className="font-semibold text-lg mt-1">
                      Explore Chapters →
                    </p>
                  </div>

                  <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl group-hover:translate-x-1 transition">
                    →
                  </div>
                </div>
              </div>

              {/* 🚀 BIG NUMBER */}
              <div className="absolute bottom-2 right-6 text-white/10 text-[150px] font-black leading-none">
                0{index + 1}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
