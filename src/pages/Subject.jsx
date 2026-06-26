import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function Subject() {
  const navigate = useNavigate();

  const { user } = useAuth();

  const { className, subject } = useParams();

  const [chapters, setChapters] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get(`/syllabus/chapters/${className}/${subject}`)
      .then((res) => {
        setChapters(res.data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [className, subject]);

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
      {/* HERO */}
      <div className="relative overflow-hidden rounded-[35px] bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 p-8 text-white shadow-2xl mb-10">
        <div className="absolute -top-10 -right-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/20 px-4 py-2 rounded-full text-sm font-semibold mb-5">
            {!user
              ? "🎁 Free Guest Access"
              : user?.plan?.toLowerCase() === "pro"
                ? "🚀 Pro Access"
                : "🎓 Free Account"}
          </div>

          <h1 className="text-4xl md:text-5xl font-black capitalize">
            {subject}
          </h1>

          <p className="mt-4 text-lg text-white/90">
            {!user
              ? "Guest users get 1 free chapter. Register free to unlock up to 5 chapters."
              : user?.plan?.toLowerCase() === "pro"
                ? "Unlimited chapter access with MCQ and Assertion & Reason quizzes."
                : "You can access up to 5 chapters with unlimited MCQ practice."}
          </p>
        </div>
      </div>

      {chapters.length === 0 && (
        <div className="bg-white rounded-3xl shadow-xl p-10 text-center">
          <h2 className="text-3xl font-bold text-gray-700">
            No Chapters Found
          </h2>

          <p className="text-gray-500 mt-4">Please check your MongoDB data.</p>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {chapters.map((chapter, index) => {
          const isGuestLocked = !user && index > 0;

          return (
            <div
              key={index}
              onClick={() => {
                if (isGuestLocked) {
                  navigate("/register");
                  return;
                }

                navigate(
                  `/question-types?className=${className}&subject=${subject}&chapter=${encodeURIComponent(
                    chapter,
                  )}`,
                );
              }}
              className="group cursor-pointer bg-white rounded-[32px] p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100 relative overflow-hidden"
            >
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-100 rounded-full blur-3xl opacity-70"></div>

              <div className="relative z-10">
                <div className="mb-4">
                  {!user ? (
                    isGuestLocked ? (
                      <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-bold">
                        🔒 Register Required
                      </span>
                    ) : (
                      <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-bold">
                        FREE
                      </span>
                    )
                  ) : user?.plan?.toLowerCase() === "pro" ? (
                    <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-bold">
                      PRO
                    </span>
                  ) : (
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-bold">
                      FREE ACCOUNT
                    </span>
                  )}
                </div>

                <div className="w-16 h-16 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center text-3xl mb-6">
                  📖
                </div>

                <h2 className="text-2xl font-black text-gray-800 capitalize leading-snug">
                  {chapter}
                </h2>

                <p className="text-gray-500 mt-4 leading-relaxed">
                  {!user
                    ? isGuestLocked
                      ? "Register free to unlock up to 5 chapters."
                      : "Unlimited free MCQ practice."
                    : user?.plan?.toLowerCase() === "pro"
                      ? "Unlimited chapter access."
                      : "Available under your Free Account."}
                </p>

                <div className="mt-8 flex items-center justify-between">
                  <span className="text-purple-600 font-bold">
                    {!user
                      ? isGuestLocked
                        ? "Register to Unlock →"
                        : "Start Quiz →"
                      : "Start Quiz →"}
                  </span>

                  <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center text-xl group-hover:translate-x-1 transition">
                    →
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
