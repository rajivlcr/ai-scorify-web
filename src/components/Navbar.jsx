import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-4 z-50 relative">
      <div className="w-[95%] max-w-7xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-6 py-3 flex items-center justify-between">
        {/* 🚀 LOGO */}
        <div
          onClick={() => navigate("/dashboard")}
          className="flex items-center gap-3 cursor-pointer"
        >
          <img
            src={logo}
            alt="AI Scorify"
            className="h-14 w-auto object-contain"
          />
        </div>

        {/* 🚀 NAVIGATION */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link to="/dashboard" className="hover:text-purple-600 transition">
            Dashboard
          </Link>

          <Link to="/subjects" className="hover:text-purple-600 transition">
            Subjects
          </Link>

          <Link to="/leaderboard" className="hover:text-purple-600 transition">
            Leaderboard
          </Link>

          {/* 🚀 ONLY FREE USERS */}
          {user?.plan !== "pro" && (
            <Link to="/pricing" className="hover:text-purple-600 transition">
              Pricing
            </Link>
          )}
        </div>

        {/* 🚀 USER */}
        <div className="flex items-center gap-4">
          {/* 🚀 PLAN */}
          <div className="hidden md:block text-sm">
            <span className="bg-purple-100 text-purple-600 px-3 py-1 rounded-full font-medium">
              {user?.plan === "pro" ? "🚀 PRO" : "FREE"}
            </span>
          </div>

          {/* 🚀 AVATAR */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-indigo-500 text-white flex items-center justify-center font-bold shadow">
            {user?.name?.[0] || "U"}
          </div>

          {/* 🚀 LOGOUT */}
          <button
            onClick={() => {
              logout();

              navigate("/login");
            }}
            className="bg-gray-100 hover:bg-gray-200 px-4 py-2 rounded-xl text-sm font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
