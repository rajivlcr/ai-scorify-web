import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import Subject from "./pages/Subject";
import Subjects from "./pages/Subjects";
import { useAuth } from "./context/AuthContext";

export default function App() {
  const { user } = useAuth();
  console.log("APP USER:", user); // 🔥 ADD THIS
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route
        path="/register"
        element={!user ? <Register /> : <Navigate to="/" />}
      />

      {/* PROTECTED */}
      <Route
        path="/"
        element={
          user ? (
            <Layout>
              <Home />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/subject/:name"
        element={
          user ? (
            <Layout>
              <Subject />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/quiz"
        element={
          user ? (
            <Layout>
              <Quiz />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/result"
        element={
          user ? (
            <Layout>
              <Result />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          user ? (
            <Layout>
              <Dashboard />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/profile"
        element={
          user ? (
            <Layout>
              <Profile />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
      <Route
        path="/subjects"
        element={
          user ? (
            <Layout>
              <Subjects />
            </Layout>
          ) : (
            <Navigate to="/login" />
          )
        }
      />
    </Routes>
  );
}
