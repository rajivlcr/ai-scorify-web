import { motion } from "framer-motion";

export default function Loader({
  title = "AI is thinking...",

  subtitle = "Generating your quiz",
}) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="bg-white shadow-2xl rounded-3xl p-10 text-center max-w-md w-full border border-gray-100">
        {/* 🚀 ANIMATED RING */}
        <div className="relative w-24 h-24 mx-auto mb-6">
          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              repeat: Infinity,

              duration: 1.5,

              ease: "linear",
            }}
            className="absolute inset-0 rounded-full border-4 border-purple-200 border-t-purple-600"
          />

          <div className="absolute inset-3 rounded-full bg-purple-50 flex items-center justify-center text-3xl">
            🤖
          </div>
        </div>

        {/* 🚀 TEXT */}
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>

        <p className="text-gray-500 mt-2">{subtitle}</p>

        {/* 🚀 DOTS */}
        <div className="flex justify-center gap-2 mt-6">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                repeat: Infinity,

                duration: 0.8,

                delay: i * 0.2,
              }}
              className="w-3 h-3 rounded-full bg-purple-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
