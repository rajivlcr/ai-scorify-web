import { useEffect, useState } from "react";

import { useParams, useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Subject() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);

  const [loading, setLoading] = useState(true);

  // 🚀 FETCH CHAPTERS
  useEffect(() => {
    localStorage.setItem("subject", name);

    api
      .get(`/syllabus/${name}`)

      .then((res) => {
        // ✅ FIXED
        setChapters(res.data.chapters || []);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, [name]);

  // 🚀 LOADING
  if (loading) {
    return (
      <div className="flex justify-center items-center h-[70vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-14 w-14 border-b-4 border-purple-600 mx-auto mb-4"></div>

          <p className="text-gray-600">Loading Chapters...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-8">
      {/* 🚀 HEADER */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-purple-600 capitalize">
          {name}
        </h1>

        <p className="text-gray-500 mt-2">
          Choose a chapter to start your AI quiz
        </p>
      </div>

      {/* 🚀 EMPTY */}
      {chapters.length === 0 && (
        <div className="bg-white p-8 rounded-3xl shadow text-center">
          <p className="text-gray-500">No chapters found</p>
        </div>
      )}

      {/* 🚀 CHAPTER GRID */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.isArray(chapters) &&
          chapters.map((chapter, i) => (
            <div
              key={chapter._id}
              onClick={() => {
                // 🚀 SAVE CHAPTER
                localStorage.setItem(
                  "chapter",

                  chapter.name,
                );

                // 🚀 RESET QUIZ TYPE
                localStorage.removeItem("quizType");

                // 🚀 GO TO TYPES
                navigate("/question-types");
              }}
              className="bg-white p-6 rounded-3xl shadow hover:shadow-xl hover:scale-[1.02] transition cursor-pointer border border-gray-100"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h2 className="text-lg font-bold text-gray-800">
                    {chapter.name}
                  </h2>

                  <p className="text-sm text-gray-500 mt-2">
                    {chapter.topics?.length || 0} topics available
                  </p>
                </div>

                <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 flex items-center justify-center font-bold">
                  {i + 1}
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <span className="text-purple-600 font-medium">
                  Start Learning
                </span>

                <span className="text-xl">→</span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
