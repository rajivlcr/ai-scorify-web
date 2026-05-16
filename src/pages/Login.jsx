import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import Loader from "../components/Loader";

export default function Login() {
  const navigate = useNavigate();

  const { login } = useAuth();

  const [form, setForm] = useState({
    email: "",

    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  // 🚀 HANDLE INPUT
  const handleChange = (e) => {
    setForm({
      ...form,

      [e.target.name]: e.target.value,
    });
  };

  // 🚀 LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    setError("");

    try {
      const res = await api.post(
        "/auth/login",

        form,
      );

      // 🚀 SAVE TOKEN
      localStorage.setItem(
        "token",

        res.data.token,
      );

      // 🚀 SAVE USER
      localStorage.setItem(
        "user",

        JSON.stringify(res.data.user),
      );

      // 🚀 AUTH CONTEXT
      login(res.data.user);

      setLoading(false);

      navigate("/dashboard");
    } catch (err) {
      console.log(err);

      setLoading(false);

      setError(err?.response?.data?.msg || "Login failed");
    }
  };

  // 🚀 LOADER
  if (loading) {
    return (
      <Loader
        title="Signing You In"
        subtitle="Please wait while we verify your account"
      />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white shadow-2xl rounded-3xl p-8 w-full max-w-md">
        {/* 🚀 HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-purple-600">AI Scorify</h1>

          <p className="text-gray-500 mt-2">Welcome back 👋</p>
        </div>

        {/* 🚀 ERROR */}
        {error && (
          <div className="bg-red-100 text-red-600 p-3 rounded-xl mb-4 text-sm">
            {error}
          </div>
        )}

        {/* 🚀 FORM */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="text-sm font-medium text-gray-600">Email</label>

            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-600">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              required
              className="w-full mt-2 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-purple-600 hover:bg-purple-700 text-white py-4 rounded-2xl font-bold transition"
          >
            Login
          </button>
        </form>

        {/* 🚀 FOOTER */}
        <p className="text-center text-gray-500 mt-6">
          Don’t have an account?{" "}
          <Link to="/register" className="text-purple-600 font-medium">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
