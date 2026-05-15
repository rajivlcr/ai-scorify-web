import { useNavigate } from "react-router-dom";

export default function Subjects() {
  const navigate = useNavigate();

  const subjects = [
    { name: "Science", icon: "🔬" },
    { name: "Mathematics", icon: "📐" },
    { name: "Social Science", icon: "🌍" },
    { name: "English", icon: "📖" },
  ];

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Choose Subject</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {subjects.map((subject, i) => (
          <div
            key={i}
            onClick={() => navigate(`/subject/${subject.name}`)}
            className="bg-white border border-gray-200 p-6 rounded-2xl cursor-pointer hover:shadow-lg transition"
          >
            <div className="text-3xl">{subject.icon}</div>

            <h2 className="mt-4 text-lg font-semibold text-purple-600">
              {subject.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}
