import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";

import Login from "./pages/Login";

import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import Leaderboard from "./pages/Leaderboard";

import Subjects from "./pages/Subjects";

import Subject from "./pages/Subject";

import Quiz from "./pages/Quiz";

import Result from "./pages/Result";
import QuestionTypes from "./pages/QuestionTypes";

import Pricing from "./pages/Pricing";

import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-100">
      {/* 🚀 GLOBAL NAVBAR */}
      <Navbar />

      {/* 🚀 PAGE CONTENT */}
      <div className="max-w-7xl mx-auto p-4">
        <Routes>
          {/* 🚀 AUTO REDIRECT */}
          <Route
            path="/"
            element={
              user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />
            }
          />

          {/* 🔓 AUTH */}
          <Route
            path="/login"
            element={user ? <Navigate to="/dashboard" /> : <Login />}
          />

          <Route
            path="/register"
            element={user ? <Navigate to="/dashboard" /> : <Register />}
          />

          {/* 🔐 PROTECTED */}
          <Route
            path="/dashboard"
            element={user ? <Dashboard /> : <Navigate to="/login" />}
          />

          <Route
            path="/subjects"
            element={user ? <Subjects /> : <Navigate to="/login" />}
          />

          <Route
            path="/subject/:name"
            element={user ? <Subject /> : <Navigate to="/login" />}
          />

          <Route
            path="/quiz"
            element={user ? <Quiz /> : <Navigate to="/login" />}
          />

          <Route
            path="/result"
            element={user ? <Result /> : <Navigate to="/login" />}
          />

          <Route path="/pricing" element={<Pricing />} />

          <Route
            path="/question-types"
            element={user ? <QuestionTypes /> : <Navigate to="/login" />}
          />
          <Route
            path="/leaderboard"
            element={user ? <Leaderboard /> : <Navigate to="/login" />}
          />
        </Routes>
      </div>
    </div>
  );
}
