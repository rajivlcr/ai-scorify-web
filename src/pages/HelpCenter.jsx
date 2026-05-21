export default function HelpCenter() {
  const faqs = [
    {
      q: "How do I upgrade to PRO?",

      a: "Go to Pricing page and complete Razorpay payment.",
    },

    {
      q: "Why am I seeing quiz limits?",

      a: "Free users can access only 5 quizzes/day.",
    },

    {
      q: "How do I contact support?",

      a: "Use WhatsApp support from floating help button.",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <div className="bg-white rounded-[35px] shadow-2xl p-10">
        <h1 className="text-5xl font-black text-purple-600 mb-10">
          Help Center 💡
        </h1>

        <div className="space-y-6">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-gray-50 p-6 rounded-2xl">
              <h2 className="text-2xl font-bold text-gray-800">{faq.q}</h2>

              <p className="text-gray-600 mt-3 text-lg">{faq.a}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
