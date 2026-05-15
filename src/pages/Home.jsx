import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Home() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <div className="space-y-10">
      {/* HEADER */}
      <div>
        <h1 className="text-2xl font-bold">
          Welcome back {user?.name || "Student"} 👋
        </h1>
        <p className="text-gray-500">Continue learning with AI Scorify</p>
      </div>

      {/* CTA */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold">Start a new quiz</h2>
          <p className="text-gray-500 text-sm">
            Practice and improve your score
          </p>
        </div>

        <button
          onClick={() => navigate("/subjects")}
          className="bg-purple-600 px-5 py-2 rounded-lg text-white hover:bg-purple-700"
        >
          Start 🚀
        </button>
      </div>
    </div>
  );
}
