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

function PrivateRoute({ children }) {
  const { user } = useAuth();

  return user ? children : <Navigate to="/login" />;
}

export default function App() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-indigo-50">
      {/* 🚀 NAVBAR */}
      {user && <Navbar />}

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

        {/* 🚀 CLASSES */}
        <Route
          path="/classes"
          element={
            <PrivateRoute>
              <Classes />
            </PrivateRoute>
          }
        />

        {/* 🚀 SUBJECTS */}
        <Route
          path="/subjects/:className"
          element={
            <PrivateRoute>
              <Subjects />
            </PrivateRoute>
          }
        />

        {/* 🚀 CHAPTERS */}
        <Route
          path="/subject/:className/:subject"
          element={
            <PrivateRoute>
              <Subject />
            </PrivateRoute>
          }
        />

        {/* 🚀 QUESTION TYPES */}
        <Route
          path="/question-types"
          element={
            <PrivateRoute>
              <QuestionTypes />
            </PrivateRoute>
          }
        />

        {/* 🚀 QUIZ */}
        <Route
          path="/quiz"
          element={
            <PrivateRoute>
              <Quiz />
            </PrivateRoute>
          }
        />

        {/* 🚀 RESULT */}
        <Route
          path="/result"
          element={
            <PrivateRoute>
              <Result />
            </PrivateRoute>
          }
        />

        {/* 🚀 PRICING */}
        <Route
          path="/pricing"
          element={
            <PrivateRoute>
              <Pricing />
            </PrivateRoute>
          }
        />

        {/* 🚀 LEADERBOARD */}
        <Route
          path="/leaderboard"
          element={
            <PrivateRoute>
              <Leaderboard />
            </PrivateRoute>
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

        {/* 🚀 REFUND */}
        <Route path="/refund-policy" element={<RefundPolicy />} />

        {/* 🚀 CANCELLATION */}
        <Route path="/cancellation-policy" element={<CancellationPolicy />} />

        {/* 🚀 DEFAULT */}
        <Route
          path="*"
          element={<Navigate to={user ? "/dashboard" : "/login"} />}
        />
      </Routes>

      {/* 🚀 FLOATING SUPPORT */}
      {user && <FloatingSupport />}

      {/* 🚀 FOOTER */}
      <Footer />
    </div>
  );
}
