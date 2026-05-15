import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="flex justify-center mt-4 z-50 relative">
      <div className="w-[90%] max-w-6xl bg-white/90 backdrop-blur-md border border-gray-200 shadow-sm rounded-full px-6 py-3 flex items-center justify-between">
        {/* LOGO */}
        <div
          onClick={() => navigate("/")}
          className="cursor-pointer font-semibold"
        >
          AI Scorify
        </div>

        {/* NAV */}
        <div className="flex items-center gap-8 text-sm">
          <Link to="/" className="hover:text-purple-600">
            Home
          </Link>

          <Link to="/dashboard" className="hover:text-purple-600">
            Dashboard
          </Link>
        </div>

        {/* USER */}
        <div>{user?.name?.[0] || "U"}</div>
      </div>
    </div>
  );
}
