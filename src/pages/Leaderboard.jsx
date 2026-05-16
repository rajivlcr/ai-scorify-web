import { useEffect, useState } from "react";

import api from "../services/api";

import Loader from "../components/Loader";

export default function Leaderboard() {
  const [users, setUsers] = useState([]);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api
      .get("/leaderboard")

      .then((res) => {
        console.log("LEADERBOARD:", res.data);

        setUsers(res.data);

        setLoading(false);
      })

      .catch((err) => {
        console.log(err);

        setLoading(false);
      });
  }, []);

  // 🚀 LOADING
  if (loading) {
    return (
      <Loader title="Loading Leaderboard" subtitle="Fetching top students..." />
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      {/* 🚀 HEADER */}
      <div className="text-center mb-10">
        <h1 className="text-5xl font-bold text-purple-600">🏆 Leaderboard</h1>

        <p className="text-gray-500 mt-3">Top learners on AI Scorify</p>
      </div>

      {/* 🚀 EMPTY */}
      {users.length === 0 && (
        <div className="bg-white p-10 rounded-3xl shadow text-center">
          <p className="text-gray-500 text-lg">No leaderboard data yet</p>
        </div>
      )}

      {/* 🚀 USERS */}
      <div className="space-y-4">
        {users.map((u, i) => (
          <div
            key={i}
            className="bg-white rounded-3xl shadow p-5 flex items-center justify-between hover:shadow-xl transition"
          >
            <div className="flex items-center gap-5">
              {/* 🚀 RANK */}
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg

                  ${
                    i === 0
                      ? "bg-yellow-100 text-yellow-600"
                      : i === 1
                        ? "bg-gray-200 text-gray-700"
                        : i === 2
                          ? "bg-orange-100 text-orange-600"
                          : "bg-purple-100 text-purple-600"
                  }`}
              >
                #{i + 1}
              </div>

              {/* 🚀 USER */}
              <div>
                <h2 className="font-bold text-xl">{u.name}</h2>

                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-gray-500">
                    🔥 {u.streak} Day Streak
                  </p>

                  <span className="text-xs bg-purple-100 text-purple-600 px-2 py-1 rounded-full">
                    {u.plan?.toUpperCase()}
                  </span>
                </div>
              </div>
            </div>

            {/* 🚀 XP */}
            <div className="text-right">
              <p className="font-bold text-3xl text-purple-600">⚡ {u.xp}</p>

              <p className="text-sm text-gray-500">XP</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
