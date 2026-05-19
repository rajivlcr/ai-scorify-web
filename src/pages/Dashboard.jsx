import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const navigate = useNavigate();

  const { user } = useAuth();

  // 🚀 ACHIEVEMENTS
  const achievements = [
    {
      emoji: "🔥",

      title: "3 Day Streak",

      desc: "Practice continuously for 3 days",
    },

    {
      emoji: "⚡",

      title: "100 XP Club",

      desc: "Earn 100 XP points",
    },

    {
      emoji: "🏆",

      title: "Quiz Master",

      desc: "Score 100% in a quiz",
    },
  ];

  // 🚀 QUICK ACTIONS
  const quickActions = [
    {
      title: "MCQ Quiz",

      emoji: "📘",

      gradient: "from-blue-500 to-cyan-500",

      path: "/classes",
    },

    {
      title: "Board Pattern",

      emoji: "🧠",

      gradient: "from-purple-500 to-indigo-600",

      path: "/classes",
    },

    {
      title: "Case Study",

      emoji: "📄",

      gradient: "from-orange-500 to-red-500",

      path: "/classes",
    },

    {
      title: "Leaderboard",

      emoji: "🏆",

      gradient: "from-green-500 to-emerald-500",

      path: "/leaderboard",
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

          {/* 🚀 RIGHT STATS */}
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

                <h2 className="text-3xl font-black mt-1">#3</h2>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 🚀 QUICK ACTIONS */}
      <div className="mb-10">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800">
            Quick Actions
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickActions.map((action, index) => (
            <div
              key={index}
              onClick={() => navigate(action.path)}
              className="group relative overflow-hidden rounded-[28px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-lg hover:shadow-2xl"
            >
              {/* 🚀 BG */}
              <div
                className={`absolute inset-0 bg-gradient-to-br ${action.gradient}`}
              />

              {/* 🚀 GLOW */}
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

              {/* 🚀 CONTENT */}
              <div className="relative z-10 p-6 text-white min-h-[190px] flex flex-col justify-between">
                <div className="text-5xl">{action.emoji}</div>

                <div>
                  <h3 className="text-2xl font-black">{action.title}</h3>

                  <p className="mt-3 text-white/90">Start now →</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 🚀 DAILY CHALLENGE */}
      <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7 mb-10">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              ⚡ Daily Challenge
            </div>

            <h2 className="text-3xl font-black text-gray-800">
              Acids Bases and Salts
            </h2>

            <p className="text-gray-500 mt-3 text-lg">
              Complete today's challenge and earn bonus XP.
            </p>
          </div>

          <button
            onClick={() => navigate("/classes")}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-4 rounded-2xl font-black shadow-xl hover:scale-105 transition"
          >
            Start Challenge 🚀
          </button>
        </div>
      </div>

      {/* 🚀 GRID */}
      <div className="grid lg:grid-cols-2 gap-8">
        {/* 🚀 RECENT ACTIVITY */}
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            Recent Activity
          </h2>

          <div className="space-y-5">
            <div className="flex items-center gap-5 bg-green-50 p-5 rounded-2xl">
              <div className="text-3xl">✅</div>

              <div>
                <p className="font-bold text-gray-800">
                  Completed Science Quiz
                </p>

                <p className="text-gray-500 mt-1">Earned +15 XP</p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-purple-50 p-5 rounded-2xl">
              <div className="text-3xl">🔥</div>

              <div>
                <p className="font-bold text-gray-800">Maintained Streak</p>

                <p className="text-gray-500 mt-1">5 day learning streak</p>
              </div>
            </div>

            <div className="flex items-center gap-5 bg-blue-50 p-5 rounded-2xl">
              <div className="text-3xl">🏆</div>

              <div>
                <p className="font-bold text-gray-800">
                  Leaderboard Rank Improved
                </p>

                <p className="text-gray-500 mt-1">Reached Top 3</p>
              </div>
            </div>
          </div>
        </div>

        {/* 🚀 ACHIEVEMENTS */}
        <div className="bg-white rounded-[30px] shadow-lg border border-gray-100 p-7">
          <h2 className="text-2xl md:text-3xl font-black text-gray-800 mb-7">
            Achievements
          </h2>

          <div className="space-y-5">
            {achievements.map((item, index) => (
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
        </div>
      </div>
    </div>
  );
}
