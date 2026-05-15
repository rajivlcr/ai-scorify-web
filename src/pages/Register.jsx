import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const register = async () => {
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Registered successfully!");
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-purple-50">
      <div className="bg-white p-6 rounded-2xl shadow w-80">
        <h2 className="text-xl font-bold mb-4 text-center">Register</h2>

        <input
          placeholder="Name"
          className="input"
          onChange={(e) => setName(e.target.value)}
        />
        <input
          placeholder="Email"
          className="input mt-2"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="input mt-2"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={register} className="btn mt-4">
          Register
        </button>
      </div>
    </div>
  );
}
