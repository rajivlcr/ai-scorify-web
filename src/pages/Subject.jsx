import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import api from "../services/api";

export default function Subject() {
  const { name } = useParams();

  const navigate = useNavigate();

  const [chapters, setChapters] = useState([]);

  useEffect(() => {
    if (!name) return;

    api
      .get(`/syllabus/${encodeURIComponent(name)}`)
      .then((res) => {
        setChapters(res.data?.chapters || []);
      })
      .catch(console.error);
  }, [name]);

  // ✅ NORMALIZE
  const normalize = (text) => text.toLowerCase().trim();

  return (
    <div className="space-y-8">
      {/* HEADER */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800 capitalize">{name}</h1>

        <p className="text-gray-500 mt-1">
          Select a chapter to generate an NCERT-grounded AI quiz
        </p>
      </div>

      {/* CHAPTER GRID */}
      <div className="grid md:grid-cols-2 gap-6">
        {chapters.map((ch, i) => (
          <div
            key={i}
            onClick={() => {
              // ✅ IMPORTANT
              localStorage.setItem("subject", normalize(name));

              // ✅ IMPORTANT
              localStorage.setItem("chapter", normalize(ch.name));

              navigate("/quiz");
            }}
            className="bg-white border border-gray-200 p-6 rounded-2xl cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-semibold text-purple-600 text-lg capitalize">
                {ch.name}
              </h2>

              <span className="text-xs bg-purple-100 text-purple-600 px-3 py-1 rounded-full">
                AI Quiz
              </span>
            </div>

            <p className="text-sm text-gray-500 mt-3">
              {ch.topics?.length || 0} Topics
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
