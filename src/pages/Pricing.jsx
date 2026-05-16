import api from "../services/api";

import { useAuth } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";

export default function Pricing() {
  const { user, setUser } = useAuth();

  const navigate = useNavigate();

  // 🚀 LOAD RAZORPAY
  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");

      script.src = src;

      script.onload = () => resolve(true);

      script.onerror = () => resolve(false);

      document.body.appendChild(script);
    });
  };

  // 🚀 HANDLE PAYMENT
  const handlePayment = async () => {
    const loaded = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js",
    );

    if (!loaded) {
      alert("Razorpay SDK failed");

      return;
    }

    try {
      // ✅ CREATE ORDER
      const orderRes = await api.post("/payment/create-order");

      const order = orderRes.data;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,

        amount: order.amount,

        currency: order.currency,

        name: "AI Scorify",

        description: "Pro Plan",

        order_id: order.id,

        handler: async function (response) {
          try {
            // ✅ VERIFY PAYMENT
            const verifyRes = await api.post(
              "/payment/verify",

              response,
            );

            // ✅ UPDATE USER
            if (verifyRes.data.user) {
              localStorage.setItem(
                "user",

                JSON.stringify(verifyRes.data.user),
              );

              setUser(verifyRes.data.user);
            }

            // ✅ SUCCESS
            alert("Payment Successful 🚀");

            // ✅ REDIRECT
            navigate("/dashboard");
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

      const paymentObject = new window.Razorpay(options);

      paymentObject.open();
    } catch (err) {
      console.log(err);

      alert("Payment failed");
    }
  };

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold text-center mb-10">
        Upgrade Your Learning 🚀
      </h1>

      <div className="grid md:grid-cols-2 gap-8">
        {/* FREE */}
        <div className="bg-white p-8 rounded-3xl shadow">
          <h2 className="text-2xl font-bold mb-4">Free Plan</h2>

          <ul className="space-y-3 text-gray-600">
            <li>✅ 3 quizzes/day</li>

            <li>✅ AI Generated Questions</li>

            <li>✅ Dashboard</li>
          </ul>

          <button className="mt-8 bg-gray-200 w-full py-3 rounded-xl">
            Current Plan
          </button>
        </div>

        {/* PRO */}
        <div className="bg-purple-600 text-white p-8 rounded-3xl shadow-xl relative">
          <div className="absolute top-4 right-4 bg-yellow-400 text-black px-3 py-1 rounded-full text-sm font-bold">
            BEST VALUE
          </div>

          <h2 className="text-3xl font-bold mb-2">Pro Plan</h2>

          <p className="text-5xl font-bold mb-6">
            ₹99
            <span className="text-lg">/month</span>
          </p>

          <ul className="space-y-3">
            <li>🚀 Unlimited Quizzes</li>

            <li>🚀 Faster AI</li>

            <li>🚀 AI Explanations</li>

            <li>🚀 Advanced Analytics</li>
          </ul>

          <button
            onClick={handlePayment}
            className="mt-8 bg-white text-purple-600 font-bold w-full py-3 rounded-xl hover:scale-105 transition"
          >
            Upgrade Now
          </button>
        </div>
      </div>
    </div>
  );
}
