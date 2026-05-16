import { useEffect, useState } from "react";

import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate("/login");

      return;
    }

    const userId = user.id || user.email;

    api
      .get(`/dashboard/${userId}`)

      .then((res) => setData(res.data))

      .catch(console.error);
  }, [user]);

  // 📊 STATS
  const totalAttempts = data.length;

  const totalScore = data.reduce((acc, d) => acc + d.score, 0);

  const totalQuestions = data.reduce((acc, d) => acc + d.total, 0);

  const accuracy = totalQuestions
    ? Math.round((totalScore / totalQuestions) * 100)
    : 0;

  return (
    <div className="space-y-6">
      {/* 🔥 HEADER */}
      <div className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white p-6 rounded-2xl shadow">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold">Welcome back 👋</h1>

            <p className="text-sm opacity-90 mt-1">
              Track your learning and improve daily
            </p>
          </div>

          {/* 🚀 LOGOUT */}
          <button
            onClick={() => {
              logout();

              navigate("/login");
            }}
            className="bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* ⭐ PLAN */}
      <div className="bg-white p-5 rounded-2xl shadow">
        {user?.plan === "pro" ? (
          <div className="bg-yellow-100 text-yellow-800 px-4 py-3 rounded-xl inline-block font-semibold">
            PRO MEMBER ⭐
          </div>
        ) : (
          <div className="bg-gray-100 px-4 py-3 rounded-xl inline-block">
            Free Plan • {3 - (user?.quizCountToday || 0)} quizzes left today
          </div>
        )}
      </div>

      {/* 📊 STATS */}
      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Attempts</p>

          <p className="text-2xl font-bold text-purple-600">{totalAttempts}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Total Score</p>

          <p className="text-2xl font-bold text-purple-600">{totalScore}</p>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow">
          <p className="text-sm text-gray-500">Accuracy</p>

          <p className="text-2xl font-bold text-green-500">{accuracy}%</p>
        </div>
      </div>

      {/* 📈 ACTIVITY */}
      <div>
        <h2 className="text-lg font-bold mb-3">📊 Recent Activity</h2>

        {data.length === 0 && (
          <p className="text-gray-500">No quiz attempts yet</p>
        )}

        <div className="space-y-4">
          {data.map((d, i) => (
            <div
              key={i}
              className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
            >
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-purple-600">{d.subject}</p>

                  <p className="text-sm text-gray-500">{d.chapter}</p>
                </div>

                <p className="text-sm font-medium">
                  {d.score}/{d.total}
                </p>
              </div>

              {/* 📊 PROGRESS */}
              <div className="mt-3">
                <div className="w-full bg-gray-200 h-2 rounded">
                  <div
                    className="bg-purple-600 h-2 rounded"
                    style={{
                      width: `${(d.score / d.total) * 100}%`,
                    }}
                  />
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-2">
                {new Date(d.createdAt).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
