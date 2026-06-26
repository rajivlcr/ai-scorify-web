import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";

export default function Navbar() {
  const { user, logout } = useAuth();

  const navigate = useNavigate();

  return (
    <div className="sticky top-4 z-50 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="relative overflow-hidden bg-white/70 backdrop-blur-2xl border border-white/40 shadow-xl rounded-[28px] px-6 py-4">
          {/* GLOW */}
          <div className="absolute -top-10 right-0 w-40 h-40 bg-purple-300/20 rounded-full blur-3xl"></div>

          <div className="relative z-10 flex items-center justify-between">
            {/* LOGO */}
            <div
              onClick={() => navigate(user ? "/dashboard" : "/classes")}
              className="flex items-center gap-3 cursor-pointer"
            >
              <img
                src={logo}
                alt="AI Scorify"
                className="h-12 object-contain"
              />
            </div>

            <div className="hidden md:flex items-center gap-3">
              {/* GUESTS ONLY */}
              {!user && (
                <Link
                  to="/classes"
                  className="px-5 py-3 rounded-2xl font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition"
                >
                  Free MCQ Quiz
                </Link>
              )}

              {user && (
                <>
                  <Link
                    to="/dashboard"
                    className="px-5 py-3 rounded-2xl font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition"
                  >
                    Dashboard
                  </Link>

                  <Link
                    to="/leaderboard"
                    className="px-5 py-3 rounded-2xl font-medium text-gray-700 hover:bg-purple-100 hover:text-purple-600 transition"
                  >
                    Leaderboard
                  </Link>

                  {/* ADMIN */}
                  {user?.role === "admin" && (
                    <>
                      <Link
                        to="/admin"
                        className="px-5 py-3 rounded-2xl font-medium text-red-600 hover:bg-red-100 transition"
                      >
                        Admin
                      </Link>

                      <Link
                        to="/admin-question-bank"
                        className="px-5 py-3 rounded-2xl font-medium text-indigo-600 hover:bg-indigo-100 transition"
                      >
                        Question Bank
                      </Link>
                    </>
                  )}
                </>
              )}
            </div>

            {/* RIGHT */}
            <div className="flex items-center gap-3">
              {!user ? (
                <>
                  <Link
                    to="/login"
                    className="px-5 py-3 rounded-2xl font-medium bg-gray-100 hover:bg-gray-200 transition"
                  >
                    Login
                  </Link>

                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                  >
                    Register Free
                  </Link>
                </>
              ) : (
                <>
                  {/* PLAN */}
                  <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-4 py-2 rounded-2xl text-sm font-bold shadow-lg">
                    🚀 {user?.plan?.toLowerCase() === "pro" ? "PRO" : "FREE"}
                  </div>

                  {/* UPGRADE */}
                  {user?.plan?.toLowerCase() !== "pro" && (
                    <Link
                      to="/pricing"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-5 py-3 rounded-2xl font-semibold shadow-lg hover:scale-105 transition"
                    >
                      Upgrade
                    </Link>
                  )}

                  {/* AVATAR */}
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white flex items-center justify-center font-black shadow-lg">
                    {user?.name?.[0]}
                  </div>

                  {/* LOGOUT */}
                  <button
                    onClick={() => {
                      logout();
                      navigate("/classes");
                    }}
                    className="bg-gray-100 hover:bg-red-50 hover:text-red-500 px-5 py-3 rounded-2xl font-medium transition"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
