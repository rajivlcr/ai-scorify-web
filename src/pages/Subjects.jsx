import { useNavigate, useParams } from "react-router-dom";

export default function Subjects() {
  const navigate = useNavigate();

  const { className } = useParams();

  // 🚀 SUBJECTS
  const subjects = [
    {
      name: "science",

      label: "Science",

      emoji: "🧪",

      gradient: "from-green-500 to-emerald-600",

      desc: "Physics, Chemistry & Biology",
    },

    {
      name: "maths",

      label: "Mathematics",

      emoji: "📐",

      gradient: "from-blue-500 to-indigo-600",

      desc: "CBSE Maths Practice",
    },
  ];

  // 🚀 OPEN SUBJECT
  const openSubject = (subject) => {
    navigate(`/subject/${className}/${subject}`);
  };

  return (
    <div className="min-h-screen max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 HERO */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-2 bg-purple-100 text-purple-600 px-5 py-2 rounded-full text-sm font-semibold mb-6">
          🚀 Choose Subject
        </div>

        <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          {className === "class10" ? "Class 10" : "Class 8"} Subjects
        </h1>

        <p className="text-gray-500 text-lg mt-5">
          AI-powered CBSE preparation
        </p>
      </div>

      {/* 🚀 SUBJECT CARDS */}
      <div className="grid md:grid-cols-2 gap-8">
        {subjects.map((subject, index) => (
          <div
            key={index}
            onClick={() => openSubject(subject.name)}
            className="group relative overflow-hidden rounded-[35px] cursor-pointer hover:-translate-y-3 transition-all duration-500 shadow-xl hover:shadow-2xl"
          >
            {/* 🚀 BG */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${subject.gradient}`}
            />

            {/* 🚀 GLOW */}
            <div className="absolute -top-20 -right-20 w-72 h-72 bg-white/20 rounded-full blur-3xl" />

            {/* 🚀 CONTENT */}
            <div className="relative z-10 p-8 min-h-[320px] text-white flex flex-col justify-between">
              <div className="flex items-start justify-between">
                <div className="text-6xl">{subject.emoji}</div>

                <div className="bg-white/20 backdrop-blur-md px-4 py-2 rounded-full text-sm font-bold">
                  CBSE
                </div>
              </div>

              <div>
                <h2 className="text-4xl font-black">{subject.label}</h2>

                <p className="mt-5 text-white/90 text-lg leading-relaxed">
                  {subject.desc}
                </p>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm opacity-80">Continue Learning</p>

                  <p className="font-bold text-lg mt-1">Open →</p>
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
