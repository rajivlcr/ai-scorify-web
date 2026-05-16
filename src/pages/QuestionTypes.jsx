import { useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function QuestionTypes() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const types = [
    {
      name: "MCQ",

      type: "mcq",

      free: true,
    },

    {
      name: "Assertion & Reason",

      type: "assertion",

      free: false,
    },

    {
      name: "Case Study",

      type: "case_study",

      free: false,
    },
  ];

  return (
    <div className="max-w-4xl mx-auto py-10">
      <h1 className="text-3xl font-bold mb-8">Choose Quiz Type</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {types.map((t) => {
          const locked = !t.free && user?.plan === "free";

          return (
            <div
              key={t.type}
              onClick={() => {
                if (locked) return navigate("/pricing");

                localStorage.setItem(
                  "quizType",

                  t.type,
                );

                navigate("/quiz");
              }}
              className="bg-white p-6 rounded-3xl shadow cursor-pointer hover:scale-105 transition"
            >
              <h2 className="text-xl font-bold mb-4">{t.name}</h2>

              <p className="text-gray-500">
                {locked ? "🔒 Pro Only" : "✅ Available"}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
