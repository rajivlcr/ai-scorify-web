import { Link, useNavigate } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-4 z-50 relative">
      <div className="w-[90%] max-w-6xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-6 py-3 flex items-center justify-between">
        {/* 🚀 LOGO */}
        <div
          onClick={() => navigate(user ? "/dashboard" : "/")}
          className="cursor-pointer flex items-center gap-3"
        >
          <div className="w-10 h-10 rounded-full bg-purple-600 text-white flex items-center justify-center font-bold">
            AI
          </div>

          <div>
            <h1 className="font-bold text-purple-600 leading-none">
              AI Scorify
            </h1>

            <p className="text-[10px] text-gray-500">Smart Learning</p>
          </div>
        </div>

        {/* 🚀 NAVIGATION */}
        <div className="flex items-center gap-6 text-sm">
          {user && (
            <>
              <Link
                to="/dashboard"
                className="hover:text-purple-600 transition"
              >
                Dashboard
              </Link>

              <Link to="/subjects" className="hover:text-purple-600 transition">
                Start Quiz
              </Link>

              <Link to="/pricing" className="hover:text-purple-600 transition">
                Pricing
              </Link>
            </>
          )}
        </div>

        {/* 🚀 USER */}
        <div className="flex items-center gap-3">
          {user ? (
            <>
              <div className="w-10 h-10 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold">
                {user?.name?.[0] || "U"}
              </div>

              <button
                onClick={() => {
                  logout();

                  navigate("/login");
                }}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full text-sm transition"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm transition"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
