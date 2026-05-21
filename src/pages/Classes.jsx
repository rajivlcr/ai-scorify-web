import { useNavigate } from "react-router-dom";

export default function Classes() {
  const navigate = useNavigate();

  const classes = [
    {
      label: "Class 8",

      value: "class8",

      emoji: "🧠",

      color: "from-blue-500 via-cyan-500 to-sky-500",

      desc: "Foundation for higher secondary learning",
    },

    {
      label: "Class 10",

      value: "class10",

      emoji: "🏆",

      color: "from-purple-600 via-indigo-600 to-violet-600",

      desc: "Board exam focused AI preparation",
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 AI Powered CBSE Learning
        </div>

        <h1 className="text-4xl md:text-5xl font-black leading-tight bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Choose Your Class
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Practice smarter with AI-generated quizzes, board pattern questions
          and performance analytics.
        </p>
      </div>

      {/* 🚀 CLASS CARDS */}
      <div className="grid md:grid-cols-2 gap-10">
        {classes.map((c, index) => (
          <div
            key={c.value}
            onClick={() => {
              navigate(`/subjects/${c.value}`);
            }}
            className="group relative overflow-hidden rounded-[40px] cursor-pointer transition-all duration-500 hover:-translate-y-3 hover:shadow-2xl"
          >
            {/* 🚀 BACKGROUND */}
            <div className={`absolute inset-0 bg-gradient-to-br ${c.color}`} />

            {/* 🚀 GLOW */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

            {/* 🚀 CONTENT */}
            <div className="relative z-10 p-10 min-h-[340px] flex flex-col justify-between text-white">
              {/* 🚀 TOP */}
              <div className="flex items-start justify-between">
                <div className="text-7xl">{c.emoji}</div>

                <div className="bg-white/20 backdrop-blur-md px-5 py-2 rounded-full text-sm font-semibold">
                  AI Quiz
                </div>
              </div>

              {/* 🚀 CENTER */}
              <div>
                <p className="uppercase tracking-[4px] text-sm opacity-80">
                  CBSE Curriculum
                </p>

                <h2 className="text-5xl font-black mt-3">{c.label}</h2>

                <p className="mt-5 text-white/90 text-lg leading-relaxed max-w-md">
                  {c.desc}
                </p>
              </div>

              {/* 🚀 FOOTER */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">AI Powered Learning</p>

                  <p className="font-semibold text-lg mt-1">Start Practice →</p>
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
        ))}
      </div>

      {/* 🚀 BOTTOM SECTION */}
      <div className="mt-20 grid md:grid-cols-3 gap-6">
        <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100">
          <div className="text-4xl mb-4">⚡</div>

          <h3 className="text-xl font-bold">AI Generated Questions</h3>

          <p className="text-gray-500 mt-3">
            Fresh quizzes generated dynamically from textbook content.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100">
          <div className="text-4xl mb-4">🧠</div>

          <h3 className="text-xl font-bold">Board Pattern Practice</h3>

          <p className="text-gray-500 mt-3">
            Assertion, reasoning and case study questions for exams.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-7 border border-gray-100">
          <div className="text-4xl mb-4">🏆</div>

          <h3 className="text-xl font-bold">Leaderboard & XP</h3>

          <p className="text-gray-500 mt-3">
            Compete with students and improve daily streaks.
          </p>
        </div>
      </div>
    </div>
  );
}
