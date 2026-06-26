import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function QuestionTypes() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const isPro = user?.plan?.toLowerCase() === "pro";

  const location = useLocation();

  const params = new URLSearchParams(location.search);

  const className = params.get("className");

  const subject = params.get("subject");

  const chapter = params.get("chapter");

  const types = [
    {
      title: "MCQ Quiz",
      type: "mcq",
      emoji: "📘",
      gradient: "from-blue-500 to-cyan-500",
      desc: "Unlimited MCQ Practice",
      locked: false,
    },

    {
      title: "Assertion & Reason",
      type: "assertion",
      emoji: isPro ? "🧠" : "🔒",
      gradient: isPro
        ? "from-purple-500 to-indigo-600"
        : "from-gray-500 to-gray-600",
      desc: isPro ? "Board Pattern Assertion Questions" : "Pro Feature",
      locked: !isPro,
    },

    {
      title: "AI Study Notes",
      type: "notes",
      emoji: isPro ? "📚" : "🔒",
      gradient: isPro
        ? "from-cyan-500 to-blue-600"
        : "from-gray-500 to-gray-600",
      desc: isPro ? "AI Generated Chapter Notes" : "Pro Feature",
      locked: !isPro,
    },
  ];

  const startQuiz = (item) => {
    if (item.locked) {
      navigate("/pricing");
      return;
    }

    if (item.type === "notes") {
      console.log({
        className,
        subject,
        chapter,
      });
      navigate(
        `/study-notes?className=${className}&subject=${subject}&chapter=${chapter}`,
      );

      return;
    }

    navigate(
      `/quiz?className=${className}&subject=${subject}&chapter=${chapter}&type=${item.type}`,
    );
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 AI Powered Learning
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Choose Learning Mode
        </h1>

        <p className="text-gray-500 text-lg mt-5">
          {decodeURIComponent(chapter || "")}
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {types.map((item, index) => (
          <div
            key={index}
            onClick={() => startQuiz(item)}
            className="group relative overflow-hidden rounded-[35px] cursor-pointer hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            <div
              className={`absolute inset-0 bg-gradient-to-br ${item.gradient}`}
            />

            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

            <div className="relative z-10 p-8 min-h-[320px] text-white flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="text-6xl">{item.emoji}</div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                  {item.locked ? "PRO" : "AVAILABLE"}
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
                  <p className="text-sm opacity-80">
                    {item.locked ? "Upgrade Required" : "Start Learning"}
                  </p>

                  <p className="font-bold text-lg mt-1">
                    {item.locked ? "Upgrade →" : "Continue →"}
                  </p>
                </div>

                <div className="w-16 h-16 rounded-3xl bg-white/20 backdrop-blur-md flex items-center justify-center text-3xl group-hover:translate-x-1 transition">
                  →
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {!isPro && (
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-3xl p-8 text-white text-center">
          <h2 className="text-3xl font-black">Upgrade to Pro</h2>

          <p className="mt-4 text-white/90">
            Unlock AI Study Notes, unlimited chapters and Assertion & Reason
            questions.
          </p>

          <button
            onClick={() => navigate("/pricing")}
            className="mt-6 bg-white text-purple-700 px-8 py-4 rounded-2xl font-bold"
          >
            Upgrade Now
          </button>
        </div>
      )}
    </div>
  );
}
