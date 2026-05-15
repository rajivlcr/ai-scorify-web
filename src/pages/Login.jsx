import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const { login, user } = useAuth();

  // 🔥 Redirect when user becomes available
  useEffect(() => {
    if (user) {
      navigate("/", { replace: true });
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const res = await api.post("/auth/login", { email, password });
      console.log("API RESPONSE:", res.data); // 🔥 ADD THIS
      // Update context (this triggers the useEffect above)
      login(res.data.user, res.data.token);
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-purple-50">
      <div className="bg-white p-6 rounded-2xl shadow-lg w-80">
        <h2 className="text-xl font-bold text-center mb-4">Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-2 rounded mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="w-full bg-purple-600 text-white py-2 rounded-lg"
        >
          Login
        </button>

        <p className="text-sm text-center mt-3">
          New user?{" "}
          <Link to="/register" className="text-purple-600">
            Register
          </Link>
        </p>
      </div>
    </div>
  );
}
