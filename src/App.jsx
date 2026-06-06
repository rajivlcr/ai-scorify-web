import { Routes, Route, Navigate } from "react-router-dom";

import Navbar from "./components/Navbar";
import FloatingSupport from "./components/FloatingSupport";
import Footer from "./components/Footer";

// 🚀 PAGES
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Classes from "./pages/Classes";
import Subjects from "./pages/Subjects";
import Subject from "./pages/Subject";
import QuestionTypes from "./pages/QuestionTypes";
import Quiz from "./pages/Quiz";
import Result from "./pages/Result";
import Pricing from "./pages/Pricing";
import Leaderboard from "./pages/Leaderboard";
import Admin from "./pages/Admin";

// 🚀 SUPPORT PAGES
import Contact from "./pages/Contact";
import Feedback from "./pages/Feedback";
import ReportBug from "./pages/ReportBug";
import HelpCenter from "./pages/HelpCenter";

// 🚀 POLICY PAGES
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import RefundPolicy from "./pages/RefundPolicy";
import CancellationPolicy from "./pages/CancellationPolicy";

// 🚀 AUTH
import { useAuth } from "./context/AuthContext";

// 🚀 PRIVATE ROUTE
function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

// 🚀 ADMIN ROUTE
function AdminRoute({ children }) {
  const { user } = useAuth();

  if (user === null) {
    return null;
  }

  if (user?.role === "admin") {
    return children;
  }

  return <Navigate to="/dashboard" />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* 🚀 NAVBAR */}
      <Navbar />

      {/* 🚀 ROUTES */}
      <Routes>
        {/* 🚀 LOGIN */}
        <Route path="/login" element={<Login />} />

        {/* 🚀 REGISTER */}
        <Route path="/register" element={<Register />} />

        {/* 🚀 DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* 🚀 GUEST ACCESS */}
        <Route path="/classes" element={<Classes />} />

        <Route path="/subjects/:className" element={<Subjects />} />

        <Route path="/subject/:className/:subject" element={<Subject />} />

        <Route path="/question-types" element={<QuestionTypes />} />

        <Route path="/quiz" element={<Quiz />} />

        {/* 🚀 RESULT (PUBLIC FOR GUESTS) */}
        <Route path="/result" element={<Result />} />

        {/* 🚀 PRICING (PUBLIC) */}
        <Route path="/pricing" element={<Pricing />} />

        {/* 🚀 LEADERBOARD */}
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
          }
        />

        {/* 🚀 ADMIN */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <Admin />
            </AdminRoute>
          }
        />

        {/* 🚀 CONTACT */}
        <Route
          path="/contact"
          element={
            <PrivateRoute>
              <Contact />
            </PrivateRoute>
          }
        />

        {/* 🚀 FEEDBACK */}
        <Route
          path="/feedback"
          element={
            <PrivateRoute>
              <Feedback />
            </PrivateRoute>
          }
        />

        {/* 🚀 BUG REPORT */}
        <Route
          path="/report-bug"
          element={
            <PrivateRoute>
              <ReportBug />
            </PrivateRoute>
          }
        />

        {/* 🚀 HELP CENTER */}
        <Route
          path="/help-center"
          element={
            <PrivateRoute>
              <HelpCenter />
            </PrivateRoute>
          }
        />

        {/* 🚀 PRIVACY POLICY */}
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />

        {/* 🚀 TERMS */}
        <Route path="/terms" element={<Terms />} />

        {/* 🚀 REFUND POLICY */}
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* 🚀 CANCELLATION POLICY */}
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />

        {/* 🚀 DEFAULT */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/classes"} />}
        />
      </Routes>

      {/* 🚀 SUPPORT ONLY FOR LOGGED USERS */}
      {user && <FloatingSupport />}

      {/* 🚀 FOOTER */}
      <Footer />
    </div>
  );
}
