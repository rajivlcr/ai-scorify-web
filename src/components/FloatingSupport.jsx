import { useState } from "react";

import { MessageCircle, X, Bug, Mail, HelpCircle, Star } from "lucide-react";

import { useNavigate } from "react-router-dom";

export default function FloatingSupport() {
  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* 🚀 MENU */}
      {open && (
        <div className="mb-4 space-y-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
          {/* 🚀 WHATSAPP */}
          <a
            href="https://wa.me/919344082314?text=Hi%20AI%20Scorify,%20I%20need%20help"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-4 bg-green-500 hover:bg-green-600 text-white px-5 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            <MessageCircle size={22} />

            <span className="font-bold">WhatsApp Support</span>
          </a>

          {/* 🚀 BUG */}
          <button
            onClick={() => navigate("/report-bug")}
            className="w-full flex items-center gap-4 bg-red-500 hover:bg-red-600 text-white px-5 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            <Bug size={22} />

            <span className="font-bold">Report Bug</span>
          </button>

          {/* 🚀 FEEDBACK */}
          <button
            onClick={() => navigate("/feedback")}
            className="w-full flex items-center gap-4 bg-yellow-500 hover:bg-yellow-600 text-white px-5 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            <Star size={22} />

            <span className="font-bold">Feedback</span>
          </button>

          {/* 🚀 CONTACT */}
          <button
            onClick={() => navigate("/contact")}
            className="w-full flex items-center gap-4 bg-blue-500 hover:bg-blue-600 text-white px-5 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            <Mail size={22} />

            <span className="font-bold">Contact Us</span>
          </button>

          {/* 🚀 HELP */}
          <button
            onClick={() => navigate("/help-center")}
            className="w-full flex items-center gap-4 bg-purple-600 hover:bg-purple-700 text-white px-5 py-4 rounded-2xl shadow-2xl transition-all hover:scale-105"
          >
            <HelpCircle size={22} />

            <span className="font-bold">Help Center</span>
          </button>
        </div>
      )}

      {/* 🚀 FLOAT BUTTON */}
      <button
        onClick={() => setOpen(!open)}
        className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-2xl flex items-center justify-center hover:scale-110 transition-all duration-300"
      >
        {open ? <X size={28} /> : <MessageCircle size={28} />}
      </button>
    </div>
  );
}
