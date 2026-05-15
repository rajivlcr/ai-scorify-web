import { useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();
  const [data, setData] = useState([]);

  useEffect(() => {
    if (!user) return;

    const userId = user.id || user.email;

    api
      .get(`/dashboard/${userId}`)
      .then((res) => setData(res.data))
      .catch(console.error);
  }, [user]);

  // 📊 Calculate stats
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
        <h1 className="text-xl font-bold">Welcome back 👋</h1>
        <p className="text-sm opacity-90 mt-1">
          Track your learning and improve daily
        </p>
      </div>

      {/* 📊 STATS CARDS */}
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

      {/* 📈 RECENT ACTIVITY */}
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

              {/* 📊 Progress bar */}
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
