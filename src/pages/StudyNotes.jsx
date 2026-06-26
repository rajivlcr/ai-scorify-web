import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

export default function StudyNotes() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [className, setClassName] = useState("class10");
  const [subject, setSubject] = useState("");
  const [chapter, setChapter] = useState("");

  const [chapters, setChapters] = useState([]);

  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState(null);

  useEffect(() => {
    if (!subject) return;

    fetchChapters();
  }, [className, subject]);

  const fetchChapters = async () => {
    try {
      const res = await api.get(`/syllabus/chapters/${className}/${subject}`);

      setChapters(res.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  const generateNotes = async () => {
    if (!className || !subject || !chapter) {
      alert("Please select Class, Subject and Chapter");
      return;
    }

    try {
      setLoading(true);

      const res = await api.post("/study-notes", {
        className,
        subject,
        chapter,
      });

      setNotes(res.data);
    } catch (err) {
      console.log(err);

      alert(err?.response?.data?.msg || "Failed to generate notes");

      if (err?.response?.status === 403) {
        navigate("/pricing");
      }
    } finally {
      setLoading(false);
    }
  };

  if (user?.plan?.toLowerCase() !== "pro") {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="bg-white rounded-3xl p-10 shadow-xl text-center max-w-lg">
          <h1 className="text-4xl font-black text-purple-600">
            📚 AI Study Notes
          </h1>

          <p className="text-gray-500 mt-4">Available only for Pro users.</p>

          <button
            onClick={() => navigate("/pricing")}
            className="mt-6 bg-purple-600 text-white px-8 py-3 rounded-2xl font-bold"
          >
            Upgrade to Pro
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen max-w-5xl mx-auto px-4 py-10">
      <div className="bg-white rounded-3xl shadow-xl p-8">
        <h1 className="text-4xl font-black text-purple-600 mb-8">
          📚 AI Study Notes
        </h1>

        <div className="grid md:grid-cols-3 gap-4">
          <select
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            className="border p-4 rounded-2xl"
          >
            <option value="class8">Class 8</option>
            <option value="class10">Class 10</option>
          </select>

          <select
            value={subject}
            onChange={(e) => {
              setSubject(e.target.value);
              setChapter("");
              setNotes(null);
            }}
            className="border p-4 rounded-2xl"
          >
            <option value="">Select Subject</option>
            <option value="science">Science</option>
            <option value="maths">Maths</option>
          </select>

          <select
            value={chapter}
            onChange={(e) => {
              setChapter(e.target.value);
              setNotes(null);
            }}
            className="border p-4 rounded-2xl"
          >
            <option value="">Select Chapter</option>

            {chapters.map((item, index) => (
              <option key={index} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={generateNotes}
          disabled={loading}
          className="mt-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-bold"
        >
          {loading ? "Generating..." : "Generate Notes"}
        </button>
      </div>

      {notes && (
        <>
          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-3xl font-black text-gray-800">
              {notes.chapter}
            </h2>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-black mb-4">📖 Chapter Summary</h2>

            <p className="text-gray-700 leading-relaxed">{notes.summary}</p>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-black mb-5">🎯 Key Points</h2>

            <ul className="space-y-3">
              {notes.keyPoints?.map((item, index) => (
                <li key={index} className="bg-purple-50 rounded-2xl p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-black mb-5">🧠 Important Terms</h2>

            <div className="flex flex-wrap gap-3">
              {notes.importantTerms?.map((item, index) => (
                <span
                  key={index}
                  className="bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full font-semibold"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
            <h2 className="text-2xl font-black mb-5">📝 Exam Tips</h2>

            <ul className="space-y-3">
              {notes.examTips?.map((item, index) => (
                <li key={index} className="bg-green-50 rounded-2xl p-4">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}
