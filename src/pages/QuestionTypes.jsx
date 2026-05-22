import { useLocation, useNavigate } from "react-router-dom";

export default function QuestionTypes() {
  const navigate = useNavigate();

  const location = useLocation();

  // 🚀 QUERY PARAMS
  const params = new URLSearchParams(location.search);

  const className = params.get("className");

  const subject = params.get("subject");

  const chapter = params.get("chapter");

  // 🚀 TYPES
  const types = [
    {
      title: "MCQ Quiz",

      type: "mcq",

      emoji: "📘",

      gradient: "from-blue-500 to-cyan-500",

      desc: "AI-generated multiple choice questions",
    },

    {
      title: "Assertion & Reason",

      type: "assertion",

      emoji: "🧠",

      gradient: "from-purple-500 to-indigo-600",

      desc: "Board pattern assertion questions",
    },

    {
      title: "Case Study",

      type: "case-study",

      emoji: "📄",

      gradient: "from-orange-500 to-red-500",

      desc: "CBSE case study practice",
    },
  ];

  // 🚀 OPEN QUIZ
  const startQuiz = (type) => {
    navigate(
      `/quiz?className=${className}&subject=${subject}&chapter=${chapter}&type=${type}`,
    );
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HEADER */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 AI Powered Quiz Modes
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Choose Question Type
        </h1>

        <p className="text-gray-500 text-lg mt-5">{chapter}</p>
      </div>

      {/* 🚀 CARDS */}
      <div className="grid md:grid-cols-3 gap-8">
        {types.map((item, index) => (
          <div
            key={index}
            onClick={() => startQuiz(item.type)}
            className="group relative overflow-hidden rounded-[35px] cursor-pointer hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            {/* 🚀 BG */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
            />

            {/* 🚀 GLOW */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

            {/* 🚀 CONTENT */}
            <div className="relative z-10 p-8 min-h-[320px] text-white flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="text-6xl">{item.emoji}</div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                  AI
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black">{item.title}</h2>

                <p className="mt-5 text-white/90 text-lg leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Start Practice</p>

                  <p className="font-bold text-lg mt-1">Continue →</p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl group-hover:translate-x-1 transition">
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
