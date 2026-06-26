import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const [dashboard, setDashboard] = useState({
    rank: "--",

    achievements: [],

    recent: [],

    focusAreas: [],

    recommendations: [],

    avgScore: 0,

    total: 0,

    chapterProgress: [],

    masteredChapters: [],
  });

  // 🚀 LOAD DASHBOARD
  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const res = await api.get("/dashboard");

      setDashboard(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🚀 QUICK ACTIONS
  const quickActions = [
    {
      title: "MCQ Quiz",

      emoji: "📘",

      gradient: "from-blue-500 to-cyan-500",

      path: "/classes",

      premium: false,
    },

    {
      title: "Board Pattern",

      emoji: "🧠",

      gradient: "from-purple-500 to-indigo-600",

      path: "/classes",

      premium: true,
    },

    {
      title: "AI Study Notes",

      emoji: "📚",

      gradient: "from-cyan-500 to-blue-600",

      path: "/study-notes",

      premium: true,
    },

    {
      title: "Leaderboard",

      emoji: "🏆",

      gradient: "from-green-500 to-emerald-500",

      path: "/leaderboard",

      premium: false,
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-6">
      {/* 🚀 HERO */}
      <div className="relative overflow-hidden rounded-[30px] bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 p-6 md:p-7 text-white shadow-2xl mb-8">
        {/* 🚀 GLOW */}
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/20 rounded-full blur-3xl"></div>

        {/* 🚀 CONTENT */}
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          {/* 🚀 LEFT */}
          <div>
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-semibold mb-4">
              🚀 AI Powered Learning
            </div>

            <h1 className="text-3xl md:text-4xl font-black leading-tight">
              Welcome back, {user?.name}
            </h1>

            <p className="mt-3 text-white/90 text-base md:text-lg max-w-2xl leading-relaxed">
              Continue your CBSE preparation with AI-generated quizzes and board
              pattern practice.
            </p>
          </div>

          {/* 🚀 RIGHT */}
          <div className="bg-white/15 backdrop-blur-xl rounded-[28px] p-5 min-w-[240px] border border-white/20">
            <div className="grid grid-cols-2 gap-5">
              <div>
                <p className="text-sm opacity-80">XP</p>

                <h2 className="text-3xl font-black mt-1">{user?.xp || 0}</h2>
              </div>

              <div>
                <p className="text-sm opacity-80">Streak</p>

                <h2 className="text-3xl font-black mt-1">
                  🔥 {user?.streak || 0}
                </h2>
              </div>

              <div>
                <p className="text-sm opacity-80">Plan</p>

                <h2 className="text-2xl font-black mt-1 uppercase">
                  {user?.plan}
                </h2>
              </div>

              <div>
                <p className="text-sm opacity-80">Rank</p>

                <h2 className="text-3xl font-black mt-1">#{dashboard.rank}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 QUICK ACTIONS */}
      <div className="mb-10">
        <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-5">
          Quick Actions
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => {
                if (action.premium && user?.plan === "free") {
                  navigate("/pricing");

                  return;
                }

                navigate(action.path);
              }}
              className="group relative overflow-hidden rounded-[28px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient}`}
              />

              <div className="relative z-10 p-6 text-white min-h-[190px] flex flex-col justify-between">
                <div className="flex items-start justify-between">
                  <div className="text-5xl">{action.emoji}</div>

                  {action.premium && (
                    <div className="bg-yellow-300 text-black px-3 py-1 rounded-full text-xs font-black">
                      PRO
                    </div>
                  )}
                </div>

                <div>
                  <h3 className="text-2xl font-black">{action.title}</h3>

                  <p className="mt-3 text-white/90">Start now →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 LEARNING ANALYTICS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-500">Total Quizzes</p>

          <h2 className="text-4xl font-black text-purple-600 mt-2">
            {dashboard.total || 0}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-500">Average Accuracy</p>

          <h2 className="text-4xl font-black text-green-600 mt-2">
            {Math.round(dashboard.avgAccuracy || 0)}%
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-500">Focus Areas</p>

          <h2 className="text-4xl font-black text-red-500 mt-2">
            {dashboard.focusAreas?.length || 0}
          </h2>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          <p className="text-gray-500">Mastered Chapters</p>

          <h2 className="text-4xl font-black text-blue-600 mt-2">
            {dashboard.masteredChapters?.length || 0}
          </h2>
        </div>
      </div>
      {/* 🚀 REVISION QUIZ */}
      <div className="mb-10">
        <div className="bg-gradient-to-r from-red-500 to-orange-500 rounded-[30px] p-8 text-white shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <h2 className="text-3xl font-black">🔥 Mistake Revision Quiz</h2>

              <p className="mt-3 text-white/90">
                Practice questions from concepts where you previously made
                mistakes.
              </p>
            </div>

            <button
              onClick={() => navigate("/quiz?revision=true")}
              className="bg-white text-red-600 px-8 py-4 rounded-2xl font-black"
            >
              Start Revision
            </button>
          </div>
        </div>
      </div>
      {/* 🚀 STUDY RECOMMENDATIONS */}
      <div className="mb-10">
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            📖 Recommended Next Topics
          </h2>

          {!dashboard.recommendations ||
          dashboard.recommendations.length === 0 ? (
            <p className="text-gray-500">
              Complete more quizzes to get personalized recommendations.
            </p>
          ) : (
            <div className="space-y-4">
              {dashboard.recommendations.map((item, index) => (
                <div
                  key={index}
                  className="bg-blue-50 border border-blue-100 rounded-2xl p-5"
                >
                  <h3 className="font-black text-gray-800">{item.title}</h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Chapter: {item.chapter}
                  </p>

                  <p className="text-sm text-red-500 mt-2 font-bold">
                    Priority Score: {item.priority}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 🚀 FOCUS AREAS */}
      <div className="mb-10">
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            🎯 Focus Areas
          </h2>

          {!dashboard.focusAreas || dashboard.focusAreas.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🎯</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Weak Areas Found
              </h3>

              <p className="text-gray-500 mt-2">
                Keep practicing quizzes to generate personalized learning
                insights.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {dashboard.focusAreas.map((area, index) => (
                <div
                  key={index}
                  className="bg-red-50 border border-red-100 rounded-2xl p-5"
                >
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h3 className="font-black text-gray-800">
                        {area.chapter}
                      </h3>

                      <p className="text-sm text-gray-600 mt-1">
                        {area.learningObjective || "General Concept"}
                      </p>
                    </div>

                    <div className="bg-red-500 text-white px-4 py-2 rounded-xl font-bold">
                      {area.wrongCount} Mistakes
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 🚀 MASTERED CHAPTERS */}
      <div className="mb-10">
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            🏆 Mastered Chapters
          </h2>

          {!dashboard.masteredChapters ||
          dashboard.masteredChapters.length === 0 ? (
            <div className="text-gray-500">
              Complete more quizzes to unlock mastered chapters.
            </div>
          ) : (
            <div className="flex flex-wrap gap-4">
              {dashboard.masteredChapters.map((item, index) => (
                <div
                  key={index}
                  className="bg-green-100 text-green-700 px-5 py-3 rounded-2xl font-bold"
                >
                  ✅ {item.chapter}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      {/* 🚀 GRID */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 🚀 CHAPTER COMPLETION */}
        <div className="mb-10">
          <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
            <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
              📚 Chapter Completion
            </h2>

            {!dashboard.chapterProgress ||
            dashboard.chapterProgress.length === 0 ? (
              <p className="text-gray-500">
                Start attempting quizzes to track chapter progress.
              </p>
            ) : (
              <div className="space-y-5">
                {dashboard.chapterProgress.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-2">
                      <span className="font-bold">{item.chapter}</span>

                      <span>{item.completion}%</span>
                    </div>

                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-purple-600 to-indigo-600 h-3 rounded-full"
                        style={{
                          width: `${item.completion}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        {/* 🚀 RECENT */}
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            Recent Activity
          </h2>

          {dashboard.recent.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🚀</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Recent Activity
              </h3>

              <p className="text-gray-500 mt-2">
                Start practicing quizzes to track your progress.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {dashboard.recent.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-green-50 p-5 rounded-2xl"
                >
                  <div className="text-3xl">✅</div>

                  <div>
                    <p className="font-bold text-gray-800">
                      Completed {item.subject} Quiz
                    </p>

                    <p className="text-gray-500 mt-1">Score: {item.score}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* 🚀 ACHIEVEMENTS */}
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            Achievements
          </h2>

          {dashboard.achievements.length === 0 ? (
            <div className="bg-gray-50 rounded-2xl p-6 text-center">
              <div className="text-5xl mb-4">🏆</div>

              <h3 className="text-xl font-bold text-gray-800">
                No Achievements Yet
              </h3>

              <p className="text-gray-500 mt-2">
                Complete quizzes and maintain streaks to unlock achievements.
              </p>
            </div>
          ) : (
            <div className="space-y-5">
              {dashboard.achievements.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-5 bg-gray-50 hover:bg-purple-50 transition p-5 rounded-2xl"
                >
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-3xl shadow-lg">
                    {item.emoji}
                  </div>

                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      {item.title}
                    </h3>

                    <p className="text-gray-500 mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
