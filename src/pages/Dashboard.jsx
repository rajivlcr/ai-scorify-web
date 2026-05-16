import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const userId = user.id || user.email;

    api
      .get(`/dashboard/${userId}`)

      .then((res) => setData(res.data))

      .catch(console.error);
  }, [user]);

  // 🚀 STATS
  const totalAttempts = data.length;

  const totalScore = data.reduce(
    (acc, d) => acc + d.score,

    0,
  );

  const totalQuestions = data.reduce(
    (acc, d) => acc + d.total,

    0,
  );

  const accuracy = totalQuestions
    ? Math.round((totalScore / totalQuestions) * 100)
    : 0;

  return (
    <div className="space-y-6 max-w-6xl mx-auto py-6">
      {/* 🚀 HERO */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-5 rounded-3xl shadow-lg flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Welcome back, {user?.name}
            👋
          </h1>

          <p className="text-sm opacity-90 mt-1">
            Continue your AI-powered CBSE learning journey
          </p>
        </div>

        <button
          onClick={() => navigate("/subjects")}
          className="bg-white text-purple-600 px-5 py-3 rounded-2xl font-bold hover:scale-105 transition"
        >
          Start Quiz 🚀
        </button>
      </div>

      {/* 🚀 STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-sm text-gray-500">Total Attempts</p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalAttempts}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-sm text-gray-500">Total Score</p>

          <p className="text-3xl font-bold text-purple-600 mt-2">
            {totalScore}
          </p>
        </div>

        <div className="bg-white p-5 rounded-3xl shadow">
          <p className="text-sm text-gray-500">Accuracy</p>

          <p className="text-3xl font-bold text-green-500 mt-2">{accuracy}%</p>
        </div>
      </div>

      {/* 🚀 RECENT ACTIVITY */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold">📊 Recent Activity</h2>
        </div>

        {data.length === 0 && (
          <div className="bg-white p-8 rounded-3xl shadow text-center">
            <p className="text-gray-500">No quiz attempts yet</p>
          </div>
        )}

        <div className="space-y-4">
          {data.map((d, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-3xl shadow hover:shadow-xl transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-purple-600 capitalize">
                    {d.subject}
                  </p>

                  <p className="text-sm text-gray-500">{d.chapter}</p>
                </div>

                <p className="text-lg font-bold">
                  {d.score}/{d.total}
                </p>
              </div>

              {/* 🚀 PROGRESS */}
              <div className="mt-4">
                <div className="w-full bg-gray-200 h-3 rounded-full">
                  <div
                    className="bg-purple-600 h-3 rounded-full"
                    style={{
                      width: `${(d.score / d.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-3">
                {new Date(d.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
