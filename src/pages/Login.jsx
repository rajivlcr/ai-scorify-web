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

  // 🚀 INPUT
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

      localStorage.setItem(
        "token",

        res.data.token,
      );

      localStorage.setItem(
        "user",

        JSON.stringify(res.data.user),
      );

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
      <Loader title="Signing You In" subtitle="Verifying your account..." />
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 via-white to-indigo-50 px-4 py-10 overflow-hidden relative">
      {/* 🚀 BG GLOW */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl"></div>

      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-300/30 rounded-full blur-3xl"></div>

      {/* 🚀 CARD */}
      <div className="relative z-10 w-full max-w-md bg-white/80 backdrop-blur-xl rounded-[40px] shadow-2xl border border-white/40 overflow-hidden">
        {/* 🚀 TOP */}
        <div className="bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-2xl"></div>

          <div className="relative z-10">
            <div className="w-20 h-20 rounded-[28px] bg-white/20 backdrop-blur-md flex items-center justify-center text-4xl mx-auto mb-5">
              🚀
            </div>

            <h1 className="text-4xl font-black">AI Scorify</h1>

            <p className="mt-3 text-white/90">
              Welcome back to AI-powered learning
            </p>
          </div>
        </div>

        {/* 🚀 FORM */}
        <div className="p-8">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-2xl mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            {/* 🚀 EMAIL */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full mt-3 p-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
              />
            </div>

            {/* 🚀 PASSWORD */}
            <div>
              <label className="text-sm font-semibold text-gray-600">
                Password
              </label>

              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full mt-3 p-5 rounded-2xl border border-gray-200 bg-gray-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-purple-200 transition"
              />
            </div>

            {/* 🚀 BUTTON */}
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:scale-[1.02] transition-all duration-300"
            >
              Sign In 🚀
            </button>
          </form>

          {/* 🚀 FOOTER */}
          <p className="text-center text-gray-500 mt-8">
            Don’t have an account?{" "}
            <Link
              to="/register"
              className="text-purple-600 font-bold hover:underline"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
