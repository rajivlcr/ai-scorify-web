import { useNavigate } from "react-router-dom";

import api from "../services/api";

import { useAuth } from "../context/AuthContext";

export default function Pricing() {
  const navigate = useNavigate();

  const { user, setUser } = useAuth();

  // 🚀 PAYMENT
  const handlePayment = async () => {
    try {
      // 🚀 CREATE ORDER
      const { data } = await api.post("/payment/create-order");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: data.amount,

        currency: data.currency,

        name: "AI Scorify",

        description: "Pro Plan Subscription",

        order_id: data.id,

        // 🚀 SUCCESS
        handler: async (response) => {
          try {
            // 🚀 VERIFY
            const res = await api.post(
              "/payment/verify",

              {
                userId: user._id || user.id,

                razorpay_order_id: response.razorpay_order_id,

                razorpay_payment_id: response.razorpay_payment_id,

                razorpay_signature: response.razorpay_signature,
              },
            );

            // 🚀 SUCCESS
            if (res.data.success) {
              const updatedUser = res.data.user;

              // 🚀 SAVE USER
              localStorage.setItem(
                "user",

                JSON.stringify(updatedUser),
              );

              // 🚀 UPDATE CONTEXT
              setUser(updatedUser);

              alert("Payment Successful 🚀");

              navigate("/dashboard");
            }
          } catch (err) {
            console.log(err);

            alert("Payment verification failed");
          }
        },

        prefill: {
          name: user?.name,

          email: user?.email,
        },

        theme: {
          color: "#7c3aed",
        },
      };

      // 🚀 OPEN RAZORPAY
      const razorpay = new window.Razorpay(options);

      razorpay.open();
    } catch (err) {
      console.log(err);

      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4">
      {/* 🚀 HEADER */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-black bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
          Upgrade to PRO 🚀
        </h1>

        <p className="text-gray-500 mt-4 text-lg">
          Unlock unlimited AI-powered CBSE quizzes
        </p>
      </div>

      {/* 🚀 PLANS */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* 🚀 FREE */}
        <div className="bg-white rounded-[35px] shadow-lg p-8 border border-gray-100">
          <h2 className="text-3xl font-black text-gray-800">Free Plan</h2>

          <p className="text-gray-500 mt-2">Perfect for trying AI Scorify</p>

          <div className="mt-8">
            <span className="text-5xl font-black">₹0</span>

            <span className="text-gray-500">/month</span>
          </div>

          <ul className="mt-8 space-y-4 text-gray-600">
            <li>✅ 5 quizzes per day</li>

            <li>✅ MCQ only</li>

            <li>✅ Dashboard access</li>

            <li>❌ Assertion & Reason</li>

            <li>❌ Case Study</li>
          </ul>

          <button
            disabled
            className="w-full mt-10 bg-gray-200 text-gray-500 py-4 rounded-2xl font-bold cursor-not-allowed"
          >
            Current Plan
          </button>
        </div>

        {/* 🚀 PRO */}
        <div className="bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-[35px] shadow-2xl p-8 relative overflow-hidden">
          {/* 🚀 GLOW */}
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl"></div>

          {/* 🚀 BADGE */}
          <div className="absolute top-5 right-5 bg-white text-purple-600 px-4 py-2 rounded-full text-sm font-bold shadow">
            MOST POPULAR
          </div>

          <h2 className="text-3xl font-black">Pro Plan</h2>

          <p className="opacity-90 mt-2">Best for serious students 🚀</p>

          <div className="mt-8">
            <span className="text-5xl font-black">₹99</span>

            <span className="opacity-80">/month</span>
          </div>

          <ul className="mt-8 space-y-4 opacity-95">
            <li>✅ Unlimited quizzes</li>

            <li>✅ MCQ</li>

            <li>✅ Assertion & Reason</li>

            <li>✅ Case Study</li>

            <li>✅ Leaderboard</li>

            <li>✅ Faster AI generation</li>
          </ul>

          {/* 🚀 BUTTON */}
          {user?.plan?.toLowerCase() === "pro" ? (
            <button
              disabled
              className="w-full mt-10 bg-white/20 py-4 rounded-2xl font-bold cursor-not-allowed"
            >
              You are already PRO 🚀
            </button>
          ) : (
            <button
              onClick={handlePayment}
              className="w-full mt-10 bg-white text-purple-600 py-4 rounded-2xl font-black hover:scale-105 transition-all duration-300 shadow-xl"
            >
              Upgrade Now 🚀
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
