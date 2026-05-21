import { useNavigate, useSearchParams } from "react-router-dom";

export default function QuestionTypes() {
  const navigate = useNavigate();

  const [searchParams] = useSearchParams();

  const className = searchParams.get("className");

  const subject = searchParams.get("subject");

  const chapter = searchParams.get("chapter");

  const questionTypes = [
    {
      type: "mcq",

      title: "MCQ Quiz",

      emoji: "🧠",

      color: "from-blue-500 to-cyan-500",

      desc: "Practice AI-generated multiple choice questions.",
    },

    {
      type: "assertion",

      title: "Assertion & Reason",

      emoji: "⚡",

      color: "from-purple-600 to-indigo-600",

      desc: "Board-exam style reasoning questions.",
    },

    {
      type: "case-study",

      title: "Case Study",

      emoji: "📚",

      color: "from-pink-500 to-rose-500",

      desc: "Advanced competency-based case study questions.",
    },
  ];

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 AI Quiz Modes
        </div>

        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Choose Question Type
        </h1>

        <p className="text-gray-500 text-lg mt-5 max-w-2xl mx-auto">
          Practice smarter with AI-generated quizzes designed for CBSE exams.
        </p>
      </div>

      {/* 🚀 GRID */}
      <div className="grid md:grid-cols-3 gap-8">
        {questionTypes.map((q, index) => (
          <div
            key={index}
            onClick={() => {
              navigate(
                `/quiz?className=${className}&subject=${subject}&chapter=${chapter}&type=${q.type}`,
              );
            }}
            className="group relative overflow-hidden rounded-[35px] cursor-pointer hover:-translate-y-2 transition-all duration-500 shadow-2xl"
          >
            {/* 🚀 BG */}
            <div className={`absolute inset-0 bg-gradient-to-br ${q.color}`} />

            {/* 🚀 GLOW */}
            <div className="absolute -top-10 -right-10 w-52 h-52 bg-white/20 rounded-full blur-3xl"></div>

            {/* 🚀 CONTENT */}
            <div className="relative z-10 p-8 text-white min-h-[320px] flex flex-col justify-between">
              <div>
                <div className="text-7xl mb-6">{q.emoji}</div>

                <h2 className="text-3xl font-black">{q.title}</h2>

                <p className="mt-5 text-white/90 leading-relaxed">{q.desc}</p>
              </div>

              <div className="flex items-center justify-between mt-8">
                <span className="font-bold text-lg">Start Quiz →</span>

                <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-2xl group-hover:translate-x-1 transition">
                  →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
