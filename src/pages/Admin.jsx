import { useEffect, useState } from "react";

import api from "../services/api";

export default function Admin() {
  const [stats, setStats] = useState({});

  const [users, setUsers] = useState([]);

  // 🚀 LOAD
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await api.get("/admin/stats");

      const usersRes = await api.get("/admin/users");

      setStats(statsRes.data);

      setUsers(usersRes.data);
    } catch (err) {
      console.log(err);
    }
  };

  // 🚀 UPDATE PLAN
  const updatePlan = async (id, plan) => {
    try {
      await api.put(
        `/admin/user/${id}/plan`,

        { plan },
      );

      fetchData();
    } catch (err) {
      console.log(err);

      alert("Update failed");
    }
  };

  // 🚀 DELETE USER
  const deleteUser = async (id) => {
    const confirmDelete = window.confirm("Delete this user?");

    if (!confirmDelete) return;

    try {
      await api.delete(`/admin/user/${id}`);

      fetchData();
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.msg || "Delete failed");
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* 🚀 TITLE */}
      <h1 className="text-5xl font-black text-purple-600 mb-10">
        Admin Dashboard 🚀
      </h1>

      {/* 🚀 STATS */}
      <div className="grid md:grid-cols-4 gap-6 mb-10">
        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Total Users</h3>

          <p className="text-4xl font-black mt-3">{stats.totalUsers || 0}</p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Pro Users</h3>

          <p className="text-4xl font-black mt-3 text-purple-600">
            {stats.proUsers || 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Total Quizzes</h3>

          <p className="text-4xl font-black mt-3 text-indigo-600">
            {stats.totalQuizzes || 0}
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-lg p-6">
          <h3 className="text-gray-500">Revenue</h3>

          <p className="text-4xl font-black mt-3 text-green-600">
            ₹{stats.totalRevenue || 0}
          </p>
        </div>
      </div>

      {/* 🚀 USERS */}
      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-bold">Users</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left p-4">Name</th>

                <th className="text-left p-4">Email</th>

                <th className="text-left p-4">Role</th>

                <th className="text-left p-4">Plan</th>

                <th className="text-left p-4">XP</th>

                <th className="text-left p-4">Streak</th>

                <th className="text-left p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-t hover:bg-gray-50">
                  {/* 🚀 NAME */}
                  <td className="p-4 font-semibold">{user.name}</td>

                  {/* 🚀 EMAIL */}
                  <td className="p-4">{user.email}</td>

                  {/* 🚀 ROLE */}
                  <td className="p-4">
                    <span
                      className={`

                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-bold

                        ${
                          user.role === "admin"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {user.role}
                    </span>
                  </td>

                  {/* 🚀 PLAN */}
                  <td className="p-4">
                    <span
                      className={`

                        px-3
                        py-1
                        rounded-full
                        text-sm
                        font-bold

                        ${
                          user.plan === "pro"
                            ? "bg-purple-100 text-purple-600"
                            : "bg-gray-100 text-gray-600"
                        }
                      `}
                    >
                      {user.plan}
                    </span>
                  </td>

                  {/* 🚀 XP */}
                  <td className="p-4">{user.xp || 0}</td>

                  {/* 🚀 STREAK */}
                  <td className="p-4">🔥 {user.streak || 0}</td>

                  {/* 🚀 ACTIONS */}
                  <td className="p-4 flex flex-wrap gap-3">
                    {/* 🚀 MAKE PRO */}
                    <button
                      onClick={() => updatePlan(user._id, "pro")}
                      className="bg-purple-600 text-white px-4 py-2 rounded-xl text-sm font-bold hover:opacity-90"
                    >
                      Make Pro
                    </button>

                    {/* 🚀 MAKE FREE */}
                    <button
                      onClick={() => updatePlan(user._id, "free")}
                      className="bg-gray-200 px-4 py-2 rounded-xl text-sm font-bold hover:bg-gray-300"
                    >
                      Make Free
                    </button>

                    {/* 🚀 DELETE */}
                    {user.role !== "admin" && (
                      <button
                        onClick={() => deleteUser(user._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-xl text-sm font-bold hover:bg-red-600"
                      >
                        Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
