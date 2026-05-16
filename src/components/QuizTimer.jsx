export default function QuizTimer({ timeLeft }) {
  const minutes = Math.floor(timeLeft / 60);

  const seconds = timeLeft % 60;

  const formatted = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;

  const danger = timeLeft <= 60;

  return (
    <div
      className={`

        px-5 py-3 rounded-2xl font-bold text-lg shadow

        ${danger ? "bg-red-100 text-red-600" : "bg-purple-100 text-purple-600"}
      `}
    >
      ⏱ {formatted}
    </div>
  );
}
